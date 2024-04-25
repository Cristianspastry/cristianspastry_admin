
"use client"
import { navBarLinks } from "@/utils/const";
import { Sidebar } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import MobileNavBar from "./mobileNavBar";

type Props = {}

export default function NavBar({}: Props) {
  const pathname = usePathname()
  return (
    <>
   
    <Sidebar aria-label="Sidebar with logo branding example" className="">
    <Sidebar.Logo href="/" img="https://flowbite.com/docs/images/logo.svg" imgAlt="Flowbite logo">
      {`Cristian's pastry
      admin `}
    </Sidebar.Logo>
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        
      {navBarLinks.map((link) => (
       <li key={link.title} className="mr-6">
       <Link href={link.href} className=" text-xl flex items-center px-3 py-2 rounded-md transition-colors duration-300 ease-in-out hover:text-white hover:bg-blue-700">
           <FontAwesomeIcon icon={link.icon} className="mr-2" />
           {link.title}
         
       </Link>
     </li>
      ))}
        
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
  <MobileNavBar/>
  </>
  )
}