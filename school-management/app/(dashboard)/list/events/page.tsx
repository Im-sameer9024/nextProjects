import Event from "@/components/eventComponent/Event";
import prisma from "@/lib/prisma";
import getRoleForServerSide from "@/lib/role";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { Prisma } from "@prisma/client";

type Props = {
  searchParams?: Promise<{ [key: string]: string } | undefined>;
};

const EventListPage = async ({ searchParams }: Props) => {
  const { page, ...queryParams } = (await searchParams) ?? {};
  const p = page ? parseInt(page) : 1;

  const { role, currentUserId } = await getRoleForServerSide();

  //------------------ url params conditions

  const query: Prisma.EventWhereInput = {};

  // role based conditions on query

  switch (role) {
    // case "admin":
    //   query.classId = null;
    //   break;
    case "teacher":
      query.class = {
        lessons: {
          some: {
            teacherId: currentUserId!,
          },
        },
      };
      break;
    case "student":
      query.class = {
        students: {
          some: {
            id: currentUserId!,
          },
        },
      };
      break;
    case "parent":
      query.class = {
        students: {
          some: {
            parentId: currentUserId!,
          },
        },
      };
  }

  // const roleConditions = {
  //   teacher: { lessons: { some: { teacherId: currentUserId! } } },
  //   student: { students: { some: { id: currentUserId! } } },
  //   parent: { students: { some: { parentId: currentUserId! } } },

  // };

  // query.OR = [
  //   { classId: null },
  //   {
  //     class: roleConditions[role as keyof typeof roleConditions] || {},
  //   },
  // ];

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined && value !== "") {
        switch (key) {
          case "search":
            query.title = {
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

  const [data, count] = await prisma.$transaction([
    prisma.event.findMany({
      where: query,
      include: {
        class: {
          select: {
            name: true,
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.event.count({ where: query }),
  ]);


  return (
    <div className=" bg-white p-4 rounded-md flex-1 m-4 ">
      <Event data={data} page={p} count={count} role={role} />
    </div>
  );
};

export default EventListPage;
