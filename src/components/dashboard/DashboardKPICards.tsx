
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Smile, AlertTriangle, Clock } from "lucide-react";

const DashboardKPICards = () => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <Card className="overflow-hidden rounded-xl shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Chamadas Hoje</p>
              <p className="text-4xl font-bold">128</p>
              <p className="text-xs text-[hsl(160,70%,45%)]">+12 vs ontem</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <Phone className="h-8 w-8 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden rounded-xl shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Sentimento Positivo</p>
              <p className="text-4xl font-bold">74%</p>
              <p className="text-xs text-muted-foreground">Média últimos 7 dias</p>
            </div>
            <div className="rounded-full bg-[hsl(160,70%,45%)]/10 p-3">
              <Smile className="h-8 w-8 text-[hsl(160,70%,45%)]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden rounded-xl shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Alertas Críticos</p>
              <p className="text-4xl font-bold">16</p>
              <p className="text-xs text-muted-foreground">Chamadas com incidentes</p>
            </div>
            <div className="rounded-full bg-[hsl(0,70%,50%)]/10 p-3">
              <AlertTriangle className="h-8 w-8 text-[hsl(0,70%,50%)]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden rounded-xl shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Duração Média</p>
              <p className="text-4xl font-bold">06:21</p>
              <p className="text-xs text-muted-foreground">Últimos 7 dias</p>
            </div>
            <div className="rounded-full bg-primary/10 p-3">
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardKPICards;
