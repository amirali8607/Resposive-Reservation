import prisma from "@/app/config/db";
import EditDoctorDialog from "@/components/dashboard/Dialogs/EditDoctor";
import Image from "next/image";

export default async function ProductIdPage({ params, searchParams }: { params: { id: string }, searchParams: { [key: string]: string | string[] | undefined }; }) {
   const doctorInfo = await prisma.doctors.findMany({
      where: {
         id: params.id
      },
      include: {
         user: true
      }
   })
   return (
      <div className="flex flex-col justify-center items-center">
         {
            doctorInfo.map((item) => (
               <div key={item.id} className="flex flex-col gap-4 w-full">
                  <main className="flex flex-col items-center gap-2 rounded-lg bg-white p-6">
                     <Image src={item.user?.image!} className="size-60 rounded-full object-cover" alt="" width={100} height={100} />
                     <h1 className="text-3xl font-bold">{item.name}</h1>
                  </main>
                  <main className="flex flex-col items-center gap-2 rounded-lg bg-white p-6">
                     <p className="font-semibold text-2xl text-blue-900/80">Details</p>
                     <h1 className="text-lg font-semibold">Expertise: {item.expertise}</h1>
                     <p className="">Address: {item.addres}</p>
                     <p className="text-center">Description: {item.body}</p>
                  </main>
                  <main className="flex flex-col gap-2 rounded-lg bg-white p-6">
                     <EditDoctorDialog id={item.id} searchParams={searchParams} />
                     <h1 className="font-light text-sm text-center">Styled By: Amirali Abdelahi</h1>
                  </main>
               </div>
            ))
         }
      </div>
   )
}
