
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Eye, FileText } from "lucide-react";
import { ReportViewProps } from "./reportTypes";

const ReportListView: React.FC<ReportViewProps> = ({
  reports,
  selectedReports,
  toggleReportSelection,
  toggleSelectAll,
  handleViewReport,
  handleDownloadPDF,
  handleExportReport,
  formatDate,
  renderStatusBadge,
}) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox 
                  checked={selectedReports.length === reports.length && reports.length > 0}
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
  );
};

export default ReportListView;
