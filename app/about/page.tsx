function AboutPage() {
   return (
      <div className="flex max-[675px]:flex-col gap-4 justify-center bg-white items-center">
         {/* <section className="flex justify-center gap-14 bg-white max-[675px]:flex-col max-[675px]:"> */}
         <main className="flex flex-col justify-center items-center rounded-md p-8 gap-12 py-16 text-center">
            <h1 className="text-4xl font-extrabold text-blue-950">Specialities</h1>
            <h2 className="font-sans text-md font-semibold tracking-normal text-[#403D39]">
               In this Section, I want to tell you some of my speciality (programming
               languages and frameworks)
               <br />
               language including : #JavaScript , #HTML , #CSS , #Python framework
               including : #ReactJs , #TailwindCss <br /> and also I Studied at
               Soroush University and Sarami School
            </h2>
         </main>
         <main className="flex flex-col justify-center items-center rounded-md p-8 gap-12 py-16 text-center">
            <h1 className="text-4xl font-extrabold text-blue-950">Documents</h1>
            <h2 className="font-sans text-md font-semibold tracking-normal text-[#403D39]">
               In this section, I want to show you my documents <br /> As I said
               previous part,I have a series of specialities! <br /> including :
               #JavaScript , #HTML , #CSS , #Python and #ReactJs , #TailwindCss{" "}
               <br /> Now I want to show you my documents, including : #ICDL , #TTC ,
               #CTFA , #CFA , #Bachelor
            </h2>
         </main>
         {/* </section> */}
      </div>
   );
}

export default AboutPage;