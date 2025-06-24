
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Save } from 'lucide-react';
import { useHealthRecords } from '@/hooks/useHealthRecords';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface WriteNotesDialogProps {
  patientId?: string;
  appointmentId?: string;
}

const WriteNotesDialog: React.FC<WriteNotesDialogProps> = ({ patientId, appointmentId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [recordType, setRecordType] = useState('visit_note');
  const [selectedPatient, setSelectedPatient] = useState(patientId || '');

  const { createRecord } = useHealthRecords();
  const { toast } = useToast();
  const { userProfile } = useAuth();

  const handleSaveNote = async () => {
    if (!title || !content) {
      toast({
        title: "Missing Information",
        description: "Please fill in both title and content.",
        variant: "destructive"
      });
      return;
    }

    // Use patientId if provided, otherwise use selectedPatient
    const finalPatientId = patientId || selectedPatient;
    
    if (!finalPatientId) {
      toast({
        title: "Missing Patient",
        description: "Please select a patient for this note.",
        variant: "destructive"
      });
      return;
    }

    console.log('Saving note with data:', {
      patient_id: finalPatientId,
      appointment_id: appointmentId,
      record_type: recordType,
      title,
      content,
      doctor_id: userProfile?.id
    });

    const { error } = await createRecord({
      patient_id: finalPatientId,
      appointment_id: appointmentId,
      record_type: recordType,
      title,
      content,
      doctor_id: userProfile?.id
    });

    if (!error) {
      setIsOpen(false);
      setTitle('');
      setContent('');
      setRecordType('visit_note');
      toast({
        title: "Note Saved",
        description: "Your clinical note has been saved successfully."
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-20 flex flex-col bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur">
          <FileText className="h-6 w-6 mb-2" />
          <span>Write Notes</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Write Clinical Note</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Note Type</label>
            <Select value={recordType} onValueChange={setRecordType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visit_note">Visit Note</SelectItem>
                <SelectItem value="diagnosis">Diagnosis</SelectItem>
                <SelectItem value="treatment_plan">Treatment Plan</SelectItem>
                <SelectItem value="progress_note">Progress Note</SelectItem>
                <SelectItem value="consultation_note">Consultation Note</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {!patientId && (
            <div>
              <label className="text-sm font-medium mb-2 block">Patient ID</label>
              <Input
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                placeholder="Enter patient ID or select from appointments"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium mb-2 block">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title (e.g., 'Follow-up consultation', 'Initial assessment')"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Clinical Notes</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your clinical observations, diagnosis, treatment plan, patient response, recommendations..."
              rows={8}
              className="min-h-[200px]"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNote}>
              <Save className="h-4 w-4 mr-2" />
              Save Note
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WriteNotesDialog;
