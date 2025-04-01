
import express from 'express';
import { getAgents, getAgentById } from '../controllers/agentController';

const router = express.Router();

router.get('/', getAgents);
router.get('/:id', getAgentById);

export default router;
