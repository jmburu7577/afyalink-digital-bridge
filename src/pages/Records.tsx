
import React from 'react';
import { useHealthRecords } from '@/hooks/useHealthRecords';
import HealthRecordForm from '@/components/HealthRecordForm';
import { FileText, Download, Eye, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Records = () => {
  const { records, loading, refetch } = useHealthRecords();

  const getRecordTypeColor = (type: string) => {
    switch (type) {
      case 'prescription': return 'bg-blue-100 text-blue-800';
      case 'lab_report': return 'bg-green-100 text-green-800';
      case 'visit_note': return 'bg-yellow-100 text-yellow-800';
      case 'diagnosis': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">Loading health records...</div>
        </div>
      </div>
    );
  }

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

        {/* Quick Actions */}
        <div className="flex justify-center">
          <HealthRecordForm onSuccess={refetch} />
        </div>

        {/* Records List */}
        <div className="space-y-4">
          {records.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No health records yet</h3>
                <p className="text-gray-600 mb-4">Your medical records will appear here after your consultations</p>
              </CardContent>
            </Card>
          ) : (
            records.map((record: any) => (
              <Card key={record.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <FileText className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{record.title}</h3>
                        <p className="text-sm text-gray-600">
                          {record.doctor?.user?.full_name || 'Unknown Doctor'} • {record.doctor?.specialty}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {new Date(record.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        {record.content && (
                          <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                            {record.content}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getRecordTypeColor(record.record_type)}>
                        {record.record_type.replace('_', ' ')}
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
            ))
          )}
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
