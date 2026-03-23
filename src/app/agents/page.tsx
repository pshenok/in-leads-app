"use client";

import { AiScriptSection } from "@/components/settings/ai-script-section";

export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wider text-foreground">
          AI AGENTS
        </h1>
        <p className="mt-1 text-muted-foreground">
          Create and manage AI voice agents that call your leads
        </p>
      </div>

      <AiScriptSection />
    </div>
  );
}
