import React from "react";
import { Button } from "../../ui/button";
import {
  SearchIcon,
  ShoppingBag,
  MenuIcon,
} from "lucide-react";

interface NavIconsProps {
  onOpen: () => void;
  onMenuOpen: () => void; // Add this prop
}

const NavIcons = ({ onOpen, onMenuOpen }: NavIconsProps) => {
  return (
    <>
      <div className="hidden sm:flex items-center gap-4">
        <Button onClick={onOpen} size={"icon"} variant={"ghost"} className="h-10 w-10">
          <SearchIcon size={20} />
        </Button>
        <Button size={"icon"} variant={"ghost"} className="h-10 w-10">
          <ShoppingBag size={20} />
        </Button>
        <Button
          variant={"destructive"}
          className="hover:cursor-pointer hover:scale-95"
        >
          Login
        </Button>
      </div>
      
      {/* Mobile menu button - now opens sidebar */}
      <div className="block sm:hidden">
        <Button
          variant={"ghost"}
          className="hover:cursor-pointer hover:scale-95 h-10 w-10"
          onClick={onMenuOpen} // Use the new prop here
        >
          <MenuIcon size={20} />
        </Button>
      </div>
    </>
  );
};

export default NavIcons;