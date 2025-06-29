
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, UserPlus } from 'lucide-react';
import { useDoctors } from '@/hooks/useDoctors';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const DoctorManagementDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    specialty: '',
    license_number: '',
    years_experience: '',
    education: '',
    bio: '',
    consultation_fee: '500'
  });

  const { createDoctorProfile } = useDoctors();
  const { userProfile } = useAuth();
  const { toast } = useToast();

  const specialties = [
    'General Practice',
    'Cardiology',
    'Dermatology',
    'Pediatrics',
    'Psychiatry',
    'Orthopedics',
    'Gynecology',
    'Neurology',
    'Oncology',
    'Radiology'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // In a real app, you'd create the user profile first, then the doctor profile
      // For now, we'll simulate this with a mock user ID
      const mockUserId = crypto.randomUUID();
      
      const doctorData = {
        user_id: mockUserId,
        specialty: formData.specialty,
        license_number: formData.license_number,
        years_experience: parseInt(formData.years_experience) || 0,
        education: formData.education,
        bio: formData.bio,
        consultation_fee: parseFloat(formData.consultation_fee) || 500,
        is_verified: userProfile?.role === 'admin', // Auto-verify if admin
        is_available: true
      };

      const result = await createDoctorProfile(doctorData);
      
      if (!result.error) {
        toast({
          title: "Doctor added successfully!",
          description: `Dr. ${formData.full_name} has been added to the system.`
        });
        
        setIsOpen(false);
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          specialty: '',
          license_number: '',
          years_experience: '',
          education: '',
          bio: '',
          consultation_fee: '500'
        });
      }
    } catch (error: any) {
      toast({
        title: "Error adding doctor",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // Only show to admins or for demo purposes
  if (userProfile?.role !== 'admin') {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Doctor
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Doctor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="specialty">Specialty</Label>
              <Select value={formData.specialty} onValueChange={(value) => setFormData({...formData, specialty: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="license_number">License Number</Label>
              <Input
                id="license_number"
                value={formData.license_number}
                onChange={(e) => setFormData({...formData, license_number: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="years_experience">Years of Experience</Label>
              <Input
                id="years_experience"
                type="number"
                value={formData.years_experience}
                onChange={(e) => setFormData({...formData, years_experience: e.target.value})}
                min="0"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="consultation_fee">Consultation Fee (KSh)</Label>
            <Input
              id="consultation_fee"
              type="number"
              value={formData.consultation_fee}
              onChange={(e) => setFormData({...formData, consultation_fee: e.target.value})}
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <Label htmlFor="education">Education</Label>
            <Textarea
              id="education"
              value={formData.education}
              onChange={(e) => setFormData({...formData, education: e.target.value})}
              placeholder="List medical education and qualifications"
            />
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              placeholder="Tell patients about the doctor's experience and practice"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Doctor</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorManagementDialog;
