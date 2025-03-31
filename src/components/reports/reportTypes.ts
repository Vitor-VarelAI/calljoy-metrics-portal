
import { ReactNode } from "react";

export type Report = {
  id: string;
  title: string;
  date: Date;
  type: "Individual" | "Resumo por agente" | "Global";
  status: "Gerado" | "Em processamento";
  agent?: string;
};

export type ReportViewProps = {
  reports: Report[];
  selectedReports: string[];
  toggleReportSelection: (reportId: string) => void;
  toggleSelectAll: () => void;
  handleViewReport: (reportId: string) => void;
  handleDownloadPDF: (reportId: string) => void;
  handleExportReport: (reportId: string) => void;
  formatDate: (date: Date) => string;
  renderStatusBadge: (status: string) => ReactNode;
};
