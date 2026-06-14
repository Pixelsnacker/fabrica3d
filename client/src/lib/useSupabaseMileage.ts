/**
 * Supabase-Implementierung der MileageStoreApi: lädt und speichert Fahrten,
 * Adressen und Einstellungen des angemeldeten Nutzers in der Cloud-Datenbank.
 * Daten werden pro Nutzer über Row Level Security getrennt.
 */
import { useCallback, useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { toast } from "sonner";
import {
  DEFAULT_SETTINGS,
  type MileageSettings,
  type MileageStoreApi,
  type SavedAddress,
  type Trip,
} from "./mileageStore";

// --- Mapping zwischen DB-Spalten (snake_case) und App-Feldern (camelCase) ---
type TripRow = {
  id: string;
  trip_date: string;
  purpose: string;
  start_address: string;
  end_address: string;
  round_trip: boolean;
  distance_km: number | string;
  rate_per_km: number | string;
  note: string | null;
};

function tripFromRow(r: TripRow): Trip {
  return {
    id: r.id,
    tripDate: r.trip_date,
    purpose: r.purpose,
    startAddress: r.start_address,
    endAddress: r.end_address,
    roundTrip: r.round_trip,
    distanceKm: Number(r.distance_km),
    ratePerKm: Number(r.rate_per_km),
    note: r.note ?? undefined,
  };
}

function tripToRow(t: Omit<Trip, "id">) {
  return {
    trip_date: t.tripDate,
    purpose: t.purpose,
    start_address: t.startAddress,
    end_address: t.endAddress,
    round_trip: t.roundTrip,
    distance_km: t.distanceKm,
    rate_per_km: t.ratePerKm,
    note: t.note ?? null,
  };
}

export interface SupabaseMileageStore extends MileageStoreApi {
  loading: boolean;
}

export function useSupabaseMileage(
  client: SupabaseClient,
  userId: string
): SupabaseMileageStore {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [settings, setSettings] = useState<MileageSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const [tRes, aRes, sRes] = await Promise.all([
        client
          .from("mileage_trips")
          .select("*")
          .order("trip_date", { ascending: false }),
        client.from("saved_addresses").select("*").order("label"),
        client.from("mileage_settings").select("*").maybeSingle(),
      ]);
      if (tRes.error) throw tRes.error;
      if (aRes.error) throw aRes.error;
      if (sRes.error) throw sRes.error;

      setTrips((tRes.data ?? []).map(tripFromRow));
      setAddresses(
        (aRes.data ?? []).map(a => ({
          id: a.id,
          label: a.label,
          address: a.address,
        }))
      );
      const s = sRes.data;
      setSettings(
        s
          ? {
              driverName: s.driver_name ?? "",
              licensePlate: s.license_plate ?? "",
              personnelNumber: s.personnel_number ?? "",
              defaultStartAddress: s.default_start_address ?? "",
              ratePerKm: Number(s.rate_per_km ?? 0.3),
            }
          : DEFAULT_SETTINGS
      );
    } catch (e) {
      toast.error(
        "Daten konnten nicht geladen werden. Ist die Datenbank eingerichtet?"
      );
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [client]);

  useEffect(() => {
    reload();
  }, [reload, userId]);

  const addTrip = useCallback(
    (trip: Omit<Trip, "id">) => {
      client
        .from("mileage_trips")
        .insert({ ...tripToRow(trip), user_id: userId })
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) return toast.error("Speichern fehlgeschlagen.");
          if (data) setTrips(prev => [tripFromRow(data), ...prev]);
        });
    },
    [client, userId]
  );

  const updateTrip = useCallback(
    (id: string, trip: Omit<Trip, "id">) => {
      client
        .from("mileage_trips")
        .update(tripToRow(trip))
        .eq("id", id)
        .then(({ error }) => {
          if (error) return toast.error("Aktualisieren fehlgeschlagen.");
          setTrips(prev => prev.map(t => (t.id === id ? { ...trip, id } : t)));
        });
    },
    [client]
  );

  const deleteTrip = useCallback(
    (id: string) => {
      client
        .from("mileage_trips")
        .delete()
        .eq("id", id)
        .then(({ error }) => {
          if (error) return toast.error("Löschen fehlgeschlagen.");
          setTrips(prev => prev.filter(t => t.id !== id));
        });
    },
    [client]
  );

  const addAddress = useCallback(
    (addr: Omit<SavedAddress, "id">) => {
      client
        .from("saved_addresses")
        .insert({ label: addr.label, address: addr.address, user_id: userId })
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) return toast.error("Speichern fehlgeschlagen.");
          if (data)
            setAddresses(prev =>
              [...prev, { id: data.id, label: data.label, address: data.address }].sort(
                (a, b) => a.label.localeCompare(b.label)
              )
            );
        });
    },
    [client, userId]
  );

  const deleteAddress = useCallback(
    (id: string) => {
      client
        .from("saved_addresses")
        .delete()
        .eq("id", id)
        .then(({ error }) => {
          if (error) return toast.error("Löschen fehlgeschlagen.");
          setAddresses(prev => prev.filter(a => a.id !== id));
        });
    },
    [client]
  );

  const saveSettings = useCallback(
    (s: MileageSettings) => {
      client
        .from("mileage_settings")
        .upsert({
          user_id: userId,
          driver_name: s.driverName,
          license_plate: s.licensePlate,
          personnel_number: s.personnelNumber,
          default_start_address: s.defaultStartAddress,
          rate_per_km: s.ratePerKm,
        })
        .then(({ error }) => {
          if (error) return toast.error("Speichern fehlgeschlagen.");
          setSettings(s);
        });
    },
    [client, userId]
  );

  return {
    trips,
    addresses,
    settings,
    loading,
    addTrip,
    updateTrip,
    deleteTrip,
    addAddress,
    deleteAddress,
    saveSettings,
  };
}
