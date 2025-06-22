
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Heart, Calendar, FileText, MessageCircle, Phone, Video, Users, LogOut, UserPlus, Shield } from 'lucide-react';

const Navigation = () => {
  const { user, userProfile, signOut } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const isDoctor = userProfile?.role === 'doctor';
  const isAdmin = userProfile?.role === 'admin';
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">AfyaLink</span>
            </Link>
            
            <div className="hidden md:flex space-x-4">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/schedule" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/schedule') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Calendar className="h-4 w-4 inline mr-1" />
                Schedule
              </Link>
              <Link 
                to="/video-consult" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/video-consult') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Video className="h-4 w-4 inline mr-1" />
                Consult
              </Link>
              <Link 
                to="/records" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/records') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FileText className="h-4 w-4 inline mr-1" />
                Records
              </Link>
              {isDoctor ? (
                <Link 
                  to="/doctor-portal" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/doctor-portal') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Users className="h-4 w-4 inline mr-1" />
                  Doctor Portal
                </Link>
              ) : (
                <>
                  <Link 
                    to="/patient-portal" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive('/patient-portal') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Users className="h-4 w-4 inline mr-1" />
                    Patient Portal
                  </Link>
                  <Link 
                    to="/doctor-registration" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive('/doctor-registration') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <UserPlus className="h-4 w-4 inline mr-1" />
                    Become Doctor
                  </Link>
                </>
              )}
              {isAdmin && (
                <Link 
                  to="/admin-dashboard" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/admin-dashboard') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Shield className="h-4 w-4 inline mr-1" />
                  Admin
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Welcome, {userProfile?.full_name || user.email}
              {userProfile?.role && (
                <span className="ml-1 text-xs bg-gray-100 px-2 py-1 rounded-full">
                  {userProfile.role}
                </span>
              )}
            </span>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-1" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
