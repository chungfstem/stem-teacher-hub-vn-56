
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
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
            <Route path="/auth" element={<Auth />} />
            <Route path="/documents" element={
              <ProtectedRoute>
                <PolicyDocuments />
              </ProtectedRoute>
            } />
            <Route path="/lessons" element={<LessonsProjects />} />
            <Route path="/news" element={<NewsEvents />} />
            <Route path="/library" element={
              <ProtectedRoute>
                <ResourceLibrary />
              </ProtectedRoute>
            } />
            <Route path="/community" element={<ResourceLibrary />} />
            <Route path="/search" element={<AdvancedSearch />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
