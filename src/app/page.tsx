import Link from 'next/link';
import { Calendar, Clock, Sparkles, User } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">Estee City Beauty</h1>
            </div>
            <div className="flex space-x-4">
              <Link href="/book" className="text-gray-700 hover:text-primary-600 transition">
                Rezervēt
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-primary-600 transition">
                Pakalpojumi
              </Link>
              <Link href="/login" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition">
                Ienākt
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Tavs skaistums ir mūsu prioritāte
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Profesionāli skaistumkopšanas pakalpojumi ar ērtu tiešsaistes rezervāciju
          </p>
          <Link
            href="/book"
            className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition transform hover:scale-105"
          >
            Rezervēt laiku
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <Calendar className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Ērta rezervācija</h3>
            <p className="text-gray-600">Rezervē laiku 24/7 no jebkuras ierīces</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <User className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Profesionāli meistari</h3>
            <p className="text-gray-600">Pieredzējuši speciālisti ar augstu kvalifikāciju</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <Clock className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Elastīgs grafiks</h3>
            <p className="text-gray-600">Izvēlies sev ērtāko laiku un meistaru</p>
          </div>
        </div>

        {/* Services Preview */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-3xl font-bold text-center mb-8">Mūsu pakalpojumi</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 hover:bg-pink-50 rounded-lg transition cursor-pointer">
              <div className="text-4xl mb-2">💅</div>
              <h4 className="font-semibold">Manikīrs</h4>
              <p className="text-sm text-gray-600">No €15</p>
            </div>
            <div className="text-center p-4 hover:bg-pink-50 rounded-lg transition cursor-pointer">
              <div className="text-4xl mb-2">🦶</div>
              <h4 className="font-semibold">Pedikīrs</h4>
              <p className="text-sm text-gray-600">No €20</p>
            </div>
            <div className="text-center p-4 hover:bg-pink-50 rounded-lg transition cursor-pointer">
              <div className="text-4xl mb-2">👁️</div>
              <h4 className="font-semibold">Skropstas</h4>
              <p className="text-sm text-gray-600">No €30</p>
            </div>
            <div className="text-center p-4 hover:bg-pink-50 rounded-lg transition cursor-pointer">
              <div className="text-4xl mb-2">✨</div>
              <h4 className="font-semibold">Sejas kopšana</h4>
              <p className="text-sm text-gray-600">No €25</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2026 Estee City Beauty. Visas tiesības aizsargātas.</p>
        </div>
      </footer>
    </div>
  );
}
