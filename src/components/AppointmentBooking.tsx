
import React, { useState } from 'react';
import { useAppointments } from '@/hooks/useAppointments';
import { useDoctors } from '@/hooks/useDoctors';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Clock, Video, Phone, MessageCircle } from 'lucide-react';

const AppointmentBooking = () => {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { createAppointment } = useAppointments();
  const { doctors } = useDoctors();

  const consultationPrices = {
    video: 500,
    audio: 300,
    chat: 200
  };

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !appointmentDate || !appointmentTime || !consultationType) {
      return;
    }

    const selectedDoctorData = doctors.find((d: any) => d.id === selectedDoctor);
    const amount = consultationPrices[consultationType as keyof typeof consultationPrices];

    const { error } = await createAppointment({
      doctor_id: selectedDoctor,
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
      consultation_type: consultationType,
      amount
    });

    if (!error) {
      setIsOpen(false);
      setSelectedDoctor('');
      setAppointmentDate('');
      setAppointmentTime('');
      setConsultationType('');
    }
  };

  const getConsultationIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'audio': return <Phone className="h-4 w-4" />;
      case 'chat': return <MessageCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          Book Appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book New Appointment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Select Doctor</label>
            <Select onValueChange={setSelectedDoctor}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor: any) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.user.full_name} - {doctor.specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Date</label>
            <Input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Time</label>
            <Input
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Consultation Type</label>
            <Select onValueChange={setConsultationType}>
              <SelectTrigger>
                <SelectValue placeholder="Choose consultation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">
                  <div className="flex items-center space-x-2">
                    <Video className="h-4 w-4" />
                    <span>Video Call - KSh 500</span>
                  </div>
                </SelectItem>
                <SelectItem value="audio">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>Audio Call - KSh 300</span>
                  </div>
                </SelectItem>
                <SelectItem value="chat">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>Chat - KSh 200</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {consultationType && (
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getConsultationIcon(consultationType)}
                    <span className="font-medium">
                      {consultationType.charAt(0).toUpperCase() + consultationType.slice(1)} Consultation
                    </span>
                  </div>
                  <span className="font-bold text-lg">
                    KSh {consultationPrices[consultationType as keyof typeof consultationPrices]}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          <Button 
            onClick={handleBookAppointment} 
            className="w-full"
            disabled={!selectedDoctor || !appointmentDate || !appointmentTime || !consultationType}
          >
            Book Appointment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentBooking;
