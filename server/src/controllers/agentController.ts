
import { Request, Response } from 'express';
import { Agent } from '../types';

// Mock data - replace with database calls later
const agents: Agent[] = [
  { id: "1", name: "João Pereira", email: "joao.pereira@callscan.pt", status: "active" }
];

export const getAgents = (req: Request, res: Response) => {
  res.json(agents);
};

export const getAgentById = (req: Request, res: Response) => {
  const agent = agents.find(a => a.id === req.params.id);
  if (!agent) {
    return res.status(404).json({ message: "Agent not found" });
  }
  res.json(agent);
};
