# InLeads — Functional Platform Design

**Date:** 2026-03-10
**Status:** Approved

## Overview

Transform InLeads from a static demo (mock data) into a fully functional platform with a separate NestJS backend and Next.js frontend.

## Decisions

| Decision | Choice |
|----------|--------|
| Architecture | 2 separate apps: NestJS backend + Next.js frontend |
| Repository | Monorepo (`/backend` + `/frontend`) |
| Database | AWS RDS PostgreSQL (Prisma ORM) |
| Backend framework | NestJS (Clean Architecture) |
| Frontend framework | Next.js (existing app, UI-only) |
| Voice AI | VAPI (existing assistant + webhooks) |
| Deployment | AWS (backend: ECS/Lambda, frontend: S3+CloudFront) |

## Architecture

```
Frontend (Next.js)  ──REST──▶  Backend (NestJS)  ──Prisma──▶  AWS RDS PostgreSQL
                                    ▲
                                    │
                               VAPI Webhooks
```

- Frontend has zero knowledge of the database — REST calls only
- Backend is the single point of contact with PostgreSQL and external services (VAPI)
- Shared TypeScript types between backend and frontend

## Database Schema

### Lead (central entity)
- id, name, phone, email, address
- service, platform (Thumbtack|Angi|Yelp)
- score (HOT|WARM|COLD), status (new|called|qualified|booked|lost)
- responseTime (seconds), description
- urgency, budget, competingQuotes, propertyType
- createdAt, updatedAt

### TranscriptLine (belongs to Lead)
- id, leadId, speaker (ai|lead), text, timestamp, sortOrder

### TimelineEvent (belongs to Lead)
- id, leadId, type, time (DateTime), detail

### Appointment (belongs to Lead)
- id, leadId, service, status (confirmed|pending|completed)
- date, startTime, endTime, notes

### ActivityItem (belongs to Lead)
- id, leadId, type (call|score|sms|booked|lost), message, createdAt

### Call (belongs to Lead)
- id, leadId, vapiCallId (unique), status (queued|in-progress|completed|failed)
- duration, recordingUrl, summary, createdAt

### Service (standalone)
- id, name, category, priceMin, priceMax, description, aiNotes

### DailyStats (standalone)
- id, day (unique), leads, hot, warm, cold

## Backend Modules (NestJS)

| Module | Endpoints | Description |
|--------|-----------|-------------|
| LeadsModule | GET/POST /leads, GET/PATCH/DELETE /leads/:id | CRUD + filtering |
| CallsModule | POST /leads/:id/call, GET /calls | Initiate VAPI call, history |
| AppointmentsModule | GET/POST /appointments, PATCH/DELETE /appointments/:id | CRUD |
| DashboardModule | GET /dashboard/stats, GET /dashboard/activity | Aggregated stats |
| ServicesModule | GET/POST/PATCH/DELETE /services | Service management |
| WebhooksModule | POST /webhooks/vapi | Receive VAPI call events |

## VAPI Webhook Flow

1. POST /webhooks/vapi receives call events (call.started, call.completed, call.failed)
2. WebhooksService updates Call record (status, duration, recording)
3. Parses transcript into TranscriptLine records
4. Creates TimelineEvent entries
5. Updates Lead.score based on call analysis
6. Creates ActivityItem for the feed

## Call Initiation Flow

1. Frontend: POST /leads/:id/call
2. CallsService creates Call (status: queued)
3. Calls VAPI API to create outbound call
4. Saves vapiCallId, returns Call

## Frontend Changes

- Replace all `import { ... } from "@/lib/mock-data"` with API client calls
- New `src/lib/api.ts` — typed fetch wrapper with base URL from env
- Methods: `api.leads.list()`, `api.leads.get(id)`, `api.appointments.list()`, etc.
- Pages remain Server Components where possible

## Monorepo Structure

```
inleads/
├── backend/                  # NestJS
│   ├── src/
│   │   ├── modules/
│   │   │   ├── leads/
│   │   │   ├── calls/
│   │   │   ├── appointments/
│   │   │   ├── dashboard/
│   │   │   ├── services/
│   │   │   └── webhooks/
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── seed.ts
│   │   └── main.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/                 # Next.js (current in-leads-app)
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   │       ├── api.ts
│   │       └── types.ts
│   └── package.json
├── package.json              # Root workspace
└── .github/workflows/
```

## VAPI Config (existing)
- Assistant ID: 7c7e8c0e-c713-440d-a4b1-f578191cf6fc
- Phone: +18586669582
- API Key: stored in env
