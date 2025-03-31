
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface Call {
  id: string;
  date: string;
  duration: string;
  sentiment: string;
  script: boolean;
}

interface AgentRecentCallsProps {
  calls: Call[];
}

const AgentRecentCalls: React.FC<AgentRecentCallsProps> = ({ calls }) => {
  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case "positivo":
        return <Badge className="bg-[hsl(160,70%,45%)]">Positivo</Badge>;
      case "neutro":
        return <Badge className="bg-[hsl(220,10%,60%)]">Neutro</Badge>;
      case "negativo":
        return <Badge className="bg-[hsl(0,70%,50%)] hover:bg-[hsl(0,70%,45%)]">Negativo</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">🎧 Chamadas Recentes</h2>
          <Link to="/chamadas">
            <Button variant="outline" size="sm">Ver todas</Button>
          </Link>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Duração</TableHead>
                <TableHead>Sentimento</TableHead>
                <TableHead>Script</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calls.map((call) => (
                <TableRow key={call.id}>
                  <TableCell>{call.date}</TableCell>
                  <TableCell>{call.duration}</TableCell>
                  <TableCell>{getSentimentBadge(call.sentiment)}</TableCell>
                  <TableCell>
                    {call.script ? (
                      <span className="text-[hsl(160,70%,45%)]">✅</span>
                    ) : (
                      <span className="text-[hsl(0,70%,50%)]">❌</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link to={`/chamada/${call.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" /> Ver
                      </Button>
                    </Link>
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

export default AgentRecentCalls;
