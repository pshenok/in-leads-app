# InLeads Demo App — Design Document

**Date:** 2026-03-09
**Status:** Approved
**Deploy target:** demo.inleads.pro

## Overview

Frontend-only demo of the InLeads platform with mocked data. Designed to showcase the product UI/UX to potential users and investors. No backend — all data is static JSON.

## Tech Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** + **shadcn/ui**
- **Mock data** in `/lib/mock-data.ts`
- **Deploy:** AWS S3 + CloudFront (static export)

## Design System

Dark theme matching the landing page (inleads.pro):

| Token | Value |
|-------|-------|
| `--bg` | `#080808` |
| `--bg2` | `#0f0f0f` |
| `--bg3` | `#161616` |
| `--amber` | `#FF6B00` |
| `--white` | `#F0EDE8` |
| `--gray` | `#888` |

- **Fonts:** Bebas Neue (headings), DM Sans (body), JetBrains Mono (data/badges)
- **Score colors:** HOT = `#ef4444`, WARM = `#FF6B00`, COLD = `#6b7280`

## Layout

Sidebar navigation (240px, fixed left):

- **Dashboard** — overview + stats
- **Leads** — lead table + detail view
- **Settings** — profile, platforms, AI config, alerts, billing
- Bottom: user avatar + current plan badge

## Pages

### 1. Dashboard (`/`)

- **4 KPI cards:** Total Leads, HOT Leads, Avg Response Time, Conversion Rate
- **Bar chart:** leads per day (last 7 days)
- **Recent Leads:** last 5 leads as cards (name, service, score, time, status)
- **Activity Feed:** timeline of events ("AI called Sarah M.", "Lead scored HOT")

### 2. Leads List (`/leads`)

- **Table columns:** Name, Service, Platform, Score, Status, Response Time, Date
- **Filters:** score (HOT/WARM/COLD), platform, status
- **Search:** by name or service type

### 3. Lead Detail (`/leads/[id]`)

- **Contact info:** name, phone, email, address
- **Score badge:** HOT/WARM/COLD with AI reasoning
- **Timeline:** lead received → AI called → call completed → SMS sent → scored
- **Call transcript:** full AI conversation text
- **Extracted facts:** urgency, budget, competing quotes, property type
- **Actions:** Call Back, Send SMS, Mark as Booked/Lost (mock buttons)

### 4. Settings (`/settings`)

- **Profile:** name, company, phone, email
- **Platforms:** connected platforms with status indicators
- **AI Script:** greeting, questions, tone configuration
- **Alerts:** SMS/email destinations, score thresholds
- **Plan & Billing:** current plan, usage meter

## Mock Data

~15 leads across:
- Services: plumbing, HVAC, electrical, roofing, painting
- Scores: HOT (5), WARM (6), COLD (4)
- Platforms: Thumbtack, Angi, Yelp
- Statuses: New, Called, Qualified, Booked, Lost
- 3 leads with full call transcripts (~20 lines each)

## Deployment

- S3 bucket: `demo.inleads.pro`
- CloudFront distribution with ACM cert (us-east-1)
- Route 53: CNAME/alias `demo.inleads.pro` → CloudFront
- GitHub Actions CI/CD (same pattern as landing page)
