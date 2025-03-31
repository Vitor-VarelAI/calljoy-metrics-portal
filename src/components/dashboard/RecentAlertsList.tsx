
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { RecentAlert } from "./DashboardTypes";

interface RecentAlertsListProps {
  alerts: RecentAlert[];
}

const RecentAlertsList: React.FC<RecentAlertsListProps> = ({ alerts }) => {
  // Função para renderizar o badge de severidade de alerta
  const renderSeveridadeBadge = (severidade: string) => {
    switch (severidade) {
      case "alta":
        return <Badge className="bg-[hsl(0,70%,50%)]">Alta</Badge>;
      case "média":
        return <Badge className="bg-[hsl(30,90%,60%)]">Média</Badge>;
      case "baixa":
        return <Badge className="bg-[hsl(220,10%,50%)]">Baixa</Badge>;
      default:
        return <Badge variant="secondary">Indefinida</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CardTitle>❗ Alertas Recentes</CardTitle>
          </div>
          <Button variant="outline" size="sm">
            Ver todos <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alerta) => (
            <Card key={alerta.id} className="overflow-hidden">
              <div className={cn(
                "h-1 w-full",
                alerta.severidade === "alta" ? "bg-[hsl(0,70%,50%)]" : 
                alerta.severidade === "média" ? "bg-[hsl(30,90%,60%)]" : 
                "bg-[hsl(220,10%,50%)]"
              )} />
              <CardContent className="p-4">
                <div className="flex flex-col space-y-1 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div>
                    <p className="font-medium">{alerta.tipo}</p>
                    <p className="text-sm text-muted-foreground">
                      {alerta.agente} • {alerta.timestamp}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {renderSeveridadeBadge(alerta.severidade)}
                    <Button variant="ghost" size="sm">
                      Ver chamada
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentAlertsList;
