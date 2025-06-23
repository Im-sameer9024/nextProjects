import Lesson from "@/components/lessonComponent/Lesson";
import prisma from "@/lib/prisma";
import getRoleForServerSide from "@/lib/role";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { Prisma } from "@prisma/client";
import React from "react";

type Props = {
  searchParams?: Promise<{ [key: string]: string } | undefined>;
};

const LessonListPage = async ({ searchParams }: Props) => {
  const { page, ...queryParams } = (await searchParams) ?? {};

  const p = page ? parseInt(page) : 1;

  const {role} = await getRoleForServerSide()

  //------------------ url params conditions
  const query: Prisma.LessonWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined && value !== "") {
        //--------------for search the query params
        switch (key) {
          case "classId":
            query.classId = parseInt(value);
            break;
          case "supervisorId":
            query.teacherId = value;
            break;
          case "search":
            query.OR = [
              { subject: { name: { contains: value, mode: "insensitive" } } },
              { teacher: { name: { contains: value, mode: "insensitive" } } },
            ];
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.lesson.findMany({
      where: query,
      
      include: {
        subject: {
          select: {
            name: true,
          },
        },
        class: {
          select: {
            name: true,
          },
        },
        teacher: {
          select: {
            name: true,
          },
        },
        
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE,
    }),
    prisma.lesson.count({where:query}),
  ]);

  return (
    <div className=" bg-white p-4 rounded-md flex-1 m-4 ">
      <Lesson data={data} page={p} count={count} role={role} />
    </div>
  );
};

export default LessonListPage;
