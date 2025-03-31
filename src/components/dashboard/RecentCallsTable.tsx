
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Smile, AlertTriangle } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { RecentCall } from "./DashboardTypes";

interface RecentCallsTableProps {
  calls: RecentCall[];
}

const RecentCallsTable: React.FC<RecentCallsTableProps> = ({ calls }) => {
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

  return (
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
              {calls.map((chamada) => (
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
  );
};

export default RecentCallsTable;
