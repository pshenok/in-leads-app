import type { TranscriptLine } from "@/lib/types";

interface LeadTranscriptProps {
  transcript: TranscriptLine[];
}

export function LeadTranscript({ transcript }: LeadTranscriptProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5">
      <h2 className="mb-6 font-[family-name:var(--font-display)] text-xl tracking-wider">
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
                  ? "border-l-2 border-amber-500 bg-amber-500/5"
                  : "border-l-2 border-gray-500 bg-gray-500/5"
              }`}
            >
              <div className="mb-1 flex items-center justify-between">
                <span
                  className={`font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-wider ${
                    isAI ? "text-amber-400" : "text-gray-400"
                  }`}
                >
                  {isAI ? "AI Agent" : "Customer"}
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-muted-foreground/60">
                  {line.timestamp}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/90">
                {line.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
