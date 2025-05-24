
import { Request, Response } from 'express';
import prisma from '../utils/database';
import { logToFile, logError } from '../utils/logger';

export const getRules = async (req: Request, res: Response) => {
  try {
    const rules = await prisma.rule.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(rules);
  } catch (error) {
    logError(error);
    res.status(500).json({ error: 'Failed to fetch rules' });
  }
};

export const createRule = async (req: Request, res: Response) => {
  try {
    const rule = await prisma.rule.create({
      data: {
        description: req.body.description,
        category: req.body.category,
        type: req.body.type,
        clientId: req.body.clientId || null
      }
    });
    
    logToFile(`Created new rule: ${rule.id}`);
    res.status(201).json(rule);
  } catch (error) {
    logError(error);
    res.status(500).json({ error: 'Failed to create rule' });
  }
};

export const updateRule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedRule = await prisma.rule.update({
      where: { id },
      data: {
        description: req.body.description,
        category: req.body.category,
        type: req.body.type
      }
    });
    
    logToFile(`Updated rule: ${id}`);
    res.json(updatedRule);
  } catch (error) {
    logError(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Rule not found" });
    }
    res.status(500).json({ error: 'Failed to update rule' });
  }
};

export const deleteRule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.rule.delete({
      where: { id }
    });
    
    logToFile(`Deleted rule: ${id}`);
    res.status(204).send();
  } catch (error) {
    logError(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Rule not found" });
    }
    res.status(500).json({ error: 'Failed to delete rule' });
  }
};
