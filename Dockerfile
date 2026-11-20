# Site vitrine ImmoTopia : image de production (Next.js standalone)

FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# Le script « prepare » (hooks git d'acc-standard) doit exister ici : hors dépôt git, il ne fait rien
COPY scripts/install-git-hooks.cjs scripts/
# « npm install » plutôt que « npm ci » : le lockfile généré sous Windows omet des dépendances optionnelles Linux
RUN npm install --no-audit --no-fund

FROM node:24-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Les variables NEXT_PUBLIC_* sont figées dans le code au moment du build
ARG NEXT_PUBLIC_BOOKING_URL
ENV NEXT_PUBLIC_BOOKING_URL=$NEXT_PUBLIC_BOOKING_URL
ARG GIT_COMMIT_SHA
ENV GIT_COMMIT_SHA=$GIT_COMMIT_SHA
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:24-alpine AS runner
ARG GIT_COMMIT_SHA
LABEL org.opencontainers.image.revision=$GIT_COMMIT_SHA
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs && mkdir -p /app/data && chown nextjs:nextjs /app/data
COPY --from=build --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nextjs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nextjs /app/public ./public
RUN mkdir -p /app/data/seo-business-outbox && chown nextjs:nextjs /app/data/seo-business-outbox
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]

