"use client"

import { links } from "@/constants/Data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavbarLinks = () => {

  const location = usePathname();

 

  return (
    <div className=" space-x-6">
      {links.map((link) => {
        return (
          <Link key={link.id} href={link.path} className={` ${link.path === location ? "text-green-500 font-semibold" :""} transition-all duration-200 ease-in-out`}>
            {link.text}
          </Link>
        );
      })}
    </div>
  );
};

export default NavbarLinks;
