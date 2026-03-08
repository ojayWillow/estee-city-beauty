'use client';

import { Creator } from '@/types';
import Card from '@/components/ui/Card';
import { Check, User } from 'lucide-react';
import clsx from 'clsx';

interface CreatorSelectorProps {
  creators: Creator[];
  selectedCreator: Creator | null;
  onSelect: (creator: Creator) => void;
}

export default function CreatorSelector({
  creators,
  selectedCreator,
  onSelect,
}: CreatorSelectorProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Izvēlies meistaru</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {creators.map((creator) => (
          <Card
            key={creator.id}
            padding="sm"
            className={clsx(
              'cursor-pointer transition hover:shadow-xl',
              {
                'ring-2 ring-primary-600': selectedCreator?.id === creator.id,
              }
            )}
            onClick={() => onSelect(creator)}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {creator.avatar_url ? (
                  <img
                    src={creator.avatar_url}
                    alt={creator.full_name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                    <User className="h-8 w-8 text-primary-600" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-lg">{creator.full_name}</h4>
                {creator.bio && (
                  <p className="text-sm text-gray-600 mt-1">{creator.bio}</p>
                )}
                {creator.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {creator.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {selectedCreator?.id === creator.id && (
                <Check className="h-6 w-6 text-primary-600 flex-shrink-0" />
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
