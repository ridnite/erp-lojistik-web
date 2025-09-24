'use client'
import React, { useState, useEffect } from 'react'
import { MdHome, MdTask } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { FaWarehouse, FaArrowsDownToLine, FaArrowsUpToLine, FaMoneyBillTransfer } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsBox2Fill } from "react-icons/bs";
import { GiTrade } from "react-icons/gi";

const Sidebar = () => {
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    const allCookies = document.cookie.split("; ");
    const userInfoCookie = allCookies.find((row) => row.startsWith("userInfo="));
    if (userInfoCookie) {
      try {
        const raw = userInfoCookie.split("=")[1];
        const parsed = JSON.parse(decodeURIComponent(raw));
        setRole(parsed.role);
      } catch (e) {
        console.error("Cookie parse hatası:", e);
      }
    }
    switch (role) {
      case "employee":
        setColor("bg-chart-1");
        break;
      case "manager":
        setColor("bg-chart-2");
        break;
      case "trader":
        setColor("bg-chart-3");
        break;
      case "bookkeeper":
        setColor("bg-chart-4");
        break;
      case "admin":
        setColor("bg-chart-5");
        break;
      default:
        setColor("bg-chart-1");
        break;
    }
  }, []);

  return (
    <div className='w-full h-fit flex flex-col p-4 gap-4'>
      <Link href={"/dashboard"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-4 gap-2 ${pathname === "/dashboard" ? "bg-sidebar-accent" : ""}`}>
        <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center text-2xl text-white`}>
          <MdHome className='text-xl' />
        </div>
        <p className='text-xl font-semibold'>Ana sayfa</p>
      </Link>
      {
        role === "employee" ? (
          <>
            <Link href={"/my-tasks"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-4 gap-2 ${pathname === "/my-tasks" ? "bg-sidebar-accent" : ""}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center text-2xl text-white`}>
                <FaTasks className='text-xl' />
              </div>
              <p className='text-xl font-semibold'>Görevlerim</p>
            </Link>
          </>
        ) : null
      }
      {
        role === "manager" ? (
          <>
            <Link href={"/all-tasks"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-4 gap-2 ${pathname === "/all-tasks" ? "bg-sidebar-accent" : ""}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center text-2xl text-white`}>
                <MdTask className='text-xl' />
              </div>
              <p className='text-xl font-semibold'>Görev yönetimi</p>
            </Link>
            <Link href={"/warehouse"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-4 gap-2 ${pathname === "/warehouse" ? "bg-sidebar-accent" : ""}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center text-2xl text-white`}>
                <FaWarehouse className='text-xl' />
              </div>
              <p className='text-xl font-semibold'>Depo yönetimi</p>
            </Link>
            <Link href={"/warehouse-employees"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-4 gap-2 ${pathname === "/warehouse-employees" ? "bg-sidebar-accent" : ""}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center text-2xl text-white`}>
                <GrUserWorker className='text-xl' />
              </div>
              <p className='text-xl font-semibold'>Depo çalışanları</p>
            </Link>
          </>
        ) : null
      }
      {
        role === "trader" ? (
          <>
            <Link href={"/stock"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-4 gap-2 ${pathname === "/stock" ? "bg-sidebar-accent" : ""}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center text-2xl text-white`}>
                <BsBox2Fill className='text-xl' />
              </div>
              <p className='text-xl font-semibold'>Stok</p>
            </Link>
            <Link href={"/trade-history"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-4 gap-2 ${pathname === "/trade-history" ? "bg-sidebar-accent" : ""}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center text-2xl text-white`}>
                <GiTrade className='text-xl' />
              </div>
              <p className='text-xl font-semibold'>Ticaret geçmişi</p>
            </Link>
            <Link href={"/trade-in"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-4 gap-2 ${pathname === "/trade-in" ? "bg-sidebar-accent" : ""}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center text-2xl text-white`}>
                <FaArrowsDownToLine className='text-xl' />
              </div>
              <p className='text-xl font-semibold'>Alım</p>
            </Link>
            <Link href={"/trade-out"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-4 gap-2 ${pathname === "/trade-out" ? "bg-sidebar-accent" : ""}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center text-2xl text-white`}>
                <FaArrowsUpToLine className='text-xl' />
              </div>
              <p className='text-xl font-semibold'>Satış</p>
            </Link>
          </>
        ) : null
      }
      {
        role === "bookkeeper" ? (
          <>
            <Link href={"/ciro"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-4 gap-2 ${pathname === "/ciro" ? "bg-sidebar-accent" : ""}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center text-2xl text-white`}>
                <FaMoneyBillTransfer className='text-xl' />
              </div>
              <p className='text-xl font-semibold'>Gelir - Gider</p>
            </Link>
            <Link href={"/employers"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-4 gap-2 ${pathname === "/employers" ? "bg-sidebar-accent" : ""}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center text-2xl text-white`}>
                <GrUserWorker className='text-xl' />
              </div>
              <p className='text-xl font-semibold'>Çalışanlar</p>
            </Link>
            <Link href={"/products"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-4 gap-2 ${pathname === "/products" ? "bg-sidebar-accent" : ""}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center text-2xl text-white`}>
                <BsBox2Fill className='text-xl' />
              </div>
              <p className='text-xl font-semibold'>Ürünler</p>
            </Link>
          </>
        ) : null
      }
      {
        role === "admin" ? (
          <>
            <Link href={"/finans-ozeti"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-4 gap-2 ${pathname === "/finans-ozeti" ? "bg-sidebar-accent" : ""}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center text-2xl text-white`}>
                <FaMoneyBillTransfer className='text-xl' />
              </div>
              <p className='text-xl font-semibold'>Finans özeti</p>
            </Link>
            <Link href={"/depolar-ve-urunler"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-4 gap-2 ${pathname === "/depolar-ve-urunler" ? "bg-sidebar-accent" : ""}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center text-2xl text-white`}>
                <FaWarehouse className='text-xl' />
              </div>
              <p className='text-xl font-semibold'>Depolar ve ürünler</p>
            </Link>
            <Link href={"/calisanlar"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-4 gap-2 ${pathname === "/calisanlar" ? "bg-sidebar-accent" : ""}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center text-2xl text-white`}>
                <GrUserWorker className='text-xl' />
              </div>
              <p className='text-xl font-semibold'>Çalışanlar</p>
            </Link>
          </>
        ) : null
      }
    </div>
  )
}

export default Sidebar