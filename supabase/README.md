# Supabase Setup

## Initial Setup

1. Create a new Supabase project at https://supabase.com
2. Go to SQL Editor and run migrations in order:
   - `001_initial_schema.sql`
   - `002_seed_data.sql`

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Find these in: Project Settings > API

## Creating First Creator Account

1. Sign up a user in Authentication > Users
2. Copy the user's UUID
3. Run in SQL Editor:

```sql
insert into public.creators (user_id, full_name, email, phone, bio, specialties) values
  ('YOUR_USER_UUID', 'Your Name', 'email@example.com', '+371 20000000', 'Professional bio', '{"Manikīrs", "Pedikīrs"}');
```

4. Get the creator_id and add availability:

```sql
insert into public.availability (creator_id, day_of_week, start_time, end_time) values
  ('YOUR_CREATOR_UUID', 1, '09:00', '18:00'),
  ('YOUR_CREATOR_UUID', 2, '09:00', '18:00'),
  ('YOUR_CREATOR_UUID', 3, '09:00', '18:00'),
  ('YOUR_CREATOR_UUID', 4, '09:00', '18:00'),
  ('YOUR_CREATOR_UUID', 5, '09:00', '18:00');
```

## Database Schema

- `creators` - Beauty professionals/masters
- `services` - Available services with pricing
- `appointments` - Customer bookings
- `availability` - Creator working hours by day of week
