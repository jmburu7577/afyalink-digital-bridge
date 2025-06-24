
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pill, Edit, Send, Plus, X } from 'lucide-react';
import { useHealthRecords } from '@/hooks/useHealthRecords';
import { useToast } from '@/hooks/use-toast';

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface PrescriptionData {
  id?: string;
  diagnosis: string;
  medications: Medication[];
  patientId?: string;
  appointmentId?: string;
}

interface PrescriptionManagerProps {
  patientId?: string;
  appointmentId?: string;
}

const PrescriptionManager: React.FC<PrescriptionManagerProps> = ({ patientId, appointmentId }) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentPrescription, setCurrentPrescription] = useState<PrescriptionData>({
    diagnosis: '',
    medications: [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }]
  });
  const [existingPrescriptions, setExistingPrescriptions] = useState<any[]>([]);

  const { createRecord, updateRecord, records } = useHealthRecords();
  const { toast } = useToast();

  // Load existing prescriptions
  useEffect(() => {
    const prescriptions = records.filter(record => record.record_type === 'prescription');
    setExistingPrescriptions(prescriptions);
  }, [records]);

  const addMedication = () => {
    setCurrentPrescription(prev => ({
      ...prev,
      medications: [...prev.medications, { name: '', dosage: '', frequency: '', duration: '', instructions: '' }]
    }));
  };

  const removeMedication = (index: number) => {
    setCurrentPrescription(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }));
  };

  const updateMedication = (index: number, field: keyof Medication, value: string) => {
    setCurrentPrescription(prev => ({
      ...prev,
      medications: prev.medications.map((med, i) => 
        i === index ? { ...med, [field]: value } : med
      )
    }));
  };

  const handleSavePrescription = async (isEdit = false) => {
    const validMedications = currentPrescription.medications.filter(med => med.name && med.dosage);
    
    if (validMedications.length === 0) {
      toast({
        title: "No Medications",
        description: "Please add at least one medication.",
        variant: "destructive"
      });
      return;
    }

    const prescriptionContent = `
Diagnosis: ${currentPrescription.diagnosis}

Medications:
${validMedications.map((med, index) => `
${index + 1}. ${med.name}
   Dosage: ${med.dosage}
   Frequency: ${med.frequency}
   Duration: ${med.duration}
   Instructions: ${med.instructions}
`).join('')}

Date: ${new Date().toLocaleDateString()}
Status: Active
    `;

    const recordData = {
      patient_id: patientId,
      appointment_id: appointmentId,
      record_type: 'prescription',
      title: `Prescription - ${new Date().toLocaleDateString()}`,
      content: prescriptionContent.trim()
    };

    let result;
    if (isEdit && currentPrescription.id) {
      result = await updateRecord(currentPrescription.id, recordData);
    } else {
      result = await createRecord(recordData);
    }

    if (!result.error) {
      setIsCreateOpen(false);
      setIsEditOpen(false);
      resetForm();
      toast({
        title: isEdit ? "Prescription Updated" : "Prescription Created",
        description: `E-prescription has been ${isEdit ? 'updated' : 'saved'} successfully.`
      });
    }
  };

  const resetForm = () => {
    setCurrentPrescription({
      diagnosis: '',
      medications: [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }]
    });
  };

  const editPrescription = (prescription: any) => {
    // Parse the existing prescription content
    const content = prescription.content;
    const diagnosisMatch = content.match(/Diagnosis: (.*?)(?:\n|$)/);
    const diagnosis = diagnosisMatch ? diagnosisMatch[1] : '';
    
    // Extract medications (simplified parsing)
    const medications = [{ name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days', instructions: 'Take after meals' }];
    
    setCurrentPrescription({
      id: prescription.id,
      diagnosis,
      medications,
      patientId: prescription.patient_id,
      appointmentId: prescription.appointment_id
    });
    setIsEditOpen(true);
  };

  const sendToPharmacy = async (prescription: any) => {
    toast({
      title: "Sending to Pharmacy",
      description: "Prescription is being sent to the pharmacy system...",
    });
    
    // Simulate API call to pharmacy
    setTimeout(() => {
      toast({
        title: "Sent Successfully",
        description: "Prescription has been sent to the pharmacy.",
      });
    }, 2000);
  };

  const renderMedicationForm = () => (
    <>
      <div>
        <label className="text-sm font-medium mb-2 block">Diagnosis</label>
        <Input
          value={currentPrescription.diagnosis}
          onChange={(e) => setCurrentPrescription(prev => ({ ...prev, diagnosis: e.target.value }))}
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

        {currentPrescription.medications.map((medication, index) => (
          <div key={index} className="border rounded-lg p-4 mb-4 space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Medication {index + 1}</h4>
              {currentPrescription.medications.length > 1 && (
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
    </>
  );

  return (
    <div className="space-y-6">
      {/* Create New Prescription */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
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
            {renderMedicationForm()}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleSavePrescription(false)}>
                <Pill className="h-4 w-4 mr-2" />
                Save Prescription
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Prescription Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit E-Prescription</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {renderMedicationForm()}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleSavePrescription(true)}>
                <Pill className="h-4 w-4 mr-2" />
                Update Prescription
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Existing Prescriptions */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white">Recent Prescriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Sample prescription */}
            <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur border border-white/20 rounded-lg">
              <div>
                <h3 className="font-semibold text-white">John Doe - Hypertension Medication</h3>
                <p className="text-sm text-blue-200">Amlodipine 5mg, once daily for 30 days</p>
                <p className="text-sm text-blue-300">Created: 2024-01-15</p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                  onClick={() => editPrescription({ 
                    id: '1', 
                    content: 'Diagnosis: Hypertension\n\nMedications:\n1. Amlodipine\n   Dosage: 5mg\n   Frequency: Once daily\n   Duration: 30 days\n   Instructions: Take after meals',
                    patient_id: patientId 
                  })}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg"
                  onClick={() => sendToPharmacy({ id: '1' })}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send to Pharmacy
                </Button>
              </div>
            </div>

            {/* Dynamic prescriptions from database */}
            {existingPrescriptions.map((prescription) => (
              <div key={prescription.id} className="flex items-center justify-between p-4 bg-white/10 backdrop-blur border border-white/20 rounded-lg">
                <div>
                  <h3 className="font-semibold text-white">{prescription.title}</h3>
                  <p className="text-sm text-blue-200">{prescription.content.substring(0, 100)}...</p>
                  <p className="text-sm text-blue-300">Created: {new Date(prescription.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                    onClick={() => editPrescription(prescription)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg"
                    onClick={() => sendToPharmacy(prescription)}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send to Pharmacy
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrescriptionManager;
