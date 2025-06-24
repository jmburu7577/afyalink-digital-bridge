
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Plus } from 'lucide-react';

interface ClinicalTemplate {
  id: string;
  name: string;
  category: string;
  template: {
    chiefComplaint: string;
    historyOfPresentIllness: string;
    physicalExamination: string;
    assessment: string;
    plan: string;
  };
}

interface ClinicalNoteTemplatesProps {
  onSelectTemplate: (template: ClinicalTemplate['template']) => void;
}

const ClinicalNoteTemplates: React.FC<ClinicalNoteTemplatesProps> = ({ onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const templates: ClinicalTemplate[] = [
    {
      id: '1',
      name: 'Chronic Lower Back Pain',
      category: 'Musculoskeletal',
      template: {
        chiefComplaint: 'Chronic lower back pain for [duration]',
        historyOfPresentIllness: 'Patient reports persistent lower back pain with [character/quality] that [radiates/localizes]. Pain is [better/worse] with [activities]. Associated symptoms include [list symptoms]. No recent trauma or fever.',
        physicalExamination: 'Vital signs stable. Lumbar spine examination reveals [tenderness/range of motion]. Neurological examination shows [findings]. Straight leg raise test [positive/negative].',
        assessment: 'Chronic mechanical lower back pain, likely musculoskeletal in origin. No red flag symptoms present.',
        plan: '1. Pain management with [medication]\n2. Physical therapy referral\n3. Activity modification counseling\n4. Follow-up in 2-4 weeks\n5. Return if symptoms worsen or new neurological symptoms develop'
      }
    },
    {
      id: '2',
      name: 'Hypertension Follow-up',
      category: 'Cardiovascular',
      template: {
        chiefComplaint: 'Hypertension follow-up visit',
        historyOfPresentIllness: 'Patient with known hypertension on [current medications]. Reports [compliance/side effects]. Blood pressure readings at home [values]. No chest pain, shortness of breath, or edema.',
        physicalExamination: 'BP: [value] mmHg. Heart rate [value] bpm. Cardiovascular examination reveals [findings]. No peripheral edema. Fundoscopic examination [normal/abnormal].',
        assessment: 'Hypertension, [controlled/uncontrolled] on current regimen.',
        plan: '1. Continue/adjust [medication] to [dose]\n2. Lifestyle modifications: low sodium diet, regular exercise\n3. Home BP monitoring\n4. Lab work: Basic metabolic panel, lipid profile\n5. Follow-up in [timeframe]'
      }
    },
    {
      id: '3',
      name: 'Upper Respiratory Infection',
      category: 'Respiratory',
      template: {
        chiefComplaint: 'Upper respiratory symptoms for [duration]',
        historyOfPresentIllness: 'Patient presents with [cough/congestion/sore throat] for [duration]. Associated symptoms include [fever/headache/fatigue]. No shortness of breath or chest pain. [Recent sick contacts/travel history].',
        physicalExamination: 'Temperature [value]°C. HEENT: [throat/nasal/ear findings]. Lungs clear to auscultation bilaterally. No lymphadenopathy.',
        assessment: 'Viral upper respiratory infection (common cold).',
        plan: '1. Supportive care: rest, fluids, humidification\n2. Symptomatic treatment: [medications as needed]\n3. Return if symptoms worsen or persist >10 days\n4. Fever >38.5°C or difficulty breathing warrants immediate return'
      }
    },
    {
      id: '4',
      name: 'Diabetes Follow-up',
      category: 'Endocrine',
      template: {
        chiefComplaint: 'Diabetes mellitus follow-up',
        historyOfPresentIllness: 'Patient with Type [1/2] diabetes on [current regimen]. Reports blood glucose readings [range]. [Compliance with medications/diet]. No polyuria, polydipsia, or weight loss. No symptoms of hypoglycemia.',
        physicalExamination: 'Weight [value] kg. BMI [value]. Diabetic foot exam: [findings]. No retinopathy on fundoscopic exam. Blood pressure [value] mmHg.',
        assessment: 'Type [1/2] diabetes mellitus, [controlled/uncontrolled]. HbA1c [value]%.',
        plan: '1. Continue/adjust [medication] regimen\n2. Dietary counseling with nutritionist\n3. Home glucose monitoring\n4. HbA1c in 3 months\n5. Annual eye and foot exams\n6. Follow-up in [timeframe]'
      }
    },
    {
      id: '5',
      name: 'Malaria Treatment',
      category: 'Infectious Disease',
      template: {
        chiefComplaint: 'Fever and flu-like symptoms for [duration]',
        historyOfPresentIllness: 'Patient presents with fever, chills, headache, and body aches for [duration]. [Recent travel history/mosquito exposure]. Associated symptoms include [nausea/vomiting/fatigue]. No urinary symptoms or respiratory complaints.',
        physicalExamination: 'Temperature [value]°C. Appears [well/ill]. No jaundice or hepatosplenomegaly. Lungs clear. No neck stiffness.',
        assessment: 'Malaria - [P. falciparum/P. vivax] confirmed by [rapid test/microscopy].',
        plan: '1. Antimalarial treatment: [Artemether-lumefantrine/other] as per protocol\n2. Symptomatic care: paracetamol for fever\n3. Adequate fluid intake\n4. Follow-up in 48-72 hours\n5. Return immediately if symptoms worsen\n6. Malaria prevention counseling'
      }
    }
  ];

  const categories = Array.from(new Set(templates.map(t => t.category)));
  const filteredTemplates = selectedCategory 
    ? templates.filter(t => t.category === selectedCategory)
    : templates;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Clinical Note Templates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTemplates.map(template => (
            <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-sm">{template.name}</h4>
                    <p className="text-xs text-gray-500">{template.category}</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onSelectTemplate(template.template)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Use
                  </Button>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {template.template.chiefComplaint}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClinicalNoteTemplates;
