
import { Request, Response } from 'express';
import { Call } from '../types';

let calls: Call[] = [];

// Get all calls with pagination and filters
export const getCalls = (req: Request, res: Response) => {
  // TODO: Implement filters from query params
  res.json(calls);
};

// Get single call details
export const getCallById = (req: Request, res: Response) => {
  const call = calls.find(c => c.id === req.params.id);
  if (!call) {
    return res.status(404).json({ message: "Call not found" });
  }
  res.json(call);
};

// Endpoint to register a new call for analysis
export const registerCall = (req: Request, res: Response) => {
  const { agentId, audioUrl } = req.body;
  
  const newCall: Call = {
    id: Date.now().toString(),
    agentId,
    audioUrl,
    duration: 0,
    transcript: '',
    timestamp: new Date(),
    summary: '',
    sentiment: {
      overall: 'neutral',
      scores: { positive: 0, neutral: 0, negative: 0 }
    },
    scriptCompliance: {
      items: [],
      score: 0
    },
    alerts: [],
    status: 'pending'
  };
  
  calls.push(newCall);
  // TODO: Trigger async analysis pipeline
  res.status(201).json(newCall);
};

// Update call analysis results
export const updateCallAnalysis = (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  
  const callIndex = calls.findIndex(c => c.id === id);
  if (callIndex === -1) {
    return res.status(404).json({ message: "Call not found" });
  }
  
  calls[callIndex] = { ...calls[callIndex], ...updateData };
  res.json(calls[callIndex]);
};
