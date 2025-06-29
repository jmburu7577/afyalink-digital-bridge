
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const useInstantCall = () => {
  const [loading, setLoading] = useState(false);
  const [searchingDoctor, setSearchingDoctor] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const findAvailableDoctor = async () => {
    try {
      const { data: availableDoctors, error } = await supabase
        .from('doctors')
        .select(`
          id,
          specialty,
          consultation_fee,
          user:profiles!doctors_user_id_fkey(id, full_name, email)
        `)
        .eq('is_available', true)
        .eq('is_verified', true)
        .limit(1);

      if (error) throw error;
      
      if (!availableDoctors || availableDoctors.length === 0) {
        return null;
      }

      return availableDoctors[0];
    } catch (error: any) {
      console.error('Error finding available doctor:', error);
      return null;
    }
  };

  const createInstantAppointment = async (doctorId: string) => {
    try {
      const now = new Date();
      const appointmentDate = now.toISOString().split('T')[0];
      const appointmentTime = now.toTimeString().split(' ')[0].substring(0, 5);

      const { data, error } = await supabase
        .from('appointments')
        .insert([{
          patient_id: user?.id,
          doctor_id: doctorId,
          appointment_date: appointmentDate,
          appointment_time: appointmentTime,
          consultation_type: 'video',
          status: 'scheduled',
          notes: 'Instant video consultation'
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Error creating instant appointment:', error);
      throw error;
    }
  };

  const startInstantCall = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to start a video call.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setSearchingDoctor(true);

    try {
      // Find available doctor
      const availableDoctor = await findAvailableDoctor();
      
      if (!availableDoctor) {
        toast({
          title: "No doctors available",
          description: "All doctors are currently busy. Please try again later or schedule an appointment.",
          variant: "destructive"
        });
        return;
      }

      // Create instant appointment
      const appointment = await createInstantAppointment(availableDoctor.id);
      
      toast({
        title: "Doctor found!",
        description: `Connecting you with Dr. ${availableDoctor.user?.full_name}`,
      });

      // Navigate to consultation room
      setTimeout(() => {
        navigate(`/consultation/${appointment.id}`);
      }, 1500);

    } catch (error: any) {
      toast({
        title: "Connection failed",
        description: error.message || "Failed to connect with a doctor. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setSearchingDoctor(false);
    }
  };

  return {
    startInstantCall,
    loading,
    searchingDoctor
  };
};
