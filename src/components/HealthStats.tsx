
import React from 'react';
import { Heart, Thermometer, Activity, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const HealthStats = () => {
  const stats = [
    {
      icon: Heart,
      label: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      status: 'Normal',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Thermometer,
      label: 'Temperature',
      value: '36.8',
      unit: '°C',
      status: 'Normal',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Activity,
      label: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      status: 'Good',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Clock,
      label: 'Last Checkup',
      value: '2',
      unit: 'weeks ago',
      status: 'Due soon',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Health Overview</h3>
        <span className="text-sm text-gray-500">Last updated: Today</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-xl font-bold text-gray-900">{stat.value}</span>
                    <span className="text-sm text-gray-500">{stat.unit}</span>
                  </div>
                  <p className={`text-xs ${stat.color} font-medium`}>{stat.status}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Health Progress Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <CardTitle className="text-lg">Health Goals Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Weekly Exercise Goal</span>
              <span>4/5 days</span>
            </div>
            <Progress value={80} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Water Intake Today</span>
              <span>6/8 glasses</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Sleep Quality</span>
              <span>7.5/8 hours</span>
            </div>
            <Progress value={94} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default HealthStats;
