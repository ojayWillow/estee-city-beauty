'use client';

import { Service } from '@/types';
import Card from '@/components/ui/Card';
import { Check } from 'lucide-react';
import clsx from 'clsx';

interface ServiceSelectorProps {
  services: Service[];
  selectedService: Service | null;
  onSelect: (service: Service) => void;
}

export default function ServiceSelector({
  services,
  selectedService,
  onSelect,
}: ServiceSelectorProps) {
  const categories = Array.from(new Set(services.map((s) => s.category)));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Izvēlies pakalpojumu</h2>
      {categories.map((category) => (
        <div key={category}>
          <h3 className="text-lg font-semibold mb-3">{category}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {services
              .filter((s) => s.category === category)
              .map((service) => (
                <Card
                  key={service.id}
                  padding="sm"
                  className={clsx(
                    'cursor-pointer transition hover:shadow-xl',
                    {
                      'ring-2 ring-primary-600': selectedService?.id === service.id,
                    }
                  )}
                  onClick={() => onSelect(service)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{service.name}</h4>
                      {service.description && (
                        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                      )}
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>⏱️ {service.duration_minutes} min</span>
                        <span className="font-semibold text-primary-600">
                          €{service.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    {selectedService?.id === service.id && (
                      <Check className="h-6 w-6 text-primary-600 flex-shrink-0" />
                    )}
                  </div>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
