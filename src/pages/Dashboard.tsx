
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Smile, AlertTriangle, Clock, ArrowRight, TrendingUp } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
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
  CartesianGrid, 
  Tooltip 
} from "recharts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  // Dados de exemplo para o gráfico de sentimento
  const sentimentData = [
    { name: "Seg", valor: 68 },
    { name: "Ter", valor: 72 },
    { name: "Qua", valor: 65 },
    { name: "Qui", valor: 78 },
    { name: "Sex", valor: 82 },
    { name: "Sáb", valor: 76 },
    { name: "Dom", valor: 74 },
  ];

  // Dados de exemplo para a tabela de chamadas recentes
  const chamadasRecentes = [
    { 
      id: "CALL-9582", 
      data: "28/03/2023 14:32", 
      agente: "João Silva", 
      duracao: "06:32", 
      sentimento: "positivo", 
      script: true 
    },
    { 
      id: "CALL-9581", 
      data: "28/03/2023 13:45", 
      agente: "Maria Oliveira", 
      duracao: "04:18", 
      sentimento: "neutro", 
      script: true 
    },
    { 
      id: "CALL-9580", 
      data: "28/03/2023 11:23", 
      agente: "Carlos Santos", 
      duracao: "08:57", 
      sentimento: "negativo", 
      script: false 
    },
    { 
      id: "CALL-9579", 
      data: "28/03/2023 10:15", 
      agente: "Ana Pereira", 
      duracao: "05:42", 
      sentimento: "positivo", 
      script: true 
    },
    { 
      id: "CALL-9578", 
      data: "28/03/2023 09:30", 
      agente: "Paulo Ferreira", 
      duracao: "07:21", 
      sentimento: "negativo", 
      script: false 
    },
  ];

  // Dados de exemplo para alertas recentes
  const alertasRecentes = [
    { 
      id: 1, 
      timestamp: "28/03/2023 14:25", 
      agente: "Carlos Santos", 
      tipo: "Tom agressivo detectado", 
      severidade: "alta" 
    },
    { 
      id: 2, 
      timestamp: "28/03/2023 13:18", 
      agente: "Paulo Ferreira", 
      tipo: "Palavra crítica: 'cancelamento'", 
      severidade: "média" 
    },
    { 
      id: 3, 
      timestamp: "28/03/2023 11:05", 
      agente: "Maria Oliveira", 
      tipo: "Silêncio prolongado", 
      severidade: "baixa" 
    },
    { 
      id: 4, 
      timestamp: "28/03/2023 09:45", 
      agente: "João Silva", 
      tipo: "Política de devolução não explicada", 
      severidade: "média" 
    },
  ];

  // Função para renderizar o badge de sentimento
  const renderSentimentBadge = (sentimento: string) => {
    switch (sentimento) {
      case "positivo":
        return (
          <Badge className="bg-[hsl(160,70%,45%)]">
            <Smile className="mr-1 h-3 w-3" /> Positivo
          </Badge>
        );
      case "negativo":
        return (
          <Badge className="bg-[hsl(0,70%,50%)]">
            <AlertTriangle className="mr-1 h-3 w-3" /> Negativo
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            Neutro
          </Badge>
        );
    }
  };

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">📊 Dashboard</h1>
        <p className="text-muted-foreground">
          Resumo de desempenho das chamadas e agentes
        </p>
      </div>

      {/* KPIs Principais */}
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

      {/* Gráfico de Tendência de Sentimento */}
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            <CardTitle>📈 Evolução de Sentimento</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                sentiment: {
                  label: "Sentimento",
                  theme: {
                    light: "hsl(220, 100%, 56%)",
                    dark: "hsl(220, 60%, 38%)",
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
                      <stop offset="5%" stopColor="var(--color-sentiment)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-sentiment)" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="valor"
                    stroke="var(--color-sentiment)"
                    fillOpacity={1}
                    fill="url(#sentimentGradient)"
                    name="sentiment"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Chamadas Recentes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CardTitle>📋 Chamadas Recentes</CardTitle>
            </div>
            <Button variant="outline" size="sm">
              Ver todas <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Agente</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead>Sentimento</TableHead>
                  <TableHead>Script</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chamadasRecentes.map((chamada) => (
                  <TableRow 
                    key={chamada.id} 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => window.location.href = `/chamada/${chamada.id}`}
                  >
                    <TableCell>{chamada.data}</TableCell>
                    <TableCell>{chamada.agente}</TableCell>
                    <TableCell>{chamada.duracao}</TableCell>
                    <TableCell>{renderSentimentBadge(chamada.sentimento)}</TableCell>
                    <TableCell>
                      {chamada.script ? (
                        <Badge variant="secondary" className="bg-[hsl(160,70%,45%)]/20 text-[hsl(160,70%,45%)]">
                          ✅ Completo
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-[hsl(0,70%,50%)]/20 text-[hsl(0,70%,50%)]">
                          ❌ Incompleto
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `/chamada/${chamada.id}`;
                        }}
                      >
                        Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Seção de Alertas */}
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
            {alertasRecentes.map((alerta) => (
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
    </div>
  );
};

export default Dashboard;
