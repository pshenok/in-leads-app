# InLeads Functional Platform — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform InLeads from static demo into a functional platform with NestJS backend, PostgreSQL database, and VAPI integration.

**Architecture:** Monorepo with two apps — NestJS backend (REST API + Prisma ORM + VAPI webhooks) and Next.js frontend (UI-only, fetches data from backend API). Backend is the single point of contact with the database and external services.

**Tech Stack:** NestJS 11, Prisma ORM, PostgreSQL (AWS RDS), Next.js 16, TypeScript, VAPI API

**Design Doc:** `docs/plans/2026-03-10-functional-platform-design.md`

---

## Phase 1: Monorepo Setup

### Task 1: Restructure into monorepo

**Files:**
- Move: `in-leads-app/` → `inleads/frontend/`
- Create: `inleads/package.json` (root workspace)
- Create: `inleads/backend/` (new NestJS app)

**Step 1: Create monorepo root**

Create `/Users/kp/Projects/my/inleads/package.json`:
```json
{
  "name": "inleads",
  "private": true,
  "workspaces": ["frontend", "backend"]
}
```

**Step 2: Rename in-leads-app to frontend**

```bash
cd /Users/kp/Projects/my/inleads
mv in-leads-app frontend
```

**Step 3: Verify frontend still builds**

```bash
cd frontend && npm run build
```
Expected: Build succeeds (22 pages).

**Step 4: Commit**

```bash
git add -A && git commit -m "chore: restructure into monorepo, rename in-leads-app to frontend"
```

---

## Phase 2: NestJS Backend

### Task 2: Scaffold NestJS project

**Files:**
- Create: `backend/` directory with NestJS scaffold

**Step 1: Create NestJS project**

```bash
cd /Users/kp/Projects/my/inleads
npx @nestjs/cli new backend --package-manager npm --skip-git
```

**Step 2: Install dependencies**

```bash
cd backend
npm install prisma @prisma/client class-validator class-transformer @nestjs/config
npm install -D @types/node
```

**Step 3: Verify NestJS starts**

```bash
npm run start:dev
```
Expected: Server starts on port 3000. Stop it after verifying.

**Step 4: Change default port to 3001**

Edit `backend/src/main.ts`:
```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(3001);
}
bootstrap();
```

**Step 5: Commit**

```bash
git add -A && git commit -m "feat(backend): scaffold NestJS project on port 3001"
```

---

### Task 3: Set up Prisma + database schema

**Files:**
- Create: `backend/prisma/schema.prisma`
- Create: `backend/.env`

**Step 1: Initialize Prisma**

```bash
cd /Users/kp/Projects/my/inleads/backend
npx prisma init --datasource-provider sqlite
```

Using SQLite for local dev. Switch to PostgreSQL (AWS RDS) via DATABASE_URL for production.

**Step 2: Write schema**

Create `backend/prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Lead {
  id              String   @id @default(cuid())
  name            String
  phone           String
  email           String
  address         String
  service         String
  platform        String
  score           String
  status          String
  responseTime    Int
  description     String
  urgency         String
  budget          String
  competingQuotes Int
  propertyType    String
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  transcript   TranscriptLine[]
  timeline     TimelineEvent[]
  appointments Appointment[]
  activities   ActivityItem[]
  calls        Call[]
}

model TranscriptLine {
  id        String @id @default(cuid())
  leadId    String
  speaker   String
  text      String
  timestamp String
  sortOrder Int    @default(0)
  lead      Lead   @relation(fields: [leadId], references: [id], onDelete: Cascade)
}

model TimelineEvent {
  id     String   @id @default(cuid())
  leadId String
  type   String
  time   DateTime
  detail String
  lead   Lead     @relation(fields: [leadId], references: [id], onDelete: Cascade)
}

model Appointment {
  id        String   @id @default(cuid())
  leadId    String
  service   String
  status    String
  date      String
  startTime String
  endTime   String
  notes     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  lead      Lead     @relation(fields: [leadId], references: [id], onDelete: Cascade)
}

model ActivityItem {
  id        String   @id @default(cuid())
  leadId    String
  type      String
  message   String
  createdAt DateTime @default(now())
  lead      Lead     @relation(fields: [leadId], references: [id], onDelete: Cascade)
}

model Call {
  id           String   @id @default(cuid())
  leadId       String
  vapiCallId   String?  @unique
  status       String
  duration     Int?
  recordingUrl String?
  summary      String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  lead         Lead     @relation(fields: [leadId], references: [id], onDelete: Cascade)
}

model Service {
  id          String   @id @default(cuid())
  name        String
  category    String
  priceMin    Int
  priceMax    Int
  description String
  aiNotes     String   @default("")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model DailyStats {
  id    String @id @default(cuid())
  day   String @unique
  leads Int
  hot   Int
  warm  Int
  cold  Int
}
```

**Step 3: Run migration**

```bash
npx prisma migrate dev --name init
```

**Step 4: Create Prisma service**

Create `backend/src/prisma.service.ts`:
```typescript
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

Register PrismaService as a global provider in AppModule.

**Step 5: Commit**

```bash
git add -A && git commit -m "feat(backend): add Prisma schema with all models"
```

---

### Task 4: Seed database with existing mock data

**Files:**
- Create: `backend/prisma/seed.ts`
- Modify: `backend/package.json` (add seed script)

**Step 1: Write seed script**

Create `backend/prisma/seed.ts` that imports all 15 leads, 10 appointments, 7 dailyStats, 10 activityFeed items from the existing mock data in `frontend/src/lib/mock-data.ts`. Copy the data inline (don't import across workspaces).

The seed script should:
- Clear all tables (deleteMany)
- Create all leads with their transcript lines and timeline events
- Create all appointments
- Create all activity items
- Create all daily stats

**Step 2: Add seed config to package.json**

```json
{
  "prisma": {
    "seed": "npx tsx prisma/seed.ts"
  }
}
```

Install tsx: `npm install -D tsx`

**Step 3: Run seed**

```bash
npx prisma db seed
```
Expected: All data seeded successfully.

**Step 4: Verify with Prisma Studio**

```bash
npx prisma studio
```
Check leads table shows 15 records.

**Step 5: Commit**

```bash
git add -A && git commit -m "feat(backend): add seed script with all mock data"
```

---

### Task 5: Leads module (CRUD API)

**Files:**
- Create: `backend/src/modules/leads/leads.module.ts`
- Create: `backend/src/modules/leads/leads.controller.ts`
- Create: `backend/src/modules/leads/leads.service.ts`
- Create: `backend/src/modules/leads/dto/`

**Step 1: Create LeadsModule with NestJS CLI**

```bash
cd /Users/kp/Projects/my/inleads/backend
npx nest g module modules/leads
npx nest g controller modules/leads
npx nest g service modules/leads
```

**Step 2: Implement LeadsService**

Methods:
- `findAll(filters?)` — return leads with optional filtering by score, platform, status, search
- `findOne(id)` — return lead with transcript, timeline, appointments, activities
- `create(dto)` — create new lead
- `update(id, dto)` — partial update lead
- `remove(id)` — delete lead

All methods use PrismaService.

**Step 3: Implement LeadsController**

Endpoints:
- `GET /api/leads` — list with query params: `?score=HOT&platform=Thumbtack&status=new&search=sarah`
- `GET /api/leads/:id` — single lead with relations
- `POST /api/leads` — create lead
- `PATCH /api/leads/:id` — update lead
- `DELETE /api/leads/:id` — delete lead

**Step 4: Create DTOs**

- `CreateLeadDto` — all required fields with class-validator decorators
- `UpdateLeadDto` — PartialType of CreateLeadDto
- `LeadQueryDto` — optional filters (score, platform, status, search)

**Step 5: Test endpoints**

```bash
npm run start:dev
# In another terminal:
curl http://localhost:3001/api/leads | jq
curl http://localhost:3001/api/leads?score=HOT | jq
curl http://localhost:3001/api/leads/<id> | jq
```

**Step 6: Commit**

```bash
git add -A && git commit -m "feat(backend): add leads module with CRUD endpoints"
```

---

### Task 6: Appointments module

**Files:**
- Create: `backend/src/modules/appointments/`

**Step 1: Scaffold module**

```bash
npx nest g module modules/appointments
npx nest g controller modules/appointments
npx nest g service modules/appointments
```

**Step 2: Implement service + controller**

Endpoints:
- `GET /api/appointments` — list all, optional `?date=2026-03-10`
- `GET /api/appointments/:id` — single appointment with lead info
- `POST /api/appointments` — create appointment (requires leadId)
- `PATCH /api/appointments/:id` — update (status, time, notes)
- `DELETE /api/appointments/:id` — remove

**Step 3: Test and commit**

```bash
curl http://localhost:3001/api/appointments | jq
curl http://localhost:3001/api/appointments?date=2026-03-10 | jq
git add -A && git commit -m "feat(backend): add appointments module"
```

---

### Task 7: Dashboard module (stats + activity)

**Files:**
- Create: `backend/src/modules/dashboard/`

**Step 1: Scaffold module**

```bash
npx nest g module modules/dashboard
npx nest g controller modules/dashboard
npx nest g service modules/dashboard
```

**Step 2: Implement service + controller**

Endpoints:
- `GET /api/dashboard/stats` — returns: totalLeads, hotCount, warmCount, coldCount, avgResponseTime, bookedCount, dailyStats[]
- `GET /api/dashboard/activity` — returns: recent ActivityItem[] with lead name, ordered by createdAt desc, limit 20

The stats endpoint aggregates from Lead table directly (count by score, avg responseTime, etc.) and includes DailyStats data.

**Step 3: Test and commit**

```bash
curl http://localhost:3001/api/dashboard/stats | jq
curl http://localhost:3001/api/dashboard/activity | jq
git add -A && git commit -m "feat(backend): add dashboard module with stats and activity"
```

---

### Task 8: Services module

**Files:**
- Create: `backend/src/modules/services/`

**Step 1: Scaffold and implement CRUD**

Endpoints:
- `GET /api/services` — list all services
- `POST /api/services` — create service
- `PATCH /api/services/:id` — update service
- `DELETE /api/services/:id` — remove service

**Step 2: Add services to seed data**

Add 6 services to seed script matching current mock services:
- Emergency Plumbing ($150-$500)
- Water Heater Install ($1,200-$3,500)
- Drain Cleaning ($100-$350)
- HVAC Repair ($200-$800)
- Electrical Panel ($500-$2,500)
- General Maintenance ($100-$300)

**Step 3: Test and commit**

```bash
git add -A && git commit -m "feat(backend): add services module"
```

---

### Task 9: VAPI Webhooks module

**Files:**
- Create: `backend/src/modules/webhooks/`

**Step 1: Scaffold module**

```bash
npx nest g module modules/webhooks
npx nest g controller modules/webhooks
npx nest g service modules/webhooks
```

**Step 2: Implement webhook handler**

Single endpoint:
- `POST /api/webhooks/vapi` — receives VAPI call events

WebhooksService handles three event types:
1. **call.started** → Create/update Call record (status: in-progress), update Lead status to "called", create TimelineEvent
2. **call.completed** → Update Call (status: completed, duration, recordingUrl), parse transcript into TranscriptLine records, analyze and update Lead.score, create ActivityItem
3. **call.failed** → Update Call (status: failed), create TimelineEvent

**Step 3: Implement call initiation**

Add to LeadsController:
- `POST /api/leads/:id/call` — triggers VAPI outbound call

LeadsService.initiateCall(leadId):
1. Fetch lead from DB
2. Create Call record (status: queued)
3. Call VAPI API: POST https://api.vapi.ai/call with assistantId and phoneNumber
4. Update Call with vapiCallId
5. Return Call

Requires VAPI_API_KEY in .env.

**Step 4: Test webhook with mock payload**

```bash
curl -X POST http://localhost:3001/api/webhooks/vapi \
  -H "Content-Type: application/json" \
  -d '{"event":"call.started","call":{"id":"test-123","customer":{"number":"+15551234567"}}}'
```

**Step 5: Commit**

```bash
git add -A && git commit -m "feat(backend): add VAPI webhooks and call initiation"
```

---

## Phase 3: Frontend Connection

### Task 10: Create API client

**Files:**
- Create: `frontend/src/lib/api.ts`
- Create: `frontend/.env.local`

**Step 1: Create typed API client**

Create `frontend/src/lib/api.ts`:
```typescript
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const api = {
  leads: {
    list: (params?: Record<string, string>) => {
      const qs = params ? '?' + new URLSearchParams(params).toString() : '';
      return request<Lead[]>(`/leads${qs}`);
    },
    get: (id: string) => request<Lead>(`/leads/${id}`),
    create: (data: Partial<Lead>) => request<Lead>('/leads', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<Lead>) => request<Lead>(`/leads/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: string) => request<void>(`/leads/${id}`, { method: 'DELETE' }),
    call: (id: string) => request<Call>(`/leads/${id}/call`, { method: 'POST' }),
  },
  appointments: {
    list: (params?: Record<string, string>) => {
      const qs = params ? '?' + new URLSearchParams(params).toString() : '';
      return request<Appointment[]>(`/appointments${qs}`);
    },
    create: (data: Partial<Appointment>) => request<Appointment>('/appointments', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<Appointment>) => request<Appointment>(`/appointments/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: string) => request<void>(`/appointments/${id}`, { method: 'DELETE' }),
  },
  dashboard: {
    stats: () => request<DashboardStats>('/dashboard/stats'),
    activity: () => request<ActivityItem[]>('/dashboard/activity'),
  },
  services: {
    list: () => request<Service[]>('/services'),
    create: (data: Partial<Service>) => request<Service>('/services', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<Service>) => request<Service>(`/services/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: string) => request<void>(`/services/${id}`, { method: 'DELETE' }),
  },
};
```

Import types from `@/lib/types.ts`.

**Step 2: Create .env.local**

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**Step 3: Commit**

```bash
git add -A && git commit -m "feat(frontend): add typed API client"
```

---

### Task 11: Connect Dashboard page to API

**Files:**
- Modify: `frontend/src/app/page.tsx`
- Modify: `frontend/src/components/dashboard/kpi-cards.tsx`
- Modify: `frontend/src/components/dashboard/leads-chart.tsx`
- Modify: `frontend/src/components/dashboard/recent-leads.tsx`
- Modify: `frontend/src/components/dashboard/activity-feed.tsx`

**Step 1: Update page.tsx**

Replace mock data imports with API calls. Since this is a Server Component, use direct fetch:
```typescript
import { api } from '@/lib/api';

export default async function DashboardPage() {
  const [stats, activity, leads] = await Promise.all([
    api.dashboard.stats(),
    api.dashboard.activity(),
    api.leads.list(),
  ]);
  // pass data as props to components
}
```

**Step 2: Update each dashboard component**

Remove mock data imports from each component. Data comes via props from the page.

**Step 3: Verify dashboard renders with API data**

Start both backend (port 3001) and frontend (port 3000). Open http://localhost:3000 — should show same data as before.

**Step 4: Commit**

```bash
git add -A && git commit -m "feat(frontend): connect dashboard to backend API"
```

---

### Task 12: Connect Leads pages to API

**Files:**
- Modify: `frontend/src/app/leads/page.tsx`
- Modify: `frontend/src/app/leads/[id]/page.tsx`

**Step 1: Update leads list page**

This is a client component. Replace mock data with API fetch using useEffect or useSWR:
```typescript
const [leads, setLeads] = useState<Lead[]>([]);
useEffect(() => {
  api.leads.list().then(setLeads);
}, []);
```

Filtering should call API with query params:
```typescript
api.leads.list({ score: 'HOT', platform: 'Thumbtack' })
```

**Step 2: Update lead detail page**

Remove `generateStaticParams()` (no longer static). Fetch from API:
```typescript
export default async function LeadPage({ params }: { params: { id: string } }) {
  const lead = await api.leads.get(params.id);
  if (!lead) notFound();
  // render
}
```

**Step 3: Remove `output: "export"` from next.config.ts**

This is required because we no longer generate static pages. Update:
```typescript
const nextConfig: NextConfig = {
  images: { unoptimized: true },
};
```

**Step 4: Test both pages work**

**Step 5: Commit**

```bash
git add -A && git commit -m "feat(frontend): connect leads pages to API, remove static export"
```

---

### Task 13: Connect Calendar page to API

**Files:**
- Modify: `frontend/src/app/calendar/page.tsx`

**Step 1: Replace mock appointments with API call**

```typescript
const [appointments, setAppointments] = useState<Appointment[]>([]);
useEffect(() => {
  api.appointments.list().then(setAppointments);
}, []);
```

Filter by date client-side or pass `?date=2026-03-10` to API.

**Step 2: Test calendar renders**

**Step 3: Commit**

```bash
git add -A && git commit -m "feat(frontend): connect calendar to API"
```

---

### Task 14: Connect Settings page to API

**Files:**
- Modify: `frontend/src/components/settings/services-section.tsx`

**Step 1: Replace hardcoded services with API call**

The services section currently has hardcoded service data. Replace with:
```typescript
const [services, setServices] = useState<Service[]>([]);
useEffect(() => {
  api.services.list().then(setServices);
}, []);
```

**Step 2: Wire up save/edit/delete actions to API**

**Step 3: Commit**

```bash
git add -A && git commit -m "feat(frontend): connect settings to API"
```

---

### Task 15: Remove mock data, cleanup

**Files:**
- Delete: `frontend/src/lib/mock-data.ts`
- Verify: No remaining imports of mock-data

**Step 1: Search for remaining mock-data imports**

```bash
grep -r "mock-data" frontend/src/
```
Should return zero results after all pages are connected.

**Step 2: Delete mock-data.ts**

```bash
rm frontend/src/lib/mock-data.ts
```

**Step 3: Build and verify**

```bash
cd frontend && npm run build
```
Expected: Build succeeds with no errors.

**Step 4: Commit**

```bash
git add -A && git commit -m "chore: remove mock data, all pages use real API"
```

---

## Phase 4: CI/CD

### Task 16: Update deployment

**Files:**
- Modify: `frontend/.github/workflows/deploy.yml` (frontend deploy)
- Create: `backend/Dockerfile` (backend containerization)

**Step 1: Update frontend deploy workflow**

Update paths since frontend moved from root to `/frontend/`:
```yaml
defaults:
  run:
    working-directory: frontend
```

**Step 2: Create backend Dockerfile**

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3001
CMD ["node", "dist/main"]
```

**Step 3: Commit**

```bash
git add -A && git commit -m "chore: update CI/CD for monorepo structure"
```

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 | 1 | Monorepo setup |
| 2 | 2-9 | NestJS backend (Prisma, CRUD, VAPI) |
| 3 | 10-15 | Frontend API connection |
| 4 | 16 | CI/CD update |

**Total: 16 tasks**
