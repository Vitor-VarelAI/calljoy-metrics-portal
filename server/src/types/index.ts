
export interface Agent {
  id: string;
  name: string;
  email: string;
  status: string;
}

export interface Call {
  id: string;
  agentId: string;
  duration: number;
  timestamp: Date;
  status: string;
}

export interface Rule {
  id: string;
  description: string;
  category: string;
  type: string;
}
