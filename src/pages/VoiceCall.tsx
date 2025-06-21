
import React from 'react';
import { Phone, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const VoiceCall = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
      <div className="container mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <Phone className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Voice Consultation</h1>
          <p className="text-lg text-gray-600">Quick audio consultation with healthcare professionals</p>
        </div>

        {/* Call Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-700">Immediate Call</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">Connect with the next available doctor for urgent consultation</p>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-green-600" />
                <span className="text-sm">Average wait time: 2 minutes</span>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Phone className="h-4 w-4 mr-2" />
                Call Now - KSh 300
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Schedule Call</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">Book a call with a specific doctor at your preferred time</p>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Next available: Today 3:00 PM</span>
              </div>
              <Button variant="outline" className="w-full">
                Schedule Call
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Available Doctors */}
        <Card>
          <CardHeader>
            <CardTitle>Available for Voice Calls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2].map((_, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Dr. James Kiprop</h3>
                  <p className="text-sm text-gray-600">Pediatrician</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Available</Badge>
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VoiceCall;
