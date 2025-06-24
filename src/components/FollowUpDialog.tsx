
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock } from 'lucide-react';
import { useAppointments } from '@/hooks/useAppointments';
import { useToast } from '@/hooks/use-toast';

interface FollowUpDialogProps {
  patientId?: string;
  doctorId?: string;
}

const FollowUpDialog: React.FC<FollowUpDialogProps> = ({ patientId, doctorId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [notes, setNotes] = useState('');

  const { createAppointment } = useAppointments();
  const { toast } = useToast();

  const handleScheduleFollowUp = async () => {
    if (!appointmentDate || !appointmentTime || !consultationType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const { error } = await createAppointment({
      doctor_id: doctorId,
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
      consultation_type: consultationType,
      notes: `Follow-up appointment. ${notes}`,
      status: 'scheduled'
    });

    if (!error) {
      setIsOpen(false);
      setAppointmentDate('');
      setAppointmentTime('');
      setConsultationType('');
      setNotes('');
      toast({
        title: "Follow-up Scheduled",
        description: "Follow-up appointment has been scheduled successfully."
      });
    }
  };

  // Generate next 30 days for appointment scheduling
  const getNextDays = () => {
    const days = [];
    for (let i = 1; i <= 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      });
    }
    return days;
  };

  // Generate time slots
  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        slots.push({ value: time, label: displayTime });
      }
    }
    return slots;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-20 flex flex-col bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur">
          <Calendar className="h-6 w-6 mb-2" />
          <span>Follow-up</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule Follow-up Appointment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Appointment Date</label>
            <Select value={appointmentDate} onValueChange={setAppointmentDate}>
              <SelectTrigger>
                <SelectValue placeholder="Select date" />
              </SelectTrigger>
              <SelectContent>
                {getNextDays().map((day) => (
                  <SelectItem key={day.value} value={day.value}>
                    {day.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Appointment Time</label>
            <Select value={appointmentTime} onValueChange={setAppointmentTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {getTimeSlots().map((slot) => (
                  <SelectItem key={slot.value} value={slot.value}>
                    {slot.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Consultation Type</label>
            <Select value={consultationType} onValueChange={setConsultationType}>
              <SelectTrigger>
                <SelectValue placeholder="Select consultation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">Video Consultation</SelectItem>
                <SelectItem value="audio">Audio Consultation</SelectItem>
                <SelectItem value="chat">Chat Consultation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Follow-up Notes</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter any specific notes for the follow-up..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleScheduleFollowUp}>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Follow-up
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FollowUpDialog;
