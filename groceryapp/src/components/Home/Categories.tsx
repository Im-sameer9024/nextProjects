"use client"

import { categories } from "@/Types/Data";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Categories = () => {

  // {categories}:{categories: Category[]}

    const router = useRouter()


  return (
    <div className=" mt-16">
      <p className=" text-2xl md:text-3xl font-medium">Categories</p>
      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6">
        {/* single category  */}
        {categories.map((category, index) => {
          return (
            <div
              key={index}
              className=" group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center"
              style={{ backgroundColor: category.bgColor }}
              onClick={() => {
                router.push(`/products/${category.path}`);
                scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              <Image
                src={category.image}
                alt={category.text}
                className=" group-hover:scale-105 transition-all max-w-28"
              />
              <p className=" text-sm font-medium">{category.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
