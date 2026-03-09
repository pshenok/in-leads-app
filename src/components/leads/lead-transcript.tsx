import type { TranscriptLine } from "@/lib/types";

interface LeadTranscriptProps {
  transcript: TranscriptLine[];
}

export function LeadTranscript({ transcript }: LeadTranscriptProps) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm p-6">
      <h2 className="mb-6 font-[family-name:var(--font-display)] text-xl tracking-wider text-foreground">
        CALL TRANSCRIPT
      </h2>
      <div className="space-y-3">
        {transcript.map((line, i) => {
          const isAI = line.speaker === "ai";
          return (
            <div
              key={i}
              className={`rounded-lg p-3 ${
                isAI
                  ? "border-l-2 border-primary bg-orange-50"
                  : "border-l-2 border-gray-300 bg-muted"
              }`}
            >
              <div className="mb-1 flex items-center justify-between">
                <span
                  className="font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-wider text-muted-foreground"
                >
                  {isAI ? "AI Agent" : "Customer"}
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-muted-foreground">
                  {line.timestamp}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground">
                {line.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
