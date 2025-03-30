
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Headphones, Calendar, User, Clock } from "lucide-react";

const callsData = [
  {
    id: "CALL-9582",
    agent: "João Silva",
    date: "28/03/2025",
    duration: "06:32",
    sentiment: "positive"
  },
  {
    id: "CALL-9581",
    agent: "Maria Oliveira",
    date: "28/03/2025",
    duration: "04:18",
    sentiment: "neutral"
  },
  {
    id: "CALL-9580",
    agent: "Pedro Santos",
    date: "27/03/2025",
    duration: "08:45",
    sentiment: "negative"
  },
  {
    id: "CALL-9579",
    agent: "Ana Pereira",
    date: "27/03/2025",
    duration: "03:22",
    sentiment: "positive"
  },
  {
    id: "CALL-9578",
    agent: "Carlos Ferreira",
    date: "26/03/2025",
    duration: "05:47",
    sentiment: "neutral"
  }
];

const getSentimentEmoji = (sentiment: string) => {
  switch (sentiment) {
    case "positive":
      return "😊";
    case "neutral":
      return "😐";
    case "negative":
      return "😠";
    default:
      return "❓";
  }
};

const Chamadas = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Chamadas</h1>
        <p className="text-muted-foreground">Análise detalhada de todas as chamadas</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {callsData.map((call) => (
          <Link to={`/chamada/${call.id}`} key={call.id}>
            <Card className="hover:border-primary transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Headphones className="w-5 h-5 mr-2 text-primary" />
                  {call.id}
                  <span className="ml-auto">{getSentimentEmoji(call.sentiment)}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <User className="w-4 h-4 mr-2" />
                    <span>{call.agent}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{call.date}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{call.duration} min</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Chamadas;
