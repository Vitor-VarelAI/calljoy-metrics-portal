
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check } from "lucide-react";
import { Rule, RuleCategory, RuleType } from "@/types/RuleTypes";

interface RuleEditFormProps {
  editingRule: Rule;
  onUpdateRule: (rule: Rule) => void;
  onCancelEdit: () => void;
}

const RuleEditForm: React.FC<RuleEditFormProps> = ({ 
  editingRule, 
  onUpdateRule,
  onCancelEdit
}) => {
  return (
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
            onChange={e => onUpdateRule({...editingRule, description: e.target.value})}
            className="mt-1"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="edit-category">Categoria</Label>
            <Select 
              value={editingRule.category} 
              onValueChange={value => onUpdateRule({...editingRule, category: value as RuleCategory})}
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
              onValueChange={value => onUpdateRule({...editingRule, type: value as RuleType})}
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
        <Button variant="outline" onClick={onCancelEdit}>
          Cancelar
        </Button>
        <Button onClick={() => onUpdateRule(editingRule)}>
          <Check className="mr-2 h-4 w-4" />
          Salvar Alterações
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RuleEditForm;
