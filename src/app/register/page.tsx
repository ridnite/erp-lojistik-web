'use client';
import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const server = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

const registerSchema = z.object({
    photo: z.instanceof(FileList).optional(),
    firstName: z.string().min(2, "Ad zorunludur ve en az 2 karakter olmalıdır"),
    lastName: z.string().min(2, "Soyad zorunludur ve en az 2 karakter olmalıdır"),
    email: z.string().email("Geçerli bir email adresi giriniz"),
    phone: z.string().min(10, "Telefon numarası en az 10 haneli olmalıdır"),
    tc: z.string().min(11, "TC Kimlik Numarası 11 haneli olmalıdır").max(11, "TC Kimlik Numarası 11 haneli olmalıdır"),
    address: z.string().min(10, "Adres en az 10 karakter olmalıdır"),
    department: z.string().min(2, "Departman seçimi zorunludur"),
});

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            photo: undefined,
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            tc: "",
            address: "",
            department: "",
        }
    });

    const onSubmit = async (data: z.infer<typeof registerSchema>) => {
        setIsLoading(true);
        setErrorMessage(null);
        
        try {
            const formData = new FormData();
            
            if (data.photo && data.photo.length > 0) {
                formData.append('photo', data.photo[0]);
            }
            
            Object.keys(data).forEach(key => {
                if (key !== 'photo') {
                    formData.append(key, (data as any)[key]);
                }
            });

            const response = await axios.post(`${server}/api/auth/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });

            setSuccessMessage('Kayıt başarılı! Onay için bekleyin...');
            setTimeout(() => {
                router.push('/login');
            }, 2000);
            
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || 'Kayıt sırasında bir hata oluştu');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='w-screen min-h-screen flex items-center justify-center p-2 md:p-4 bg-gradient-to-br from-background via-background to-muted'>
            <form 
                className='w-full max-w-2xl h-fit rounded-xl bg-card/95 backdrop-blur-sm border border-border shadow-2xl flex flex-col items-center p-6 md:p-8 gap-6 hover:shadow-xl transition-all duration-300'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='text-center'>
                    <h2 className='text-2xl sm:text-3xl font-bold text-foreground mb-2'>Kayıt Ol</h2>
                    <p className='text-muted-foreground text-sm'>Yeni hesap oluşturun ve sisteme katılın</p>
                </div>

                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='md:col-span-2 flex justify-center'>
                        <div className='w-full max-w-xs'>
                            <label htmlFor="photo" className='text-base font-medium text-foreground block mb-2'>
                                Profil Fotoğrafı (İsteğe Bağlı)
                            </label>
                            <div className='relative'>
                                <input
                                    id="photo"
                                    type="file"
                                    accept="image/*"
                                    className='w-full h-32 border-2 border-dashed border-border rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors bg-muted/30 file:hidden'
                                    {...register("photo")}
                                />
                                <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none'>
                                    <svg className="w-8 h-8 text-muted-foreground mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <span className='text-sm text-muted-foreground'>Fotoğraf Seç</span>
                                </div>
                            </div>
                            {errors.photo && (
                                <span className='text-sm text-destructive mt-1 block'>{errors.photo.message}</span>
                            )}
                        </div>
                    </div>

                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="firstName" className='text-base font-medium text-foreground'>
                            Ad *
                        </label>
                        <Input
                            id="firstName"
                            type="text"
                            placeholder='Adınızı girin'
                            className={`transition-all duration-200 ${errors.firstName
                                ? 'border-destructive focus:ring-destructive'
                                : 'focus:ring-primary focus:border-primary'
                            }`}
                            {...register("firstName")}
                        />
                        {errors.firstName && (
                            <span className='text-sm text-destructive'>{errors.firstName.message}</span>
                        )}
                    </div>

                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="lastName" className='text-base font-medium text-foreground'>
                            Soyad *
                        </label>
                        <Input
                            id="lastName"
                            type="text"
                            placeholder='Soyadınızı girin'
                            className={`transition-all duration-200 ${errors.lastName
                                ? 'border-destructive focus:ring-destructive'
                                : 'focus:ring-primary focus:border-primary'
                            }`}
                            {...register("lastName")}
                        />
                        {errors.lastName && (
                            <span className='text-sm text-destructive'>{errors.lastName.message}</span>
                        )}
                    </div>

                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="email" className='text-base font-medium text-foreground'>
                            Email *
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder='email@ornegi.com'
                            className={`transition-all duration-200 ${errors.email
                                ? 'border-destructive focus:ring-destructive'
                                : 'focus:ring-primary focus:border-primary'
                            }`}
                            {...register("email")}
                        />
                        {errors.email && (
                            <span className='text-sm text-destructive'>{errors.email.message}</span>
                        )}
                    </div>

                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="phone" className='text-base font-medium text-foreground'>
                            Telefon *
                        </label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder='5XX XXX XX XX'
                            className={`transition-all duration-200 ${errors.phone
                                ? 'border-destructive focus:ring-destructive'
                                : 'focus:ring-primary focus:border-primary'
                            }`}
                            {...register("phone")}
                        />
                        {errors.phone && (
                            <span className='text-sm text-destructive'>{errors.phone.message}</span>
                        )}
                    </div>

                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="tc" className='text-base font-medium text-foreground'>
                            TC Kimlik No *
                        </label>
                        <Input
                            id="tc"
                            type="text"
                            placeholder='12345678901'
                            maxLength={11}
                            className={`transition-all duration-200 ${errors.tc
                                ? 'border-destructive focus:ring-destructive'
                                : 'focus:ring-primary focus:border-primary'
                            }`}
                            {...register("tc")}
                        />
                        {errors.tc && (
                            <span className='text-sm text-destructive'>{errors.tc.message}</span>
                        )}
                    </div>

                    <div className='w-full flex flex-col gap-2'>
                        <label htmlFor="department" className='text-base font-medium text-foreground'>
                            Departman *
                        </label>
                        <select
                            id="department"
                            className={`w-full px-3 py-2 border rounded-md bg-background transition-all duration-200 ${errors.department
                                ? 'border-destructive focus:ring-destructive'
                                : 'focus:ring-primary focus:border-primary border-border'
                            }`}
                            {...register("department")}
                        >
                            <option value="">Departman seçiniz</option>
                            <option value="lojistik">Lojistik</option>
                            <option value="muhasebe">Muhasebe</option>
                            <option value="insan-kaynaklari">İnsan Kaynakları</option>
                            <option value="satis">Satış</option>
                            <option value="teknik">Teknik</option>
                            <option value="yonetim">Yönetim</option>
                        </select>
                        {errors.department && (
                            <span className='text-sm text-destructive'>{errors.department.message}</span>
                        )}
                    </div>

                    <div className='md:col-span-2 w-full flex flex-col gap-2'>
                        <label htmlFor="address" className='text-base font-medium text-foreground'>
                            Adres *
                        </label>
                        <textarea
                            id="address"
                            placeholder='Tam adresinizi giriniz...'
                            rows={3}
                            className={`w-full px-3 py-2 border rounded-md bg-background resize-none transition-all duration-200 ${errors.address
                                ? 'border-destructive focus:ring-destructive'
                                : 'focus:ring-primary focus:border-primary border-border'
                            }`}
                            {...register("address")}
                        />
                        {errors.address && (
                            <span className='text-sm text-destructive'>{errors.address.message}</span>
                        )}
                    </div>
                </div>

                {errorMessage && (
                    <div className='w-full p-4 rounded-lg bg-destructive/10 border border-destructive/20'>
                        <span className='text-sm text-destructive font-medium flex items-center gap-2'>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            {errorMessage}
                        </span>
                    </div>
                )}

                {successMessage && (
                    <div className='w-full p-4 rounded-lg bg-green-100 border border-green-200'>
                        <span className='text-sm text-green-700 font-medium flex items-center gap-2'>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {successMessage}
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
                            Kayıt yapılıyor...
                        </div>
                    ) : (
                        'Kayıt Ol'
                    )}
                </Button>

                <div className='w-4/5 h-px bg-gradient-to-r from-transparent via-border to-transparent'></div>

                <p className='text-sm text-muted-foreground text-center'>
                    Zaten hesabınız var mı?
                    <Link href="/login" className='ml-1 text-primary hover:underline font-medium transition-colors'>
                        Giriş yapın
                    </Link>
                </p>

                <div className='text-xs text-muted-foreground text-center max-w-md'>
                    <p>
                        Kayıt olarak <span className='text-primary'>Kullanım Şartları</span> ve 
                        <span className='text-primary'> Gizlilik Politikası</span>'nı kabul etmiş olursunuz.
                    </p>
                </div>
            </form>
        </div>
    );
}