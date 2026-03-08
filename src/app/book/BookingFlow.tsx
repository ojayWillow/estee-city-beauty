'use client';

import { useState } from 'react';
import { Service, Creator, Appointment } from '@/types';
import ServiceSelector from '@/components/booking/ServiceSelector';
import CreatorSelector from '@/components/booking/CreatorSelector';
import TimeSlotPicker from '@/components/booking/TimeSlotPicker';
import BookingForm, { BookingData } from '@/components/booking/BookingForm';
import Button from '@/components/ui/Button';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BookingFlowProps {
  services: Service[];
  creators: Creator[];
}

type Step = 'service' | 'creator' | 'datetime' | 'confirm' | 'success';

export default function BookingFlow({ services, creators }: BookingFlowProps) {
  const router = useRouter();
  const [step, setStep] = useState<Step>('service');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<{ [key: string]: any[] }>({});

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setStep('creator');
  };

  const handleCreatorSelect = async (creator: Creator) => {
    setSelectedCreator(creator);
    await fetchAvailableSlots(creator.id, selectedService!.id);
    setStep('datetime');
  };

  const fetchAvailableSlots = async (creatorId: string, serviceId: string) => {
    try {
      const response = await fetch(
        `/api/availability?creatorId=${creatorId}&serviceId=${serviceId}`
      );
      const data = await response.json();
      setAvailableSlots(data.slots || {});
    } catch (error) {
      console.error('Failed to fetch slots:', error);
    }
  };

  const handleDateTimeSelect = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setStep('confirm');
  };

  const handleBookingSubmit = async (bookingData: BookingData) => {
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creatorId: selectedCreator!.id,
          serviceId: selectedService!.id,
          date: selectedDate,
          time: selectedTime,
          ...bookingData,
        }),
      });

      if (!response.ok) throw new Error('Booking failed');

      setStep('success');
    } catch (error) {
      console.error('Booking error:', error);
      alert('Rezervācija neizdevās. Lūdzu mēģiniet vēlreiz.');
    }
  };

  if (step === 'success') {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="bg-green-50 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold">Rezervācija veiksmiga!</h2>
        <p className="text-gray-600">
          Tava rezervācija ir veiksmigi saglabāta. Sanemsi apstiprinājumu uz e-pastu.
        </p>
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-2 text-left">
          <div className="flex justify-between">
            <span className="font-semibold">Pakalpojums:</span>
            <span>{selectedService?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Meistars:</span>
            <span>{selectedCreator?.full_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Datums un laiks:</span>
            <span>{selectedDate?.toLocaleDateString('lv-LV')} {selectedTime}</span>
          </div>
        </div>
        <Button onClick={() => router.push('/')} fullWidth>
          Atgriezties sākumlapā
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-2">
        {[
          { id: 'service', label: 'Pakalpojums' },
          { id: 'creator', label: 'Meistars' },
          { id: 'datetime', label: 'Datums/Laiks' },
          { id: 'confirm', label: 'Apstiprināt' },
        ].map((s, i) => (
          <div key={s.id} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step === s.id || i < ['service', 'creator', 'datetime', 'confirm'].indexOf(step)
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {i + 1}
            </div>
            {i < 3 && <div className="w-12 h-0.5 bg-gray-200 mx-2" />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        {step === 'service' && (
          <ServiceSelector
            services={services}
            selectedService={selectedService}
            onSelect={handleServiceSelect}
          />
        )}

        {step === 'creator' && (
          <div className="space-y-6">
            <CreatorSelector
              creators={creators}
              selectedCreator={selectedCreator}
              onSelect={handleCreatorSelect}
            />
            <Button variant="outline" onClick={() => setStep('service')} fullWidth>
              Atpakaļ
            </Button>
          </div>
        )}

        {step === 'datetime' && (
          <div className="space-y-6">
            <TimeSlotPicker
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onSelectDateTime={handleDateTimeSelect}
              availableSlots={availableSlots}
            />
            <Button variant="outline" onClick={() => setStep('creator')} fullWidth>
              Atpakaļ
            </Button>
          </div>
        )}

        {step === 'confirm' && selectedService && selectedCreator && selectedDate && selectedTime && (
          <BookingForm
            service={selectedService}
            creator={selectedCreator}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSubmit={handleBookingSubmit}
            onBack={() => setStep('datetime')}
          />
        )}
      </div>
    </div>
  );
}
