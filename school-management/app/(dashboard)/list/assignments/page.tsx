import Assignment from "@/components/assignmentComponent/Assignment";
import prisma from "@/lib/prisma";
import getRoleForServerSide from "@/lib/role";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { Prisma } from "@prisma/client";

type searchParamsProps = {
  searchParams?: Promise<{ [key: string]: string } | undefined>;
};

const AssignmentListPage = async ({ searchParams }: searchParamsProps) => {
  const { page, ...queryParams } = (await searchParams) ?? {};

  const p = page ? parseInt(page) : 1;

  const { role, currentUserId } = await getRoleForServerSide();

  const query: Prisma.AssignmentWhereInput = {};
  query.lesson = {};

  // role based query and set the id based on role

  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.lesson = {
        teacherId: currentUserId,
      };
      break;
    case "student":
      query.lesson.class = {
        students: {
          some: {
            id: currentUserId,
          },
        },
      };
      break;
    case "parent":
      query.lesson.class = {
        students: {
          some: {
            parentId: currentUserId,
          },
        },
      };
      break;
    default:
      break;
  }

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value === undefined && value) {
        switch (key) {
          case "classId":
            query.lesson.classId = parseInt(value);
            break;
          case "teacherId":
            query.lesson.teacherId = value;
            break;
          case "search":
            query.lesson.subject = {
              name: { contains: value, mode: "insensitive" },
            };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: query,
      orderBy: {
        lesson: {
          subject: {
            name: "asc",
          },
        },
      },
      include: {
        lesson: {
          select: {
            endTime: true,
            class: { select: { name: true } },
            teacher: { select: { name: true } },
            subject: { select: { name: true } },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.assignment.count({ where: query }),
  ]);

  return (
    <div className=" bg-white p-4 rounded-md flex-1 m-4 ">
      <Assignment data={data} page={p} count={count} role={role} />
    </div>
  );
};

export default AssignmentListPage;
