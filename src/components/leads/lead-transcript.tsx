import type { TranscriptLine } from "@/lib/types";

interface LeadTranscriptProps {
  transcript: TranscriptLine[];
}

export function LeadTranscript({ transcript }: LeadTranscriptProps) {
  return (
    <div className="border border-gray-200 rounded-xl p-6">
      <h2 className="mb-6 font-[family-name:var(--font-display)] text-xl tracking-wider text-gray-900">
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
                  ? "bg-gray-50"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-wider text-gray-500">
                  {isAI ? "AI Agent" : "Customer"}
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-gray-400">
                  {line.timestamp}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-900">
                {line.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
