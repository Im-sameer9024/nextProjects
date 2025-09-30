import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { AnimatePresence, motion, Variants } from "motion/react";
import React from "react";

interface SearchBarProps {
  isVisible: boolean;
  onClose: () => void;
}

const searchBarVariants:Variants = {
  closed: {
    opacity: 0,
    y: -20,
    scale: 0.8,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const SearchBar = ({ isVisible, onClose }: SearchBarProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={searchBarVariants}
          className="fixed top-0 left-0 w-full bg-white shadow-2xl py-2 z-50 flex items-center justify-center"
        >
          <div className="w-1/2 mx-auto flex items-center gap-2">
            <Input placeholder="Search....." className="!rounded-full" />
            <Button onClick={onClose} variant={"ghost"} size={"sm"} className=" !rounded-full ">
              <X />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;
