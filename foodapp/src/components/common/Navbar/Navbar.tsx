"use client";

import React, { useEffect, useState } from "react";
import NavbarLinks from "./NavbarLinks";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import UserProfile from "./UserProfile";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const { status } = useSession();

  const pathname = usePathname();
  const authPaths = ["/auth/signup", "/auth/login", "/auth/error"];

  useEffect(() => {
    // Check if current path is an auth path
    const shouldHideNavbar = authPaths.some((path) =>
      pathname.startsWith(path)
    );
    setShowNavbar(!shouldHideNavbar);
  }, [pathname]); // Add pathname as dependency

  // Animation variants for sidebar
  const sidebarVariants: Variants = {
    hidden: {
      x: "100%",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
      },
    },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
      },
    },
  };

  // Animation variants for overlay
  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Don't render navbar on auth pages
  if (!showNavbar) {
    return null;
  }

  return (
    <>
      <div
        className={`w-full mx-auto py-4 lg:px-10 md:px-6 sm:px-4 px-2 flex items-center justify-between bg-white shadow-sm relative z-50`}
      >
        {/* Website logo */}
        <div className="font-mono text-2xl font-semibold bg-gradient-to-r from-green-600 via-green-300 to-green-600 text-transparent bg-clip-text inline-block">
          MASSIMO
        </div>

        {/* Desktop Links - Hidden on mobile */}
        <div className="hidden md:block">
          <NavbarLinks />
        </div>
       

        {/* Desktop orders and carts - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-4">
          <button className="flex items-center gap-2 bg-gray-300 p-2 text-white rounded-full hover:scale-95 ease-in-out duration-300 hover:cursor-pointer ">
            <FiShoppingCart />
          </button>

          {status === "authenticated" ? (
            <UserProfile />
          ) : (
            <button className="bg-green-600 px-4 py-1 text-white rounded-md hover:scale-95 ease-in-out duration-300 hover:cursor-pointer">
              Login
            </button>
          )}
        </div>

        {/* Mobile menu button - Visible only on mobile */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-green-600"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <FiMenu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Sidebar with Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 md:hidden"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={overlayVariants}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-xl z-50 md:hidden flex flex-col"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={sidebarVariants}
            >
              {/* Close button */}
              <div className="flex justify-between items-center p-4 border-b">
                <div className="font-mono text-xl font-semibold bg-gradient-to-r from-green-600 via-green-300 to-green-600 text-transparent bg-clip-text">
                  MS
                </div>
                <button
                  className="p-2 text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto p-6">
                <div className="mb-8">
                  <NavbarLinks />
                </div>

                {/* Mobile buttons */}
                <div className="flex flex-col gap-4">
                  <button
                    className="w-full bg-green-300 px-4 py-2 text-white rounded-md hover:bg-green-400 transition-colors duration-300 text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Orders
                  </button>
                  <button
                    className="w-full flex items-center justify-center gap-2 bg-green-300 px-4 py-2 text-white rounded-md hover:bg-green-400 transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Cart
                    <FiShoppingCart />
                  </button>
                </div>
              </nav>

              {/* Footer (optional) */}
              <div className="p-4 border-t text-center text-sm text-gray-500">
                © {new Date().getFullYear()} MASSIMO
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
