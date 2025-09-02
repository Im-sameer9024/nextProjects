"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image.js";
import Link from "next/link.js";
import { navLinks } from "@/Types/Data";
import { MenuIcon, Search, X } from "lucide-react";
import ActiveLink from "./ActiveLink";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const path = usePathname();
  const router = useRouter();

  const handleNavigation = useCallback(
    (url: string) => {
      setShowSidebar(false);
      router.push(url);
    },
    [router]
  );

  const handleClose = useCallback(() => {
    setShowSidebar(false);
  }, []);

  return (
    <div className={path?.startsWith("/admin") ? "hidden" : "block"}>
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
        <Link href={"/"}>
          <Image
            className=" object-cover h-10 w-fit "
            width={1000}
            height={1000}
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
            <span className="absolute -top-2 -right-3 text-xs text-white bg-greenLight group-hover:bg-greenDull w-[18px] h-[18px] rounded-full flex items-center justify-center">
              0
            </span>
          </Link>

          {/*----------- Login btn --------- */}
          <Button className=" bg-greenLight hover:bg-greenDull  hover:scale-95 transition-all duration-300">
            Login
          </Button>
        </div>

        <div className=" sm:hidden block">
          <Button
            onClick={() => setShowSidebar(true)}
            className=" bg-greenLight/10 text-greenLight hover:bg-greenLight/20"
          >
            <MenuIcon />
          </Button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, stiffness: 300, type: "tween" }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/50 z-40 sm:hidden"
            >
              {/* Sidebar */}
              <motion.div
                key="sidebar"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{
                  type: "tween",
                  stiffness: 100,
                  duration: 0.5,
                }}
                className="fixed top-0 right-0 w-[70%] max-w-sm h-screen bg-white z-50 shadow-xl"
              >
                <p className="p-2">
                  <Button
                    onClick={handleClose}
                    className=" bg-greenLight/10 text-greenLight border-greenLight border hover:bg-greenDull/10"
                  >
                    <X />
                  </Button>
                </p>

                <hr className="  border-2 my-2 " />

                <div className="  flex flex-col gap-4  ">
                  {navLinks.map((link) => (
                    <span
                      onClick={() => handleNavigation(link.url)}
                      className={`${
                        path == link.url
                          ? " text-greenLight border-l-4 border-greenLight bg-greenLight/10 "
                          : ""
                      }  px-2 py-4 text-xl font-bold`}
                      key={link.id}
                    >
                      {link.text}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
