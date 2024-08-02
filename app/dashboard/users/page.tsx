import prisma from "@/app/config/db";
import { DeleteUserButton } from "@/components/Buttons";
import Search from "@/components/dashboard/Serach";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import Link from "next/link";
export default async function UsersPage({ searchParams }: { searchParams: Params }) {
   const query = searchParams?.q;
   const users = await prisma.user.findMany({
      where: {
         name: {
            contains: query,
         },
      },
      orderBy: {
         id: "asc",
      },
   })
   return (
      <div className="w-full flex flex-col gap-6 bg-white dark:bg-[#151c2c] transition-all p-4 rounded-lg">
         <main className="flex justify-between items-center">
            <Search />
            <Link href="/dashboard/users/addUser" className="bg-blue-900/80 text-white p-1 rounded-md">Add New</Link>
         </main>
         <table>
            <thead>
               <tr>
                  <td className="font-semibold">Name</td>
                  <td className="font-semibold">Email</td>
                  <td className="font-semibold">Phone</td>
                  <td className="font-semibold">Role</td>
                  <td className="font-semibold">Action</td>
               </tr>
            </thead>
            <tbody>
               {
                  users.map((item) => (
                     <tr>
                        <td>
                           <div className="flex gap-2 items-center p-2">
                              <Image alt="" width={100} height={100} className="h-12 w-12 rounded-full" src={item.image!} />
                              <h1>{item.name}</h1>
                           </div>
                        </td>
                        <td>{item.email}</td>
                        <td>{item.phonenumber}</td>
                        <td className="font-bold">{item.role}</td>
                        <td>
                           <div className="flex gap-1">
                              <Link href={{ pathname: `/dashboard/users/${item.id}`, query: { username: item.name, email: item.email, password: item.password, phonenumber: item.phonenumber, isAdmin: item.role, isActive: item.status } }} className="rounded-md bg-green-600 px-2 p-1 text-white font-semibold">Edit</Link>
                              <DeleteUserButton id={item.id} />
                           </div>
                        </td>
                     </tr>
                  ))
               }
            </tbody>
         </table>
      </div>
   )
}