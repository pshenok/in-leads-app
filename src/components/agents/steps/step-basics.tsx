"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface StepBasicsProps {
  name: string;
  firstMessage: string;
  onChange: (field: "name" | "firstMessage", value: string) => void;
}

export function StepBasics({ name, firstMessage, onChange }: StepBasicsProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-wider text-foreground">
          NAME YOUR AGENT
        </h2>
        <p className="mt-2 text-muted-foreground">
          Give your AI voice agent a name and a greeting
        </p>
      </div>

      <div className="mx-auto max-w-md space-y-6">
        {/* Agent Name */}
        <div className="space-y-2">
          <Label htmlFor="agent-name">Agent Name</Label>
          <Input
            id="agent-name"
            value={name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="e.g. Sales Assistant"
          />
          {name.length > 0 && name.trim().length < 2 && (
            <p className="text-xs text-red-500">Name must be at least 2 characters</p>
          )}
        </div>

        {/* First Message */}
        <div className="space-y-2">
          <Label htmlFor="first-message">First Message</Label>
          <p className="text-xs text-muted-foreground">
            What your agent says when they call a lead
          </p>
          <Textarea
            id="first-message"
            rows={3}
            value={firstMessage}
            onChange={(e) => onChange("firstMessage", e.target.value)}
            placeholder="Hi! This is Sarah from Acme Corp. I'm calling about your recent inquiry..."
          />
          <div className="flex items-center justify-between">
            {firstMessage.length > 0 && firstMessage.trim().length < 10 && (
              <p className="text-xs text-red-500">Must be at least 10 characters</p>
            )}
            <p className="ml-auto text-xs text-muted-foreground">
              {firstMessage.length} / 500
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
