'use client';
import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { z } from "zod"
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
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${server}/api/auth/signin`, data, {
                withCredentials: true
            });
            setErrorMessage(null);
            router.push('/dashboard');
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || 'Giriş başarısız');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='w-screen min-h-screen flex items-center justify-center p-2 md:p-4 bg-gradient-to-br from-background via-background to-muted'>
            <form
                className='w-full max-w-md h-fit rounded-xl bg-card/90 backdrop-blur-sm border border-border shadow-2xl flex flex-col items-center p-6 md:p-8 gap-6 hover:shadow-xl transition-all duration-300'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='text-center'>
                    <h2 className='text-2xl sm:text-3xl font-bold text-foreground mb-2'>Giriş Yap</h2>
                    <p className='text-muted-foreground text-sm'>Hesabınıza erişim sağlayın</p>
                </div>

                <div className='w-full h-fit flex flex-col gap-2'>
                    <div className='w-full h-fit flex items-center justify-between px-1'>
                        <label htmlFor="username" className='text-base font-medium text-foreground'>
                            Kullanıcı Adı
                        </label>
                        {errors.username && (
                            <span className='text-sm text-destructive font-medium'>
                                {errors.username.message}
                            </span>
                        )}
                    </div>
                    <Input
                        id="username"
                        type="text"
                        placeholder='Kullanıcı adınızı girin'
                        className={`transition-all duration-200 ${errors.username
                                ? 'border-destructive focus:ring-destructive'
                                : 'focus:ring-primary focus:border-primary'
                            }`}
                        {...register("username")}
                    />
                </div>

                <div className='w-full h-fit flex flex-col gap-2'>
                    <div className='w-full h-fit flex items-center justify-between px-1'>
                        <label htmlFor="password" className='text-base font-medium text-foreground'>
                            Şifre
                        </label>
                        {errors.password && (
                            <span className='text-sm text-destructive font-medium'>
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                    <Input
                        id="password"
                        type="password"
                        placeholder='Şifrenizi girin'
                        className={`transition-all duration-200 ${errors.password
                                ? 'border-destructive focus:ring-destructive'
                                : 'focus:ring-primary focus:border-primary'
                            }`}
                        {...register("password")}
                    />
                </div>

                {errorMessage && (
                    <div className='w-full p-3 rounded-lg bg-destructive/10 border border-destructive/20'>
                        <span className='text-sm text-destructive font-medium flex items-center gap-2'>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            {errorMessage}
                        </span>
                    </div>
                )}

                <Button
                    type="submit"
                    disabled={isLoading}
                    className='w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Giriş yapılıyor...
                        </div>
                    ) : (
                        'Giriş Yap'
                    )}
                </Button>

                <div className='w-4/5 h-px bg-gradient-to-r from-transparent via-border to-transparent'></div>

                <p className='text-sm text-muted-foreground text-center'>
                    Hesabınız yok mu?
                    <button
                        type="button"
                        className='ml-1 text-primary hover:underline font-medium transition-colors'
                        onClick={() => {/* Handle registration */ }}
                    >
                        Kayıt olun
                    </button>
                </p>
            </form>
        </div>
    );
}