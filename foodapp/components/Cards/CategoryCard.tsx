"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import type { Category } from "@prisma/client";

const CategoryCard = ({ data }: { data: Category }) => {
  const router = useRouter();

  return (
    <div style={{ backgroundColor: data.color }} className=" space-y-2 min-h-[100px] p-4 rounded-2xl ">
      <h2 className=" font-semibold capitalize text-lg">{data.title}</h2>
      <p className=" font-light">{data.desc}</p>
      <Button className=" bg-amber-200 text-black hover:bg-amber-300 transition-all duration-300 hover:cursor-pointer" onClick={() => router.push(`/shop/${data.slug}`)}>Explore</Button>
    </div>
  );
};

export default CategoryCard;
