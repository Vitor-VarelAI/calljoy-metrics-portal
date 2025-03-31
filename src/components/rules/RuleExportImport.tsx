
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Download, Upload } from "lucide-react";
import { Rule } from "@/types/RuleTypes";

interface RuleExportImportProps {
  rules: Rule[];
  onImportRules: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onExportRules: () => void;
}

const RuleExportImport: React.FC<RuleExportImportProps> = ({
  rules,
  onImportRules,
  onExportRules
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Exportar / Importar Regras</CardTitle>
        <CardDescription>Salve suas regras ou importe de um arquivo JSON</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <Button onClick={onExportRules} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Regras (JSON)
          </Button>
          <div>
            <Label htmlFor="importFile" className="sr-only">Importar Regras</Label>
            <Input
              id="importFile"
              type="file"
              accept=".json"
              onChange={onImportRules}
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
  );
};

export default RuleExportImport;
