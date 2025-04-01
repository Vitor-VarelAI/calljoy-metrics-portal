
import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { Call } from '../types';

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
export const uploadCall = (req: Request, res: Response) => {
  upload.single('audio')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { agentId } = req.body;
    
    const newCall: Call = {
      id: Date.now().toString(),
      agentId,
      audioUrl: `/uploads/${req.file.filename}`,
      audioFileName: req.file.originalname,
      mimeType: req.file.mimetype,
      transcript: '',
      duration: 0,
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
      processingStatus: 'pending'
    };

    calls.push(newCall);
    
    // Start async processing pipeline
    processCall(newCall).catch(error => {
      console.error(`Error processing call ${newCall.id}:`, error);
      newCall.processingStatus = 'error';
      newCall.processingError = error.message;
    });
    
    res.status(201).json(newCall);
});

async function processCall(call: Call) {
  try {
    // Update status to transcribing
    call.processingStatus = 'transcribing';
    
    // Transcribe using Whisper
    const transcription = await transcribeAudio(call.audioUrl);
    call.transcript = transcription;
    
    // Update status to analyzing
    call.processingStatus = 'analyzing';
    
    // Analyze using GPT-3.5
    const analysis = await analyzeTranscript(transcription);
    
    // Update call with analysis results
    Object.assign(call, {
      summary: analysis.summary,
      sentiment: analysis.sentiment,
      scriptCompliance: analysis.scriptCompliance,
      alerts: analysis.alerts,
      processingStatus: 'completed'
    });
    
  } catch (error) {
    call.processingStatus = 'error';
    call.processingError = error.message;
    throw error;
  }
  });
};
  
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
