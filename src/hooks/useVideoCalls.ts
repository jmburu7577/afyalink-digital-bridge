
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useVideoCalls = () => {
  const [videoCalls, setVideoCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const createVideoCall = async (appointmentId: string) => {
    try {
      const roomId = `room_${appointmentId}_${Date.now()}`;
      
      const { data, error } = await supabase
        .from('video_calls')
        .insert([{
          appointment_id: appointmentId,
          room_id: roomId,
          status: 'waiting'
        }])
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Video call created!",
        description: "Video call room has been created successfully."
      });
      
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Error creating video call",
        description: error.message,
        variant: "destructive"
      });
      return { data: null, error };
    }
  };

  const startVideoCall = async (callId: string) => {
    try {
      const { data, error } = await supabase
        .from('video_calls')
        .update({ 
          status: 'active',
          started_at: new Date().toISOString()
        })
        .eq('id', callId)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Video call started!",
        description: "The video call is now active."
      });
      
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Error starting video call",
        description: error.message,
        variant: "destructive"
      });
      return { data: null, error };
    }
  };

  const endVideoCall = async (callId: string) => {
    try {
      const { data, error } = await supabase
        .from('video_calls')
        .update({ 
          status: 'ended',
          ended_at: new Date().toISOString()
        })
        .eq('id', callId)
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Video call ended",
        description: "The video call has been ended successfully."
      });
      
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Error ending video call",
        description: error.message,
        variant: "destructive"
      });
      return { data: null, error };
    }
  };

  return {
    videoCalls,
    loading,
    createVideoCall,
    startVideoCall,
    endVideoCall
  };
};
