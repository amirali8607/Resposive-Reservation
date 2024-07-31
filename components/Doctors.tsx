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
                  <div
                     className={`flex flex-col ${session?.user.id == item.user?.id ? "bg-blue-300" : "bg-white"} justify-center p-6 gap-3 rounded-lg text-center`}
                     key={item.id}
                  >
                     <main className="size-40 mx-auto relative">
                        <Image
                           src={item.user?.image!}
                           fill={true}
                           className="rounded-full"
                           alt=""
                        />
                     </main>
                     <main className="flex flex-col gap-1">
                        <h1 className="text-3xl font-bold">{item.name}</h1>
                        <h2 className="text-lg">Expertise: {item.expertise}</h2>
                     </main>
                     <Link
                        href={`/doctorprofile/${item.id}`}
                        className={buttonVariants({ variant: "custome2" })}
                     >
                        Visit Profile
                     </Link>
                  </div>
            )
         }
      </div>
   );
}

export default Doctors;