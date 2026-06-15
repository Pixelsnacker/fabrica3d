# Dockerfile für die VOLLE fabrica3d-App (Express + tRPC + DB).
# Enthält den Produktdatenblatt-Konfigurator inkl. Permanentlink-Sync.
# (Das bestehende ./Dockerfile bleibt für die Kilometerabrechnung-PWA bestehen.)
#
# Railway-Service einrichten:
#   - Build: Dockerfile = Dockerfile.app
#   - Variablen: DATABASE_URL (MySQL), JWT_SECRET, ggf. BUILT_IN_FORGE_API_URL/KEY,
#     OAUTH_SERVER_URL, OWNER_OPEN_ID
#   - Beim Start werden Migrationen automatisch angewendet.
FROM node:22-slim

WORKDIR /app

RUN corepack enable

# Abhängigkeiten (Lockfile zuerst für besseres Caching)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Quellcode kopieren und Full-App bauen (Client → dist/public, Server → dist/index.js)
COPY . .
RUN pnpm build

ENV NODE_ENV=production
# Railway setzt PORT automatisch; Standard 3000
EXPOSE 3000

# Migrationen anwenden, dann Server starten
CMD ["sh", "-c", "node scripts/migrate.mjs && pnpm start"]
