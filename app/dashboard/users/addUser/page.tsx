import { CreateUser } from "@/app/actions/Dashboard/create"
import { redirect } from "next/navigation"
import noprof from '@/public/image/555.jpg'
import Image from "next/image"
export default function AddUserPage() {
   return (
      <form action={
         async (formdata: FormData) => {
            "use server"
            await CreateUser(formdata)
            redirect("/dashboard")
         }
      } className="w-full flex gap-4">
         <main className="bg-white dark:bg-[#151c2c] rounded-lg p-6 w-full flex flex-col items-center h-fit gap-2 ">
            <Image src={noprof} alt="" className="h-60 w-60 rounded-full" width={100} height={100} />
            <label
               htmlFor="inputtt"
               className="flex items-center justify-center h-10 w-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#CCC5B9] transition-all duration-300 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                  required
                  className="hidden"
               />
            </label>
         </main>
         <main className="w-full flex flex-col gap-6 bg-white dark:bg-[#151c2c] rounded-lg p-4">
            <h1 className="text-2xl font-semibold text-center">Add User Form</h1>
            <input type="text" className="p-3 rounded-md bg-[#CCC5B9] outline-none placeholder-black dark:bg-[#2d3b5e] dark:placeholder-white" name="name" placeholder="Username" required />
            <input type="text" className="p-3 rounded-md bg-[#CCC5B9] outline-none placeholder-black dark:bg-[#2d3b5e] dark:placeholder-white" name="email" placeholder="Email Address" required />
            <input type="password" className="p-3 rounded-md bg-[#CCC5B9] outline-none placeholder-black dark:bg-[#2d3b5e] dark:placeholder-white" name="password" placeholder="Passowrd" required />
            <input type="text" className="p-3 rounded-md bg-[#CCC5B9] outline-none placeholder-black dark:bg-[#2d3b5e] dark:placeholder-white" name="phone" placeholder="Phone Number" required />
            <input type="text" className="p-3 rounded-md bg-[#CCC5B9] outline-none placeholder-black dark:bg-[#2d3b5e] dark:placeholder-white" name="createdAt" placeholder="Created At" required />
            <select name="role" required className="p-3 rounded-md bg-[#CCC5B9] dark:bg-[#2d3b5e] outline-none">
               <option value="general" disabled>Role?</option>
               <option value="USER">USER</option>
               <option value="DOCTOR">DOCTOR</option>
               <option value="ADMIN">ADMIN</option>
            </select>
            <select name="isActive" required className="p-3 rounded-md bg-[#CCC5B9] dark:bg-[#2d3b5e] outline-none">
               <option value="general" disabled>is Active?</option>
               <option value="done">Done</option>
               <option value="pending">Pending</option>
               <option value="canceled">canceled</option>
            </select>
            <button className="bg-blue-900/80 text-white rounded-md font-semibold p-2" type="submit">Create User</button>
         </main>
      </form>
   )
}