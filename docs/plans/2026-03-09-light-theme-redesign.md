# InLeads Demo — Light Theme Redesign

## Overview

Redesign the InLeads demo app from dark theme to a clean, light, gradient-accented design. Target audience: home services professionals (plumbers, electricians, etc.) who need clarity and simplicity.

**Approach:** "Soft Gradient" — Clean white base with strategic gradient accents on buttons, sidebar, KPI cards. Gradients as seasoning, not the main dish.

## Color Palette

### Base Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--color-background` | `#FAFBFC` | Page background |
| `--color-foreground` | `#0F172A` | Primary text (slate-900) |
| `--color-card` | `#FFFFFF` | Card backgrounds |
| `--color-card-foreground` | `#0F172A` | Card text |
| `--color-secondary` | `#F8FAFC` | Secondary backgrounds |
| `--color-secondary-foreground` | `#0F172A` | Secondary text |
| `--color-muted` | `#F1F5F9` | Muted backgrounds |
| `--color-muted-foreground` | `#64748B` | Labels, descriptions |
| `--color-accent` | `#F8FAFC` | Hover states |
| `--color-accent-foreground` | `#0F172A` | Accent text |

### Primary & Accent
| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#FF6B00` | Primary accent (kept!) |
| `--color-primary-foreground` | `#FFFFFF` | Text on primary |
| Primary gradient | `linear-gradient(135deg, #FF6B00, #FF8C38)` | Buttons, active nav, progress |
| `--color-destructive` | `#DC2626` | Destructive actions |
| `--color-destructive-foreground` | `#FFFFFF` | Text on destructive |

### Borders & Input
| Token | Value | Usage |
|-------|-------|-------|
| `--color-border` | `#E2E8F0` | Card/section borders |
| `--color-input` | `#E2E8F0` | Input borders |
| `--color-ring` | `#FF6B00` | Focus ring |

### Lead Scoring
| Score | Text | Background | Border |
|-------|------|------------|--------|
| HOT | `#DC2626` (red-600) | `#FEF2F2` (red-50) | `#FECACA` (red-200) |
| WARM | `#EA580C` (orange-600) | `#FFF7ED` (orange-50) | `#FED7AA` (orange-200) |
| COLD | `#6B7280` (gray-500) | `#F3F4F6` (gray-100) | `#D1D5DB` (gray-300) |

### Chart Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--color-chart-1` | `#FF6B00` | Primary (orange) |
| `--color-chart-2` | `#DC2626` | HOT bars (red) |
| `--color-chart-3` | `#CBD5E1` | COLD bars (light gray) |
| `--color-chart-4` | `#16A34A` | Positive trends (green) |
| `--color-chart-5` | `#2563EB` | Info (blue) |

## Sidebar

- Background: `#FFFFFF` with right border `#E2E8F0`
- Optional subtle gradient: `linear-gradient(180deg, #FFF7ED 0%, #FFFFFF 100%)`
- Logo: dark text `#0F172A`, Zap icon with orange gradient fill
- Nav items default: text `#64748B`
- Nav active: `background: rgba(255, 107, 0, 0.08)`, text `#FF6B00`, 3px left orange border
- Nav hover: `background: #F8FAFC`
- User area: gradient avatar, "GROWTH PLAN" gradient pill badge

### Sidebar Colors
| Token | Value |
|-------|-------|
| `--color-sidebar-background` | `#FFFFFF` |
| `--color-sidebar-foreground` | `#0F172A` |
| `--color-sidebar-primary` | `#FF6B00` |
| `--color-sidebar-primary-foreground` | `#FFFFFF` |
| `--color-sidebar-accent` | `#F8FAFC` |
| `--color-sidebar-accent-foreground` | `#0F172A` |
| `--color-sidebar-border` | `#E2E8F0` |
| `--color-sidebar-ring` | `#FF6B00` |

## Mobile Nav

- White header with subtle bottom shadow
- Hamburger icon: `#0F172A`
- Slide-out: white sidebar
- Backdrop: `rgba(0, 0, 0, 0.2)`

## Typography

Keep existing fonts:
- **Bebas Neue** — KPI numbers, headings
- **DM Sans** — Body text (excellent readability)
- **JetBrains Mono** — Badges, status indicators

Text colors change:
- Primary text: `#0F172A` (dark slate)
- Secondary text: `#64748B` (gray)
- Muted text: `#94A3B8` (light gray for timestamps)

## Component Design

### KPI Cards
- White `#FFFFFF`, `shadow-sm` (box-shadow: 0 1px 3px rgba(0,0,0,0.08))
- Icon in small circle with gradient background
- Big number: Bebas Neue, `#0F172A`
- Label: DM Sans, `#64748B`
- Trend: green `↑12%` / red `↓5%`

### Bar Chart (Recharts)
- Transparent chart background (white card)
- HOT bars: `#DC2626`
- WARM bars: `#FF6B00`
- COLD bars: `#CBD5E1` (non-competing light gray)
- Grid: `#F1F5F9`
- Tooltip: white with shadow, no dark bg

### Leads Table
- White card wrapper with shadow
- Row hover: `#F8FAFC`
- Filters: white Select/Input, `#E2E8F0` border, focus → orange border
- Score badges: colored pills on light tinted backgrounds

### Lead Detail
- White card header, bold name, badges
- Action buttons: primary = gradient orange, secondary = outline orange
- Timeline: `#E2E8F0` line, colored nodes
- Transcript: AI bubbles `#FFF7ED` (warm), lead bubbles `#F1F5F9` (cool)
- Facts: 2x2 grid white cards with icons

### Calendar
- Week grid: white, lines `#E2E8F0`
- Appointment cards: white with 3px score-colored left border
- Status dots: confirmed=green, pending=orange, completed=gray
- Time slots text: `#94A3B8`

### Settings
- Tab bar: gray text, active = orange with gradient underline
- Forms: white inputs, `#E2E8F0` border, focus → orange
- Services cards: white, hover → shadow, expandable
- AI Instructions textarea: subtle orange left border (kept)
- Switches: gray track → orange gradient when active

## Shadows System

Replace heavy borders with soft shadows:
- `shadow-sm`: `0 1px 2px rgba(0, 0, 0, 0.05)` — subtle
- `shadow`: `0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)` — cards
- `shadow-md`: `0 4px 6px rgba(0, 0, 0, 0.06)` — hover states
- `shadow-lg`: `0 10px 15px rgba(0, 0, 0, 0.06)` — elevated (modals, dropdowns)

## Gradient Utilities

Custom Tailwind classes to add:
- `.bg-gradient-primary`: `linear-gradient(135deg, #FF6B00, #FF8C38)` — buttons, active states
- `.bg-gradient-sidebar`: `linear-gradient(180deg, #FFF7ED 0%, #FFFFFF 100%)` — sidebar
- `.bg-gradient-hot`: `linear-gradient(135deg, #DC2626, #EF4444)` — HOT indicators
- `.text-gradient-primary`: gradient text for logo/headings

## What Changes

1. `globals.css` — all CSS custom properties (colors, shadows)
2. `layout.tsx` — remove `className="dark"` from `<html>`
3. `sidebar.tsx` — light background, updated colors
4. `mobile-nav.tsx` — white header, light overlay
5. `score-badge.tsx` — light background badges
6. `app-layout.tsx` — remove dark-specific classes if any
7. `dashboard/kpi-cards.tsx` — light card styling, gradient icon circles
8. `dashboard/leads-chart.tsx` — light tooltip, updated bar colors
9. `dashboard/recent-leads.tsx` — light hover states
10. `dashboard/activity-feed.tsx` — light timeline colors
11. `leads/page.tsx` — light filter styling
12. `leads/leads-filters.tsx` — white inputs
13. `leads/leads-table.tsx` — light row hovers
14. `leads/lead-header.tsx` — light card, gradient buttons
15. `leads/lead-timeline.tsx` — light line colors
16. `leads/lead-transcript.tsx` — warm/cool bubble colors
17. `leads/lead-facts.tsx` — white fact cards
18. `calendar/page.tsx` — light layout
19. `calendar/week-grid.tsx` — light grid lines
20. `calendar/appointment-card.tsx` — white cards with colored borders
21. `calendar/calendar-stats.tsx` — light stat cards
22. `calendar/week-header.tsx` — dark text on white
23. `calendar/day-selector.tsx` — light pills
24. `settings/page.tsx` — light tab styling
25. `settings/profile-section.tsx` — light form
26. `settings/platforms-section.tsx` — light platform cards
27. `settings/ai-script-section.tsx` — light textareas
28. `settings/alerts-section.tsx` — light switches
29. `settings/plan-section.tsx` — light plan card
30. `settings/services-section.tsx` — light service cards
31. shadcn UI components (`button.tsx`, `input.tsx`, `switch.tsx`, etc.) — remove `dark:` overrides

## What Stays

- All page structure and functionality
- All mock data
- Font families (Bebas Neue, DM Sans, JetBrains Mono)
- Component architecture (same files, same props)
- Sidebar width (w-60) and layout structure
- All responsive breakpoints
- Orange as primary accent color (#FF6B00)
- AWS deploy infrastructure
