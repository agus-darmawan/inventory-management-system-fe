"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaSignOutAlt } from "react-icons/fa"; // Importing React Icons

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { loggedIn, user, logout } = useAuth();

  useEffect(() => {
    if (!loggedIn) {
      router.push("/");
    }
  }, [loggedIn, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <main className="flex flex-col min-h-screen w-full justify-between">
      <section className="text-center flex flex-row justify-between w-full px-5 py-5 items-center bg-gray-200">
        <figure className="flex flex-row items-center space-x-2 gap-2">
          <Image
            src={"/avatar.png"}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <figcaption className="text-left leading-snug">
            <h1 className="text-sm">
              Selamat datang {user?.user?.role === "admin" ? "Admin" : ""}
            </h1>
            <h2 className="font-semibold">{user?.user?.fullName}</h2>
          </figcaption>
        </figure>
        <Button
          variant={"outline"}
          onClick={handleLogout}
          className="p-2 rounded-full h-8 w-8"
          aria-label="Logout"
        >
          <FaSignOutAlt size={20} />
        </Button>
      </section>
      <section className="flex-grow w-full">{children}</section>
      <nav className="bg-blue-600 p-3 flex justify-center items-center text-white rounded-4xl mb-2 mx-5">
        <Link href={"/home"}>
          <FaHome size={30} />
        </Link>
      </nav>
    </main>
  );
}
