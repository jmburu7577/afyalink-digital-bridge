
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PatientDataFormProps {
  patientId: string;
  appointmentId?: string;
  onSuccess?: () => void;
}

const PatientDataForm: React.FC<PatientDataFormProps> = ({ patientId, appointmentId, onSuccess }) => {
  const [formData, setFormData] = useState({
    record_type: '',
    title: '',
    content: '',
    file_url: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const recordTypes = [
    { value: 'prescription', label: 'Prescription' },
    { value: 'lab_report', label: 'Lab Report' },
    { value: 'visit_note', label: 'Visit Note' },
    { value: 'diagnosis', label: 'Diagnosis' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get current user's doctor profile
      const { data: doctorProfile, error: doctorError } = await supabase
        .from('doctors')
        .select('id')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (doctorError || !doctorProfile) {
        throw new Error('You must be a verified doctor to create health records');
      }

      const recordData = {
        patient_id: patientId,
        doctor_id: doctorProfile.id,
        appointment_id: appointmentId || null,
        record_type: formData.record_type,
        title: formData.title,
        content: formData.content,
        file_url: formData.file_url || null
      };

      const { error } = await supabase
        .from('health_records')
        .insert([recordData]);

      if (error) throw error;

      toast({
        title: "Health record created!",
        description: "The health record has been added successfully."
      });

      // Reset form
      setFormData({
        record_type: '',
        title: '',
        content: '',
        file_url: ''
      });

      if (onSuccess) onSuccess();

    } catch (error: any) {
      toast({
        title: "Error creating health record",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Patient Health Record</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="record_type">Record Type</Label>
            <Select value={formData.record_type} onValueChange={(value) => setFormData({...formData, record_type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select record type" />
              </SelectTrigger>
              <SelectContent>
                {recordTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
              placeholder="e.g., Blood pressure medication, X-ray results"
            />
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="Detailed description of the record"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="file_url">File URL (Optional)</Label>
            <Input
              id="file_url"
              type="url"
              value={formData.file_url}
              onChange={(e) => setFormData({...formData, file_url: e.target.value})}
              placeholder="https://example.com/report.pdf"
            />
          </div>

          <Button type="submit" disabled={isSubmitting || !formData.record_type || !formData.title}>
            {isSubmitting ? 'Creating...' : 'Create Health Record'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PatientDataForm;
