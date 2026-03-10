"use client";

import { Button } from "@/components/ui/button";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";
import { Check } from "lucide-react";

const features = [
  "Up to 200 AI calls/month",
  "All platforms supported",
  "Advanced lead scoring",
  "Full call transcripts",
  "Priority support",
];

export function PlanSection() {
  return (
    <div className="space-y-6">
      {/* Current plan card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Growth Plan</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your current subscription
            </p>
          </div>
          <span className="text-3xl font-bold text-gray-900">$99/mo</span>
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

      {/* Usage card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="font-semibold text-foreground">Monthly Usage</h3>
        <div className="mt-4">
          <Progress value={71}>
            <ProgressLabel className="text-sm text-muted-foreground">
              AI calls used this month
            </ProgressLabel>
            <ProgressValue className="text-sm text-muted-foreground">
              {() => "142 / 200"}
            </ProgressValue>
          </Progress>
        </div>
      </div>

      {/* Upgrade card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <Button
          size="lg"
          className="w-full text-base"
          onClick={() => alert("Upgrade to Pro!")}
        >
          Upgrade to Pro — $199/mo
        </Button>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          Next billing date: April 1, 2026
        </p>
      </div>
    </div>
  );
}
