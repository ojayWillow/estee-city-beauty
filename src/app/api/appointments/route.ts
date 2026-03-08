import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { addMinutes, parseISO } from 'date-fns';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    const body = await request.json();

    const { creatorId, serviceId, date, time, clientName, clientEmail, clientPhone, notes } = body;

    if (!creatorId || !serviceId || !date || !time || !clientName || !clientEmail || !clientPhone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data: service } = await supabase
      .from('services')
      .select('duration_minutes')
      .eq('id', serviceId)
      .single();

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    const startDateTime = parseISO(`${date.split('T')[0]}T${time}:00`);
    const endDateTime = addMinutes(startDateTime, service.duration_minutes);

    const { data: existingAppointments } = await supabase
      .from('appointments')
      .select('*')
      .eq('creator_id', creatorId)
      .gte('start_time', startDateTime.toISOString())
      .lt('start_time', endDateTime.toISOString())
      .neq('status', 'cancelled');

    if (existingAppointments && existingAppointments.length > 0) {
      return NextResponse.json(
        { error: 'Time slot is not available' },
        { status: 409 }
      );
    }

    const { data: appointment, error } = await supabase
      .from('appointments')
      .insert({
        creator_id: creatorId,
        service_id: serviceId,
        client_name: clientName,
        client_email: clientEmail,
        client_phone: clientPhone,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
        status: 'pending',
        notes: notes || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to create appointment' },
        { status: 500 }
      );
    }

    return NextResponse.json({ appointment }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    const searchParams = request.nextUrl.searchParams;
    const creatorId = searchParams.get('creatorId');

    let query = supabase
      .from('appointments')
      .select(`
        *,
        creator:creators(*),
        service:services(*)
      `)
      .order('start_time', { ascending: true });

    if (creatorId) {
      query = query.eq('creator_id', creatorId);
    }

    const { data: appointments, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch appointments' },
        { status: 500 }
      );
    }

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
