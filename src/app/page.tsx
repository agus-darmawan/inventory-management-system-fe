"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const onLogin = () => {
    router.push("/login");
  };

  return (
    <main className=" flex flex-col items-center justify-between py-2 text-primary w-full h-[85vh]">
      <section className=" text-center flex justify-between flex-col mt-22 items-center">
        <Image src={"/logo.png"} alt="Logo" width={180} height={180} />
        <h1 className="text-6xl font-black">Iventory</h1>
        <h2 className="text-2xl font-semibold">Management System</h2>
      </section>
      <section className="space-y-3 flex flex-col items-center">
        <Button
          variant="default"
          className="px-24 py-6 text-xl rounded-full"
          onClick={onLogin}
        >
          Login
        </Button>
        <Button variant="secondary" className="px-24 py-6 text-xl rounded-full">
          Daftar
        </Button>
      </section>
      <footer className="mt-10 text-center text-sm text-gray-500">
        <p>CV Mutiara Danatama</p>
      </footer>
    </main>
  );
}
