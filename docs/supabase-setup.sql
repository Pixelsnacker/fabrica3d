-- ===========================================================================
-- Einmaliges Datenbank-Setup für die Kilometerabrechnung (Supabase)
-- Einfügen unter: Supabase → SQL Editor → New query → Run
-- Legt die Tabellen an und stellt sicher, dass jeder Nutzer nur seine
-- eigenen Daten sehen/ändern kann (Row Level Security).
-- ===========================================================================

create table if not exists public.mileage_trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  trip_date date not null,
  purpose text not null,
  start_address text not null,
  end_address text not null,
  round_trip boolean not null default false,
  distance_km numeric not null,
  rate_per_km numeric not null default 0.30,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.saved_addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null,
  address text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.mileage_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  driver_name text,
  license_plate text,
  personnel_number text,
  default_start_address text,
  rate_per_km numeric not null default 0.30,
  updated_at timestamptz not null default now()
);

-- Row Level Security aktivieren
alter table public.mileage_trips enable row level security;
alter table public.saved_addresses enable row level security;
alter table public.mileage_settings enable row level security;

-- Regeln: nur eigene Datensätze (idempotent – kann erneut ausgeführt werden)
drop policy if exists "own trips" on public.mileage_trips;
create policy "own trips" on public.mileage_trips
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own addresses" on public.saved_addresses;
create policy "own addresses" on public.saved_addresses
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "own settings" on public.mileage_settings;
create policy "own settings" on public.mileage_settings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
