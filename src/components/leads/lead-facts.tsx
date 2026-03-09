import { AlertTriangle, DollarSign, BarChart3, Home } from "lucide-react";
import type { Lead } from "@/lib/types";

const urgencyColors: Record<string, string> = {
  HIGH: "text-red-400",
  MEDIUM: "text-amber-400",
  LOW: "text-gray-400",
};

interface LeadFactsProps {
  lead: Lead;
}

export function LeadFacts({ lead }: LeadFactsProps) {
  return (
    <div className="space-y-4">
      {/* Facts grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Urgency */}
        <div className="rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Urgency
            </span>
          </div>
          <p
            className={`mt-2 font-[family-name:var(--font-mono)] text-lg font-medium ${urgencyColors[lead.facts.urgency] ?? "text-foreground"}`}
          >
            {lead.facts.urgency}
          </p>
        </div>

        {/* Budget */}
        <div className="rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Budget
            </span>
          </div>
          <p className="mt-2 font-[family-name:var(--font-mono)] text-lg font-medium text-foreground">
            {lead.facts.budget}
          </p>
        </div>

        {/* Competing Quotes */}
        <div className="rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <BarChart3 className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Competing Quotes
            </span>
          </div>
          <p className="mt-2 font-[family-name:var(--font-mono)] text-lg font-medium text-foreground">
            {lead.facts.competingQuotes}
          </p>
        </div>

        {/* Property Type */}
        <div className="rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Home className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Property Type
            </span>
          </div>
          <p className="mt-2 text-lg font-medium text-foreground">
            {lead.facts.propertyType}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Description
        </span>
        <blockquote className="mt-2 border-l-2 border-primary/40 pl-4 text-sm leading-relaxed text-foreground/80 italic">
          {lead.description}
        </blockquote>
      </div>
    </div>
  );
}
