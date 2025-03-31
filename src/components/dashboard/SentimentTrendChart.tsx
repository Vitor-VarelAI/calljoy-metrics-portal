
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid
} from "recharts";
import { SentimentDataPoint } from "./DashboardTypes";

interface SentimentTrendChartProps {
  sentimentData: SentimentDataPoint[];
}

const SentimentTrendChart: React.FC<SentimentTrendChartProps> = ({ sentimentData }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-[hsl(160,70%,45%)]" />
              <CardTitle>📈 Evolução de Sentimento</CardTitle>
            </div>
            <CardDescription className="mt-1.5">
              Análise diária da tendência emocional nas chamadas
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            Ver último mês
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-6">
        <div className="h-[300px]">
          <ChartContainer
            config={{
              sentiment: {
                label: "Sentimento",
                theme: {
                  light: "hsl(160, 70%, 45%)",
                  dark: "hsl(160, 70%, 45%)",
                },
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={sentimentData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(160, 70%, 45%)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(160, 70%, 45%)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis 
                  domain={[50, 100]} 
                  tickFormatter={(value) => `${value}%`}
                />
                <ChartTooltip 
                  content={
                    <ChartTooltipContent 
                      formatter={(value) => `${value}%`}
                      labelFormatter={(label) => `${label}-feira`}
                    />
                  } 
                />
                <Area
                  type="monotone"
                  dataKey="valor"
                  stroke="var(--color-sentiment)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#sentimentGradient)"
                  name="sentiment"
                  dot={{ r: 4, strokeWidth: 2, fill: "white" }}
                  activeDot={{ r: 6, strokeWidth: 2, fill: "white" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentTrendChart;
