# InLeads Demo App Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a frontend-only demo of InLeads dashboard with mocked data, deployed to demo.inleads.pro

**Architecture:** Next.js 14 App Router with static export. All data comes from mock JSON. Sidebar layout with 4 pages: Dashboard, Leads list, Lead detail, Settings. Dark theme matching landing page.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, Recharts (charts), Lucide React (icons)

**Node binary:** `/usr/local/bin/node` — use `export PATH="/usr/local/bin:$PATH"` before all commands

**Repo:** `/Users/kp/Projects/my/inleads/in-leads-app`

---

### Task 1: Scaffold Next.js project

**Files:**
- Create: entire Next.js project structure via `create-next-app`

**Step 1: Initialize Next.js with TypeScript + Tailwind**

```bash
export PATH="/usr/local/bin:$PATH"
cd /Users/kp/Projects/my/inleads/in-leads-app
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbopack
```

Answer prompts: Yes to all defaults.

**Step 2: Verify it runs**

```bash
export PATH="/usr/local/bin:$PATH"
cd /Users/kp/Projects/my/inleads/in-leads-app
npm run build
```

Expected: Build succeeds.

**Step 3: Configure static export**

In `next.config.ts`, set:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

**Step 4: Verify static export works**

```bash
export PATH="/usr/local/bin:$PATH"
cd /Users/kp/Projects/my/inleads/in-leads-app
npm run build
ls out/
```

Expected: `out/` directory with HTML files.

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: scaffold Next.js 14 project with static export"
```

---

### Task 2: Install dependencies + configure design system

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Create: `src/lib/utils.ts`

**Step 1: Install shadcn/ui + dependencies**

```bash
export PATH="/usr/local/bin:$PATH"
cd /Users/kp/Projects/my/inleads/in-leads-app
npx shadcn@latest init -d
npm install recharts lucide-react
```

**Step 2: Configure Tailwind theme with InLeads colors**

Update `src/app/globals.css` — replace all content with:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: #080808;
  --color-foreground: #F0EDE8;
  --color-card: #0f0f0f;
  --color-card-foreground: #F0EDE8;
  --color-popover: #0f0f0f;
  --color-popover-foreground: #F0EDE8;
  --color-primary: #FF6B00;
  --color-primary-foreground: #000000;
  --color-secondary: #161616;
  --color-secondary-foreground: #F0EDE8;
  --color-muted: #161616;
  --color-muted-foreground: #888888;
  --color-accent: #161616;
  --color-accent-foreground: #F0EDE8;
  --color-destructive: #ef4444;
  --color-destructive-foreground: #F0EDE8;
  --color-border: rgba(255, 107, 0, 0.2);
  --color-input: rgba(255, 107, 0, 0.2);
  --color-ring: #FF6B00;

  --color-hot: #ef4444;
  --color-warm: #FF6B00;
  --color-cold: #6b7280;

  --radius: 0.75rem;

  --font-display: 'Bebas Neue', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-[family-name:var(--font-body)];
  }
}
```

**Step 3: Add Google Fonts to layout**

In `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InLeads — Dashboard",
  description: "AI Lead Response Platform for Home Service Pros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
```

**Step 4: Build and verify**

```bash
export PATH="/usr/local/bin:$PATH"
cd /Users/kp/Projects/my/inleads/in-leads-app
npm run build
```

Expected: Build succeeds.

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: configure design system — dark theme, InLeads colors, fonts"
```

---

### Task 3: Create mock data

**Files:**
- Create: `src/lib/mock-data.ts`
- Create: `src/lib/types.ts`

**Step 1: Create types**

```typescript
// src/lib/types.ts

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
```

**Step 2: Create mock data**

Create `src/lib/mock-data.ts` with ~15 leads, 7 days of stats, and activity feed.

Key leads to include:
- 3 HOT leads with full transcripts (plumbing emergency, HVAC repair, electrical panel)
- 6 WARM leads (roofing estimate, painting, water heater, etc.)
- 4 COLD leads (just browsing, price shopping)
- 2 with status "booked", 1 "lost"
- Mix of Thumbtack, Angi, Yelp platforms
- Response times: 18s to 55s

Each lead must have a complete timeline. The 3 HOT leads must have full transcripts (~10-15 lines each).

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: add types and mock data — 15 leads with transcripts"
```

---

### Task 4: Build sidebar layout

**Files:**
- Create: `src/components/sidebar.tsx`
- Create: `src/components/app-layout.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Install shadcn components needed**

```bash
export PATH="/usr/local/bin:$PATH"
cd /Users/kp/Projects/my/inleads/in-leads-app
npx shadcn@latest add badge button card input select separator table tabs avatar scroll-area
```

**Step 2: Create Sidebar component**

```tsx
// src/components/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Settings, Zap } from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-[#0a0a0a] border-r border-border flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-primary" />
          <span className="font-[family-name:var(--font-display)] text-2xl tracking-wider">
            IN<span className="text-primary">LEADS</span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-medium">
            M
          </div>
          <div>
            <div className="text-sm font-medium">Mike's Plumbing</div>
            <div className="text-xs text-muted-foreground font-[family-name:var(--font-mono)]">
              GROWTH PLAN
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
```

**Step 3: Create AppLayout wrapper**

```tsx
// src/components/app-layout.tsx
import { Sidebar } from "./sidebar";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-60 p-8">{children}</main>
    </div>
  );
}
```

**Step 4: Update root layout to use AppLayout**

Wrap `{children}` in `<AppLayout>` in `layout.tsx`.

**Step 5: Build and verify**

```bash
export PATH="/usr/local/bin:$PATH"
cd /Users/kp/Projects/my/inleads/in-leads-app
npm run build
```

**Step 6: Commit**

```bash
git add -A && git commit -m "feat: add sidebar navigation and app layout"
```

---

### Task 5: Build Dashboard page

**Files:**
- Create: `src/components/dashboard/kpi-cards.tsx`
- Create: `src/components/dashboard/leads-chart.tsx`
- Create: `src/components/dashboard/recent-leads.tsx`
- Create: `src/components/dashboard/activity-feed.tsx`
- Create: `src/components/score-badge.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create ScoreBadge reusable component**

HOT = red bg, WARM = amber bg, COLD = gray bg. Small pill badge.

**Step 2: Create KpiCards component**

4 cards in a grid: Total Leads (number), HOT Leads (number), Avg Response (seconds), Conversion Rate (%).
Each card has: icon, label, value, trend indicator (+12% ↑).

**Step 3: Create LeadsChart component**

Bar chart using Recharts. 7 days of data, stacked bars (HOT/WARM/COLD). Dark theme styled.

**Step 4: Create RecentLeads component**

List of 5 most recent leads as compact cards. Click → navigate to `/leads/[id]`.

**Step 5: Create ActivityFeed component**

Timeline list of recent events. Each has: icon, message, relative time.

**Step 6: Compose Dashboard page**

```tsx
// src/app/page.tsx
import { AppLayout } from "@/components/app-layout";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { LeadsChart } from "@/components/dashboard/leads-chart";
import { RecentLeads } from "@/components/dashboard/recent-leads";
import { ActivityFeed } from "@/components/dashboard/activity-feed";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-wider">DASHBOARD</h1>
        <p className="text-muted-foreground mt-1">Welcome back, Mike</p>
      </div>
      <KpiCards />
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <LeadsChart />
        </div>
        <ActivityFeed />
      </div>
      <RecentLeads />
    </div>
  );
}
```

**Step 7: Build and verify**

```bash
export PATH="/usr/local/bin:$PATH"
cd /Users/kp/Projects/my/inleads/in-leads-app
npm run build
```

**Step 8: Commit**

```bash
git add -A && git commit -m "feat: build dashboard — KPIs, chart, recent leads, activity feed"
```

---

### Task 6: Build Leads list page

**Files:**
- Create: `src/app/leads/page.tsx`
- Create: `src/components/leads/leads-table.tsx`
- Create: `src/components/leads/leads-filters.tsx`

**Step 1: Create LeadsFilters component**

Row of filter controls: Score dropdown (All/HOT/WARM/COLD), Platform dropdown (All/Thumbtack/Angi/Yelp), Status dropdown, Search input. All client-side filtering against mock data.

**Step 2: Create LeadsTable component**

Table with columns: Name, Service, Platform, Score (badge), Status (badge), Response Time, Date.
Row is clickable → navigates to `/leads/[id]`.
Zebra striping with dark theme.

**Step 3: Create Leads page**

Compose filters + table. Title: "LEADS" with count.

**Step 4: Build and verify**

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: build leads list — table with filters and search"
```

---

### Task 7: Build Lead detail page

**Files:**
- Create: `src/app/leads/[id]/page.tsx`
- Create: `src/components/leads/lead-header.tsx`
- Create: `src/components/leads/lead-timeline.tsx`
- Create: `src/components/leads/lead-transcript.tsx`
- Create: `src/components/leads/lead-facts.tsx`

**Step 1: Create LeadHeader component**

Name, score badge, status badge, contact info (phone, email, address), platform source.
Action buttons: "Call Back", "Send SMS", "Mark as Booked" (mock — just show toast/alert).

**Step 2: Create LeadTimeline component**

Vertical timeline: lead received → AI called (18s) → call completed (2m 34s) → SMS sent → scored HOT.
Each node has icon, time, description.

**Step 3: Create LeadTranscript component**

Chat-style transcript. AI messages on left (amber accent), lead messages on right (gray). Timestamps.

**Step 4: Create LeadFacts component**

Grid of extracted facts: Urgency (HIGH/MED/LOW), Budget ($X,XXX), Competing Quotes (N), Property Type, Service Details.

**Step 5: Compose Lead Detail page**

```tsx
// src/app/leads/[id]/page.tsx
// Uses generateStaticParams() to pre-render all lead pages from mock data
```

Must include `generateStaticParams` for static export:

```tsx
import { leads } from "@/lib/mock-data";

export function generateStaticParams() {
  return leads.map((lead) => ({ id: lead.id }));
}
```

**Step 6: Build and verify**

**Step 7: Commit**

```bash
git add -A && git commit -m "feat: build lead detail — timeline, transcript, facts, actions"
```

---

### Task 8: Build Settings page

**Files:**
- Create: `src/app/settings/page.tsx`
- Create: `src/components/settings/profile-section.tsx`
- Create: `src/components/settings/platforms-section.tsx`
- Create: `src/components/settings/ai-script-section.tsx`
- Create: `src/components/settings/alerts-section.tsx`
- Create: `src/components/settings/plan-section.tsx`

**Step 1: Create Profile section**

Form fields: Name, Company, Phone, Email. Pre-filled with mock data. "Save" button (mock).

**Step 2: Create Platforms section**

List of platforms: Thumbtack (connected ✓), Angi (connected ✓), Yelp (pending, "Connect" button).
Each shows status indicator (green dot / yellow dot).

**Step 3: Create AI Script section**

Text areas: Greeting message, Key questions to ask, Tone selector (Professional/Friendly/Direct).
Pre-filled with example script.

**Step 4: Create Alerts section**

Phone number input for SMS alerts. Checkboxes: Alert on HOT leads, Alert on WARM leads, Alert on all leads.
Email notification toggle.

**Step 5: Create Plan section**

Current plan card: "Growth — $99/mo". Usage: "142 / 200 AI calls this month" with progress bar.
"Upgrade to Pro" button (mock).

**Step 6: Compose Settings page with tabs**

Use shadcn Tabs component. Tabs: Profile, Platforms, AI Script, Alerts, Plan & Billing.

**Step 7: Build and verify**

**Step 8: Commit**

```bash
git add -A && git commit -m "feat: build settings — profile, platforms, AI script, alerts, billing"
```

---

### Task 9: Polish and responsive

**Files:**
- Modify: various component files
- Create: `src/components/mobile-nav.tsx` (if needed)

**Step 1: Visual polish pass**

- Ensure consistent spacing, borders, hover states
- Add subtle transitions/animations
- Verify all fonts load correctly (Bebas Neue, DM Sans, JetBrains Mono)
- Check score badge colors are distinct and readable

**Step 2: Mobile sidebar (optional for demo)**

For smaller screens, collapse sidebar to icons-only or hamburger menu.

**Step 3: Build final**

```bash
export PATH="/usr/local/bin:$PATH"
cd /Users/kp/Projects/my/inleads/in-leads-app
npm run build
```

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: polish UI — spacing, transitions, responsive"
```

---

### Task 10: Deploy infrastructure — demo.inleads.pro

**Files:**
- Create: `.github/workflows/deploy.yml`

**Step 1: Create ACM certificate for demo.inleads.pro (us-east-1)**

```bash
export PATH="/usr/local/bin:/opt/homebrew/bin:$PATH"
aws acm request-certificate \
  --domain-name demo.inleads.pro \
  --validation-method DNS \
  --region us-east-1
```

**Step 2: Add DNS validation record to Route 53**

Get validation CNAME from ACM, add to hosted zone Z02211471SWU97KHMA0XI.

**Step 3: Create S3 bucket**

```bash
aws s3 mb s3://demo.inleads.pro --region eu-central-1
```

**Step 4: Create CloudFront distribution**

- Origin: S3 bucket with OAC
- Alternate domain: demo.inleads.pro
- ACM cert from step 1
- Default root object: index.html
- Custom error response: 403 → /404.html (for SPA-like routing, or /index.html)

**Step 5: Create CloudFront Function for URL rewriting**

Same pattern as landing page — rewrite `/leads/` → `/leads/index.html`, etc.

But for static export with App Router, Next.js generates `/leads.html`, `/leads/[id].html` etc. We need a function that:
- URI ending in `/` → append `index.html`
- URI without extension → append `.html`

**Step 6: Add bucket policy with OAC**

**Step 7: Route 53 alias records**

A + AAAA alias `demo.inleads.pro` → CloudFront distribution.

**Step 8: Create GitHub Actions workflow**

```yaml
name: Deploy Demo App
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npm run build
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: eu-central-1
      - name: Sync to S3
        run: aws s3 sync out/ s3://demo.inleads.pro --delete
      - name: Invalidate CloudFront
        run: aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"
```

**Step 9: Add GitHub secrets**

Reuse IAM user `inleads-deploy` — update its policy to include the new S3 bucket.
Add `CLOUDFRONT_DISTRIBUTION_ID` secret.

**Step 10: Push and verify deployment**

```bash
git push origin main
```

Verify: `curl -I https://demo.inleads.pro/` returns 200.

**Step 11: Commit workflow**

```bash
git add -A && git commit -m "ci: add GitHub Actions deploy to demo.inleads.pro"
```

---

## Summary

| Task | Description | Est. |
|------|-------------|------|
| 1 | Scaffold Next.js | 5 min |
| 2 | Design system + deps | 10 min |
| 3 | Mock data + types | 15 min |
| 4 | Sidebar layout | 10 min |
| 5 | Dashboard page | 20 min |
| 6 | Leads list page | 15 min |
| 7 | Lead detail page | 20 min |
| 8 | Settings page | 15 min |
| 9 | Polish + responsive | 10 min |
| 10 | AWS deploy infra | 15 min |
