
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VideoCallInterface from '@/components/VideoCallInterface';
import ChatInterface from '@/components/ChatInterface';
import PatientDataForm from '@/components/PatientDataForm';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Video, MessageCircle, FileText } from 'lucide-react';

const ConsultationRoom = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const { userProfile } = useAuth();
  const [appointmentData, setAppointmentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointment = async () => {
      if (!appointmentId) return;

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
          .eq('id', appointmentId)
          .single();

        if (error) throw error;
        setAppointmentData(data);
      } catch (error) {
        console.error('Error fetching appointment:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [appointmentId]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!appointmentData) {
    return <div className="flex justify-center items-center min-h-screen">Appointment not found</div>;
  }

  const isDoctor = userProfile?.role === 'doctor';
  const receiverId = isDoctor ? appointmentData.patient_id : appointmentData.doctor.user_id;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>
              Consultation Room - {appointmentData.patient?.full_name} & Dr. {appointmentData.doctor?.user?.full_name}
            </CardTitle>
            <p className="text-sm text-gray-600">
              {appointmentData.consultation_type} consultation • {appointmentData.appointment_date} at {appointmentData.appointment_time}
            </p>
          </CardHeader>
        </Card>

        <Tabs defaultValue="video" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="video">
              <Video className="h-4 w-4 mr-2" />
              Video Call
            </TabsTrigger>
            <TabsTrigger value="chat">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat
            </TabsTrigger>
            {isDoctor && (
              <TabsTrigger value="records">
                <FileText className="h-4 w-4 mr-2" />
                Patient Records
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="video">
            <VideoCallInterface 
              appointmentId={appointmentId!} 
              isDoctor={isDoctor} 
            />
          </TabsContent>

          <TabsContent value="chat">
            <ChatInterface 
              appointmentId={appointmentId!} 
              receiverId={receiverId} 
            />
          </TabsContent>

          {isDoctor && (
            <TabsContent value="records">
              <PatientDataForm 
                patientId={appointmentData.patient_id}
                appointmentId={appointmentId}
              />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default ConsultationRoom;
