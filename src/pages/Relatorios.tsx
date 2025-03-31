
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarRange, Download, Eye, FileText, Grid2X2, List, Search } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type Report = {
  id: string;
  title: string;
  date: Date;
  type: "Individual" | "Resumo por agente" | "Global";
  status: "Gerado" | "Em processamento";
  agent?: string;
};

const Relatorios = () => {
  const { toast } = useToast();
  
  // Estados para filtros
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedAgent, setSelectedAgent] = useState<string>("");
  const [reportType, setReportType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Estado para tipo de visualização
  const [viewType, setViewType] = useState<"list" | "grid">("list");
  
  // Estado para seleção em lote
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  
  // Estado para dados de relatórios (mockados)
  const [reports] = useState<Report[]>([
    {
      id: "CALL-9582",
      title: "CALL-9582 - João Silva",
      date: new Date(2025, 2, 28),
      type: "Individual",
      status: "Gerado",
      agent: "João Silva"
    },
    {
      id: "CALL-9583",
      title: "CALL-9583 - Maria Oliveira",
      date: new Date(2025, 2, 27),
      type: "Individual",
      status: "Gerado",
      agent: "Maria Oliveira"
    },
    {
      id: "AGT-001",
      title: "Resumo de Março - João Silva",
      date: new Date(2025, 2, 30),
      type: "Resumo por agente",
      status: "Gerado",
      agent: "João Silva"
    },
    {
      id: "CALL-9584",
      title: "CALL-9584 - Pedro Santos",
      date: new Date(2025, 2, 26),
      type: "Individual",
      status: "Em processamento",
      agent: "Pedro Santos"
    },
    {
      id: "GLOBAL-001",
      title: "Resumo Global - Março 2025",
      date: new Date(2025, 2, 31),
      type: "Global",
      status: "Gerado"
    }
  ]);

  // Lista de agentes (mockada)
  const agents = ["João Silva", "Maria Oliveira", "Pedro Santos", "Ana Costa"];

  // Função para formatar data
  const formatDate = (date: Date) => {
    return format(date, "dd/MM/yyyy", { locale: pt });
  };

  // Funções para ações em relatórios
  const handleViewReport = (reportId: string) => {
    toast({
      title: "Visualizando relatório",
      description: `Relatório #${reportId} aberto para visualização.`,
    });
  };

  const handleDownloadPDF = (reportId: string) => {
    toast({
      title: "Download iniciado",
      description: `Relatório #${reportId} sendo baixado em PDF.`,
    });
  };

  const handleExportReport = (reportId: string) => {
    toast({
      title: "Exportando relatório",
      description: `Relatório #${reportId} sendo exportado.`,
    });
  };

  const handleExportSelected = () => {
    toast({
      title: "Exportando relatórios selecionados",
      description: `${selectedReports.length} relatórios selecionados para exportação.`,
    });
  };

  // Função para alternar seleção de relatório
  const toggleReportSelection = (reportId: string) => {
    if (selectedReports.includes(reportId)) {
      setSelectedReports(selectedReports.filter(id => id !== reportId));
    } else {
      setSelectedReports([...selectedReports, reportId]);
    }
  };

  // Função para selecionar/desselecionar todos os relatórios
  const toggleSelectAll = () => {
    if (selectedReports.length === reports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(reports.map(report => report.id));
    }
  };

  // Função para filtrar relatórios
  const handleSearch = () => {
    toast({
      title: "Filtros aplicados",
      description: "Relatórios filtrados conforme critérios selecionados.",
    });
  };

  // Renderiza badge de status
  const renderStatusBadge = (status: string) => {
    if (status === "Gerado") {
      return (
        <Badge className="bg-[hsl(160,70%,45%)] hover:bg-[hsl(160,70%,40%)]">
          ✅ Gerado
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="bg-[hsl(220,10%,65%)] hover:bg-[hsl(220,10%,60%)]">
        ⏳ Em processamento
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileText className="h-8 w-8" /> Relatórios
        </h1>
        <p className="text-muted-foreground">
          Consulta e exporta os relatórios gerados automaticamente por chamada, agente ou intervalo de tempo.
        </p>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Filtro de data */}
            <div className="space-y-2">
              <Label>📅 Intervalo de Datas</Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarRange className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "dd/MM/yyyy") : "Data inicial"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarRange className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "dd/MM/yyyy") : "Data final"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Filtro de agente */}
            <div className="space-y-2">
              <Label>👤 Agente</Label>
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um agente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os agentes</SelectItem>
                  {agents.map((agent) => (
                    <SelectItem key={agent} value={agent}>
                      {agent}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filtro de tipo de relatório */}
            <div className="space-y-2">
              <Label>🧾 Tipo de Relatório</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os tipos</SelectItem>
                  <SelectItem value="Individual">Chamada individual</SelectItem>
                  <SelectItem value="Resumo por agente">Resumo por agente</SelectItem>
                  <SelectItem value="Global">Resumo global</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Busca e botão de ação */}
            <div className="space-y-2">
              <Label>🔍 Busca</Label>
              <div className="flex gap-2">
                <Input 
                  placeholder="Buscar por ID ou título" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cabeçalho da lista de relatórios */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Relatórios Disponíveis</h2>
          <Badge variant="outline">{reports.length}</Badge>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className={cn(viewType === "list" && "bg-secondary")} 
            onClick={() => setViewType("list")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className={cn(viewType === "grid" && "bg-secondary")} 
            onClick={() => setViewType("grid")}
          >
            <Grid2X2 className="h-4 w-4" />
          </Button>
          {selectedReports.length > 0 && (
            <Button onClick={handleExportSelected} size="sm">
              <Download className="h-4 w-4 mr-2" /> Exportar Selecionados ({selectedReports.length})
            </Button>
          )}
        </div>
      </div>

      {/* Lista de relatórios (visualização de tabela) */}
      {viewType === "list" && (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox 
                      checked={selectedReports.length === reports.length}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedReports.includes(report.id)}
                        onCheckedChange={() => toggleReportSelection(report.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{report.title}</TableCell>
                    <TableCell>{formatDate(report.date)}</TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>{renderStatusBadge(report.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewReport(report.id)}
                          className="text-[hsl(220,100%,56%)]"
                          disabled={report.status === "Em processamento"}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownloadPDF(report.id)}
                          disabled={report.status === "Em processamento"}
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleExportReport(report.id)}
                          disabled={report.status === "Em processamento"}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Visualização em grade */}
      {viewType === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report) => (
            <Card key={report.id} className="overflow-hidden">
              <CardHeader className="p-4 pb-2 flex flex-row justify-between items-start">
                <div>
                  <CardTitle className="text-base">{report.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{formatDate(report.date)}</p>
                </div>
                <Checkbox
                  checked={selectedReports.includes(report.id)}
                  onCheckedChange={() => toggleReportSelection(report.id)}
                />
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex justify-between items-center mt-2">
                  <div className="space-y-2">
                    <Badge variant="outline">{report.type}</Badge>
                    <div>{renderStatusBadge(report.status)}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewReport(report.id)}
                      className="text-[hsl(220,100%,56%)]"
                      disabled={report.status === "Em processamento"}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadPDF(report.id)}
                      disabled={report.status === "Em processamento"}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleExportReport(report.id)}
                      disabled={report.status === "Em processamento"}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Relatorios;
