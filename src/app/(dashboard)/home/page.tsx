"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";
import {
  FaSignOutAlt,
  FaChevronRight,
  FaShoppingCart,
  FaChartLine,
  FaMoneyBillAlt,
  FaExchangeAlt,
  FaFileAlt,
  FaCube,
} from "react-icons/fa"; // Importing React Icons
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DashboardPage() {
  const router = useRouter();
  const { user, fetchUser, loggedIn, logout } = useAuth();
  const [loading, setLoading] = useState(true);

  const data = [
    {
      name: "Pembelian",
      records: 4,
      icon: <FaShoppingCart size={24} />,
      link: "/pembelian",
    },
    {
      name: "Penjualan",
      records: 2,
      icon: <FaChartLine size={24} />,
      link: "/penjualan",
    },
    {
      name: "Biaya",
      records: 3,
      icon: <FaMoneyBillAlt size={24} />,
      link: "/biaya",
    },
    {
      name: "Proses",
      records: 4,
      icon: <FaExchangeAlt size={24} />,
      link: "/proses",
    },
    {
      name: "Laporan",
      records: 2,
      icon: <FaFileAlt size={24} />,
      link: "/laporan",
    },
    { name: "Stock", records: 4, icon: <FaCube size={24} />, link: "/stock" },
  ];

  useEffect(() => {
    if (loggedIn) {
      fetchUser().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [loggedIn, fetchUser]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex flex-col items-center py-2 text-primary w-full">
      <section className="text-center flex flex-row justify-between w-full px-5 my-5 items-center">
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

      <section className="flex flex-col w-full bg-gradient-to-r from-blue-400 via-blue-500 h-40 to-blue-600 p-3 text-white rounded-lg shadow-md my-2 ">
        <h1 className="text-xl text-center font-semibold mb-3">Pengumuman</h1>
      </section>
      <h1 className="text-xl text-center font-semibold mt-3 mb-2">Menu</h1>
      <section className="w-full px-5">
        <ScrollArea className="h-[340px] w-full flex gap-2">
          {data.map((item) => (
            <Link href={item.link} key={item.name}>
              <div className="flex items-center justify-between bg-white text-blue-800 p-2.5 rounded-lg shadow-md my-3 border border-blue-500">
                <div className="flex items-center space-x-3 gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm">{item.records} records found</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FaChevronRight size={18} />
                </div>
              </div>
            </Link>
          ))}
        </ScrollArea>
      </section>
    </main>
  );
}
