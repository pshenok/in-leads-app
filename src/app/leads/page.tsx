"use client";

import { useState, useMemo } from "react";
import { leads } from "@/lib/mock-data";
import { LeadsFilters } from "@/components/leads/leads-filters";
import { LeadsTable } from "@/components/leads/leads-table";

interface Filters {
  search: string;
  score: string;
  platform: string;
  status: string;
}

export default function LeadsPage() {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    score: "all",
    platform: "all",
    status: "all",
  });

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Search filter — match name or service
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matchesName = lead.name.toLowerCase().includes(q);
        const matchesService = lead.service.toLowerCase().includes(q);
        if (!matchesName && !matchesService) return false;
      }

      // Score filter
      if (filters.score !== "all" && lead.score !== filters.score) return false;

      // Platform filter
      if (filters.platform !== "all" && lead.platform !== filters.platform)
        return false;

      // Status filter
      if (filters.status !== "all" && lead.status !== filters.status)
        return false;

      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wider text-gray-900">
            LEADS
          </h1>
          <p className="text-gray-500 mt-1">
            {filteredLeads.length} total leads
          </p>
        </div>
      </div>
      <LeadsFilters onFilterChange={setFilters} filters={filters} />
      <LeadsTable leads={filteredLeads} />
    </div>
  );
}
