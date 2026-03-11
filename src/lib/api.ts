import type { Lead, Appointment, ActivityItem } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// ── Dashboard types (backend-specific shapes) ──────────────────────────

export interface DashboardStats {
  totalLeads: number;
  hotCount: number;
  warmCount: number;
  coldCount: number;
  avgResponseTime: number;
  bookedCount: number;
  dailyStats: { day: string; leads: number; hot: number; warm: number; cold: number }[];
}

// ── Service type (matches Prisma Service model) ────────────────────────

export interface Service {
  id: string;
  name: string;
  category: string;
  priceMin: number;
  priceMax: number;
  description: string;
  aiNotes: string;
  createdAt: string;
  updatedAt: string;
}

// ── Call type (matches Prisma Call model) ───────────────────────────────

export interface Call {
  id: string;
  leadId: string;
  vapiCallId?: string;
  status: string;
  duration?: number;
  recordingUrl?: string;
  summary?: string;
  createdAt: string;
  updatedAt: string;
}

// ── API client ─────────────────────────────────────────────────────────

export const api = {
  leads: {
    list: (params?: Record<string, string>) => {
      const qs = params ? '?' + new URLSearchParams(params).toString() : '';
      return request<Lead[]>(`/leads${qs}`);
    },
    get: (id: string) => request<Lead>(`/leads/${id}`),
    create: (data: Partial<Lead>) =>
      request<Lead>('/leads', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<Lead>) =>
      request<Lead>(`/leads/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: string) =>
      request<void>(`/leads/${id}`, { method: 'DELETE' }),
    call: (id: string) =>
      request<Call>(`/leads/${id}/call`, { method: 'POST' }),
  },

  appointments: {
    list: (params?: Record<string, string>) => {
      const qs = params ? '?' + new URLSearchParams(params).toString() : '';
      return request<Appointment[]>(`/appointments${qs}`);
    },
    get: (id: string) => request<Appointment>(`/appointments/${id}`),
    create: (data: Partial<Appointment>) =>
      request<Appointment>('/appointments', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<Appointment>) =>
      request<Appointment>(`/appointments/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: string) =>
      request<void>(`/appointments/${id}`, { method: 'DELETE' }),
  },

  dashboard: {
    stats: () => request<DashboardStats>('/dashboard/stats'),
    activity: () => request<ActivityItem[]>('/dashboard/activity'),
  },

  services: {
    list: () => request<Service[]>('/services'),
    create: (data: Partial<Service>) =>
      request<Service>('/services', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<Service>) =>
      request<Service>(`/services/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: string) =>
      request<void>(`/services/${id}`, { method: 'DELETE' }),
  },
};
