import prisma from "@/app/config/db";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { LikeButton } from "./Buttons";

async function Diseases() {
   const sikness = await prisma.siknesslist.findMany({
      include: {
         likes: true
      }
   });
   return (
      <div className="flex gap-10 mx-auto py-6 px-16 rounded-xl justify-center max-[850px]:flex-col">
         {sikness.map((item) => (
            <div
               key={item.id}
               className="flex flex-col justify-center gap-3 p-6 bg-white rounded-lg text-center"
            >
               <main className="w-full h-60 mx-auto relative">
                  <Image
                     src={item.image!}
                     fill={true}
                     className="rounded-md"
                     alt=""
                  />
               </main>
               <h1 className="text-4xl font-bold">{item.title}</h1>
               <p className="font-extralight">{item.description}</p>
               <main className="flex justify-center items-center gap-4">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className="size-8 cursor-pointer"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                     />
                  </svg>
                  <Link
                     href={`/specialist/${item.compare}`}
                     className={buttonVariants({ variant: "default", className: "w-full" })}
                  >
                     <p>View Specialists</p>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        />
                     </svg>
                  </Link>
                  <LikeButton postId={item.id} isLiked={item.likes.length > 0} />
               </main>
            </div>
         ))}
      </div>
   );
}

export default Diseases;
