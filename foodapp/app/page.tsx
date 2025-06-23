import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import HomePage from "@/pages/HomePage";
import { redirect } from "next/navigation";
import React from "react";


async function getProducts(){
   const products = await prisma.product.findMany({
    where: {
      isFeatured: true,
    },
  });

  return products.map((product) => ({
    ...product,
    price:product.price.toNumber(),
  }))

}

const Home = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // if (session.user.role !== "ADMIN") {
  //   redirect("/unauthorized");
  // }

  const products = await getProducts();
 

  return (
    <div>
      <HomePage products={products} />
    </div>
  );
};

export default Home;
