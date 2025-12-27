import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import StudyDashboard from "./pages/StudyDashboard";
import SiteDetail from "./pages/SiteDetail";
import PatientDetail from "./pages/PatientDetail";
import AlertsQueue from "./pages/AlertsQueue";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/study/:studyId" element={<StudyDashboard />} />
          <Route path="/study/:studyId/site/:siteId" element={<SiteDetail />} />
          <Route path="/study/:studyId/patient/:patientId" element={<PatientDetail />} />
          <Route path="/study/:studyId/alerts" element={<AlertsQueue />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
