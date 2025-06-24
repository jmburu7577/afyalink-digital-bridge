import React, { useState, useEffect } from 'react';
import { Calendar, Users, FileText, Video, Phone, MessageCircle, Clock, DollarSign, Settings, Activity, Star, TrendingUp, Award, Search, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
// Import the new consultation tool components
import WriteNotesDialog from '@/components/WriteNotesDialog';
import PrescriptionManager from '@/components/PrescriptionManager';
import FollowUpDialog from '@/components/FollowUpDialog';
import VideoConsultationDialog from '@/components/VideoConsultationDialog';
import EnhancedWriteNotesDialog from '@/components/EnhancedWriteNotesDialog';
import EnhancedPrescriptionManager from '@/components/EnhancedPrescriptionManager';
import OnboardingTutorial from '@/components/OnboardingTutorial';
import { useAppointments } from '@/hooks/useAppointments';
import { useAuth } from '@/contexts/AuthContext';

const DoctorPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAvailable, setIsAvailable] = useState(true);
  const { appointments, loading } = useAppointments();
  const { userProfile } = useAuth();

  // Filter appointments for the current doctor
  const doctorAppointments = appointments.filter(apt => 
    apt.doctor?.user?.id === userProfile?.id
  );

  const todayAppointments = doctorAppointments.filter(apt => {
    const appointmentDate = new Date(apt.appointment_date);
    const today = new Date();
    return appointmentDate.toDateString() === today.toDateString();
  });

  const totalPatients = doctorAppointments.length;
  const healthRecords = doctorAppointments.filter(apt => apt.health_record);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <OnboardingTutorial userRole="doctor" />
      
      {/* Enhanced Header with search */}
      <div className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Doctor Portal
              </h1>
              <p className="text-sm text-gray-600">Manage your patients and consultations</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search patients or appointments..."
                  className="pl-10 w-64 bg-white/50 border-white/30"
                />
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-600">{userProfile?.full_name || 'Doctor'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="records">Records</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Enhanced Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-xl hover:shadow-2xl transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{todayAppointments.length}</p>
                  <p className="text-sm text-gray-600">Today's Appointments</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-xl hover:shadow-2xl transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">{totalPatients}</p>
                  <p className="text-sm text-gray-600">Total Patients</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-xl hover:shadow-2xl transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-purple-600">5</p>
                  <p className="text-sm text-gray-600">Unread Messages</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-xl hover:shadow-2xl transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="h-6 w-6 text-orange-600" />
                  </div>
                  <p className="text-2xl font-bold text-orange-600">{healthRecords.length}</p>
                  <p className="text-sm text-gray-600">Health Records</p>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <VideoConsultationDialog appointments={appointments} />
                  <EnhancedWriteNotesDialog appointments={appointments} />
                  <EnhancedPrescriptionManager patientId={selectedPatientId} appointmentId={selectedAppointmentId} />
                  <Button variant="outline" className="h-20 flex flex-col bg-white/10 hover:bg-white/20 backdrop-blur border-white/30 text-gray-700">
                    <Calendar className="h-6 w-6 mb-2" />
                    <span>Schedule Follow-up</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Today's Schedule */}
            <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Today's Schedule
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {todayAppointments.length} appointments
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {todayAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No appointments scheduled for today</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {todayAppointments.map((appointment) => (
                      <div key={appointment.id} className="group flex items-center justify-between p-4 border border-white/20 rounded-lg bg-white/50 backdrop-blur hover:shadow-md transition-all">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            appointment.consultation_type === 'video' ? 'bg-blue-100' :
                            appointment.consultation_type === 'audio' ? 'bg-green-100' : 'bg-purple-100'
                          }`}>
                            {appointment.consultation_type === 'video' && <Video className="h-5 w-5 text-blue-600" />}
                            {appointment.consultation_type === 'audio' && <Phone className="h-5 w-5 text-green-600" />}
                            {appointment.consultation_type === 'chat' && <MessageCircle className="h-5 w-5 text-purple-600" />}
                          </div>
                          <div>
                            <h3 className="font-semibold group-hover:text-blue-600 transition-colors">
                              {appointment.patient?.full_name || 'Unknown Patient'}
                            </h3>
                            <p className="text-sm text-gray-600 capitalize">{appointment.consultation_type} consultation</p>
                            <p className="text-sm text-gray-500">{appointment.appointment_time}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="outline">View Details</Button>
                          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600">
                            Start Consultation
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consultations" className="space-y-6 mt-8">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Enhanced Consultation Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <WriteNotesDialog patientId={todayAppointments[0]?.patient_id} appointmentId={todayAppointments[0]?.id}/>
                  <FollowUpDialog patientId={todayAppointments[0]?.patient_id} doctorId={userProfile?.id}/>
                </div>
              </CardContent>
            </Card>

            <PrescriptionManager patientId={todayAppointments[0]?.patient_id} appointmentId={todayAppointments[0]?.id}/>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Start Video Consultation</CardTitle>
              </CardHeader>
              <CardContent>
                <VideoConsultationDialog appointments={doctorAppointments} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6 mt-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">Appointment Management</h2>
              <div className="flex space-x-3">
                <Input type="date" className="w-40 bg-white/10 backdrop-blur border-white/20 text-white placeholder-white/60" />
                <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur">Filter</Button>
              </div>
            </div>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20">
                      <TableHead className="text-blue-100">Patient</TableHead>
                      <TableHead className="text-blue-100">Time</TableHead>
                      <TableHead className="text-blue-100">Type</TableHead>
                      <TableHead className="text-blue-100">Status</TableHead>
                      <TableHead className="text-blue-100">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {doctorAppointments.map((appointment) => (
                      <TableRow key={appointment.id} className="border-white/20 hover:bg-white/10">
                        <TableCell className="font-medium text-white">{appointment.patient?.full_name}</TableCell>
                        <TableCell className="text-blue-100">{appointment.appointment_time}</TableCell>
                        <TableCell className="text-blue-100">{appointment.consultation_type}</TableCell>
                        <TableCell>
                          <Badge className={`${
                            appointment.status === 'scheduled' 
                              ? 'bg-blue-500/20 text-blue-200 border-blue-400/30' 
                              : 'bg-green-500/20 text-green-200 border-green-400/30'
                          }`}>
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                            Manage
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6 mt-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">Patient Records</h2>
              <Input placeholder="Search patients..." className="w-64 bg-white/10 backdrop-blur border-white/20 text-white placeholder-white/60" />
            </div>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20">
                      <TableHead className="text-blue-100">Patient Name</TableHead>
                      <TableHead className="text-blue-100">Last Visit</TableHead>
                      <TableHead className="text-blue-100">Condition</TableHead>
                      <TableHead className="text-blue-100">Next Appointment</TableHead>
                      <TableHead className="text-blue-100">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todayAppointments.map((patient) => (
                      <TableRow key={patient.id} className="border-white/20 hover:bg-white/10">
                        <TableCell className="font-medium text-white">{patient.patient?.full_name}</TableCell>
                        <TableCell className="text-blue-100">{patient.appointment_date}</TableCell>
                        <TableCell className="text-blue-100">{patient.consultation_type}</TableCell>
                        <TableCell className="text-blue-100">{patient.appointment_time}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                            View History
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prescriptions" className="space-y-6 mt-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white">E-Prescriptions</h2>
            </div>

            <PrescriptionManager patientId={todayAppointments[0]?.patient_id} appointmentId={todayAppointments[0]?.id}/>
          </TabsContent>

          <TabsContent value="records" className="space-y-6 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">Performance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-blue-200">Total Consultations This Month</span>
                      <span className="font-semibold text-white">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Average Rating</span>
                      <span className="font-semibold text-white">4.9/5.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Total Earnings</span>
                      <span className="font-semibold text-white">KSh 45,600</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Response Time</span>
                      <span className="font-semibold text-white">&lt; 2 minutes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">Recent Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/20">
                        <TableHead className="text-blue-100">Date</TableHead>
                        <TableHead className="text-blue-100">Sessions</TableHead>
                        <TableHead className="text-blue-100">Earnings</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {todayAppointments.map((earning, index) => (
                        <TableRow key={index} className="border-white/20">
                          <TableCell className="text-blue-100">{earning.appointment_date}</TableCell>
                          <TableCell className="text-blue-100">{earning.appointment_time}</TableCell>
                          <TableCell className="text-blue-100">{earning.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorPortal;
