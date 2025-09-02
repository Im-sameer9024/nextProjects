import prisma from "@/lib/prisma";
import HomePage from "@/pages/HomePage/Home";
import React from "react";

const Home = async() => {

  const categories = await  prisma.category.findMany()
  
  console.log(categories)


  return (
    <div>
      <HomePage categories={categories} />
    </div>
  );
};

export default Home;
