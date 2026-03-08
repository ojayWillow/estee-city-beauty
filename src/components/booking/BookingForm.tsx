'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Service, Creator } from '@/types';
import { format } from 'date-fns';
import { lv } from 'date-fns/locale';

interface BookingFormProps {
  service: Service;
  creator: Creator;
  selectedDate: Date;
  selectedTime: string;
  onSubmit: (data: BookingData) => Promise<void>;
  onBack: () => void;
}

export interface BookingData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
}

export default function BookingForm({
  service,
  creator,
  selectedDate,
  selectedTime,
  onSubmit,
  onBack,
}: BookingFormProps) {
  const [formData, setFormData] = useState<BookingData>({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<BookingData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<BookingData> = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Vārds ir obligāts';
    }
    if (!formData.clientEmail.trim()) {
      newErrors.clientEmail = 'E-pasts ir obligāts';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
      newErrors.clientEmail = 'Nekorekts e-pasta formāts';
    }
    if (!formData.clientPhone.trim()) {
      newErrors.clientPhone = 'Tālrunis ir obligāts';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Apstiprināt rezervāciju</h2>

      {/* Booking Summary */}
      <div className="bg-primary-50 rounded-lg p-6 space-y-2">
        <div className="flex justify-between">
          <span className="font-semibold">Pakalpojums:</span>
          <span>{service.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Meistars:</span>
          <span>{creator.full_name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Datums:</span>
          <span>{format(selectedDate, 'd MMMM yyyy', { locale: lv })}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Laiks:</span>
          <span>{selectedTime}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Ilgums:</span>
          <span>{service.duration_minutes} min</span>
        </div>
        <div className="flex justify-between text-lg">
          <span className="font-bold">Cena:</span>
          <span className="font-bold text-primary-600">€{service.price.toFixed(2)}</span>
        </div>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Vārds un uzvārds"
          value={formData.clientName}
          onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
          error={errors.clientName}
          placeholder="Jānis Bērziņš"
        />
        <Input
          label="E-pasts"
          type="email"
          value={formData.clientEmail}
          onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
          error={errors.clientEmail}
          placeholder="janis@example.com"
        />
        <Input
          label="Tālrunis"
          type="tel"
          value={formData.clientPhone}
          onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
          error={errors.clientPhone}
          placeholder="+371 20000000"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Papildu informācija (neobligāti)
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            placeholder="Papildu vēlmes vai komentāri..."
          />
        </div>

        <div className="flex space-x-4 pt-4">
          <Button type="button" variant="outline" onClick={onBack} fullWidth>
            Atpakaļ
          </Button>
          <Button type="submit" disabled={isSubmitting} fullWidth>
            {isSubmitting ? 'Apstrādā...' : 'Rezervēt'}
          </Button>
        </div>
      </form>
    </div>
  );
}
