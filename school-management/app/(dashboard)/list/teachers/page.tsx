import Teacher from "../../../../components/teacherComponent/Teacher";
import prisma from "../../../../lib/prisma";
import { ITEM_PER_PAGE } from "../../../../lib/setting";

const TeachersListPage = async ({
  searchParams,
}: {
  searchParams: { [key:string]:string | undefined };
}) => {

  const{page, ...queryParams} = searchParams;

  const p = page ? parseInt(page) : 1;

  const[data, count] = await prisma.$transaction([
    prisma.teacher.findMany({
      include: {
        subjects: true,
        classes: true,
        lessons: true,
      },
      take: ITEM_PER_PAGE,
      skip:ITEM_PER_PAGE*(p-1)
    }),
    prisma.teacher.count({})

  ])




  return (
    <div className=" bg-white p-4 rounded-md flex-1 m-4 ">
      <Teacher data={data} page={p} count={count} />
    </div>
  );
};

export default TeachersListPage;
