
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useHealthRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, userProfile } = useAuth();
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
      console.log('Fetched health records:', data);
      setRecords(data || []);
    } catch (error: any) {
      console.error('Error fetching health records:', error);
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
      console.log('Creating health record with data:', recordData);
      
      const { data, error } = await supabase
        .from('health_records')
        .insert([recordData])
        .select()
        .single();

      if (error) {
        console.error('Error creating health record:', error);
        throw error;
      }
      
      console.log('Created health record:', data);
      
      toast({
        title: "Health record created!",
        description: "The health record has been created successfully."
      });
      
      await fetchRecords();
      return { data, error: null };
    } catch (error: any) {
      console.error('Error in createRecord:', error);
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
      console.log('Updating health record:', id, updates);
      
      const { data, error } = await supabase
        .from('health_records')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating health record:', error);
        throw error;
      }
      
      console.log('Updated health record:', data);
      
      toast({
        title: "Record updated",
        description: "The health record has been updated successfully."
      });
      
      await fetchRecords();
      return { data, error: null };
    } catch (error: any) {
      console.error('Error in updateRecord:', error);
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
