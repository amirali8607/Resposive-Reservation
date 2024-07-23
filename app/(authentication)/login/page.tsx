"use client"

import { Login } from "@/app/actions/Login";
import { useToast } from "@/components/ui/use-toast";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

function LoginPage() {
   const { toast } = useToast()
   const session = useSession()
   return (
      <>
         <form action={
            async (formdata: FormData) => {
               const result = await Login(formdata)
               if (result?.error) {
                  toast({
                     title: "Login Failed",
                     variant: "destructive"
                  })
               } else {
                  toast({
                     title: "Login Succesfull",
                     variant: "default"
                  })
               }
               if (session.data?.user.role === UserRole.ADMIN) {
                  return redirect("/admin")
               }
               redirect("/")
            }
         } className="flex flex-col w-[450px] p-10 gap-4 mx-auto items-center bg-white rounded-lg shadow-md shadow-blue-900 [&>*]:w-[380px]">
            <p className="text-blue-900 text-4xl text-center">Reservation Login</p>
            <section className="flex flex-col gap-1">
               <p className="text-left text-[#403D39]">Email</p>
               <input className="p-2 rounded outline-none border border-[#969696]" type="email" name="email" placeholder="johnwick@gmail.com" />
            </section>
            <section className="flex flex-col gap-1">
               <p className="text-left text-[#403D39]">Password</p>
               <input className="p-2 rounded outline-none border border-[#969696]" type="password" name="password" placeholder="*********" />
            </section>
            <section className="flex justify-between">
               <div className="flex gap-2">
                  <input type="checkbox" />
                  <p className="text-[#403D39]">RememberMe</p>
               </div>
               <Link href="/forget-password" className="text-[#403D39]">Forgot Password?</Link>
            </section>
            <section className="flex flex-col gap-2">
               <button className="p-2 rounded bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90" type="submit">Login</button>
               <Link href="/register" className="text-[#403D39] text-center">You dont have an account?</Link>
            </section>
         </form>
      </>
   );
}

export default LoginPage;