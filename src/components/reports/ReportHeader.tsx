
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Grid2X2, List, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReportHeaderProps {
  reportCount: number;
  viewType: "list" | "grid";
  setViewType: (type: "list" | "grid") => void;
  selectedReports: string[];
  handleExportSelected: () => void;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({
  reportCount,
  viewType,
  setViewType,
  selectedReports,
  handleExportSelected
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">Relatórios Disponíveis</h2>
        <Badge variant="outline">{reportCount}</Badge>
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
  );
};

export default ReportHeader;
