import { createServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AppointmentCalendar from './AppointmentCalendar';
import { Appointment } from '@/types';

export default async function AdminPage() {
  const supabase = createServerClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: creator } = await supabase
    .from('creators')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (!creator) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Nav piekļuves</h1>
          <p className="text-gray-600">Tev nav meistara konta.</p>
        </div>
      </div>
    );
  }

  const { data: appointments } = await supabase
    .from('appointments')
    .select(`
      *,
      service:services(*)
    `)
    .eq('creator_id', creator.id)
    .order('start_time', { ascending: true });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin panelis</h1>
            <p className="text-gray-600">Sveiks, {creator.full_name}!</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AppointmentCalendar
          appointments={(appointments as Appointment[]) || []}
          creatorId={creator.id}
        />
      </main>
    </div>
  );
}
