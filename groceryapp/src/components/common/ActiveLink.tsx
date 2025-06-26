"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const ActiveLink = ({href,children}:{href:string,children:React.ReactNode}) => {

    const path = usePathname()

    const isActive = href === path

  return (
    <Link href={href} className={`${isActive ? " text-primary font-sans underline-offset-2" : "text-black"} bg-primary font-mono text-primary  `} >
      {children}
    </Link>
  )
}

export default ActiveLink
