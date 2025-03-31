
import React from "react";
import { useParams } from "react-router-dom";
import { getAgentData } from "@/services/agenteService";
import AgentProfileHeader from "@/components/agente/AgentProfileHeader";
import AgentKPIGrid from "@/components/agente/AgentKPIGrid";
import AgentPerformanceChart from "@/components/agente/AgentPerformanceChart";
import AgentRecentCalls from "@/components/agente/AgentRecentCalls";
import AgentRecommendations from "@/components/agente/AgentRecommendations";

const AgenteDetalhe = () => {
  const { id } = useParams();
  
  // Get agent data from service
  const agentData = getAgentData(id || "1");

  const generateReport = () => {
    console.log("Generating PDF report for agent", id);
    // In a real app, this would call a PDF generation service
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* Profile Header */}
      <AgentProfileHeader 
        name={agentData.name}
        since={agentData.since}
        team={agentData.team}
        avatar={agentData.avatar}
        onGenerateReport={generateReport}
      />

      {/* KPIs */}
      <AgentKPIGrid kpis={agentData.kpis} />

      {/* Chart */}
      <AgentPerformanceChart chartData={agentData.chartData} />

      {/* Recent Calls */}
      <AgentRecentCalls calls={agentData.recentCalls} />

      {/* Recommendations */}
      <AgentRecommendations recommendations={agentData.recommendations} />
    </div>
  );
};

export default AgenteDetalhe;
