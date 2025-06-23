import prisma from '@/lib/prisma';
import { Ellipsis } from 'lucide-react';
import React from 'react'

const UserCard = async({type}:{type:"admin" | "teacher" | "student" | "parent"}) => {


  const modelMap: Record<"admin" | "teacher" | "student" | "parent", { count: () => Promise<number> }> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent
  }


  const data = await modelMap[type].count()


  return (
    <div className="rounded-2xl odd:bg-[#FAE27C] even:bg-[#C3EBFA] p-4 flex-1 min-w-[130px] ">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>

        <span className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors  hover:cursor-pointer">
          <Ellipsis />
        </span>
      </div>
      <h1 className="text-2xl font-semibold my-4">{data}</h1>
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
    </div>
  );
}

export default UserCard
