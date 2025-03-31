
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

interface ChartData {
  name: string;
  sentiment: number;
  duration: number;
  script: number;
}

interface AgentPerformanceChartProps {
  chartData: ChartData[];
}

const AgentPerformanceChart: React.FC<AgentPerformanceChartProps> = ({ chartData }) => {
  const chartConfig = {
    sentiment: {
      label: "Sentimento",
      theme: {
        light: "hsl(160, 70%, 45%)",
        dark: "hsl(160, 70%, 45%)",
      }
    },
    script: {
      label: "Script",
      theme: {
        light: "hsl(220, 100%, 56%)",
        dark: "hsl(220, 60%, 38%)",
      }
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">📈 Tendência Semanal</h2>
        <div className="h-80">
          <ChartContainer
            config={chartConfig}
            className="h-full w-full"
          >
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip 
                content={<ChartTooltipContent 
                  formatter={(value) => `${value}%`} 
                />} 
              />
              <Bar dataKey="sentiment" fill="var(--color-sentiment)" name="Sentimento" unit="%" />
              <Bar dataKey="script" fill="var(--color-script)" name="Script" unit="%" />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentPerformanceChart;
