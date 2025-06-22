
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDoctors } from '@/hooks/useDoctors';
import { useAppointments } from '@/hooks/useAppointments';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Video, Phone, MessageCircle, Calendar, FileText, Users, Clock } from 'lucide-react';

const Index = () => {
  const { userProfile } = useAuth();
  const { doctors } = useDoctors();
  const { appointments } = useAppointments();

  const isDoctor = userProfile?.role === 'doctor';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Heart className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Welcome to <span className="text-blue-600">AfyaLink</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your comprehensive healthcare platform connecting patients with qualified doctors through video calls, voice consultations, and secure messaging.
          </p>
          
          {userProfile && (
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg inline-block">
              Welcome back, {userProfile.full_name}! 
              {isDoctor ? ' (Doctor Portal)' : ' (Patient Portal)'}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">{doctors.length}</p>
              <p className="text-sm text-gray-600">Available Doctors</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">{appointments.length}</p>
              <p className="text-sm text-gray-600">Your Appointments</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-sm text-gray-600">Support Available</p>
            </CardContent>
          </Card>
        </div>

        {/* Consultation Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Video className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Video Consultation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Face-to-face consultation with doctors via high-quality video calls.</p>
              <p className="text-lg font-bold text-blue-600 mb-4">KSh 500</p>
              <Button asChild className="w-full">
                <Link to="/video-consult">Start Video Call</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Phone className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Voice Call</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Quick audio consultation for immediate medical advice.</p>
              <p className="text-lg font-bold text-green-600 mb-4">KSh 300</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/voice-call">Start Voice Call</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <MessageCircle className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Chat Consultation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Text-based consultation for non-urgent medical questions.</p>
              <p className="text-lg font-bold text-purple-600 mb-4">KSh 200</p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/schedule">Start Chat</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <Button asChild size="lg" className="h-20 flex flex-col">
            <Link to="/schedule">
              <Calendar className="h-6 w-6 mb-1" />
              <span className="text-sm">Schedule</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-20 flex flex-col">
            <Link to="/records">
              <FileText className="h-6 w-6 mb-1" />
              <span className="text-sm">Records</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-20 flex flex-col">
            <Link to={isDoctor ? "/doctor-portal" : "/patient-portal"}>
              <Users className="h-6 w-6 mb-1" />
              <span className="text-sm">Portal</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-20 flex flex-col">
            <Link to="/health-check">
              <Heart className="h-6 w-6 mb-1" />
              <span className="text-sm">Health Check</span>
            </Link>
          </Button>
        </div>

        {/* Features */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Why Choose AfyaLink?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">HD Video Calls</h3>
              <p className="text-sm text-gray-600">Crystal clear video consultations with licensed doctors</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Availability</h3>
              <p className="text-sm text-gray-600">Round-the-clock medical support when you need it</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Digital Records</h3>
              <p className="text-sm text-gray-600">Secure storage and easy access to your medical history</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Qualified Doctors</h3>
              <p className="text-sm text-gray-600">Licensed and verified healthcare professionals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
