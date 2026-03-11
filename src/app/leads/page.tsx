"use client";

import { useState, useEffect, useMemo } from "react";
import { api } from "@/lib/api";
import type { Lead } from "@/lib/types";
import { LeadsFilters } from "@/components/leads/leads-filters";
import { LeadsTable } from "@/components/leads/leads-table";

interface Filters {
  search: string;
  score: string;
  platform: string;
  status: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    score: "all",
    platform: "all",
    status: "all",
  });

  useEffect(() => {
    async function fetchLeads() {
      try {
        const params: Record<string, string> = {};
        if (filters.score !== "all") params.score = filters.score;
        if (filters.platform !== "all") params.platform = filters.platform;
        if (filters.status !== "all") params.status = filters.status;
        if (filters.search) params.search = filters.search;

        const data = await api.leads.list(params);
        setLeads(data);
      } catch (error) {
        console.error("Failed to fetch leads:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, [filters]);

  // Client-side search fallback (in case backend doesn't support search param)
  const filteredLeads = useMemo(() => {
    if (!filters.search) return leads;
    const q = filters.search.toLowerCase();
    return leads.filter((lead) => {
      const matchesName = lead.name.toLowerCase().includes(q);
      const matchesService = lead.service.toLowerCase().includes(q);
      return matchesName || matchesService;
    });
  }, [leads, filters.search]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wider text-gray-900">
            LEADS
          </h1>
          <p className="text-gray-500 mt-1">
            {loading ? "Loading..." : `${filteredLeads.length} total leads`}
          </p>
        </div>
      </div>
      <LeadsFilters onFilterChange={setFilters} filters={filters} />
      <LeadsTable leads={filteredLeads} />
    </div>
  );
}
