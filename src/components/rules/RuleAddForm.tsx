
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { RuleCategory, RuleType } from "@/types/RuleTypes";

interface NewRuleFormData {
  description: string;
  category: RuleCategory;
  type: RuleType;
}

interface RuleAddFormProps {
  newRule: NewRuleFormData;
  formError: string | null;
  isSubmitting: boolean;
  onUpdateNewRule: (rule: NewRuleFormData) => void;
  onAddRule: () => void;
}

const RuleAddForm: React.FC<RuleAddFormProps> = ({
  newRule,
  formError,
  isSubmitting,
  onUpdateNewRule,
  onAddRule
}) => {
  return (
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
              onChange={e => {
                onUpdateNewRule({...newRule, description: e.target.value});
              }}
              className={formError ? "border-destructive" : ""}
            />
            {formError && <p className="text-destructive text-sm mt-1">{formError}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Categoria</Label>
              <Select 
                value={newRule.category} 
                onValueChange={value => onUpdateNewRule({...newRule, category: value as RuleCategory})}
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
                onValueChange={value => onUpdateNewRule({...newRule, type: value as RuleType})}
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
        <Button 
          onClick={onAddRule} 
          className="ml-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Processando...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar Regra
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RuleAddForm;
