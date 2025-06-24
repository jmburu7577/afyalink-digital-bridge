
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Save } from 'lucide-react';
import { useHealthRecords } from '@/hooks/useHealthRecords';
import { useToast } from '@/hooks/use-toast';

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

  const handleSaveNote = async () => {
    if (!title || !content) {
      toast({
        title: "Missing Information",
        description: "Please fill in both title and content.",
        variant: "destructive"
      });
      return;
    }

    const { error } = await createRecord({
      patient_id: selectedPatient,
      appointment_id: appointmentId,
      record_type: recordType,
      title,
      content
    });

    if (!error) {
      setIsOpen(false);
      setTitle('');
      setContent('');
      toast({
        title: "Note Saved",
        description: "Your note has been saved successfully."
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
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Clinical Notes</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your clinical observations, diagnosis, treatment plan..."
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
