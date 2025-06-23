import prisma from "@/lib/prisma";
import ShopPage from "@/pages/ShopPage";
import React from "react";

const page = async () => {
  const categories = await prisma.category.findMany({});


  return (
  <div>
    <ShopPage data={categories} />
  </div>
);
};

export default page;
