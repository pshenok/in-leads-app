"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { ScoreDot } from "@/components/score-badge";
import { api } from "@/lib/api";
import type { Lead } from "@/lib/types";
import {
  Phone,
  Zap,
  Calendar,
  Bot,
  PhoneOff,
  ChevronRight,
  Eye,
} from "lucide-react";

/* ── Pipeline stages — collapsed to 5 ────────────────────────── */

const STAGES = [
  {
    key: "new",
    label: "New",
    statuses: ["new"],
    dot: "bg-blue-500",
    dropBg: "bg-blue-50",
    ringColor: "ring-blue-400",
  },
  {
    key: "in_progress",
    label: "In Progress",
    statuses: ["contacted", "called", "qualified", "proposal"],
    dot: "bg-purple-500",
    dropBg: "bg-purple-50",
    ringColor: "ring-purple-400",
  },
  {
    key: "booked",
    label: "Booked",
    statuses: ["booked"],
    dot: "bg-emerald-500",
    dropBg: "bg-emerald-50",
    ringColor: "ring-emerald-400",
  },
  {
    key: "won",
    label: "Won",
    statuses: ["won"],
    dot: "bg-green-500",
    dropBg: "bg-green-50",
    ringColor: "ring-green-400",
  },
  {
    key: "lost",
    label: "Lost",
    statuses: ["lost"],
    dot: "bg-red-400",
    dropBg: "bg-red-50",
    ringColor: "ring-red-400",
  },
] as const;

type Stage = (typeof STAGES)[number];

/* ── Helpers ──────────────────────────────────────────────────── */

function getAIStatus(lead: Lead): { icon: React.ReactNode; text: string } {
  // Check appointments first
  if (lead.appointments && lead.appointments.length > 0) {
    const apt = lead.appointments[0];
    const d = new Date(apt.date);
    const formatted = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return { icon: <Calendar className="h-3 w-3 text-emerald-500" />, text: `Booked ${formatted}` };
  }
  // Check calls
  if (lead.calls && lead.calls.length > 0) {
    const lastCall = lead.calls[0];
    if (lastCall.status === "completed") {
      const dur = lastCall.duration ? `${Math.round(lastCall.duration / 60)}m` : "";
      return { icon: <Phone className="h-3 w-3 text-green-500" />, text: `Called ${dur}`.trim() };
    }
    if (lastCall.status === "failed" || lastCall.status === "no-answer") {
      return { icon: <PhoneOff className="h-3 w-3 text-red-400" />, text: "No answer" };
    }
    if (lastCall.status === "in-progress" || lastCall.status === "queued") {
      return { icon: <Phone className="h-3 w-3 text-amber-500 animate-pulse" />, text: "Calling..." };
    }
  }
  // Default
  if (lead.status === "new") {
    return { icon: <Bot className="h-3 w-3 text-blue-400" />, text: "Awaiting AI call" };
  }
  return { icon: <Bot className="h-3 w-3 text-gray-400" />, text: "No activity" };
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

/* ── Lead Card ────────────────────────────────────────────────── */

function LeadCard({
  lead,
  onDragStart,
  isDragging,
}: {
  lead: Lead;
  onDragStart: (e: React.DragEvent, lead: Lead) => void;
  isDragging: boolean;
}) {
  const aiStatus = getAIStatus(lead);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, lead)}
      className={`
        group relative bg-white rounded-lg border border-gray-200
        transition-all duration-150 cursor-grab active:cursor-grabbing
        hover:border-gray-300 hover:shadow-[0_1px_3px_rgba(0,0,0,0.08)]
        ${isDragging ? "opacity-30 scale-95" : "opacity-100"}
      `}
    >
      {/* Score indicator — left bar */}
      <div className="flex">
        <div className="w-1 shrink-0 rounded-l-lg" style={{
          backgroundColor:
            lead.score?.toUpperCase() === "HOT" ? "#EF4444"
            : lead.score?.toUpperCase() === "WARM" ? "#FB923C"
            : "#D1D5DB",
        }} />

        <div className="flex-1 p-3 min-w-0">
          {/* Row 1: Name + score dot */}
          <div className="flex items-center gap-2 mb-1">
            <ScoreDot score={lead.score} />
            <Link
              href={`/leads/${lead.id}`}
              className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors truncate"
              onClick={(e) => e.stopPropagation()}
            >
              {lead.name}
            </Link>
          </div>

          {/* Row 2: Service */}
          <p className="text-xs text-gray-500 mb-2 truncate pl-4">{lead.service}</p>

          {/* Row 3: AI status + platform */}
          <div className="flex items-center justify-between gap-2 pl-4">
            <span className="flex items-center gap-1.5 text-[11px] text-gray-500 truncate">
              {aiStatus.icon}
              <span className="truncate">{aiStatus.text}</span>
            </span>

            <div className="flex items-center gap-2 shrink-0">
              {/* Response time */}
              {lead.responseTime != null && lead.responseTime > 0 && (
                <span className="flex items-center gap-0.5 text-[10px] text-gray-400 font-mono">
                  <Zap className="h-2.5 w-2.5" />
                  {lead.responseTime}s
                </span>
              )}

              {/* Platform */}
              <span className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded font-medium">
                {lead.platform}
              </span>
            </div>
          </div>

          {/* Row 4: Time ago */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 pl-4">
            <span className="text-[10px] text-gray-400">
              {timeAgo(lead.createdAt)}
            </span>

            {/* Hover actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link
                href={`/leads/${lead.id}`}
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                title="View lead"
              >
                <Eye className="h-3 w-3" />
              </Link>
              <button
                className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                title="Call lead"
                onClick={(e) => e.stopPropagation()}
              >
                <Phone className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Pipeline Column ──────────────────────────────────────────── */

function PipelineColumn({
  stage,
  leads,
  onDragStart,
  onDrop,
  draggingLeadId,
  isDropTarget,
  onDragOver,
  onDragLeave,
}: {
  stage: Stage;
  leads: Lead[];
  onDragStart: (e: React.DragEvent, lead: Lead) => void;
  onDrop: (e: React.DragEvent, status: string) => void;
  draggingLeadId: string | null;
  isDropTarget: boolean;
  onDragOver: (e: React.DragEvent, stageKey: string) => void;
  onDragLeave: () => void;
}) {
  return (
    <div
      className={`
        flex flex-col min-w-[280px] w-[280px] rounded-lg transition-all duration-150
        ${isDropTarget ? `${stage.dropBg} ring-2 ring-offset-1 ${stage.ringColor}` : ""}
      `}
      onDragOver={(e) => onDragOver(e, stage.key)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, stage.statuses[0])}
    >
      {/* Column header */}
      <div className="flex items-center gap-2 px-2 py-2 mb-1">
        <span className={`w-2 h-2 rounded-full ${stage.dot}`} />
        <span className="text-xs font-semibold text-gray-700">
          {stage.label}
        </span>
        <span className="text-[11px] text-gray-400 font-mono">
          {leads.length}
        </span>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2 px-1 pb-4 min-h-[100px]">
        {leads.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            onDragStart={onDragStart}
            isDragging={draggingLeadId === lead.id}
          />
        ))}

        {/* Empty */}
        {leads.length === 0 && (
          <div className={`
            flex items-center justify-center h-[80px] rounded-lg
            border border-dashed text-[11px] text-gray-400
            ${isDropTarget ? "border-gray-400 bg-white/50" : "border-gray-200"}
          `}>
            {isDropTarget ? "Drop here" : "No leads"}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Pipeline Board (main export) ─────────────────────────────── */

interface PipelineBoardProps {
  leads: Lead[];
  onLeadUpdated?: () => void;
}

export function PipelineBoard({ leads, onLeadUpdated }: PipelineBoardProps) {
  const [draggingLeadId, setDraggingLeadId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const getColumnLeads = useCallback(
    (stage: Stage) => leads.filter((l) => (stage.statuses as readonly string[]).includes(l.status)),
    [leads]
  );

  function handleDragStart(e: React.DragEvent, lead: Lead) {
    setDraggingLeadId(lead.id);
    e.dataTransfer.setData("text/plain", JSON.stringify({ id: lead.id, currentStatus: lead.status }));
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragOver(e: React.DragEvent, stageKey: string) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDropTarget(stageKey);
  }

  function handleDragLeave() {
    setDropTarget(null);
  }

  async function handleDrop(e: React.DragEvent, newStatus: string) {
    e.preventDefault();
    setDropTarget(null);
    setDraggingLeadId(null);

    try {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      if (data.currentStatus === newStatus) return;
      await api.leads.update(data.id, { status: newStatus } as Partial<Lead>);
      onLeadUpdated?.();
    } catch (error) {
      console.error("Failed to update lead status:", error);
    }
  }

  function handleDragEnd() {
    setDraggingLeadId(null);
    setDropTarget(null);
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1"
        onDragEnd={handleDragEnd}
        style={{ scrollbarWidth: "thin", scrollbarColor: "#E5E7EB transparent" }}
      >
        {STAGES.map((stage) => (
          <PipelineColumn
            key={stage.key}
            stage={stage}
            leads={getColumnLeads(stage)}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            draggingLeadId={draggingLeadId}
            isDropTarget={dropTarget === stage.key}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          />
        ))}
      </div>
    </div>
  );
}
