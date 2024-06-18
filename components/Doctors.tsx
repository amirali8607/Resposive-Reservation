import prisma from "@/app/config/db";
import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

async function Doctors() {
   const doctor = await prisma.doctors.findMany({
      include: {
         user: true,
      },
   });
   const session = await auth();
   return (
      <div className="flex gap-10 w-[85%] mx-auto py-12 rounded-xl max-[675px]:flex-col">
         {
            doctor.map(
               (item) =>
                  session?.user.id != item.user.id && (
                     <div
                        className="flex flex-col justify-center p-6 gap-3 rounded-lg bg-white text-center"
                        key={item.id}
                     >
                        <main className="size-40 mx-auto relative">
                           <Image
                              src={item.image!}
                              fill={true}
                              className="rounded-full"
                              alt=""
                           />
                        </main>
                        <main className="flex flex-col gap-1">
                           <h1 className="text-3xl font-bold">{item.name}</h1>
                           <h2 className="text-lg">Expertise: {item.expertise}</h2>
                        </main>
                        <main className="flex justify-between w-full gap-6 items-center">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-8 cursor-pointer"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                              />
                           </svg>
                           <Link
                              href={`/details/${item.id}`}
                              className={buttonVariants({ variant: "custome2" })}
                           >
                              Visit Profile
                           </Link>
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-8 cursor-pointer"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                              />
                           </svg>
                        </main>
                     </div>
                  )
            )}
      </div>
   );
}

export default Doctors;