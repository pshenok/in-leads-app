"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";

interface StepScriptProps {
  systemPrompt: string;
  agentName: string;
  firstMessage: string;
  onChange: (prompt: string) => void;
}

type Tone = "friendly" | "professional" | "casual" | "formal";

export function StepScript({
  systemPrompt,
  agentName,
  firstMessage,
  onChange,
}: StepScriptProps) {
  const [mode, setMode] = useState<"wizard" | "editor">(
    systemPrompt ? "editor" : "wizard"
  );
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [businessDescription, setBusinessDescription] = useState("");
  const [agentGoal, setAgentGoal] = useState("");
  const [tone, setTone] = useState<Tone>("friendly");
  const [infoToCollect, setInfoToCollect] = useState("");

  async function handleGenerate() {
    if (!businessDescription.trim() || !agentGoal.trim()) return;
    setGenerating(true);
    setError(null);
    try {
      const result = await api.agents.generatePrompt({
        businessDescription,
        agentGoal,
        tone,
        infoToCollect: infoToCollect || undefined,
        agentName,
        firstMessage,
      });
      onChange(result.prompt);
      setMode("editor");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate");
    } finally {
      setGenerating(false);
    }
  }

  if (mode === "editor") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-wider text-foreground">
            YOUR AGENT&apos;S SCRIPT
          </h2>
          <p className="mt-2 text-muted-foreground">
            Review and edit your agent&apos;s instructions
          </p>
        </div>

        <div className="mx-auto max-w-2xl space-y-4">
          <Textarea
            rows={14}
            value={systemPrompt}
            onChange={(e) => onChange(e.target.value)}
            className="font-mono text-sm"
          />
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleGenerate()}
              disabled={generating || !businessDescription.trim()}
            >
              {generating ? (
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              ) : (
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              )}
              Regenerate
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMode("wizard")}
            >
              Edit wizard answers
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Wizard mode
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-wider text-foreground">
          TELL US ABOUT YOUR AGENT
        </h2>
        <p className="mt-2 text-muted-foreground">
          Answer a few questions and we&apos;ll generate a script
        </p>
      </div>

      <div className="mx-auto max-w-lg space-y-5">
        {/* Business description */}
        <div className="space-y-2">
          <Label>What does your business do?</Label>
          <Textarea
            rows={2}
            value={businessDescription}
            onChange={(e) => setBusinessDescription(e.target.value)}
            placeholder="e.g. We're a plumbing company serving the Phoenix metro area"
          />
        </div>

        {/* Agent goal */}
        <div className="space-y-2">
          <Label>What should the agent do on calls?</Label>
          <Textarea
            rows={2}
            value={agentGoal}
            onChange={(e) => setAgentGoal(e.target.value)}
            placeholder="e.g. Qualify the lead, ask about their issue, and book an appointment"
          />
        </div>

        {/* Tone */}
        <div className="space-y-2">
          <Label>Conversation tone</Label>
          <div className="flex flex-wrap gap-2">
            {(["friendly", "professional", "casual", "formal"] as const).map(
              (t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    tone === t
                      ? "border-foreground bg-foreground text-white"
                      : "border-gray-200 text-muted-foreground hover:border-gray-300 hover:text-foreground"
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              )
            )}
          </div>
        </div>

        {/* Info to collect */}
        <div className="space-y-2">
          <Label>
            Key information to collect{" "}
            <span className="text-muted-foreground font-normal">(optional)</span>
          </Label>
          <Textarea
            rows={2}
            value={infoToCollect}
            onChange={(e) => setInfoToCollect(e.target.value)}
            placeholder="e.g. Address, type of issue, urgency, preferred time for appointment"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {/* Generate button */}
        <Button
          onClick={handleGenerate}
          disabled={generating || !businessDescription.trim() || !agentGoal.trim()}
          className="w-full"
          size="lg"
        >
          {generating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          {generating ? "Generating..." : "Generate Script"}
        </Button>

        {/* Or write manually */}
        {systemPrompt === "" && (
          <p className="text-center text-xs text-muted-foreground">
            Or{" "}
            <button
              onClick={() => setMode("editor")}
              className="underline hover:text-foreground"
            >
              write a script manually
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
