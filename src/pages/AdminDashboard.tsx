
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Users, UserCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [stats, setStats] = useState({
    totalDoctors: 0,
    verifiedDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0
  });
  const [loading, setLoading] = useState(true);
  const { userProfile } = useAuth();
  const { toast } = useToast();

  const fetchPendingDoctors = async () => {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select(`
          *,
          user:profiles(full_name, email, phone)
        `)
        .eq('is_verified', false)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPendingDoctors(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading pending doctors",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const fetchStats = async () => {
    try {
      // Get total doctors
      const { count: totalDoctors } = await supabase
        .from('doctors')
        .select('*', { count: 'exact', head: true });

      // Get verified doctors
      const { count: verifiedDoctors } = await supabase
        .from('doctors')
        .select('*', { count: 'exact', head: true })
        .eq('is_verified', true);

      // Get total patients
      const { count: totalPatients } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'patient');

      // Get total appointments
      const { count: totalAppointments } = await supabase
        .from('appointments')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalDoctors: totalDoctors || 0,
        verifiedDoctors: verifiedDoctors || 0,
        totalPatients: totalPatients || 0,
        totalAppointments: totalAppointments || 0
      });
    } catch (error: any) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleVerifyDoctor = async (doctorId: string) => {
    try {
      const { error } = await supabase
        .from('doctors')
        .update({ is_verified: true })
        .eq('id', doctorId);

      if (error) throw error;

      toast({
        title: "Doctor verified!",
        description: "The doctor has been verified and can now accept appointments."
      });

      fetchPendingDoctors();
      fetchStats();
    } catch (error: any) {
      toast({
        title: "Error verifying doctor",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleRejectDoctor = async (doctorId: string) => {
    try {
      const { error } = await supabase
        .from('doctors')
        .delete()
        .eq('id', doctorId);

      if (error) throw error;

      toast({
        title: "Doctor application rejected",
        description: "The doctor application has been rejected and removed."
      });

      fetchPendingDoctors();
      fetchStats();
    } catch (error: any) {
      toast({
        title: "Error rejecting doctor",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (userProfile?.role === 'admin') {
      fetchPendingDoctors();
      fetchStats();
    }
    setLoading(false);
  }, [userProfile]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (userProfile?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p>You need admin privileges to access this page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.totalDoctors}</p>
              <p className="text-sm text-gray-600">Total Doctors</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <UserCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.verifiedDoctors}</p>
              <p className="text-sm text-gray-600">Verified Doctors</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.totalPatients}</p>
              <p className="text-sm text-gray-600">Total Patients</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.totalAppointments}</p>
              <p className="text-sm text-gray-600">Total Appointments</p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Doctor Verifications */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Doctor Verifications</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingDoctors.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No pending doctor verifications</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>License</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingDoctors.map((doctor: any) => (
                    <TableRow key={doctor.id}>
                      <TableCell className="font-medium">{doctor.user?.full_name}</TableCell>
                      <TableCell>{doctor.user?.email}</TableCell>
                      <TableCell>{doctor.specialty}</TableCell>
                      <TableCell>{doctor.license_number}</TableCell>
                      <TableCell>{doctor.years_experience} years</TableCell>
                      <TableCell>
                        <Badge variant="outline">Pending</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleVerifyDoctor(doctor.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Verify
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRejectDoctor(doctor.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
