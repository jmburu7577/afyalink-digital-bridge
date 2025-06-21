
import React from 'react';
import { FileText, Download, Eye, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Records = () => {
  const records = [
    {
      id: 1,
      type: 'Consultation',
      doctor: 'Dr. Sarah Mwangi',
      date: 'June 15, 2025',
      diagnosis: 'General Checkup',
      status: 'Completed'
    },
    {
      id: 2,
      type: 'Prescription',
      doctor: 'Dr. James Kiprop',
      date: 'June 10, 2025',
      diagnosis: 'Common Cold',
      status: 'Active'
    },
    {
      id: 3,
      type: 'Lab Results',
      doctor: 'Dr. Grace Wanjiku',
      date: 'June 5, 2025',
      diagnosis: 'Blood Work',
      status: 'Reviewed'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-4">
      <div className="container mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto">
            <FileText className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Health Records</h1>
          <p className="text-lg text-gray-600">View and manage your medical history</p>
        </div>

        {/* Records List */}
        <div className="space-y-4">
          {records.map(record => (
            <Card key={record.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <FileText className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{record.diagnosis}</h3>
                      <p className="text-sm text-gray-600">{record.doctor}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">{record.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge 
                      variant={record.status === 'Active' ? 'default' : 'secondary'}
                      className={record.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {record.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="p-6">
              <FileText className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Request Records</h3>
              <p className="text-sm text-gray-600 mb-4">Get copies of your medical records</p>
              <Button variant="outline" className="w-full">Request</Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Download className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Download All</h3>
              <p className="text-sm text-gray-600 mb-4">Download complete medical history</p>
              <Button variant="outline" className="w-full">Download</Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Eye className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Share Records</h3>
              <p className="text-sm text-gray-600 mb-4">Share with healthcare providers</p>
              <Button variant="outline" className="w-full">Share</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Records;
