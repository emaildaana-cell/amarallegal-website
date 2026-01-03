import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LiveChat from "./components/LiveChat";
import { ThemeProvider } from "./contexts/ThemeContext";
import About from "./pages/About";
import BondQuestionnaire from "./pages/BondQuestionnaire";
import ClientPortal from "./pages/ClientPortal";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import Services from "./pages/Services";
import ImmigrationBonds from "./pages/services/ImmigrationBonds";
import Citizenship from "./pages/services/Citizenship";
import ICEDetention from "./pages/services/ICEDetention";
import CourtRelief from "./pages/services/CourtRelief";
import RemovalDefense from "./pages/services/RemovalDefense";
import DACA from "./pages/services/DACA";
import Asylum from "./pages/services/Asylum";

function Router() {
  return (
    <>
      <Header />
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/about"} component={About} />
        <Route path={"/services"} component={Services} />
        <Route path={"/services/immigration-bonds"} component={ImmigrationBonds} />
        <Route path={"/services/citizenship"} component={Citizenship} />
        <Route path={"/services/ice-detention"} component={ICEDetention} />
        <Route path={"/services/court-relief"} component={CourtRelief} />
        <Route path={"/services/removal-defense"} component={RemovalDefense} />
        <Route path={"/services/daca"} component={DACA} />
        <Route path={"/services/asylum"} component={Asylum} />
        <Route path={"/resources"} component={Resources} />
        <Route path={"/contact"} component={Contact} />
        <Route path={"/faq"} component={FAQ} />
        <Route path={"/bond-questionnaire"} component={BondQuestionnaire} />
        <Route path={"/client-portal"} component={ClientPortal} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <LiveChat />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
