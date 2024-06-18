import prisma from "@/app/config/db";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

async function Diseases() {
   const sikness = await prisma.siknesslist.findMany();
   return (
      <div className="flex gap-10 mx-auto py-6 px-16 rounded-xl justify-center max-[850px]:flex-col">
         {sikness.map((item) => (
            <div
               key={item.id}
               className="flex flex-col justify-center gap-3 p-6 bg-white rounded-lg text-center"
            >
               <main className="size-40 mx-auto relative">
                  <Image
                     src={item.image!}
                     fill={true}
                     className="rounded-md"
                     alt=""
                  />
               </main>
               <h1 className="text-4xl font-bold">{item.title}</h1>
               <p className="font-extralight">{item.description}</p>
               <Link
                  href={`/specialist/${item.compare}`}
                  className={buttonVariants({ variant: "default" })}
               >
                  <p>View Specialists</p>
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className="size-5"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                     />
                  </svg>
               </Link>
            </div>
         ))}
      </div>
   );
}

export default Diseases;
