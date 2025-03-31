
import React from "react";
import { Badge } from "@/components/ui/badge";

export const ReportStatusBadge = ({ status }: { status: string }) => {
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
