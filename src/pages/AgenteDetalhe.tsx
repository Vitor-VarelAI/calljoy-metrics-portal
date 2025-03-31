
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { FilePdf, Eye } from "lucide-react";

const AgenteDetalhe = () => {
  const { id } = useParams();
  
  // Mock data for demo purposes
  const agentData = {
    id: id || "1",
    name: "João Silva",
    since: "2022",
    team: "Equipa Norte",
    avatar: "", // Placeholder for a real avatar URL
    kpis: [
      { label: "Chamadas analisadas", value: 218, icon: "📞" },
      { label: "% Sentimento positivo", value: "76%", icon: "🙂" },
      { label: "Script cumprido", value: "82%", icon: "✅" },
      { label: "Alertas críticos", value: 14, icon: "⚠️" },
    ],
    recentCalls: [
      { id: "1", date: "28/03/2025", duration: "06:21", sentiment: "positivo", script: true },
      { id: "2", date: "27/03/2025", duration: "04:15", sentiment: "neutro", script: true },
      { id: "3", date: "26/03/2025", duration: "08:32", sentiment: "negativo", script: false },
      { id: "4", date: "25/03/2025", duration: "05:47", sentiment: "positivo", script: true },
      { id: "5", date: "24/03/2025", duration: "07:10", sentiment: "positivo", script: true },
    ],
    recommendations: [
      "Confirmar política de devolução claramente",
      "Reduzir uso de expressões vagas",
      "Melhorar empatia em chamadas de conflito",
    ],
    chartData: [
      { name: "Sem 1", sentiment: 72, duration: 5.8, script: 78 },
      { name: "Sem 2", sentiment: 68, duration: 6.2, script: 74 },
      { name: "Sem 3", sentiment: 74, duration: 5.5, script: 80 },
      { name: "Sem 4", sentiment: 76, duration: 5.2, script: 82 },
      { name: "Sem 5", sentiment: 80, duration: 4.8, script: 85 },
      { name: "Sem 6", sentiment: 78, duration: 5.0, script: 83 },
    ],
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case "positivo":
        return <Badge className="bg-[hsl(160,70%,45%)]">Positivo</Badge>;
      case "neutro":
        return <Badge className="bg-[hsl(220,10%,60%)]">Neutro</Badge>;
      case "negativo":
        return <Badge className="bg-[hsl(0,70%,50%)] hover:bg-[hsl(0,70%,45%)]">Negativo</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  const generateReport = () => {
    console.log("Generating PDF report for agent", id);
    // In a real app, this would call a PDF generation service
  };

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
    <div className="container mx-auto py-6 space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={agentData.avatar} alt={agentData.name} />
            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
              {agentData.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{agentData.name}</h1>
            <p className="text-muted-foreground">
              Agente desde {agentData.since} • {agentData.team}
            </p>
          </div>
        </div>
        <Button onClick={generateReport} className="bg-primary hover:bg-primary/90">
          <FilePdf className="mr-2 h-4 w-4" /> Gerar relatório PDF
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {agentData.kpis.map((kpi, index) => (
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

      {/* Chart */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">📈 Tendência Semanal</h2>
          <div className="h-80">
            <ChartContainer
              config={chartConfig}
              className="h-full w-full"
            >
              <BarChart
                data={agentData.chartData}
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

      {/* Recent Calls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">🎧 Chamadas Recentes</h2>
            <Link to="/chamadas">
              <Button variant="outline" size="sm">Ver todas</Button>
            </Link>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead>Sentimento</TableHead>
                  <TableHead>Script</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agentData.recentCalls.map((call) => (
                  <TableRow key={call.id}>
                    <TableCell>{call.date}</TableCell>
                    <TableCell>{call.duration}</TableCell>
                    <TableCell>{getSentimentBadge(call.sentiment)}</TableCell>
                    <TableCell>
                      {call.script ? (
                        <span className="text-[hsl(160,70%,45%)]">✅</span>
                      ) : (
                        <span className="text-[hsl(0,70%,50%)]">❌</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to={`/chamada/${call.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" /> Ver
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">💡 Recomendações de Melhoria</h2>
          <ul className="space-y-2 list-disc pl-5">
            {agentData.recommendations.map((rec, index) => (
              <li key={index} className="text-muted-foreground">{rec}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgenteDetalhe;
