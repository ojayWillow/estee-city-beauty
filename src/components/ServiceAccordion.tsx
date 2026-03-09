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
    <div className="space-y-4 max-w-4xl mx-auto">
      {categories.map((cat, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={cat.category}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between p-5 md:p-6 text-left"
            >
              <div className="flex items-center">
                <div className={`w-12 h-12 ${cat.bg} rounded-2xl flex items-center justify-center ${cat.iconColor} mr-4 flex-shrink-0`}>
                  {cat.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{cat.category}</h3>
                  <p className="text-sm text-gray-400">
                    {cat.services.length} pakalpojumi • no €{Math.min(...cat.services.map(s => s.price))}
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
              } overflow-hidden`}
            >
              <div className="px-5 md:px-6 pb-5 md:pb-6 space-y-2">
                {cat.services.map((service) => (
                  <Link
                    key={service.name}
                    href={`/book?service=${encodeURIComponent(service.name)}`}
                    className="group flex items-center justify-between p-4 rounded-xl hover:bg-primary-50/50 transition-all duration-200"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition">
                        {service.name}
                      </h4>
                      <span className="text-sm text-gray-400 flex items-center mt-0.5">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {service.duration}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-xl font-bold gradient-text">€{service.price}</span>
                      <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-200" />
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
