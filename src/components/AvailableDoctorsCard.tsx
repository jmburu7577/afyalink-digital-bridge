
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Video, Clock, User, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface Doctor {
  id: string;
  specialty: string;
  consultation_fee: number;
  user: {
    id: string;
    full_name: string;
    email: string;
  };
}

const AvailableDoctorsCard = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchAvailableDoctors();
  }, []);

  const fetchAvailableDoctors = async () => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select(`
          id,
          specialty,
          consultation_fee,
          user:profiles!doctors_user_id_fkey(id, full_name, email)
        `)
        .eq('is_available', true)
        .eq('is_verified', true)
        .limit(5);

      if (error) throw error;
      setDoctors(data || []);
    } catch (error: any) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const startCallWithDoctor = async (doctorId: string, doctorName: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to start a video call.",
        variant: "destructive"
      });
      return;
    }

    try {
      const now = new Date();
      const appointmentDate = now.toISOString().split('T')[0];
      const appointmentTime = now.toTimeString().split(' ')[0].substring(0, 5);

      const { data, error } = await supabase
        .from('appointments')
        .insert([{
          patient_id: user.id,
          doctor_id: doctorId,
          appointment_date: appointmentDate,
          appointment_time: appointmentTime,
          consultation_type: 'video',
          status: 'scheduled',
          notes: 'Direct video consultation'
        }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Connecting...",
        description: `Starting video call with Dr. ${doctorName}`,
      });

      navigate(`/consultation/${data.id}`);
    } catch (error: any) {
      toast({
        title: "Connection failed",
        description: "Failed to start video call. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading available doctors...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Available Now
          <Badge className="bg-green-100 text-green-800">
            {doctors.length} doctor{doctors.length !== 1 ? 's' : ''} online
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {doctors.length === 0 ? (
          <div className="text-center py-8">
            <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Doctors Available</h3>
            <p className="text-gray-500">All doctors are currently busy. Please try again later.</p>
          </div>
        ) : (
          doctors.map((doctor) => (
            <div key={doctor.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-blue-500 text-white">
                  {doctor.user?.full_name?.split(' ').map(n => n[0]).join('') || 'Dr'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold">Dr. {doctor.user?.full_name || 'Unknown'}</h3>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">Available now</span>
                  <Star className="h-4 w-4 text-yellow-400 fill-current ml-2" />
                  <span className="text-sm text-gray-500">4.8</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">KSh {doctor.consultation_fee || 500}</p>
                <Button
                  size="sm"
                  className="mt-2 bg-blue-500 hover:bg-blue-600"
                  onClick={() => startCallWithDoctor(doctor.id, doctor.user?.full_name || 'Unknown')}
                >
                  <Video className="h-4 w-4 mr-2" />
                  Start Call
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default AvailableDoctorsCard;
