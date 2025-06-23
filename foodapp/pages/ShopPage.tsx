import CategoryCard from "@/components/Cards/CategoryCard";
import type { Category } from "@prisma/client";
import React from "react";

const ShopPage = ({ data }: { data:Category[] }) => {
  return (
    <div className=" w-10/12 min-h-screen  mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10  items-center h-[calc(100vh-110px)] text-white ">
      {data.map((item) => {
        return <CategoryCard key={item.id} data={item} />;
      })}
    </div>
  );
};

export default ShopPage;
