import React from "react";
import Image from "next/image.js";
import Link from "next/link.js";
import { navLinks } from "@/Types/Data";
import { Search } from "lucide-react";
import ActiveLink from "./ActiveLink";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <Link href={"/"}>
        <Image
          className=" h-9"
          width={100}
          height={100}
          src={"/assets/logo.svg"}
          loading="lazy"
          alt="Logo"
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        {navLinks.map((link) => (
          <ActiveLink href={link.url} key={link.id}>
            {link.text}
          </ActiveLink>
        ))}

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <span>
            <Search />
          </span>
        </div>

        <Link href={"/cart"} className="relative cursor-pointer group">
          {/*---------- cart icons is here ------------- */}
          <Image
            src={"/assets/nav_cart_icon.svg"}
            alt="cart"
            loading="lazy"
            width={100}
            height={100}
            className="w-8 opacity-80"
          />
          <span className="absolute -top-2 -right-3 text-xs text-white bg-btn group-hover:bg-btnDark w-[18px] h-[18px] rounded-full flex items-center justify-center">
            0
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
