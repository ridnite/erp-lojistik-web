'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const server = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}/api/control`, {
          withCredentials: true
        });
        if (response.data.authenticated) {
            router.push('/dashboard');
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.log("hata")
      }
    };

    fetchData();
  }, []);

  return (
    <div className='w-screen min-h-screen flex items-center justify-center p-2 md:p-4'>
      <div className='w-14 h-14 bg-gradient-to-b from-foreground via-background to-background animate-spin rounded-full flex items-center justify-center'>
        <div className='w-12 h-12 bg-background rounded-full'></div>
      </div>
    </div>
  );
}
