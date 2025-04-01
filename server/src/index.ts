import express from 'express';
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

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});