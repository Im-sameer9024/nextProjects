"use client"

import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import Banner_big_image from '../../../../assets/main_banner_bg.png'
import Banner_small_image from '../../../../assets/main_banner_bg_sm.png'
import Image from "next/image";
import { Variants } from "framer-motion";

const Header = () => {
  // Animation variants for text elements
  const textVariants:Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Animation variants for buttons
  const buttonVariants:Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Animation for the arrow icon
  const arrowVariants:Variants = {
    rest: { x: 0 },
    hover: { x: 5, transition: { duration: 0.2 } }
  };

  return (
    <section className=" w-full flex items-center justify-between overflow-hidden">
      <div className="relative w-full">
        {/* Background Images with Fade In Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image 
            src={Banner_big_image} 
            alt="banner" 
            priority
            className="w-full md:block hidden" 
          />
          <Image 
            src={Banner_small_image} 
            alt="banner-sm" 
            priority
            className="md:hidden w-full" 
          />
        </motion.div>

        {/* Content Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 md:left-10 md:translate-x-0 md:w-7/12 lg:w-6/12 xl:w-5/12 px-4 md:px-0">
          {/* Heading with Staggered Animation */}
          <motion.h1 
            className="font-heading lg:text-5xl md:text-4xl text-2xl font-bold text-gray-800"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {["Freshness You Can Trust,", "Savings You will Love!"].map((line, index) => (
              <motion.span
                key={index}
                variants={textVariants}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </motion.h1>

          {/* Buttons with Animation */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mt-6 md:mt-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <motion.button 
              className="bg-green-500 text-white hover:bg-green-600 transition-all duration-300 rounded-md px-6 py-3 text-sm md:text-base font-medium shadow-md hover:shadow-lg hover:cursor-pointer hover:scale-95 "
              variants={buttonVariants}
              
            >
              Shop Now
            </motion.button>
            
            <motion.button 
              className="flex items-center gap-2 group text-gray-700 hover:text-green-600 font-medium text-sm md:text-base hover:cursor-pointer hover:scale-95 transition-all duration-300"
              variants={buttonVariants}
            >
              Explore Deals
              <motion.span 
                className="group-hover:text-green-600"
                variants={arrowVariants}
                initial="rest"
              >
                <FaArrowRightLong />
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Header;