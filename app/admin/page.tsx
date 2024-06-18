import { auth } from "@/auth";
import EditProfile from "@/components/Editprofile";
import { AcceptTrick, CancelTrick, ChangeTimeButton, DeleteTrick, UploadButton } from "@/components/SonnerButtons";
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
import { writeFile } from "fs/promises";
import { Plus } from "lucide-react";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { join } from "path";
import prisma from "../config/db";

async function AdminPage() {
   const session = await auth();
   const doctor = await prisma.doctors.findMany({
      where: {
         userId: session?.user.id!,
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
               className="flex flex-col justify-center w-[60%] max-[675px]:w-full items-center mx-auto gap-6 text-center"
            >
               <section className=" rounded-lg bg-white p-6">
                  <div className="flex justify-center gap-4 max-[675px]:">
                     <div className="size-52 relative">
                        <Image
                           src={item.image!}
                           fill={true}
                           className="rounded-full"
                           alt=""
                        />
                     </div>
                     <form
                        action={async (formdata: FormData) => {
                           "use server";
                           const file: File | null = formdata.get(
                              "image"
                           ) as unknown as File;
                           if (!file) {
                              return console.log("no file uploaded");
                           }
                           const byte = await file.arrayBuffer();
                           const buffer = Buffer.from(byte);
                           const path = join(".", "public/image", file.name);
                           return await writeFile(path, buffer).then(async () => {
                              await prisma.doctors.update({
                                 where: {
                                    id: item.id,
                                 },
                                 data: {
                                    image: path.replace("public", "").replace(/\\/g, "/"),
                                 },
                              });
                              revalidatePath("/admin");
                           });
                        }}
                        className="flex flex-col gap-1"
                     >
                        <label
                           htmlFor="inputtt"
                           className="flex flex-col items-center justify-center size-52 p-8 border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                           <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg
                                 className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                 aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 20 16"
                              >
                                 <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                 />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                 <span className="font-semibold">Click to upload</span> or
                                 drag and drop
                              </p>
                           </div>
                           <input
                              type="file"
                              id="inputtt"
                              name="image"
                              className="hidden"
                           />
                        </label>
                        <UploadButton />
                     </form>
                  </div>
                  <div className="flex flex-col gap-1">
                     <h1 className="text-4xl font-bold">{item.name}</h1>
                     <h2 className="text-lg">Expertise: {item.expertise}</h2>
                  </div>
               </section>
               <section className="flex flex-col gap-4 rounded-lg bg-white p-6">
                  <h2 className="text-2xl">Trick List:</h2>
                  <div className="grid grid-cols-4 gap-5 mx-auto">
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
               </section>
               <section className="rounded-lg bg-white p-6 flex flex-col gap-3">
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

export default AdminPage;
