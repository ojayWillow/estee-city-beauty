'use client';

import { useState, useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { lv } from 'date-fns/locale';
import { Appointment } from '@/types';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Button from '@/components/ui/Button';
import { X, Check, Clock, Mail, Phone, Calendar as CalendarIcon } from 'lucide-react';

const locales = { lv };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

interface AppointmentCalendarProps {
  appointments: Appointment[];
  creatorId: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: Appointment;
}

export default function AppointmentCalendar({
  appointments,
  creatorId,
}: AppointmentCalendarProps) {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const events: CalendarEvent[] = useMemo(() => {
    return appointments.map((apt) => ({
      id: apt.id,
      title: `${apt.client_name} - ${apt.service?.name || 'Pakalpojums'}`,
      start: new Date(apt.start_time),
      end: new Date(apt.end_time),
      resource: apt,
    }));
  }, [appointments]);

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedAppointment(event.resource);
  };

  const handleUpdateStatus = async (status: string) => {
    if (!selectedAppointment) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/appointments/${selectedAppointment.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const eventStyleGetter = (event: CalendarEvent) => {
    const status = event.resource.status;
    let backgroundColor = '#e25d7a';

    if (status === 'confirmed') backgroundColor = '#10b981';
    if (status === 'cancelled') backgroundColor = '#6b7280';
    if (status === 'completed') backgroundColor = '#3b82f6';

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Rezervāciju kalendārs</h2>
          <div className="h-[600px]">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={handleSelectEvent}
              eventPropGetter={eventStyleGetter}
              views={['month', 'week', 'day']}
              defaultView="week"
              culture="lv"
            />
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#e25d7a' }}></div>
              <span>Gaida</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#10b981' }}></div>
              <span>Apstiprināta</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#3b82f6' }}></div>
              <span>Pabeigta</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#6b7280' }}></div>
              <span>Atcelta</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        {selectedAppointment ? (
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4 sticky top-8">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">Rezervācijas detaļas</h3>
              <button onClick={() => setSelectedAppointment(null)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-semibold">Laiks</p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(selectedAppointment.start_time), 'd MMM yyyy, HH:mm', { locale: lv })}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CalendarIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-semibold">Pakalpojums</p>
                  <p className="text-sm text-gray-600">
                    {selectedAppointment.service?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedAppointment.service?.duration_minutes} min • €{selectedAppointment.service?.price}
                  </p>
                </div>
              </div>

              <div className="border-t pt-3">
                <p className="font-semibold mb-2">Klients</p>
                <p className="text-sm">{selectedAppointment.client_name}</p>
                <div className="flex items-center space-x-2 mt-1 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${selectedAppointment.client_email}`} className="hover:text-primary-600">
                    {selectedAppointment.client_email}
                  </a>
                </div>
                <div className="flex items-center space-x-2 mt-1 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${selectedAppointment.client_phone}`} className="hover:text-primary-600">
                    {selectedAppointment.client_phone}
                  </a>
                </div>
              </div>

              {selectedAppointment.notes && (
                <div className="border-t pt-3">
                  <p className="font-semibold mb-1">Piezīmes</p>
                  <p className="text-sm text-gray-600">{selectedAppointment.notes}</p>
                </div>
              )}

              <div className="border-t pt-3">
                <p className="font-semibold mb-2">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                  selectedAppointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  selectedAppointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  selectedAppointment.status === 'cancelled' ? 'bg-gray-100 text-gray-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {selectedAppointment.status === 'pending' ? 'Gaida apstiprinājumu' :
                   selectedAppointment.status === 'confirmed' ? 'Apstiprināta' :
                   selectedAppointment.status === 'cancelled' ? 'Atcelta' :
                   'Pabeigta'}
                </span>
              </div>
            </div>

            {selectedAppointment.status !== 'completed' && selectedAppointment.status !== 'cancelled' && (
              <div className="border-t pt-4 space-y-2">
                <p className="font-semibold mb-2">Darbības</p>
                {selectedAppointment.status === 'pending' && (
                  <Button
                    onClick={() => handleUpdateStatus('confirmed')}
                    disabled={isUpdating}
                    fullWidth
                    size="sm"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Apstiprināt
                  </Button>
                )}
                {selectedAppointment.status === 'confirmed' && (
                  <Button
                    onClick={() => handleUpdateStatus('completed')}
                    disabled={isUpdating}
                    fullWidth
                    size="sm"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Atzīmēt kā paveiktu
                  </Button>
                )}
                <Button
                  onClick={() => handleUpdateStatus('cancelled')}
                  disabled={isUpdating}
                  variant="outline"
                  fullWidth
                  size="sm"
                >
                  <X className="h-4 w-4 mr-2" />
                  Atcelt
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center text-gray-500">
            <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Izvēlies rezervāciju, lai redzētu detaļas</p>
          </div>
        )}
      </div>
    </div>
  );
}
