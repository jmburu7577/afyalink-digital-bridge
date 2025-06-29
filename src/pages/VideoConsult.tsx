
import React from 'react';
import { Video, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import InstantCallButton from '@/components/InstantCallButton';
import AvailableDoctorsCard from '@/components/AvailableDoctorsCard';

const VideoConsult = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="container mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Video className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Video Consultation</h1>
          <p className="text-lg text-gray-600">Connect with a doctor instantly via video call</p>
        </div>

        {/* Instant Call Section */}
        <Card className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
          <CardContent className="p-8 text-center">
            <Video className="h-16 w-16 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl font-bold mb-2">Need Immediate Care?</h2>
            <p className="text-blue-100 mb-6">Connect with the next available doctor instantly</p>
            <InstantCallButton />
          </CardContent>
        </Card>

        {/* Available Doctors */}
        <AvailableDoctorsCard />

        {/* Quick Start Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <Video className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Schedule Later</h3>
              <p className="text-sm text-gray-600 mb-4">Book an appointment for a specific time</p>
              <Button variant="outline" className="w-full">Schedule Appointment</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Chat First</h3>
              <p className="text-sm text-gray-600 mb-4">Describe your symptoms via chat</p>
              <Button variant="outline" className="w-full">Start Chat</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideoConsult;
