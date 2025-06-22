
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, Phone, MessageCircle, Calendar, FileText, Users, UserPlus, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { userProfile } = useAuth();
  const isDoctor = userProfile?.role === 'doctor';
  const isAdmin = userProfile?.role === 'admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Your Health, <span className="text-blue-600">Connected</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Access quality healthcare from anywhere in Kenya. Connect with verified doctors through video calls, voice consultations, or secure messaging.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link to="/video-consult">
                  <Button size="lg" className="w-full">
                    Start Consultation
                  </Button>
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link to="/schedule">
                  <Button variant="outline" size="lg" className="w-full">
                    Schedule Appointment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/video-consult">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Video className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Video Consultation</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">Connect face-to-face with doctors via secure video calls</p>
                <p className="text-sm font-semibold text-blue-600 mt-2">From KSh 500</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/voice-call">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Voice Call</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">Quick audio consultations for immediate medical advice</p>
                <p className="text-sm font-semibold text-green-600 mt-2">From KSh 300</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/schedule">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <MessageCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Chat Consultation</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">Secure messaging with healthcare professionals</p>
                <p className="text-sm font-semibold text-purple-600 mt-2">From KSh 200</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Role-based Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Patient Section */}
          {!isDoctor && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-6 w-6 mr-2" />
                  Patient Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/patient-portal">
                    <Button variant="outline" className="w-full h-16 flex flex-col">
                      <Users className="h-6 w-6 mb-1" />
                      <span className="text-xs">Patient Portal</span>
                    </Button>
                  </Link>
                  <Link to="/records">
                    <Button variant="outline" className="w-full h-16 flex flex-col">
                      <FileText className="h-6 w-6 mb-1" />
                      <span className="text-xs">Health Records</span>
                    </Button>
                  </Link>
                  <Link to="/schedule">
                    <Button variant="outline" className="w-full h-16 flex flex-col">
                      <Calendar className="h-6 w-6 mb-1" />
                      <span className="text-xs">Appointments</span>
                    </Button>
                  </Link>
                  <Link to="/doctor-registration">
                    <Button variant="outline" className="w-full h-16 flex flex-col">
                      <UserPlus className="h-6 w-6 mb-1" />
                      <span className="text-xs">Become Doctor</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Doctor Section */}
          {isDoctor && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserPlus className="h-6 w-6 mr-2" />
                  Doctor Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/doctor-portal">
                    <Button className="w-full h-16 flex flex-col">
                      <Users className="h-6 w-6 mb-1" />
                      <span className="text-xs">Doctor Portal</span>
                    </Button>
                  </Link>
                  <Link to="/schedule">
                    <Button variant="outline" className="w-full h-16 flex flex-col">
                      <Calendar className="h-6 w-6 mb-1" />
                      <span className="text-xs">My Schedule</span>
                    </Button>
                  </Link>
                  <Link to="/records">
                    <Button variant="outline" className="w-full h-16 flex flex-col">
                      <FileText className="h-6 w-6 mb-1" />
                      <span className="text-xs">Patient Records</span>
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full h-16 flex flex-col" disabled>
                    <MessageCircle className="h-6 w-6 mb-1" />
                    <span className="text-xs">Messages</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Admin Section */}
          {isAdmin && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-6 w-6 mr-2" />
                  Admin Panel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/admin-dashboard">
                  <Button className="w-full">
                    <Shield className="h-4 w-4 mr-2" />
                    Admin Dashboard
                  </Button>
                </Link>
                <p className="text-sm text-gray-600">
                  Manage doctor verifications, view platform statistics, and oversee system operations.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Features Section */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Secure video and audio consultations</li>
                <li>✓ Encrypted messaging with doctors</li>
                <li>✓ Digital health records management</li>
                <li>✓ Appointment scheduling system</li>
                <li>✓ Verified healthcare professionals</li>
                <li>✓ Mobile-responsive platform</li>
                <li>✓ Affordable consultation rates</li>
                <li>✓ 24/7 platform availability</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
