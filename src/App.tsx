
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import VideoConsult from "./pages/VideoConsult";
import VoiceCall from "./pages/VoiceCall";
import Schedule from "./pages/Schedule";
import Records from "./pages/Records";
import Pharmacy from "./pages/Pharmacy";
import HealthCheck from "./pages/HealthCheck";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/video-consult" element={<VideoConsult />} />
          <Route path="/voice-call" element={<VoiceCall />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/records" element={<Records />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/health-check" element={<HealthCheck />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
