import { createServerClient } from '@/lib/supabase/server';
import { Service, Creator } from '@/types';
import BookingFlow from './BookingFlow';

export default async function BookPage() {
  const supabase = await createServerClient();

  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('category', { ascending: true });

  const { data: creators } = await supabase
    .from('creators')
    .select('*')
    .eq('is_active', true)
    .order('full_name', { ascending: true });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Rezervēt laiku</h1>
        <BookingFlow
          services={(services as Service[]) || []}
          creators={(creators as Creator[]) || []}
        />
      </div>
    </div>
  );
}
