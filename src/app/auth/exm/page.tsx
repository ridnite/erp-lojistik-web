'use client';
import React from 'react';

export default function Home() {
    return (
        <div className='w-screen min-h-screen flex flex-col md:flex-row items-center justify-center p-2 md:p-4'>
            <div className='w-fit max-w-md h-fit rounded-lg bg-indigo-50 border-2 border-border flex flex-col p-2 md:p-4 gap-4'>
                <h2 className='text-xl sm:text-2xl mx-auto'>Örnek kullanıcılar</h2>
                <div className='flex flex-col bg-card gap-1 p-2 md:p-4 border-2 border-border rounded-lg'>
                    <p className='text-lg'>Alım satım departmanı</p>
                    <p>1 - Kullanıcı adı: xxxxxxxx şifre xxxxxxxxx</p>
                    <p>2 - Kullanıcı adı: xxxxxxxx şifre xxxxxxxxx</p>
                    <p>3 - Kullanıcı adı: xxxxxxxx şifre xxxxxxxxx</p>
                </div>
                <div className='flex flex-col bg-card gap-1 p-2 md:p-4 border-2 border-border rounded-lg'>
                    <p className='text-lg'>Şube Müdürü</p>
                    <p>1 - Kullanıcı adı: xxxxxxxx şifre xxxxxxxxx</p>
                    <p>2 - Kullanıcı adı: xxxxxxxx şifre xxxxxxxxx</p>
                    <p>3 - Kullanıcı adı: xxxxxxxx şifre xxxxxxxxx</p>
                </div>
                <div className='flex flex-col bg-card gap-1 p-2 md:p-4 border-2 border-border rounded-lg'>
                    <p className='text-lg'>Depo işçileri</p>
                    <p>1 - Kullanıcı adı: xxxxxxxx şifre xxxxxxxxx</p>
                    <p>2 - Kullanıcı adı: xxxxxxxx şifre xxxxxxxxx</p>
                    <p>3 - Kullanıcı adı: xxxxxxxx şifre xxxxxxxxx</p>
                </div>
            </div>
        </div>
    );
}
