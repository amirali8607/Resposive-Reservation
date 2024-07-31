import { Button } from "@/components/ui/button"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "./ui/textarea";
import { redirect } from "next/navigation";
import prisma from "@/app/config/db";
import { EditProfileButton } from "./Buttons";
import { auth } from "@/auth";
async function EditProfile({ id }: { id: string }) {
   const session = await auth()
   const profile = await prisma.doctors.findFirst({
      where: {
         userId: session?.user.id
      }
   })
   return (
      <>
         <Dialog>
            <DialogTrigger asChild>
               <Button className="w-full">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
               <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                     Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
               </DialogHeader>
               <form className="grid gap-4 py-4" action={
                  async (formdata: FormData) => {
                     "use server"
                     await prisma.doctors.update({
                        where: {
                           id
                        },
                        data: {
                           name: formdata.get("name") as string,
                           expertise: formdata.get("expertise") as string,
                           body: formdata.get("body") as string,

                        }
                     })
                     redirect('/')
                  }
               }>
                  <div className="grid grid-cols-4 items-center gap-4">
                     <Label htmlFor="name" className="text-right">
                        Name
                     </Label>
                     <Input
                        name="name"
                        className="col-span-3"
                        defaultValue={profile?.name}
                     />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                     <Label className="text-right">
                        Expertise
                     </Label>
                     <Input
                        name="expertise"
                        className="col-span-3"
                        defaultValue={profile?.expertise}
                     />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                     <Label className="text-right">Address:</Label>
                     <Textarea name="addres" className="col-span-3" defaultValue={profile?.addres!} />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                     <Label className="text-right">
                        Description
                     </Label>
                     <Textarea
                        name="body"
                        className="col-span-3"
                        defaultValue={profile?.body}
                     />
                  </div>
                  <EditProfileButton />
               </form>
            </DialogContent>
         </Dialog>
      </>
   );
}

export default EditProfile;