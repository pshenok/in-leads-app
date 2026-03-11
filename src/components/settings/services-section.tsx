"use client";

import { useState, useEffect } from "react";
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
import { api } from "@/lib/api";
import type { Service } from "@/lib/api";

function formatPrice(min: number, max: number): string {
  return `$${min.toLocaleString()} — $${max.toLocaleString()}`;
}

export function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchServices() {
      try {
        const data = await api.services.list();
        setServices(data);
        // Expand the first two by default
        const initial: Record<string, boolean> = {};
        data.forEach((s, i) => {
          initial[s.id] = i < 2;
        });
        setExpanded(initial);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  const toggleExpanded = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400">
        Loading services...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header card */}
      <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Services & Pricing</h2>
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
      {services.map((service) => {
        const isExpanded = expanded[service.id] ?? false;
        const priceDisplay = formatPrice(service.priceMin, service.priceMax);

        return (
          <div
            key={service.id}
            className="rounded-xl border border-gray-200 bg-white hover:border-gray-300"
          >
            {/* Header row */}
            <button
              type="button"
              onClick={() => toggleExpanded(service.id)}
              className="flex w-full items-center gap-3 p-6 text-left"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                <span className="truncate text-lg font-semibold text-foreground">
                  {service.name}
                </span>
                <Badge variant="secondary" className="w-fit">
                  {service.category}
                </Badge>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <span className="flex items-center gap-1 font-[family-name:var(--font-mono)] text-sm text-primary">
                  <DollarSign className="h-3.5 w-3.5" />
                  {priceDisplay.replace(/^\$/, "")}
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
                    <div className="rounded-lg border-l-2 border-gray-300 bg-gray-50 pl-0.5">
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
