import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { ProductTypesProps } from "@/types/type";

const ProductCard = ({ product }: { product: ProductTypesProps }) => {
  return (
    <div className=" w-full h-fit bg-cover border p-4 shadow rounded-2xl   space-y-2 ">
      <div>
        <Image
          src={product.img ?? "/placeholder.png"}
          alt={product.title}
          width={1000}
          height={1000}
          className="  w-full h-[150px] object-cover "
        />
      </div>
      <h2 className=" font-bold text-xl mt-2">{product.title}</h2>
      <p>{product.description}</p>
      <div className=" flex gap-4 items-center">
        <span>{product.price.toString()}</span>
        <Button className=" hover:cursor-pointer">ADD</Button>
      </div>
    </div>
  );
};

export default ProductCard;
