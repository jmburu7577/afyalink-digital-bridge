
import React from 'react';
import { useAppointments } from '@/hooks/useAppointments';
import { useDoctors } from '@/hooks/useDoctors';
import AppointmentBooking from '@/components/AppointmentBooking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Video, Phone, MessageCircle, User } from 'lucide-react';
import { format } from 'date-fns';

const Schedule = () => {
  const { appointments, loading } = useAppointments();
  const { doctors } = useDoctors();

  const getConsultationIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'audio': return <Phone className="h-4 w-4" />;
      case 'chat': return <MessageCircle className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">Loading appointments...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="container mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Calendar className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Schedule & Appointments</h1>
          <p className="text-lg text-gray-600">Manage your healthcare appointments</p>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center space-x-4">
          <AppointmentBooking />
        </div>

        {/* Available Doctors */}
        <Card>
          <CardHeader>
            <CardTitle>Available Doctors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {doctors.map((doctor: any) => (
                <Card key={doctor.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{doctor.user.full_name}</h3>
                        <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        <p className="text-sm font-medium text-green-600">
                          KSh {doctor.consultation_fee}/consultation
                        </p>
                      </div>
                    </div>
                    {doctor.is_available && (
                      <Badge className="mt-2 bg-green-100 text-green-800">Available</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Your Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Your Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {appointments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No appointments scheduled. Book your first appointment above!
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment: any) => (
                  <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            {getConsultationIcon(appointment.consultation_type)}
                          </div>
                          <div>
                            <h3 className="font-semibold">
                              {appointment.doctor?.user?.full_name || 'Doctor'}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {appointment.doctor?.specialty || 'General Practice'}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-500">
                                {appointment.appointment_date}
                              </span>
                              <Clock className="h-4 w-4 text-gray-400 ml-2" />
                              <span className="text-sm text-gray-500">
                                {appointment.appointment_time}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                          <div className="text-right">
                            <p className="font-medium">KSh {appointment.amount}</p>
                            <p className="text-sm text-gray-500 capitalize">
                              {appointment.consultation_type}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Schedule;
