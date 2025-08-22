# backend/Dockerfile

# ---------- Base image ----------
FROM node:20-alpine AS base

RUN corepack enable && corepack prepare pnpm@latest --activate


# ---------- Installer stage ----------
FROM base AS installer

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

WORKDIR /app
COPY . .
COPY .env.production ./.env.production
COPY prisma ./prisma/

RUN pnpm install
RUN pnpm prisma generate
RUN pnpm run build

# copy query engine binary into /tmp
RUN find . -name libquery_engine-linux-musl-openssl-3.0.x.so.node | head -n 1 | xargs -I {} cp {} /tmp/


# ---------- Runner stage ----------
FROM base AS runner

WORKDIR /app

# Copy only necessary files from installer
COPY --from=installer /app ./
COPY --from=installer /tmp/libquery_engine-linux-musl-openssl-3.0.x.so.node ./apps/web/.prisma/client/

EXPOSE 3000

CMD ["pnpm", "start"]
