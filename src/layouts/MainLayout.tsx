
import React, { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import { MenuIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { theme } = useTheme();

  return (
    <div className={cn("min-h-screen flex", theme)}>
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className="flex-1 flex flex-col">
        <header className="h-14 md:h-16 sticky top-0 z-30 border-b bg-background flex items-center px-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md hover:bg-secondary mr-2"
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </button>
          <div className="flex-1" />
        </header>
        
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
