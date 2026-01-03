import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import PracticeAreas from "@/pages/PracticeAreas";
import KnowledgeCenter from "@/pages/KnowledgeCenter";
import Contact from "@/pages/Contact";
import BondQuestionnaire from "@/pages/BondQuestionnaire";
import SponsorResponsibilities from "@/pages/SponsorResponsibilities";
import Resources from "@/pages/Resources";
import ClientIntake from "@/pages/ClientIntake";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/practice-areas" component={PracticeAreas} />
        <Route path="/knowledge-center" component={KnowledgeCenter} />
        <Route path="/contact" component={Contact} />
        <Route path="/consultation" component={Contact} />
        <Route path="/bond-questionnaire" component={BondQuestionnaire} />
        <Route path="/sponsor-responsibilities" component={SponsorResponsibilities} />
        <Route path="/resources" component={Resources} />
        <Route path="/client-intake" component={ClientIntake} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Router />
        <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
