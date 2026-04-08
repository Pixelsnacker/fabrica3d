import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);

  // Image proxy: serves CDN images with correct content-type for browser rendering
  app.get('/api/img', async (req, res) => {
    const url = req.query.url as string;
    if (!url || !url.startsWith('https://d2xsxph8kpxj0f.cloudfront.net/')) {
      return res.status(400).send('Invalid URL');
    }
    try {
      const response = await fetch(url);
      if (!response.ok) return res.status(response.status).send('Image not found');
      const buffer = await response.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      // Detect format from magic bytes
      let contentType = 'image/jpeg';
      if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46) {
        contentType = 'image/webp'; // RIFF...WEBP
      } else if (bytes[0] === 0x89 && bytes[1] === 0x50) {
        contentType = 'image/png'; // PNG
      } else if (bytes[0] === 0xFF && bytes[1] === 0xD8) {
        contentType = 'image/jpeg'; // JPEG
      }
      res.set('Content-Type', contentType);
      res.set('Cache-Control', 'public, max-age=86400');
      res.send(Buffer.from(buffer));
    } catch (err) {
      res.status(500).send('Proxy error');
    }
  });
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
