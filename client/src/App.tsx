import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Attorneys from "./pages/Attorneys";
import AttorneyProfile from "./pages/AttorneyProfile";
import KnowledgeCenter from "./pages/KnowledgeCenter";
import Consultation from "./pages/Consultation";

function Router() {
  return (
    <LanguageProvider>
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/attorneys" component={Attorneys} />
          <Route path="/attorneys/:id" component={AttorneyProfile} />
          <Route path="/practice-areas" component={() => <div>Practice Areas Page (Coming Soon)</div>} />
          <Route path="/knowledge-center" component={KnowledgeCenter} />
          <Route path="/contact" component={() => <div>Contact Page (Coming Soon)</div>} />
          <Route path="/consultation" component={Consultation} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </LanguageProvider>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
