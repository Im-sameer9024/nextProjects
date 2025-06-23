import React from "react";
import { Input } from "./ui/input";
import { Bell, MessageCircle, Search } from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const Navbar = async () => {
  // Default to 'guest' if no role is found

  return (
    <nav className="w-full p-2 flex items-center justify-between bg-white shadow-sm">
      {/* Search Section */}
      <div className="hidden md:flex items-center relative flex-1 max-w-md">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Search className="text-gray-400 w-5 h-5" aria-hidden="true" />
        </div>
        <Input
          type="text"
          placeholder="Search..."
          className="rounded-full pl-10 pr-4 py-2 border-gray-300 focus-visible:ring-2 focus-visible:ring-primary/50"
          aria-label="Search"
        />
      </div>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      {/* User Controls Section */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Messages Button */}
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
          aria-label="Messages"
        >
          <MessageCircle className="text-gray-600 w-5 h-5" />
          <span className=" absolute top-0 bg-[#A855F7] w-5 h-5 shadow-md text-white text-sm text-center rounded-full">
            5
          </span>
        </button>

        {/* Notifications Button */}
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="text-gray-600 w-5 h-5" />
          <span className=" absolute top-0 bg-[#A855F7] w-5 h-5 shadow-md text-white text-sm text-center rounded-full">
            5
          </span>
        </button>

        {/* Profile Dropdown */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex flex-col text-right">
            <p className="font-medium text-gray-900">{"sfks"}</p>
            <p className="text-xs text-gray-500">{"guest"}</p>
          </div>
          <div className="relative">
            <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50">
              <Image
                src={Logo}
                alt="User profile"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
              />
            </button>
            {/* Dropdown menu would go here */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
