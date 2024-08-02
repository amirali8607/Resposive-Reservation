import { UpdateDiseases } from "@/app/actions/Dashboard/update"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { redirect } from "next/navigation"

export default function EditSicknessDialog({ id, searchParams }: { id: number, searchParams: { [key: string]: string | string[] | undefined }; }) {
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button className="w-full">Edit Diseases</Button>
         </DialogTrigger>
         <DialogContent className="max-w-xl bg-white">
            <DialogHeader>
               <DialogTitle>Edit Sickness</DialogTitle>
               <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
               </DialogDescription>
            </DialogHeader>
            <form action={
               async (data: FormData) => {
                  "use server"
                  await UpdateDiseases(id, data)
                  redirect("/dashboard/diseases")
               }
            } className="w-full flex gap-4 rounded-lg">
               <main>
                  <label
                     htmlFor="inputtt"
                     className="flex items-center justify-center h-full w-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#CCC5B9] transition-all duration-300 dark:hover:bg-bray-800 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                     <svg
                        className="w-8 h-8 text-gray-500 dark:text-gray-400"
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
                     <input
                        type="file"
                        id="inputtt"
                        name="file"
                        className="hidden"
                     />
                  </label>
               </main>
               <main className="w-full flex flex-col gap-2">
                  <Input defaultValue={searchParams.title} className="p-2 rounded-md  bg-[#CCC5B9]" type="text" placeholder="Title" name="title" />
                  <Input defaultValue={searchParams.stock} className="p-2 rounded-md  bg-[#CCC5B9]" type="text" placeholder="Stock" name="stock" />
                  <input type="text" defaultValue={searchParams.createdAt} className="p-2 rounded-md  bg-[#CCC5B9]" placeholder="CreatedAt" name="createdAt" />
                  <Textarea defaultValue={searchParams.body} className="p-2 rounded-md  bg-[#CCC5B9]" placeholder="Description" name="body" ></Textarea>
                  <button className="bg-blue-900/80 text-white p-2 font-semibold rounded-md" type="submit">Update Sickness</button>
               </main>
            </form>
         </DialogContent>
      </Dialog>
   )
}