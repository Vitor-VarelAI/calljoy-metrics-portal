
import { Task } from 'crewai';

export const createAnalysisTasks = (transcript: string, rules: any) => {
  return [
    new Task({
      description: 'Analyze call compliance with provided rules',
      context: { transcript, rules },
    }),
    new Task({
      description: 'Analyze call sentiment and customer satisfaction',
      context: { transcript },
    }),
    new Task({
      description: 'Generate comprehensive call summary',
      context: { transcript },
    })
  ];
};
