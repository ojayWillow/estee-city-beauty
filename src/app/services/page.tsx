import Link from 'next/link';
import { Sparkles, ArrowRight, Clock, Hand, Footprints, Eye, Brush, Heart, ChevronRight, Phone, MapPin, Instagram } from 'lucide-react';

const serviceCategories = [
  {
    category: 'Manikīrs',
    icon: <Hand className="h-6 w-6" />,
    bg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    services: [
      { name: 'Manikīrs ar gēllaku', duration: '90 min', price: 35 },
      { name: 'Manikīrs ar gēlu', duration: '90 min', price: 40 },
      { name: 'Pieaudzēšana no nullēm', duration: '120 min', price: 50 },
      { name: 'Gēla nagu korekcija', duration: '90 min', price: 40 },
    ],
  },
  {
    category: 'Pedikīrs',
    icon: <Footprints className="h-6 w-6" />,
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    services: [
      { name: 'Pedikīrs', duration: '90 min', price: 40 },
      { name: 'Pedikīrs ar gēllaku', duration: '90 min', price: 45 },
    ],
  },
  {
    category: 'Skropstas un uzacis',
    icon: <Eye className="h-6 w-6" />,
    bg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    services: [
      { name: 'Skropstu pagarināšana (klasiskā)', duration: '120 min', price: 40 },
      { name: 'Skropstu pagarināšana (2D-3D)', duration: '150 min', price: 55 },
      { name: 'Skropstu laminēšana', duration: '60 min', price: 30 },
      { name: 'Uzacu laminēšana', duration: '45 min', price: 25 },
      { name: 'Uzacu korekcija un krāsošana', duration: '30 min', price: 15 },
    ],
  },
  {
    category: 'Permanentais grims',
    icon: <Brush className="h-6 w-6" />,
    bg: 'bg-pink-50',
    iconColor: 'text-pink-600',
    services: [
      { name: 'Lūpu permanentais grims', duration: '120 min', price: 80 },
      { name: 'Uzacu mikropigmentācija', duration: '120 min', price: 80 },
      { name: 'Permanenta grima korekcija', duration: '90 min', price: 50 },
    ],
  },
  {
    category: 'Masāža',
    icon: <Heart className="h-6 w-6" />,
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    services: [
      { name: 'Sejas masāža', duration: '45 min', price: 25 },
      { name: 'Relaksējošā ķermeņa masāža', duration: '60 min', price: 40 },
      { name: 'Dziļā sejas tīrīšana', duration: '60 min', price: 35 },
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">ESTEE CITY</span>
                <span className="text-xl font-bold gradient-text"> BEAUTY</span>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-primary-600 transition font-medium">Sākums</Link>
              <Link href="/services" className="text-primary-600 font-semibold">Pakalpojumi</Link>
              <Link href="/login" className="text-gray-600 hover:text-primary-600 transition font-medium">Meistaram</Link>
              <Link href="/book" className="shimmer-btn text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-primary-500/30">
                Pierakstīties
              </Link>
            </div>
            <Link href="/book" className="md:hidden shimmer-btn text-white px-4 py-2 rounded-full text-sm font-semibold">
              Pierakstīties
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="hero-gradient pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/80 text-primary-600 rounded-full text-sm font-semibold mb-4">
            17+ pakalpojumi
          </span>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
            Pakalpojumi un <span className="gradient-text">cenas</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
            Profesionāli skaistumkopšanas pakalpojumi ar kvalitatīviem produktiem. Izvēlies pakalpojumu un pierakstities vizītē.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/book" className="shimmer-btn text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary-500/30 inline-flex items-center">
              Pierakstīties
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a href="tel:+37125664577" className="px-8 py-3 rounded-full font-semibold border-2 border-gray-200 text-gray-700 hover:border-primary-300 hover:text-primary-600 transition-all inline-flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              +371 25 664 577
            </a>
          </div>
        </div>
      </section>

      {/* All Services */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {serviceCategories.map((cat) => (
              <div key={cat.category} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 ${cat.bg} rounded-2xl flex items-center justify-center ${cat.iconColor} mr-4`}>
                      {cat.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{cat.category}</h2>
                      <p className="text-sm text-gray-400">{cat.services.length} pakalpojumi</p>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-50">
                    {cat.services.map((service) => (
                      <Link
                        key={service.name}
                        href="/book"
                        className="group flex items-center justify-between py-5 hover:bg-primary-50/30 -mx-4 px-4 rounded-xl transition-all duration-200"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition text-lg">
                            {service.name}
                          </h3>
                          <span className="text-sm text-gray-400 flex items-center mt-1">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            {service.duration}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-2xl font-bold gradient-text">€{service.price}</span>
                          <span className="w-10 h-10 rounded-full bg-gray-50 group-hover:bg-primary-100 flex items-center justify-center transition">
                            <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-primary-600 transition" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-rose-500 rounded-3xl p-12 text-center text-white shadow-2xl shadow-primary-500/30">
            <h2 className="text-4xl font-extrabold mb-4">Gatava pierakstīties?</h2>
            <p className="text-lg text-primary-100 mb-8 max-w-xl mx-auto">
              Izvēlies pakalpojumu, meistaru un ērtu laiku. Tiešsaistē vai pa tālruni.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book" className="inline-flex items-center px-10 py-4 bg-white text-primary-600 rounded-full text-lg font-bold hover:bg-gray-50 transition-all shadow-lg">
                Pierakstīties online
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a href="tel:+37125664577" className="inline-flex items-center px-10 py-4 bg-white/20 text-white rounded-full text-lg font-bold hover:bg-white/30 transition-all border border-white/30">
                <Phone className="mr-2 h-5 w-5" />
                +371 25 664 577
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold">ESTEE CITY BEAUTY</span>
            </div>
            <div className="flex items-center space-x-6 text-gray-400">
              <a href="tel:+37125664577" className="flex items-center hover:text-white transition">
                <Phone className="h-4 w-4 mr-1" /> +371 25 664 577
              </a>
              <a href="https://www.instagram.com/esteecitybeauty" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-white transition">
                <Instagram className="h-4 w-4 mr-1" /> @esteecitybeauty
              </a>
            </div>
            <p className="text-gray-500 text-sm">&copy; 2026 Estee City Beauty</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
