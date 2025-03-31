
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  CheckCircle, 
  AlertTriangle, 
  Edit, 
  Trash2, 
  Download, 
  Upload, 
  PlusCircle, 
  FileText,
  Check
} from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

// Tipos para as regras
type RuleType = "Obrigatória" | "Recomendada";
type RuleCategory = "Saudação" | "Identificação" | "Atendimento" | "Pagamentos" | "Encerramento" | "Outros";

interface Rule {
  id: string;
  description: string;
  category: RuleCategory;
  type: RuleType;
}

const RegrasCallCenter = () => {
  // Estado para as regras existentes
  const [rules, setRules] = useState<Rule[]>([
    {
      id: "1",
      description: "Apresentar nome e empresa no início da chamada",
      category: "Saudação",
      type: "Obrigatória"
    },
    {
      id: "2",
      description: "Perguntar se o cliente tem mais alguma dúvida antes de encerrar",
      category: "Encerramento",
      type: "Recomendada"
    },
    {
      id: "3",
      description: "Confirmar dados pessoais do cliente antes de falar sobre pagamentos",
      category: "Pagamentos",
      type: "Obrigatória"
    }
  ]);

  // Estado para nova regra
  const [newRule, setNewRule] = useState<Omit<Rule, "id">>({
    description: "",
    category: "Saudação",
    type: "Obrigatória"
  });

  // Estado para regra em edição
  const [editingRule, setEditingRule] = useState<Rule | null>(null);

  // Adicionar nova regra
  const handleAddRule = () => {
    if (!newRule.description.trim()) {
      toast.error("A descrição da regra é obrigatória");
      return;
    }

    const rule: Rule = {
      ...newRule,
      id: Date.now().toString()
    };

    setRules([...rules, rule]);
    setNewRule({
      description: "",
      category: "Saudação",
      type: "Obrigatória"
    });
    
    toast.success("Regra adicionada com sucesso");
  };

  // Iniciar edição de regra
  const startEditRule = (rule: Rule) => {
    setEditingRule(rule);
  };

  // Salvar edição de regra
  const saveEditRule = () => {
    if (editingRule) {
      setRules(rules.map(rule => rule.id === editingRule.id ? editingRule : rule));
      setEditingRule(null);
      toast.success("Regra atualizada com sucesso");
    }
  };

  // Deletar regra
  const deleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
    toast.success("Regra removida com sucesso");
  };

  // Exportar regras para JSON
  const exportRules = () => {
    const dataStr = JSON.stringify(rules, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `regras_callcenter_${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success("Regras exportadas com sucesso");
  };

  // Importar regras de JSON
  const importRules = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const file = event.target.files?.[0];
    
    if (!file) return;

    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = e => {
      try {
        const content = e.target?.result as string;
        const importedRules = JSON.parse(content) as Rule[];
        
        if (!Array.isArray(importedRules)) {
          throw new Error("Formato de arquivo inválido");
        }
        
        setRules(importedRules);
        toast.success("Regras importadas com sucesso");
      } catch (error) {
        toast.error("Erro ao importar regras. Verifique o formato do arquivo.");
      }
    };
    
    // Reset the file input
    event.target.value = '';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileText className="h-8 w-8" />
          Regras do Call Center
        </h1>
        <p className="text-muted-foreground">Personaliza as regras que os agentes devem seguir nas chamadas</p>
      </div>

      {/* Lista de Regras */}
      <Card>
        <CardHeader>
          <CardTitle>Regras Atuais</CardTitle>
          <CardDescription>Lista de regras de compliance para os agentes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map(rule => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">
                    {rule.type === "Obrigatória" ? (
                      <CheckCircle className="inline mr-2 h-4 w-4 text-primary" />
                    ) : (
                      <AlertTriangle className="inline mr-2 h-4 w-4 text-yellow-500" />
                    )}
                    {rule.description}
                  </TableCell>
                  <TableCell>{rule.category}</TableCell>
                  <TableCell>{rule.type}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => startEditRule(rule)}
                      className="mr-1"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => deleteRule(rule.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de Edição */}
      {editingRule && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Editar Regra</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="edit-description">Descrição</Label>
              <Textarea
                id="edit-description"
                value={editingRule.description}
                onChange={e => setEditingRule({...editingRule, description: e.target.value})}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-category">Categoria</Label>
                <Select 
                  value={editingRule.category} 
                  onValueChange={value => setEditingRule({...editingRule, category: value as RuleCategory})}
                >
                  <SelectTrigger id="edit-category">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Saudação">Saudação</SelectItem>
                    <SelectItem value="Identificação">Identificação</SelectItem>
                    <SelectItem value="Atendimento">Atendimento</SelectItem>
                    <SelectItem value="Pagamentos">Pagamentos</SelectItem>
                    <SelectItem value="Encerramento">Encerramento</SelectItem>
                    <SelectItem value="Outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-type">Tipo</Label>
                <Select 
                  value={editingRule.type} 
                  onValueChange={value => setEditingRule({...editingRule, type: value as RuleType})}
                >
                  <SelectTrigger id="edit-type">
                    <SelectValue placeholder="Selecione um tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Obrigatória">Obrigatória</SelectItem>
                    <SelectItem value="Recomendada">Recomendada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditingRule(null)}>
              Cancelar
            </Button>
            <Button onClick={saveEditRule}>
              <Check className="mr-2 h-4 w-4" />
              Salvar Alterações
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Adicionar Nova Regra */}
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Nova Regra</CardTitle>
          <CardDescription>Crie uma nova regra para o call center</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="description">Descrição da Regra</Label>
              <Textarea
                id="description"
                placeholder="Ex: Apresentar nome e empresa no início da chamada"
                value={newRule.description}
                onChange={e => setNewRule({...newRule, description: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select 
                  value={newRule.category} 
                  onValueChange={value => setNewRule({...newRule, category: value as RuleCategory})}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Saudação">Saudação</SelectItem>
                    <SelectItem value="Identificação">Identificação</SelectItem>
                    <SelectItem value="Atendimento">Atendimento</SelectItem>
                    <SelectItem value="Pagamentos">Pagamentos</SelectItem>
                    <SelectItem value="Encerramento">Encerramento</SelectItem>
                    <SelectItem value="Outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="type">Tipo</Label>
                <Select 
                  value={newRule.type} 
                  onValueChange={value => setNewRule({...newRule, type: value as RuleType})}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Selecione um tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Obrigatória">Obrigatória</SelectItem>
                    <SelectItem value="Recomendada">Recomendada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddRule} className="ml-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Regra
          </Button>
        </CardFooter>
      </Card>

      {/* Exportar/Importar */}
      <Card>
        <CardHeader>
          <CardTitle>Exportar / Importar Regras</CardTitle>
          <CardDescription>Salve suas regras ou importe de um arquivo JSON</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <Button onClick={exportRules} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar Regras (JSON)
            </Button>
            <div>
              <Label htmlFor="importFile" className="sr-only">Importar Regras</Label>
              <Input
                id="importFile"
                type="file"
                accept=".json"
                onChange={importRules}
                className="hidden"
              />
              <Button 
                variant="outline" 
                onClick={() => document.getElementById('importFile')?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Importar Regras (JSON)
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegrasCallCenter;
