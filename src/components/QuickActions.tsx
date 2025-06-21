
import React from 'react';
import { Video, Phone, Calendar, FileText, Pill, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const QuickActions = () => {
  const actions = [
    {
      icon: Video,
      label: 'Video Consult',
      color: 'bg-blue-100 text-blue-600',
      description: 'Start now'
    },
    {
      icon: Phone,
      label: 'Voice Call',
      color: 'bg-green-100 text-green-600',
      description: 'Quick call'
    },
    {
      icon: Calendar,
      label: 'Schedule',
      color: 'bg-purple-100 text-purple-600',
      description: 'Book later'
    },
    {
      icon: FileText,
      label: 'Records',
      color: 'bg-orange-100 text-orange-600',
      description: 'View history'
    },
    {
      icon: Pill,
      label: 'Pharmacy',
      color: 'bg-pink-100 text-pink-600',
      description: 'Order meds'
    },
    {
      icon: Activity,
      label: 'Health Check',
      color: 'bg-red-100 text-red-600',
      description: 'Monitor'
    }
  ];

  return (
    <section className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action, index) => (
          <Card key={index} className="hover:shadow-md transition-all duration-300 cursor-pointer group">
            <CardContent className="p-4 text-center">
              <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className="h-6 w-6" />
              </div>
              <h4 className="font-medium text-gray-900 text-sm mb-1">{action.label}</h4>
              <p className="text-xs text-gray-500">{action.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default QuickActions;
