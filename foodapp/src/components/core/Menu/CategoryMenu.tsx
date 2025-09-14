"use client";

import type { Category } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const CategoryMenu = ({ categories }: { categories: Category[] }) => {
  const router = useRouter();

  return (
    <div className="w-full px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
        {categories.map((category) => {
          return (
            <div 
              key={category.id} 
              className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-[300px] w-full"
            >
              <Image
                src={String(category.img)}
                alt={category.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h1 className="font-bold text-xl mb-1">{category.title}</h1>
                <p className="text-sm font-light mb-3 line-clamp-2">{category.description}</p>
                <button 
                  onClick={() => router.push(`/menu/${category.slug}`)} 
                  className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors w-full hover:cursor-pointer"
                >
                  Explore
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryMenu;