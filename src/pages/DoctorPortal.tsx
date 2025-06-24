import React, { useState, useEffect } from 'react';
import { Calendar, Users, FileText, Video, Phone, MessageCircle, Clock, DollarSign, Settings, Activity, Star, TrendingUp, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
// Import the new consultation tool components
import WriteNotesDialog from '@/components/WriteNotesDialog';
import EPrescriptionDialog from '@/components/EPrescriptionDialog';
import FollowUpDialog from '@/components/FollowUpDialog';
import VideoConsultationDialog from '@/components/VideoConsultationDialog';
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

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-blue-800/90 to-teal-700/95" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Enhanced Header */}
        <div className="bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  <Award className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1">Doctor Portal</h1>
                  <div className="flex items-center space-x-2">
                    <p className="text-blue-100">Dr. {userProfile?.full_name} • General Practice</p>
                    <Badge className="bg-yellow-500/20 text-yellow-200 border-yellow-400/30">
                      <Star className="h-3 w-3 mr-1" />
                      4.9
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <span className="text-blue-100 font-medium">Status:</span>
                  <Button
                    size="sm"
                    variant={isAvailable ? "default" : "outline"}
                    onClick={() => setIsAvailable(!isAvailable)}
                    className={`${
                      isAvailable 
                        ? "bg-green-500 hover:bg-green-600 text-white shadow-lg" 
                        : "bg-white/20 text-white border-white/30 hover:bg-white/30"
                    } transition-all duration-200`}
                  >
                    <div className={`w-2 h-2 rounded-full mr-2 ${isAvailable ? 'bg-white animate-pulse' : 'bg-gray-400'}`}></div>
                    {isAvailable ? 'Available' : 'Offline'}
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
              <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-900">Dashboard</TabsTrigger>
              <TabsTrigger value="appointments" className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-900">Appointments</TabsTrigger>
              <TabsTrigger value="patients" className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-900">Patients</TabsTrigger>
              <TabsTrigger value="consultations" className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-900">Consultations</TabsTrigger>
              <TabsTrigger value="prescriptions" className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-900">Prescriptions</TabsTrigger>
              <TabsTrigger value="reports" className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-900">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-8 mt-8">
              {/* Enhanced Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">{todayAppointments.length}</p>
                    <p className="text-blue-100">Today's Appointments</p>
                    <div className="mt-2">
                      <TrendingUp className="h-4 w-4 inline text-green-400 mr-1" />
                      <span className="text-green-300 text-sm">+2 from yesterday</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">156</p>
                    <p className="text-blue-100">Total Patients</p>
                    <div className="mt-2">
                      <TrendingUp className="h-4 w-4 inline text-green-400 mr-1" />
                      <span className="text-green-300 text-sm">+8 this week</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">4.2h</p>
                    <p className="text-blue-100">Online Time Today</p>
                    <div className="mt-2">
                      <span className="text-blue-300 text-sm">Average: 5.1h</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">KSh 15,400</p>
                    <p className="text-blue-100">This Month's Earnings</p>
                    <div className="mt-2">
                      <TrendingUp className="h-4 w-4 inline text-green-400 mr-1" />
                      <span className="text-green-300 text-sm">+12% from last month</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Today's Schedule */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center">
                    <Calendar className="h-6 w-6 mr-2" />
                    Today's Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todayAppointments.length === 0 ? (
                      <div className="text-center py-8">
                        <Calendar className="h-16 w-16 text-blue-300 mx-auto mb-4" />
                        <p className="text-white text-lg">No appointments scheduled for today</p>
                      </div>
                    ) : (
                      todayAppointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-6 bg-white/10 backdrop-blur border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-200 shadow-lg">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                                {appointment.patient?.full_name?.substring(0, 2) || 'P'}
                              </div>
                              <div className="absolute -bottom-1 -right-1">
                                {appointment.consultation_type === 'video' && <Video className="h-5 w-5 text-blue-300 bg-blue-900 rounded-full p-1" />}
                                {appointment.consultation_type === 'audio' && <Phone className="h-5 w-5 text-green-300 bg-green-900 rounded-full p-1" />}
                                {appointment.consultation_type === 'chat' && <MessageCircle className="h-5 w-5 text-purple-300 bg-purple-900 rounded-full p-1" />}
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-white text-lg">{appointment.patient?.full_name}</h3>
                              <p className="text-blue-200">{appointment.consultation_type} Consultation</p>
                              <p className="text-blue-300 text-sm font-medium">{appointment.appointment_time}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Button variant="outline" size="sm" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                              View Patient
                            </Button>
                            <Button size="sm" className="bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700 text-white shadow-lg">
                              Start Consultation
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Quick Actions */}
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white text-xl">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <EPrescriptionDialog patientId={todayAppointments[0]?.patient_id} appointmentId={todayAppointments[0]?.id}/>
                    <WriteNotesDialog patientId={todayAppointments[0]?.patient_id} appointmentId={todayAppointments[0]?.id}/>
                    <FollowUpDialog patientId={todayAppointments[0]?.patient_id} doctorId={userProfile?.id}/>
                    <VideoConsultationDialog appointments={doctorAppointments} />
                  </div>
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
                    <EPrescriptionDialog patientId={todayAppointments[0]?.patient_id} appointmentId={todayAppointments[0]?.id}/>
                    <FollowUpDialog patientId={todayAppointments[0]?.patient_id} doctorId={userProfile?.id}/>
                  </div>
                </CardContent>
              </Card>

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
                <Button className="bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700 text-white shadow-lg">
                  Create New Prescription
                </Button>
              </div>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur border border-white/20 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-white">John Doe - Hypertension Medication</h3>
                        <p className="text-sm text-blue-200">Amlodipine 5mg, once daily for 30 days</p>
                        <p className="text-sm text-blue-300">Created: 2024-01-15</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                          Edit
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg">
                          Send to Pharmacy
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6 mt-8">
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
    </div>
  );
};

export default DoctorPortal;
