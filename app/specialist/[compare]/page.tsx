import { auth } from "@/auth";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import prisma from "../../config/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

async function SpecialistPage({ params }: { params: { compare: string } }) {
   const session = await auth()
   const specialistMap = await prisma.doctors.findMany({
      where: {
         expertise: "Special " + params.compare
      },
      include: {
         user: true
      }
   })
   return (
      <div className="h-screen flex flex-col gap-10">
         <Navbar />
         <main className="grid grid-cols-2 w-[80%] gap-6 mx-auto p-6 max-[675px]:flex max-[675px]:flex-col">
            {
               specialistMap.map((item) => (
                  <div key={item.id} className={`flex flex-col justify-center p-8 gap-3 rounded-lg ${session?.user.id == item.user?.id ? "bg-blue-300" : "bg-white"} text-center`}>
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
                     <p className="font-extralight">{item.body}</p>
                     <Link href={`/doctorprofile/${item.id}`} className={buttonVariants({ variant: "custome2" })}>Visit Profile</Link>
                  </div>
               ))
            }
         </main>
         <Footer />
      </div>
   );
}

export default SpecialistPage;