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
import RemovalDefense from "@/pages/services/RemovalDefense";
import Asylum from "@/pages/services/Asylum";
import FamilyPetitions from "@/pages/services/FamilyPetitions";
import BondHearings from "@/pages/services/BondHearings";
import Crimmigration from "@/pages/services/Crimmigration";
import FederalLitigation from "@/pages/services/FederalLitigation";
import FAQ from "@/pages/FAQ";
import DetentionProcess from "@/pages/DetentionProcess";
import Resources from "@/pages/Resources";
import SponsorGuide from "@/pages/SponsorGuide";
import Downloads from "@/pages/Downloads";
import FamilyEmergencyPlan from "@/pages/FamilyEmergencyPlan";
import SharedPlanViewer from "@/pages/SharedPlanViewer";
import Appointments from "@/pages/Appointments";
import Services from "@/pages/Services";
import CharacterReferenceLetter from "@/pages/CharacterReferenceLetter";
import AdminCharacterLetters from "@/pages/AdminCharacterLetters";
import BondDocumentChecklist from "@/pages/BondDocumentChecklist";
import SponsorLetterGenerator from "@/pages/SponsorLetterGenerator";
import SponsorDocumentUpload from "@/pages/SponsorDocumentUpload";
import AdminSponsorDocuments from "@/pages/AdminSponsorDocuments";
import SharedDocumentsViewer from "@/pages/SharedDocumentsViewer";
import DetentionGuide from "@/pages/DetentionGuide";
import IceDetentionProcess from "@/pages/IceDetentionProcess";
import KnowYourRights from "@/pages/KnowYourRights";
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
          <Route path="/services/removal-defense" component={RemovalDefense} />
          <Route path="/services/asylum" component={Asylum} />
          <Route path="/services/family-petitions" component={FamilyPetitions} />
          <Route path="/services/bond-hearings" component={BondHearings} />
          <Route path="/services/crimmigration" component={Crimmigration} />
          <Route path="/services/federal-litigation" component={FederalLitigation} />
          <Route path="/faq" component={FAQ} />
          <Route path="/detention-process" component={DetentionProcess} />
          <Route path="/detention-guide" component={DetentionGuide} />
          <Route path="/ice-detention-process" component={IceDetentionProcess} />
          <Route path="/know-your-rights" component={KnowYourRights} />
          <Route path="/resources" component={Resources} />
          <Route path="/sponsor-guide" component={SponsorGuide} />
          <Route path="/downloads" component={Downloads} />
          <Route path="/family-emergency-plan" component={FamilyEmergencyPlan} />
          <Route path="/shared/plan/:token" component={SharedPlanViewer} />
          <Route path="/appointments" component={Appointments} />
          <Route path="/services" component={Services} />
          <Route path="/practice-areas" component={Services} />
          <Route path="/character-letter/:token" component={CharacterReferenceLetter} />
          <Route path="/admin/character-letters" component={AdminCharacterLetters} />
          <Route path="/bond-document-checklist" component={BondDocumentChecklist} />
          <Route path="/sponsor-letter-generator" component={SponsorLetterGenerator} />
          <Route path="/sponsor-documents" component={SponsorDocumentUpload} />
          <Route path="/sponsor-documents/:token" component={SponsorDocumentUpload} />
          <Route path="/admin/sponsor-documents" component={AdminSponsorDocuments} />
          <Route path="/shared-documents/:token" component={SharedDocumentsViewer} />
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
