"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScoreBadge } from "@/components/score-badge";
import type { Lead, LeadStatus } from "@/lib/types";

const statusColors: Record<LeadStatus, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  called: "bg-amber-50 text-amber-700 border-amber-200",
  qualified: "bg-green-50 text-green-700 border-green-200",
  booked: "bg-emerald-50 text-emerald-700 border-emerald-200",
  lost: "bg-red-50 text-red-600 border-red-200",
};

interface LeadHeaderProps {
  lead: Lead;
}

export function LeadHeader({ lead }: LeadHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/leads"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Leads
      </Link>

      {/* Name, score, status row */}
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wider text-gray-900">
          {lead.name.toUpperCase()}
        </h1>
        <ScoreBadge score={lead.score} size="md" />
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium capitalize ${statusColors[lead.status]}`}
        >
          {lead.status}
        </span>
        <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
          {lead.platform}
        </span>
      </div>

      {/* Contact grid */}
      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Phone className="h-4 w-4 text-gray-400" />
          <span>{lead.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Mail className="h-4 w-4 text-gray-400" />
          <span>{lead.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span>{lead.address}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          className="border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
          onClick={() => alert("Demo: action would be triggered")}
        >
          <Phone className="h-4 w-4" data-icon="inline-start" />
          Call Back
        </Button>
        <Button
          variant="outline"
          className="border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
          onClick={() => alert("Demo: action would be triggered")}
        >
          <MessageSquare className="h-4 w-4" data-icon="inline-start" />
          Send SMS
        </Button>
        <Button
          className="bg-gray-900 text-white rounded-lg hover:bg-gray-800 border-0"
          onClick={() => alert("Demo: action would be triggered")}
        >
          <CheckCircle className="h-4 w-4" data-icon="inline-start" />
          Mark as Booked
        </Button>
      </div>
    </div>
  );
}
