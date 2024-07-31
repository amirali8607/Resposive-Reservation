import { UpdateDoctor } from "@/app/actions/Dashboard/update"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { redirect } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function EditDoctorDialog({ id, searchParams }: { id: string, searchParams: { [key: string]: string | string[] | undefined }; }) {
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button className="w-full">Edit Doctor Info</Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
               <DialogTitle>Edit Doctor Info</DialogTitle>
               <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
               </DialogDescription>
            </DialogHeader>

            <form action={
               async (data: FormData) => {
                  "use server"
                  await UpdateDoctor(id, data)
                  redirect("/dashboard/doctors")
               }
            } className="w-full flex flex-col gap-2 rounded-lg">
               <div className="flex flex-col gap-2">
                  <Label>Name</Label>
                  <Input defaultValue={searchParams.username} className="p-2 rounded-md  bg-[#CCC5B9]" type="text" name="username" required />
               </div>
               <div className="flex flex-col gap-2">
                  <Label>Expertise</Label>
                  <Input defaultValue={searchParams.expertise} className="p-2 rounded-md  bg-[#CCC5B9]" type="text" name="expertise" required />
               </div>
               <div className="flex flex-col gap-2">
                  <Label>Address</Label>
                  <Textarea rows={5} defaultValue={searchParams.address} className="p-2 rounded-md  bg-[#CCC5B9]" name="address" required />
               </div>
               <div className="flex flex-col gap-2">
                  <Label>Body</Label>
                  <Textarea rows={5} defaultValue={searchParams.body} className="p-2 rounded-md  bg-[#CCC5B9]" name="body" />
               </div>
               <button className="bg-blue-900/80 text-white p-2 font-semibold rounded-md" type="submit">Update Doctorinfo</button>
            </form>
         </DialogContent>
      </Dialog>
   )
}