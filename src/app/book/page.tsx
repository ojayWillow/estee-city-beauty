import { createServerClient } from '@/lib/supabase/server';
import { Service, Creator } from '@/types';
import BookingFlow from './BookingFlow';
import Link from 'next/link';
import { Sparkles, ArrowLeft } from 'lucide-react';

export default async function BookPage() {
  const supabase = await createServerClient();

  const { data: services, error: servicesError } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('category', { ascending: true });

  const { data: creators, error: creatorsError } = await supabase
    .from('creators')
    .select('*')
    .eq('is_active', true)
    .order('full_name', { ascending: true });

  const hasData = services && services.length > 0 && creators && creators.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">ESTEE CITY</span>
                <span className="text-xl font-bold text-primary-600"> BEAUTY</span>
              </div>
            </Link>
            <Link href="/" className="flex items-center text-gray-600 hover:text-primary-600 transition font-medium">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Atpakaļ
            </Link>
          </div>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-2">Pierakstīties vizītē</h1>
        <p className="text-gray-500 text-center mb-10">Izvēlies pakalpojumu, meistaru un ērtu laiku</p>

        {hasData ? (
          <BookingFlow
            services={(services as Service[])}
            creators={(creators as Creator[])}
          />
        ) : (
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚠️</span>
              </div>
              <h2 className="text-2xl font-bold mb-3">Rezervācijas sistēma tiek iestatīta</h2>
              <p className="text-gray-500 mb-6">
                Tiešsaistes rezervācija drīzumā būs pieejama. Pagaidām lūdzam sazināties ar mums tieši:
              </p>
              <div className="space-y-4">
                <a
                  href="tel:+37125664577"
                  className="block w-full py-4 px-6 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition text-lg"
                >
                  📞 +371 25 664 577
                </a>
                <a
                  href="https://www.instagram.com/esteecitybeauty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90 transition text-lg"
                >
                  📸 Instagram @esteecitybeauty
                </a>
                <a
                  href="https://www.facebook.com/esteecitylounge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 px-6 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition text-lg"
                >
                  👍 Facebook
                </a>
              </div>
              {(servicesError || creatorsError) && (
                <p className="text-xs text-red-400 mt-6">
                  Debug: {servicesError?.message || creatorsError?.message}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
