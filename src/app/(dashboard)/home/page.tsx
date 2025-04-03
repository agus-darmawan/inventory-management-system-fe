"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";
import { FaSignOutAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { user, fetchUser, loggedIn, logout } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loggedIn) {
      fetchUser().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [loggedIn, fetchUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex flex-col items-center py-2 text-primary w-full h-[85vh]">
      <section className="text-center flex flex-row justify-between w-full px-5 my-5 items-center">
        <figure className="flex flex-row items-center space-x-2">
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

      <footer className="mt-10 text-center text-sm text-gray-500">
        <p>CV Mutiara Danatama</p>
      </footer>
    </main>
  );
}
