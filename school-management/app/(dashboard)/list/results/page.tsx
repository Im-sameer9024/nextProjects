import Result from "@/components/resultComponent/Result";
import prisma from "@/lib/prisma";
import getRoleForServerSide from "@/lib/role";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { Prisma } from "@prisma/client";

type Props = {
  searchParams?: Promise<{ [key: string]: string } | undefined>;
};

const ResultsListPage = async ({ searchParams }: Props) => {
  const { page, ...queryParams } = (await searchParams) ?? {};

  const { role, currentUserId } = await getRoleForServerSide();
  const p = page ? parseInt(page) : 1;

  const query: Prisma.ResultWhereInput = {};

  // role based conditions for query

  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.OR = [
        { exam: { lesson: { teacherId: currentUserId! } } },
        { assignment: { lesson: { teacherId: currentUserId! } } },
      ];
      break;

    case "student":
      query.studentId = currentUserId!;
      break;

    case "parent":
      query.student = {
        parentId: currentUserId!,
      };
      break;
    default:
      break;
  }

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined && value !== "") {
        switch (key) {
          case "classId":
            query.assignment = {
              lesson: {
                classId: parseInt(value),
              },
            };
            break;
          case "search":
            query.OR = [
              { exam: { title: { contains: value, mode: "insensitive" } } },
              { student: { name: { contains: value, mode: "insensitive" } } },
            ];
            break;
            default:
            break;
        }
      }
    }
  }

  const [dataRes, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: {
        student: {
          select: {
            name: true,
          },
        },
        exam: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true } },
              },
            },
          },
        },
        assignment: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true } },
              },
            },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.result.count({ where: query }),
  ]);

  const data = dataRes
    .map((item) => {
      const assessment = item.assignment ?? item.exam;

      if (!assessment) return null;

      const isExam = "startTime" in assessment;

      return {
        id: item.id,
        title: assessment.title,
        student: item.student.name,
        score: item.score,
        teacher: assessment.lesson.teacher.name,
        class: assessment.lesson.class.name,
        startTime: isExam ? assessment.startTime : null,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <div className=" bg-white p-4 rounded-md flex-1 m-4 ">
      <Result data={data} page={p} count={count} role={role} />
    </div>
  );
};

export default ResultsListPage;
