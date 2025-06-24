
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, X, Play } from 'lucide-react';

interface OnboardingStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
}

interface OnboardingTutorialProps {
  userRole: 'patient' | 'doctor' | 'admin';
}

const OnboardingTutorial: React.FC<OnboardingTutorialProps> = ({ userRole }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if user has seen onboarding
    const hasSeenOnboarding = localStorage.getItem(`onboarding_${userRole}`);
    if (!hasSeenOnboarding) {
      setIsOpen(true);
    }
  }, [userRole]);

  const patientSteps: OnboardingStep[] = [
    {
      title: "Welcome to AfyaLink!",
      description: "Your digital healthcare companion for accessible medical consultations in Kenya.",
      icon: <Play className="h-8 w-8 text-blue-600" />
    },
    {
      title: "Book Appointments",
      description: "Schedule video, audio, or chat consultations with verified doctors across Kenya.",
      icon: <Calendar className="h-8 w-8 text-green-600" />
    },
    {
      title: "Start Video Consultations",
      description: "Connect instantly with available doctors for immediate medical attention.",
      icon: <Video className="h-8 w-8 text-purple-600" />
    },
    {
      title: "Access Your Health Records",
      description: "View prescriptions, lab results, and clinical notes in one secure place.",
      icon: <FileText className="h-8 w-8 text-orange-600" />
    },
    {
      title: "Pay with M-Pesa",
      description: "Convenient payment options including M-Pesa for consultation fees.",
      icon: <CreditCard className="h-8 w-8 text-red-600" />
    }
  ];

  const doctorSteps: OnboardingStep[] = [
    {
      title: "Welcome to AfyaLink Doctor Portal!",
      description: "Provide quality healthcare to patients across Kenya through our digital platform.",
      icon: <Play className="h-8 w-8 text-blue-600" />
    },
    {
      title: "Manage Appointments",
      description: "View scheduled consultations and start video calls with patients.",
      icon: <Calendar className="h-8 w-8 text-green-600" />
    },
    {
      title: "Write Clinical Notes",
      description: "Document patient visits with structured clinical notes and templates.",
      icon: <FileText className="h-8 w-8 text-purple-600" />
    },
    {
      title: "Create E-Prescriptions",
      description: "Issue digital prescriptions that can be sent directly to pharmacies.",
      icon: <Pill className="h-8 w-8 text-orange-600" />
    },
    {
      title: "Patient Communication",
      description: "Stay connected with patients through secure messaging and follow-ups.",
      icon: <MessageCircle className="h-8 w-8 text-red-600" />
    }
  ];

  const steps = userRole === 'patient' ? patientSteps : doctorSteps;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = () => {
    localStorage.setItem(`onboarding_${userRole}`, 'completed');
    setIsOpen(false);
  };

  const skipOnboarding = () => {
    localStorage.setItem(`onboarding_${userRole}`, 'skipped');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Getting Started</DialogTitle>
            <Button variant="ghost" size="sm" onClick={skipOnboarding}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="mb-4">
                {steps[currentStep].icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{steps[currentStep].title}</h3>
              <p className="text-gray-600 leading-relaxed">{steps[currentStep].description}</p>
            </CardContent>
          </Card>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex space-x-2">
              <Button variant="ghost" onClick={skipOnboarding}>
                Skip Tour
              </Button>
              <Button onClick={handleNext}>
                {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
                {currentStep < steps.length - 1 && <ChevronRight className="h-4 w-4 ml-2" />}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingTutorial;
