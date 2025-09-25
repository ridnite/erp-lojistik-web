'use client'
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="w-screen flex flex-col bg-background min-h-screen">
            <header className="w-full h-16 bg-card/90 backdrop-blur-sm border-b border-border flex items-center px-4 sticky top-0 z-50 shadow-sm">
                <Header toggleSidebar={toggleSidebar} />
            </header>
            <div className="w-full flex flex-1 relative">
                <nav className={`
                    fixed lg:sticky lg:top-16 top-0 left-0 h-screen lg:h-[calc(100vh-64px)] w-72 
                    bg-sidebar border-r border-sidebar-border z-40 
                    transform transition-transform duration-300 ease-in-out overflow-y-auto
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                    <div className="lg:hidden flex items-center justify-between p-4 border-b border-sidebar-border">
                        <h2 className="font-semibold text-sidebar-foreground">Menu</h2>
                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-lg hover:bg-sidebar-accent"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <Sidebar />
                </nav>

                {sidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                <main className="flex-1 p-3 md:p-6 bg-gradient-to-br from-background to-muted/30 lg:ml-0 min-h-[calc(100vh-64px)]">
                    {children}
                </main>
            </div>
        </div>
    );
}