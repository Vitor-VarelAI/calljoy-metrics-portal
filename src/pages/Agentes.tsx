
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Agentes = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Agentes</h1>
        <p className="text-muted-foreground">Gerenciamento de agentes e desempenho</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Lista de Agentes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Esta página exibirá a lista de agentes e seus indicadores de desempenho.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Agentes;
