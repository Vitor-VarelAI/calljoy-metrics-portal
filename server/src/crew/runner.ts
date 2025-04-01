
import { Crew } from 'crewai';
import { createComplianceAgent, createSentimentAgent, createSummaryAgent } from './agents';
import { createAnalysisTasks } from './tasks';

export async function analyzeCall(transcript: string, rules: any) {
  const crew = new Crew({
    agents: [
      createComplianceAgent(rules),
      createSentimentAgent(),
      createSummaryAgent()
    ],
    tasks: createAnalysisTasks(transcript, rules),
    verbose: true
  });

  const result = await crew.work();
  
  return {
    compliance: result[0],
    sentiment: result[1],
    summary: result[2]
  };
}
