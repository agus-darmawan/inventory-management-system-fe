"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { loggedIn } = useAuth();

  useEffect(() => {
    if (!loggedIn) {
      router.push("/");
    }
  }, [loggedIn, router]);

  return (
    <main className="flex flex-col min-h-screen w-full justify-between">
      <section className="flex-grow w-full">{children}</section>
      <nav className="bg-blue-600 p-3 flex justify-center items-center text-white rounded-4xl mb-2 mx-5">
        <Link href={"/home"}>
          <FaHome size={30} />
        </Link>
      </nav>
    </main>
  );
}
