import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import prisma from "../../config/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { auth } from "@/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

async function SpecialistPage({ params }: { params: { compare: string } }) {
   const specialistMap = await prisma.doctors.findMany({
      where: {
         expertise: "Special " + params.compare
      }
   })
   return (
      <div className="grid grid-cols-2 w-[80%] gap-6 mx-auto p-6 max-[675px]:flex max-[675px]:flex-col">
         {
            specialistMap.map((item) => (
               <div key={item.id} className="flex flex-col justify-center p-8 gap-3 rounded-lg bg-white text-center">
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
                  <p className="font-extralight">{item.body}</p>
                  <Link href={`/details/${item.id}`} className={buttonVariants({ variant: "custome2" })}>Visit Profile</Link>
               </div>
            ))
         }
      </div>
   );
}

export default SpecialistPage;