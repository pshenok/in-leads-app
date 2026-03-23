export type LeadScore = "HOT" | "WARM" | "COLD" | "hot" | "warm" | "cold";
export type LeadStatus = "new" | "contacted" | "called" | "qualified" | "proposal" | "booked" | "won" | "lost";
export type Platform = "Thumbtack" | "Angi" | "Yelp" | "website" | string;

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  address?: string;
  service: string;
  platform: Platform;
  score: LeadScore;
  status: LeadStatus;
  responseTime?: number; // seconds
  createdAt: string; // ISO date
  description?: string;
  // Flat fields matching backend (was nested in `facts`)
  urgency?: string;
  budget?: string;
  competingQuotes?: number;
  propertyType?: string;
  transcript?: TranscriptLine[];
  timeline?: TimelineEvent[];
  calls?: LeadCall[];
  appointments?: LeadAppointment[];
  activities?: LeadActivity[];
}

export interface TranscriptLine {
  speaker: string;
  text: string;
  timestamp: string;
  sortOrder?: number;
}

export interface TimelineEvent {
  type: string;
  time: string;
  detail: string;
}

export interface LeadCall {
  id: string;
  vapiCallId?: string;
  status: string;
  duration?: number;
  recordingUrl?: string;
  summary?: string;
  agentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadAppointment {
  id: string;
  service: string;
  status: string;
  date: string;
  startTime: string;
  endTime: string;
  notes?: string;
  createdAt: string;
}

export interface LeadActivity {
  id: string;
  type: string;
  message: string;
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  type: "call" | "score" | "sms" | "booked" | "lost";
  message: string;
  createdAt: string; // ISO date from backend (was `time` with relative string)
  leadId: string;
  leadName?: string;
}

export interface DailyStats {
  day: string;
  leads: number;
  hot: number;
  warm: number;
  cold: number;
}

export type AppointmentStatus = "confirmed" | "pending" | "completed";

export interface Appointment {
  id: string;
  leadId: string;
  lead: { name: string; score: LeadScore }; // nested relation from backend
  service: string;
  address: string;
  status: AppointmentStatus;
  date: string;       // "2026-03-10"
  startTime: string;  // "09:00"
  endTime: string;    // "10:30"
  notes: string;
  createdAt?: string;
  updatedAt?: string;
}
