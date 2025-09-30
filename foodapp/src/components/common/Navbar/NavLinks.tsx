"use client";

import { navLinks } from "@/constant/Data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = ({location}:{location:string}) => {

  return (
    <div className=" hidden sm:flex gap-4 items-center">
      {navLinks.map((link) => (
        <Link
          key={link.id}
          href={link.path}
          className={`${link.path === location ? "text-red-500 " : ""} font-semibold text-gray-600`}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
