
import express from 'express';
import cors from 'cors';
import agentRoutes from './routes/agents';
import ruleRoutes from './routes/rules';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/agents', agentRoutes);
app.use('/api/rules', ruleRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
