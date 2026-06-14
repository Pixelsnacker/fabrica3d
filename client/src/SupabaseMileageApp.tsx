import { useEffect, useState } from "react";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MileageContent, LocalMileageApp } from "@/pages/Kilometerabrechnung";
import { useSupabaseMileage } from "@/lib/useSupabaseMileage";
import {
  getSupabase,
  getSupabaseConfig,
  saveSupabaseConfig,
  clearSupabaseConfig,
  type SupabaseConfig,
} from "@/lib/supabase";
import { Cloud, LogOut, RotateCw, Laptop } from "lucide-react";

/**
 * Einstiegspunkt: entscheidet zwischen Einrichtung, Login und App.
 */
export function SupabaseMileageApp() {
  const [config, setConfig] = useState<SupabaseConfig | null>(getSupabaseConfig());
  const [useLocal, setUseLocal] = useState(false);

  if (useLocal) return <LocalMileageApp />;
  if (!config)
    return (
      <ConfigScreen
        onSaved={cfg => setConfig(cfg)}
        onUseLocal={() => setUseLocal(true)}
      />
    );
  return <AuthGate onReset={() => setConfig(null)} onUseLocal={() => setUseLocal(true)} />;
}

// ---------------------------------------------------------------------------
// Einrichtung: Supabase-Zugangsdaten eingeben
// ---------------------------------------------------------------------------
function ConfigScreen({
  onSaved,
  onUseLocal,
}: {
  onSaved: (cfg: SupabaseConfig) => void;
  onUseLocal: () => void;
}) {
  const [url, setUrl] = useState("");
  const [anonKey, setAnonKey] = useState("");

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" style={{ color: "var(--fabrica-red)" }} />
            Cloud-Speicher einrichten
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Trage die beiden Werte aus deinem Supabase-Projekt ein
            (Project Settings → API). Sie sind nicht geheim und werden nur in
            diesem Browser gespeichert.
          </p>
          <div className="space-y-1.5">
            <Label htmlFor="sb-url">Projekt-URL</Label>
            <Input
              id="sb-url"
              placeholder="https://xxxx.supabase.co"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sb-key">Anon-Schlüssel (public)</Label>
            <Input
              id="sb-key"
              placeholder="eyJhbGciOi…"
              value={anonKey}
              onChange={e => setAnonKey(e.target.value)}
            />
          </div>
          <Button
            className="w-full"
            disabled={!url.trim().startsWith("http") || anonKey.trim().length < 20}
            onClick={() => {
              const cfg = { url: url.trim(), anonKey: anonKey.trim() };
              saveSupabaseConfig(cfg);
              onSaved(cfg);
            }}
          >
            Verbinden
          </Button>
          <button
            className="flex w-full items-center justify-center gap-2 text-sm text-muted-foreground hover:underline"
            onClick={onUseLocal}
          >
            <Laptop className="h-4 w-4" /> Stattdessen nur auf diesem Gerät nutzen
          </button>
        </CardContent>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Anmeldung / Sitzungsverwaltung
// ---------------------------------------------------------------------------
function AuthGate({
  onReset,
  onUseLocal,
}: {
  onReset: () => void;
  onUseLocal: () => void;
}) {
  const client = getSupabase();
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!client) return;
    client.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = client.auth.onAuthStateChange((_e, s) =>
      setSession(s)
    );
    return () => sub.subscription.unsubscribe();
  }, [client]);

  if (!client) {
    return (
      <div className="mx-auto max-w-lg px-4 py-10 text-center">
        <p className="text-sm text-muted-foreground">
          Verbindung nicht möglich.{" "}
          <button className="underline" onClick={onReset}>
            Zugangsdaten ändern
          </button>
        </p>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <RotateCw className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!session) {
    return <LoginScreen client={client} onReset={onReset} onUseLocal={onUseLocal} />;
  }

  return (
    <SignedInApp
      client={client}
      userId={session.user.id}
      email={session.user.email ?? ""}
    />
  );
}

function LoginScreen({
  client,
  onReset,
  onUseLocal,
}: {
  client: SupabaseClient;
  onReset: () => void;
  onUseLocal: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function signIn() {
    setBusy(true);
    const { error } = await client.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) toast.error(error.message);
  }

  async function signUp() {
    setBusy(true);
    const { error } = await client.auth.signUp({ email, password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(
      "Registriert! Falls eine Bestätigungs-E-Mail kommt, bitte den Link anklicken."
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Anmelden</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="login-email">E-Mail</Label>
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="login-pw">Passwort</Label>
            <Input
              id="login-pw"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button className="flex-1" disabled={busy} onClick={signIn}>
              Anmelden
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              disabled={busy}
              onClick={signUp}
            >
              Registrieren
            </Button>
          </div>
          <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
            <button className="hover:underline" onClick={onUseLocal}>
              Ohne Konto nutzen
            </button>
            <button className="hover:underline" onClick={onReset}>
              Zugangsdaten ändern
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SignedInApp({
  client,
  userId,
  email,
}: {
  client: SupabaseClient;
  userId: string;
  email: string;
}) {
  const store = useSupabaseMileage(client, userId);

  const accountSlot = (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span className="hidden sm:inline">{email}</span>
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => client.auth.signOut()}
      >
        <LogOut className="h-4 w-4" /> Abmelden
      </Button>
    </div>
  );

  if (store.loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <RotateCw className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return <MileageContent store={store} accountSlot={accountSlot} />;
}
