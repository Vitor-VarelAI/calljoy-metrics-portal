
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./hooks/useTheme";
import MainLayout from "./layouts/MainLayout";
import Index from "./pages/Index";
import Chamadas from "./pages/Chamadas";
import ChamadaDetalhes from "./pages/ChamadaDetalhes";
import Dashboard from "./pages/Dashboard";
import Agentes from "./pages/Agentes";
import AgenteDetalhe from "./pages/AgenteDetalhe";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";
import RegrasCallCenter from "./pages/RegrasCallCenter";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Index />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="chamadas" element={<Chamadas />} />
              <Route path="upload" element={<Upload />} />
              <Route path="chamada/:id" element={<ChamadaDetalhes />} />
              <Route path="agentes" element={<Agentes />} />
              <Route path="agente/:id" element={<AgenteDetalhe />} />
              <Route path="relatorios" element={<Relatorios />} />
              <Route path="configuracoes" element={<Configuracoes />} />
              <Route path="regras-call-center" element={<RegrasCallCenter />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
