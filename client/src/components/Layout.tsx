import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Menu, X, Globe, MessageCircle, ChevronDown, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AccessibilityMenu from "./AccessibilityMenu";
import EmergencyBanner from "./EmergencyBanner";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user } = useAuth();

  const adminItems = [
    { label: "Bond Questionnaires", href: "/admin/dashboard" },
    { label: "Character Letters", href: "/admin/character-letters" },
    { label: "Sponsor Documents", href: "/admin/sponsor-documents" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.attorneys"), href: "/attorneys" },
    { label: t("nav.practice_areas"), href: "/practice-areas" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  const resourceItems = [
    { label: "FAQ", href: "/faq" },
    { label: "ICE Detention Process", href: "/detention-process" },
    { label: "Bond Document Checklist", href: "/bond-document-checklist" },
    { label: "Court Sponsor Guide", href: "/sponsor-guide" },
    { label: "Downloadable Guides", href: "/downloads" },
  ];

  const serviceItems = [
    { label: "Immigration Bonds", href: "/services/bond-hearings" },
    { label: "Removal Defense", href: "/services/removal-defense" },
    { label: "Asylum & Humanitarian", href: "/services/asylum" },
    { label: "Family Petitions", href: "/services/family-petitions" },
    { label: "Crimmigration", href: "/services/crimmigration" },
    { label: "Federal Litigation", href: "/services/federal-litigation" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground selection:bg-primary/20">
      {/* Emergency Banner */}
      <EmergencyBanner />
      
      {/* Top Bar - Contact Info */}
      <div className="bg-primary text-primary-foreground py-2 text-sm hidden md:block border-b border-secondary/30">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><Phone className="h-3 w-3" /> 1-844-423-3733</span>
            <span className="h-4 w-px bg-primary-foreground/30" />
            <a href="https://wa.me/16198671707" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <MessageCircle className="h-3 w-3" /> WhatsApp: (619) 867-1707
            </a>
            <span className="h-4 w-px bg-primary-foreground/30" />
            <Link href="/appointments" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <Calendar className="h-3 w-3" /> Request an Appointment
            </Link>
          </div>
          <Link href="/consultation">
            <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold text-xs px-4 py-1 h-7 rounded-sm">
              {t("nav.request_consultation")}
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Navigation */}
      <header 
        className={cn(
          "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
          isScrolled ? "shadow-sm py-2" : "py-4"
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group mr-12">
            <img 
              src="/images/logo.svg" 
              alt="Amaral Law" 
              className="h-16 w-auto object-contain transition-all duration-300" 
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 ml-auto">
            {navItems.filter(item => item.href !== '/practice-areas').map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary uppercase tracking-wide",
                  location === item.href ? "text-primary font-bold border-b-2 border-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(
                "text-sm font-medium transition-colors hover:text-primary uppercase tracking-wide flex items-center gap-1",
                location.startsWith('/services') || location.startsWith('/practice-areas')
                  ? "text-primary font-bold" 
                  : "text-muted-foreground"
              )}>
                {t("nav.practice_areas")}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/services" className="cursor-pointer w-full font-medium">
                    All Services
                  </Link>
                </DropdownMenuItem>
                {serviceItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="cursor-pointer w-full">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Resources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(
                "text-sm font-medium transition-colors hover:text-primary uppercase tracking-wide flex items-center gap-1",
                location.startsWith('/faq') || location.startsWith('/detention-process') || location.startsWith('/sponsor-guide') || location.startsWith('/downloads') || location.startsWith('/resources')
                  ? "text-primary font-bold" 
                  : "text-muted-foreground"
              )}>
                Resources
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/resources" className="cursor-pointer w-full">
                    All Resources
                  </Link>
                </DropdownMenuItem>
                {resourceItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="cursor-pointer w-full">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Admin Dropdown - Only show when logged in */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger className={cn(
                  "text-sm font-medium transition-colors hover:text-primary uppercase tracking-wide flex items-center gap-1",
                  location.startsWith('/admin')
                    ? "text-primary font-bold" 
                    : "text-muted-foreground"
                )}>
                  Admin
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {adminItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href} className="cursor-pointer w-full">
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setLanguage('en')}
                className={`p-1 ${language === 'en' ? 'ring-2 ring-primary ring-offset-1' : 'opacity-60 hover:opacity-100'}`}
                title="English"
              >
                <img 
                  src="/images/flag-us.png" 
                  alt="English"
                  className="h-5 w-7 object-cover rounded border border-border/50 shadow-sm"
                />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setLanguage('es')}
                className={`p-1 ${language === 'es' ? 'ring-2 ring-primary ring-offset-1' : 'opacity-60 hover:opacity-100'}`}
                title="Español"
              >
                <img 
                  src="/images/flag-es.png" 
                  alt="Español"
                  className="h-5 w-7 object-cover rounded border border-border/50 shadow-sm"
                />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setLanguage('pt')}
                className={`p-1 ${language === 'pt' ? 'ring-2 ring-primary ring-offset-1' : 'opacity-60 hover:opacity-100'}`}
                title="Português"
              >
                <img 
                  src="/images/flag-br.png" 
                  alt="Português"
                  className="h-5 w-7 object-cover rounded border border-border/50 shadow-sm"
                />
              </Button>
            </div>

          </nav>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-primary/20">
              <div className="flex flex-col gap-8 mt-8">
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src="/images/logo.svg" 
                    alt="Amaral Law" 
                    className="h-10 w-auto object-contain filter invert brightness-0" 
                  />
                </div>
                <nav className="flex flex-col gap-4">
                  {navItems.filter(item => item.href !== '/practice-areas').map((item) => (
                    <Link 
                      key={item.href} 
                      href={item.href}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary border-b border-border/50 pb-2",
                        location === item.href ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                  {/* Services Section for Mobile */}
                  <div className="border-b border-border/50 pb-2">
                    <span className="text-lg font-medium text-muted-foreground">{t("nav.practice_areas")}</span>
                    <div className="ml-4 mt-2 flex flex-col gap-2">
                      <Link href="/services" className="text-sm text-muted-foreground hover:text-primary font-medium">All Services</Link>
                      {serviceItems.map((item) => (
                        <Link key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-primary">
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  {/* Resources Section for Mobile */}
                  <div className="border-b border-border/50 pb-2">
                    <span className="text-lg font-medium text-muted-foreground">Resources</span>
                    <div className="ml-4 mt-2 flex flex-col gap-2">
                      <Link href="/resources" className="text-sm text-muted-foreground hover:text-primary">All Resources</Link>
                      {resourceItems.map((item) => (
                        <Link key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-primary">
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  {/* Admin Section - Mobile */}
                  {user && (
                    <div className="py-2">
                      <span className="text-lg font-medium text-muted-foreground">Admin</span>
                      <div className="ml-4 mt-2 flex flex-col gap-2">
                        {adminItems.map((item) => (
                          <Link key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-primary">
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-center gap-3 py-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setLanguage('en')}
                      className={`p-2 ${language === 'en' ? 'ring-2 ring-primary' : 'opacity-60'}`}
                    >
                      <img 
                        src="/images/flag-us.png" 
                        alt="English"
                        className="h-6 w-8 object-cover rounded"
                      />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setLanguage('es')}
                      className={`p-2 ${language === 'es' ? 'ring-2 ring-primary' : 'opacity-60'}`}
                    >
                      <img 
                        src="/images/flag-es.png" 
                        alt="Español"
                        className="h-6 w-8 object-cover rounded"
                      />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setLanguage('pt')}
                      className={`p-2 ${language === 'pt' ? 'ring-2 ring-primary' : 'opacity-60'}`}
                    >
                      <img 
                        src="/images/flag-br.png" 
                        alt="Português"
                        className="h-6 w-8 object-cover rounded"
                      />
                    </Button>
                  </div>
                  <Link href="/consultation">
                    <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-sm">
                      {t("nav.request_consultation")}
                    </Button>
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      <AccessibilityMenu />
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground border-t-4 border-secondary">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img 
                  src="/images/logo.svg" 
                  alt="Amaral Law" 
                  className="h-8 w-auto object-contain" 
                />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("footer.tagline")}
              </p>
            </div>
            
            <div>
              <h3 className="font-serif text-lg font-semibold mb-4 text-secondary">{t("footer.practice_areas")}</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li><a href="#" className="hover:text-secondary transition-colors">{t("practice.removal_defense")}</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">{t("practice.asylum")}</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">{t("practice.family")}</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">{t("practice.bond")}</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold mb-4 text-secondary">{t("footer.contact")}</h3>
              <ul className="space-y-3 text-sm text-primary-foreground/70">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>6750 N. Andrews Avenue Ste 208<br />Fort Lauderdale, FL 33309</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>1-844-423-3733</span>
                </li>
                <li>
                  <a href="https://wa.me/16198671707" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary transition-colors">
                    <MessageCircle className="h-4 w-4 shrink-0" />
                    <span>WhatsApp: (619) 867-1707</span>
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span>ap@amarallegal.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold mb-4 text-secondary">{t("footer.newsletter")}</h3>
              <p className="text-sm text-primary-foreground/70 mb-4">{t("footer.subscribe_text")}</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder={t("footer.email_placeholder")}
                  className="bg-background/5 border border-border/10 rounded-sm px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary/50 text-primary-foreground placeholder:text-muted-foreground/50"
                />
                <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-sm font-bold">
                  {t("footer.join")}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50">
            <p>&copy; {new Date().getFullYear()} {t("footer.rights")}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary-foreground transition-colors">{t("footer.privacy")}</a>
              <a href="#" className="hover:text-primary-foreground transition-colors">{t("footer.terms")}</a>
              <a href="#" className="hover:text-primary-foreground transition-colors">{t("footer.disclaimer")}</a>
              <a href="#" className="hover:text-primary-foreground transition-colors">{t("footer.accessibility")}</a>
              <Link href="/admin/dashboard" className="hover:text-primary-foreground transition-colors">
                {t("footer.admin")}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
