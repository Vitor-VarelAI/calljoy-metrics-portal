
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Eye, FileText } from "lucide-react";
import { ReportViewProps } from "./reportTypes";

const ReportGridView: React.FC<ReportViewProps> = ({
  reports,
  selectedReports,
  toggleReportSelection,
  handleViewReport,
  handleDownloadPDF,
  handleExportReport,
  formatDate,
  renderStatusBadge,
}) => {
  return (
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
  );
};

export default ReportGridView;
