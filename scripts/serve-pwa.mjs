// Minimaler statischer Server für die Kilometerabrechnung-PWA.
// Liefert den Build aus dist-pwa/ aus – geeignet für Railway, Render & Co.
// (Railway stellt den Port über die Umgebungsvariable PORT bereit.)
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.resolve(__dirname, "..", "dist-pwa");

const app = express();

// Service Worker nie aggressiv cachen, App-Assets sind hash-versioniert
app.use((req, res, next) => {
  if (req.path === "/sw.js" || req.path.endsWith("manifest.webmanifest")) {
    res.setHeader("Cache-Control", "no-cache");
  }
  next();
});

app.use(express.static(dir, { extensions: ["html"] }));

// Einseitige App: alles auf index.html zurückfallen lassen
app.get("*", (_req, res) => {
  res.sendFile(path.join(dir, "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Kilometerabrechnung-PWA läuft auf Port ${port}`);
});
