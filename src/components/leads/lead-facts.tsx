import { AlertTriangle, DollarSign, BarChart3, Home } from "lucide-react";
import type { Lead } from "@/lib/types";

const urgencyColors: Record<string, string> = {
  HIGH: "text-red-600",
  MEDIUM: "text-amber-600",
  LOW: "text-gray-500",
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
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-gray-500">
            <AlertTriangle className="h-4 w-4 text-gray-400" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Urgency
            </span>
          </div>
          <p
            className={`mt-2 font-[family-name:var(--font-mono)] text-lg font-semibold ${urgencyColors[lead.urgency] ?? "text-gray-900"}`}
          >
            {lead.urgency}
          </p>
        </div>

        {/* Budget */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-gray-500">
            <DollarSign className="h-4 w-4 text-gray-400" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Budget
            </span>
          </div>
          <p className="mt-2 font-[family-name:var(--font-mono)] text-lg font-semibold text-gray-900">
            {lead.budget}
          </p>
        </div>

        {/* Competing Quotes */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-gray-500">
            <BarChart3 className="h-4 w-4 text-gray-400" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Competing Quotes
            </span>
          </div>
          <p className="mt-2 font-[family-name:var(--font-mono)] text-lg font-semibold text-gray-900">
            {lead.competingQuotes}
          </p>
        </div>

        {/* Property Type */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-gray-500">
            <Home className="h-4 w-4 text-gray-400" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Property Type
            </span>
          </div>
          <p className="mt-2 text-lg font-semibold text-gray-900">
            {lead.propertyType}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="bg-gray-50 rounded-lg p-4">
        <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
          Description
        </span>
        <blockquote className="mt-2 border-l-2 border-gray-300 pl-4 text-sm leading-relaxed text-gray-900 italic">
          {lead.description}
        </blockquote>
      </div>
    </div>
  );
}
