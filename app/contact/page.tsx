import Image from "next/image";
import img from '../../public/home/homePic2.jpg';
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
function ContactPage() {

   return (
      <div className="h-screen flex flex-col gap-10">
         <Navbar />
         <main className="flex w-[70%] max-[675px]:w-[90%] mx-auto justify-center gap-10">
            <main className="w-full flex max-[675px]:hidden">
               <Image
                  className="h-full rounded-md"
                  src={img}
                  alt=""
               />
            </main>
            <form action={
               async () => {
                  "use server"
                  redirect("/")
               }
            } className="w-full bg-white flex flex-col rounded-md gap-2 p-8">
               <h1 className="text-4xl text-center font-extrabold text-blue-950">Contact To Me</h1>
               <section className="flex flex-col gap-1">
                  <p className="text-[#333333] text-left">Name</p>
                  <input
                     defaultValue="thomas shelby"
                     type="text"
                     className="text-black text-opacity-70 rounded-md border border-[#333333] bg-inherit p-2 outline-none transition-all duration-500 hover:border-[#2f8a62]"
                  />
               </section>
               <section className="flex flex-col gap-1">
                  <p className="text-[#333333] text-left">Email</p>
                  <input
                     defaultValue="johnwick@gmail.com"
                     type="email"
                     className="text-black text-opacity-70 rounded-md border border-[#333333] bg-inherit p-2 outline-none transition-all duration-500 hover:border-[#2f8a62]"
                  />
               </section>
               <section className="flex flex-col gap-1">
                  <p className="text-[#333333] text-left">Massage Text</p>
                  <textarea
                     defaultValue="hi i am mr amiri im programmer and my sis is sexy..."
                     className="text-black text-opacity-70 rounded-md border border-[#333333] bg-inherit p-2 outline-none transition-all duration-500 hover:border-[#2f8a62]"
                  />
               </section>
               <Button
                  type="submit"

               >
                  Send
               </Button>
            </form>
         </main>
         <Footer />

      </div>
   );
}

export default ContactPage;