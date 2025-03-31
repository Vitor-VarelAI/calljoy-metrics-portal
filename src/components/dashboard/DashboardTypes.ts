
// Shared types for Dashboard components
export interface SentimentDataPoint {
  name: string;
  valor: number;
}

export interface RecentCall {
  id: string;
  data: string;
  agente: string;
  duracao: string;
  sentimento: "positivo" | "neutro" | "negativo";
  script: boolean;
}

export interface RecentAlert {
  id: number;
  timestamp: string;
  agente: string;
  tipo: string;
  severidade: "alta" | "média" | "baixa";
}
