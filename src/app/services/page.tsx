import { createServerClient } from '@/lib/supabase/server';
import { Service } from '@/types';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default async function ServicesPage() {
  const supabase = await createServerClient();

  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('category', { ascending: true });

  const categories = Array.from(
    new Set((services as Service[])?.map((s) => s.category) || [])
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Estee City Beauty
            </Link>
            <Link href="/book">
              <Button>Rezervēt laiku</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Mūsu pakalpojumi</h1>
          <p className="text-xl text-gray-600">
            Profesionāli skaistumkopšanas pakalpojumi ar augstu kvalitāti
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="text-3xl font-bold mb-6">{category}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(services as Service[])
                  ?.filter((s) => s.category === category)
                  .map((service) => (
                    <Card key={service.id} className="hover:shadow-xl transition">
                      <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                      {service.description && (
                        <p className="text-gray-600 mb-4">{service.description}</p>
                      )}
                      <div className="flex justify-between items-center mt-4 pt-4 border-t">
                        <div>
                          <p className="text-sm text-gray-500">
                            ⏱️ {service.duration_minutes} min
                          </p>
                        </div>
                        <p className="text-2xl font-bold text-primary-600">
                          €{service.price.toFixed(2)}
                        </p>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/book">
            <Button size="lg">Rezervēt laiku tagad</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
