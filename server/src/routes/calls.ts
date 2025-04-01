
import express from 'express';
import {
  getCalls,
  getCallById,
  registerCall,
  updateCallAnalysis
} from '../controllers/callController';

const router = express.Router();

router.get('/', getCalls);
router.get('/:id', getCallById);
router.post('/upload', uploadCall);
router.put('/:id/analysis', updateCallAnalysis);

export default router;
