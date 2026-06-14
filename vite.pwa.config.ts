import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

/**
 * Build-Konfiguration für die installierbare PWA-Variante der
 * Kilometerabrechnung (Manifest + Service Worker + Icon, relative Pfade,
 * damit sie auf jedem Host / in jedem Unterverzeichnis läuft).
 *
 *   pnpm exec vite build --config vite.pwa.config.ts
 *   → dist-pwa/   (statisch deploybar, z. B. auf Netlify)
 */
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist-pwa"),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(import.meta.dirname, "client", "standalone.html"),
    },
  },
});
