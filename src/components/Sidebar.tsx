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
  const [color, setColor] = useState<string>("bg-chart-1");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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
  }, [role]);

  return (
    <div className='w-full h-fit flex flex-col p-4 gap-3'>
      <div className='mb-2'>
        <h3 className="text-sm font-semibold text-sidebar-foreground/70 uppercase tracking-wide">
          Navigasyon
        </h3>
      </div>
      
      <Link href={"/dashboard"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-3 gap-3 ${pathname === "/dashboard" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"}`}>
        <div className={`w-8 h-8 ${isClient ? color : 'bg-chart-1'} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <MdHome className='text-white text-lg' />
        </div>
        <p className='text-base md:text-lg font-medium truncate'>Ana sayfa</p>
      </Link>
      {
        isClient && role === "employee" ? (
          <>
            <Link href={"/my-tasks"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-3 gap-3 ${pathname === "/my-tasks" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <FaTasks className='text-white text-lg' />
              </div>
              <p className='text-base md:text-lg font-medium truncate'>Görevlerim</p>
            </Link>
          </>
        ) : null
      }
      {
        isClient && role === "manager" ? (
          <>
            <Link href={"/all-tasks"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-3 gap-3 ${pathname === "/all-tasks" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <MdTask className='text-white text-lg' />
              </div>
              <p className='text-base md:text-lg font-medium truncate'>Görev yönetimi</p>
            </Link>
            <Link href={"/warehouse"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-3 gap-3 ${pathname === "/warehouse" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <FaWarehouse className='text-white text-lg' />
              </div>
              <p className='text-base md:text-lg font-medium truncate'>Depo yönetimi</p>
            </Link>
            <Link href={"/warehouse-employees"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-3 gap-3 ${pathname === "/warehouse-employees" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <GrUserWorker className='text-white text-lg' />
              </div>
              <p className='text-base md:text-lg font-medium truncate'>Depo çalışanları</p>
            </Link>
          </>
        ) : null
      }
      {
        isClient && role === "trader" ? (
          <>
            <Link href={"/stock"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-3 gap-3 ${pathname === "/stock" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <BsBox2Fill className='text-white text-lg' />
              </div>
              <p className='text-base md:text-lg font-medium truncate'>Stok</p>
            </Link>
            <Link href={"/trade-history"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-3 gap-3 ${pathname === "/trade-history" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <GiTrade className='text-white text-lg' />
              </div>
              <p className='text-base md:text-lg font-medium truncate'>Ticaret geçmişi</p>
            </Link>
            <Link href={"/trade-in"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-3 gap-3 ${pathname === "/trade-in" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <FaArrowsDownToLine className='text-white text-lg' />
              </div>
              <p className='text-base md:text-lg font-medium truncate'>Alım</p>
            </Link>
            <Link href={"/trade-out"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-3 gap-3 ${pathname === "/trade-out" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <FaArrowsUpToLine className='text-white text-lg' />
              </div>
              <p className='text-base md:text-lg font-medium truncate'>Satış</p>
            </Link>
          </>
        ) : null
      }
      {
        isClient && role === "bookkeeper" ? (
          <>
            <Link href={"/ciro"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-3 gap-3 ${pathname === "/ciro" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <FaMoneyBillTransfer className='text-white text-lg' />
              </div>
              <p className='text-base md:text-lg font-medium truncate'>Gelir - Gider</p>
            </Link>
            <Link href={"/employers"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-3 gap-3 ${pathname === "/employers" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <GrUserWorker className='text-white text-lg' />
              </div>
              <p className='text-base md:text-lg font-medium truncate'>Çalışanlar</p>
            </Link>
            <Link href={"/products"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-3 gap-3 ${pathname === "/products" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <BsBox2Fill className='text-white text-lg' />
              </div>
              <p className='text-base md:text-lg font-medium truncate'>Ürünler</p>
            </Link>
          </>
        ) : null
      }
      {
        isClient && role === "admin" ? (
          <>
            <Link href={"/finans-ozeti"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-3 gap-3 ${pathname === "/finans-ozeti" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <FaMoneyBillTransfer className='text-white text-lg' />
              </div>
              <p className='text-base md:text-lg font-medium truncate'>Finans özeti</p>
            </Link>
            <Link href={"/depolar-ve-urunler"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-3 gap-3 ${pathname === "/depolar-ve-urunler" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <FaWarehouse className='text-white text-lg' />
              </div>
              <p className='text-base md:text-lg font-medium truncate'>Depolar ve ürünler</p>
            </Link>
            <Link href={"/calisanlar"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-3 gap-3 ${pathname === "/calisanlar" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"}`}>
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <GrUserWorker className='text-white text-lg' />
              </div>
              <p className='text-base md:text-lg font-medium truncate'>Çalışanlar</p>
            </Link>
          </>
        ) : null
      }
    </div>
  )
}

export default Sidebar