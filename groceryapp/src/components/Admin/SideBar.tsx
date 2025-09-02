"use client";

import { adminSideBarLinks } from "@/Types/Data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideBar = () => {
  const path = usePathname();

  return (
    <div className=" w-[14%] h-[calc(100vh-4.6rem)] bg-white border-r border-gray-200">
      <div className=" flex flex-col items-start justify-start space-y-2">
        {adminSideBarLinks.map((link) => (
        <Link
          href={link.url}
          className={`${path == link.url
            ? " text-greenLight border-r-4 border-greenLight bg-greenLight/10 "
            : ""
          }   font-semibold flex items-center gap-2 py-2 w-full text-start px-1`}
          key={link.id}
        >
            {link.icon}
          {link.text}
        </Link>
      ))}
      </div>
    </div>
  );
};

export default SideBar;
