import prisma from '@/app/config/db';
import { auth } from '@/auth';
import Search from '@/components/dashboard/Serach';
import { DeleteSicknessButton } from '@/components/Buttons';
import { UserRole } from '@prisma/client';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import Image from 'next/image';
import Link from 'next/link';
export default async function DiseasisPage({ searchParams }: { searchParams: Params }) {
   const query = searchParams?.q
   const diseases = await prisma.siknesslist.findMany({
      where: {
         title: {
            contains: query
         }
      },
   })
   const session = await auth()
   return (
      <div className="w-full flex flex-col gap-6 bg-white dark:bg-[#151c2c] p-4 rounded-lg">
         <main className="flex justify-between items-center">
            <Search />
            <Link href="/dashboard/diseases/addSickness" className="bg-blue-900/80 text-white p-1 rounded-md">Add New</Link>
         </main>
         <table>
            <thead >
               <tr>
                  <td className="font-semibold text-lg">Title</td>
                  <td className="font-semibold text-lg text-center">Stock</td>
                  <td className="font-semibold text-lg text-center">Description</td>
                  <td className="font-semibold text-lg">Action</td>
               </tr>
            </thead>
            <tbody className='text-center'>
               {
                  diseases.map((item) => (
                     <tr>
                        <td>
                           <div className="flex gap-2 items-center p-2">
                              <Image alt="" width={100} height={100} className="size-10 rounded-md" src={item.image!} />
                              <h1>Special {item.title}</h1>
                           </div>
                        </td>
                        <td className='font-bold'>{item.stock}</td>
                        <td className="text-sm font-light">{item.description}</td>
                        <td>
                           <div className="flex gap-1">
                              <Link href={{ pathname: `/dashboard/diseases/${item.id}`, query: { body: item.description, title: item.title, createdAt: item.createdAt, stock: item.stock } }} className="rounded-md bg-green-600 text-white font-semibold p-1">View</Link>
                              <DeleteSicknessButton id={item.id} />
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