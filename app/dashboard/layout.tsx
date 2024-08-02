import Navbar from "@/components/dashboard/Navbar";
import Rightbar from "@/components/dashboard/Rightbar";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div className={`flex text-black bg-[#CCC5B9] dark:bg-[#0f121b] dark:text-white transition-all`}>
         <Sidebar />
         <main className="w-full flex flex-col gap-4 p-3">
            <Navbar />
            <section className="grid grid-cols-[69%,29%] gap-5 w-full">
               {children}
               <Rightbar />
            </section>
         </main>
      </div>
   );
}
