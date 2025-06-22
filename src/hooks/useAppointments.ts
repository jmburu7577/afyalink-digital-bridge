
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchAppointments = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          doctor:doctors(
            id,
            specialty,
            user:profiles(full_name)
          ),
          patient:profiles(full_name)
        `)
        .order('appointment_date', { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading appointments",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createAppointment = async (appointmentData: any) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([{
          ...appointmentData,
          patient_id: user?.id
        }])
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Appointment scheduled!",
        description: "Your appointment has been successfully scheduled."
      });
      
      fetchAppointments();
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Error scheduling appointment",
        description: error.message,
        variant: "destructive"
      });
      return { data: null, error };
    }
  };

  const updateAppointment = async (id: string, updates: any) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Appointment updated",
        description: "The appointment has been updated successfully."
      });
      
      fetchAppointments();
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Error updating appointment",
        description: error.message,
        variant: "destructive"
      });
      return { data: null, error };
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  return {
    appointments,
    loading,
    createAppointment,
    updateAppointment,
    refetch: fetchAppointments
  };
};
