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
import type { Lead } from "@/lib/types";

const platformLabel: Record<string, string> = {
  Thumbtack: "Thumbtack",
  Angi: "Angi",
  Yelp: "Yelp",
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
    <div className="border border-gray-200 rounded-xl overflow-hidden overflow-x-auto">
      <Table className="min-w-[700px]">
        <TableHeader>
          <TableRow className="bg-gray-50 border-gray-200 hover:bg-gray-50">
            <TableHead className="text-gray-500 text-xs uppercase tracking-wider">Name</TableHead>
            <TableHead className="text-gray-500 text-xs uppercase tracking-wider">Service</TableHead>
            <TableHead className="text-gray-500 text-xs uppercase tracking-wider">Platform</TableHead>
            <TableHead className="text-gray-500 text-xs uppercase tracking-wider">Score</TableHead>
            <TableHead className="text-gray-500 text-xs uppercase tracking-wider">Status</TableHead>
            <TableHead className="text-gray-500 text-xs uppercase tracking-wider">Response</TableHead>
            <TableHead className="text-gray-500 text-xs uppercase tracking-wider">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-100">
          {leads.map((lead) => (
            <TableRow
              key={lead.id}
              className="border-gray-100 cursor-pointer transition-colors hover:bg-gray-50"
            >
              <TableCell>
                <Link
                  href={`/leads/${lead.id}`}
                  className="block font-medium text-gray-900"
                >
                  {lead.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/leads/${lead.id}`}
                  className="block text-gray-500"
                >
                  {lead.service}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/leads/${lead.id}`} className="block">
                  <span className="text-sm text-gray-500">
                    {platformLabel[lead.platform] ?? lead.platform}
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
                  <span className="text-sm text-gray-500 capitalize">
                    {lead.status}
                  </span>
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/leads/${lead.id}`} className="block">
                  <span className="font-[family-name:var(--font-mono)] text-xs text-gray-500">
                    {lead.responseTime}s
                  </span>
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/leads/${lead.id}`}
                  className="block text-xs text-gray-400"
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
                className="h-24 text-center text-gray-500"
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
