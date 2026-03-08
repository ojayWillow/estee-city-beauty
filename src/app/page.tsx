import Link from 'next/link';
import { Calendar, Clock, Sparkles, User, ArrowRight, Star, MapPin, Phone, Instagram, ChevronRight } from 'lucide-react';

const services = [
  {
    icon: '💅',
    title: 'Manikīrs',
    desc: 'Klasiskais, gēla un dizaina manikīrs',
    price: '15',
    color: 'from-rose-400 to-pink-500',
    bg: 'bg-rose-50',
  },
  {
    icon: '🦶',
    title: 'Pedikīrs',
    desc: 'Profesionāla pēdu un nagu kopšana',
    price: '20',
    color: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-50',
  },
  {
    icon: '👁️',
    title: 'Skropstu pagarināšana',
    desc: 'Klasiskā, 2D-3D un laminēšana',
    price: '30',
    color: 'from-violet-400 to-purple-500',
    bg: 'bg-violet-50',
  },
  {
    icon: '✨',
    title: 'Uzacu veidošana',
    desc: 'Korekcija, krāsošana un laminēšana',
    price: '15',
    color: 'from-emerald-400 to-teal-500',
    bg: 'bg-emerald-50',
  },
  {
    icon: '🧖‍♀️',
    title: 'Sejas kopšana',
    desc: 'Dziļā tīrīšana un sejas masāža',
    price: '25',
    color: 'from-sky-400 to-blue-500',
    bg: 'bg-sky-50',
  },
  {
    icon: '💆‍♀️',
    title: 'Vaksācija',
    desc: 'Ķermeņa un sejas vaksācija',
    price: '10',
    color: 'from-pink-400 to-rose-500',
    bg: 'bg-pink-50',
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

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Estee City <span className="gradient-text">Beauty</span></span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/services" className="text-gray-600 hover:text-primary-600 transition font-medium">
                Pakalpojumi
              </Link>
              <Link href="/book" className="text-gray-600 hover:text-primary-600 transition font-medium">
                Rezervēt
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-primary-600 transition font-medium">
                Meistaram
              </Link>
              <Link
                href="/book"
                className="shimmer-btn text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all"
              >
                Rezervēt laiku
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-gradient pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl animate-float animate-delay-300" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 shadow-sm mb-6">
                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                <span className="ml-2 text-sm font-medium text-gray-700">Vērtējums 4.9 / 5.0</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
                Tavs
                <span className="gradient-text"> skaistums</span>
                <br />ir mūsu
                <span className="gradient-text"> māksla</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                Profesionāli skaistumkopšanas pakalpojumi Rīgas centrā. Rezervē laiku tiešsaistē un izbaudi kvalitatīvu apkalpošanu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/book"
                  className="shimmer-btn text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40 transition-all inline-flex items-center justify-center"
                >
                  Rezervēt laiku
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/services"
                  className="px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-200 text-gray-700 hover:border-primary-300 hover:text-primary-600 transition-all inline-flex items-center justify-center"
                >
                  Skatīt pakalpojumus
                </Link>
              </div>

              <div className="flex items-center gap-8 mt-10">
                <div>
                  <p className="text-3xl font-bold text-gray-900">500+</p>
                  <p className="text-sm text-gray-500">Apmierināti klienti</p>
                </div>
                <div className="w-px h-12 bg-gray-200" />
                <div>
                  <p className="text-3xl font-bold text-gray-900">5+</p>
                  <p className="text-sm text-gray-500">Gadu pieredze</p>
                </div>
                <div className="w-px h-12 bg-gray-200" />
                <div>
                  <p className="text-3xl font-bold text-gray-900">12+</p>
                  <p className="text-sm text-gray-500">Pakalpojumi</p>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative hidden lg:block animate-fade-in animate-delay-300">
              <div className="relative z-10">
                <div className="w-full h-[500px] rounded-3xl bg-gradient-to-br from-primary-100 via-pink-100 to-rose-50 shadow-2xl overflow-hidden flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-8xl mb-6 animate-float">💅✨</div>
                    <p className="text-2xl font-bold text-primary-700">Estee City Beauty</p>
                    <p className="text-primary-500 mt-2">Skaistumkopšanas studija</p>
                    <div className="mt-8 grid grid-cols-3 gap-4">
                      <div className="bg-white/70 rounded-2xl p-4 backdrop-blur-sm">
                        <div className="text-3xl mb-1">💅</div>
                        <p className="text-xs font-medium text-gray-600">Manikīrs</p>
                      </div>
                      <div className="bg-white/70 rounded-2xl p-4 backdrop-blur-sm">
                        <div className="text-3xl mb-1">👁️</div>
                        <p className="text-xs font-medium text-gray-600">Skropstas</p>
                      </div>
                      <div className="bg-white/70 rounded-2xl p-4 backdrop-blur-sm">
                        <div className="text-3xl mb-1">🧖‍♀️</div>
                        <p className="text-xs font-medium text-gray-600">Seja</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary-200/50 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-pink-200/50 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-600 rounded-full text-sm font-semibold mb-4">
              Pakalpojumi
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Ko mēs piedāvājam
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Plašs skaistumkopšanas pakalpojumu klāsts ar profesionāliem produktiem
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Link
                key={service.title}
                href="/book"
                className="service-card group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary-200 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className={`service-icon w-16 h-16 ${service.bg} rounded-2xl flex items-center justify-center text-3xl mb-5 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition">
                  {service.title}
                </h3>
                <p className="text-gray-500 mb-4">{service.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    no <span className="gradient-text">€{service.price}</span>
                  </span>
                  <span className="service-arrow flex items-center text-primary-500 font-medium transition-transform duration-300">
                    Rezervēt <ChevronRight className="h-4 w-4 ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center px-6 py-3 border-2 border-gray-200 rounded-full text-gray-700 font-semibold hover:border-primary-300 hover:text-primary-600 transition-all"
            >
              Visi pakalpojumi
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-white/80 text-primary-600 rounded-full text-sm font-semibold mb-4">
              Kā tas strādā
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              3 vienkārši soļi
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: <Calendar className="h-8 w-8" />, title: 'Izvēlies pakalpojumu', desc: 'Apskatī mūsu pakalpojumu klāstu un izvēlies sev piemērotāko' },
              { step: '02', icon: <Clock className="h-8 w-8" />, title: 'Izvēlies laiku', desc: 'Atrodi sev ērtāko datumu un laiku mūsu kalendārā' },
              { step: '03', icon: <Sparkles className="h-8 w-8" />, title: 'Izbaudi rezultātu', desc: 'Atnāc uz salonu un izbaudi profesionālu apkalpošanu' },
            ].map((item, i) => (
              <div key={item.step} className="relative">
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative z-10">
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

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary-600 rounded-full text-sm font-semibold mb-4">
              Atsauksmes
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Ko saka mūsu klienti
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-3xl p-8 hover:bg-primary-50/50 transition-colors duration-300"
              >
                <div className="flex mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-5 w-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{t.text}"</p>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-rose-500 rounded-3xl p-12 lg:p-16 text-center text-white shadow-2xl shadow-primary-500/30">
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4">
              Gatava sākt?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-xl mx-auto">
              Rezervē savu laiku jau šodien un izbaudi profesionālu skaistumkopšanu
            </p>
            <Link
              href="/book"
              className="inline-flex items-center px-10 py-4 bg-white text-primary-600 rounded-full text-lg font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl"
            >
              Rezervēt laiku
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
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
                <span className="text-xl font-bold">Estee City Beauty</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Profesionāla skaistumkopšanas studija Rīgas centrā. Mēs rūpējamies par tavu skaistumu ar mīlestību un profesionalitāti.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Kontakti</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span>Rīga, Latvija</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>+371 20 000 000</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Instagram className="h-4 w-4 flex-shrink-0" />
                  <span>@esteecitybeauty</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Saites</h4>
              <div className="space-y-3">
                <Link href="/services" className="block text-gray-400 hover:text-white transition">Pakalpojumi</Link>
                <Link href="/book" className="block text-gray-400 hover:text-white transition">Rezervēt laiku</Link>
                <Link href="/login" className="block text-gray-400 hover:text-white transition">Meistaram</Link>
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
