
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppointments } from '@/hooks/useAppointments';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Clock, PlayCircle } from 'lucide-react';

interface AppointmentStatusManagerProps {
  appointment: any;
  userRole?: string;
}

const AppointmentStatusManager: React.FC<AppointmentStatusManagerProps> = ({ 
  appointment, 
  userRole 
}) => {
  const { updateAppointment } = useAppointments();
  const { toast } = useToast();

  const handleStatusChange = async (newStatus: string) => {
    const { error } = await updateAppointment(appointment.id, { status: newStatus });
    
    if (!error) {
      toast({
        title: "Appointment updated",
        description: `Appointment status changed to ${newStatus}`
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Clock className="h-4 w-4" />;
      case 'ongoing': return <PlayCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Only allow doctors to change appointment status
  if (userRole !== 'doctor') {
    return (
      <Badge className={getStatusColor(appointment.status)}>
        {getStatusIcon(appointment.status)}
        <span className="ml-1">{appointment.status}</span>
      </Badge>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Select 
        value={appointment.status} 
        onValueChange={handleStatusChange}
      >
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="scheduled">Scheduled</SelectItem>
          <SelectItem value="ongoing">Ongoing</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AppointmentStatusManager;
