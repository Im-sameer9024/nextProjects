import Classcom from "@/components/classComponent/Classcom";
import prisma from "@/lib/prisma";
import getRoleForServerSide from "@/lib/role";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { Prisma } from "@prisma/client";
import React from "react";

type Props = {
  searchParams?: Promise<{ [key: string]: string } | undefined>;
};

const ClassListPage = async ({ searchParams }: Props) => {
  const { page, ...queryParams } = (await searchParams) ?? {};
  const p = page ? parseInt(page) : 1;
  //------------------ url params conditions

  const query: Prisma.ClassWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "supervisorId":
            query.supervisorId = value;
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.class.findMany({
      where: query,
      include: {
        supervisor: true,
        lessons: true,
        students: true,
        grade: true,
        event: true,
        announcements: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.class.count({where:query}),
  ]);

  
  const{role} = await getRoleForServerSide()

  return (
    <div className=" bg-white p-4 rounded-md flex-1 m-4 ">
      <Classcom data={data} page={p} count={count} role={role} />
    </div>
  );
};

export default ClassListPage;
