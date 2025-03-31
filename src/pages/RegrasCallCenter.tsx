
import React, { useState } from "react";
import { FileText } from "lucide-react";
import { toast } from "sonner";
import { Rule, RuleCategory, RuleType } from "@/types/RuleTypes";
import RuleList from "@/components/rules/RuleList";
import RuleEditForm from "@/components/rules/RuleEditForm";
import RuleAddForm from "@/components/rules/RuleAddForm";
import RuleExportImport from "@/components/rules/RuleExportImport";

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

  // Estado para validação do formulário
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado para regra em edição
  const [editingRule, setEditingRule] = useState<Rule | null>(null);

  // Adicionar nova regra
  const handleAddRule = () => {
    // Validação do formulário
    if (!newRule.description.trim()) {
      setFormError("A descrição da regra é obrigatória");
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    // Simulando um pequeno delay para mostrar o estado de loading
    setTimeout(() => {
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
      setIsSubmitting(false);
    }, 300);
  };

  // Iniciar edição de regra
  const startEditRule = (rule: Rule) => {
    setEditingRule(rule);
  };

  // Atualizar regra em edição
  const updateEditingRule = (rule: Rule) => {
    setEditingRule(rule);
  };

  // Salvar edição de regra
  const saveEditRule = () => {
    if (editingRule) {
      if (!editingRule.description.trim()) {
        toast.error("A descrição da regra é obrigatória");
        return;
      }

      setRules(rules.map(rule => rule.id === editingRule.id ? editingRule : rule));
      setEditingRule(null);
      toast.success("Regra atualizada com sucesso");
    }
  };

  // Cancelar edição
  const cancelEditRule = () => {
    setEditingRule(null);
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
        <p className="text-sm text-muted-foreground mt-1">
          Estas regras são verificadas automaticamente nas chamadas analisadas pela IA.
        </p>
      </div>

      {/* Lista de Regras */}
      <RuleList 
        rules={rules} 
        onEditRule={startEditRule} 
        onDeleteRule={deleteRule} 
      />

      {/* Formulário de Edição */}
      {editingRule && (
        <RuleEditForm 
          editingRule={editingRule} 
          onUpdateRule={updateEditingRule}
          onCancelEdit={cancelEditRule} 
        />
      )}

      {/* Adicionar Nova Regra */}
      <RuleAddForm 
        newRule={newRule}
        formError={formError}
        isSubmitting={isSubmitting}
        onUpdateNewRule={setNewRule}
        onAddRule={handleAddRule}
      />

      {/* Exportar/Importar */}
      <RuleExportImport 
        rules={rules}
        onImportRules={importRules}
        onExportRules={exportRules}
      />
    </div>
  );
};

export default RegrasCallCenter;
