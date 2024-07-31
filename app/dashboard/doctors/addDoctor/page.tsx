import { CreateDoctor } from "@/app/actions/Dashboard/create"
import prisma from "@/app/config/db"
import { UserRole } from "@prisma/client"
import { redirect } from "next/navigation"

export default async function AddDoctorPage() {
   const UserId = await prisma.user.findMany({
      where: {
         role: UserRole.DOCTOR,
      }
   })
   return (
      <form className="flex flex-col gap-4 bg-white rounded-md p-4" action={
         async (data: FormData) => {
            "use server"
            await CreateDoctor(data)
            redirect("/dashboard")
         }
      }>
         <h1 className="text-center text-3xl font-semibold">Add Doctor Info</h1>
         <input type="text" name="name" placeholder="Doctor name" className="p-3 rounded-md bg-[#CCC5B9]" />
         <input type="text" name="expertise" placeholder="Expertise" className="p-3 rounded-md bg-[#CCC5B9]" />
         <textarea rows={4} name="body" placeholder="Description" className="p-3 rounded-md bg-[#CCC5B9]"></textarea>
         <textarea rows={4} placeholder="Address" name="address" className="p-3 rounded-md bg-[#CCC5B9]"></textarea>
         <select className="p-3 rounded-md bg-[#CCC5B9]" name="isDoctor">
            <option value="" disabled>Which User?</option>
            {
               UserId.map((item) => (
                  <option value={item.id}>{item.email}</option>
               ))
            }
         </select>
         <button type="submit" className="bg-blue-900/80 text-white font-semibold rounded-md p-3">Sync</button>
      </form>
   )
}