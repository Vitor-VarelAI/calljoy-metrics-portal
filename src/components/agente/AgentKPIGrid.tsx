
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface KPI {
  label: string;
  value: string | number;
  icon: string;
}

interface AgentKPIGridProps {
  kpis: KPI[];
}

const AgentKPIGrid: React.FC<AgentKPIGridProps> = ({ kpis }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{kpi.label}</p>
                <p className="text-3xl font-bold">{kpi.value}</p>
              </div>
              <div className="text-2xl">{kpi.icon}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AgentKPIGrid;
