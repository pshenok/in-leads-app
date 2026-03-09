export type LeadScore = "HOT" | "WARM" | "COLD";
export type LeadStatus = "new" | "called" | "qualified" | "booked" | "lost";
export type Platform = "Thumbtack" | "Angi" | "Yelp";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  service: string;
  platform: Platform;
  score: LeadScore;
  status: LeadStatus;
  responseTime: number; // seconds
  createdAt: string; // ISO date
  description: string;
  facts: {
    urgency: string;
    budget: string;
    competingQuotes: number;
    propertyType: string;
  };
  transcript?: TranscriptLine[];
  timeline: TimelineEvent[];
}

export interface TranscriptLine {
  speaker: "ai" | "lead";
  text: string;
  timestamp: string;
}

export interface TimelineEvent {
  type: "received" | "ai_called" | "call_completed" | "sms_sent" | "scored" | "retry";
  time: string;
  detail: string;
}

export interface ActivityItem {
  id: string;
  type: "call" | "score" | "sms" | "booked" | "lost";
  message: string;
  time: string;
  leadId: string;
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
  leadName: string;
  service: string;
  score: LeadScore;
  address: string;
  status: AppointmentStatus;
  date: string;       // "2026-03-10"
  startTime: string;  // "09:00"
  endTime: string;    // "10:30"
  notes: string;
}
