import prisma from "@/app/config/db"

export default async function Information() {
   const usersTotal = await prisma.user.count()
   const sicknessStock = await prisma.$queryRaw`SELECT SUM(stock) as stock FROM Siknesslist;`
   return (
      <section id="detailsUser" className="grid grid-cols-3 gap-4">
         <main className="flex flex-col gap-3 rounded-lg text-center bg-white p-4 hover:bg-[#e4e0d9] transition-all duration-200">
            <p className="flex gap-2">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
               >
                  <path
                     fillRule="evenodd"
                     d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                     clipRule="evenodd"
                  />
               </svg>
               Total Users
            </p>
            <h1 className="text-2xl font-bold">{usersTotal}</h1>
            <p><span className="text-green-600">12%</span> more than previos week</p>

         </main>
         <main className="flex flex-col gap-3 rounded-lg text-center bg-white p-4 hover:bg-[#e4e0d9] transition-all duration-200">
            <p className="flex gap-2">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
               >
                  <path
                     fillRule="evenodd"
                     d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                     clipRule="evenodd"
                  />
               </svg>
               Stock
            </p>
            <h1 className="text-2xl font-bold">{sicknessStock[0].stock as string}</h1>
            <p><span className="text-red-600">1%</span> more than previos week</p>

         </main>
         <main className="flex flex-col gap-3 rounded-lg text-center bg-white p-4 hover:bg-[#e4e0d9] transition-all duration-200">
            <p className="flex gap-2">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
               >
                  <path
                     fillRule="evenodd"
                     d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                     clipRule="evenodd"
                  />
               </svg>
               Revenue
            </p>
            <h1 className="text-2xl font-bold">6,642</h1>
            <p><span className="text-green-600">12%</span> more than previos week</p>
         </main>
      </section>
   )
}