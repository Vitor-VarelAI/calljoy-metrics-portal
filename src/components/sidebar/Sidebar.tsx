
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
  ClipboardList 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
}

const navItems = [
  { name: "Dashboard", path: "/", icon: BarChart },
  { name: "Chamadas", path: "/chamadas", icon: Headphones },
  { name: "Upload", path: "/upload", icon: FileUp },
  { name: "Agentes", path: "/agentes", icon: Users },
  { name: "Relatórios", path: "/relatorios", icon: FileText },
  { name: "Regras Call Center", path: "/regras-call-center", icon: ClipboardList },
  { name: "Configurações", path: "/configuracoes", icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-sidebar transition-all duration-300 md:relative",
        isOpen ? "w-64" : "w-0 md:w-16 overflow-hidden"
      )}
    >
      {/* Branding */}
      <div className="flex h-14 md:h-16 items-center border-b px-4">
        <div className={cn("flex items-center", !isOpen && "md:justify-center")}>
          <span className="text-2xl font-bold text-primary">CallScan</span>
          {isOpen && (
            <span className="ml-2 text-xs text-muted-foreground">
              Análise inteligente de chamadas
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    !isOpen && "md:justify-center md:px-0"
                  )
                }
              >
                <item.icon className={cn("h-5 w-5", !isOpen && "md:h-6 md:w-6")} />
                {isOpen && <span className="ml-3">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t py-4 px-2">
        <ul className="space-y-1">
          <li>
            <button
              onClick={toggleTheme}
              className={cn(
                "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                !isOpen && "md:justify-center md:px-0"
              )}
            >
              {theme === "dark" ? (
                <Sun className={cn("h-5 w-5", !isOpen && "md:h-6 md:w-6")} />
              ) : (
                <Moon className={cn("h-5 w-5", !isOpen && "md:h-6 md:w-6")} />
              )}
              {isOpen && <span className="ml-3">{theme === "dark" ? "Modo Claro" : "Modo Escuro"}</span>}
            </button>
          </li>
          <li>
            <button
              className={cn(
                "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                !isOpen && "md:justify-center md:px-0"
              )}
            >
              <LogOut className={cn("h-5 w-5", !isOpen && "md:h-6 md:w-6")} />
              {isOpen && <span className="ml-3">Logout</span>}
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
