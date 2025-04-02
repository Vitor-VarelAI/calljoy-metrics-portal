
import express from 'express';
import cors from 'cors';
import { logToFile, logError } from './utils/logger';
import agentRoutes from './routes/agents';
import ruleRoutes from './routes/rules';
import callRoutes from './routes/calls';

const app = express();
const port = 5000;

// Error handling for uncaught exceptions
process.on('uncaughtException', (error) => {
  logError(error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logError(reason);
});

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://0.0.0.0:8080'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/agents', agentRoutes);
app.use('/api/rules', ruleRoutes);
app.use('/api/calls', callRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Global error handler (at the end, after routes)
app.use((err: Error, req: any, res: any, next: any) => {
  logError(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, '0.0.0.0', () => {
  logToFile(`Server started on port ${port}`);
});
