import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import {
  BarChart,
  Headphones,
  Users,
  FileText,
  Settings,
  Sun,
  Moon,
  LogOut,
  ClipboardList,
  FileUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';


const Sidebar: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="flex h-screen flex-col justify-between border-r bg-background p-4">
      <div>
        <div className="flex flex-col gap-2 pb-6">
          <span className="text-xl font-bold">CallScan</span>
          <span className="text-sm text-muted-foreground">Análise inteligente de chamadas</span>
        </div>

        <nav aria-label="Menu principal">
          <ul className="space-y-2">
            <li>
              <NavLink to="/" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md">
                <BarChart className="h-5 w-5" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/chamadas" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md">
                <Headphones className="h-5 w-5" />
                <span>Chamadas</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/upload" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md">
                <FileUp className="h-5 w-5" />
                <span>Upload</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/agentes" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md">
                <Users className="h-5 w-5" />
                <span>Agentes</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/relatorios" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md">
                <FileText className="h-5 w-5" />
                <span>Relatórios</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/regras-call-center" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md">
                <ClipboardList className="h-5 w-5" />
                <span>Regras Call Center</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/configuracoes" className="flex items-center gap-2 p-2 hover:bg-accent rounded-md">
                <Settings className="h-5 w-5" />
                <span>Configurações</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <ul className="space-y-2">
          <li>
            <Button variant="ghost" className="w-full justify-start" onClick={toggleTheme} aria-label="Alternar modo escuro">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span>{theme === "dark" ? "Modo Claro" : "Modo Escuro"}</span>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start" aria-label="Fazer logout">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;