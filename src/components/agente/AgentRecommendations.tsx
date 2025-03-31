
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface AgentRecommendationsProps {
  recommendations: string[];
}

const AgentRecommendations: React.FC<AgentRecommendationsProps> = ({ recommendations }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">💡 Recomendações de Melhoria</h2>
        <ul className="space-y-2 list-disc pl-5">
          {recommendations.map((rec, index) => (
            <li key={index} className="text-muted-foreground">{rec}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default AgentRecommendations;
