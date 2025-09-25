'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from './ui/button';

const server = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

const Header = ({ toggleSidebar }: { toggleSidebar?: () => void }) => {
    const [username, setUsername] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);
    const { setTheme } = useTheme();
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
        const allCookies = document.cookie.split("; ");
        const userInfoCookie = allCookies.find((row) => row.startsWith("userInfo="));
        if (userInfoCookie) {
            try {
                const raw = userInfoCookie.split("=")[1];
                const parsed = JSON.parse(decodeURIComponent(raw));
                setUsername(parsed.fullname);
            } catch (e) {
                console.error("Cookie parse hatası:", e);
            }
        }
    }, []);

    const logout = async () => {
        try {
            await axios.post(`${server}/api/auth/signout`, {}, { withCredentials: true });
            router.push('/');
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    return (
        <nav className='w-full h-full flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                {toggleSidebar && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleSidebar}
                        className='lg:hidden'
                    >
                        <FaBars className="h-4 w-4" />
                    </Button>
                )}
                <div className='flex items-center gap-2'>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-chart-1 to-chart-4 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">L</span>
                    </div>
                    <p className='text-xl md:text-2xl font-serif font-bold'>Lojistik</p>
                </div>
            </div>
            <div className='w-fit h-full flex items-center justify-center gap-2 md:gap-4'>
                {isClient && (
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                                    <span className="sr-only">Toggle theme</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setTheme("light")}>
                                    Light
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("dark")}>
                                    Dark
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("system")}>
                                    System
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger className='w-fit h-10 rounded-lg px-2 md:px-4 bg-muted flex items-center justify-center cursor-pointer hover:bg-accent gap-1 md:gap-2 transition-colors'>
                                <FaUser className='w-4 h-4 md:w-5 md:h-5 text-foreground flex-shrink-0' />
                                <p className='text-sm md:text-lg truncate max-w-[100px] md:max-w-none'>{username}</p>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Hesap</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout}>Çıkış Yap</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                )}
                {!isClient && (
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="w-9 h-9 bg-muted rounded-md animate-pulse" />
                        <div className="w-20 h-10 bg-muted rounded-lg animate-pulse" />
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Header