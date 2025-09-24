'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaUser } from "react-icons/fa";
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

const Header = () => {
    const [username, setUsername] = useState<string | null>(null);
    const { setTheme } = useTheme();
    const router = useRouter();

    useEffect(() => {
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
            <p className='text-2xl font-serif'>Lojistik</p>
            <div className='w-fit h-full flex items-center justify-center gap-4'>
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
                    <DropdownMenuTrigger className='w-fit h-10 rounded-lg px-4 bg-muted flex items-center justify-center cursor-pointer hover:bg-accent gap-2 transition-colors'>
                        <FaUser className='w-5 h-5 text-foreground' />
                        <p className='text-lg'>{username}</p>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Hesap</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>Çıkış Yap</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    )
}

export default Header