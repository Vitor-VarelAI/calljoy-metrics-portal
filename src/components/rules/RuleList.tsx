
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { CheckCircle, AlertTriangle, Edit, Trash2 } from "lucide-react";
import { Rule } from "@/types/RuleTypes";
import { toast } from "sonner";

interface RuleListProps {
  rules: Rule[];
  onEditRule: (rule: Rule) => void;
  onDeleteRule: (id: string) => void;
}

const RuleList: React.FC<RuleListProps> = ({ rules, onEditRule, onDeleteRule }) => {
  // Sort rules: Obrigatórias first, then Recomendadas
  const sortedRules = [...rules].sort((a, b) => {
    if (a.type === "Obrigatória" && b.type === "Recomendada") return -1;
    if (a.type === "Recomendada" && b.type === "Obrigatória") return 1;
    return 0;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Regras Atuais</CardTitle>
        <CardDescription>Lista de regras de compliance para os agentes</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border">
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedRules.map(rule => (
              <TableRow key={rule.id} className="border-b border-slate-100 hover:bg-muted/30">
                <TableCell className="font-medium">
                  {rule.type === "Obrigatória" ? (
                    <CheckCircle className="inline mr-2 h-4 w-4 text-primary" />
                  ) : (
                    <AlertTriangle className="inline mr-2 h-4 w-4 text-yellow-500" />
                  )}
                  {rule.description}
                </TableCell>
                <TableCell>{rule.category}</TableCell>
                <TableCell>
                  {rule.type === "Obrigatória" ? (
                    <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                      Obrigatória
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      Recomendada
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => onEditRule(rule)}
                          className="mr-1"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Editar Regra</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => onDeleteRule(rule.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Eliminar Regra</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RuleList;
