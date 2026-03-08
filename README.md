# Estee City Beauty - Booking System

A modern beauty salon booking and scheduling system built with Next.js, Supabase, and TypeScript.

## Features

✅ **Client Booking Flow**
- Multi-step booking process (Service → Creator → Date/Time → Confirm)
- Real-time availability checking
- Service catalog with categories
- Creator profiles with specialties
- Email and SMS notifications (optional)

✅ **Admin Dashboard**
- Interactive calendar view with react-big-calendar
- Appointment management (confirm, complete, cancel)
- Color-coded status indicators
- Client contact information
- Notes and special requests

✅ **Technical Features**
- Server-side rendering with Next.js 14
- PostgreSQL database with Supabase
- Row Level Security (RLS) policies
- TypeScript for type safety
- Tailwind CSS for styling
- Responsive design for mobile and desktop

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Styling**: Tailwind CSS
- **Calendar**: react-big-calendar
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ojayWillow/estee-city-beauty.git
cd estee-city-beauty
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the migrations in order:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_seed_data.sql`
3. Get your API credentials from Project Settings → API

### 4. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Create First Creator Account

1. Go to your Supabase project → Authentication → Users
2. Click "Add user" and create an account
3. Copy the user's UUID
4. Go to SQL Editor and run:

```sql
INSERT INTO public.creators (user_id, full_name, email, phone, bio, specialties)
VALUES (
  'YOUR_USER_UUID',
  'Your Name',
  'your@email.com',
  '+371 20000000',
  'Professional beauty master with 5 years experience',
  ARRAY['Manikīrs', 'Pedikīrs', 'Skropstas']
);
```

5. Get the creator_id and add availability:

```sql
INSERT INTO public.availability (creator_id, day_of_week, start_time, end_time)
VALUES
  ('YOUR_CREATOR_UUID', 1, '09:00', '18:00'),  -- Monday
  ('YOUR_CREATOR_UUID', 2, '09:00', '18:00'),  -- Tuesday
  ('YOUR_CREATOR_UUID', 3, '09:00', '18:00'),  -- Wednesday
  ('YOUR_CREATOR_UUID', 4, '09:00', '18:00'),  -- Thursday
  ('YOUR_CREATOR_UUID', 5, '09:00', '18:00');  -- Friday
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy!

### Deploy to Railway

1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Initialize: `railway init`
4. Add environment variables: `railway variables`
5. Deploy: `railway up`

## Project Structure

```
src/
├── app/
│   ├── admin/              # Admin dashboard
│   ├── api/                # API routes
│   ├── book/               # Booking flow
│   ├── login/              # Authentication
│   ├── services/           # Services listing
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── booking/            # Booking components
│   └── ui/                 # Reusable UI components
├── lib/
│   └── supabase/           # Supabase clients
└── types/                  # TypeScript types
```

## API Routes

- `POST /api/appointments` - Create new appointment
- `GET /api/appointments` - List appointments
- `PATCH /api/appointments/[id]` - Update appointment status
- `GET /api/availability` - Get available time slots

## Database Schema

### Tables

- **creators** - Beauty professionals with profiles
- **services** - Available services with pricing
- **appointments** - Customer bookings
- **availability** - Creator working hours

## Customization

### Colors

Edit `tailwind.config.ts` to change the primary color scheme:

```typescript
colors: {
  primary: {
    // Customize these values
    500: '#e25d7a',
    600: '#d03f64',
    // ...
  }
}
```

### Services

Add/edit services in Supabase dashboard or via SQL:

```sql
INSERT INTO public.services (name, description, duration_minutes, price, category)
VALUES ('New Service', 'Description', 60, 25.00, 'Category');
```

## License

MIT

## Support

For issues and questions, please open an issue on [GitHub](https://github.com/ojayWillow/estee-city-beauty/issues).
