-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Creators table
create table public.creators (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
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
create table public.services (
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
create table public.appointments (
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

-- Availability table
create table public.availability (
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

-- Indexes for performance
create index idx_appointments_creator_id on public.appointments(creator_id);
create index idx_appointments_service_id on public.appointments(service_id);
create index idx_appointments_start_time on public.appointments(start_time);
create index idx_appointments_status on public.appointments(status);
create index idx_availability_creator_id on public.availability(creator_id);

-- Row Level Security (RLS)
alter table public.creators enable row level security;
alter table public.services enable row level security;
alter table public.appointments enable row level security;
alter table public.availability enable row level security;

-- RLS Policies for creators
create policy "Creators are viewable by everyone" on public.creators
  for select using (is_active = true);

create policy "Creators can update own profile" on public.creators
  for update using (auth.uid() = user_id);

-- RLS Policies for services
create policy "Services are viewable by everyone" on public.services
  for select using (is_active = true);

create policy "Only authenticated users can manage services" on public.services
  for all using (auth.role() = 'authenticated');

-- RLS Policies for appointments
create policy "Anyone can create appointments" on public.appointments
  for insert with check (true);

create policy "Creators can view their appointments" on public.appointments
  for select using (
    creator_id in (
      select id from public.creators where user_id = auth.uid()
    )
  );

create policy "Creators can update their appointments" on public.appointments
  for update using (
    creator_id in (
      select id from public.creators where user_id = auth.uid()
    )
  );

-- RLS Policies for availability
create policy "Availability is viewable by everyone" on public.availability
  for select using (is_active = true);

create policy "Creators can manage their availability" on public.availability
  for all using (
    creator_id in (
      select id from public.creators where user_id = auth.uid()
    )
  );

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger handle_creators_updated_at before update on public.creators
  for each row execute procedure public.handle_updated_at();

create trigger handle_services_updated_at before update on public.services
  for each row execute procedure public.handle_updated_at();

create trigger handle_appointments_updated_at before update on public.appointments
  for each row execute procedure public.handle_updated_at();

create trigger handle_availability_updated_at before update on public.availability
  for each row execute procedure public.handle_updated_at();
