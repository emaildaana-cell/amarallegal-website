import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import NotFound from "@/pages/NotFound";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Attorneys from "@/pages/Attorneys";
import AttorneyProfile from "@/pages/AttorneyProfile";
import KnowledgeCenter from "@/pages/KnowledgeCenter";
import Contact from "@/pages/Contact"; // Assuming Contact.tsx exists or will be created, otherwise use placeholder
import Consultation from "@/pages/Consultation";
import BondQuestionnaire from "@/pages/BondQuestionnaire";
import Detention from "@/pages/Detention";
import AdminDashboard from "@/pages/AdminDashboard";
import { LanguageProvider } from "@/contexts/LanguageContext";

const queryClient = new QueryClient();
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <LanguageProvider>
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/attorneys" component={Attorneys} />
          <Route path="/attorneys/:id" component={AttorneyProfile} />
          <Route path="/knowledge-center" component={KnowledgeCenter} />
          <Route path="/contact" component={Contact} />
          <Route path="/consultation" component={Consultation} />
          <Route path="/bond-questionnaire" component={BondQuestionnaire} />
          <Route path="/detention" component={Detention} />
          <Route path="/admin/dashboard" component={AdminDashboard} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </LanguageProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
      <Router />
      <Toaster />
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
