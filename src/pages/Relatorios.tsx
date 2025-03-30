
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Relatorios = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Relatórios</h1>
        <p className="text-muted-foreground">Análise e relatórios detalhados</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Relatórios Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Esta página exibirá os relatórios disponíveis e análises.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Relatorios;
