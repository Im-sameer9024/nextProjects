"use client"

import { navLinks } from '@/Types/Data'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import { MenuIcon, X } from 'lucide-react'
import { Button } from '../ui/button'
import { AnimatePresence,motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

const AdminNavbar = () => {


const[showSidebar,setShowSidebar] = useState(false)

 const path = usePathname();
  const router = useRouter();

  const handleNavigation = useCallback(
    (url: string) => {
      setShowSidebar(false);
      router.push(url);
    },
    [router]
  );

  const handleClose = useCallback(() => {
    setShowSidebar(false);
  }, []);


  return (
   <>
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
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

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8">
          

        
          

          {/*----------- Login btn --------- */}
          <Button className=" bg-greenLight hover:bg-greenDull  hover:scale-95 transition-all duration-300">
            Login
          </Button>
        </div>

        <div className=" sm:hidden block">
          <Button
            onClick={() => setShowSidebar(true)}
            className=" bg-greenLight/10 text-greenLight hover:bg-greenLight/20"
          >
            <MenuIcon />
          </Button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, stiffness: 300, type: "tween" }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/50 z-40 sm:hidden"
            >
              {/* Sidebar */}
              <motion.div
                key="sidebar"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{
                  type: "tween",
                  stiffness: 100,
                  duration: 0.5,
                }}
                className="fixed top-0 right-0 w-[70%] max-w-sm h-screen bg-white z-50 shadow-xl"
              >
                <p className="p-2">
                  <Button
                    onClick={handleClose}
                    className=" bg-greenLight/10 text-greenLight border-greenLight border hover:bg-greenDull/10"
                  >
                    <X/>
                  </Button>
                </p>

                <hr className="  border-2 my-2 " />

                <div className="  flex flex-col gap-4  ">
                  {navLinks.map((link) => (
                    <span
                      onClick={() => handleNavigation(link.url)}
                      className={`${
                        path == link.url
                          ? " text-greenLight border-l-4 border-greenLight bg-greenLight/10 "
                          : ""
                      }  px-2 py-4 text-xl font-bold`}
                      key={link.id}
                    >
                      {link.text}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
   </>
  )
}

export default AdminNavbar
