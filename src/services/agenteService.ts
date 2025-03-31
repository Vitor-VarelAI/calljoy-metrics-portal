
// Types
export interface AgentKPI {
  label: string;
  value: string | number;
  icon: string;
}

export interface AgentCall {
  id: string;
  date: string;
  duration: string;
  sentiment: string;
  script: boolean;
}

export interface ChartDataPoint {
  name: string;
  sentiment: number;
  duration: number;
  script: number;
}

export interface AgentData {
  id: string;
  name: string;
  since: string;
  team: string;
  avatar: string;
  kpis: AgentKPI[];
  recentCalls: AgentCall[];
  recommendations: string[];
  chartData: ChartDataPoint[];
}

// Mock data function
export const getAgentData = (id: string): AgentData => {
  // Mock data for demo purposes
  return {
    id: id,
    name: "João Silva",
    since: "2022",
    team: "Equipa Norte",
    avatar: "", // Placeholder for a real avatar URL
    kpis: [
      { label: "Chamadas analisadas", value: 218, icon: "📞" },
      { label: "% Sentimento positivo", value: "76%", icon: "🙂" },
      { label: "Script cumprido", value: "82%", icon: "✅" },
      { label: "Alertas críticos", value: 14, icon: "⚠️" },
    ],
    recentCalls: [
      { id: "1", date: "28/03/2025", duration: "06:21", sentiment: "positivo", script: true },
      { id: "2", date: "27/03/2025", duration: "04:15", sentiment: "neutro", script: true },
      { id: "3", date: "26/03/2025", duration: "08:32", sentiment: "negativo", script: false },
      { id: "4", date: "25/03/2025", duration: "05:47", sentiment: "positivo", script: true },
      { id: "5", date: "24/03/2025", duration: "07:10", sentiment: "positivo", script: true },
    ],
    recommendations: [
      "Confirmar política de devolução claramente",
      "Reduzir uso de expressões vagas",
      "Melhorar empatia em chamadas de conflito",
    ],
    chartData: [
      { name: "Sem 1", sentiment: 72, duration: 5.8, script: 78 },
      { name: "Sem 2", sentiment: 68, duration: 6.2, script: 74 },
      { name: "Sem 3", sentiment: 74, duration: 5.5, script: 80 },
      { name: "Sem 4", sentiment: 76, duration: 5.2, script: 82 },
      { name: "Sem 5", sentiment: 80, duration: 4.8, script: 85 },
      { name: "Sem 6", sentiment: 78, duration: 5.0, script: 83 },
    ],
  };
};
