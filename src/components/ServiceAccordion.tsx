'use client';

import { useState } from 'react';
import { ChevronDown, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Service {
  name: string;
  duration: string;
  price: number;
}

interface ServiceCategory {
  category: string;
  icon: ReactNode;
  bg: string;
  iconColor: string;
  services: Service[];
}

export default function ServiceAccordion({ categories }: { categories: ServiceCategory[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2 sm:space-y-4 max-w-4xl mx-auto">
      {categories.map((cat, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={cat.category}
            className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between px-3 py-3 sm:p-6 text-left"
            >
              <div className="flex items-center">
                <div className={`w-9 h-9 sm:w-12 sm:h-12 ${cat.bg} rounded-xl sm:rounded-2xl flex items-center justify-center ${cat.iconColor} mr-3 flex-shrink-0`}>
                  {cat.icon}
                </div>
                <div>
                  <h3 className="text-base sm:text-xl font-bold text-gray-900">{cat.category}</h3>
                  <p className="text-xs sm:text-sm text-gray-400">
                    {cat.services.length} pakalpojumi • no €{Math.min(...cat.services.map(s => s.price))}
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`h-4 w-4 sm:h-5 sm:w-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden`}
            >
              <div className="px-3 sm:px-6 pb-3 sm:pb-6 space-y-1 sm:space-y-2">
                {cat.services.map((service) => (
                  <Link
                    key={service.name}
                    href={`/book?service=${encodeURIComponent(service.name)}`}
                    className="group flex items-center justify-between px-2 py-2.5 sm:p-4 rounded-xl hover:bg-primary-50/50 transition-all duration-200"
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition text-sm sm:text-base truncate">
                        {service.name}
                      </h4>
                      <span className="text-xs text-gray-400 flex items-center mt-0.5">
                        <Clock className="h-3 w-3 mr-1" />
                        {service.duration}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <span className="text-base sm:text-xl font-bold gradient-text">€{service.price}</span>
                      <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
