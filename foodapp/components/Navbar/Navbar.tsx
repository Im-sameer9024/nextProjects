"use client";

import { CookieIcon, ShoppingBagIcon, User } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { navLinks } from "@/dummyData/Data";
import ActiveLink from "./ActiveLink";
import { useUserSession } from "@/Hooks/useSession";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { user } = useUserSession();

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <Link href={"/"}>
        <span className=" font-montserrat font-semibold flex items-center gap-1 text-xl">
          <CookieIcon />
          Food
        </span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <ul className=" flex gap-8">
          {navLinks.map((navLink, i) => (
            <ActiveLink key={i} href={navLink.path}>
              {navLink.text}
            </ActiveLink>
          ))}
        </ul>

        <Link
          href={"/"}
          className=" bg-transparent text-black shadow-none p-0 m-0"
        >
          <ShoppingBagIcon />
        </Link>

        {user ? (
          <HoverCard>
            <HoverCardTrigger asChild>
              <Avatar className=" hover:cursor-pointer">
                <AvatarFallback>
                  <User size={64} />
                </AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-fit">
              <Button className=" hover:cursor-pointer" onClick={() => signOut({ callbackUrl: "/login" })}>
                Logout
              </Button>
            </HoverCardContent>
          </HoverCard>
        ) : (
          <Button className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
            <User size={64} />
            Login
          </Button>
        )}
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <svg
          width="21"
          height="15"
          viewBox="0 0 21 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <a href="#" className="block">
          Home
        </a>
        <a href="#" className="block">
          About
        </a>
        <a href="#" className="block">
          Contact
        </a>
        <button className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
