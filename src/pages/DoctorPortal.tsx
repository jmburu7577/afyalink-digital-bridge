
import React, { useState } from 'react';
import { Calendar, Users, FileText, Video, Phone, MessageCircle, Clock, DollarSign, Settings, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';

const DoctorPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAvailable, setIsAvailable] = useState(true);

  const todayAppointments = [
    { id: 1, patient: 'John Doe', time: '10:00 AM', type: 'Video', status: 'upcoming' },
    { id: 2, patient: 'Jane Smith', time: '11:30 AM', type: 'Audio', status: 'ongoing' },
    { id: 3, patient: 'Mary Johnson', time: '2:00 PM', type: 'Chat', status: 'upcoming' },
    { id: 4, patient: 'Peter Wilson', time: '3:30 PM', type: 'Video', status: 'upcoming' }
  ];

  const patientHistory = [
    { id: 1, name: 'John Doe', lastVisit: '2024-01-15', condition: 'Hypertension', nextAppt: '2024-01-20' },
    { id: 2, name: 'Jane Smith', lastVisit: '2024-01-10', condition: 'Diabetes', nextAppt: '2024-01-18' },
    { id: 3, name: 'Mary Johnson', lastVisit: '2024-01-08', condition: 'Migraine', nextAppt: '2024-01-22' }
  ];

  const earnings = [
    { date: '2024-01-15', consultations: 8, earnings: 'KSh 3,200', type: 'Mixed' },
    { date: '2024-01-14', consultations: 6, earnings: 'KSh 2,400', type: 'Video/Audio' },
    { date: '2024-01-13', consultations: 10, earnings: 'KSh 3,800', type: 'Mixed' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Doctor Portal</h1>
              <p className="text-sm text-gray-600">Dr. Sarah Mwangi • General Practice</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Status:</span>
                <Button
                  size="sm"
                  variant={isAvailable ? "default" : "outline"}
                  onClick={() => setIsAvailable(!isAvailable)}
                  className={isAvailable ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  <div className={`w-2 h-2 rounded-full mr-2 ${isAvailable ? 'bg-white' : 'bg-gray-400'}`}></div>
                  {isAvailable ? 'Available' : 'Offline'}
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-1" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="consultations">Consultations</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-gray-600">Today&apos;s Appointments</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-gray-600">Total Patients</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">4.2h</p>
                  <p className="text-sm text-gray-600">Online Time Today</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">KSh 15,400</p>
                  <p className="text-sm text-gray-600">This Month&apos;s Earnings</p>
                </CardContent>
              </Card>
            </div>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Today&apos;s Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          {appointment.type === 'Video' && <Video className="h-6 w-6 text-blue-600" />}
                          {appointment.type === 'Audio' && <Phone className="h-6 w-6 text-green-600" />}
                          {appointment.type === 'Chat' && <MessageCircle className="h-6 w-6 text-purple-600" />}
                        </div>
                        <div>
                          <h3 className="font-semibold">{appointment.patient}</h3>
                          <p className="text-sm text-gray-600">{appointment.type} Consultation</p>
                          <p className="text-sm text-gray-500">{appointment.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {appointment.status === 'ongoing' ? (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Activity className="h-4 w-4 mr-1" />
                            In Progress
                          </Button>
                        ) : (
                          <>
                            <Button variant="outline" size="sm">View Patient</Button>
                            <Button size="sm">Start Consultation</Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="h-16 flex flex-col">
                    <FileText className="h-6 w-6 mb-1" />
                    <span className="text-xs">New Prescription</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col">
                    <Users className="h-6 w-6 mb-1" />
                    <span className="text-xs">Patient Records</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col">
                    <Calendar className="h-6 w-6 mb-1" />
                    <span className="text-xs">Schedule</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col">
                    <DollarSign className="h-6 w-6 mb-1" />
                    <span className="text-xs">Earnings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Appointment Management</h2>
              <div className="flex space-x-2">
                <Input type="date" className="w-40" />
                <Button variant="outline">Filter</Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todayAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">{appointment.patient}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>{appointment.type}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            appointment.status === 'ongoing' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {appointment.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Manage</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Patient Records</h2>
              <Input placeholder="Search patients..." className="w-64" />
            </div>

            <Card>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient Name</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Next Appointment</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patientHistory.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">{patient.name}</TableCell>
                        <TableCell>{patient.lastVisit}</TableCell>
                        <TableCell>{patient.condition}</TableCell>
                        <TableCell>{patient.nextAppt}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">View History</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consultations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Consultations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No active consultations</h3>
                  <p className="text-gray-600 mb-4">Your next appointment starts at 10:00 AM</p>
                  <Button>Prepare for Next Session</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Consultation Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    <span>Write Notes</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    <span>E-Prescription</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col">
                    <Calendar className="h-6 w-6 mb-2" />
                    <span>Follow-up</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prescriptions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">E-Prescriptions</h2>
              <Button>Create New Prescription</Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">John Doe - Hypertension Medication</h3>
                      <p className="text-sm text-gray-600">Amlodipine 5mg, once daily for 30 days</p>
                      <p className="text-sm text-gray-500">Created: 2024-01-15</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button size="sm">Send to Pharmacy</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Consultations This Month</span>
                      <span className="font-semibold">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Rating</span>
                      <span className="font-semibold">4.9/5.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Earnings</span>
                      <span className="font-semibold">KSh 45,600</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Response Time</span>
                      <span className="font-semibold">&lt; 2 minutes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Sessions</TableHead>
                        <TableHead>Earnings</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {earnings.map((earning, index) => (
                        <TableRow key={index}>
                          <TableCell>{earning.date}</TableCell>
                          <TableCell>{earning.consultations}</TableCell>
                          <TableCell>{earning.earnings}</TableCell>
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
