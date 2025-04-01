
import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  FileUp, 
  Flag, 
  Play, 
  Pause, 
  Rewind, 
  FastForward 
} from "lucide-react";

const ChamadaDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const [isPlaying, setIsPlaying] = React.useState(false);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center">
          📞 Chamada #{id}
        </h1>
        <p className="text-sm text-muted-foreground">João Silva • 28/03/2025 • 06:32 min</p>
      </div>
      
      <Separator />
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Audio Player */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              🎧 Leitor de Áudio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border p-4 space-y-4">
              <AudioPlayer 
                src={`/uploads/call-${id}.mp3`}
                markers={[
                  { type: 'critical', timestamp: 85, description: 'Threatening language detected' },
                  { type: 'violation', timestamp: 145, description: 'Script compliance violation' },
                  { type: 'positive', timestamp: 192, description: 'Excellent customer service' },
                ]}
              />e="h-4 w-4" />
                </Button>
              </div>
              <div className="text-center text-muted-foreground text-sm">
                02:17 / 06:32
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              🤖 Resumo da Chamada
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <p>
              O cliente mostrou-se insatisfeito com a demora na entrega do produto. O agente explicou os motivos do atraso e ofereceu um desconto de 10% na próxima compra como compensação. O cliente aceitou a solução e concordou em manter o pedido.
            </p>
            <p className="mt-4">
              O agente manteve uma postura profissional durante toda a conversa, mesmo quando o cliente expressou frustração. A resolução foi positiva, apesar da insatisfação inicial.
            </p>
          </CardContent>
        </Card>

        {/* Sentiment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              😊 Sentimento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-lg font-medium text-corporate-positive">Positivo</div>
              <div className="w-2/3 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div className="flex h-full">
                  <div className="bg-corporate-positive w-[60%]"></div>
                  <div className="bg-gray-400 w-[30%]"></div>
                  <div className="bg-corporate-critical w-[10%]"></div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Análise de sentimento da chamada realizada com base no tom de voz, palavras-chave e interações.
            </div>
          </CardContent>
        </Card>

        {/* Script Verification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              📋 Verificação de Script
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center text-corporate-positive">
                <span className="mr-2">✔️</span> Saudação inicial feita
              </li>
              <li className="flex items-center text-corporate-critical">
                <span className="mr-2">❌</span> Política de devolução não explicada
              </li>
              <li className="flex items-center text-corporate-positive">
                <span className="mr-2">✔️</span> Confirmação do pedido efetuada
              </li>
              <li className="flex items-center text-corporate-positive">
                <span className="mr-2">✔️</span> Ofereceu produtos adicionais
              </li>
              <li className="flex items-center text-corporate-positive">
                <span className="mr-2">✔️</span> Despedida adequada
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              ❗ Alertas Detetados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="bg-corporate-critical/10 text-corporate-critical px-2 py-1 rounded text-xs font-medium mr-2">00:38</span>
                <span>Palavra crítica: "cancelamento"</span>
              </li>
              <li className="flex items-start">
                <span className="bg-corporate-critical/10 text-corporate-critical px-2 py-1 rounded text-xs font-medium mr-2">03:12</span>
                <span>Tom agressivo detetado</span>
              </li>
              <li className="flex items-start">
                <span className="bg-corporate-critical/10 text-corporate-critical px-2 py-1 rounded text-xs font-medium mr-2">04:45</span>
                <span>Interrupção frequente</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              💡 Sugestões para o Agente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Usar frases mais empáticas ao lidar com reclamações</li>
              <li>Evitar termos vagos como "vou tentar"</li>
              <li>Confirmar política de devoluções claramente</li>
              <li>Oferecer alternativas antes de mencionar reembolsos</li>
              <li>Aguardar o cliente concluir suas frases sem interrupções</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex justify-end space-x-2">
        <Button variant="outline" className="flex items-center">
          <FileText className="w-4 h-4 mr-2" />
          Ver HTML
        </Button>
        <Button variant="outline" className="flex items-center">
          <FileUp className="w-4 h-4 mr-2" />
          Exportar PDF
        </Button>
        <Button variant="default" className="flex items-center">
          <Flag className="w-4 h-4 mr-2" />
          Marcar para Revisão
        </Button>
      </div>
    </div>
  );
};

export default ChamadaDetalhes;
