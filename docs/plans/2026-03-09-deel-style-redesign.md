# InLeads — Deel-Style Redesign

## Overview

Full visual redesign of the InLeads demo app to match Deel's ultra-clean, minimal aesthetic. Two major changes: (1) replace sidebar with top navigation bar, (2) adopt Deel's monochrome design language with minimal color accents.

## Top Navigation Bar

Replace the fixed left sidebar (`sidebar.tsx`) with a horizontal top navigation bar.

**Structure:**
```
┌────────────────────────────────────────────────────────────────────┐
│  ⚡ InLeads      🏠 Home   👥 Leads   📅 Calendar   ⚙ Settings    🔔 KP │
└────────────────────────────────────────────────────────────────────┘
```

**Specs:**
- Height: `h-16` (64px)
- Background: `#FFFFFF` with bottom border `1px solid #E5E7EB`
- Position: `fixed top-0` full width, `z-50`
- Left: Logo "InLeads" + Zap icon, text `#111827`
- Center: Nav items — icon + label, spaced evenly
  - Default: `text-gray-500` (`#6B7280`)
  - Active: `text-gray-900` (`#111827`), `font-semibold`
  - Hover: `text-gray-900`
  - No colored indicators, no underlines — just weight change
- Right: Notification bell icon + user avatar (initials circle)

**Mobile (< lg):**
- Logo left + hamburger right
- Hamburger opens dropdown/slide-down menu with nav items
- Simple list, no overlay — like Deel mobile

**Layout change:**
- `app-layout.tsx`: remove `ml-60`, add `mt-16`, content full-width
- `sidebar.tsx`: DELETE (replaced by new `top-nav.tsx`)
- `mobile-nav.tsx`: REWRITE as mobile version of top-nav
- Max content width: `max-w-7xl mx-auto` (centered, like Deel)

## Color Palette — Monochrome

**Base (Deel-style):**
| Token | Value | Usage |
|-------|-------|-------|
| `--color-background` | `#FFFFFF` | Page background |
| `--color-foreground` | `#111827` | Primary text (gray-900) |
| `--color-card` | `#FFFFFF` | Card backgrounds |
| `--color-card-foreground` | `#111827` | Card text |
| `--color-secondary` | `#F9FAFB` | Hover backgrounds (gray-50) |
| `--color-secondary-foreground` | `#111827` | |
| `--color-muted` | `#F3F4F6` | Muted backgrounds (gray-100) |
| `--color-muted-foreground` | `#6B7280` | Secondary text (gray-500) |
| `--color-accent` | `#F9FAFB` | Accent backgrounds (gray-50) |
| `--color-accent-foreground` | `#111827` | |
| `--color-border` | `#E5E7EB` | All borders (gray-200) |
| `--color-input` | `#E5E7EB` | Input borders |
| `--color-ring` | `#111827` | Focus ring (black, not orange) |

**Interactive:**
| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#111827` | Primary buttons, active nav (BLACK) |
| `--color-primary-foreground` | `#FFFFFF` | Text on primary |
| `--color-destructive` | `#DC2626` | Destructive actions |
| `--color-destructive-foreground` | `#FFFFFF` | |

**Accent orange (limited use):**
- `#FF6B00` only for: InLeads logo icon, HOT-adjacent scoring, important CTAs
- Not used for general buttons, nav, borders, or decorative elements

**Lead Scoring (only place with color):**
| Score | Dot | Badge text | Badge bg |
|-------|-----|-----------|----------|
| HOT | `bg-red-500` | `text-red-700` | `bg-red-50` |
| WARM | `bg-orange-500` | `text-orange-700` | `bg-orange-50` |
| COLD | `bg-gray-400` | `text-gray-600` | `bg-gray-100` |

**Chart Colors:**
| Token | Value |
|-------|-------|
| `--color-chart-1` | `#111827` (black) |
| `--color-chart-2` | `#DC2626` (red for HOT) |
| `--color-chart-3` | `#E5E7EB` (light gray for COLD) |
| `--color-chart-4` | `#16A34A` (green) |
| `--color-chart-5` | `#6B7280` (gray) |

## Card Style

Deel uses thin borders, no shadows:
- `border border-gray-200 rounded-xl bg-white`
- Hover: `hover:border-gray-300` (subtle)
- **NO shadows** (`shadow-none`)
- **NO gradients**
- **NO colored borders** (except score indicators)

## Button Style

Following Deel:
- **Primary:** `bg-gray-900 text-white rounded-lg px-4 py-2 hover:bg-gray-800`
- **Secondary:** `border border-gray-200 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-50`
- **Ghost:** `text-gray-500 hover:text-gray-900 hover:bg-gray-50`
- **Accent (rare):** `bg-orange-500 text-white rounded-lg` — only for main CTAs

## Typography

Keep existing fonts but adjust weights:
- **Bebas Neue** — keep for KPI numbers only
- **DM Sans** — body text (same)
- **JetBrains Mono** — badges, code-like elements

Text hierarchy:
- `text-gray-900` (#111827) — headings, primary content
- `text-gray-700` (#374151) — body text
- `text-gray-500` (#6B7280) — labels, secondary
- `text-gray-400` (#9CA3AF) — muted, timestamps

## Page-Specific Design

### Dashboard
- KPI cards: white + thin border, small colored icon in circle (like Deel "Quick actions")
- Bar chart: gray/muted bars, minimal gridlines `#F3F4F6`
- Tooltip: white + thin border + small shadow
- Recent leads: list with thin dividers `divide-y divide-gray-100`
- Activity feed: thin gray timeline line, small colored dots

### Leads Table
- Full-width table inside bordered card
- Header: `bg-gray-50 text-gray-500 text-xs uppercase tracking-wider`
- Rows: `hover:bg-gray-50`, thin dividers
- Score: small colored dot + text, not pill badges
- Filters: thin-border inputs

### Lead Detail
- Clean card sections with thin borders
- Timeline: thin `bg-gray-200` line, small dots
- Transcript: AI = `bg-gray-50 rounded-lg`, Lead = `bg-white border rounded-lg`
- Primary button: black `bg-gray-900`

### Calendar
- Grid: `border-gray-200` lines
- Appointments: white card + thin border + 2px left color stripe
- Time slots: `text-gray-400`
- Stats: same clean card style

### Settings
- Tabs: `text-gray-500` default, active `text-gray-900 border-b-2 border-gray-900`
- Forms: inputs `border-gray-200`, focus `border-gray-400 ring-1 ring-gray-200`
- Save buttons: black primary
- Services cards: clean borders, expandable

## Files Changed

**Delete:**
- `src/components/sidebar.tsx` — replaced by top-nav

**Create:**
- `src/components/top-nav.tsx` — new top navigation component

**Major rewrite:**
- `src/components/mobile-nav.tsx` — rewrite for top-nav mobile version
- `src/components/app-layout.tsx` — remove sidebar, add top-nav, center content
- `src/app/globals.css` — new monochrome tokens

**Update all component files** (same list as light theme, ~30 files):
- Remove gradients, shadows, orange accents
- Apply thin borders, monochrome palette
- Update button styles to black primary

## What Stays

- All page structure and functionality
- All mock data
- Font families
- Component architecture (same props, same logic)
- Responsive breakpoints (adapted for no sidebar)
- AWS deploy infrastructure
