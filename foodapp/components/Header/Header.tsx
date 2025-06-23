"use client";

import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className=" mx-auto w-10/12 my-4 ">
      <Image
        src={"/images/banner.jpeg"}
        width={1000}
        height={1000}
        alt="banner"
        loading="lazy"
        className="  object-cover w-full rounded-2xl mx-auto h-[80vh]"
      />
    </div>
  );
};

export default Header;
