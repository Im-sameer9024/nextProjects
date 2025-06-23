import Exam from "@/components/examComponent/Exam";
import prisma from "@/lib/prisma";
import getRoleForServerSide from "@/lib/role";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { Prisma } from "@prisma/client";
import React from "react";

type Props = {
  searchParams?: Promise<{ [key: string]: string } | undefined>;
};

const ExamListPage = async ({ searchParams }: Props) => {
  const { page, ...queryParams } = (await searchParams) ?? {};

  const { role, currentUserId } = await getRoleForServerSide();

  const p = page ? parseInt(page) : 1;

  //------------------ url params conditions-------------

  const query: Prisma.ExamWhereInput = {};

  // role based conditions query

  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.lesson = { teacherId: currentUserId! };
      break;
    case "parent":
      query.lesson = {
        class: {
          students: {
            some: {
              parentId: currentUserId!,
            },
          },
        },
      };
    case "student":
      query.lesson = {
        class: {
          students: {
            some: {
              id: currentUserId!,
            },
          },
        },
      };
      default:
      break;
  }

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (query !== undefined && query !== null) {
        switch (key) {
          case "classId":
            query.lesson = {
              classId: parseInt(value),
            };
            break;
          case "teacherId":
            query.lesson = {
              teacherId: value,
            };
            break;
          case "search":
            query.lesson = {
              subject: {
                name: {
                  contains: value,
                  mode: "insensitive",
                },
              },
            };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.exam.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            class: { select: { name: true } },
            teacher: { select: { name: true } },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.exam.count({where:query}),
  ]);

  return (
    <div className=" bg-white p-4 rounded-md flex-1 m-4 ">
      <Exam data={data} page={p} count={count} />
    </div>
  );
};

export default ExamListPage;
