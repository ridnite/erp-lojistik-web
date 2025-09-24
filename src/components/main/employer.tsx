'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';

const employer = () => {
    const [hour, setHour] = useState<number>(new Date().getHours());
    const router = useRouter();

    return (
        <div className='w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 p-4'>
            <div className='bg-card h-32 border border-border rounded-lg shadow-sm flex flex-col items-center justify-center gap-2 hover:scale-[1.02] transition-all'>
                <p className='text-lg font-semibold'>{hour > 8 && hour < 16 ? "iş saati" : "iş saati değil"}</p>
                <p className='text-sm text-muted-foreground'>saat: {hour}</p>
            </div>
            <div onClick={() => router.push('/tasks')} className='bg-card h-32 border border-border rounded-lg shadow-sm flex flex-col items-center justify-center gap-2 hover:scale-[1.02] transition-all'>
                <p className='text-lg font-semibold'>Bekleyen görevler</p>
                <p className='text-sm text-muted-foreground'>Görevlerimi görüntüle</p>
            </div>
        </div>
    )
}

export default employer