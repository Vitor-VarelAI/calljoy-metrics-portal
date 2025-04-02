import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { Call } from '../types';
import prisma from '../utils/database';
import { logToFile, logError } from '../utils/logger';
import openai from '../utils/openai'; // Assuming this is where your OpenAI client is

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

// Endpoint to register a new call for analysis
export const uploadCall = async (req: Request, res: Response) => {
  upload.single('audio')(req, res, async (err) => {
    if (err) {
      logError(`Upload failed: ${err.message}`);
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { agentId, clientId } = req.body; // Added clientId

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
          clientId, // Added clientId
          audioUrl: `/uploads/${req.file.filename}`,
          audioFileName: req.file.originalname,
          mimeType: req.file.mimetype,
          duration: 0, // Will be updated after processing
          processingStatus: 'pending',
          sentiment: { overall: 'neutral', scores: { positive: 0, neutral: 0, negative: 0 } },
          scriptCompliance: { items: [], score: 0 },
          alerts: []
        },
      });

      logToFile(`Uploaded new call for agent ${agentId}, Call ID: ${newCall.id}`);

      // Start async processing pipeline
      processCall(newCall).catch(error => {
        console.error(`Error processing call ${newCall.id}:`, error);
        prisma.call.update({
          where: { id: newCall.id },
          data: { processingStatus: 'error', processingError: error.message }
        }).catch(updateError => console.error("Error updating call status:", updateError));
      });

      res.status(201).json(newCall);
    } catch (error) {
      logError(error);
      res.status(500).json({ error: 'Failed to create call' });
    }
  });
};

async function processCall(call: Call) {
  try {
    // Update status to transcribing
    await prisma.call.update({
      where: { id: call.id },
      data: { processingStatus: 'transcribing' }
    });

    // Transcribe using Whisper
    const transcription = await transcribeAudio(call.audioUrl);

    // Update status to analyzing
    await prisma.call.update({
      where: { id: call.id },
      data: { 
        transcript: transcription,
        processingStatus: 'analyzing'
      }
    });

    // Get client rules
    const rules = await getRulesForClient(call.clientId);

    // Initial analysis using OpenAI
    const openaiAnalysis = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Analyze this call transcript and provide a structured analysis including:
            - Summary of the conversation
            - Sentiment analysis (positive/neutral/negative)
            - Compliance check against rules
            - Alerts for potential issues
            Format the response as JSON.`
        },
        {
          role: "user",
          content: `Transcript: ${transcription}\nRules: ${JSON.stringify(rules)}`
        }
      ]
    });

    const analysis = JSON.parse(openaiAnalysis.choices[0].message.content);

    // Update call with analysis results
    await prisma.call.update({
      where: { id: call.id },
      data: {
        summary: analysis.summary,
        sentiment: analysis.sentiment,
        scriptCompliance: analysis.scriptCompliance,
        alerts: analysis.alerts,
        processingStatus: 'completed'
      }
    });
  } catch (error) {
    await prisma.call.update({
      where: { id: call.id },
      data: { processingStatus: 'error', processingError: error.message }
    }).catch(updateError => console.error("Error updating call status:", updateError));
    throw error;
  }
}


// Update call analysis results (This part remains unchanged as it's not related to OpenAI integration)
export const updateCallAnalysis = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const call = await prisma.call.update({
      where: { id: id },
      data: updateData,
    });
    if (!call) {
      return res.status(404).json({ message: "Call not found" });
    }
    res.json(call);
  } catch (error) {
    logError(error);
    res.status(500).json({ error: 'Failed to update call analysis' });
  }
};

// Placeholder functions -  Replace with your actual implementations
async function transcribeAudio(audioUrl: string): Promise<string> {
  // Replace with your transcription logic using Whisper or other service
  console.log("Transcribing audio from:", audioUrl);
  return "This is a sample transcription.";
}

async function getRulesForClient(clientId: string): Promise<any> {
  // Replace with your logic to fetch client rules
  console.log("Fetching rules for client:", clientId);
  return { someRule: "someValue" };
}