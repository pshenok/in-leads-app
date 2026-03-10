"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export function LeadsFilters({ onFilterChange, filters }: LeadsFiltersProps) {
  function update(key: keyof LeadsFilters, value: string) {
    onFilterChange({ ...filters, [key]: value });
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search input */}
      <div className="relative flex-1 min-w-[220px]">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search by name or service..."
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Score filter */}
      <Select
        value={filters.score}
        onValueChange={(val) => update("score", val as string)}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Score" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Scores</SelectItem>
          <SelectItem value="HOT">HOT</SelectItem>
          <SelectItem value="WARM">WARM</SelectItem>
          <SelectItem value="COLD">COLD</SelectItem>
        </SelectContent>
      </Select>

      {/* Platform filter */}
      <Select
        value={filters.platform}
        onValueChange={(val) => update("platform", val as string)}
      >
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Platform" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Platforms</SelectItem>
          <SelectItem value="Thumbtack">Thumbtack</SelectItem>
          <SelectItem value="Angi">Angi</SelectItem>
          <SelectItem value="Yelp">Yelp</SelectItem>
        </SelectContent>
      </Select>

      {/* Status filter */}
      <Select
        value={filters.status}
        onValueChange={(val) => update("status", val as string)}
      >
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="new">New</SelectItem>
          <SelectItem value="called">Called</SelectItem>
          <SelectItem value="qualified">Qualified</SelectItem>
          <SelectItem value="booked">Booked</SelectItem>
          <SelectItem value="lost">Lost</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
