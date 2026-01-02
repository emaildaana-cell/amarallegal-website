import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Scale, Menu, X, Phone, Mail, MapPin, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AccessibilityMenu from "./AccessibilityMenu";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

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
    { label: t("nav.knowledge_center"), href: "/knowledge-center" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground selection:bg-primary/20">
      {/* Top Bar - Contact Info */}
      <div className="bg-primary text-primary-foreground py-2 text-sm hidden md:block border-b border-secondary/30">
        <div className="container flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><Phone className="h-3 w-3" /> 1-844-ICE-FREE</span>
            <span className="flex items-center gap-2"><Mail className="h-3 w-3" /> ap@amarallegal.com</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3" /> 6750 N. Andrews Avenue Ste 208, Fort Lauderdale, FL 33309
          </div>
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
          <Link href="/">
            <a className="flex items-center gap-3 group">
              <img 
                src="/images/logo.svg" 
                alt="Amaral Law" 
                className="h-12 w-auto object-contain transition-all duration-300" 
              />
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a className={cn(
                  "text-sm font-medium transition-colors hover:text-primary uppercase tracking-wide",
                  location === item.href ? "text-primary font-bold border-b-2 border-primary" : "text-muted-foreground"
                )}>
                  {item.label}
                </a>
              </Link>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                if (language === 'en') setLanguage('es');
                else if (language === 'es') setLanguage('pt');
                else setLanguage('en');
              }}
              className="flex items-center gap-2 font-medium"
            >
              <Globe className="h-4 w-4" />
              {language === 'en' ? 'ES' : language === 'es' ? 'PT' : 'EN'}
            </Button>
            <Link href="/consultation">
              <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif tracking-wide rounded-sm">
                {t("nav.request_consultation")}
              </Button>
            </Link>
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
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <a className={cn(
                        "text-lg font-medium transition-colors hover:text-primary border-b border-border/50 pb-2",
                        location === item.href ? "text-primary" : "text-muted-foreground"
                      )}>
                        {item.label}
                      </a>
                    </Link>
                  ))}
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      if (language === 'en') setLanguage('es');
                      else if (language === 'es') setLanguage('pt');
                      else setLanguage('en');
                    }}
                  >
                    <Globe className="h-4 w-4" />
                    {language === 'en' ? 'Español' : language === 'es' ? 'Português' : 'English'}
                  </Button>
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
                  <span>1-844-ICE-FREE</span>
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
              <Link href="/admin">
                <a className="hover:text-primary-foreground transition-colors">{t("footer.admin")}</a>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
