import prisma from "@/app/config/db";
import { auth } from "@/auth";
import navbarpic from "@/public/home/navbarpic.png";
import { UserRole } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import CreateProfile from "./Createprofile";
import { ResposiveNavBar } from "./ResposiveNavbar";
import { SignoutButton } from "./SignoutButton";

async function Navbar() {
   const session = await auth();
   const user = session?.user;
   const doctor = await prisma.doctors.findFirst({
      where: {
         userId: session?.user.id,
      },
   })
   return (
      <nav className="w-[55%] flex justify-between items-center p-6 rounded-xl border border-[#CCC5B9] mt-6 mx-auto h-10 max-[675px]:w-[90%]">
         <section className="flex items-center gap-2">
            <Link href="/">
               <Image className="size-8" src={navbarpic} alt="" />
            </Link>
            <Link href="/" className="text-xl text-blue-900 font-extrabold">
               Reservation
            </Link>
         </section>
         <section className="flex items-center gap-4 max-[675px]:hidden">
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
            {
               user?.role == UserRole.ADMIN && (
                  <Link className="text-black/70 font-semibold text-sm transition-all duration-100 hover:text-blue-900/70" href="/dashboard">Dashboard</Link>
               )
            }
            {
               user?.role == UserRole.DOCTOR && (
                  <Link
                     className="text-black/70 font-semibold text-sm transition-all duration-100 hover:text-blue-900/70"
                     href="/doctorinfo"
                  >
                     Manage
                  </Link>
               )
            }
            {
               user ? (
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
         <section className="flex items-center min-[675px]:hidden">
            <ResposiveNavBar />
         </section>
         <section className="flex gap-2 max-[675px]:hidden">
            {!user && (
               <Link
                  href="/register"
                  className="py-1 px-3 rounded-md border border-blue-900 text-blue-900 font-semibold"
               >
                  Register
               </Link>
            )}
            {session?.user.role === UserRole.DOCTOR && !doctor && <CreateProfile />}
            {user && (
               <Link href="/reservelist">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className="size-6 text-blue-900"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                     />
                  </svg>
               </Link>
            )}

         </section>
      </nav>
   );
}

export default Navbar;