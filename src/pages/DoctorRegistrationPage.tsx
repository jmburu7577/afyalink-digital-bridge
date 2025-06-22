
import React from 'react';
import DoctorRegistration from '@/components/DoctorRegistration';
import { useAuth } from '@/contexts/AuthContext';

const DoctorRegistrationPage = () => {
  const { userProfile } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Become a Doctor on AfyaLink</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our platform to provide quality healthcare services to patients across Kenya. 
            Fill out the form below to register as a healthcare provider.
          </p>
        </div>
        
        {userProfile?.role === 'doctor' ? (
          <div className="text-center">
            <p className="text-lg text-green-600 mb-4">
              You are already registered as a doctor. Your profile is under review.
            </p>
          </div>
        ) : (
          <DoctorRegistration />
        )}
      </div>
    </div>
  );
};

export default DoctorRegistrationPage;
