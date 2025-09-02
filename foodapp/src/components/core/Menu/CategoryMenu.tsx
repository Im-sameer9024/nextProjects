import type { Category } from "@prisma/client";
import Image from "next/image";
import React from "react";

const CategoryMenu = ({ categories }: { categories: Category[] }) => {
  return (
    <div className=" flex  items-center justify-center gap-8 mt-10">
      {categories.map((category) => {
        return (
          <div key={category.id} className=" min-w-[150px] w-[400px] h-[300px] relative">
            <Image
              src={String(category.img)}
              alt={category.title}
              width={1000}
              height={1000}
              className=" w-full h-full object-cover"
            />
            <div className=" absolute bottom-0 p-2  bg-white/50 text-white">
              <h1 className=" font-bold text-2xl">{category.title}</h1>
              <p className=" font-mono">{category.description}</p>
              <button className=" bg-gray-400 px-2  py-1 rounded-lg mt-2 hover:cursor-pointer hover:bg-gray-500">
                Explore
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryMenu;
