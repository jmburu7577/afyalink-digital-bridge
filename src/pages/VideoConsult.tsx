
import React from 'react';
import { Video, Phone, MessageCircle, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

        {/* Available Doctors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Available Now
              <Badge className="bg-green-100 text-green-800">3 doctors online</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Dr. Sarah Mwangi</h3>
                <p className="text-sm text-gray-600">General Practitioner</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">Available now</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">KSh 500</p>
                <Button size="sm" className="mt-2">
                  <Video className="h-4 w-4 mr-2" />
                  Start Call
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Start Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <Video className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Instant Video Call</h3>
              <p className="text-sm text-gray-600 mb-4">Connect with the next available doctor</p>
              <Button className="w-full">Start Now</Button>
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
