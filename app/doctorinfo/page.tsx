import { auth } from "@/auth";
import EditProfile from "@/components/Editprofile";
import { AcceptTrick, CancelTrick, ChangeTimeButton, DeleteTrick } from "@/components/SonnerButtons";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import prisma from "../config/db";

async function DoctorInfoPage() {
   const session = await auth();
   const doctor = await prisma.doctors.findMany({
      where: {
         userId: session?.user.id!,
      },
      include: {
         user: true
      }
   });
   const trick = await prisma.tricks.findMany({
      where: {
         userId: session?.user.id!,
      }
   });
   const reservelist = await prisma.reservelist.findFirst();
   return (
      <>
         {doctor.map((item) => (
            <div
               key={item.id}
               className="flex flex-col justify-center w-[40%] max-[675px]:w-full items-center mx-auto gap-6 text-center"
            >
               <section className="flex gap-6 w-full [&>main]:w-full">
                  <main className="flex flex-col bg-white rounded-lg items-center justify-center p-6">
                     <div className="size-52 relative">
                        <Image
                           src={item.user.image!}
                           fill={true}
                           className="rounded-full"
                           alt=""
                        />
                     </div>
                     <div className="flex flex-col gap-1">
                        <h1 className="text-4xl font-bold">{item.name}</h1>
                        <h2 className="text-lg">Expertise: {item.expertise}</h2>
                     </div>
                  </main>
                  <main className="flex flex-col gap-2 justify-center bg-white rounded-lg  p-6">
                     <h2 className="text-2xl">Trick List:</h2>
                     <div className="grid grid-cols-2 gap-5 mx-auto">
                        {trick.map((itemTrick) => (
                           <div key={itemTrick.id} className="flex flex-col gap-2 outline-dotted outline-offset-2">
                              <h1 className="font-semibold text-md">{itemTrick.times}</h1>
                              {
                                 itemTrick.times == reservelist?.time ? (
                                    <div className="flex flex-col gap-2">
                                       <p className="text-green-500 font-light">
                                          this trick was taken
                                       </p>
                                       <div className="flex gap-3 justify-center">
                                          <form action={
                                             async () => {
                                                "use server"
                                                await prisma.tricks.delete({
                                                   where: {
                                                      id: itemTrick.id,
                                                   }
                                                })
                                                revalidatePath("/admin")
                                             }
                                          }>
                                             <AcceptTrick />
                                          </form>
                                          <form action={
                                             async () => {
                                                "use server"
                                                await prisma.reservelist.delete({
                                                   where: {
                                                      id: reservelist.id,
                                                      doctorId: item.id,
                                                   }
                                                })
                                                revalidatePath("/admin")
                                             }
                                          }>
                                             <CancelTrick />
                                          </form>
                                       </div>
                                    </div>
                                 ) : (
                                    <div className="flex flex-col gap-2">
                                       <p className="text-red-500 font-light">
                                          this trick was not taken
                                       </p>
                                       <form action={
                                          async () => {
                                             "use server"
                                             await prisma.tricks.delete({
                                                where: {
                                                   id: itemTrick.id,
                                                }
                                             })
                                             revalidatePath("/admin")
                                          }
                                       }>
                                          <DeleteTrick />
                                       </form>
                                    </div>
                                 )}
                           </div>
                        ))}
                     </div>
                     <Dialog>
                        <DialogTrigger asChild>
                           <Plus className="cursor-pointer mx-auto size-8" />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                           <DialogHeader>
                              <DialogTitle className="text-2xl">
                                 Add Time Trick
                              </DialogTitle>
                              <DialogDescription>
                                 Make changes to your profile here. Click save when you're
                                 done.
                              </DialogDescription>
                           </DialogHeader>
                           <form
                              action={async (formdata: FormData) => {
                                 "use server";
                                 await prisma.tricks.create({
                                    data: {
                                       doctorId: item.id,
                                       userId: session?.user.id!,
                                       times: formdata.get("time") as string,
                                    },
                                 });
                                 revalidatePath("/admin");
                              }}
                              className="grid gap-4 py-4"
                           >
                              <div className="grid grid-cols-4 items-center gap-4">
                                 <Label className="text-right">Time</Label>
                                 <Input name="time" className="col-span-3" />
                              </div>
                              <ChangeTimeButton />
                           </form>
                        </DialogContent>
                     </Dialog>
                  </main>
               </section>
               <section className="rounded-lg bg-white p-6 flex flex-col gap-3 w-full">
                  <p className="font-extralight">{item.body}</p>
                  <div className="flex gap-2">
                     <EditProfile id={item.id} />
                     <Button className="w-full">Share Profile</Button>
                  </div>
               </section>
            </div>
         ))}
      </>
   );
}

export default DoctorInfoPage;
