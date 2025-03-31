
export type RuleType = "Obrigatória" | "Recomendada";
export type RuleCategory = "Saudação" | "Identificação" | "Atendimento" | "Pagamentos" | "Encerramento" | "Outros";

export interface Rule {
  id: string;
  description: string;
  category: RuleCategory;
  type: RuleType;
}
