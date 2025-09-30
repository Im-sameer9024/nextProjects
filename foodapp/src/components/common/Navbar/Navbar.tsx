"use client";

import Link from "next/link";
import React, { useState } from "react";
import NavLinks from "./NavLinks";
import NavIcons from "./NavIcons";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar"; // Import the Sidebar
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const location = usePathname();

  const closeSearchBar = () => {
    setIsSearchVisible(false);
  };

  const openSearchBar = () => {
    setIsSearchVisible(true);
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <nav className="font-sans flex justify-between items-center p-4 relative">
      <div>
        <Link href="/" className="text-xl font-bold">
          MASSIMO
        </Link>
      </div>

      {/*----------------- have home, about , menu pages ------------- */}
      <NavLinks location={location} />

      {/*----------------- have cart , login and search icons ---------------- */}
      <NavIcons onOpen={openSearchBar} onMenuOpen={openSidebar} />

      <SearchBar isVisible={isSearchVisible} onClose={closeSearchBar} />
      
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} location={location} />
    </nav>
  );
};

export default Navbar;