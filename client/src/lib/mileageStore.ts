/**
 * Lokale Datenhaltung der Kilometerabrechnung im Browser (localStorage).
 * Kein Backend, kein Login – die Daten bleiben auf diesem Gerät/Browser.
 */
import { useCallback, useSyncExternalStore } from "react";

export interface Trip {
  id: string;
  tripDate: string; // YYYY-MM-DD
  purpose: string;
  startAddress: string;
  endAddress: string;
  roundTrip: boolean;
  distanceKm: number; // einfache Strecke
  ratePerKm: number;
  note?: string;
}

export interface SavedAddress {
  id: string;
  label: string;
  address: string;
}

export interface MileageSettings {
  driverName: string;
  licensePlate: string;
  personnelNumber: string;
  defaultStartAddress: string;
  ratePerKm: number;
}

interface MileageData {
  trips: Trip[];
  addresses: SavedAddress[];
  settings: MileageSettings;
}

const STORAGE_KEY = "fabrica-kilometerabrechnung";

const DEFAULT_DATA: MileageData = {
  trips: [],
  addresses: [],
  settings: {
    driverName: "",
    licensePlate: "",
    personnelNumber: "",
    defaultStartAddress: "",
    ratePerKm: 0.3,
  },
};

function read(): MileageData {
  if (typeof window === "undefined") return DEFAULT_DATA;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_DATA;
    const parsed = JSON.parse(raw) as Partial<MileageData>;
    return {
      trips: parsed.trips ?? [],
      addresses: parsed.addresses ?? [],
      settings: { ...DEFAULT_DATA.settings, ...(parsed.settings ?? {}) },
    };
  } catch {
    return DEFAULT_DATA;
  }
}

// --- einfacher externer Store für useSyncExternalStore --------------------
let cache: MileageData = read();
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach(l => l());
}

function write(next: MileageData) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* Speicher voll / nicht verfügbar – ignorieren */
  }
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : String(Date.now() + Math.random());

/** React-Hook mit den Daten und allen Mutationen. */
export function useMileageStore() {
  const data = useSyncExternalStore(subscribe, () => cache, () => cache);

  const addTrip = useCallback((trip: Omit<Trip, "id">) => {
    write({ ...cache, trips: [{ ...trip, id: newId() }, ...cache.trips] });
  }, []);

  const updateTrip = useCallback((id: string, trip: Omit<Trip, "id">) => {
    write({
      ...cache,
      trips: cache.trips.map(t => (t.id === id ? { ...trip, id } : t)),
    });
  }, []);

  const deleteTrip = useCallback((id: string) => {
    write({ ...cache, trips: cache.trips.filter(t => t.id !== id) });
  }, []);

  const addAddress = useCallback((addr: Omit<SavedAddress, "id">) => {
    write({
      ...cache,
      addresses: [...cache.addresses, { ...addr, id: newId() }].sort((a, b) =>
        a.label.localeCompare(b.label)
      ),
    });
  }, []);

  const deleteAddress = useCallback((id: string) => {
    write({ ...cache, addresses: cache.addresses.filter(a => a.id !== id) });
  }, []);

  const saveSettings = useCallback((settings: MileageSettings) => {
    write({ ...cache, settings });
  }, []);

  return {
    ...data,
    addTrip,
    updateTrip,
    deleteTrip,
    addAddress,
    deleteAddress,
    saveSettings,
  };
}
