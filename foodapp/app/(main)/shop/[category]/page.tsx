import CategoryProducts from "@/components/Products/CategoryProducts";
import prisma from "@/lib/prisma";
import React from "react";

type Props = {
  params: Promise<{ category: string }>;
};

const page = async ({ params }: Props) => {
  const { category } = (await params) ?? {};

  const products = await prisma.product.findMany({
    where: {
      catSlug: category,
    },
  });

  return (
    <div>
      <CategoryProducts products={products} />
    </div>
  );
};

export default page;
