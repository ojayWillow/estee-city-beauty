'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1920&q=80',
    alt: 'Manikīrs',
  },
  {
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80',
    alt: 'Skaistumkopšanas salons',
  },
  {
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&q=80',
    alt: 'Nagu dizains',
  },
  {
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920&q=80',
    alt: 'Sejas kopšana',
  },
  {
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1920&q=80',
    alt: 'Skropstu kopšana',
  },
];

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Background images */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === currentSlide
                ? 'w-8 bg-white'
                : 'w-1.5 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </>
  );
}
