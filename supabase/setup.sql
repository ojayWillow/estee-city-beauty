-- =============================================
-- ESTEE CITY BEAUTY - COMPLETE DATABASE SETUP
-- Run this in Supabase SQL Editor (one time)
-- =============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =============================================
-- TABLES
-- =============================================

-- Creators (masters) table
create table if not exists public.creators (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid,
  full_name text not null,
  email text not null unique,
  phone text,
  bio text,
  specialties text[] default '{}',
  avatar_url text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Services table
create table if not exists public.services (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  duration_minutes integer not null,
  price numeric(10,2) not null,
  category text not null,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Appointments table
create table if not exists public.appointments (
  id uuid default uuid_generate_v4() primary key,
  creator_id uuid references public.creators(id) on delete cascade not null,
  service_id uuid references public.services(id) on delete restrict not null,
  client_name text not null,
  client_email text not null,
  client_phone text not null,
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  status text default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Availability table (working hours per day of week)
create table if not exists public.availability (
  id uuid default uuid_generate_v4() primary key,
  creator_id uuid references public.creators(id) on delete cascade not null,
  day_of_week integer not null check (day_of_week >= 0 and day_of_week <= 6),
  start_time time not null,
  end_time time not null,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(creator_id, day_of_week)
);

-- =============================================
-- INDEXES
-- =============================================

create index if not exists idx_appointments_creator_id on public.appointments(creator_id);
create index if not exists idx_appointments_service_id on public.appointments(service_id);
create index if not exists idx_appointments_start_time on public.appointments(start_time);
create index if not exists idx_appointments_status on public.appointments(status);
create index if not exists idx_availability_creator_id on public.availability(creator_id);
create index if not exists idx_services_category on public.services(category);
create index if not exists idx_services_is_active on public.services(is_active);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

alter table public.creators enable row level security;
alter table public.services enable row level security;
alter table public.appointments enable row level security;
alter table public.availability enable row level security;

-- Drop existing policies if any
drop policy if exists "Creators are viewable by everyone" on public.creators;
drop policy if exists "Creators can update own profile" on public.creators;
drop policy if exists "Services are viewable by everyone" on public.services;
drop policy if exists "Only authenticated users can manage services" on public.services;
drop policy if exists "Anyone can create appointments" on public.appointments;
drop policy if exists "Creators can view their appointments" on public.appointments;
drop policy if exists "Creators can update their appointments" on public.appointments;
drop policy if exists "Availability is viewable by everyone" on public.availability;
drop policy if exists "Creators can manage their availability" on public.availability;
drop policy if exists "Anyone can view appointments by creator" on public.appointments;

-- PUBLIC READ: Anyone can view active creators
create policy "Creators are viewable by everyone" on public.creators
  for select using (is_active = true);

-- PUBLIC READ: Anyone can view active services
create policy "Services are viewable by everyone" on public.services
  for select using (is_active = true);

-- PUBLIC READ: Anyone can view availability
create policy "Availability is viewable by everyone" on public.availability
  for select using (is_active = true);

-- PUBLIC INSERT: Anyone can create an appointment (booking)
create policy "Anyone can create appointments" on public.appointments
  for insert with check (true);

-- PUBLIC READ: Anyone can view appointments (needed for availability check)
create policy "Anyone can view appointments by creator" on public.appointments
  for select using (true);

-- AUTH: Creators can update their appointments (confirm/cancel)
create policy "Creators can update their appointments" on public.appointments
  for update using (
    creator_id in (
      select id from public.creators where user_id = auth.uid()
    )
  );

-- =============================================
-- TRIGGERS
-- =============================================

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists handle_creators_updated_at on public.creators;
create trigger handle_creators_updated_at before update on public.creators
  for each row execute procedure public.handle_updated_at();

drop trigger if exists handle_services_updated_at on public.services;
create trigger handle_services_updated_at before update on public.services
  for each row execute procedure public.handle_updated_at();

drop trigger if exists handle_appointments_updated_at on public.appointments;
create trigger handle_appointments_updated_at before update on public.appointments
  for each row execute procedure public.handle_updated_at();

drop trigger if exists handle_availability_updated_at on public.availability;
create trigger handle_availability_updated_at before update on public.availability
  for each row execute procedure public.handle_updated_at();

-- =============================================
-- SEED DATA: SERVICES
-- =============================================

-- Clear existing data
delete from public.availability;
delete from public.appointments;
delete from public.creators;
delete from public.services;

-- Manikīrs
insert into public.services (name, description, duration_minutes, price, category) values
  ('Manikīrs ar gēllaku', 'Ilgnoturīgs gēla lakas manikīrs ar nagu formas veidošanu', 90, 35.00, 'Manikīrs'),
  ('Manikīrs ar gēlu', 'Gēla nagu stiprināšana un veidošana', 90, 40.00, 'Manikīrs'),
  ('Pieaudzēšana no nullēm', 'Pilnīga gēla nagu pieaudzēšana', 120, 50.00, 'Manikīrs'),
  ('Gēla nagu korekcija', 'Esošo gēla nagu korekcija un atjaunošana', 90, 40.00, 'Manikīrs');

-- Pedikīrs
insert into public.services (name, description, duration_minutes, price, category) values
  ('Pedikīrs', 'Profesionāls pedikīrs ar pēdu kopšanu', 90, 40.00, 'Pedikīrs'),
  ('Pedikīrs ar gēllaku', 'Pedikīrs ar ilgnoturīgu gēla lakas pārklājumu', 90, 45.00, 'Pedikīrs');

-- Skropstas un uzacis
insert into public.services (name, description, duration_minutes, price, category) values
  ('Skropstu pagarināšana (klasiskā)', 'Klasiskā 1:1 tehnika dabīgam izskatam', 120, 40.00, 'Skropstas un uzacis'),
  ('Skropstu pagarināšana (2D-3D)', 'Apjomīga skropstu pagarināšana ar 2D-3D tehniku', 150, 55.00, 'Skropstas un uzacis'),
  ('Skropstu laminēšana', 'Skropstu laminācija ar krāsošanu un barošanu', 60, 30.00, 'Skropstas un uzacis'),
  ('Uzacu laminēšana', 'Ilgnoturīga uzacu laminācija un veidošana', 45, 25.00, 'Skropstas un uzacis'),
  ('Uzacu korekcija un krāsošana', 'Uzacu formas korekcija ar krāsošanu', 30, 15.00, 'Skropstas un uzacis');

-- Permanentais grims
insert into public.services (name, description, duration_minutes, price, category) values
  ('Lūpu permanentais grims', 'Ilgnoturīgs lūpu permanentais grims', 120, 80.00, 'Permanentais grims'),
  ('Uzacu mikropigmentācija', 'Uzacu mikropigmentācija ar pūdra tehniku', 120, 80.00, 'Permanentais grims'),
  ('Permanenta grima korekcija', 'Esošā permanenta grima korekcija', 90, 50.00, 'Permanentais grims');

-- Masāža
insert into public.services (name, description, duration_minutes, price, category) values
  ('Sejas masāža', 'Relaksējoša sejas un kakla masāža', 45, 25.00, 'Masāža'),
  ('Relaksējošā ķermeņa masāža', 'Pilnīga ķermeņa relaksācijas masāža', 60, 40.00, 'Masāža'),
  ('Dziļā sejas tīrīšana', 'Dziļa sejas tīrīšana ar profesionāliem līdzekļiem', 60, 35.00, 'Masāža');

-- =============================================
-- SEED DATA: CREATORS (MASTERS)
-- =============================================

insert into public.creators (full_name, email, phone, bio, specialties) values
  ('Anna', 'anna@esteecity.lv', '+37125664577', 'Profesionāla nagu kopšanas speciāliste ar vairāku gadu pieredzi.', ARRAY['Manikīrs', 'Pedikīrs']),
  ('Kristīne', 'kristine@esteecity.lv', '+37125664577', 'Skropstu un uzacu meistare ar augstu kvalifikāciju.', ARRAY['Skropstas un uzacis', 'Uzacu laminēšana']),
  ('Elīna', 'elina@esteecity.lv', '+37125664577', 'Permanentā grima speciāliste. Precīza un saudzīga pieeja.', ARRAY['Permanentais grims']),
  ('Laura', 'laura@esteecity.lv', '+37125664577', 'Sejas kopšanas un masāžas meistare ar holistisku pieeju.', ARRAY['Masāža', 'Sejas kopšana']);

-- =============================================
-- SEED DATA: AVAILABILITY (Mon-Sat 10:00-20:00)
-- day_of_week: 0=Sunday, 1=Monday ... 6=Saturday
-- =============================================

-- All creators work Monday to Saturday, 10:00-20:00
insert into public.availability (creator_id, day_of_week, start_time, end_time)
select c.id, d.day, '10:00:00'::time, '20:00:00'::time
from public.creators c
cross join (values (1),(2),(3),(4),(5),(6)) as d(day);
