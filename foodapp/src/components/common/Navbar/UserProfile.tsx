"use client";

import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { FiUser, FiLogOut, FiSettings } from "react-icons/fi";
import Image from "next/image";

const UserProfile = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="relative">
      {/* User Profile Button */}
      <button
        className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-200 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="User profile"
      >
        <FiUser className="w-5 h-5" />
      </button>

      {/* User Dropdown */}
      {isHovered && (
        <div
          className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* User Info Section */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-2">
             
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <FiUser className="w-5 h-5 text-white" />
                </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {session?.user?.name || "User"}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {session?.user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Dropdown Options */}
          <div className="p-2">
            <button
              onClick={() => {
                // Add your profile/settings navigation logic here
                console.log("Navigate to profile");
                setIsHovered(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors duration-200 rounded-md"
            >
              <FiSettings className="w-4 h-4" />
              <span>Profile & Settings</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 text-left text-red-600 hover:bg-red-50 transition-colors duration-200 rounded-md mt-1"
            >
              <FiLogOut className="w-4 h-4" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
