
import React, { useState } from 'react';
import { Calendar, Clock, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
      <div className="container mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto">
            <Calendar className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Schedule Appointment</h1>
          <p className="text-lg text-gray-600">Book your consultation at a convenient time</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 text-center">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="font-medium text-gray-600 p-2">{day}</div>
                ))}
                {Array.from({ length: 30 }, (_, i) => (
                  <button
                    key={i}
                    className={`p-2 rounded-lg hover:bg-purple-100 ${
                      i === 15 ? 'bg-purple-600 text-white' : 'text-gray-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Time Slots */}
          <Card>
            <CardHeader>
              <CardTitle>Available Times</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      selectedTime === time
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'hover:bg-purple-50 border-gray-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Doctor Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Choose Doctor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Dr. Grace Wanjiku</h3>
                  <p className="text-sm text-gray-600">Dermatologist</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-purple-600">Next available: Today 2:00 PM</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">KSh 800</p>
                  <Button size="sm" className="mt-2">Book</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Booking Summary */}
        {selectedTime && (
          <Card className="border-2 border-purple-200 bg-purple-50">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Date:</span> June 21, 2025</p>
                <p><span className="font-medium">Time:</span> {selectedTime}</p>
                <p><span className="font-medium">Type:</span> Video Consultation</p>
                <p><span className="font-medium">Fee:</span> KSh 500</p>
              </div>
              <Button className="w-full mt-4">Confirm Booking</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Schedule;
