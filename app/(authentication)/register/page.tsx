"use client"
import { RegisterAdmin } from "@/app/actions/RegisterAdmin";
import { RegisterUser } from "@/app/actions/RegisterUser";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { redirect } from "next/navigation";

function RegisterPage() {
   const { toast } = useToast()
   return (
      <form action={
         async (formdata: FormData) => {
            const result = await RegisterUser(formdata)
            if (result?.error) {
               toast({
                  title: "Registeration Failed",
                  description: result.error,
                  variant: "destructive"
               })
            }
            else {
               toast({
                  title: "Registeration Succesfull",
                  description: `Registered USER with email : ${formdata.get("email")}`,
                  variant: "default"
               })
               redirect("/login")
            }
         }
      } className="flex flex-col w-[425px] py-8 gap-3 mx-auto items-center bg-white p-8 rounded-lg shadow-md shadow-blue-900 [&>*]:w-[380px]">
         <h1 className="text-blue-900 text-5xl text-center">Register</h1>
         <section className="flex flex-col gap-1">
            <p className="text-left text-[#403D39]">Username</p>
            <input className="p-2 rounded outline-none border border-[#969696]" type="text" placeholder="Tom Hardey" name="name" />
         </section>
         <section className="flex flex-col gap-1">
            <p className="text-left text-[#403D39]">Email</p>
            <input className="p-2 rounded outline-none border border-[#969696]" type="text" placeholder="johnwick@gmail.com" name="email" />
         </section>
         <section className="flex flex-col gap-1">
            <p className="text-left text-[#403D39]">Password</p>
            <input type="password" className="p-2 rounded outline-none border border-[#969696]" placeholder="*********" name="password" />
         </section>
         <section className="flex flex-col gap-2">
            <Button type="submit">Register</Button>
            <p className="text-[#403D39] text-center">Are you a doctor? <Link href="/adminregister" className="text-blue-900 font-semibold">Click</Link> </p>
         </section>
      </form>
   );
}

export default RegisterPage;