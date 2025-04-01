import express from 'express';
import cors from 'cors';
import agentRoutes from './routes/agents';
import ruleRoutes from './routes/rules';
import callRoutes from './routes/calls';

const app = express();
const port = 5000;

app.use(cors({
  origin: ['http://localhost:8081', 'http://0.0.0.0:8081'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/calls', callRoutes);
app.use('/agents', agentRoutes);
app.use('/rules', ruleRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});