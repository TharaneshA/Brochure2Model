# Use a Node.js 18 image as the base
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json pnpm-lock.yaml ./ 
RUN npm install -g pnpm && pnpm store prune && pnpm install --frozen-lockfile

# Build the Next.js application
FROM deps AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build
RUN ls -l /app/.next/standalone

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./ 
COPY --from=builder /app/node_modules ./node_modules 
COPY --from=builder /app/.next/static ./.next/static


USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "./server.js"]