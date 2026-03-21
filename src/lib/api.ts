import type { Lead, Appointment, ActivityItem } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refreshToken');
}

function clearTokens() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    localStorage.setItem('accessToken', data.accessToken);
    if (data.refreshToken) {
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    return data.accessToken;
  } catch {
    return null;
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getAccessToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string>),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (res.status === 401 && !path.startsWith('/auth/')) {
    // Attempt token refresh — deduplicate concurrent refreshes
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = refreshAccessToken().finally(() => {
        isRefreshing = false;
        refreshPromise = null;
      });
    }

    const newToken = await refreshPromise;
    if (newToken) {
      // Retry the original request with the new token
      const retryHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options?.headers as Record<string, string>),
        Authorization: `Bearer ${newToken}`,
      };
      const retryRes = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: retryHeaders,
      });
      if (!retryRes.ok) {
        throw new Error(`API error: ${retryRes.status} ${retryRes.statusText}`);
      }
      return retryRes.json();
    }

    // Refresh failed — clear tokens and redirect to login
    clearTokens();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    throw new Error('Session expired');
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `API error: ${res.status} ${res.statusText}`);
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

// ── Agent type (matches Prisma Agent model) ──────────────────────────

export interface Agent {
  id: string;
  name: string;
  vapiAssistantId?: string;
  systemPrompt: string;
  firstMessage: string;
  voiceId: string;
  voiceProvider: string;
  model: string;
  modelProvider: string;
  isActive: boolean;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: { calls: number };
}

export interface CreateAgentData {
  name: string;
  systemPrompt: string;
  firstMessage: string;
  voiceId?: string;
  voiceProvider?: string;
  model?: string;
  modelProvider?: string;
  isActive?: boolean;
  isDefault?: boolean;
}

// ── Voice type (from /api/voices) ───────────────────────────────────────

export interface Voice {
  id: string;
  name: string;
  gender: string;
  accent: string;
  age: string;
  description: string;
  previewUrl: string;
  provider: string;
}

// ── Generate prompt request ─────────────────────────────────────────────

export interface GeneratePromptRequest {
  businessDescription: string;
  agentGoal: string;
  tone: 'friendly' | 'professional' | 'casual' | 'formal';
  infoToCollect?: string;
  agentName: string;
  firstMessage: string;
}

// ── API Key type (matches Prisma ApiKey model) ──────────────────────────

export interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  isActive: boolean;
  lastUsedAt: string | null;
  createdAt: string;
  rawKey?: string;
}

// ── Ingest Log type (matches Prisma IngestLog model) ────────────────────

export interface IngestLog {
  id: string;
  source: string;
  status: string;
  leadId: string | null;
  error: string | null;
  ipAddress: string | null;
  createdAt: string;
}

// ── Auth types ─────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  organizationId: string;
}

export interface AuthOrganization {
  id: string;
  name: string;
  slug: string;
  plan: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
  organization: AuthOrganization;
}

export interface MeResponse {
  user: AuthUser;
  organization: AuthOrganization;
}

// ── API client ─────────────────────────────────────────────────────────

export const api = {
  auth: {
    login: (email: string, password: string) =>
      request<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    register: (data: { name: string; companyName: string; email: string; password: string }) =>
      request<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    refresh: (refreshToken: string) =>
      request<{ accessToken: string; refreshToken: string }>('/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      }),
    me: () => request<MeResponse>('/auth/me'),
  },

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
    call: (id: string, agentId?: string) =>
      request<Call>(`/leads/${id}/call`, {
        method: 'POST',
        body: JSON.stringify(agentId ? { agentId } : {}),
      }),
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

  agents: {
    list: () => request<Agent[]>('/agents'),
    get: (id: string) => request<Agent>(`/agents/${id}`),
    create: (data: CreateAgentData) =>
      request<Agent>('/agents', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<CreateAgentData>) =>
      request<Agent>(`/agents/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: string) =>
      request<void>(`/agents/${id}`, { method: 'DELETE' }),
    generatePrompt: (data: GeneratePromptRequest) =>
      request<{ prompt: string }>('/agents/generate-prompt', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },

  voices: {
    list: () => request<Voice[]>('/voices'),
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

  apiKeys: {
    list: () => request<ApiKey[]>('/api-keys'),
    create: (name: string) =>
      request<ApiKey>('/api-keys', { method: 'POST', body: JSON.stringify({ name }) }),
    delete: (id: string) =>
      request<void>(`/api-keys/${id}`, { method: 'DELETE' }),
  },

  ingest: {
    logs: () => request<IngestLog[]>('/ingest/logs'),
  },
};
