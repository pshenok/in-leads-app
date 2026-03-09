"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Wrench,
  DollarSign,
} from "lucide-react";

interface Service {
  name: string;
  category: string;
  price: string;
  description: string;
  aiNotes: string;
}

const mockServices: Service[] = [
  {
    name: "Water Heater Repair & Replacement",
    category: "Plumbing",
    price: "$150 — $800",
    description:
      "Repair or full replacement of tank and tankless water heaters. Includes diagnostics, parts, and labor. Tankless installations start at $600. Emergency same-day service available.",
    aiNotes:
      "Always ask about the age and brand of the current unit. If over 10 years old, recommend replacement over repair. Ask if they want to consider tankless upgrade.",
  },
  {
    name: "Drain Cleaning",
    category: "Plumbing",
    price: "$99 — $250",
    description:
      "Professional drain cleaning for kitchen, bathroom, and floor drains. Includes camera inspection for recurring clogs. Main sewer line cleaning priced separately.",
    aiNotes:
      "Ask which drain is affected and how long the issue has persisted. If multiple drains are slow, suspect main line issue — upsell sewer inspection.",
  },
  {
    name: "Pipe Repair & Leak Fix",
    category: "Plumbing",
    price: "$120 — $600",
    description:
      "Repair leaking or burst pipes, including copper, PVC, and PEX. Water damage assessment included. Emergency callout available 24/7.",
    aiNotes:
      "Ask if there's visible water damage or mold. If pipe burst, flag as URGENT — prioritize scheduling. Ask if they've shut off the water supply.",
  },
  {
    name: "Bathroom Remodel",
    category: "Plumbing",
    price: "$3,000 — $12,000",
    description:
      "Full and partial bathroom remodels. Includes fixture replacement, re-tiling, vanity install, and plumbing rough-in. Free design consultation.",
    aiNotes:
      "This is a high-value lead. Always schedule in-person consultation. Ask about budget range and timeline expectations. Mention our portfolio of past projects.",
  },
  {
    name: "Sewer Line Inspection",
    category: "Plumbing",
    price: "$200 — $400",
    description:
      "HD camera inspection of sewer lines. Identifies root intrusion, cracks, bellies, and blockages. Includes video recording and written report.",
    aiNotes:
      "Common for home buyers. Ask if this is for a real estate transaction — if yes, offer expedited scheduling. Also offer as add-on for drain cleaning jobs.",
  },
  {
    name: "Emergency Plumbing (24/7)",
    category: "Emergency",
    price: "$250 — $500",
    description:
      "After-hours and weekend emergency plumbing service. $250 base callout fee plus parts and labor. Available 24/7/365. Typical response within 45 minutes.",
    aiNotes:
      "Always score as HOT. Ask about the nature of emergency. If flooding or gas, instruct caller to shut off main valve immediately. Dispatch notification to Mike's phone.",
  },
];

export function ServicesSection() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    mockServices.forEach((_, i) => {
      initial[i] = i < 2;
    });
    return initial;
  });

  const toggleExpanded = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="space-y-4">
      {/* Header card */}
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Services & Pricing</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Define your services and pricing so AI can accurately qualify leads
            and discuss costs during calls.
          </p>
        </div>
        <Button
          className="shrink-0"
          onClick={() => alert("Add Service dialog coming soon!")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>

      {/* Service cards */}
      {mockServices.map((service, index) => {
        const isExpanded = expanded[index] ?? false;

        return (
          <div
            key={index}
            className="rounded-xl border border-border bg-card transition-all duration-200 hover:shadow-lg hover:shadow-primary/5"
          >
            {/* Header row */}
            <button
              type="button"
              onClick={() => toggleExpanded(index)}
              className="flex w-full items-center gap-3 p-6 text-left"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                <span className="truncate text-lg font-semibold">
                  {service.name}
                </span>
                <Badge variant="secondary" className="w-fit">
                  {service.category}
                </Badge>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <span className="flex items-center gap-1 font-[family-name:var(--font-mono)] text-sm text-amber-500">
                  <DollarSign className="h-3.5 w-3.5" />
                  {service.price.replace(/^\$/, "")}
                </span>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </button>

            {/* Expanded content */}
            {isExpanded && (
              <div className="border-t border-border px-6 pb-6 pt-4">
                <div className="space-y-5">
                  {/* Description */}
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Description
                    </Label>
                    <Textarea
                      rows={3}
                      defaultValue={service.description}
                      className="resize-none"
                    />
                  </div>

                  {/* AI Instructions */}
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      AI Instructions
                    </Label>
                    <div className="rounded-lg border-l-2 border-amber-500/50 bg-amber-500/5 pl-0.5">
                      <Textarea
                        rows={3}
                        defaultValue={service.aiNotes}
                        className="resize-none border-l-0 rounded-l-none bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Save button */}
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      onClick={() =>
                        alert(`"${service.name}" saved!`)
                      }
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Save All */}
      <div className="flex justify-end pt-2">
        <Button onClick={() => alert("All services saved!")}>
          Save All Changes
        </Button>
      </div>
    </div>
  );
}
