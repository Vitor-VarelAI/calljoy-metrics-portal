
import React, { useState } from "react";
import { FileText } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { Report } from "@/components/reports/reportTypes";
import { ReportStatusBadge } from "@/components/reports/ReportStatusBadge";
import ReportFilters from "@/components/reports/ReportFilters";
import ReportListView from "@/components/reports/ReportListView";
import ReportGridView from "@/components/reports/ReportGridView";
import ReportHeader from "@/components/reports/ReportHeader";

const Relatorios = () => {
  const { toast } = useToast();
  
  // Estados para filtros
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedAgent, setSelectedAgent] = useState<string>("all");
  const [reportType, setReportType] = useState<string>("all");
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
    return <ReportStatusBadge status={status} />;
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

      {/* Componente de filtros */}
      <ReportFilters 
        startDate={startDate}
        endDate={endDate}
        selectedAgent={selectedAgent}
        reportType={reportType}
        searchQuery={searchQuery}
        agents={agents}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setSelectedAgent={setSelectedAgent}
        setReportType={setReportType}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      {/* Cabeçalho da lista de relatórios */}
      <ReportHeader 
        reportCount={reports.length}
        viewType={viewType}
        setViewType={setViewType}
        selectedReports={selectedReports}
        handleExportSelected={handleExportSelected}
      />

      {/* Visualização em lista ou grade */}
      {viewType === "list" ? (
        <ReportListView 
          reports={reports}
          selectedReports={selectedReports}
          toggleReportSelection={toggleReportSelection}
          toggleSelectAll={toggleSelectAll}
          handleViewReport={handleViewReport}
          handleDownloadPDF={handleDownloadPDF}
          handleExportReport={handleExportReport}
          formatDate={formatDate}
          renderStatusBadge={renderStatusBadge}
        />
      ) : (
        <ReportGridView 
          reports={reports}
          selectedReports={selectedReports}
          toggleReportSelection={toggleReportSelection}
          toggleSelectAll={toggleSelectAll}
          handleViewReport={handleViewReport}
          handleDownloadPDF={handleDownloadPDF}
          handleExportReport={handleExportReport}
          formatDate={formatDate}
          renderStatusBadge={renderStatusBadge}
        />
      )}
    </div>
  );
};

export default Relatorios;
