export interface Creator {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  bio: string | null;
  specialties: string[];
  avatar_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  price: number;
  category: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  creator_id: string;
  service_id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes: string | null;
  created_at: string;
  updated_at: string;
  creator?: Creator;
  service?: Service;
}

export interface Availability {
  id: string;
  creator_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TimeSlot {
  start: Date;
  end: Date;
  available: boolean;
}
