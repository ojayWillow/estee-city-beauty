'use client';

import { useState } from 'react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { lv } from 'date-fns/locale';
import Button from '@/components/ui/Button';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface TimeSlotPickerProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelectDateTime: (date: Date, time: string) => void;
  availableSlots: { [key: string]: TimeSlot[] };
}

export default function TimeSlotPicker({
  selectedDate,
  selectedTime,
  onSelectDateTime,
  availableSlots,
}: TimeSlotPickerProps) {
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [pickedDate, setPickedDate] = useState<Date | null>(selectedDate);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const handleDateSelect = (date: Date) => {
    setPickedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    if (pickedDate) {
      onSelectDateTime(pickedDate, time);
    }
  };

  const dateKey = pickedDate ? format(pickedDate, 'yyyy-MM-dd') : '';
  const slots = availableSlots[dateKey] || [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Izvēlies datumu un laiku</h2>

      {/* Week Navigator */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setWeekStart(addDays(weekStart, -7))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="font-semibold">
          {format(weekStart, 'd MMM', { locale: lv })} -{' '}
          {format(addDays(weekStart, 6), 'd MMM yyyy', { locale: lv })}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setWeekStart(addDays(weekStart, 7))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Day Selector */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <button
            key={day.toISOString()}
            onClick={() => handleDateSelect(day)}
            className={clsx(
              'p-3 rounded-lg text-center transition',
              {
                'bg-primary-600 text-white': pickedDate && isSameDay(day, pickedDate),
                'bg-white hover:bg-gray-50 border border-gray-200': !pickedDate || !isSameDay(day, pickedDate),
              }
            )}
          >
            <div className="text-xs font-medium">
              {format(day, 'EEE', { locale: lv })}
            </div>
            <div className="text-lg font-bold">{format(day, 'd')}</div>
          </button>
        ))}
      </div>

      {/* Time Slots */}
      {pickedDate && (
        <div>
          <h3 className="font-semibold mb-3">
            Pieejamie laiki - {format(pickedDate, 'd MMMM', { locale: lv })}
          </h3>
          {slots.length > 0 ? (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => slot.available && handleTimeSelect(slot.time)}
                  disabled={!slot.available}
                  className={clsx(
                    'p-3 rounded-lg font-medium transition',
                    {
                      'bg-primary-600 text-white': selectedTime === slot.time,
                      'bg-white hover:bg-gray-50 border border-gray-200': selectedTime !== slot.time && slot.available,
                      'bg-gray-100 text-gray-400 cursor-not-allowed': !slot.available,
                    }
                  )}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Nav pieejamu laiku šajā dienā
            </p>
          )}
        </div>
      )}
    </div>
  );
}
