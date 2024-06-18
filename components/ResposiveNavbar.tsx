"use client"

import Link from "next/link"
import { useState } from "react"
import { SignoutButton } from "./SignoutButton"
import { UserRole } from "@prisma/client"
import { useSession } from "next-auth/react"

export const ResposiveNavBar = () => {
   const [isOpen, setIsOpen] = useState(true)
   const toggleOpen = () => {
      setIsOpen(!isOpen)
   }
   const session = useSession();
   return (
      <>
         {!isOpen && <section className="w-56 text-center rounded-lg p-4 bg-white absolute top-20 left-56 flex gap-4 flex-col">
            <Link
               className="text-black/70 font-semibold text-sm transition-all duration-100 hover:text-blue-900/70"
               href="/contact"
            >
               Contact us
            </Link>
            <Link
               className="text-black/70 font-semibold text-sm transition-all duration-100 hover:text-blue-900/70"
               href="/about"
            >
               About me
            </Link>
            {session?.data?.user?.role == UserRole.ADMIN && (
               <Link
                  className="text-black/70 font-semibold text-sm transition-all duration-100 hover:text-blue-900/70"
                  href="/admin"
               >
                  Manage
               </Link>
            )}
            {
               session?.data?.user && <Link
                  href="/reservelist"
                  className="font-semibold text-black/70 text-sm transition-all text-md duration-200 hover:text-blue-900/70"
               >
                  Reserve List
               </Link>
            }
            {
               session.data?.user ? (
                  <SignoutButton />
               ) : (
                  <Link
                     href="/login"
                     className="font-semibold text-black/70 text-sm transition-all text-md duration-200 hover:text-blue-900/70"
                  >
                     Login
                  </Link>
               )
            }
         </section>
         }
         <button onClick={toggleOpen}>{isOpen ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
         </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>

         }
         </button>
      </>
   )
}