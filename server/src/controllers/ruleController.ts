
import { Request, Response } from 'express';
import { Rule } from '../types';

// Mock data - replace with database calls later
let rules: Rule[] = [];

export const getRules = (req: Request, res: Response) => {
  res.json(rules);
};

export const createRule = (req: Request, res: Response) => {
  const rule: Rule = {
    id: Date.now().toString(),
    ...req.body
  };
  rules.push(rule);
  res.status(201).json(rule);
};

export const updateRule = (req: Request, res: Response) => {
  const { id } = req.params;
  rules = rules.map(rule => 
    rule.id === id ? { ...rule, ...req.body } : rule
  );
  res.json(rules.find(rule => rule.id === id));
};

export const deleteRule = (req: Request, res: Response) => {
  const { id } = req.params;
  rules = rules.filter(rule => rule.id !== id);
  res.status(204).send();
};
