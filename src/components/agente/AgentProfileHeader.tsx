
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface AgentProfileHeaderProps {
  name: string;
  since: string;
  team: string;
  avatar: string;
  onGenerateReport: () => void;
}

const AgentProfileHeader: React.FC<AgentProfileHeaderProps> = ({
  name,
  since,
  team,
  avatar,
  onGenerateReport,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="text-muted-foreground">
            Agente desde {since} • {team}
          </p>
        </div>
      </div>
      <Button onClick={onGenerateReport} className="bg-primary hover:bg-primary/90">
        <FileText className="mr-2 h-4 w-4" /> Gerar relatório PDF
      </Button>
    </div>
  );
};

export default AgentProfileHeader;
