import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Theme from "./pages/Theme";
import Donate from "./pages/Donate";
import DonationSuccess from "./pages/DonationSuccess";
import Gallery from "./pages/Gallery";
import Volunteer from "./pages/Volunteer";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Events from "./pages/Events";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/theme" element={<Theme />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/donation-success" element={<DonationSuccess />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/events" element={<Events />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
