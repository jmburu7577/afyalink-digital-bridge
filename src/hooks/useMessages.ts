
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useMessages = (appointmentId?: string) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchMessages = async () => {
    if (!user || !appointmentId) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!sender_id(full_name, role),
          receiver:profiles!receiver_id(full_name, role)
        `)
        .eq('appointment_id', appointmentId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading messages",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (content: string, receiverId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([{
          sender_id: user?.id,
          receiver_id: receiverId,
          appointment_id: appointmentId,
          content,
          message_type: 'text'
        }])
        .select()
        .single();

      if (error) throw error;
      
      fetchMessages(); // Refresh messages
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive"
      });
      return { data: null, error };
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', messageId)
        .eq('receiver_id', user?.id);
    } catch (error: any) {
      console.error('Error marking message as read:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [user, appointmentId]);

  return {
    messages,
    loading,
    sendMessage,
    markAsRead,
    refetch: fetchMessages
  };
};
