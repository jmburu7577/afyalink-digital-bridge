import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Save, FileTemplate } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useHealthRecords } from '@/hooks/useHealthRecords';
import ClinicalNoteTemplates from './ClinicalNoteTemplates';

interface EnhancedWriteNotesDialogProps {
  appointments: any[];
}

const EnhancedWriteNotesDialog: React.FC<EnhancedWriteNotesDialogProps> = ({ appointments }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState('');
  const [noteData, setNoteData] = useState({
    chiefComplaint: '',
    historyOfPresentIllness: '',
    physicalExamination: '',
    assessment: '',
    plan: '',
    additionalNotes: ''
  });

  const { createRecord } = useHealthRecords();
  const { toast } = useToast();

  const handleTemplateSelect = (template: any) => {
    setNoteData({
      chiefComplaint: template.chiefComplaint,
      historyOfPresentIllness: template.historyOfPresentIllness,
      physicalExamination: template.physicalExamination,
      assessment: template.assessment,
      plan: template.plan,
      additionalNotes: ''
    });
    toast({
      title: "Template Applied",
      description: "Clinical note template has been loaded. You can now customize it."
    });
  };

  const handleSaveNote = async () => {
    if (!selectedAppointment) {
      toast({
        title: "No Appointment Selected",
        description: "Please select an appointment to associate with this clinical note.",
        variant: "destructive"
      });
      return;
    }

    const appointment = appointments.find(apt => apt.id === selectedAppointment);
    if (!appointment) {
      toast({
        title: "Invalid Appointment",
        description: "Selected appointment not found.",
        variant: "destructive"
      });
      return;
    }

    const clinicalNote = `
CLINICAL NOTE

Patient: ${appointment.patient?.full_name || 'Unknown'}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

CHIEF COMPLAINT:
${noteData.chiefComplaint}

HISTORY OF PRESENT ILLNESS:
${noteData.historyOfPresentIllness}

PHYSICAL EXAMINATION:
${noteData.physicalExamination}

ASSESSMENT:
${noteData.assessment}

PLAN:
${noteData.plan}

ADDITIONAL NOTES:
${noteData.additionalNotes}

Provider: [Doctor Name]
Date: ${new Date().toLocaleDateString()}
    `;

    const recordData = {
      patient_id: appointment.patient_id,
      appointment_id: appointment.id,
      doctor_id: appointment.doctor_id,
      record_type: 'clinical_note',
      title: `Clinical Note - ${new Date().toLocaleDateString()}`,
      content: clinicalNote.trim()
    };

    console.log('Saving clinical note with data:', recordData);

    const result = await createRecord(recordData);

    if (!result.error) {
      setIsOpen(false);
      setNoteData({
        chiefComplaint: '',
        historyOfPresentIllness: '',
        physicalExamination: '',
        assessment: '',
        plan: '',
        additionalNotes: ''
      });
      setSelectedAppointment('');
      
      toast({
        title: "Clinical Note Saved",
        description: "The clinical note has been successfully saved to the patient's record."
      });
    } else {
      console.error('Error saving clinical note:', result.error);
      toast({
        title: "Error Saving Note",
        description: "There was an error saving the clinical note. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-20 flex flex-col bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur">
          <FileText className="h-6 w-6 mb-2" />
          <span>Write Clinical Note</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Clinical Documentation
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="note" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="note">Clinical Note</TabsTrigger>
            <TabsTrigger value="templates">
              <FileTemplate className="h-4 w-4 mr-2" />
              Templates
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates">
            <ClinicalNoteTemplates onSelectTemplate={handleTemplateSelect} />
          </TabsContent>
          
          <TabsContent value="note" className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Appointment</label>
              <Select value={selectedAppointment} onValueChange={setSelectedAppointment}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an appointment to document" />
                </SelectTrigger>
                <SelectContent>
                  {appointments.map((appointment) => (
                    <SelectItem key={appointment.id} value={appointment.id}>
                      {appointment.patient?.full_name} - {appointment.appointment_date} at {appointment.appointment_time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Chief Complaint</label>
                  <Textarea
                    value={noteData.chiefComplaint}
                    onChange={(e) => setNoteData(prev => ({ ...prev, chiefComplaint: e.target.value }))}
                    placeholder="Patient's primary concern or reason for visit..."
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">History of Present Illness</label>
                  <Textarea
                    value={noteData.historyOfPresentIllness}
                    onChange={(e) => setNoteData(prev => ({ ...prev, historyOfPresentIllness: e.target.value }))}
                    placeholder="Detailed history of the current condition..."
                    rows={4}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Physical Examination</label>
                  <Textarea
                    value={noteData.physicalExamination}
                    onChange={(e) => setNoteData(prev => ({ ...prev, physicalExamination: e.target.value }))}
                    placeholder="Physical examination findings..."
                    rows={4}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Assessment</label>
                  <Textarea
                    value={noteData.assessment}
                    onChange={(e) => setNoteData(prev => ({ ...prev, assessment: e.target.value }))}
                    placeholder="Clinical assessment and diagnosis..."
                    rows={4}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Plan</label>
                  <Textarea
                    value={noteData.plan}
                    onChange={(e) => setNoteData(prev => ({ ...prev, plan: e.target.value }))}
                    placeholder="Treatment plan and follow-up instructions..."
                    rows={4}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Additional Notes</label>
                  <Textarea
                    value={noteData.additionalNotes}
                    onChange={(e) => setNoteData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                    placeholder="Any additional observations or instructions..."
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveNote}>
                <Save className="h-4 w-4 mr-2" />
                Save Clinical Note
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedWriteNotesDialog;
