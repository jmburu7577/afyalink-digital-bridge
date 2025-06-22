
-- Update profiles table to include admin role
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_check CHECK (role IN ('patient', 'doctor', 'admin'));

-- Create messages table for chat functionality
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type TEXT CHECK (message_type IN ('text', 'file', 'system')) DEFAULT 'text',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create video calls table
CREATE TABLE public.video_calls (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE CASCADE,
  room_id TEXT UNIQUE NOT NULL,
  status TEXT CHECK (status IN ('waiting', 'active', 'ended')) DEFAULT 'waiting',
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on new tables
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_calls ENABLE ROW LEVEL SECURITY;

-- RLS Policies for messages
CREATE POLICY "Users can view their own messages" ON public.messages FOR SELECT USING (
  sender_id = auth.uid() OR receiver_id = auth.uid()
);
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (sender_id = auth.uid());
CREATE POLICY "Users can update their received messages" ON public.messages FOR UPDATE USING (receiver_id = auth.uid());

-- RLS Policies for video calls
CREATE POLICY "Users can view their video calls" ON public.video_calls FOR SELECT USING (
  appointment_id IN (
    SELECT id FROM public.appointments WHERE 
    patient_id = auth.uid() OR 
    doctor_id IN (SELECT id FROM public.doctors WHERE user_id = auth.uid())
  )
);
CREATE POLICY "Doctors can manage video calls" ON public.video_calls FOR ALL USING (
  appointment_id IN (
    SELECT id FROM public.appointments WHERE 
    doctor_id IN (SELECT id FROM public.doctors WHERE user_id = auth.uid())
  )
);

-- Update RLS policies for doctors to allow admins to manage
CREATE POLICY "Admins can manage all doctors" ON public.doctors FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Create first admin user (you'll need to update this with actual user ID after signup)
-- This is just a placeholder - you'll need to manually update a user's role to 'admin' after they sign up

-- Add indexes for better performance
CREATE INDEX idx_messages_appointment ON public.messages(appointment_id);
CREATE INDEX idx_messages_sender ON public.messages(sender_id);
CREATE INDEX idx_messages_receiver ON public.messages(receiver_id);
CREATE INDEX idx_video_calls_appointment ON public.video_calls(appointment_id);
CREATE INDEX idx_appointments_doctor ON public.appointments(doctor_id);
CREATE INDEX idx_appointments_patient ON public.appointments(patient_id);
