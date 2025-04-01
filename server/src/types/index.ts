
export interface Agent {
  id: string;
  name: string;
  email: string;
  status: string;
}

export interface Call {
  id: string;
  agentId: string;
  audioUrl: string;
  audioFileName: string;
  mimeType: string;
  transcript: string;
  duration: number;
  timestamp: Date;
  processingStatus: 'pending' | 'transcribing' | 'analyzing' | 'completed' | 'error';
  processingError?: string;
  summary: string;
  sentiment: {
    overall: 'positive' | 'neutral' | 'negative';
    scores: {
      positive: number;
      neutral: number;
      negative: number;
    };
  };
  scriptCompliance: {
    items: {
      name: string;
      completed: boolean;
      timestamp?: number;
    }[];
    score: number;
  };
  alerts: {
    timestamp: number;
    type: string;
    description: string;
  }[];
  status: 'pending' | 'processing' | 'completed' | 'error';
}

export interface Rule {
  id: string;
  description: string;
  category: string;
  type: string;
}
