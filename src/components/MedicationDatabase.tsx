
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Plus } from 'lucide-react';

interface Medication {
  name: string;
  commonDosages: string[];
  commonFrequencies: string[];
  commonDurations: string[];
  commonInstructions: string[];
  category: string;
}

interface MedicationDatabaseProps {
  onSelectMedication: (medication: Partial<Medication>) => void;
}

const MedicationDatabase: React.FC<MedicationDatabaseProps> = ({ onSelectMedication }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMedications, setFilteredMedications] = useState<Medication[]>([]);

  const medications: Medication[] = [
    {
      name: 'Paracetamol',
      commonDosages: ['500mg', '1000mg', '650mg'],
      commonFrequencies: ['Three times daily', 'Four times daily', 'As needed'],
      commonDurations: ['3 days', '5 days', '7 days'],
      commonInstructions: ['Take after meals', 'Take with plenty of water', 'Do not exceed 4g daily'],
      category: 'Analgesic'
    },
    {
      name: 'Amlodipine',
      commonDosages: ['2.5mg', '5mg', '10mg'],
      commonFrequencies: ['Once daily'],
      commonDurations: ['30 days', '60 days', '90 days'],
      commonInstructions: ['Take in the morning', 'Take with or without food', 'Do not stop suddenly'],
      category: 'Antihypertensive'
    },
    {
      name: 'Metformin',
      commonDosages: ['500mg', '850mg', '1000mg'],
      commonFrequencies: ['Twice daily', 'Three times daily'],
      commonDurations: ['30 days', '60 days', '90 days'],
      commonInstructions: ['Take with meals', 'Start with low dose', 'Monitor blood glucose'],
      category: 'Antidiabetic'
    },
    {
      name: 'Amoxicillin',
      commonDosages: ['250mg', '500mg', '875mg'],
      commonFrequencies: ['Three times daily', 'Twice daily'],
      commonDurations: ['5 days', '7 days', '10 days'],
      commonInstructions: ['Take with food', 'Complete full course', 'Take at evenly spaced intervals'],
      category: 'Antibiotic'
    },
    {
      name: 'Artemether-Lumefantrine',
      commonDosages: ['20mg/120mg', '40mg/240mg'],
      commonFrequencies: ['Twice daily'],
      commonDurations: ['3 days'],
      commonInstructions: ['Take with fatty food or milk', 'Take at 0, 8, 24, 36, 48, 60 hours', 'Complete full course'],
      category: 'Antimalarial'
    },
    {
      name: 'Salbutamol',
      commonDosages: ['100mcg per puff', '2mg', '4mg'],
      commonFrequencies: ['As needed', 'Four times daily'],
      commonDurations: ['As needed', '30 days'],
      commonInstructions: ['Rinse mouth after use', 'Shake inhaler before use', 'Use spacer if available'],
      category: 'Bronchodilator'
    },
    {
      name: 'Omeprazole',
      commonDosages: ['20mg', '40mg'],
      commonFrequencies: ['Once daily', 'Twice daily'],
      commonDurations: ['14 days', '30 days', '60 days'],
      commonInstructions: ['Take before breakfast', 'Take on empty stomach', 'Swallow whole, do not crush'],
      category: 'Proton Pump Inhibitor'
    },
    {
      name: 'Atorvastatin',
      commonDosages: ['10mg', '20mg', '40mg', '80mg'],
      commonFrequencies: ['Once daily'],
      commonDurations: ['30 days', '60 days', '90 days'],
      commonInstructions: ['Take in the evening', 'Monitor liver function', 'Avoid grapefruit juice'],
      category: 'Statin'
    }
  ];

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = medications.filter(med =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMedications(filtered);
    } else {
      setFilteredMedications([]);
    }
  }, [searchTerm]);

  const handleSelectMedication = (medication: Medication) => {
    onSelectMedication({
      name: medication.name,
      commonDosages: medication.commonDosages,
      commonFrequencies: medication.commonFrequencies,
      commonDurations: medication.commonDurations,
      commonInstructions: medication.commonInstructions
    });
    setSearchTerm('');
    setFilteredMedications([]);
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search medications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {filteredMedications.length > 0 && (
        <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto">
          <CardContent className="p-2">
            {filteredMedications.map((medication, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                onClick={() => handleSelectMedication(medication)}
              >
                <div>
                  <p className="font-medium text-sm">{medication.name}</p>
                  <p className="text-xs text-gray-500">{medication.category}</p>
                </div>
                <Button size="sm" variant="ghost">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MedicationDatabase;
