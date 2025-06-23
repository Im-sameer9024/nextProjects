import Announcement from "@/components/announcementComponent/Announcement";
import prisma from "@/lib/prisma";
import getRoleForServerSide from "@/lib/role";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { Prisma } from "@prisma/client";
import React from "react";

type Props = {
  searchParams?: Promise<{ [key: string]: string } | undefined>;
};

const AnnouncementListPage = async ({ searchParams }: Props) => {
  const { page, ...queryParams } = (await searchParams) ?? {};

  const { role, currentUserId } = await getRoleForServerSide();

  const p = page ? parseInt(page) : 1;

  const query: Prisma.AnnouncementWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined && value !== "") {
        switch (key) {
          case "classId":
            query.classId = parseInt(value);
            break;
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

  // role conditions for announcement set the id

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
      default:
      break;
  }


  const [data, count] = await prisma.$transaction([
    prisma.announcement.findMany({
      where: query,
      include: {
        class: {
          select: { name: true },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.announcement.count({ where: query }),
  ]);


  return (
    <div className=" bg-white p-4 rounded-md flex-1 m-4 ">
      <Announcement data={data} page={p} count={count} role={role} />
    </div>
  );
};

export default AnnouncementListPage;
