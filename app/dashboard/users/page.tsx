import prisma from "@/app/config/db";
import { auth } from "@/auth";
// import { DeleteUserButton } from "@/components/SonnerButtons";
import Search from "@/components/dashboard/Serach";
import { UserRole } from "@prisma/client";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Image from "next/image";
import Link from "next/link";
export default async function UsersPage({ searchParams }: { searchParams: Params }) {
   const session = await auth()
   const query = searchParams?.q;
   const users = await prisma.user.findMany({
      where: {
         NOT: {
            id: session?.user.id
         },
         name: {
            contains: query,
         },
      },
      orderBy: {
         id: "asc",
      },
   })
   return (
      <div className="w-full flex flex-col gap-6 bg-white p-4 rounded-lg">
         <main className="flex justify-between">
            <Search />
            {
               session?.user.role == UserRole.ADMIN &&
               <Link href="/dashboard/users/addUser" className="bg-blue-900/80 p-1 rounded-md">Add New</Link>
            }
         </main>
         <table>
            <thead>
               <tr>
                  <td className="font-semibold">Name</td>
                  <td className="font-semibold ">Email</td>
                  <td className="font-semibold ">Created At</td>
                  <td className="font-semibold ">Role</td>
                  <td className="font-semibold ">Status</td>
                  <td className="font-semibold text-center">Action</td>
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
                        <td>{item.createdAt}</td>
                        <td className="font-bold">{item.role === UserRole.USER ? "CLIENT" : "ADMIN"}</td>
                        <td className="font-bold">{item.status === "Done" ? "Active" : "notActive"}</td>
                        <td>
                           <div className="flex gap-1">
                              <Link href={{ pathname: `/dashboard/users/${item.id}`, query: { username: item.name, email: item.email, password: item.password, phonenumber: item.phonenumber, isAdmin: item.role, isActive: item.status } }} className="rounded-md bg-green-600 cursor-pointer p-1">Edit User</Link>
                              {/* <DeleteUserButton id={item.id} /> */}
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