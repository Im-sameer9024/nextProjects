import { Prisma } from "@prisma/client";
import Teacher from "../../../../components/teacherComponent/Teacher";
import prisma from "../../../../lib/prisma";
import { ITEM_PER_PAGE } from "../../../../lib/setting";
import getRoleForServerSide from "@/lib/role";

type Props = {
  searchParams?: Promise<{ [key: string]: string } | undefined>;
};

const TeachersListPage = async ({ searchParams }: Props) => {
  const { page, ...queryParams } = (await searchParams) ?? {};

  const p = page ? parseInt(page) : 1;

  //------------------ url params conditions

  const query: Prisma.TeacherWhereInput = {};
  const{role} = await getRoleForServerSide()

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined && value !== "") {
        //------------- for search the query params

        switch (key) {
          case "classId":
            query.lessons = {
              some: {
                classId: parseInt(value),
              },
            };
            break;
          case "search":
            query.name ={
              contains: value,
              mode: "insensitive",
            }
            break;
            default:
              break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    // $transaction is used to run multiple queries at once
    prisma.teacher.findMany({
      where: query,
      orderBy: {
        name: "asc", 
      },
      include: {
        subjects: true,
        classes: true,
        lessons: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.teacher.count({where:query}),
  ]);

  return (
    <div className=" bg-white p-4 rounded-md flex-1 m-4 ">
      <Teacher data={data} page={p} count={count} role={role}/>
    </div>
  );
};

export default TeachersListPage;
