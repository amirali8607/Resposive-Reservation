import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger
} from "@/components/ui/dialog";
import prisma from "@/app/config/db";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserRole } from "@prisma/client";
import { writeFile } from "fs/promises";
import { redirect } from "next/navigation";
import { join } from "path";

async function CreateProfile() {
   const session = await auth()
   return (
      <>
         <Dialog>
            <DialogTrigger asChild>
               <Button variant="custome2">Create Profile</Button>
            </DialogTrigger>
            <DialogContent>
               <DialogHeader>
                  <DialogTitle className="text-2xl">Create your profile</DialogTitle>
                  <DialogDescription>
                     Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
               </DialogHeader>

               {
                  session?.user.role === UserRole.ADMIN && (
                     <form action={
                        async (formdata: FormData) => {
                           "use server"
                           const existingDoctor = await prisma.doctors.findUnique({
                              where: {
                                 name: formdata.get("name") as string
                              }
                           })
                           if (existingDoctor) {
                              return console.log("Your Profile has already been made!")
                           }
                           return await prisma.doctors.create({
                              data: {
                                 userId: session.user.id!,
                                 name: formdata.get("name") as string,
                                 expertise: formdata.get("expertise") as string,
                                 body: formdata.get("body") as string,
                                 addres: formdata.get("addres") as string,
                              }
                           })
                        }
                     } className="flex flex-col gap-2 bg-white rounded-lg">
                        <div>
                           <Label>Name:</Label>
                           <Input name="name" />
                        </div>
                        <div>
                           <Label>Expertise:</Label>
                           <Input name="expertise" />
                        </div>
                        <div>
                           <Label>Address:</Label>
                           <Textarea name="addres" />
                        </div>
                        <div>
                           <Label>Discription:</Label>
                           <Textarea name="body" />
                        </div>
                        <label htmlFor="inputtt" className="flex flex-col items-center justify-center w-full border-2 border-gray-400 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                           <div className="flex items-center justify-center p-3">
                              <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                              </svg>
                              <input type="file" id="inputtt" name="image" className="hidden" />
                           </div>
                        </label>
                        <Button type="submit">Build</Button>
                     </form>
                  )
               }
            </DialogContent>
         </Dialog>
      </>
   );
}

export default CreateProfile;