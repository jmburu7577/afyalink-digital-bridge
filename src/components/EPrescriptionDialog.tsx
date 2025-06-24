
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pill, Plus, X } from 'lucide-react';
import { useHealthRecords } from '@/hooks/useHealthRecords';
import { useToast } from '@/hooks/use-toast';

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface EPrescriptionDialogProps {
  patientId?: string;
  appointmentId?: string;
}

const EPrescriptionDialog: React.FC<EPrescriptionDialogProps> = ({ patientId, appointmentId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [medications, setMedications] = useState<Medication[]>([
    { name: '', dosage: '', frequency: '', duration: '', instructions: '' }
  ]);
  const [patientName, setPatientName] = useState('');
  const [diagnosis, setDiagnosis] = useState('');

  const { createRecord } = useHealthRecords();
  const { toast } = useToast();

  const addMedication = () => {
    setMedications([...medications, { name: '', dosage: '', frequency: '', duration: '', instructions: '' }]);
  };

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const updateMedication = (index: number, field: keyof Medication, value: string) => {
    const updated = medications.map((med, i) => 
      i === index ? { ...med, [field]: value } : med
    );
    setMedications(updated);
  };

  const handleSavePrescription = async () => {
    const validMedications = medications.filter(med => med.name && med.dosage);
    
    if (validMedications.length === 0) {
      toast({
        title: "No Medications",
        description: "Please add at least one medication.",
        variant: "destructive"
      });
      return;
    }

    const prescriptionContent = `
Diagnosis: ${diagnosis}

Medications:
${validMedications.map((med, index) => `
${index + 1}. ${med.name}
   Dosage: ${med.dosage}
   Frequency: ${med.frequency}
   Duration: ${med.duration}
   Instructions: ${med.instructions}
`).join('')}

Date: ${new Date().toLocaleDateString()}
    `;

    const { error } = await createRecord({
      patient_id: patientId,
      appointment_id: appointmentId,
      record_type: 'prescription',
      title: `Prescription - ${new Date().toLocaleDateString()}`,
      content: prescriptionContent.trim()
    });

    if (!error) {
      setIsOpen(false);
      setMedications([{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }]);
      setDiagnosis('');
      toast({
        title: "Prescription Created",
        description: "E-prescription has been saved successfully."
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-20 flex flex-col bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur">
          <Pill className="h-6 w-6 mb-2" />
          <span>E-Prescription</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create E-Prescription</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Diagnosis</label>
            <Input
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Enter diagnosis"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Medications</h3>
              <Button onClick={addMedication} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Medication
              </Button>
            </div>

            {medications.map((medication, index) => (
              <div key={index} className="border rounded-lg p-4 mb-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Medication {index + 1}</h4>
                  {medications.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMedication(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Medicine Name</label>
                    <Input
                      value={medication.name}
                      onChange={(e) => updateMedication(index, 'name', e.target.value)}
                      placeholder="e.g., Paracetamol"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Dosage</label>
                    <Input
                      value={medication.dosage}
                      onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                      placeholder="e.g., 500mg"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Frequency</label>
                    <Select
                      value={medication.frequency}
                      onValueChange={(value) => updateMedication(index, 'frequency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Once daily">Once daily</SelectItem>
                        <SelectItem value="Twice daily">Twice daily</SelectItem>
                        <SelectItem value="Three times daily">Three times daily</SelectItem>
                        <SelectItem value="Four times daily">Four times daily</SelectItem>
                        <SelectItem value="Every 4 hours">Every 4 hours</SelectItem>
                        <SelectItem value="Every 6 hours">Every 6 hours</SelectItem>
                        <SelectItem value="As needed">As needed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Duration</label>
                    <Input
                      value={medication.duration}
                      onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                      placeholder="e.g., 7 days"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Special Instructions</label>
                  <Textarea
                    value={medication.instructions}
                    onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
                    placeholder="e.g., Take after meals"
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePrescription}>
              <Pill className="h-4 w-4 mr-2" />
              Save Prescription
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EPrescriptionDialog;
