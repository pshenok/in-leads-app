# ── Build stage ────────────────────────────────────────────────────────
FROM node:22-slim AS builder

WORKDIR /app

# Copy only frontend package.json — install WITHOUT workspace lockfile
# to get correct platform-specific native binaries (lightningcss, tailwindcss/oxide)
COPY frontend/package.json ./
RUN npm install

# Copy frontend source
COPY frontend/ .

# Build Next.js
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
RUN npm run build

# ── Production stage ──────────────────────────────────────────────────
FROM node:22-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
