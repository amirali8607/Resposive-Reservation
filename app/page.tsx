import Diseases from "@/components/Diseases";
import Doctors from "@/components/Doctors";
import Footer from "@/components/Footer";
import Intro from "@/components/Introduction";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <div className="h-screen flex flex-col gap-10">
      <Navbar />
      <main className="flex flex-col gap-10">
        <section>
          <Intro />
        </section>
        <section>
          <div className="w-[85%] flex flex-col mx-auto gap-1">
            <h1 className="text-3xl font-extrabold max-[675px]:text-center">Doctors Profile</h1>
            <p className="w-64 border-4 border-blue-800 max-[675px]:mx-auto"></p>
          </div>
          <Doctors />
        </section>
        <section className="bg-black/10 flex flex-col gap-2 p-6 justify-center">
          <button className="rounded-full w-48 mx-auto px-2 py-1 bg-white text-sm">About Web Development</button>
          <p className="text-center font-semibold">I create user-freandly , and beautiful websites and application</p>
          <Diseases />
        </section>
      </main>
      <Footer />
    </div>
  );
}
