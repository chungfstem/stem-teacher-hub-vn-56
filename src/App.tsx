
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import PolicyDocuments from "./pages/PolicyDocuments";
import LessonsProjects from "./pages/LessonsProjects";
import NewsEvents from "./pages/NewsEvents";
import ResourceLibrary from "./pages/ResourceLibrary";
import AdvancedSearch from "./pages/AdvancedSearch";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/documents" element={<PolicyDocuments />} />
            <Route path="/lessons" element={<LessonsProjects />} />
            <Route path="/news" element={<NewsEvents />} />
            <Route path="/library" element={<ResourceLibrary />} />
            <Route path="/community" element={<ResourceLibrary />} />
            <Route path="/search" element={<AdvancedSearch />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
