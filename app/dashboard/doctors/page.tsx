import prisma from '@/app/config/db';
import { auth } from '@/auth';
import { DeleteDoctorButton } from '@/components/Buttons';
import Search from '@/components/dashboard/Serach';
import { UserRole } from '@prisma/client';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import Image from 'next/image';
import Link from 'next/link';
export default async function DoctorInfoPage({ searchParams }: { searchParams: Params }) {
   const query = searchParams?.q
   const doctors = await prisma.doctors.findMany({
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
   return (
      <div className="w-full flex flex-col gap-6 bg-white dark:bg-[#151c2c] transition-all p-4 rounded-lg">
         <main className="flex justify-between">
            <Search />
            <Link href="/dashboard/doctors/addDoctor" className="bg-yellow-500/80 text-white p-1 rounded-md">Sync User</Link>
         </main>
         <table>
            <thead >
               <tr>
                  <td className="font-semibold text-lg">Name</td>
                  <td className="font-semibold text-lg text-center">Address</td>
                  <td className="font-semibold text-lg text-center">Expertise</td>
                  <td className="font-semibold text-lg text-center">Action</td>
               </tr>
            </thead>
            <tbody className='text-center'>
               {
                  doctors.map((item) => (
                     <tr>
                        <td>
                           <div className="flex gap-2 items-center p-2">
                              <Image alt="" width={100} height={100} className="h-12 w-12 rounded-full" src={item.user?.image!} />
                              <h1>{item.name}</h1>
                           </div>
                        </td>
                        <td className="text-sm font-light">{item.addres}</td>
                        <td className='font-bold'>{item.expertise}</td>
                        <td>
                           <div className='flex gap-1 justify-center'>
                              <Link href={{ pathname: `/dashboard/doctors/${item.id}`, query: { body: item.body, expertise: item.expertise, address: item.addres, username: item.name } }} className="rounded-md font-semibold text-white bg-green-600 cursor-pointer p-1">View</Link>
                              <DeleteDoctorButton id={item.id} />
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