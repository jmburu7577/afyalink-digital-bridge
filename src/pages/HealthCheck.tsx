
import React from 'react';
import { Activity, Heart, Thermometer, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const HealthCheck = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-4">
      <div className="container mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
            <Activity className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Health Monitoring</h1>
          <p className="text-lg text-gray-600">Track your vital signs and health metrics</p>
        </div>

        {/* Current Vitals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Heart className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Heart Rate</p>
                  <p className="text-2xl font-bold">72 <span className="text-sm font-normal">bpm</span></p>
                  <p className="text-xs text-green-600">Normal</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Thermometer className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Temperature</p>
                  <p className="text-2xl font-bold">36.8 <span className="text-sm font-normal">°C</span></p>
                  <p className="text-xs text-green-600">Normal</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Activity className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Blood Pressure</p>
                  <p className="text-2xl font-bold">120/80</p>
                  <p className="text-xs text-green-600">Good</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Health Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Health Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Weekly Exercise Goal</span>
                <span>4/5 days</span>
              </div>
              <Progress value={80} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Daily Water Intake</span>
                <span>6/8 glasses</span>
              </div>
              <Progress value={75} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Sleep Quality</span>
                <span>7.5/8 hours</span>
              </div>
              <Progress value={94} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <Activity className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Log Vitals</h3>
              <p className="text-sm text-gray-600 mb-4">Record your current vital signs</p>
              <Button className="w-full">Log Now</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Set Reminders</h3>
              <p className="text-sm text-gray-600 mb-4">Get reminded to check your health</p>
              <Button variant="outline" className="w-full">Set Reminder</Button>
            </CardContent>
          </Card>
        </div>

        {/* Health Alerts */}
        <Card className="border-2 border-yellow-200 bg-yellow-50">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2 text-yellow-800">Health Reminders</h3>
            <ul className="space-y-2 text-sm text-yellow-700">
              <li>• Annual checkup due in 2 weeks</li>
              <li>• Blood pressure medication reminder at 8:00 PM</li>
              <li>• Increase daily water intake target</li>
            </ul>
            <Button className="mt-4" size="sm">View All Reminders</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthCheck;
