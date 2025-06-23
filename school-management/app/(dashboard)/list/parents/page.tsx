import prisma from "../../../../lib/prisma";
import Parent from "../../../../components/parentComponent/Parent";
import React from "react";
import { Prisma } from "@prisma/client";
import { ITEM_PER_PAGE } from "../../../../lib/setting";
import getRoleForServerSide from "@/lib/role";

type parentsDataProps = {
  searchParams?: Promise<{ [key: string]: string } | undefined>;
};

const ParentListPage = async ({ searchParams }: parentsDataProps) => {
  const { page, ...queryParams } = (await searchParams) ?? {};
  const{role} = await getRoleForServerSide()

  const p = page ? parseInt(page) : 1;

  const query: Prisma.ParentWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined && value !== "") {
        switch (key) {
          case "classId":
            query.students = {
              some: {
                classId: parseInt(value),
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

  //-------------------- query params for searching and filtering the data -------------------------

  const [data, count] = await prisma.$transaction([
    /// $transaction is used to run multiple queries at once
    prisma.parent.findMany({
      where: query,
      orderBy: {
        name: "asc",
      },
      include: {
        students: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.parent.count({where:query}),
  ]);

  return (
    <div className=" bg-white p-4 rounded-md flex-1 m-4 ">
      <Parent data={data} count={count} page={p} role={role} />
    </div>
  );
};

export default ParentListPage;
