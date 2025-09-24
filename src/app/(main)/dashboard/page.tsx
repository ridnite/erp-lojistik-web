'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Employer from '@/components/main/employer';

const page = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [hour, setHour] = useState<number>(new Date().getHours());
  const router = useRouter();

  useEffect(() => {
    const allCookies = document.cookie.split("; ");
    const userInfoCookie = allCookies.find((row) => row.startsWith("userInfo="));
    if (userInfoCookie) {
      try {
        const raw = userInfoCookie.split("=")[1];
        const parsed = JSON.parse(decodeURIComponent(raw));
        setUsername(parsed.fullname);
        setUserRole(parsed.role);
      } catch (e) {
        console.error("Cookie parse hatası:", e);
      }
    }
  }, []);
  return (
    <div className='w-full flex flex-col'>
      <p className='text-4xl font-serif mx-auto'>Hoşgeldin, {username}</p>
      {userRole === "employee" ? <Employer /> : null}
    </div>
  )
}

export default page