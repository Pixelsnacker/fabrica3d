import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SupabaseMileageApp } from "@/SupabaseMileageApp";
import { Car } from "lucide-react";
import "./index.css";

/**
 * Eigenständiger Einstiegspunkt der Kilometerabrechnung.
 * Rendert die App ohne die übrige Unternehmenswebseite – für die
 * Single-File- bzw. PWA-Auslieferung.
 */
function StandaloneApp() {
  return (
    <TooltipProvider>
      <Toaster />
      <div className="min-h-screen bg-[var(--fabrica-gray)] text-foreground">
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
            <Car className="h-6 w-6" style={{ color: "var(--fabrica-red)" }} />
            <span className="font-bold">Fabrica GmbH</span>
            <span className="text-sm text-muted-foreground">
              · Kilometerabrechnung
            </span>
          </div>
        </header>
        <SupabaseMileageApp />
      </div>
    </TooltipProvider>
  );
}

createRoot(document.getElementById("root")!).render(<StandaloneApp />);

// Service Worker für PWA/Offline registrieren – nur über http(s), nicht via file://
if (
  "serviceWorker" in navigator &&
  location.protocol.startsWith("http")
) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {
      /* PWA-Registrierung optional – Fehler ignorieren */
    });
  });
}
