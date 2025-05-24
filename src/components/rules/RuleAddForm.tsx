
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, ArrowLeft } from "lucide-react";
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="p-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Nova Regra</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Definir Nova Regra</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Nome da Regra */}
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Regra</Label>
              <Input
                id="name"
                placeholder="Ex: Palavras proibidas"
                value={newRule.description}
                onChange={e => {
                  onUpdateNewRule({...newRule, description: e.target.value});
                }}
                className={formError ? "border-destructive" : ""}
              />
              {formError && <p className="text-destructive text-sm">{formError}</p>}
            </div>

            {/* Tipo de Regra */}
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Regra</Label>
              <Select 
                value={newRule.type} 
                onValueChange={value => onUpdateNewRule({...newRule, type: value as RuleType})}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Palavra-chave" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Obrigatória">Palavra-chave</SelectItem>
                  <SelectItem value="Recomendada">Comportamento</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Palavras-chave */}
            <div className="space-y-2">
              <Label htmlFor="keywords">Palavras-chave</Label>
              <Textarea
                id="keywords"
                placeholder="Digite as palavras-chave separadas por vírgula"
                className="min-h-[120px]"
              />
              <p className="text-sm text-muted-foreground">Ex: cancelar, reclamar, desistir</p>
            </div>

            {/* Categoria */}
            <div className="space-y-2">
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

            {/* Ações automáticas */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Ações automáticas</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <div className="font-medium">Criar alerta em tempo real</div>
                    <div className="text-sm text-muted-foreground">
                      Notificar supervisores quando esta regra for ativada
                    </div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div>
                    <div className="font-medium">Marcar chamada como crítica</div>
                    <div className="text-sm text-muted-foreground">
                      Chamadas com esta regra ativada serão marcadas como críticas
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>

            {/* Testar com chamada */}
            <div className="p-4 rounded-lg border-2 border-dashed border-muted-foreground/20">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-6 h-6 rounded bg-muted flex items-center justify-center">
                  <span className="text-xs">🎵</span>
                </div>
                <span>Testar com chamada</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            Cancelar
          </Button>
          <Button 
            onClick={onAddRule} 
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
                Guardar Regra
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RuleAddForm;
