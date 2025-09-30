"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { navLinks } from "@/constant/Data";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  location: string;
}

const Sidebar = ({ isOpen, onClose, location }: SidebarProps) => {
  // Animation variants
  const sidebarVariants: Variants = {
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const backdropVariants: Variants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const linkVariants: Variants = {
    closed: { opacity: 0, x: -20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 font-sans"
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed left-0 top-0 h-full w-80 bg-white shadow-lg z-50 flex flex-col justify-between py-6"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* -----------upper-section-----------   */}
            <div>
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">MASSIMO</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Navigation Links - Mapped from data */}
              <nav className="p-4">
                <ul className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.id}
                      variants={linkVariants}
                      initial="closed"
                      animate="open"
                      custom={index}
                    >
                      <Link
                        href={link.path}
                        className={`block py-3 px-4 text-lg hover:bg-gray-100 rounded-md transition-colors duration-200 ${
                          location === link.path
                            ? "bg-gray-200 font-semibold"
                            : ""
                        }`}
                        onClick={onClose}
                      >
                        {link.title}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="px-4">
                <Button className="w-full" variant={"destructive"}>
                    Login
                </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
