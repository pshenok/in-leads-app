# Light Theme Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert the InLeads demo app from dark theme to a clean, light, gradient-accented design optimized for home services professionals.

**Architecture:** Pure CSS/styling change — no functionality changes. All theme tokens live in `globals.css` using CSS custom properties consumed by Tailwind v4. Components use Tailwind utility classes referencing these tokens. Change tokens first, then update hardcoded colors in each component.

**Tech Stack:** Next.js 16 + Tailwind CSS v4 + shadcn/ui (base-nova) + Recharts + Lucide React

**Design doc:** `docs/plans/2026-03-09-light-theme-redesign.md`

**Important context:**
- Node.js is at `/usr/local/bin/node` — prefix commands with `export PATH="/usr/local/bin:$PATH"`
- Project root: `/Users/kp/Projects/my/inleads/in-leads-app`
- No tests exist (frontend-only demo with mocked data) — verify via `npm run build`
- This is a visual-only change. No new components, no new pages, no functionality changes.

---

### Task 1: Core Theme Tokens — globals.css + layout.tsx

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Step 1: Replace all CSS custom properties in globals.css**

Replace the entire `@theme inline { ... }` block in `src/app/globals.css` with light theme values:

```css
@theme inline {
  --color-background: #FAFBFC;
  --color-foreground: #0F172A;
  --color-card: #FFFFFF;
  --color-card-foreground: #0F172A;
  --color-popover: #FFFFFF;
  --color-popover-foreground: #0F172A;
  --color-primary: #FF6B00;
  --color-primary-foreground: #FFFFFF;
  --color-secondary: #F8FAFC;
  --color-secondary-foreground: #0F172A;
  --color-muted: #F1F5F9;
  --color-muted-foreground: #64748B;
  --color-accent: #F8FAFC;
  --color-accent-foreground: #0F172A;
  --color-destructive: #DC2626;
  --color-destructive-foreground: #FFFFFF;
  --color-border: #E2E8F0;
  --color-input: #E2E8F0;
  --color-ring: #FF6B00;
  --color-chart-1: #FF6B00;
  --color-chart-2: #DC2626;
  --color-chart-3: #CBD5E1;
  --color-chart-4: #16A34A;
  --color-chart-5: #2563EB;
  --color-sidebar-background: #FFFFFF;
  --color-sidebar-foreground: #0F172A;
  --color-sidebar-primary: #FF6B00;
  --color-sidebar-primary-foreground: #FFFFFF;
  --color-sidebar-accent: #F8FAFC;
  --color-sidebar-accent-foreground: #0F172A;
  --color-sidebar-border: #E2E8F0;
  --color-sidebar-ring: #FF6B00;

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

**Step 2: Remove dark class from layout.tsx**

In `src/app/layout.tsx`, change:
```tsx
<html lang="en" className="dark">
```
to:
```tsx
<html lang="en">
```

**Step 3: Build to verify tokens compile**

Run: `export PATH="/usr/local/bin:$PATH" && cd /Users/kp/Projects/my/inleads/in-leads-app && npm run build`
Expected: Build succeeds. Pages may look wrong (hardcoded dark colors in components) but no errors.

**Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: switch to light theme tokens and remove dark class"
```

---

### Task 2: Sidebar + Mobile Nav + App Layout

**Files:**
- Modify: `src/components/sidebar.tsx`
- Modify: `src/components/mobile-nav.tsx`
- Modify: `src/components/app-layout.tsx`

**Context:** The sidebar currently has hardcoded dark colors like `bg-[#0a0a0a]`, `text-white`, etc. Mobile nav has similar dark styling. These need to become light.

**Step 1: Rewrite sidebar.tsx**

Key changes in `sidebar.tsx`:
- Replace `bg-[#0a0a0a]` with `bg-white border-r border-border` (white sidebar with right border)
- Replace `text-white` / `text-gray-400` with `text-foreground` / `text-muted-foreground`
- Active nav item: use `bg-primary/8 text-primary border-l-3 border-primary` instead of dark active styles
- Hover: `hover:bg-accent` (maps to #F8FAFC)
- Logo icon: keep orange, text goes dark (`text-foreground`)
- User area at bottom: keep avatar gradient, text goes dark
- "GROWTH PLAN" badge: use `bg-gradient-to-r from-primary to-amber-500 text-white` for gradient pill
- Remove ALL `dark:` prefixed classes

**Step 2: Rewrite mobile-nav.tsx**

Key changes in `mobile-nav.tsx`:
- Top bar: `bg-white/80 backdrop-blur-md border-b border-border` instead of dark
- Hamburger icon: `text-foreground` instead of white
- Overlay backdrop: `bg-black/20` instead of heavy dark overlay
- Slide-out panel: same styling as sidebar (white bg)
- Remove ALL `dark:` prefixed classes

**Step 3: Update app-layout.tsx if needed**

- Ensure no hardcoded dark bg classes exist
- Background should come from `bg-background` (inherits from body)
- Remove ALL `dark:` prefixed classes

**Step 4: Build to verify**

Run: `export PATH="/usr/local/bin:$PATH" && cd /Users/kp/Projects/my/inleads/in-leads-app && npm run build`
Expected: Build succeeds

**Step 5: Commit**

```bash
git add src/components/sidebar.tsx src/components/mobile-nav.tsx src/components/app-layout.tsx
git commit -m "feat: light theme sidebar, mobile nav, app layout"
```

---

### Task 3: Score Badge + Dashboard Components

**Files:**
- Modify: `src/components/score-badge.tsx`
- Modify: `src/components/dashboard/kpi-cards.tsx`
- Modify: `src/components/dashboard/leads-chart.tsx`
- Modify: `src/components/dashboard/recent-leads.tsx`
- Modify: `src/components/dashboard/activity-feed.tsx`
- Modify: `src/app/page.tsx` (dashboard page)

**Step 1: Update score-badge.tsx**

Replace the dark-mode badge styles with light-mode:
```tsx
const scoreStyles: Record<LeadScore, string> = {
  HOT: "bg-red-50 text-red-600 border-red-200",
  WARM: "bg-orange-50 text-orange-600 border-orange-200",
  COLD: "bg-gray-100 text-gray-500 border-gray-300",
};
```

**Step 2: Update kpi-cards.tsx**

- Cards: `bg-card shadow-sm` instead of `bg-card border-border`
- Replace any `text-white` or `text-gray-*` with semantic `text-foreground` / `text-muted-foreground`
- Icon circles: add small gradient circle `bg-gradient-to-br from-primary to-amber-500 text-white rounded-full p-2`
- KPI numbers: `text-foreground` (dark on light)
- Trend colors: green `text-green-600` for positive, red `text-red-600` for negative

**Step 3: Update leads-chart.tsx**

- Chart container: `bg-card shadow-sm` card wrapper
- Remove any dark tooltip styling. Tooltip: `contentStyle={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.06)" }}`
- Bar colors: HOT = `#DC2626`, WARM = `#FF6B00`, COLD = `#CBD5E1`
- Grid/axis: `stroke="#F1F5F9"`, tick fill `#64748B`
- Label text: `fill="#64748B"`

**Step 4: Update recent-leads.tsx**

- Cards: `bg-card shadow-sm hover:shadow-md transition-shadow`
- Text colors: names `text-foreground`, details `text-muted-foreground`
- Remove dark-specific colors

**Step 5: Update activity-feed.tsx**

- Timeline line: `bg-border` (maps to #E2E8F0)
- Event dots: colored by type (green for response, orange for new lead, blue for booking)
- Text: `text-foreground` for message, `text-muted-foreground` for time
- Remove dark-specific colors

**Step 6: Update page.tsx (dashboard)**

- Section titles: `text-foreground`
- Any hardcoded colors → semantic tokens
- Heading text should be dark

**Step 7: Build and verify**

Run: `export PATH="/usr/local/bin:$PATH" && cd /Users/kp/Projects/my/inleads/in-leads-app && npm run build`

**Step 8: Commit**

```bash
git add src/components/score-badge.tsx src/components/dashboard/ src/app/page.tsx
git commit -m "feat: light theme dashboard, KPI cards, chart, score badges"
```

---

### Task 4: Leads List + Lead Detail Components

**Files:**
- Modify: `src/app/leads/page.tsx`
- Modify: `src/components/leads/leads-filters.tsx`
- Modify: `src/components/leads/leads-table.tsx`
- Modify: `src/app/leads/[id]/page.tsx`
- Modify: `src/components/leads/lead-header.tsx`
- Modify: `src/components/leads/lead-timeline.tsx`
- Modify: `src/components/leads/lead-transcript.tsx`
- Modify: `src/components/leads/lead-facts.tsx`

**Step 1: Update leads/page.tsx**

- Page title: `text-foreground`
- Any bg overrides → semantic tokens

**Step 2: Update leads-filters.tsx**

- Filter selects/inputs: ensure they use standard `bg-card border-input` styling
- Remove any `dark:` classes or hardcoded dark colors
- Focus state: `focus:ring-primary focus:border-primary`

**Step 3: Update leads-table.tsx**

- Table wrapper: `bg-card shadow-sm rounded-xl`
- Header row: `bg-muted` (maps to #F1F5F9)
- Row hover: `hover:bg-accent` (maps to #F8FAFC)
- Text: `text-foreground` for names, `text-muted-foreground` for secondary data
- Remove any hardcoded dark colors

**Step 4: Update lead detail page (leads/[id]/page.tsx)**

- Back button text: `text-muted-foreground hover:text-foreground`
- Any dark overrides → semantic

**Step 5: Update lead-header.tsx**

- Card: `bg-card shadow-sm`
- Name: `text-foreground`
- Contact info: `text-muted-foreground`
- Primary action button: `bg-gradient-to-r from-primary to-amber-500 text-white`
- Secondary button: `border border-primary text-primary hover:bg-primary/5`

**Step 6: Update lead-timeline.tsx**

- Vertical line: `bg-border` (#E2E8F0)
- Time labels: `text-muted-foreground`
- Event details: `text-foreground`
- Colored dots: keep event-type colors but on light bg

**Step 7: Update lead-transcript.tsx**

- AI bubbles: `bg-orange-50 text-foreground` (warm tint)
- Lead bubbles: `bg-muted text-foreground` (cool gray)
- Speaker labels: `text-muted-foreground`
- Timestamps: `text-muted-foreground text-xs`

**Step 8: Update lead-facts.tsx**

- Fact cards: `bg-card shadow-sm` or `bg-muted rounded-lg`
- Labels: `text-muted-foreground`
- Values: `text-foreground font-semibold`
- Icons: `text-primary`

**Step 9: Build and verify**

Run: `export PATH="/usr/local/bin:$PATH" && cd /Users/kp/Projects/my/inleads/in-leads-app && npm run build`

**Step 10: Commit**

```bash
git add src/app/leads/ src/components/leads/
git commit -m "feat: light theme leads list and lead detail pages"
```

---

### Task 5: Calendar Components

**Files:**
- Modify: `src/app/calendar/page.tsx`
- Modify: `src/components/calendar/calendar-stats.tsx`
- Modify: `src/components/calendar/week-header.tsx`
- Modify: `src/components/calendar/week-grid.tsx`
- Modify: `src/components/calendar/appointment-card.tsx`
- Modify: `src/components/calendar/day-selector.tsx`

**Step 1: Update calendar/page.tsx**

- Title: `text-foreground`
- Remove any dark hardcoded colors

**Step 2: Update calendar-stats.tsx**

- Stat cards: `bg-card shadow-sm`
- Numbers: `text-foreground`
- Labels: `text-muted-foreground`
- Icons: gradient circles like KPI cards

**Step 3: Update week-header.tsx**

- Background: `bg-card` or transparent
- Day labels: `text-foreground` / `text-muted-foreground`
- Nav arrows: `text-muted-foreground hover:text-foreground`
- Date range text: `text-foreground`

**Step 4: Update week-grid.tsx**

- Grid lines: `border-border` (#E2E8F0)
- Time labels: `text-muted-foreground`
- Hour row backgrounds: alternating white / `bg-muted/30`
- Today column highlight: `bg-primary/3`

**Step 5: Update appointment-card.tsx**

- Card: `bg-card shadow-sm` with 3px left border colored by lead score
- Score-colored left border: HOT = `border-l-red-500`, WARM = `border-l-orange-500`, COLD = `border-l-gray-400`
- Text: `text-foreground` for name, `text-muted-foreground` for details
- Status dots: confirmed = `bg-green-500`, pending = `bg-orange-500`, completed = `bg-gray-400`

**Step 6: Update day-selector.tsx**

- Day pills: `bg-muted text-muted-foreground` default, active = `bg-primary text-white`
- Today indicator: subtle underline or dot

**Step 7: Build and verify**

Run: `export PATH="/usr/local/bin:$PATH" && cd /Users/kp/Projects/my/inleads/in-leads-app && npm run build`

**Step 8: Commit**

```bash
git add src/app/calendar/ src/components/calendar/
git commit -m "feat: light theme calendar page and components"
```

---

### Task 6: Settings Components

**Files:**
- Modify: `src/app/settings/page.tsx`
- Modify: `src/components/settings/profile-section.tsx`
- Modify: `src/components/settings/platforms-section.tsx`
- Modify: `src/components/settings/ai-script-section.tsx`
- Modify: `src/components/settings/alerts-section.tsx`
- Modify: `src/components/settings/plan-section.tsx`
- Modify: `src/components/settings/services-section.tsx`

**Step 1: Update settings/page.tsx**

- Tab bar: `text-muted-foreground` default, active tab `text-primary` with gradient underline
- Title: `text-foreground`

**Step 2: Update profile-section.tsx**

- Card: `bg-card shadow-sm`
- Labels: `text-muted-foreground`
- Inputs: `bg-card border-input` (standard shadcn styling should now work with light tokens)
- Save button: `bg-gradient-to-r from-primary to-amber-500 text-white`

**Step 3: Update platforms-section.tsx**

- Platform cards: `bg-card shadow-sm`
- Connected status: `text-green-600`
- Pending status: `text-orange-600`
- Platform icons/logos: keep existing colors
- Remove dark bg overrides

**Step 4: Update ai-script-section.tsx**

- Textareas: standard light input styling
- Section headers: `text-foreground`
- Helper text: `text-muted-foreground`

**Step 5: Update alerts-section.tsx**

- Card: `bg-card shadow-sm`
- Switch: should auto-update via theme tokens (orange when active from shadcn styling)
- Labels: `text-foreground`, descriptions: `text-muted-foreground`

**Step 6: Update plan-section.tsx**

- Plan card: `bg-card shadow-sm`
- Plan name: `text-foreground`
- Price: `text-primary` or gradient text
- Progress bar: `bg-muted` track, `bg-primary` fill
- Usage text: `text-muted-foreground`

**Step 7: Update services-section.tsx**

- Service cards: `bg-card shadow-sm hover:shadow-md`
- Service name: `text-foreground`
- Price: `text-primary`
- AI Instructions textarea: keep orange left border `border-l-2 border-primary`
- Expand/collapse: `text-muted-foreground`
- Remove dark overrides

**Step 8: Build and verify**

Run: `export PATH="/usr/local/bin:$PATH" && cd /Users/kp/Projects/my/inleads/in-leads-app && npm run build`

**Step 9: Commit**

```bash
git add src/app/settings/ src/components/settings/
git commit -m "feat: light theme settings page and all sections"
```

---

### Task 7: shadcn UI Components Cleanup

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
- Modify: `src/components/ui/avatar.tsx`
- Modify: `src/components/ui/label.tsx`
- Modify: `src/components/ui/scroll-area.tsx`
- Modify: `src/components/ui/separator.tsx`

**Context:** shadcn components use `dark:` prefixed classes. Since we removed `className="dark"` from html, the `dark:` variants no longer apply. We should clean them up so only light-mode styles remain, and ensure all components look correct.

**Step 1: Update each shadcn component**

For ALL files in `src/components/ui/`:
- Remove all `dark:` prefixed classes (they're dead code now)
- Ensure remaining classes use semantic tokens: `bg-background`, `bg-card`, `text-foreground`, `border-border`, etc.
- For `button.tsx`: the outline variant should use `border-input` and `hover:bg-accent`
- For `input.tsx`: `bg-card border-input`, focus: `focus:border-ring`
- For `switch.tsx`: unchecked = `bg-input`, checked = `bg-primary`
- For `select.tsx`: trigger `bg-card border-input`, popover `bg-card shadow-lg`
- For `tabs.tsx`: trigger `text-muted-foreground data-[state=active]:text-foreground`

**Step 2: Build and verify**

Run: `export PATH="/usr/local/bin:$PATH" && cd /Users/kp/Projects/my/inleads/in-leads-app && npm run build`

**Step 3: Commit**

```bash
git add src/components/ui/
git commit -m "feat: clean up shadcn UI components for light theme"
```

---

### Task 8: Final Polish + Build + Deploy

**Files:**
- Possibly tweak any component that looks off

**Step 1: Full build**

Run: `export PATH="/usr/local/bin:$PATH" && cd /Users/kp/Projects/my/inleads/in-leads-app && npm run build`
Expected: Clean build, no errors, all pages generated.

**Step 2: Visual spot-check via curl**

Verify key pages render HTML (no blank pages):
```bash
# Check that output files exist
ls -la out/index.html out/leads.html out/calendar.html out/settings.html
```

**Step 3: Push to deploy**

```bash
git push origin main
```

Wait for GitHub Actions to complete, then verify:
- `https://demo.inleads.pro/` — Dashboard with light theme
- `https://demo.inleads.pro/leads` — Leads table
- `https://demo.inleads.pro/calendar` — Calendar
- `https://demo.inleads.pro/settings` — Settings

**Step 4: Final commit if any polish needed**

```bash
git add -A
git commit -m "fix: light theme polish tweaks"
git push origin main
```
