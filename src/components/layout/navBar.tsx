
"use client"
import { navBarLinks } from "@/utils/const";
import { Sidebar } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from 'react'

type Props = {}

export default function NavBar({}: Props) {
  const pathname = usePathname()
  return (
    <>
   
    <Sidebar aria-label="Sidebar with logo branding example">
    <Sidebar.Logo href="/" img="https://flowbite.com/docs/images/logo.svg" imgAlt="Flowbite logo">
      {`Cristian's pastry
      admin `}
    </Sidebar.Logo>
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        
        {navBarLinks.map((link) => (
          
          <Link key={link.title} href={link.href} className={` ${pathname === link.href ? 'bg-blue-500' : ''} `} >
           <Sidebar.Item icon={link.icon}>
           
             {link.title}
          </Sidebar.Item>
          </Link>
        ))}
        
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>

  </>
  )
}