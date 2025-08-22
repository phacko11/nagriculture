# landing/Dockerfile
# Build
FROM node:22-bookworm AS builder
WORKDIR /app
ARG NEXT_PUBLIC_API_URL
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY . .
RUN pnpm install 
RUN pnpm build

# Production

FROM node:22-bookworm
WORKDIR /app

ARG NEXT_PUBLIC_API_URL

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules/
COPY --from=builder /app/public ./public/
RUN corepack enable pnpm
CMD ["pnpm", "start -p 3000"]
