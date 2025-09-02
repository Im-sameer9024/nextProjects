"use client"

import { footerLinks } from '@/Types/Data'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Footer = () => {

    const path = usePathname()

  return (
    <div className={`px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-btn/10 ${path?.startsWith("/admin") ? "hidden" : "block"}`}>
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div>
          <Link href={"/"}>
          <Image
            className=" object-cover h-10 w-fit "
            width={1000}
            height={1000}
            src={"/assets/logo.svg"}
            loading="lazy"
            alt="Logo"
          />
        </Link>
          <p className="max-w-[410px] mt-6">
           We deliver fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make your shopping experience simple and affordable.
          </p>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm  flex flex-col gap-2">
                {section.links?.map((link, i) => (
                  <Link key={i} href={link.url}>
                  {link.text}
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        Copyright {new Date().getFullYear()} © GreatStack.dev All Right Reserved.
      </p>
    </div>
  )
}

export default Footer
