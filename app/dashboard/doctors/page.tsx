import prisma from '@/app/config/db';
import { auth } from '@/auth';
// import { DeleteProdButton } from '@/components/Buttons';
import Search from '@/components/dashboard/Serach';
import { UserRole } from '@prisma/client';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import Image from 'next/image';
import Link from 'next/link';
export default async function DoctorInfoPage({ searchParams }: { searchParams: Params }) {
   const query = searchParams?.q
   const products = await prisma.doctors.findMany({
      where: {
         name: {
            contains: query
         }
      }
      ,
      include: {
         user: true
      }
   })
   const session = await auth()
   return (
      <div className="w-full flex flex-col gap-6 bg-[#151c2c] p-4 rounded-lg">
         <main className="flex justify-between">
            <Search />
            <Link href="/dashboard/products/addProduct" className="bg-purple-600 p-1 rounded-md font-semibold">Add New</Link>
         </main>
         <table>
            <thead >
               <tr>
                  <td className="font-semibold text-lg">Name</td>
                  <td className="font-semibold text-lg text-center">Address</td>
                  <td className="font-semibold text-lg text-center">Expertise</td>
                  <td className="font-semibold text-lg text-center">Description</td>
                  <td className="font-semibold text-lg text-center">Action</td>
               </tr>
            </thead>
            <tbody className='text-center'>
               {
                  products.map((item) => (
                     <tr>
                        <td>
                           <div className="flex gap-2 items-center p-2">
                              <Image alt="" width={100} height={100} className="h-12 w-12 rounded-full" src={item.user.image!} />
                              <h1>{item.name}</h1>
                           </div>
                        </td>
                        <td className="text-sm font-light">{item.addres}</td>
                        <td className='font-bold'>{item.expertise}</td>
                        <td className="text-sm font-light">{item.body}</td>
                        <td>
                           <div className="flex gap-1">
                              <Link href={{ pathname: `/dashboard/products/${item.id}`, query: { body: item.body, expertise: item.expertise, address: item.addres } }} className="rounded-md font-semibold bg-green-600 cursor-pointer p-1">View</Link>
                              {/* <DeleteProdButton id={item.id} /> */}
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