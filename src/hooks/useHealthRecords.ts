
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useHealthRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchRecords = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('health_records')
        .select(`
          *,
          doctor:doctors(
            specialty,
            user:profiles(full_name)
          ),
          patient:profiles(full_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRecords(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading health records",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createRecord = async (recordData: any) => {
    try {
      const { data, error } = await supabase
        .from('health_records')
        .insert([recordData])
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Health record created!",
        description: "The health record has been created successfully."
      });
      
      fetchRecords();
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Error creating health record",
        description: error.message,
        variant: "destructive"
      });
      return { data: null, error };
    }
  };

  const updateRecord = async (id: string, updates: any) => {
    try {
      const { data, error } = await supabase
        .from('health_records')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Record updated",
        description: "The health record has been updated successfully."
      });
      
      fetchRecords();
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Error updating record",
        description: error.message,
        variant: "destructive"
      });
      return { data: null, error };
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [user]);

  return {
    records,
    loading,
    createRecord,
    updateRecord,
    refetch: fetchRecords
  };
};
