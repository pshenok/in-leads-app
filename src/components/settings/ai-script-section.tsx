"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const defaultGreeting =
  "Hi! This is the automated assistant for Mike's Plumbing & Home Services. I'm calling about the service request you submitted. Do you have a moment to answer a few quick questions?";

const defaultQuestions = `1. Can you describe the issue you're experiencing?
2. How urgent is this — is it an emergency?
3. Do you have a budget range in mind?
4. Have you received quotes from other companies?
5. What's the best time for us to come take a look?`;

export function AiScriptSection() {
  const [greeting, setGreeting] = useState(defaultGreeting);
  const [questions, setQuestions] = useState(defaultQuestions);
  const [tone, setTone] = useState("professional");

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-foreground">AI Voice Script</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Configure what your AI agent says during lead calls
      </p>

      <div className="mt-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="greeting" className="text-sm text-muted-foreground">
            Greeting Message
          </Label>
          <Textarea
            id="greeting"
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="questions" className="text-sm text-muted-foreground">
            Key Questions
          </Label>
          <Textarea
            id="questions"
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
            rows={7}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tone" className="text-sm text-muted-foreground">
            Tone
          </Label>
          <Select value={tone} onValueChange={(v) => { if (v !== null) setTone(v); }}>
            <SelectTrigger id="tone" className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
              <SelectItem value="direct">Direct</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-8">
        <Button onClick={() => alert("Script saved!")}>Save Script</Button>
      </div>
    </div>
  );
}
