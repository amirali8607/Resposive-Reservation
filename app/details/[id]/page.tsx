import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { auth } from "@/auth";
import { ReserveButton } from "@/components/SonnerButtons";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { redirect } from "next/navigation";
import prisma from "../../config/db";
import { Button } from "@/components/ui/button";


async function DetailsPage({ params }: { params: { id: string } }) {
   const session = await auth();
   const doctor = await prisma.doctors.findMany({
      where: {
         id: params.id,
      },
      include: {
         user: true
      }
   });
   const trick = await prisma.tricks.findMany({
      where: {
         doctorId: params.id
      }
   })
   return (
      <>
         {doctor.map((item) => (
            <div className="flex flex-col justify-center gap-8">
               <main
                  key={item.id}
                  className="bg-white text-center flex flex-col gap-3 w-[80%] mx-auto rounded-lg p-10"
               >
                  <div className="size-60 mx-auto relative">
                     <Image
                        src={item.user.image!}
                        fill={true}
                        className="rounded-full border border-[#66bd91]"
                        alt=""
                     />
                  </div>
                  <h1 className="text-4xl font-bold">{item.name}</h1>
                  <h2 className="text-lg">Expertise: {item.expertise}</h2>
                  <p className="font-extralight">{item.body}</p>
               </main>
               <main className="bg-white text-center w-[80%] flex flex-col gap-6 mx-auto rounded-lg p-10">
                  <h1 className="font-light">Address: {item.addres}</h1>
                  {item.user.id != session?.user.id && (
                     <Dialog>
                        <DialogTrigger asChild>
                           <Button className="w-full">Trick List</Button>
                        </DialogTrigger>
                        <DialogContent>
                           <DialogHeader>
                              <DialogTitle>Are you absolutely sure?</DialogTitle>
                              <DialogDescription>
                                 This action cannot be undone. This will permanently delete your account
                                 and remove your data from our servers.
                              </DialogDescription>
                           </DialogHeader>
                           <form
                              action={async (formdata: FormData) => {
                                 "use server";
                                 const existsReserve = await prisma.reservelist.findFirst({
                                    where: {
                                       doctorId: item.id,
                                       userId: session?.user.id!,
                                    }
                                 })
                                 if (existsReserve) {
                                    await prisma.reservelist.update({
                                       where: {
                                          doctorId: item.id,
                                          userId: session?.user.id!,
                                          id: existsReserve.id
                                       },
                                       data: {
                                          time: formdata.get("tricktime") as string
                                       }
                                    })
                                    revalidatePath("/reservelist")
                                    redirect("/reservelist")
                                 } else {
                                    await prisma.reservelist.create({
                                       data: {
                                          doctorId: item.id,
                                          userId: session?.user.id!,
                                          time: formdata.get("tricktime") as string,
                                       },
                                    });
                                    revalidatePath("/reservelist")
                                    redirect("/reservelist")
                                 }
                              }
                              }
                              className="flex flex-col gap-3"
                           >
                              <RadioGroup name="tricktime">
                                 {
                                    trick.map((trickItem) => (
                                       <div key={trickItem.id} className="flex gap-1 items-center">
                                          <RadioGroupItem value={trickItem.times} id="r1" className="size-5" />
                                          <Label className="font-semibold text-lg" htmlFor="r1">{trickItem.times}</Label>
                                       </div>
                                    ))
                                 }
                              </RadioGroup>
                              <ReserveButton />
                           </form>
                        </DialogContent>
                     </Dialog>

                  )}
               </main>
            </div>
         ))}
      </>
   );
}

export default DetailsPage;
