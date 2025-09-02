import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { MoveRight } from "lucide-react";

const MainBanner = () => {
  return (
    <div className=" relative ">
      <Image
        src={"/assets/main_banner_bg.png"}
        alt="banner"
        className=" w-full object-cover "
        width={1000}
        height={1000}
      />

      {/*-------------------- text part ---------------- */}
      <div className="  absolute top-1/2 -translate-y-1/2 space-x-2 sm:space-y-8  left-2  sm:left-10 ">
        <h2 className=" sm:text-xl text-lg font-light  lg:text-5xl  sm:font-bold text-black w-[70%] hidden sm:block">
          Freshness You Can Trust, Savings You will Love!
        </h2>
        <div className=" space-x-4 flex items-center">
          <Button
            asChild
            className=" bg-greenLight hover:bg-greenDull  hover:scale-95 transition-all duration-300"
          >
            <Link href={"/products"}>Shop Now</Link>
          </Button>
          <Link
            href="/shop"
            className=" hover:underline underline-offset-4 gap-1 flex items-center group"
          >
            Explore Deals
            <span className=" group-hover:translate-x-1 transition-all duration-300">
              <MoveRight />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
