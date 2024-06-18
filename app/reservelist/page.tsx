import { auth } from "@/auth";
import { CancelReserve } from "@/components/SonnerButtons";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import prisma from "../config/db";
import { Button } from "@/components/ui/button";

async function ReservelistPage() {
   const session = await auth()
   const reservelist = await prisma.reservelist.findMany({
      where: { userId: session?.user.id },
      include: { doctor: true }
   })
   const list = await prisma.reservelist.findFirst()
   const trick = await prisma.tricks.findFirst({
      where: {
         times: list?.time!
      }
   })
   return (
      <section className="w-[90%] grid grid-cols-3 gap-6 mx-auto max-[675px]:flex max-[675px]:flex-col">
         {
            reservelist.map((item) => (
               <div key={item.id} className="flex flex-col gap-3 w-full mx-auto justify-center p-8 rounded-lg bg-white text-center">
                  <main className="size-40 mx-auto relative">
                     <Image src={item.doctor.image!} fill={true} className="rounded-full" alt="" />
                  </main>
                  <h1 className="text-3xl font-bold">{item.doctor.name}</h1>
                  <p className="font-semibold">Time: {item.time}</p>
                  <form action={
                     async () => {
                        "use server"
                        await prisma.reservelist.delete({
                           where: {
                              id: item.id
                           }
                        })
                        revalidatePath("/reservelist")
                     }
                  }>
                     {

                        item.time == trick?.times ?
                           <CancelReserve />
                           :
                           <div className="flex flex-col gap-2">
                              <p className="text-sm text-yellow-700">Your reservation has been confirmed by the doctor</p>
                              <Button variant="custome" type="submit" className="bg-green-600 w-full text-white">OK!</Button>
                           </div>
                     }
                  </form>
               </div>
            )
            )
         }
      </section>
   );
}

export default ReservelistPage;