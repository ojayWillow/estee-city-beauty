import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  parse,
  addMinutes,
  isWithinInterval,
  isBefore,
} from 'date-fns';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    const searchParams = request.nextUrl.searchParams;
    const creatorId = searchParams.get('creatorId');
    const serviceId = searchParams.get('serviceId');

    if (!creatorId || !serviceId) {
      return NextResponse.json(
        { error: 'Missing creatorId or serviceId' },
        { status: 400 }
      );
    }

    const { data: service } = await supabase
      .from('services')
      .select('duration_minutes')
      .eq('id', serviceId)
      .single();

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    const { data: availability } = await supabase
      .from('availability')
      .select('*')
      .eq('creator_id', creatorId)
      .eq('is_active', true);

    if (!availability || availability.length === 0) {
      return NextResponse.json({ slots: {} });
    }

    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(addMinutes(now, 14 * 24 * 60), { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

    const { data: appointments } = await supabase
      .from('appointments')
      .select('start_time, end_time')
      .eq('creator_id', creatorId)
      .gte('start_time', weekStart.toISOString())
      .lte('start_time', weekEnd.toISOString())
      .neq('status', 'cancelled');

    const slots: { [key: string]: { time: string; available: boolean }[] } = {};

    days.forEach((day) => {
      const dayOfWeek = day.getDay();
      const dayAvailability = availability.find((a) => a.day_of_week === dayOfWeek);

      if (!dayAvailability) return;

      const dateKey = format(day, 'yyyy-MM-dd');
      const startTime = parse(dayAvailability.start_time, 'HH:mm:ss', day);
      const endTime = parse(dayAvailability.end_time, 'HH:mm:ss', day);

      const timeSlots: { time: string; available: boolean }[] = [];
      let currentSlot = startTime;

      while (isBefore(addMinutes(currentSlot, service.duration_minutes), endTime) ||
             currentSlot.getTime() === endTime.getTime()) {
        const slotStart = currentSlot;
        const slotEnd = addMinutes(currentSlot, service.duration_minutes);

        const isPast = isBefore(slotStart, now);

        const isBooked = appointments?.some((apt) => {
          const aptStart = new Date(apt.start_time);
          const aptEnd = new Date(apt.end_time);
          return (
            isWithinInterval(slotStart, { start: aptStart, end: aptEnd }) ||
            isWithinInterval(slotEnd, { start: aptStart, end: aptEnd }) ||
            (slotStart <= aptStart && slotEnd >= aptEnd)
          );
        });

        timeSlots.push({
          time: format(slotStart, 'HH:mm'),
          available: !isPast && !isBooked,
        });

        currentSlot = addMinutes(currentSlot, 30);
      }

      if (timeSlots.length > 0) {
        slots[dateKey] = timeSlots;
      }
    });

    return NextResponse.json({ slots });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
