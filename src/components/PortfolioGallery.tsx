'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Instagram } from 'lucide-react';

const portfolioItems = [
  {
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80',
    category: 'Manikīrs',
    title: 'Gēla laka ar dizainu',
  },
  {
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&q=80',
    category: 'Manikīrs',
    title: 'Franch manikīrs',
  },
  {
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&q=80',
    category: 'Manikīrs',
    title: 'Nude tonis ar akcentu',
  },
  {
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
    category: 'Manikīrs',
    title: 'Krāsaini nagi',
  },
  {
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&q=80',
    category: 'Skropstas',
    title: 'Klasiskā pagarināšana',
  },
  {
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
    category: 'Sejas kopšana',
    title: 'Dziļa sejas tīrīšana',
  },
  {
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80',
    category: 'Salons',
    title: 'Mūsu studija',
  },
  {
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80',
    category: 'Skaistums',
    title: 'Profesionāla pieeja',
  },
];

const filters = ['Visi', 'Manikīrs', 'Skropstas', 'Sejas kopšana', 'Salons', 'Skaistums'];

export default function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState('Visi');

  const filtered = activeFilter === 'Visi'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeFilter === filter
                ? 'bg-primary-600 text-white shadow-md shadow-primary-500/30'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((item, i) => (
          <div
            key={i}
            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-xs font-medium text-primary-300 uppercase tracking-wider">{item.category}</span>
              <p className="text-white font-semibold">{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Links to profiles */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
        <a
          href="https://www.skaists.lv/m/3346"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-3.5 bg-white border-2 border-gray-200 hover:border-primary-300 rounded-full font-semibold text-gray-700 hover:text-primary-600 transition-all"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Skaists.lv profils
        </a>
        <a
          href="https://www.instagram.com/esteecitybeauty"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-full font-semibold shadow-lg shadow-purple-500/20 transition-all"
        >
          <Instagram className="h-4 w-4 mr-2" />
          Vairāk Instagram
        </a>
      </div>
    </div>
  );
}
