import { useMemo, useRef, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { usePageMeta } from "@/hooks/usePageMeta";
import {
  AddressAutocomplete,
  type SavedAddressOption,
} from "@/components/mileage/AddressAutocomplete";
import {
  SignaturePad,
  type SignaturePadHandle,
} from "@/components/mileage/SignaturePad";
import {
  useMileageStore,
  type MileageSettings,
  type Trip,
} from "@/lib/mileageStore";
import { routeDistanceKm, searchAddresses } from "@/lib/osm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Car,
  Plus,
  Trash2,
  Pencil,
  Star,
  Settings as SettingsIcon,
  Printer,
  Calculator,
  RotateCw,
  X,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Hilfsfunktionen
// ---------------------------------------------------------------------------
const eur = (n: number) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(n);

const fmtKm = (n: number) =>
  new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(n);

function currentMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function monthLabel(month: string) {
  const [y, m] = month.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("de-DE", {
    month: "long",
    year: "numeric",
  });
}

function formatDate(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("de-DE");
}

// Gemeinsame Suchfunktion für alle Adressfelder (OpenStreetMap / Nominatim)
const addressSearch = (q: string, signal: AbortSignal) =>
  searchAddresses(q, signal);

interface TripForm {
  id?: string;
  tripDate: string;
  purpose: string;
  startAddress: string;
  endAddress: string;
  roundTrip: boolean;
  distanceKm: string;
  note: string;
}

const emptyForm = (start = ""): TripForm => ({
  tripDate: today(),
  purpose: "",
  startAddress: start,
  endAddress: "",
  roundTrip: true,
  distanceKm: "",
  note: "",
});

// ---------------------------------------------------------------------------
// Seite
// ---------------------------------------------------------------------------
export default function Kilometerabrechnung() {
  usePageMeta({
    titleDe: "Kilometerabrechnung",
    titleEn: "Mileage Report",
    descriptionDe:
      "Monatliche Kilometerabrechnung für dienstliche Fahrten – mit Adresssuche, Streckenberechnung und PDF-Ausdruck.",
    descriptionEn:
      "Monthly mileage report for business trips – with address search, distance calculation and PDF export.",
  });
  return (
    <PageLayout className="bg-[var(--fabrica-gray)]">
      <MileageContent />
    </PageLayout>
  );
}

/**
 * Eigentlicher Inhalt der Kilometerabrechnung – ohne Seiten-Layout,
 * damit er auch in der eigenständigen Single-File-Variante genutzt werden kann.
 */
export function MileageContent() {
  const store = useMileageStore();
  const { trips, addresses, settings } = store;
  const rate = settings.ratePerKm || 0.3;

  const [month, setMonth] = useState(currentMonth());
  const [form, setForm] = useState<TripForm>(emptyForm());
  const [calculating, setCalculating] = useState(false);
  const [addressDialog, setAddressDialog] = useState(false);
  const [settingsDialog, setSettingsDialog] = useState(false);
  const [reportDialog, setReportDialog] = useState(false);

  const monthTrips = useMemo(
    () =>
      trips
        .filter(t => t.tripDate.startsWith(month))
        .sort((a, b) => b.tripDate.localeCompare(a.tripDate)),
    [trips, month]
  );

  const totals = useMemo(() => {
    let totalKm = 0;
    let amount = 0;
    for (const t of monthTrips) {
      const base = t.distanceKm * (t.roundTrip ? 2 : 1);
      totalKm += base;
      amount += base * t.ratePerKm;
    }
    return { totalKm, amount };
  }, [monthTrips]);

  const savedOptions: SavedAddressOption[] = addresses;

  // -- Streckenberechnung --------------------------------------------------
  async function calcDistance() {
    if (
      form.startAddress.trim().length < 3 ||
      form.endAddress.trim().length < 3
    ) {
      toast.error("Bitte Start- und Zieladresse angeben.");
      return;
    }
    setCalculating(true);
    try {
      const res = await routeDistanceKm(form.startAddress, form.endAddress);
      setForm(f => ({ ...f, distanceKm: String(res.distanceKm) }));
      toast.success(
        `Strecke: ${fmtKm(res.distanceKm)} km (ca. ${res.durationMin} min)`
      );
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Berechnung fehlgeschlagen.");
    } finally {
      setCalculating(false);
    }
  }

  function submitTrip() {
    const distance = Number(form.distanceKm.replace(",", "."));
    if (!form.purpose.trim()) return toast.error("Bitte einen Fahrtgrund angeben.");
    if (!form.startAddress.trim() || !form.endAddress.trim())
      return toast.error("Bitte Start- und Zieladresse angeben.");
    if (!Number.isFinite(distance) || distance <= 0)
      return toast.error("Bitte eine gültige Strecke (km) angeben oder berechnen.");

    const payload = {
      tripDate: form.tripDate,
      purpose: form.purpose.trim(),
      startAddress: form.startAddress.trim(),
      endAddress: form.endAddress.trim(),
      roundTrip: form.roundTrip,
      distanceKm: distance,
      ratePerKm: rate,
      note: form.note.trim() || undefined,
    };

    if (form.id) {
      store.updateTrip(form.id, payload);
      toast.success("Fahrt aktualisiert.");
    } else {
      store.addTrip(payload);
      toast.success("Fahrt gespeichert.");
    }
    setForm(emptyForm(settings.defaultStartAddress));
  }

  function editTrip(t: Trip) {
    setForm({
      id: t.id,
      tripDate: t.tripDate,
      purpose: t.purpose,
      startAddress: t.startAddress,
      endAddress: t.endAddress,
      roundTrip: t.roundTrip,
      distanceKm: String(t.distanceKm),
      note: t.note ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const editing = Boolean(form.id);
  const previewKm =
    Number(form.distanceKm.replace(",", ".")) * (form.roundTrip ? 2 : 1);

  return (
    <>
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Kopf */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <Car className="h-8 w-8" style={{ color: "var(--fabrica-red)" }} />
            <div>
              <h1 className="text-2xl font-bold leading-tight">
                Kilometerabrechnung
              </h1>
              <p className="text-sm text-muted-foreground">
                Dienstfahrten erfassen und monatlich an die Fabrica GmbH
                abrechnen
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setAddressDialog(true)}
            >
              <Star className="h-4 w-4" /> Adressen
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setSettingsDialog(true)}
            >
              <SettingsIcon className="h-4 w-4" /> Einstellungen
            </Button>
          </div>
        </div>

        {/* Erfassungsformular */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Plus className="h-5 w-5" />
              {editing ? "Fahrt bearbeiten" : "Neue Fahrt erfassen"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="tripDate">Datum</Label>
                <Input
                  id="tripDate"
                  type="date"
                  value={form.tripDate}
                  onChange={e =>
                    setForm(f => ({ ...f, tripDate: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="purpose">Grund der Fahrt</Label>
                <Input
                  id="purpose"
                  placeholder="z. B. Kundentermin Müller GmbH"
                  value={form.purpose}
                  onChange={e =>
                    setForm(f => ({ ...f, purpose: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Startadresse</Label>
                <AddressAutocomplete
                  value={form.startAddress}
                  onChange={v => setForm(f => ({ ...f, startAddress: v }))}
                  searchFn={addressSearch}
                  saved={savedOptions}
                  placeholder="Start eingeben…"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Zieladresse</Label>
                <AddressAutocomplete
                  value={form.endAddress}
                  onChange={v => setForm(f => ({ ...f, endAddress: v }))}
                  searchFn={addressSearch}
                  saved={savedOptions}
                  placeholder="Ziel eingeben…"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-end gap-4">
              <label className="flex cursor-pointer items-center gap-2 pb-2 text-sm">
                <Checkbox
                  checked={form.roundTrip}
                  onCheckedChange={c =>
                    setForm(f => ({ ...f, roundTrip: Boolean(c) }))
                  }
                />
                Hin- und Rückfahrt
              </label>

              <div className="space-y-1.5">
                <Label htmlFor="distance">Strecke (einfach, km)</Label>
                <Input
                  id="distance"
                  inputMode="decimal"
                  className="w-36"
                  placeholder="0,0"
                  value={form.distanceKm}
                  onChange={e =>
                    setForm(f => ({ ...f, distanceKm: e.target.value }))
                  }
                />
              </div>

              <Button
                type="button"
                variant="secondary"
                className="gap-2"
                onClick={calcDistance}
                disabled={calculating}
              >
                {calculating ? (
                  <RotateCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Calculator className="h-4 w-4" />
                )}
                Strecke berechnen
              </Button>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="note">Notiz (optional)</Label>
              <Input
                id="note"
                value={form.note}
                onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
              />
            </div>

            {form.distanceKm && previewKm > 0 && (
              <p className="text-sm text-muted-foreground">
                Berechnet: <strong>{fmtKm(previewKm)} km</strong> × {eur(rate)}{" "}
                ={" "}
                <strong style={{ color: "var(--fabrica-red)" }}>
                  {eur(previewKm * rate)}
                </strong>
              </p>
            )}

            <div className="flex gap-2">
              <Button onClick={submitTrip} className="gap-2">
                <Plus className="h-4 w-4" />
                {editing ? "Änderungen speichern" : "Fahrt hinzufügen"}
              </Button>
              {editing && (
                <Button
                  variant="ghost"
                  onClick={() => setForm(emptyForm(settings.defaultStartAddress))}
                >
                  Abbrechen
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Monatsauswahl + Summe */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="month" className="text-sm">
              Abrechnungsmonat:
            </Label>
            <Input
              id="month"
              type="month"
              className="w-44"
              value={month}
              onChange={e => setMonth(e.target.value)}
            />
          </div>
          <Button
            className="gap-2"
            style={{ backgroundColor: "var(--fabrica-red)" }}
            onClick={() => setReportDialog(true)}
            disabled={monthTrips.length === 0}
          >
            <Printer className="h-4 w-4" /> Abrechnung / PDF erstellen
          </Button>
        </div>

        {/* Fahrtenliste */}
        <Card>
          <CardContent className="p-0">
            {monthTrips.length === 0 ? (
              <p className="p-8 text-center text-sm text-muted-foreground">
                Noch keine Fahrten für {monthLabel(month)} erfasst.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="p-3 font-medium">Datum</th>
                      <th className="p-3 font-medium">Grund / Strecke</th>
                      <th className="p-3 text-center font-medium">H/R</th>
                      <th className="p-3 text-right font-medium">km</th>
                      <th className="p-3 text-right font-medium">Betrag</th>
                      <th className="p-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {monthTrips.map(t => {
                      const tripKm = t.distanceKm * (t.roundTrip ? 2 : 1);
                      return (
                        <tr key={t.id} className="border-b last:border-0">
                          <td className="whitespace-nowrap p-3 align-top">
                            {formatDate(t.tripDate)}
                          </td>
                          <td className="p-3 align-top">
                            <div className="font-medium">{t.purpose}</div>
                            <div className="text-xs text-muted-foreground">
                              {t.startAddress} → {t.endAddress}
                            </div>
                          </td>
                          <td className="p-3 text-center align-top">
                            {t.roundTrip ? "Ja" : "Nein"}
                          </td>
                          <td className="whitespace-nowrap p-3 text-right align-top">
                            {fmtKm(tripKm)}
                          </td>
                          <td className="whitespace-nowrap p-3 text-right align-top font-medium">
                            {eur(tripKm * t.ratePerKm)}
                          </td>
                          <td className="whitespace-nowrap p-3 text-right align-top">
                            <button
                              className="mr-1 rounded p-1.5 text-muted-foreground hover:bg-accent"
                              onClick={() => editTrip(t)}
                              title="Bearbeiten"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              className="rounded p-1.5 text-destructive hover:bg-destructive/10"
                              onClick={() => {
                                store.deleteTrip(t.id);
                                toast.success("Fahrt gelöscht.");
                              }}
                              title="Löschen"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 font-semibold">
                      <td className="p-3" colSpan={3}>
                        Summe {monthLabel(month)}
                      </td>
                      <td className="p-3 text-right">{fmtKm(totals.totalKm)}</td>
                      <td
                        className="p-3 text-right"
                        style={{ color: "var(--fabrica-red)" }}
                      >
                        {eur(totals.amount)}
                      </td>
                      <td />
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Deine Daten werden ausschließlich lokal in diesem Browser gespeichert.
        </p>
      </div>

      <AddressManagerDialog
        open={addressDialog}
        onOpenChange={setAddressDialog}
        saved={savedOptions}
        onAdd={(label, address) => store.addAddress({ label, address })}
        onDelete={id => store.deleteAddress(id)}
      />
      <SettingsDialog
        open={settingsDialog}
        onOpenChange={setSettingsDialog}
        initial={settings}
        onSave={s => {
          store.saveSettings(s);
          toast.success("Einstellungen gespeichert.");
        }}
      />
      <ReportDialog
        open={reportDialog}
        onOpenChange={setReportDialog}
        month={month}
        trips={monthTrips}
        totals={totals}
        rate={rate}
        settings={settings}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Dialog: Gespeicherte Adressen verwalten
// ---------------------------------------------------------------------------
function AddressManagerDialog({
  open,
  onOpenChange,
  saved,
  onAdd,
  onDelete,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  saved: SavedAddressOption[];
  onAdd: (label: string, address: string) => void;
  onDelete: (id: string) => void;
}) {
  const [label, setLabel] = useState("");
  const [address, setAddress] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Gespeicherte Adressen</DialogTitle>
          <DialogDescription>
            Häufig angefahrene Adressen für die Schnellauswahl bei der
            Fahrterfassung.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-64 space-y-2 overflow-auto">
          {saved.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Noch keine Adressen gespeichert.
            </p>
          )}
          {saved.map(s => (
            <div
              key={s.id}
              className="flex items-start justify-between gap-2 rounded-md border p-2"
            >
              <div className="min-w-0">
                <div className="font-medium">{s.label}</div>
                <div className="truncate text-xs text-muted-foreground">
                  {s.address}
                </div>
              </div>
              <button
                className="rounded p-1.5 text-destructive hover:bg-destructive/10"
                onClick={() => onDelete(s.id)}
                title="Löschen"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-3 border-t pt-4">
          <div className="space-y-1.5">
            <Label htmlFor="addr-label">Bezeichnung</Label>
            <Input
              id="addr-label"
              placeholder="z. B. Büro, Kunde Müller GmbH"
              value={label}
              onChange={e => setLabel(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Adresse</Label>
            <AddressAutocomplete
              value={address}
              onChange={setAddress}
              searchFn={addressSearch}
              placeholder="Adresse suchen…"
            />
          </div>
          <Button
            className="w-full gap-2"
            disabled={label.trim().length === 0 || address.trim().length < 3}
            onClick={() => {
              onAdd(label.trim(), address.trim());
              setLabel("");
              setAddress("");
              toast.success("Adresse gespeichert.");
            }}
          >
            <Plus className="h-4 w-4" /> Adresse hinzufügen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ---------------------------------------------------------------------------
// Dialog: Einstellungen / Stammdaten
// ---------------------------------------------------------------------------
function SettingsDialog({
  open,
  onOpenChange,
  initial,
  onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial: MileageSettings;
  onSave: (s: MileageSettings) => void;
}) {
  const [driverName, setDriverName] = useState(initial.driverName);
  const [licensePlate, setLicensePlate] = useState(initial.licensePlate);
  const [personnelNumber, setPersonnelNumber] = useState(
    initial.personnelNumber
  );
  const [defaultStartAddress, setDefaultStartAddress] = useState(
    initial.defaultStartAddress
  );
  const [ratePerKm, setRatePerKm] = useState(
    String(initial.ratePerKm).replace(".", ",")
  );
  const [loaded, setLoaded] = useState(false);

  // Werte beim Öffnen aus dem Store übernehmen
  if (open && !loaded) {
    setDriverName(initial.driverName);
    setLicensePlate(initial.licensePlate);
    setPersonnelNumber(initial.personnelNumber);
    setDefaultStartAddress(initial.defaultStartAddress);
    setRatePerKm(String(initial.ratePerKm).replace(".", ","));
    setLoaded(true);
  }
  if (!open && loaded) setLoaded(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Einstellungen</DialogTitle>
          <DialogDescription>
            Diese Angaben erscheinen auf der gedruckten Abrechnung.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="s-name">Name</Label>
            <Input
              id="s-name"
              value={driverName}
              onChange={e => setDriverName(e.target.value)}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="s-plate">Kfz-Kennzeichen</Label>
              <Input
                id="s-plate"
                value={licensePlate}
                onChange={e => setLicensePlate(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="s-pers">Personalnummer</Label>
              <Input
                id="s-pers"
                value={personnelNumber}
                onChange={e => setPersonnelNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Standard-Startadresse</Label>
            <AddressAutocomplete
              value={defaultStartAddress}
              onChange={setDefaultStartAddress}
              searchFn={addressSearch}
              placeholder="z. B. Wohnort – wird bei neuen Fahrten vorbelegt"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="s-rate">Erstattungssatz (€/km)</Label>
            <Input
              id="s-rate"
              inputMode="decimal"
              className="w-32"
              value={ratePerKm}
              onChange={e => setRatePerKm(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={() => {
              onSave({
                driverName: driverName.trim(),
                licensePlate: licensePlate.trim(),
                personnelNumber: personnelNumber.trim(),
                defaultStartAddress: defaultStartAddress.trim(),
                ratePerKm: Number(ratePerKm.replace(",", ".")) || 0.3,
              });
              onOpenChange(false);
            }}
          >
            Speichern
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ---------------------------------------------------------------------------
// Dialog: Abrechnung / Druckansicht
// ---------------------------------------------------------------------------
function ReportDialog({
  open,
  onOpenChange,
  month,
  trips,
  totals,
  rate,
  settings,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  month: string;
  trips: Trip[];
  totals: { totalKm: number; amount: number };
  rate: number;
  settings: MileageSettings;
}) {
  const sigRef = useRef<SignaturePadHandle>(null);
  const [place, setPlace] = useState("");
  const [signDate, setSignDate] = useState(today());

  const driverName = settings.driverName || "—";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        id="mileage-print-area"
        className="max-h-[90vh] max-w-3xl overflow-y-auto"
      >
        <DialogHeader className="no-print">
          <DialogTitle>Abrechnung – Vorschau</DialogTitle>
          <DialogDescription>
            Unterschrift unten eintragen und anschließend drucken bzw. als PDF
            speichern.
          </DialogDescription>
        </DialogHeader>

        {/* Druckbereich */}
        <div className="bg-white p-2 text-black">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold">Kilometerabrechnung</h2>
              <p className="text-sm text-gray-600">
                Dienstliche Fahrten · {monthLabel(month)}
              </p>
            </div>
            <div className="text-right">
              <div
                className="text-lg font-bold"
                style={{ color: "var(--fabrica-red)" }}
              >
                Fabrica GmbH
              </div>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
            <div>
              <span className="text-gray-500">Name:</span>{" "}
              <strong>{driverName}</strong>
            </div>
            <div>
              <span className="text-gray-500">Abrechnungsmonat:</span>{" "}
              <strong>{monthLabel(month)}</strong>
            </div>
            {settings.licensePlate && (
              <div>
                <span className="text-gray-500">Kfz-Kennzeichen:</span>{" "}
                <strong>{settings.licensePlate}</strong>
              </div>
            )}
            {settings.personnelNumber && (
              <div>
                <span className="text-gray-500">Personalnr.:</span>{" "}
                <strong>{settings.personnelNumber}</strong>
              </div>
            )}
            <div>
              <span className="text-gray-500">Erstattungssatz:</span>{" "}
              <strong>{eur(rate)} / km</strong>
            </div>
          </div>

          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border border-gray-300 p-1.5">Datum</th>
                <th className="border border-gray-300 p-1.5">Grund</th>
                <th className="border border-gray-300 p-1.5">Von → Nach</th>
                <th className="border border-gray-300 p-1.5 text-center">H/R</th>
                <th className="border border-gray-300 p-1.5 text-right">km</th>
                <th className="border border-gray-300 p-1.5 text-right">
                  Betrag
                </th>
              </tr>
            </thead>
            <tbody>
              {trips.map(t => {
                const tripKm = t.distanceKm * (t.roundTrip ? 2 : 1);
                return (
                  <tr key={t.id}>
                    <td className="whitespace-nowrap border border-gray-300 p-1.5">
                      {formatDate(t.tripDate)}
                    </td>
                    <td className="border border-gray-300 p-1.5">{t.purpose}</td>
                    <td className="border border-gray-300 p-1.5">
                      {t.startAddress} → {t.endAddress}
                    </td>
                    <td className="border border-gray-300 p-1.5 text-center">
                      {t.roundTrip ? "Ja" : "Nein"}
                    </td>
                    <td className="whitespace-nowrap border border-gray-300 p-1.5 text-right">
                      {fmtKm(tripKm)}
                    </td>
                    <td className="whitespace-nowrap border border-gray-300 p-1.5 text-right">
                      {eur(tripKm * t.ratePerKm)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-bold">
                <td className="border border-gray-300 p-1.5" colSpan={4}>
                  Gesamt
                </td>
                <td className="border border-gray-300 p-1.5 text-right">
                  {fmtKm(totals.totalKm)}
                </td>
                <td className="border border-gray-300 p-1.5 text-right">
                  {eur(totals.amount)}
                </td>
              </tr>
            </tfoot>
          </table>

          <p className="mt-3 text-xs text-gray-600">
            Hiermit bestätige ich die Richtigkeit der angegebenen dienstlichen
            Fahrten.
          </p>

          {/* Ort / Datum / Unterschrift */}
          <div className="mt-10 grid grid-cols-2 gap-8">
            <div>
              <div className="flex gap-2 text-sm">
                <input
                  value={place}
                  onChange={e => setPlace(e.target.value)}
                  placeholder="Ort"
                  className="w-1/2 border-b border-gray-400 bg-transparent px-1 outline-none"
                />
                <input
                  type="date"
                  value={signDate}
                  onChange={e => setSignDate(e.target.value)}
                  className="border-b border-gray-400 bg-transparent px-1 outline-none"
                />
              </div>
              <div className="mt-1 text-xs text-gray-500">Ort, Datum</div>
            </div>
            <div>
              <SignaturePad ref={sigRef} className="h-24" />
              <div className="mt-1 text-xs text-gray-500">Unterschrift</div>
            </div>
          </div>
        </div>

        <DialogFooter className="no-print">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => sigRef.current?.clear()}
          >
            <X className="h-4 w-4" /> Unterschrift löschen
          </Button>
          <Button className="gap-2" onClick={() => window.print()}>
            <Printer className="h-4 w-4" /> Drucken / Als PDF speichern
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
