export default function Rightbar() {
   return (
      <div className="flex flex-col gap-4 w-full">
         <section className="flex flex-col bg-gradient-to-b to-white from-[#CCC5B9] text-left p-6 gap-4 rounded-lg">
            <h1>Available Now</h1>
            <h1 className="text-lg font-bold">
               How to use the new version of the admin dashboard
            </h1>
            <p className="font-extralight text-xs">Takes 4 minutes in learn</p>
            <p className="font-extralight text-xs">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam saepe
               reprehenderit sit fugiat optio rerum veritatis, harum consequatur
               officia vero.
            </p>
            <button className="bg-blue-900/80 font-semibold p-1 w-20 rounded-md flex gap-1 items-center justify-center">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
               >
                  <path
                     fillRule="evenodd"
                     d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                     clipRule="evenodd"
                  />
               </svg>
               Watch
            </button>
         </section>
         <section className="flex flex-col bg-gradient-to-b to-white from-[#CCC5B9] text-left p-6 gap-4 rounded-lg">
            <h1>Coming Soon</h1>
            <h1 className="font-bold">
               New server actions is available. partial pre-rendering is coming up!
            </h1>
            <p className="font-extralight text-xs">Takes 4 minutes in learn</p>
            <p className="font-extralight text-xs">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam saepe
               reprehenderit sit fugiat optio rerum veritatis, harum consequatur
               officia vero.
            </p>
            <button className="bg-blue-900/80 font-semibold p-1 w-20 rounded-md flex gap-1 items-center justify-center">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
               >
                  <path
                     fillRule="evenodd"
                     d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
                     clipRule="evenodd"
                  />
               </svg>
               Learn
            </button>
         </section>
      </div>
   );
}
