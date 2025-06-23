import Subject from "@/components/subjectComponent/Subject";
import prisma from "@/lib/prisma";
import getRoleForServerSide from "@/lib/role";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { Prisma } from "@prisma/client";
import React from "react";

type Props = {
  searchParams?: Promise<{ [key: string]: string } | undefined>;
};

const SubjectsListPage = async ({ searchParams }: Props) => {
  const { page, ...queryParams } = (await searchParams) ?? {};

  const p = page ? parseInt(page) : 1;

  const query: Prisma.SubjectWhereInput = {};
  const{role} = await getRoleForServerSide()

  //------------------ url params conditions
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined && value !== "") {
        //--------------for search the query params
        switch (key) {
          case "search":
            query.name = {
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
    prisma.subject.findMany({
      where: query,
      orderBy: {
        name: "asc",
      },
      include: {
        teachers: true,
        lessons: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.subject.count({where:query}),
  ]);

  return (
    <div className=" bg-white p-4 rounded-md flex-1 m-4 ">
      <Subject data={data} page={p} count={count} role={role} />
    </div>
  );
};

export default SubjectsListPage;
