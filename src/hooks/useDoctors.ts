
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchDoctors = async () => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select(`
          *,
          user:profiles(full_name, email, phone)
        `)
        .eq('is_verified', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDoctors(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading doctors",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createDoctorProfile = async (doctorData: any) => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .insert([doctorData])
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Doctor profile created!",
        description: "Doctor profile has been created successfully."
      });
      
      fetchDoctors();
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Error creating doctor profile",
        description: error.message,
        variant: "destructive"
      });
      return { data: null, error };
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return {
    doctors,
    loading,
    createDoctorProfile,
    refetch: fetchDoctors
  };
};
