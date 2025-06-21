
import React from 'react';
import { Stethoscope, Phone, Calendar, FileText, User, Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import DoctorCard from '@/components/DoctorCard';
import QuickActions from '@/components/QuickActions';
import HealthStats from '@/components/HealthStats';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AfyaLink</h1>
                <p className="text-sm text-gray-600">Your Health, Connected</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Connect with Healthcare Professionals
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get instant access to certified doctors and healthcare services. 
            Your health is just a tap away.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search doctors, specialties..." 
              className="pl-10 h-12 rounded-full border-2 border-blue-100 focus:border-blue-300"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Health Stats */}
        <HealthStats />

        {/* Available Doctors */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">Available Doctors</h3>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              12 Online Now
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DoctorCard 
              name="Dr. Sarah Mwangi"
              specialty="General Practitioner"
              rating={4.9}
              experience="8 years"
              price="KSh 500"
              image="/placeholder.svg"
              isOnline={true}
              nextAvailable="Available now"
            />
            <DoctorCard 
              name="Dr. James Kiprop"
              specialty="Pediatrician"
              rating={4.8}
              experience="12 years"
              price="KSh 700"
              image="/placeholder.svg"
              isOnline={true}
              nextAvailable="Available now"
            />
            <DoctorCard 
              name="Dr. Grace Wanjiku"
              specialty="Dermatologist"
              rating={4.7}
              experience="6 years"
              price="KSh 800"
              image="/placeholder.svg"
              isOnline={false}
              nextAvailable="Available at 2:00 PM"
            />
          </div>
        </section>

        {/* Recent Consultations */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">Recent Consultations</h3>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">General Checkup</h4>
                    <p className="text-sm text-gray-600">Dr. Sarah Mwangi • June 15, 2025</p>
                  </div>
                </div>
                <Badge variant="outline">Completed</Badge>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around py-2">
            <Button variant="ghost" className="flex flex-col items-center space-y-1 py-2">
              <Stethoscope className="h-5 w-5 text-blue-600" />
              <span className="text-xs text-blue-600">Home</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center space-y-1 py-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span className="text-xs text-gray-400">Appointments</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center space-y-1 py-2">
              <Phone className="h-5 w-5 text-gray-400" />
              <span className="text-xs text-gray-400">Consult</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center space-y-1 py-2">
              <FileText className="h-5 w-5 text-gray-400" />
              <span className="text-xs text-gray-400">Records</span>
            </Button>
            <Button variant="ghost" className="flex flex-col items-center space-y-1 py-2">
              <User className="h-5 w-5 text-gray-400" />
              <span className="text-xs text-gray-400">Profile</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Add bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
};

export default Index;
