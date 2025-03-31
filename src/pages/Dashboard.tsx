
import React from "react";
import DashboardKPICards from "@/components/dashboard/DashboardKPICards";
import SentimentTrendChart from "@/components/dashboard/SentimentTrendChart";
import RecentCallsTable from "@/components/dashboard/RecentCallsTable";
import RecentAlertsList from "@/components/dashboard/RecentAlertsList";
import { SentimentDataPoint, RecentCall, RecentAlert } from "@/components/dashboard/DashboardTypes";

const Dashboard = () => {
  // Dados de exemplo para o gráfico de sentimento
  const sentimentData: SentimentDataPoint[] = [
    { name: "Seg", valor: 72 },
    { name: "Ter", valor: 76 },
    { name: "Qua", valor: 70 },
    { name: "Qui", valor: 74 },
    { name: "Sex", valor: 78 },
    { name: "Sáb", valor: 76 },
    { name: "Dom", valor: 74 },
  ];

  // Dados de exemplo para a tabela de chamadas recentes
  const chamadasRecentes: RecentCall[] = [
    { 
      id: "CALL-9582", 
      data: "28/03/2023 14:32", 
      agente: "João Silva", 
      duracao: "06:32", 
      sentimento: "positivo", 
      script: true 
    },
    { 
      id: "CALL-9581", 
      data: "28/03/2023 13:45", 
      agente: "Maria Oliveira", 
      duracao: "04:18", 
      sentimento: "neutro", 
      script: true 
    },
    { 
      id: "CALL-9580", 
      data: "28/03/2023 11:23", 
      agente: "Carlos Santos", 
      duracao: "08:57", 
      sentimento: "negativo", 
      script: false 
    },
    { 
      id: "CALL-9579", 
      data: "28/03/2023 10:15", 
      agente: "Ana Pereira", 
      duracao: "05:42", 
      sentimento: "positivo", 
      script: true 
    },
    { 
      id: "CALL-9578", 
      data: "28/03/2023 09:30", 
      agente: "Paulo Ferreira", 
      duracao: "07:21", 
      sentimento: "negativo", 
      script: false 
    },
  ];

  // Dados de exemplo para alertas recentes
  const alertasRecentes: RecentAlert[] = [
    { 
      id: 1, 
      timestamp: "28/03/2023 14:25", 
      agente: "Carlos Santos", 
      tipo: "Tom agressivo detectado", 
      severidade: "alta" 
    },
    { 
      id: 2, 
      timestamp: "28/03/2023 13:18", 
      agente: "Paulo Ferreira", 
      tipo: "Palavra crítica: 'cancelamento'", 
      severidade: "média" 
    },
    { 
      id: 3, 
      timestamp: "28/03/2023 11:05", 
      agente: "Maria Oliveira", 
      tipo: "Silêncio prolongado", 
      severidade: "baixa" 
    },
    { 
      id: 4, 
      timestamp: "28/03/2023 09:45", 
      agente: "João Silva", 
      tipo: "Política de devolução não explicada", 
      severidade: "média" 
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">📊 Dashboard</h1>
        <p className="text-muted-foreground">
          Resumo de desempenho das chamadas e agentes
        </p>
      </div>

      {/* KPIs Principais */}
      <DashboardKPICards />

      {/* Gráfico de Tendência de Sentimento */}
      <SentimentTrendChart sentimentData={sentimentData} />

      {/* Tabela de Chamadas Recentes */}
      <RecentCallsTable calls={chamadasRecentes} />

      {/* Seção de Alertas */}
      <RecentAlertsList alerts={alertasRecentes} />
    </div>
  );
};

export default Dashboard;
