"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScoreBadge } from "@/components/score-badge";
import type { Lead, LeadStatus } from "@/lib/types";

const platformColors: Record<string, string> = {
  Thumbtack: "bg-[#009fd4]/20 text-[#009fd4]",
  Angi: "bg-[#f57c00]/20 text-[#f57c00]",
  Yelp: "bg-[#d32323]/20 text-[#d32323]",
};

const statusColors: Record<LeadStatus, string> = {
  new: "text-blue-400",
  called: "text-amber-400",
  qualified: "text-green-400",
  booked: "text-emerald-400",
  lost: "text-red-400",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

interface LeadsTableProps {
  leads: Lead[];
}

export function LeadsTable({ leads }: LeadsTableProps) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-x-auto transition-all duration-200 hover:shadow-lg hover:shadow-primary/5">
      <Table className="min-w-[700px]">
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead>Name</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Response</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow
              key={lead.id}
              className="border-border cursor-pointer transition-colors hover:bg-secondary/60"
            >
              <TableCell>
                <Link
                  href={`/leads/${lead.id}`}
                  className="block font-medium text-foreground"
                >
                  {lead.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/leads/${lead.id}`}
                  className="block text-muted-foreground"
                >
                  {lead.service}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/leads/${lead.id}`} className="block">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${platformColors[lead.platform] ?? ""}`}
                  >
                    {lead.platform}
                  </span>
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/leads/${lead.id}`} className="block">
                  <ScoreBadge score={lead.score} />
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/leads/${lead.id}`} className="block">
                  <span
                    className={`font-medium capitalize ${statusColors[lead.status]}`}
                  >
                    {lead.status}
                  </span>
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/leads/${lead.id}`} className="block">
                  <span
                    className={`font-[family-name:var(--font-mono)] text-xs ${
                      lead.responseTime < 30
                        ? "text-amber-400"
                        : "text-muted-foreground"
                    }`}
                  >
                    {lead.responseTime}s
                  </span>
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/leads/${lead.id}`}
                  className="block text-xs text-muted-foreground"
                >
                  {formatDate(lead.createdAt)}
                </Link>
              </TableCell>
            </TableRow>
          ))}
          {leads.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="h-24 text-center text-muted-foreground"
              >
                No leads match your filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
