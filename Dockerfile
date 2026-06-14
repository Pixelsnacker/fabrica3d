# Dockerfile für die Kilometerabrechnung-PWA (Deployment auf Railway o. Ä.)
# Baut die statische PWA und liefert sie über einen kleinen Node-Server aus.
FROM node:22-slim

WORKDIR /app

# pnpm über corepack bereitstellen
RUN corepack enable

# Abhängigkeiten installieren (Lockfile zuerst für besseres Caching)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Projektdateien kopieren und PWA bauen
COPY . .
RUN pnpm build:pwa

ENV NODE_ENV=production
# Railway setzt PORT automatisch; lokal Standard 8080
EXPOSE 8080

CMD ["pnpm", "start:pwa"]
