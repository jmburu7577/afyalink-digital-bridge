
import React, { useState } from 'react';
import { Users, UserCheck, BarChart3, Monitor, Settings, FileText, DollarSign, MapPin, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { title: 'Total Users', value: '2,847', icon: Users, change: '+12%' },
    { title: 'Active Doctors', value: '156', icon: UserCheck, change: '+8%' },
    { title: 'Today\'s Consultations', value: '89', icon: Monitor, change: '+23%' },
    { title: 'Revenue (KSh)', value: '234,500', icon: DollarSign, change: '+15%' }
  ];

  const pendingVerifications = [
    { id: 1, name: 'Dr. James Kimani', specialty: 'Cardiology', submitted: '2024-01-15', status: 'pending' },
    { id: 2, name: 'Dr. Mary Wanjiku', specialty: 'Pediatrics', submitted: '2024-01-14', status: 'pending' },
    { id: 3, name: 'Dr. Peter Mwangi', specialty: 'General Practice', submitted: '2024-01-13', status: 'pending' }
  ];

  const activeConsultations = [
    { id: 1, patient: 'John Doe', doctor: 'Dr. Sarah Mwangi', type: 'Video', duration: '15 min', status: 'ongoing' },
    { id: 2, patient: 'Jane Smith', doctor: 'Dr. Paul Kiprotich', type: 'Audio', duration: '8 min', status: 'ongoing' },
    { id: 3, patient: 'Mary Johnson', doctor: 'Dr. Grace Wanjala', type: 'Chat', duration: '22 min', status: 'ongoing' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">AfyaLink Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">Export Report</Button>
              <Button size="sm">Settings</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} from last month</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="doctors">Doctor Verification</TabsTrigger>
            <TabsTrigger value="consultations">Live Monitoring</TabsTrigger>
            <TabsTrigger value="settings">Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Analytics Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Peak Hours</span>
                      <span className="font-semibold">9 AM - 11 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Top Region</span>
                      <span className="font-semibold">Nairobi County</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg. Consultation Time</span>
                      <span className="font-semibold">18 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Patient Satisfaction</span>
                      <span className="font-semibold">4.8/5.0</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm">High consultation volume detected</span>
                      <span className="text-xs text-gray-500">2 min ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <span className="text-sm">Doctor verification pending review</span>
                      <span className="text-xs text-gray-500">15 min ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm">System maintenance scheduled</span>
                      <span className="text-xs text-gray-500">1 hour ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Account Management</CardTitle>
                <div className="flex space-x-2">
                  <Input placeholder="Search users..." className="max-w-sm" />
                  <Button variant="outline">Filter</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>John Doe</TableCell>
                      <TableCell>john@example.com</TableCell>
                      <TableCell>Patient</TableCell>
                      <TableCell><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span></TableCell>
                      <TableCell>2024-01-10</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="doctors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Doctor Verification Queue</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Doctor Name</TableHead>
                      <TableHead>Specialty</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingVerifications.map((doctor) => (
                      <TableRow key={doctor.id}>
                        <TableCell className="font-medium">{doctor.name}</TableCell>
                        <TableCell>{doctor.specialty}</TableCell>
                        <TableCell>{doctor.submitted}</TableCell>
                        <TableCell>
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                            Pending Review
                          </span>
                        </TableCell>
                        <TableCell className="space-x-2">
                          <Button variant="outline" size="sm">Review</Button>
                          <Button size="sm">Approve</Button>
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
                <CardTitle className="flex items-center">
                  <Monitor className="h-5 w-5 mr-2" />
                  Live Consultation Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeConsultations.map((consultation) => (
                      <TableRow key={consultation.id}>
                        <TableCell>{consultation.patient}</TableCell>
                        <TableCell>{consultation.doctor}</TableCell>
                        <TableCell>{consultation.type}</TableCell>
                        <TableCell>{consultation.duration}</TableCell>
                        <TableCell>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                            {consultation.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Monitor</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Service Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Video Consultation Price (KSh)</label>
                    <Input defaultValue="500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Audio Consultation Price (KSh)</label>
                    <Input defaultValue="300" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Chat Consultation Price (KSh)</label>
                    <Input defaultValue="200" />
                  </div>
                  <Button>Update Prices</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Maximum Consultation Duration (minutes)</label>
                    <Input defaultValue="60" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Doctor Commission Rate (%)</label>
                    <Input defaultValue="70" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Maintenance Mode</label>
                    <Button variant="outline">Enable</Button>
                  </div>
                  <Button>Save Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
