"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ActiveLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const path = usePathname();

  const isActive = href === path;

  return (
    <Link
      href={href}
      className={`${
        isActive
          ? " text-greenLight underline underline-offset-4"
          : "text-black"
      }  transition-all duration-300 ease-linear    `}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
