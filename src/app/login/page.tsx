'use client';
import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { set, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const server = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
const loginSchema = z.object({
    username: z.string().min(2, "Kullanıcı adı zorunludur"),
    password: z.string().min(2, "Şifre zorunludur"),
});

export default function Home() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        try {
            const response = await axios.post(`${server}/api/auth/signin`, data, {
                withCredentials: true
            });
            setErrorMessage(null);
            router.push('/dashboard');
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || 'Giriş başarısız');
        }
    }

    return (
        <div className='w-screen min-h-screen flex items-center justify-center p-2 md:p-4'>
            <form className='w-full max-w-md h-fit rounded-lg bg-card border-2 border-border flex flex-col items-center p-2 md:p-4 gap-4' onSubmit={handleSubmit(onSubmit)}>
                <h2 className='text-xl sm:text-3xl'>Giriş yap</h2>
                <div className='w-full h-fit flex flex-col gap-2'>
                    <div className='w-full h-fit flex items-center justify-between px-1'>
                        <label htmlFor="username" className='text-lg'>Kullanıcı adı</label>
                        <span className='text-sm text-red-500'>{errors.username?.message}</span>
                    </div>
                    <Input id="username" type="text" placeholder='Kullanıcı adı' {...register("username")} />
                </div>
                <div className='w-full h-fit flex flex-col gap-2'>
                    <div className='w-full h-fit flex items-center justify-between px-1'>
                        <label htmlFor="password" className='text-lg'>Şifre</label>
                        <span className='text-sm text-red-500'>{errors.password?.message}</span>
                    </div>
                    <Input id="password" type="password" placeholder='Şifre' {...register("password")} />
                </div>
                {<span className='text-sm text-red-500'>{errorMessage}</span>}
                <Button type="submit" className='w-full mt-2 bg-chart-1 text-lg'>Giriş yap</Button>
                <div className='w-4/5 h-0.5 bg-border'></div>
            </form>
        </div>
    );
}
