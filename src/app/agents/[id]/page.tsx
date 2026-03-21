"use client";

import { use } from "react";
import { AgentWizard } from "@/components/agents/agent-wizard";

export default function EditAgentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <AgentWizard agentId={id} />;
}
