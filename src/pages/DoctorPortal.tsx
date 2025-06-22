import React, { useState } from 'react';
import { Calendar, Users, FileText, Video, Phone, MessageCircle, Clock, DollarSign, Settings, Activity, Star, TrendingUp, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const DoctorPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAvailable, setIsAvailable] = useState(true);

  const todayAppointments = [
    { id: 1, patient: 'John Doe', time: '10:00 AM', type: 'Video', status: 'upcoming', avatar: 'JD' },
    { id: 2, patient: 'Jane Smith', time: '11:30 AM', type: 'Audio', status: 'ongoing', avatar: 'JS' },
    { id: 3, patient: 'Mary Johnson', time: '2:00 PM', type: 'Chat', status: 'upcoming', avatar: 'MJ' },
    { id: 4, patient: 'Peter Wilson', time: '3:30 PM', type: 'Video', status: 'upcoming', avatar: 'PW' }
  ];

  const patientHistory = [
    { id: 1, name: 'John Doe', lastVisit: '2024-01-15', condition: 'Hypertension', nextAppt: '2024-01-20', avatar: 'JD' },
    { id: 2, name: 'Jane Smith', lastVisit: '2024-01-10', condition: 'Diabetes', nextAppt: '2024-01-18', avatar: 'JS' },
    { id: 3, name: 'Mary Johnson', lastVisit: '2024-01-08', condition: 'Migraine', nextAppt: '2024-01-22', avatar: 'MJ' }
  ];

  const earnings = [
    { date: '2024-01-15', consultations: 8, earnings: 'KSh 3,200', type: 'Mixed' },
    { date: '2024-01-14', consultations: 6, earnings: 'KSh 2,400', type: 'Video/Audio' },
    { date: '2024-01-13', consultations: 10, earnings: 'KSh 3,800', type: 'Mixed' }
  ];

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
                    <p className="text-blue-100">Dr. Sarah Mwangi • General Practice</p>
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
                    <p className="text-3xl font-bold text-white mb-1">12</p>
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
                    {todayAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-6 bg-white/10 backdrop-blur border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-200 shadow-lg">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                              {appointment.avatar}
                            </div>
                            <div className="absolute -bottom-1 -right-1">
                              {appointment.type === 'Video' && <Video className="h-5 w-5 text-blue-300 bg-blue-900 rounded-full p-1" />}
                              {appointment.type === 'Audio' && <Phone className="h-5 w-5 text-green-300 bg-green-900 rounded-full p-1" />}
                              {appointment.type === 'Chat' && <MessageCircle className="h-5 w-5 text-purple-300 bg-purple-900 rounded-full p-1" />}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-white text-lg">{appointment.patient}</h3>
                            <p className="text-blue-200">{appointment.type} Consultation</p>
                            <p className="text-blue-300 text-sm font-medium">{appointment.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {appointment.status === 'ongoing' ? (
                            <Button size="sm" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg">
                              <Activity className="h-4 w-4 mr-2 animate-pulse" />
                              In Progress
                            </Button>
                          ) : (
                            <>
                              <Button variant="outline" size="sm" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                                View Patient
                              </Button>
                              <Button size="sm" className="bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700 text-white shadow-lg">
                                Start Consultation
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
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
                    <Button className="h-20 flex flex-col bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                      <FileText className="h-8 w-8 mb-2" />
                      <span className="text-sm font-medium">New Prescription</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                      <Users className="h-8 w-8 mb-2" />
                      <span className="text-sm font-medium">Patient Records</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                      <Calendar className="h-8 w-8 mb-2" />
                      <span className="text-sm font-medium">Schedule</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                      <DollarSign className="h-8 w-8 mb-2" />
                      <span className="text-sm font-medium">Earnings</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Other tabs with enhanced styling */}
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
                      {todayAppointments.map((appointment) => (
                        <TableRow key={appointment.id} className="border-white/20 hover:bg-white/10">
                          <TableCell className="font-medium text-white">{appointment.patient}</TableCell>
                          <TableCell className="text-blue-100">{appointment.time}</TableCell>
                          <TableCell className="text-blue-100">{appointment.type}</TableCell>
                          <TableCell>
                            <Badge className={`${
                              appointment.status === 'ongoing' 
                                ? 'bg-green-500/20 text-green-200 border-green-400/30' 
                                : 'bg-blue-500/20 text-blue-200 border-blue-400/30'
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

            {/* Continue with other tabs - keeping existing functionality but with enhanced styling */}
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
                      {patientHistory.map((patient) => (
                        <TableRow key={patient.id} className="border-white/20 hover:bg-white/10">
                          <TableCell className="font-medium text-white">{patient.name}</TableCell>
                          <TableCell className="text-blue-100">{patient.lastVisit}</TableCell>
                          <TableCell className="text-blue-100">{patient.condition}</TableCell>
                          <TableCell className="text-blue-100">{patient.nextAppt}</TableCell>
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

            {/* ... keep existing code for other tabs with similar styling enhancements */}
            <TabsContent value="consultations" className="space-y-6 mt-8">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">Active Consultations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Video className="h-16 w-16 text-blue-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2 text-white">No active consultations</h3>
                    <p className="text-blue-200 mb-4">Your next appointment starts at 10:00 AM</p>
                    <Button className="bg-gradient-to-r from-blue-500 to-teal-600 hover:from-blue-600 hover:to-teal-700 text-white shadow-lg">
                      Prepare for Next Session
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">Consultation Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur">
                      <FileText className="h-6 w-6 mb-2" />
                      <span>Write Notes</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur">
                      <FileText className="h-6 w-6 mb-2" />
                      <span>E-Prescription</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur">
                      <Calendar className="h-6 w-6 mb-2" />
                      <span>Follow-up</span>
                    </Button>
                  </div>
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
                        {earnings.map((earning, index) => (
                          <TableRow key={index} className="border-white/20">
                            <TableCell className="text-blue-100">{earning.date}</TableCell>
                            <TableCell className="text-blue-100">{earning.consultations}</TableCell>
                            <TableCell className="text-blue-100">{earning.earnings}</TableCell>
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
