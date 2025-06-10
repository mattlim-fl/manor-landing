
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Downstairs from "./pages/Downstairs";
import Upstairs from "./pages/Upstairs";
import FullVenue from "./pages/FullVenue";
import Karaoke from "./pages/Karaoke";
import PriorityEntry from "./pages/PriorityEntry";
import BirthdaysOccasions from "./pages/BirthdaysOccasions";
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
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/downstairs" element={<Downstairs />} />
          <Route path="/upstairs" element={<Upstairs />} />
          <Route path="/full-venue" element={<FullVenue />} />
          <Route path="/karaoke" element={<Karaoke />} />
          <Route path="/priority-entry" element={<PriorityEntry />} />
          <Route path="/birthdays-occasions" element={<BirthdaysOccasions />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
