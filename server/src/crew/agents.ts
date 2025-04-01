
import { Agent } from 'crewai';

export const createComplianceAgent = (rules: any) => new Agent({
  name: 'Compliance Reviewer',
  goal: 'Check whether the agent followed the client\'s compliance rules',
  backstory: 'Expert in call center regulations and compliance standards',
  tools: ['text-analysis'],
  llm: { model: 'gpt-3.5-turbo' },
  verbose: true
});

export const createSentimentAgent = () => new Agent({
  name: 'Sentiment Analyzer',
  goal: 'Analyze emotional tone and sentiment shifts throughout the conversation',
  backstory: 'Specialist in emotional intelligence and conversation analysis',
  tools: ['sentiment-analysis'],
  llm: { model: 'gpt-3.5-turbo' },
  verbose: true
});

export const createRiskAgent = () => new Agent({
  name: 'Risk Detector',
  goal: 'Identify critical, aggressive, or risky language usage',
  backstory: 'Expert in risk assessment and conflict detection',
  tools: ['text-analysis', 'risk-detection'],
  llm: { model: 'gpt-3.5-turbo' },
  verbose: true
});

export const createSummaryAgent = () => new Agent({
  name: 'Summary Generator',
  goal: 'Create a short, natural-language summary of the full conversation',
  backstory: 'Specialist in extracting key information and summarizing conversations',
  tools: ['text-summarization'],
  llm: { model: 'gpt-4' },
  verbose: true
});

export const createImprovementAgent = () => new Agent({
  name: 'Improvement Advisor',
  goal: 'Generate contextual, actionable suggestions for agent improvement',
  backstory: 'Expert coach in call center performance and customer service excellence',
  tools: ['improvement-analysis'],
  llm: { model: 'gpt-4' },
  verbose: true
});
