import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { 
  Search, 
  Calendar as CalendarIcon, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  XCircle 
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Dados fictícios de chamadas para a tabela
const callsData = [
  {
    id: "CALL-9582",
    agent: "João Silva",
    date: "28/03/2025",
    duration: "06:32",
    sentiment: "positive",
    script: true,
    alerts: 2
  },
  {
    id: "CALL-9581",
    agent: "Maria Oliveira",
    date: "28/03/2025",
    duration: "04:18",
    sentiment: "neutral",
    script: true,
    alerts: 0
  },
  {
    id: "CALL-9580",
    agent: "Pedro Santos",
    date: "27/03/2025",
    duration: "08:45",
    sentiment: "negative",
    script: false,
    alerts: 5
  },
  {
    id: "CALL-9579",
    agent: "Ana Pereira",
    date: "27/03/2025",
    duration: "03:22",
    sentiment: "positive",
    script: true,
    alerts: 0
  },
  {
    id: "CALL-9578",
    agent: "Carlos Ferreira",
    date: "26/03/2025",
    duration: "05:47",
    sentiment: "neutral",
    script: false,
    alerts: 1
  },
  {
    id: "CALL-9577",
    agent: "Juliana Costa",
    date: "26/03/2025",
    duration: "04:55",
    sentiment: "positive",
    script: true,
    alerts: 0
  },
  {
    id: "CALL-9576",
    agent: "Roberto Alves",
    date: "25/03/2025",
    duration: "07:12",
    sentiment: "negative",
    script: false,
    alerts: 3
  },
  {
    id: "CALL-9575",
    agent: "Carla Mendes",
    date: "25/03/2025",
    duration: "06:05",
    sentiment: "neutral",
    script: true,
    alerts: 1
  }
];

// Lista de agentes para o dropdown
const agents = [
  "Todos os agentes",
  "João Silva",
  "Maria Oliveira",
  "Pedro Santos",
  "Ana Pereira",
  "Carlos Ferreira",
  "Juliana Costa",
  "Roberto Alves",
  "Carla Mendes"
];

const getSentimentBadge = (sentiment: string) => {
  switch (sentiment) {
    case "positive":
      return <Badge className="bg-[hsl(160,70%,45%)]">Positivo</Badge>;
    case "neutral":
      return <Badge className="bg-[hsl(220,10%,60%)]">Neutro</Badge>;
    case "negative":
      return <Badge className="bg-[hsl(0,70%,50%)]">Negativo</Badge>;
    default:
      return <Badge variant="secondary">Desconhecido</Badge>;
  }
};

const Chamadas = () => {
  // Estados para os filtros
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selectedAgent, setSelectedAgent] = useState("Todos os agentes");
  const [sentiment, setSentiment] = useState("Todos");
  const [onlyWithAlerts, setOnlyWithAlerts] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Estado para paginação
  const [currentPage, setCurrentPage] = useState(1);

  // Filtragem de dados com base nos filtros aplicados
  const filteredCalls = useMemo(() => {
    return callsData.filter((call) => {
      // Filtro de busca (nome do agente ou ID)
      if (searchQuery && !call.agent.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !call.id.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Filtro de agente
      if (selectedAgent !== "Todos os agentes" && call.agent !== selectedAgent) {
        return false;
      }

      // Filtro de sentimento
      if (sentiment !== "Todos") {
        const sentimentLower = sentiment.toLowerCase();
        if (call.sentiment !== sentimentLower) {
          return false;
        }
      }

      // Filtro de alertas
      if (onlyWithAlerts && call.alerts === 0) {
        return false;
      }

      // Filtros de data poderiam ser implementados aqui...

      return true;
    });
  }, [searchQuery, selectedAgent, sentiment, onlyWithAlerts]);

  // Cálculo de paginação
  const totalPages = Math.ceil(filteredCalls.length / 5);
  const paginatedCalls = filteredCalls.slice((currentPage - 1) * 5, currentPage * 5);

  // Função para limpar todos os filtros
  const clearFilters = () => {
    setDateFrom(undefined);
    setDateTo(undefined);
    setSelectedAgent("Todos os agentes");
    setSentiment("Todos");
    setOnlyWithAlerts(false);
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <span>🎧</span> Chamadas
        </h1>
        <p className="text-muted-foreground">Lista completa de chamadas analisadas com IA</p>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {/* Filtro de Data */}
            <div className="space-y-2">
              <Label htmlFor="dateFrom">📅 Período</Label>
              <div className="flex space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateFrom && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "dd/MM/yyyy") : "De"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateTo && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "dd/MM/yyyy") : "Até"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Filtro de Agente */}
            <div className="space-y-2">
              <Label htmlFor="agente">🧑‍💼 Agente</Label>
              <Select
                value={selectedAgent}
                onValueChange={setSelectedAgent}
              >
                <SelectTrigger id="agente">
                  <SelectValue placeholder="Selecione um agente" />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent} value={agent}>{agent}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filtro de Sentimento */}
            <div className="space-y-2">
              <Label htmlFor="sentimento">🙂 Sentimento</Label>
              <Select
                value={sentiment}
                onValueChange={setSentiment}
              >
                <SelectTrigger id="sentimento">
                  <SelectValue placeholder="Selecione o sentimento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos</SelectItem>
                  <SelectItem value="Positivo">Positivo</SelectItem>
                  <SelectItem value="Neutro">Neutro</SelectItem>
                  <SelectItem value="Negativo">Negativo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Campo de busca */}
            <div className="space-y-2">
              <Label htmlFor="search">🔍 Busca</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Pesquisar agente ou ID"
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Switch para Alertas */}
            <div className="space-y-2 flex flex-col">
              <Label htmlFor="alertas">🚨 Alertas</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="alertas"
                  checked={onlyWithAlerts}
                  onCheckedChange={setOnlyWithAlerts}
                />
                <Label htmlFor="alertas" className="font-normal">
                  Só com alertas
                </Label>
              </div>

              {/* Botões de ação */}
              <div className="flex space-x-2 mt-auto">
                <Button className="w-full" onClick={() => setCurrentPage(1)}>
                  <Search className="mr-2 h-4 w-4" />
                  Buscar
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-shrink-0"
                  onClick={clearFilters}
                >
                  Limpar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Chamadas */}
      <Card>
        <CardHeader>
          <CardTitle>Resultados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Checkbox />
                  </TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Agente</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead>Sentimento</TableHead>
                  <TableHead>Script</TableHead>
                  <TableHead>Alertas</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCalls.map((call) => (
                  <TableRow 
                    key={call.id}
                    className="hover:bg-muted/50 cursor-pointer"
                  >
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>{call.date}</TableCell>
                    <TableCell>{call.agent}</TableCell>
                    <TableCell>{call.duration}</TableCell>
                    <TableCell>{getSentimentBadge(call.sentiment)}</TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger>
                          {call.script ? (
                            <CheckCircle className="h-5 w-5 text-[hsl(160,70%,45%)]" />
                          ) : (
                            <XCircle className="h-5 w-5 text-[hsl(0,70%,50%)]" />
                          )}
                        </TooltipTrigger>
                        <TooltipContent>
                          {call.script ? "Script seguido corretamente" : "Script incompleto"}
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      {call.alerts > 0 ? (
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex items-center">
                              <AlertTriangle className="h-5 w-5 text-[hsl(0,70%,50%)]" />
                              <span className="ml-1">{call.alerts}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            {call.alerts} {call.alerts === 1 ? "alerta detectado" : "alertas detectados"}
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/chamada/${call.id}`}>
                          <Eye className="h-4 w-4 mr-1" /> Ver
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {paginatedCalls.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Nenhuma chamada encontrada com os filtros aplicados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Paginação */}
          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <span className="flex h-10 items-center px-4">
                    Página {currentPage} de {totalPages || 1}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chamadas;