import Header from "@/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-screen flex flex-col bg-background min-h-screen">
            <header className="w-full h-16 bg-card/90 backdrop-blur-sm border-b border-border flex items-center px-4 sticky top-0 z-50 shadow-sm">
                <Header />
            </header>
            <div className="w-full flex flex-1">
                <nav className="w-72 h-[calc(100vh-64px)] bg-sidebar border-r border-sidebar-border sticky top-16 overflow-y-scroll">
                    
                </nav>
                <main className="flex-1 p-6 bg-gradient-to-br from-background to-muted/30">
                    {children}
                </main>
            </div>
        </div>
    );
}