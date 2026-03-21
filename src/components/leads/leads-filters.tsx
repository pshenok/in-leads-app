"use client";

import { Search, X } from "lucide-react";

interface LeadsFilters {
  search: string;
  score: string;
  platform: string;
  status: string;
}

interface LeadsFiltersProps {
  onFilterChange: (filters: LeadsFilters) => void;
  filters: LeadsFilters;
}

/* ── Chip button ──────────────────────────────────────────────── */

function Chip({
  label,
  active,
  onClick,
  dot,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  dot?: string; // tailwind bg color
}) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium
        transition-all duration-150 whitespace-nowrap
        ${
          active
            ? "bg-gray-900 text-white shadow-sm"
            : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
        }
      `}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-white/70" : dot}`} />}
      {label}
    </button>
  );
}

/* ── Main filters bar ─────────────────────────────────────────── */

export function LeadsFilters({ onFilterChange, filters }: LeadsFiltersProps) {
  function update(key: keyof LeadsFilters, value: string) {
    onFilterChange({ ...filters, [key]: value });
  }

  const hasActiveFilters =
    filters.score !== "all" || filters.platform !== "all" || filters.status !== "all";

  return (
    <div className="flex items-center gap-6 flex-wrap">
      {/* Search */}
      <div className="relative min-w-[200px] max-w-[280px] flex-1">
        <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Filter leads..."
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
          className="w-full h-8 pl-8 pr-3 text-sm bg-white border border-gray-200 rounded-md
                     placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300
                     transition-all duration-150"
        />
        {filters.search && (
          <button
            onClick={() => update("search", "")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="w-px h-5 bg-gray-200" />

      {/* Score chips */}
      <div className="flex items-center gap-1">
        <Chip label="All" active={filters.score === "all"} onClick={() => update("score", "all")} />
        <Chip label="Hot" active={filters.score === "HOT"} onClick={() => update("score", "HOT")} dot="bg-red-500" />
        <Chip label="Warm" active={filters.score === "WARM"} onClick={() => update("score", "WARM")} dot="bg-orange-400" />
        <Chip label="Cold" active={filters.score === "COLD"} onClick={() => update("score", "COLD")} dot="bg-gray-300" />
      </div>

      {/* Divider */}
      <div className="w-px h-5 bg-gray-200" />

      {/* Platform chips */}
      <div className="flex items-center gap-1">
        <Chip label="All" active={filters.platform === "all"} onClick={() => update("platform", "all")} />
        <Chip label="Thumbtack" active={filters.platform === "Thumbtack"} onClick={() => update("platform", "Thumbtack")} />
        <Chip label="Angi" active={filters.platform === "Angi"} onClick={() => update("platform", "Angi")} />
        <Chip label="Yelp" active={filters.platform === "Yelp"} onClick={() => update("platform", "Yelp")} />
      </div>

      {/* Clear all */}
      {hasActiveFilters && (
        <>
          <div className="w-px h-5 bg-gray-200" />
          <button
            onClick={() => onFilterChange({ search: filters.search, score: "all", platform: "all", status: "all" })}
            className="text-xs text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Clear filters
          </button>
        </>
      )}
    </div>
  );
}
