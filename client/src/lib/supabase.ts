/**
 * Supabase-Anbindung für die Kilometerabrechnung.
 *
 * Die Zugangsdaten (Projekt-URL + öffentlicher "anon"-Schlüssel) sind nicht
 * geheim und werden im Browser (localStorage) hinterlegt – so muss niemand
 * Schlüssel im Code fest verdrahten und die App bleibt eine statische Seite.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const CONFIG_KEY = "fabrica-km-supabase-config";

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export function getSupabaseConfig(): SupabaseConfig | null {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (!raw) return null;
    const cfg = JSON.parse(raw) as SupabaseConfig;
    if (cfg.url && cfg.anonKey)
      return {
        url: cfg.url.trim().replace(/\/+$/, ""),
        anonKey: cfg.anonKey.trim(),
      };
    return null;
  } catch {
    return null;
  }
}

export function saveSupabaseConfig(cfg: SupabaseConfig) {
  const cleaned: SupabaseConfig = {
    // URL säubern: Leerzeichen weg, kein abschließender Schrägstrich
    url: cfg.url.trim().replace(/\/+$/, ""),
    anonKey: cfg.anonKey.trim(),
  };
  localStorage.setItem(CONFIG_KEY, JSON.stringify(cleaned));
}

export function clearSupabaseConfig() {
  localStorage.removeItem(CONFIG_KEY);
}

let client: SupabaseClient | null = null;
let clientKey = "";

/** Liefert den Supabase-Client (oder null, wenn noch nicht konfiguriert). */
export function getSupabase(): SupabaseClient | null {
  const cfg = getSupabaseConfig();
  if (!cfg) return null;
  const key = `${cfg.url}|${cfg.anonKey}`;
  if (!client || clientKey !== key) {
    client = createClient(cfg.url, cfg.anonKey, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
    clientKey = key;
  }
  return client;
}
