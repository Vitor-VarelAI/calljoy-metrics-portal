
import { Agent } from 'crewai';

export const createComplianceAgent = (rules: any) => new Agent({
  name: 'Compliance Analyst',
  goal: 'Analyze call transcript for compliance with provided rules',
  backstory: 'Expert in call center compliance and regulations',
  tools: ['text-analysis'],
  llm: { model: 'gpt-3.5-turbo' },
  verbose: true
});

export const createSentimentAgent = () => new Agent({
  name: 'Sentiment Analyzer',
  goal: 'Analyze emotional tone and customer satisfaction',
  backstory: 'Specialist in customer interaction analysis',
  tools: ['sentiment-analysis'],
  llm: { model: 'gpt-3.5-turbo' },
  verbose: true
});

export const createSummaryAgent = () => new Agent({
  name: 'Call Summarizer',
  goal: 'Create concise summaries of call interactions',
  backstory: 'Expert in extracting key information from conversations',
  tools: ['text-summarization'],
  llm: { model: 'gpt-4' },
  verbose: true
});
