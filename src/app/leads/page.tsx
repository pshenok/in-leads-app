"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { LayoutGrid, List, Plus, Users } from "lucide-react";
import { api } from "@/lib/api";
import type { Lead } from "@/lib/types";
import { LeadsFilters } from "@/components/leads/leads-filters";
import { LeadsTable } from "@/components/leads/leads-table";
import { PipelineBoard } from "@/components/leads/pipeline-board";

interface Filters {
  search: string;
  score: string;
  platform: string;
  status: string;
}

type ViewMode = "table" | "board";

/* ── Stats bar ────────────────────────────────────────────────── */

function StatsBar({ leads }: { leads: Lead[] }) {
  const total = leads.length;
  const hot = leads.filter((l) => l.score?.toUpperCase() === "HOT").length;
  const booked = leads.filter((l) => l.status === "booked" || l.status === "won").length;
  const newCount = leads.filter((l) => l.status === "new").length;

  const stats = [
    { label: "Total", value: total, color: "text-gray-900" },
    { label: "New", value: newCount, color: "text-blue-600" },
    { label: "Hot", value: hot, color: "text-red-600" },
    { label: "Booked", value: booked, color: "text-emerald-600" },
  ];

  return (
    <div className="flex items-center gap-6">
      {stats.map((s) => (
        <div key={s.label} className="flex items-center gap-1.5">
          <span className="text-[11px] text-gray-400 uppercase tracking-wider">{s.label}</span>
          <span className={`text-sm font-semibold font-mono ${s.color}`}>{s.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Main page ────────────────────────────────────────────────── */

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [view, setView] = useState<ViewMode>("board");
  const [filters, setFilters] = useState<Filters>({
    search: "",
    score: "all",
    platform: "all",
    status: "all",
  });

  const fetchLeads = useCallback(async () => {
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
  }, [filters]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads, refreshKey]);

  const filteredLeads = useMemo(() => {
    if (!filters.search) return leads;
    const q = filters.search.toLowerCase();
    return leads.filter((lead) =>
      lead.name.toLowerCase().includes(q) || lead.service.toLowerCase().includes(q)
    );
  }, [leads, filters.search]);

  const handleLeadUpdated = useCallback(() => setRefreshKey((k) => k + 1), []);

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gray-100">
            <Users className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Leads</h1>
            <p className="text-xs text-gray-500">
              {loading ? "Loading..." : `${filteredLeads.length} leads in pipeline`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Stats */}
          {!loading && <StatsBar leads={filteredLeads} />}

          <div className="w-px h-6 bg-gray-200 mx-2" />

          {/* View toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => setView("board")}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                view === "board"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Board
            </button>
            <button
              onClick={() => setView("table")}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                view === "table"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <List className="h-3.5 w-3.5" />
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <LeadsFilters onFilterChange={setFilters} filters={filters} />

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
          Loading leads...
        </div>
      ) : view === "board" ? (
        <PipelineBoard leads={filteredLeads} onLeadUpdated={handleLeadUpdated} />
      ) : (
        <LeadsTable leads={filteredLeads} onLeadUpdated={handleLeadUpdated} />
      )}
    </div>
  );
}
