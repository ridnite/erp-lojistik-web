'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Employer from '@/components/main/employer';
import Manager from '@/components/main/Manager';

const page = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [hour, setHour] = useState<number>(12); // Default to noon to avoid hydration issues
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const getGreeting = () => {
    if (hour < 12) return "Günaydın";
    if (hour < 18) return "İyi günler";
    return "İyi akşamlar";
  };

  const getGreetingIcon = () => {
    if (hour < 12) return "🌅";
    if (hour < 18) return "☀️";
    return "🌙";
  };

  useEffect(() => {
    setIsClient(true);
    setHour(new Date().getHours());
    
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
    <div className='w-full flex flex-col gap-6'>
      <div className='w-full bg-gradient-to-r from-card to-card/80 border border-border rounded-xl p-6 shadow-lg'>
        <div className='flex items-center gap-4'>
          <div className='w-16 h-16 bg-gradient-to-br from-chart-1 to-chart-2 rounded-full flex items-center justify-center text-3xl'>
            {getGreetingIcon()}
          </div>
          <div>
            <h1 className='text-3xl md:text-4xl font-bold text-foreground'>
              {getGreeting()}, {username || "Kullanıcı"}
            </h1>
            <p className='text-muted-foreground text-lg mt-1'>
              {isClient ? new Date().toLocaleDateString('tr-TR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) : 'Yükleniyor...'}
            </p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 bg-chart-1 rounded-lg flex items-center justify-center'>
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className='text-2xl font-bold text-foreground'>24</p>
              <p className='text-sm text-muted-foreground'>Tamamlanan Görevler</p>
            </div>
          </div>
        </div>

        <div className='bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 bg-chart-2 rounded-lg flex items-center justify-center'>
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className='text-2xl font-bold text-foreground'>8</p>
              <p className='text-sm text-muted-foreground'>Bekleyen Görevler</p>
            </div>
          </div>
        </div>

        <div className='bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 bg-chart-3 rounded-lg flex items-center justify-center'>
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
              </svg>
            </div>
            <div>
              <p className='text-2xl font-bold text-foreground'>12</p>
              <p className='text-sm text-muted-foreground'>Aktif Araçlar</p>
            </div>
          </div>
        </div>

        <div className='bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 bg-chart-4 rounded-lg flex items-center justify-center'>
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className='text-2xl font-bold text-foreground'>156</p>
              <p className='text-sm text-muted-foreground'>Toplam Teslimat</p>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-card border border-border rounded-xl p-6 shadow-sm'>
          <h3 className='text-xl font-semibold text-foreground mb-4 flex items-center gap-2'>
            <div className='w-8 h-8 bg-chart-1 rounded-lg flex items-center justify-center'>
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clipRule="evenodd" />
              </svg>
            </div>
            Günlük Performans
          </h3>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground'>Teslim Edilen</span>
              <div className='flex items-center gap-2'>
                <div className='w-32 h-2 bg-muted rounded-full overflow-hidden'>
                  <div className='w-3/4 h-full bg-chart-1 rounded-full'></div>
                </div>
                <span className='font-medium'>75%</span>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground'>Zamanında Teslim</span>
              <div className='flex items-center gap-2'>
                <div className='w-32 h-2 bg-muted rounded-full overflow-hidden'>
                  <div className='w-5/6 h-full bg-chart-2 rounded-full'></div>
                </div>
                <span className='font-medium'>83%</span>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-muted-foreground'>Müşteri Memnuniyeti</span>
              <div className='flex items-center gap-2'>
                <div className='w-32 h-2 bg-muted rounded-full overflow-hidden'>
                  <div className='w-11/12 h-full bg-chart-3 rounded-full'></div>
                </div>
                <span className='font-medium'>92%</span>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-card border border-border rounded-xl p-6 shadow-sm'>
          <h3 className='text-xl font-semibold text-foreground mb-4 flex items-center gap-2'>
            <div className='w-8 h-8 bg-chart-2 rounded-lg flex items-center justify-center'>
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            Son Aktiviteler
          </h3>
          <div className='space-y-3'>
            <div className='flex items-center gap-3 p-3 bg-muted/30 rounded-lg'>
              <div className='w-8 h-8 bg-chart-1 rounded-full flex items-center justify-center'>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className='flex-1'>
                <p className='font-medium text-sm'>Görev tamamlandı</p>
                <p className='text-xs text-muted-foreground'>2 dakika önce</p>
              </div>
            </div>
            <div className='flex items-center gap-3 p-3 bg-muted/30 rounded-lg'>
              <div className='w-8 h-8 bg-chart-2 rounded-full flex items-center justify-center'>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
                </svg>
              </div>
              <div className='flex-1'>
                <p className='font-medium text-sm'>Yeni teslimat atandı</p>
                <p className='text-xs text-muted-foreground'>15 dakika önce</p>
              </div>
            </div>
            <div className='flex items-center gap-3 p-3 bg-muted/30 rounded-lg'>
              <div className='w-8 h-8 bg-chart-3 rounded-full flex items-center justify-center'>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              </div>
              <div className='flex-1'>
                <p className='font-medium text-sm'>Profil güncellendi</p>
                <p className='text-xs text-muted-foreground'>1 saat önce</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {userRole === "employee" && <Employer />}
      {userRole === "manager" && <Manager />}
    </div>
  )
}

export default page