
import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { Call } from '../types';
import prisma from '../utils/database';
import { logToFile, logError } from '../utils/logger';
import { analyzeCall } from '../crew/runner';

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['audio/mpeg', 'audio/wav', 'audio/wave'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only MP3 and WAV files are allowed.'));
    }
  },
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

// Placeholder function for audio transcription - will be implemented later
async function transcribeAudio(audioPath: string): Promise<string> {
  logToFile(`Transcribing audio: ${audioPath}`);
  // TODO: Implement actual Whisper API integration
  return "Esta é uma transcrição simulada da chamada. O agente cumprimentou o cliente, verificou os dados pessoais e discutiu opções de pagamento antes de encerrar a chamada.";
}

// Get rules for client analysis
async function getRulesForClient(clientId?: string) {
  try {
    const rules = await prisma.rule.findMany({
      where: clientId ? { clientId } : {}
    });
    return rules;
  } catch (error) {
    logError(`Error fetching rules: ${error}`);
    return [];
  }
}

// Get all calls with pagination and filters
export const getCalls = async (req: Request, res: Response) => {
  try {
    const calls = await prisma.call.findMany({
      orderBy: { timestamp: 'desc' }
    });
    res.json(calls);
  } catch (error) {
    logError(error);
    res.status(500).json({ error: 'Failed to fetch calls' });
  }
};

// Get single call details
export const getCallById = async (req: Request, res: Response) => {
  try {
    const call = await prisma.call.findUnique({
      where: { id: req.params.id }
    });
    if (!call) {
      return res.status(404).json({ message: "Call not found" });
    }
    res.json(call);
  } catch (error) {
    logError(error);
    res.status(500).json({ error: 'Failed to fetch call details' });
  }
};

// Upload call and start processing
export const uploadCall = async (req: Request, res: Response) => {
  upload.single('audio')(req, res, async (err) => {
    if (err) {
      logError(`Upload failed: ${err.message}`);
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { agentId } = req.body;

    try {
      // Validate the existence of the Agent
      const agent = await prisma.agent.findUnique({
        where: { id: agentId },
      });

      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }

      // Create a new Call record in the database
      const newCall = await prisma.call.create({
        data: {
          agentId,
          audioUrl: `/uploads/${req.file.filename}`,
          audioFileName: req.file.originalname,
          mimeType: req.file.mimetype,
          transcript: '',
          duration: 0,
          processingStatus: 'pending',
          sentiment: { overall: 'neutral', scores: { positive: 0, neutral: 0, negative: 0 } },
          scriptCompliance: { items: [], score: 0 },
          alerts: []
        },
      });

      logToFile(`Uploaded new call for agent ${agentId}, Call ID: ${newCall.id}`);
      
      // Start async processing pipeline
      processCall(newCall.id).catch(error => {
        logError(`Error processing call ${newCall.id}: ${error.message}`);
      });
      
      res.status(201).json(newCall);
    } catch (error) {
      logError(error);
      res.status(500).json({ error: 'Failed to upload call' });
    }
  });
};

async function processCall(callId: string) {
  try {
    // Update status to transcribing
    await prisma.call.update({
      where: { id: callId },
      data: { processingStatus: 'transcribing' }
    });

    const call = await prisma.call.findUnique({ where: { id: callId } });
    if (!call) throw new Error('Call not found');
    
    // Transcribe using placeholder (will be Whisper later)
    const transcription = await transcribeAudio(call.audioUrl);
    
    await prisma.call.update({
      where: { id: callId },
      data: { 
        transcript: transcription,
        processingStatus: 'analyzing'
      }
    });
    
    // Get client rules
    const rules = await getRulesForClient();
    
    // Analyze using CrewAI
    const analysis = await analyzeCall(transcription, rules);
    
    // Update call with analysis results
    await prisma.call.update({
      where: { id: callId },
      data: {
        summary: analysis.summary || 'Análise concluída com sucesso',
        sentiment: analysis.sentiment || { overall: 'neutral', scores: { positive: 0.5, neutral: 0.3, negative: 0.2 } },
        scriptCompliance: analysis.compliance || { items: [], score: 85 },
        alerts: analysis.alerts || [],
        processingStatus: 'completed'
      }
    });
    
    logToFile(`Call ${callId} processed successfully`);
    
  } catch (error) {
    logError(`Error processing call ${callId}: ${error}`);
    await prisma.call.update({
      where: { id: callId },
      data: { 
        processingStatus: 'error',
        processingError: error.message
      }
    });
  }
}

// Update call analysis results
export const updateCallAnalysis = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedCall = await prisma.call.update({
      where: { id },
      data: updateData
    });
    
    res.json(updatedCall);
  } catch (error) {
    logError(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Call not found" });
    }
    res.status(500).json({ error: 'Failed to update call analysis' });
  }
};
