'use client';

import { useState, useEffect } from 'react';

const slides = [
  {
    title: 'Profesionāls',
    highlight: 'manikīrs',
    description: 'Gēla lakas, nagu pieaudzēšana un dizaina manikīrs ar kvalitatīviem produktiem.',
    gradient: 'from-rose-500/20 via-pink-400/20 to-primary-500/20',
    emoji: '💅',
    bgAccent: 'bg-rose-100',
  },
  {
    title: 'Skropstu',
    highlight: 'pagarināšana',
    description: 'Klasiskā, 2D-3D tehnika un skropstu laminēšana. Dabīgs un skaists izskats.',
    gradient: 'from-violet-500/20 via-purple-400/20 to-pink-500/20',
    emoji: '✨',
    bgAccent: 'bg-violet-100',
  },
  {
    title: 'Permanentais',
    highlight: 'grims',
    description: 'Lūpu un uzacu permanentais grims. Modernas tehnikas un ilgstošs rezultāts.',
    gradient: 'from-amber-500/20 via-orange-400/20 to-rose-500/20',
    emoji: '🎨',
    bgAccent: 'bg-amber-100',
  },
  {
    title: 'Relaksējoša',
    highlight: 'masāža',
    description: 'Sejas un ķermeņa masāža. Profesionāla pieeja un patīkama atmosfēra.',
    gradient: 'from-emerald-500/20 via-teal-400/20 to-cyan-500/20',
    emoji: '🧖‍♀️',
    bgAccent: 'bg-emerald-100',
  },
];

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 400);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full h-[520px] rounded-3xl overflow-hidden shadow-2xl">
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-all duration-700`}
      />
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-center p-10">
        <div
          className={`transition-all duration-400 ${
            isTransitioning ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
          <div className={`w-24 h-24 ${slide.bgAccent} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
            <span className="text-5xl">{slide.emoji}</span>
          </div>

          <h3 className="text-3xl font-extrabold text-gray-900 mb-2">
            {slide.title}{' '}
            <span className="gradient-text">{slide.highlight}</span>
          </h3>

          <p className="text-gray-600 max-w-sm mx-auto leading-relaxed text-lg">
            {slide.description}
          </p>
        </div>

        {/* Dots */}
        <div className="absolute bottom-8 flex space-x-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentSlide(i);
                  setIsTransitioning(false);
                }, 300);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? 'w-8 bg-primary-500'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-200/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-200/30 rounded-full blur-3xl" />
    </div>
  );
}
