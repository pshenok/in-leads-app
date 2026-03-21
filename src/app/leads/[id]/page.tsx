"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import type { Lead } from "@/lib/types";
import { LeadHeader } from "@/components/leads/lead-header";
import { LeadTimeline } from "@/components/leads/lead-timeline";
import { LeadTranscript } from "@/components/leads/lead-transcript";
import { LeadFacts } from "@/components/leads/lead-facts";

export default function LeadDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchLead() {
      try {
        const data = await api.leads.get(id);
        setLead(data);
      } catch (err) {
        console.error("Failed to fetch lead:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchLead();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wider text-gray-900">
            LEAD NOT FOUND
          </h1>
          <p className="mt-2 text-gray-500">
            The lead you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <LeadHeader lead={lead} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {lead.transcript && <LeadTranscript transcript={lead.transcript} />}
          <LeadFacts lead={lead} />
        </div>
        <LeadTimeline timeline={lead.timeline} />
      </div>
    </div>
  );
}
