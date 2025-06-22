
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDoctors } from '@/hooks/useDoctors';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const DoctorRegistration = () => {
  const [formData, setFormData] = useState({
    specialty: '',
    license_number: '',
    years_experience: '',
    education: '',
    bio: '',
    consultation_fee: '500'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createDoctorProfile } = useDoctors();
  const { user, updateProfile } = useAuth();
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
    if (!user) return;

    setIsSubmitting(true);

    try {
      // First update user role to doctor
      await updateProfile({ role: 'doctor' });

      // Then create doctor profile
      const doctorData = {
        user_id: user.id,
        specialty: formData.specialty,
        license_number: formData.license_number,
        years_experience: parseInt(formData.years_experience) || 0,
        education: formData.education,
        bio: formData.bio,
        consultation_fee: parseFloat(formData.consultation_fee) || 500,
        is_verified: false,
        is_available: true
      };

      const result = await createDoctorProfile(doctorData);
      
      if (result.error) {
        throw new Error(result.error.message);
      }

      toast({
        title: "Doctor profile submitted!",
        description: "Your profile is pending admin verification."
      });

      // Reset form
      setFormData({
        specialty: '',
        license_number: '',
        years_experience: '',
        education: '',
        bio: '',
        consultation_fee: '500'
      });

    } catch (error: any) {
      toast({
        title: "Error creating doctor profile",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Register as Doctor</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="specialty">Specialty</Label>
            <Select value={formData.specialty} onValueChange={(value) => setFormData({...formData, specialty: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select your specialty" />
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

          <div>
            <Label htmlFor="education">Education</Label>
            <Textarea
              id="education"
              value={formData.education}
              onChange={(e) => setFormData({...formData, education: e.target.value})}
              placeholder="List your medical education and qualifications"
            />
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              placeholder="Tell patients about yourself and your practice"
            />
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

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Submitting...' : 'Register as Doctor'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DoctorRegistration;
