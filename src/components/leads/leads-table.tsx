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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScoreDot } from "@/components/score-badge";
import { api } from "@/lib/api";
import type { Lead } from "@/lib/types";
import { Phone, Calendar, Bot, PhoneOff, Zap } from "lucide-react";

/* ── Stage config ─────────────────────────────────────────────── */

const STAGES = [
  { value: "new",       label: "New",       dot: "bg-blue-500" },
  { value: "contacted", label: "Contacted", dot: "bg-indigo-500" },
  { value: "called",    label: "Called",     dot: "bg-purple-500" },
  { value: "qualified", label: "Qualified",  dot: "bg-amber-500" },
  { value: "proposal",  label: "Proposal",   dot: "bg-orange-500" },
  { value: "booked",    label: "Booked",     dot: "bg-emerald-500" },
  { value: "won",       label: "Won",        dot: "bg-green-500" },
  { value: "lost",      label: "Lost",       dot: "bg-red-500" },
];

function getStage(status: string) {
  return STAGES.find((s) => s.value === status) ?? STAGES[0];
}

/* ── Helpers ──────────────────────────────────────────────────── */

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function getLastAIAction(lead: Lead): { icon: React.ReactNode; text: string } {
  if (lead.appointments && lead.appointments.length > 0) {
    const d = new Date(lead.appointments[0].date);
    const formatted = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return { icon: <Calendar className="h-3 w-3 text-emerald-500" />, text: `Booked ${formatted}` };
  }
  if (lead.calls && lead.calls.length > 0) {
    const c = lead.calls[0];
    if (c.status === "completed") {
      return { icon: <Phone className="h-3 w-3 text-green-500" />, text: "Call completed" };
    }
    if (c.status === "failed" || c.status === "no-answer") {
      return { icon: <PhoneOff className="h-3 w-3 text-red-400" />, text: "No answer" };
    }
    return { icon: <Phone className="h-3 w-3 text-amber-500" />, text: "In progress" };
  }
  return { icon: <Bot className="h-3 w-3 text-gray-400" />, text: "Pending" };
}

/* ── Table ────────────────────────────────────────────────────── */

interface LeadsTableProps {
  leads: Lead[];
  onLeadUpdated?: () => void;
}

export function LeadsTable({ leads, onLeadUpdated }: LeadsTableProps) {
  async function handleStatusChange(leadId: string, newStatus: string) {
    try {
      await api.leads.update(leadId, { status: newStatus } as Partial<Lead>);
      onLeadUpdated?.();
    } catch (error) {
      console.error("Failed to update lead status:", error);
    }
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/80 hover:bg-gray-50/80 border-gray-200">
            <TableHead className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider w-[200px]">Lead</TableHead>
            <TableHead className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider">Service</TableHead>
            <TableHead className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider w-[100px]">Score</TableHead>
            <TableHead className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider w-[130px]">Status</TableHead>
            <TableHead className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider">Last AI Action</TableHead>
            <TableHead className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider w-[80px]">Source</TableHead>
            <TableHead className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider w-[70px] text-right">Speed</TableHead>
            <TableHead className="text-gray-500 text-[11px] font-semibold uppercase tracking-wider w-[80px] text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => {
            const stage = getStage(lead.status);
            const aiAction = getLastAIAction(lead);
            return (
              <TableRow
                key={lead.id}
                className="border-gray-100 transition-colors hover:bg-gray-50/50 group"
              >
                {/* Lead name + platform */}
                <TableCell className="py-2.5">
                  <Link href={`/leads/${lead.id}`} className="flex items-center gap-2">
                    <ScoreDot score={lead.score} />
                    <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                      {lead.name}
                    </span>
                  </Link>
                </TableCell>

                {/* Service */}
                <TableCell className="py-2.5">
                  <Link href={`/leads/${lead.id}`} className="text-sm text-gray-600 truncate block">
                    {lead.service}
                  </Link>
                </TableCell>

                {/* Score */}
                <TableCell className="py-2.5">
                  <span className={`text-[11px] font-semibold uppercase tracking-wide ${
                    lead.score?.toUpperCase() === "HOT" ? "text-red-600"
                    : lead.score?.toUpperCase() === "WARM" ? "text-orange-600"
                    : "text-gray-500"
                  }`}>
                    {lead.score?.toUpperCase()}
                  </span>
                </TableCell>

                {/* Status */}
                <TableCell className="py-2.5">
                  <Select
                    value={lead.status}
                    onValueChange={(val) => { if (val) handleStatusChange(lead.id, val); }}
                  >
                    <SelectTrigger className="w-[120px] h-7 text-xs border-0 bg-transparent hover:bg-gray-100 transition-colors px-2 gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${stage.dot}`} />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STAGES.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          <span className="flex items-center gap-2 text-xs">
                            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                            {s.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>

                {/* Last AI action */}
                <TableCell className="py-2.5">
                  <span className="flex items-center gap-1.5 text-xs text-gray-500">
                    {aiAction.icon}
                    {aiAction.text}
                  </span>
                </TableCell>

                {/* Source */}
                <TableCell className="py-2.5">
                  <span className="text-[11px] text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded">
                    {lead.platform}
                  </span>
                </TableCell>

                {/* Response time */}
                <TableCell className="py-2.5 text-right">
                  {lead.responseTime != null && lead.responseTime > 0 ? (
                    <span className="flex items-center justify-end gap-0.5 text-[11px] text-gray-400 font-mono">
                      <Zap className="h-2.5 w-2.5" />
                      {lead.responseTime}s
                    </span>
                  ) : (
                    <span className="text-[11px] text-gray-300">—</span>
                  )}
                </TableCell>

                {/* Date */}
                <TableCell className="py-2.5 text-right">
                  <span className="text-[11px] text-gray-400">
                    {formatDate(lead.createdAt)}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}

          {leads.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="h-32 text-center text-sm text-gray-400">
                No leads match your filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
