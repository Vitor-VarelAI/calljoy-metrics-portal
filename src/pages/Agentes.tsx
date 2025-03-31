
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const Agentes = () => {
  // Mock data for agents
  const agents = [
    { id: "1", name: "João Silva", team: "Equipa Norte", calls: 218, sentiment: 76 },
    { id: "2", name: "Maria Oliveira", team: "Equipa Sul", calls: 186, sentiment: 82 },
    { id: "3", name: "António Santos", team: "Equipa Norte", calls: 203, sentiment: 68 },
    { id: "4", name: "Sofia Pereira", team: "Equipa Sul", calls: 175, sentiment: 79 },
  ];

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">👤 Agentes</h1>
        <p className="text-muted-foreground">Lista de agentes de call center e seus desempenhos</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Agentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Equipa</TableHead>
                  <TableHead>Chamadas</TableHead>
                  <TableHead>Sentimento</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell className="font-medium">{agent.name}</TableCell>
                    <TableCell>{agent.team}</TableCell>
                    <TableCell>{agent.calls}</TableCell>
                    <TableCell>{agent.sentiment}%</TableCell>
                    <TableCell className="text-right">
                      <Link to={`/agente/${agent.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" /> Ver Perfil
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
    </div>
  );
};

export default Agentes;
