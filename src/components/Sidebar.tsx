'use client'
import React, { useState } from 'react'
import { MdHome, MdTask } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { FaWarehouse } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  const [role, setRole] = useState("manager"); 

  return (
    <div className='w-full h-fit flex flex-col p-4 gap-4'>
      <Link href={"/dashboard"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-4 gap-2 ${pathname === "/dashboard" ? "bg-sidebar-accent" : ""}`}>
        <div className='w-8 h-8 bg-chart-1 rounded-lg flex items-center justify-center text-2xl text-white'>
          <MdHome className='text-xl' />
        </div>
        <p className='text-xl font-semibold'>Ana sayfa</p>
      </Link>
      {
        role === "employee" ? (
          <>
            <Link href={"/my-tasks"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-4 gap-2 ${pathname === "/my-tasks" ? "bg-sidebar-accent" : ""}`}>
              <div className='w-8 h-8 bg-chart-1 rounded-lg flex items-center justify-center text-2xl text-white'>
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
              <div className='w-8 h-8 bg-chart-1 rounded-lg flex items-center justify-center text-2xl text-white'>
                <MdTask className='text-xl' />
              </div>
              <p className='text-xl font-semibold'>Görev yönetimi</p>
            </Link>
            <Link href={"/warehouse"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-4 gap-2 ${pathname === "/warehouse" ? "bg-sidebar-accent" : ""}`}>
              <div className='w-8 h-8 bg-chart-1 rounded-lg flex items-center justify-center text-2xl text-white'>
                <FaWarehouse className='text-xl' />
              </div>
              <p className='text-xl font-semibold'>Depo yönetimi</p>
            </Link>
            <Link href={"/warehouse-employees"} className={`w-full h-12 rounded-lg hover:bg-sidebar-accent transition-all flex items-center px-4 gap-2 ${pathname === "/warehouse-employees" ? "bg-sidebar-accent" : ""}`}>
              <div className='w-8 h-8 bg-chart-1 rounded-lg flex items-center justify-center text-2xl text-white'>
                <GrUserWorker className='text-xl' />
              </div>
              <p className='text-xl font-semibold'>Depo çalışanları</p>
            </Link>
          </>
        ) : null
      }
    </div>
  )
}

export default Sidebar