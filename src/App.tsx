
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navigation from "@/components/Navigation";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import VideoConsult from "./pages/VideoConsult";
import VoiceCall from "./pages/VoiceCall";
import Schedule from "./pages/Schedule";
import Records from "./pages/Records";
import Pharmacy from "./pages/Pharmacy";
import HealthCheck from "./pages/HealthCheck";
import AdminDashboard from "./pages/AdminDashboard";
import PatientPortal from "./pages/PatientPortal";
import DoctorPortal from "./pages/DoctorPortal";
import DoctorRegistrationPage from "./pages/DoctorRegistrationPage";
import ConsultationRoom from "./pages/ConsultationRoom";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/video-consult" element={
                <ProtectedRoute>
                  <VideoConsult />
                </ProtectedRoute>
              } />
              <Route path="/voice-call" element={
                <ProtectedRoute>
                  <VoiceCall />
                </ProtectedRoute>
              } />
              <Route path="/schedule" element={
                <ProtectedRoute>
                  <Schedule />
                </ProtectedRoute>
              } />
              <Route path="/records" element={
                <ProtectedRoute>
                  <Records />
                </ProtectedRoute>
              } />
              <Route path="/pharmacy" element={
                <ProtectedRoute>
                  <Pharmacy />
                </ProtectedRoute>
              } />
              <Route path="/health-check" element={
                <ProtectedRoute>
                  <HealthCheck />
                </ProtectedRoute>
              } />
              <Route path="/admin-dashboard" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/patient-portal" element={
                <ProtectedRoute>
                  <PatientPortal />
                </ProtectedRoute>
              } />
              <Route path="/doctor-portal" element={
                <ProtectedRoute>
                  <DoctorPortal />
                </ProtectedRoute>
              } />
              <Route path="/doctor-registration" element={
                <ProtectedRoute>
                  <DoctorRegistrationPage />
                </ProtectedRoute>
              } />
              <Route path="/consultation/:appointmentId" element={
                <ProtectedRoute>
                  <ConsultationRoom />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
