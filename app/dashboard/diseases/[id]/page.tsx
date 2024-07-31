import prisma from "@/app/config/db";
import EditDoctorDialog from "@/components/dashboard/Dialogs/EditDoctor";
import EditSicknessDialog from "@/components/dashboard/Dialogs/EditSickness";
import Image from "next/image";

export default async function SicknessIdPage({ params, searchParams }: { params: { id: string }, searchParams: { [key: string]: string | string[] | undefined }; }) {
   const diseases = await prisma.siknesslist.findMany({
      where: {
         id: params.id
      }
   })
   return (
      <div className="flex flex-col justify-center items-center">
         {
            diseases.map((item) => (
               <div key={item.id} className="flex flex-col gap-4 w-full">
                  <main className="flex flex-col items-center gap-2 rounded-lg bg-white p-6">
                     <Image src={item.image!} className="size-60 rounded-md object-cover" alt="" width={100} height={100} />
                     <h1 className="text-3xl font-bold">{item.title}</h1>
                  </main>
                  <main className="flex flex-col items-center gap-2 rounded-lg bg-white p-6">
                     <p className="font-semibold text-2xl text-blue-900/80">-Details-</p>
                     <h1 className="text-lg font-semibold">Stock: {item.stock}</h1>
                     <p className="">Description: {item.description}</p>
                     <p className="text-center">Created At: {item.createdAt}</p>
                  </main>
                  <main className="flex flex-col rounded-lg bg-white p-6 gap-2">
                     <EditSicknessDialog id={item.id} searchParams={searchParams} />
                     <h1 className="font-light text-sm text-center">Styled By: Amirali Abdelahi</h1>
                  </main>
               </div>
            ))
         }
      </div>
   )
}
