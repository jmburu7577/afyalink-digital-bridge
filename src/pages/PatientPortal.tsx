import React, { useState } from 'react';
import { Calendar, FileText, MessageCircle, Download, Clock, CreditCard, Phone, Video, User, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import OnboardingTutorial from '@/components/OnboardingTutorial';

const PatientPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const upcomingAppointments = [
    { id: 1, doctor: 'Dr. Sarah Mwangi', specialty: 'General Practice', date: '2024-01-20', time: '10:00 AM', type: 'Video' },
    { id: 2, doctor: 'Dr. Paul Kiprotich', specialty: 'Cardiology', date: '2024-01-22', time: '2:00 PM', type: 'Audio' }
  ];

  const healthRecords = [
    { id: 1, type: 'Lab Report', title: 'Blood Test Results', date: '2024-01-15', doctor: 'Dr. Sarah Mwangi' },
    { id: 2, type: 'Prescription', title: 'Hypertension Medication', date: '2024-01-10', doctor: 'Dr. Paul Kiprotich' },
    { id: 3, type: 'Visit Note', title: 'Follow-up Consultation', date: '2024-01-08', doctor: 'Dr. Sarah Mwangi' }
  ];

  const consultationHistory = [
    { id: 1, doctor: 'Dr. Sarah Mwangi', date: '2024-01-15', type: 'Video', status: 'Completed', amount: 'KSh 500' },
    { id: 2, doctor: 'Dr. Paul Kiprotich', date: '2024-01-10', type: 'Audio', status: 'Completed', amount: 'KSh 300' },
    { id: 3, doctor: 'Dr. Grace Wanjala', date: '2024-01-05', type: 'Chat', status: 'Completed', amount: 'KSh 200' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <OnboardingTutorial userRole="patient" />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Patient Portal</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-600">John Doe</span>
              </div>
              <Button variant="outline" size="sm">Profile Settings</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="records">Health Records</TabsTrigger>
            <TabsTrigger value="chat">Messages</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Enhanced Quick Stats with better visuals */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600">2</p>
                  <p className="text-sm text-gray-600">Upcoming Appointments</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">8</p>
                  <p className="text-sm text-gray-600">Health Records</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-2xl font-bold text-purple-600">3</p>
                  <p className="text-sm text-gray-600">Unread Messages</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="h-6 w-6 text-red-600" />
                  </div>
                  <p className="text-2xl font-bold text-red-600">Good</p>
                  <p className="text-sm text-gray-600">Health Status</p>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Upcoming Appointments */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Upcoming Appointments
                  <Button size="sm" variant="outline">View All</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="group flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          appointment.type === 'Video' ? 'bg-blue-100' : 'bg-green-100'
                        }`}>
                          {appointment.type === 'Video' ? 
                            <Video className="h-6 w-6 text-blue-600" /> : 
                            <Phone className="h-6 w-6 text-green-600" />
                          }
                        </div>
                        <div>
                          <h3 className="font-semibold group-hover:text-blue-600 transition-colors">{appointment.doctor}</h3>
                          <p className="text-sm text-gray-600">{appointment.specialty}</p>
                          <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          Reschedule
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Quick Actions with better layout */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="h-20 flex flex-col bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all">
                    <Video className="h-8 w-8 mb-2" />
                    <span className="text-sm font-medium">Video Call</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col hover:shadow-md transform hover:scale-105 transition-all">
                    <Phone className="h-8 w-8 mb-2" />
                    <span className="text-sm font-medium">Audio Consult</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col hover:shadow-md transform hover:scale-105 transition-all">
                    <MessageCircle className="h-8 w-8 mb-2" />
                    <span className="text-sm font-medium">Chat Doctor</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col hover:shadow-md transform hover:scale-105 transition-all">
                    <FileText className="h-8 w-8 mb-2" />
                    <span className="text-sm font-medium">View Records</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Appointments</h2>
              <Button>Book New Appointment</Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {consultationHistory.map((consultation) => (
                      <TableRow key={consultation.id}>
                        <TableCell className="font-medium">{consultation.doctor}</TableCell>
                        <TableCell>{consultation.date}</TableCell>
                        <TableCell>{consultation.type}</TableCell>
                        <TableCell>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            {consultation.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="records" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Health Records</h2>
              <div className="flex space-x-2">
                <Input placeholder="Search records..." className="w-64" />
                <Button variant="outline">Filter</Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {healthRecords.map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{record.title}</h3>
                          <p className="text-sm text-gray-600">{record.type} • {record.doctor}</p>
                          <p className="text-sm text-gray-500">{record.date}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Dr. Sarah Mwangi</h3>
                        <p className="text-sm text-gray-600">Your test results are ready for review...</p>
                        <p className="text-sm text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Dr. Paul Kiprotich</h3>
                        <p className="text-sm text-gray-600">Please take your medication as prescribed...</p>
                        <p className="text-sm text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Payment History</h2>
              <Button variant="outline">Download Statement</Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Receipt</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {consultationHistory.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.type} Consultation</TableCell>
                        <TableCell>{payment.doctor}</TableCell>
                        <TableCell>{payment.amount}</TableCell>
                        <TableCell>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            Paid
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientPortal;
