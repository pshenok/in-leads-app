"use client";

import { Check, Sparkles } from "lucide-react";

const features = [
  "Unlimited AI calls",
  "All platforms supported",
  "Advanced lead scoring",
  "Full call transcripts",
  "Pipeline management",
];

export function PlanSection() {
  return (
    <div className="space-y-6">
      {/* Current plan card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Early Access</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              You&apos;re on the early access plan — all features included
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
            <Sparkles className="h-3.5 w-3.5" />
            Free
          </span>
        </div>

        <ul className="mt-6 space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-sm">
              <Check className="h-4 w-4 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Billing info */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="font-semibold text-foreground">Billing</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Paid plans with usage-based billing will be available soon.
          During early access, all features are free.
        </p>
      </div>
    </div>
  );
}
