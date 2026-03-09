import Link from 'next/link';
import { Calendar, Clock, Sparkles, ArrowRight, Star, MapPin, Phone, Instagram, ChevronRight, Shield, Heart, Eye, Hand, Footprints, Brush, Zap, Navigation } from 'lucide-react';
import ServiceAccordion from '@/components/ServiceAccordion';
import HeroSlideshow from '@/components/HeroSlideshow';

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
      { name: 'Relaksējoša ķermeņa masāža', duration: '60 min', price: 40 },
      { name: 'Dziļā sejas tīrīšana', duration: '60 min', price: 35 },
    ],
  },
];

const testimonials = [
  {
    name: 'Laura K.',
    text: 'Vislabākais manikīrs Rīgā! Vienmēr aizeju prom ar smaidu. Ļoti profesionāla pieeja.',
    rating: 5,
  },
  {
    name: 'Anna M.',
    text: 'Skropstu pagarināšana bija perfekta. Dabīgs izskats un ilgi turējās. Super!',
    rating: 5,
  },
  {
    name: 'Kristīne B.',
    text: 'Ērta rezervācija un patīkama atmosfēra. Noteikti atgriezīšos atkal!',
    rating: 5,
  },
];

const locations = [
  {
    name: 'Zolitude',
    address: 'Ruses iela 6/1, Rīga, LV-1029',
    googleMapsUrl: 'https://maps.google.com/?q=Ruses+iela+6/1,+Riga,+LV-1029',
  },
  {
    name: 'Imanta',
    address: 'Kurzemes prospekts 132A, Rīga, LV-1004',
    googleMapsUrl: 'https://maps.google.com/?q=Kurzemes+prospekts+132A,+Riga,+LV-1004',
  },
  {
    name: 'Centrs',
    address: 'Merķeļa iela 12, Rīga, LV-1050',
    googleMapsUrl: 'https://maps.google.com/?q=Merkela+iela+12,+Riga,+LV-1050',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">ESTEE CITY</span>
                <span className="text-xl font-bold text-primary-300"> BEAUTY</span>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-white/80 hover:text-white transition font-medium">Pakalpojumi</a>
              <a href="#locations" className="text-white/80 hover:text-white transition font-medium">Saloni</a>
              <a href="#reviews" className="text-white/80 hover:text-white transition font-medium">Atsauksmes</a>
              <Link href="/login" className="text-white/80 hover:text-white transition font-medium">Meistaram</Link>
              <Link
                href="/book"
                className="shimmer-btn text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl transition-all"
              >
                Pierakstīties
              </Link>
            </div>
            <Link href="/book" className="md:hidden shimmer-btn text-white px-4 py-2 rounded-full text-sm font-semibold">
              Pierakstīties
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero with Background Slideshow */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <HeroSlideshow />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              <span className="ml-2 text-sm font-medium text-white/90">4.4 / 5.0 • Facebook vērtējums</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
              Ātrums,
              <span className="text-primary-300"> kvalitāte</span>
              <br />un
              <span className="text-primary-300"> drošība</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-lg">
              Profesionāla nagu kopšanas studija Rīgā. Manikīrs, pedikīrs, skropstas, permanentais grims un masāža. Pieraksts tiešsaistē vai pa tālruni.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book"
                className="shimmer-btn text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-primary-500/30 hover:shadow-2xl transition-all inline-flex items-center justify-center"
              >
                Pierakstīties vizītē
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="tel:+37125664577"
                className="px-8 py-4 rounded-full text-lg font-semibold border-2 border-white/30 text-white hover:bg-white/10 transition-all inline-flex items-center justify-center backdrop-blur-sm"
              >
                <Phone className="h-5 w-5 mr-2" />
                +371 25 664 577
              </a>
            </div>

            <div className="flex items-center gap-8 mt-12">
              <div>
                <p className="text-3xl font-bold text-white">1.7k+</p>
                <p className="text-sm text-white/60">Facebook sekotāji</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="text-3xl font-bold text-white">3</p>
                <p className="text-sm text-white/60">Saloni Rīgā</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="text-3xl font-bold text-white">17+</p>
                <p className="text-sm text-white/60">Pakalpojumi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Accordion */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-600 rounded-full text-sm font-semibold mb-4">
              Pakalpojumi un cenas
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Mūsu pakalpojumi
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Profesionāli skaistumkopšanas pakalpojumi ar kvalitatīviem produktiem
            </p>
          </div>

          <ServiceAccordion categories={serviceCategories} />

          <div className="text-center mt-12">
            <Link
              href="/book"
              className="shimmer-btn text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl shadow-primary-500/30 hover:shadow-2xl transition-all inline-flex items-center"
            >
              Pierakstīties uz vizīti
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-white/80 text-primary-600 rounded-full text-sm font-semibold mb-4">
              Kā pierakstīties
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              3 vienkārši soļi
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', icon: <Hand className="h-8 w-8" />, title: 'Izvēlies pakalpojumu', desc: 'Apskati mūsu pakalpojumu klāstu un izvēlies manikīru, pedikīru, skropstas vai citu procedūru' },
              { step: '02', icon: <Calendar className="h-8 w-8" />, title: 'Izvēlies laiku un meistaru', desc: 'Atrodi sev ērtāko datumu, laiku un izvēlies meistaru mūsu kalendārā' },
              { step: '03', icon: <Sparkles className="h-8 w-8" />, title: 'Atnāc uz salonu', desc: 'Atnāc uz izvēlēto Estee City salonu un izbaudi profesionālu apkalpošanu' },
            ].map((item, i) => (
              <div key={item.step} className="relative">
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative z-10 h-full">
                  <span className="text-6xl font-black text-primary-100">{item.step}</span>
                  <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mt-4 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500">{item.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 z-20">
                    <ArrowRight className="h-6 w-6 text-primary-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section id="locations" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-600 rounded-full text-sm font-semibold mb-4">
              Mūsu saloni
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              3 saloni Rīgā
            </h2>
            <p className="text-xl text-gray-500">Izvēlies sev tuvāko Estee City salonu</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {locations.map((loc) => (
              <div key={loc.name} className="bg-gray-50 rounded-3xl p-8 hover:bg-primary-50/50 transition-all duration-300 group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:shadow-md transition">
                  <MapPin className="h-7 w-7 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Estee City {loc.name}</h3>
                <p className="text-gray-500 mb-6">{loc.address}</p>
                <div className="space-y-3">
                  <a
                    href="tel:+37125664577"
                    className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    +371 25 664 577
                  </a>
                  <a
                    href={loc.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center w-full px-4 py-3 bg-white hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-xl font-semibold text-gray-700 hover:text-primary-600 transition-all"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Atvērt kartē
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-24 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-white/80 text-primary-600 rounded-full text-sm font-semibold mb-4">
              Atsauksmes
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Ko saka mūsu klienti
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-5 w-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <span className="ml-3 font-semibold text-gray-900">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-rose-500 rounded-3xl p-12 lg:p-16 text-center text-white shadow-2xl shadow-primary-500/30">
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">
              Gatava uz vizīti?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-xl mx-auto">
              Pierakstities tiešsaistē vai sazinieties ar mums pa tālruni. Jūsu skaistums labās rokās!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book"
                className="inline-flex items-center px-10 py-4 bg-white text-primary-600 rounded-full text-lg font-bold hover:bg-gray-50 transition-all shadow-lg"
              >
                Pierakstīties online
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="tel:+37125664577"
                className="inline-flex items-center px-10 py-4 bg-white/20 text-white rounded-full text-lg font-bold hover:bg-white/30 transition-all border border-white/30"
              >
                <Phone className="mr-2 h-5 w-5" />
                +371 25 664 577
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">ESTEE CITY BEAUTY</span>
              </div>
              <p className="text-gray-400 max-w-md mb-6">
                Profesionāla skaistumkopšanas studija ar 3 saloniem Rīgā. Manikīrs, pedikīrs, skropstas, permanentais grims un masāža.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/esteecitylounge" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition">
                  <span className="text-sm font-bold">f</span>
                </a>
                <a href="https://www.instagram.com/esteecitybeauty" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition">
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Saloni</h4>
              <div className="space-y-4 text-gray-400">
                {locations.map((loc) => (
                  <div key={loc.name} className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-300">{loc.name}</p>
                      <p className="text-sm">{loc.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Kontakti</h4>
              <div className="space-y-3 text-gray-400">
                <a href="tel:+37125664577" className="flex items-center space-x-2 hover:text-white transition">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>+371 25 664 577</span>
                </a>
                <a href="https://www.instagram.com/esteecitybeauty" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-white transition">
                  <Instagram className="h-4 w-4 flex-shrink-0" />
                  <span>@esteecitybeauty</span>
                </a>
              </div>
              <h4 className="font-bold mt-6 mb-2">Saites</h4>
              <div className="space-y-2">
                <Link href="/book" className="block text-gray-400 hover:text-white transition">Pierakstīties</Link>
                <a href="https://www.skaists.lv/m/3346" target="_blank" rel="noopener noreferrer" className="block text-gray-400 hover:text-white transition">Skaists.lv profils</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2026 Estee City Beauty. Visas tiesības aizsargātas.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
