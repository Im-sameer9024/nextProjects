import React from "react";
import { menuItems, role } from "../assets/dummyData/Data";
import Link from "next/link";

const Menu = () => {
  return (
    <div className=" h-full overflow-scroll flex flex-col">
      {menuItems.map((menu, index) => (
        <div key={index}>
          <span className=" hidden lg:block text-gray-400 my-2 font-bold">
            {menu.title}
          </span>
          <div className=" flex flex-col overflow-y-scroll">
            {menu.items.map((item, index) => {
              const Icon = item.icon as React.ElementType;
              if (item.visible.includes(role)) {
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className=" flex items-center gap-1 justify-center lg:justify-start py-2 lg:p-2 rounded-md hover:bg-gray-200 transition-all duration-200 ease-in-out"
                  >
                    <Icon className="w-6 h-6 " />
                    <span className=" font-font_content font-light hidden lg:block">
                      {item.label}
                    </span>
                  </Link>
                );
              }
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
