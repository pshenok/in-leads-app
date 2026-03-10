# Deel-Style Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace sidebar with top navigation bar and adopt Deel's monochrome design (thin borders, no shadows/gradients, minimal color).

**Architecture:** Two-phase change: (1) restructure layout — delete sidebar, create top-nav, update app-layout; (2) restyle all components to Deel's monochrome palette. All theme tokens centralized in globals.css.

**Tech Stack:** Next.js 16 + Tailwind CSS v4 + shadcn/ui + Recharts + Lucide React

**Design doc:** `docs/plans/2026-03-09-deel-style-redesign.md`

**Important context:**
- Node.js is at `/usr/local/bin/node` — prefix commands with `export PATH="/usr/local/bin:/usr/bin:/bin:$PATH"`
- Project root: `/Users/kp/Projects/my/inleads/in-leads-app`
- No tests exist (frontend-only demo with mocked data) — verify via `npm run build`
- This is a visual/layout change. No new pages, no new functionality.

---

### Task 1: Monochrome Theme Tokens — globals.css

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Replace all CSS custom properties**

Replace the entire `@theme inline { ... }` block with Deel-style monochrome values:

```css
@theme inline {
  --color-background: #FFFFFF;
  --color-foreground: #111827;
  --color-card: #FFFFFF;
  --color-card-foreground: #111827;
  --color-popover: #FFFFFF;
  --color-popover-foreground: #111827;
  --color-primary: #111827;
  --color-primary-foreground: #FFFFFF;
  --color-secondary: #F9FAFB;
  --color-secondary-foreground: #111827;
  --color-muted: #F3F4F6;
  --color-muted-foreground: #6B7280;
  --color-accent: #F9FAFB;
  --color-accent-foreground: #111827;
  --color-destructive: #DC2626;
  --color-destructive-foreground: #FFFFFF;
  --color-border: #E5E7EB;
  --color-input: #E5E7EB;
  --color-ring: #111827;
  --color-chart-1: #111827;
  --color-chart-2: #DC2626;
  --color-chart-3: #E5E7EB;
  --color-chart-4: #16A34A;
  --color-chart-5: #6B7280;
  --color-sidebar-background: #FFFFFF;
  --color-sidebar-foreground: #111827;
  --color-sidebar-primary: #111827;
  --color-sidebar-primary-foreground: #FFFFFF;
  --color-sidebar-accent: #F9FAFB;
  --color-sidebar-accent-foreground: #111827;
  --color-sidebar-border: #E5E7EB;
  --color-sidebar-ring: #111827;

  --color-hot: #DC2626;
  --color-warm: #EA580C;
  --color-cold: #6B7280;

  --radius: 0.75rem;
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);

  --font-display: 'Bebas Neue', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

Key change: `--color-primary` is now `#111827` (black) instead of `#FF6B00` (orange). Ring is black too.

**Step 2: Build**

Run: `export PATH="/usr/local/bin:/usr/bin:/bin:$PATH" && cd /Users/kp/Projects/my/inleads/in-leads-app && npm run build`

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: monochrome Deel-style theme tokens"
```

---

### Task 2: Top Navigation + Layout Restructure

**Files:**
- Create: `src/components/top-nav.tsx`
- Modify: `src/components/mobile-nav.tsx` (full rewrite)
- Modify: `src/components/app-layout.tsx`
- Delete: `src/components/sidebar.tsx`

**Step 1: Create `src/components/top-nav.tsx`**

New desktop top navigation bar component. This is the main structural change — replacing the left sidebar with a horizontal nav at the top.

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, LayoutDashboard, Users, CalendarDays, Settings, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/", icon: LayoutDashboard },
  { label: "Leads", href: "/leads", icon: Users },
  { label: "Calendar", href: "/calendar", icon: CalendarDays },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 hidden h-16 border-b border-border bg-white lg:block">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-orange-500" />
          <span className="font-[family-name:var(--font-display)] text-xl tracking-wider text-foreground">
            INLEADS
          </span>
        </Link>

        {/* Center nav */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "font-semibold text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600">
            <Bell className="h-5 w-5" />
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
            KP
          </div>
        </div>
      </div>
    </header>
  );
}
```

**Step 2: Rewrite `src/components/mobile-nav.tsx`**

Complete rewrite — mobile version of the top-nav (not a sidebar anymore):

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, LayoutDashboard, Users, CalendarDays, Settings, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/", icon: LayoutDashboard },
  { label: "Leads", href: "/leads", icon: Users },
  { label: "Calendar", href: "/calendar", icon: CalendarDays },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile header */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-white px-4 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-orange-500" />
          <span className="font-[family-name:var(--font-display)] text-xl tracking-wider text-foreground">
            INLEADS
          </span>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-50"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Dropdown menu */}
      {open && (
        <>
          <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setOpen(false)} />
          <div className="fixed inset-x-0 top-14 z-50 border-b border-border bg-white p-2 lg:hidden">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                      isActive
                        ? "font-semibold text-gray-900 bg-gray-50"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
```

**Step 3: Rewrite `src/components/app-layout.tsx`**

```tsx
import { TopNav } from "./top-nav";
import { MobileNav } from "./mobile-nav";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <TopNav />
      <MobileNav />
      <main className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8 lg:pt-16">
        {children}
      </main>
    </div>
  );
}
```

Key: No more `ml-60` margin. Content is centered with `max-w-7xl mx-auto`. Top padding accounts for fixed nav.

**Step 4: Delete `src/components/sidebar.tsx`**

```bash
rm src/components/sidebar.tsx
```

**Step 5: Build**

Run: `export PATH="/usr/local/bin:/usr/bin:/bin:$PATH" && cd /Users/kp/Projects/my/inleads/in-leads-app && npm run build`

**Step 6: Commit**

```bash
git add src/components/top-nav.tsx src/components/mobile-nav.tsx src/components/app-layout.tsx
git rm src/components/sidebar.tsx
git commit -m "feat: replace sidebar with Deel-style top navigation"
```

---

### Task 3: Score Badge + Dashboard — Deel Style

**Files:**
- Modify: `src/components/score-badge.tsx`
- Modify: `src/components/dashboard/kpi-cards.tsx`
- Modify: `src/components/dashboard/leads-chart.tsx`
- Modify: `src/components/dashboard/recent-leads.tsx`
- Modify: `src/components/dashboard/activity-feed.tsx`
- Modify: `src/app/page.tsx`

**Context:** Apply Deel's monochrome style. Key rules for ALL components:
- Cards: `border border-gray-200 rounded-xl` — NO shadows, NO gradients
- Hover: `hover:border-gray-300` at most
- Text: `text-gray-900` primary, `text-gray-500` secondary, `text-gray-400` muted
- Buttons: black `bg-gray-900 text-white` primary
- Remove ALL gradient classes (`bg-gradient-to-r`, `from-*`, `to-*`)
- Remove ALL shadow classes (`shadow-sm`, `shadow-md`, `shadow-lg`)
- Color ONLY for lead scoring badges (HOT=red, WARM=orange, COLD=gray)

**Score Badge changes:**
- HOT: `bg-red-50 text-red-700 border border-red-200`
- WARM: `bg-orange-50 text-orange-700 border border-orange-200`
- COLD: `bg-gray-100 text-gray-600 border border-gray-200`

**KPI Cards changes:**
- Card: `border border-gray-200 rounded-xl` (no shadow)
- Remove gradient icon circles — use simple gray circle: `bg-gray-100 rounded-full p-2 text-gray-600`
- Numbers: `text-gray-900`, labels: `text-gray-500`

**Leads Chart:**
- Tooltip: white + `border border-gray-200`, small shadow OK for popover: `boxShadow: "0 2px 8px rgba(0,0,0,0.08)"`
- Bar colors: HOT `#DC2626`, WARM/primary `#111827` (black), COLD `#E5E7EB` (light gray)
- Grid: `#F3F4F6`, ticks: `#9CA3AF`

**Recent Leads:**
- Cards: `border border-gray-200 rounded-xl hover:border-gray-300` (no shadow)
- Remove gradient/orange styling from platform badges

**Activity Feed:**
- Timeline line: `bg-gray-200`
- Dots: keep colored (green, orange, blue, red) but smaller
- Text: `text-gray-900` messages, `text-gray-400` timestamps

**Dashboard page.tsx:**
- Title: `text-gray-900`

**Step: Build and commit**

```bash
git add src/components/score-badge.tsx src/components/dashboard/ src/app/page.tsx
git commit -m "feat: Deel-style dashboard — monochrome cards, no shadows"
```

---

### Task 4: Leads List + Lead Detail — Deel Style

**Files:**
- Modify: `src/app/leads/page.tsx`
- Modify: `src/components/leads/leads-filters.tsx`
- Modify: `src/components/leads/leads-table.tsx`
- Modify: `src/app/leads/[id]/page.tsx`
- Modify: `src/components/leads/lead-header.tsx`
- Modify: `src/components/leads/lead-timeline.tsx`
- Modify: `src/components/leads/lead-transcript.tsx`
- Modify: `src/components/leads/lead-facts.tsx`

**Key rules (same as Task 3):**
- Replace all `shadow-*` with `border border-gray-200`
- Remove all gradients
- Primary buttons: `bg-gray-900 text-white rounded-lg hover:bg-gray-800`
- Secondary buttons: `border border-gray-200 text-gray-700 hover:bg-gray-50`
- Table header: `bg-gray-50 text-gray-500 text-xs uppercase tracking-wider`
- Table rows: `hover:bg-gray-50`, dividers `divide-y divide-gray-100`
- Transcript AI bubbles: `bg-gray-50 rounded-lg`
- Transcript Lead bubbles: `bg-white border border-gray-200 rounded-lg`
- Timeline: thin `bg-gray-200` line
- Facts cards: `bg-gray-50 rounded-lg` (not bordered cards)
- Status badges: colored but minimal (like score badges)
- Remove any orange/primary accent from non-scoring elements

**Step: Build and commit**

```bash
git add src/app/leads/ src/components/leads/
git commit -m "feat: Deel-style leads pages — clean table, monochrome detail"
```

---

### Task 5: Calendar — Deel Style

**Files:**
- Modify: `src/app/calendar/page.tsx`
- Modify: `src/components/calendar/calendar-stats.tsx`
- Modify: `src/components/calendar/week-header.tsx`
- Modify: `src/components/calendar/week-grid.tsx`
- Modify: `src/components/calendar/appointment-card.tsx`
- Modify: `src/components/calendar/day-selector.tsx`

**Key rules:**
- Stat cards: `border border-gray-200 rounded-xl` (no shadow)
- Remove gradient icon circles → `bg-gray-100 text-gray-600 rounded-full`
- Grid lines: `border-gray-200`
- Appointment cards: `bg-white border border-gray-200 rounded-lg` with 2px left color stripe
- Day selector: default `bg-gray-100 text-gray-500`, active `bg-gray-900 text-white`
- Week header nav arrows: `text-gray-400 hover:text-gray-700`

**Step: Build and commit**

```bash
git add src/app/calendar/ src/components/calendar/
git commit -m "feat: Deel-style calendar — clean grid, thin borders"
```

---

### Task 6: Settings — Deel Style

**Files:**
- Modify: `src/app/settings/page.tsx`
- Modify: `src/components/settings/profile-section.tsx`
- Modify: `src/components/settings/platforms-section.tsx`
- Modify: `src/components/settings/ai-script-section.tsx`
- Modify: `src/components/settings/alerts-section.tsx`
- Modify: `src/components/settings/plan-section.tsx`
- Modify: `src/components/settings/services-section.tsx`

**Key rules:**
- Tab bar: `text-gray-500` default, active: `text-gray-900 font-semibold border-b-2 border-gray-900`
- Section cards: `border border-gray-200 rounded-xl` (no shadow)
- Form inputs: `border-gray-200`, focus: `border-gray-400 ring-1 ring-gray-200`
- Save buttons: `bg-gray-900 text-white rounded-lg hover:bg-gray-800`
- Remove ALL gradient pills, gradient buttons, `bg-gradient-to-r`, `from-primary to-amber-500`
- Service cards: `border border-gray-200 rounded-xl hover:border-gray-300`
- AI Instructions textarea: `border-l-2 border-gray-300` (gray, not orange)
- Plan price: `text-gray-900 font-semibold` (not orange)

**Step: Build and commit**

```bash
git add src/app/settings/ src/components/settings/
git commit -m "feat: Deel-style settings — monochrome forms and tabs"
```

---

### Task 7: shadcn UI Components — Deel Style

**Files:**
- Modify: `src/components/ui/button.tsx`
- Modify: `src/components/ui/input.tsx`
- Modify: `src/components/ui/switch.tsx`
- Modify: `src/components/ui/select.tsx`
- Modify: `src/components/ui/tabs.tsx`
- Modify: `src/components/ui/card.tsx`
- Modify: `src/components/ui/textarea.tsx`
- Modify: `src/components/ui/table.tsx`
- Modify: `src/components/ui/badge.tsx`
- Modify: `src/components/ui/progress.tsx`

**Key changes for shadcn components:**
- `button.tsx`: default variant — `bg-gray-900 text-white hover:bg-gray-800` (black primary), outline — `border-gray-200 text-gray-700 hover:bg-gray-50`
- `input.tsx`: `bg-white border-gray-200`, focus: `border-gray-400 ring-1 ring-gray-200`
- `textarea.tsx`: same as input
- `select.tsx`: same border style, popover: white + thin border
- `switch.tsx`: unchecked `bg-gray-200`, checked `bg-gray-900` (black)
- `card.tsx`: ensure `border border-gray-200` with NO shadow by default
- `tabs.tsx`: active tab `text-gray-900` (no orange underline), inactive `text-gray-500`
- `progress.tsx`: track `bg-gray-100`, indicator `bg-gray-900`
- `badge.tsx`: default `bg-gray-100 text-gray-700 border-gray-200`

**Step: Build and commit**

```bash
git add src/components/ui/
git commit -m "feat: Deel-style shadcn UI — black primary, thin borders"
```

---

### Task 8: Final Build + Deploy

**Step 1: Full build**

```bash
export PATH="/usr/local/bin:/usr/bin:/bin:$PATH" && cd /Users/kp/Projects/my/inleads/in-leads-app && npm run build
```

Expected: Clean build, all 22 pages generated.

**Step 2: Verify output files exist**

```bash
ls out/index.html out/leads.html out/calendar.html out/settings.html
```

**Step 3: Push to deploy**

```bash
git push origin main
```

Wait for GitHub Actions. Verify all pages on `https://demo.inleads.pro/`.

**Step 4: Final polish if needed**

```bash
git add -A && git commit -m "fix: Deel-style polish tweaks" && git push origin main
```
