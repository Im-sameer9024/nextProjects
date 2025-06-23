"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

const ActiveLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => {
    const pathname = usePathname();

    const isActive = pathname === href;

    return (
      <Link
        href={href}
        className={`${
          isActive
            ? "underline underline-offset-4 decoration-indigo-500 text-indigo-500 "
            : "text-black"
        } transition-all duration-300 ease-in-out`}
      >
        {children}
      </Link>
    );
  };

  export default ActiveLink;