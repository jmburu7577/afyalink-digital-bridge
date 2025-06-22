
import React, { useState } from 'react';
import { useHealthRecords } from '@/hooks/useHealthRecords';
import { useDoctors } from '@/hooks/useDoctors';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileText, Plus } from 'lucide-react';

interface HealthRecordFormProps {
  patientId?: string;
  appointmentId?: string;
  onSuccess?: () => void;
}

const HealthRecordForm: React.FC<HealthRecordFormProps> = ({ 
  patientId, 
  appointmentId, 
  onSuccess 
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [recordType, setRecordType] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(patientId || '');
  const [isOpen, setIsOpen] = useState(false);

  const { createRecord } = useHealthRecords();
  const { userProfile } = useAuth();
  const isDoctor = userProfile?.role === 'doctor';

  const handleSubmit = async () => {
    if (!title || !content || !recordType || (!patientId && !selectedPatient)) {
      return;
    }

    // For doctors, get their doctor ID
    let doctorId = null;
    if (isDoctor) {
      // We would need to fetch the doctor's ID from the doctors table
      // For now, we'll assume it's available in userProfile or fetch it
    }

    const { error } = await createRecord({
      patient_id: patientId || selectedPatient,
      doctor_id: doctorId,
      appointment_id: appointmentId,
      record_type: recordType,
      title,
      content
    });

    if (!error) {
      setIsOpen(false);
      setTitle('');
      setContent('');
      setRecordType('');
      setSelectedPatient('');
      onSuccess?.();
    }
  };

  if (!isDoctor && !patientId) {
    return null; // Only doctors can create records for other patients
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Health Record
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Health Record</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Record Type</label>
            <Select onValueChange={setRecordType}>
              <SelectTrigger>
                <SelectValue placeholder="Select record type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prescription">Prescription</SelectItem>
                <SelectItem value="lab_report">Lab Report</SelectItem>
                <SelectItem value="visit_note">Visit Note</SelectItem>
                <SelectItem value="diagnosis">Diagnosis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter record title"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Content</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter record details"
              rows={4}
            />
          </div>

          <Button 
            onClick={handleSubmit} 
            className="w-full"
            disabled={!title || !content || !recordType}
          >
            <FileText className="h-4 w-4 mr-2" />
            Create Record
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HealthRecordForm;
