# ----------------------------
# Stage 1: Builder
# ----------------------------
  FROM node:20-alpine AS builder

  RUN corepack enable && corepack prepare pnpm@latest --activate
  
  WORKDIR /app
  
  COPY package.json pnpm-lock.yaml ./
  RUN pnpm install --frozen-lockfile
  
  COPY . .
  RUN pnpm build
  
  # ----------------------------
  # Stage 2: Production
  # ----------------------------
  FROM node:20-alpine AS production
  
  RUN apk add --no-cache curl
  
  WORKDIR /app
  
  # Create non-root user
  RUN addgroup -g 1001 -S nodejs && \
      adduser -S nextjs -u 1001
  
  # Copy EVERYTHING needed from builder
  COPY --from=builder /app/package.json ./
  COPY --from=builder /app/pnpm-lock.yaml ./
  COPY --from=builder /app/node_modules ./node_modules
  COPY --from=builder /app/.next ./.next
  COPY --from=builder /app/public ./public
  COPY --from=builder /app/next.config.ts ./next.config.ts
  
  # Ownership
  RUN chown -R nextjs:nodejs /app
  USER nextjs
  
  ENV NODE_ENV=production
  ENV PORT=3000
  ENV HOSTNAME=0.0.0.0
  
  EXPOSE 3000
  
  HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:3000 || exit 1
  
  CMD ["pnpm", "start"]
  