
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Video, Phone, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface VideoConsultationDialogProps {
  appointments: any[];
}

const VideoConsultationDialog: React.FC<VideoConsultationDialogProps> = ({ appointments }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const startConsultation = (appointmentId: string, type: string) => {
    toast({
      title: "Starting Consultation",
      description: `Connecting to ${type} consultation...`
    });
    
    navigate(`/consultation/${appointmentId}`);
    setIsOpen(false);
  };

  const todayAppointments = appointments.filter(apt => {
    const appointmentDate = new Date(apt.appointment_date);
    const today = new Date();
    return appointmentDate.toDateString() === today.toDateString() && 
           apt.status === 'scheduled';
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-20 flex flex-col bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur">
          <Video className="h-6 w-6 mb-2" />
          <span>Video Consultation</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Start Video Consultation</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {todayAppointments.length === 0 ? (
            <div className="text-center py-8">
              <Video className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Scheduled Consultations</h3>
              <p className="text-gray-500">You don't have any consultations scheduled for today.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Today's Appointments</h3>
              {todayAppointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{appointment.patient?.full_name}</h4>
                    <p className="text-sm text-gray-500">
                      {appointment.appointment_time} • {appointment.consultation_type}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {appointment.consultation_type === 'video' && (
                      <Button
                        size="sm"
                        onClick={() => startConsultation(appointment.id, 'video')}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Start Video
                      </Button>
                    )}
                    {appointment.consultation_type === 'audio' && (
                      <Button
                        size="sm"
                        onClick={() => startConsultation(appointment.id, 'audio')}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Start Audio
                      </Button>
                    )}
                    {appointment.consultation_type === 'chat' && (
                      <Button
                        size="sm"
                        onClick={() => startConsultation(appointment.id, 'chat')}
                        className="bg-purple-500 hover:bg-purple-600"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Start Chat
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoConsultationDialog;
