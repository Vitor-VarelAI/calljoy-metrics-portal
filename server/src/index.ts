import express from 'express';
import { logToFile, logError } from './utils/logger';

process.on('uncaughtException', (error) => {
  logError(error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logError(reason);
});
import cors from 'cors';
import agentRoutes from './routes/agents';
import ruleRoutes from './routes/rules';
import callRoutes from './routes/calls';

const app = express();
const port = 5000;

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

import { logToFile, logError } from './utils/logger';

// Global error handler
app.use((err: Error, req: Request, res: Response, next: Function) => {
  logError(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, '0.0.0.0', () => {
  logToFile(`Server started on port ${port}`);
});

process.on('uncaughtException', (err) => {
  logError(`Uncaught Exception: ${err}`);
  process.exit(1);
});