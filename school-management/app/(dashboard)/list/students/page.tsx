import getRoleForServerSide from "@/lib/role";
import Student from "../../../../components/studentComponent/Student";
import prisma from "../../../../lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { Prisma } from "@prisma/client";

type Props = {
  searchParams?: Promise<{ [key: string]: string } | undefined>;
};

const StudentsListPage = async ({ searchParams }: Props) => {
  const { page, ...queryParams } = (await searchParams) ?? {};

  const p = page ? parseInt(page) : 1;

  const{role} = await getRoleForServerSide()

  const query: Prisma.StudentWhereInput = {};

  //-------------------- query params for searching and filtering the data -------------------------

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined && value !== "") {
        switch (key) {
          case "teacherId":
            query.class = {
              lessons: {
                some: {
                  teacherId: value,
                },
              },
            };
            break;
          case "search":
            query.name = {
              contains: value,
              mode: "insensitive",
            };
            break;
          default:
            break;
        }
      }
    }
  }

  //-------------------- fetching the data from the database using prisma -------------------------

  const [data, count] = await prisma.$transaction([
    prisma.student.findMany({
      where: query,
      orderBy: {
        name: "asc",
      },
      include: {
        class: true,
        grade: true,
        parent: true,
        attendances: true,
        results: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.student.count({where:query}),
  ]);

  return (
    <div className=" bg-white p-4 rounded-md flex-1 m-4 ">
      <Student data={data} count={count} page={p} role={role}/>
    </div>
  );
};

export default StudentsListPage;
