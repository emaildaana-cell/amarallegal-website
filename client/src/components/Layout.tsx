import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Menu, X, Globe, MessageCircle, Facebook, Instagram, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Language } from "@/lib/translations";

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
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.services"), href: "/practice-areas" },
    { label: t("nav.resources"), href: "/resources" },
    { label: t("nav.sponsor_responsibilities"), href: "/sponsor-responsibilities" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  const toggleLanguage = () => {
    const langs: Language[] = ['en', 'es', 'pt'];
    const currentIndex = langs.indexOf(language);
    const nextIndex = (currentIndex + 1) % langs.length;
    setLanguage(langs[nextIndex]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground selection:bg-primary/20">
      {/* Top Bar - Contact Info */}
      <div className="bg-primary text-primary-foreground py-2 text-sm hidden md:block border-b border-secondary/30">
        <div className="container flex justify-between items-center">
          <div className="flex gap-6">
            <a href="tel:1-844-262-5442" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <Phone className="h-3 w-3" /> 1-844-ICE-FREE
            </a>
            <a href="https://wa.me/16198671707" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <MessageCircle className="h-3 w-3" /> WhatsApp: (619) 867-1707
            </a>
            <a href="mailto:ap@amarallegal.com" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <Mail className="h-3 w-3" /> ap@amarallegal.com
            </a>
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
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-12 w-32 bg-primary flex items-center justify-center text-primary-foreground font-serif font-bold text-xl border-2 border-secondary">
              <span className="text-2xl">AL</span>
              <span className="ml-1 text-xs tracking-widest uppercase border-l border-secondary pl-1">Amaral<br/>Law</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary uppercase tracking-wide cursor-pointer",
                  location === item.href ? "text-primary font-bold border-b-2 border-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleLanguage}
              className="flex items-center gap-2 font-medium"
            >
              <Globe className="h-4 w-4" />
              {language.toUpperCase()}
            </Button>
            <Link href="/consultation">
              <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif tracking-wide rounded-sm">
                {t("nav.request_consultation")}
              </Button>
            </Link>
          </nav>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-primary/20">
              <div className="flex flex-col gap-8 mt-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-28 bg-primary flex items-center justify-center text-primary-foreground font-serif font-bold text-lg border-2 border-secondary">
                    <span className="text-xl">AL</span>
                    <span className="ml-1 text-[10px] tracking-widest uppercase border-l border-secondary pl-1 leading-tight">Amaral<br/>Law</span>
                  </div>
                </div>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
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
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2"
                    onClick={toggleLanguage}
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

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground border-t-4 border-secondary">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-28 bg-white flex items-center justify-center text-primary font-serif font-bold text-lg border-2 border-secondary">
                  <span className="text-xl">AL</span>
                  <span className="ml-1 text-[10px] tracking-widest uppercase border-l border-secondary pl-1 leading-tight">Amaral<br/>Law</span>
                </div>
              </div>
              <p className="text-sm text-primary-foreground/80 leading-relaxed">
                {t("footer.tagline")}
              </p>
              <div className="flex gap-4 mt-4">
                <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors">
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-serif text-lg font-semibold mb-4 text-secondary">{t("footer.practice_areas")}</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li><Link href="/practice-areas"><span className="hover:text-secondary transition-colors cursor-pointer">{t("practice.removal_defense")}</span></Link></li>
                <li><Link href="/practice-areas"><span className="hover:text-secondary transition-colors cursor-pointer">{t("practice.asylum")}</span></Link></li>
                <li><Link href="/practice-areas"><span className="hover:text-secondary transition-colors cursor-pointer">{t("practice.family")}</span></Link></li>
                <li><Link href="/practice-areas"><span className="hover:text-secondary transition-colors cursor-pointer">{t("practice.bond")}</span></Link></li>
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
                  <a href="tel:1-844-262-5442" className="hover:text-white transition-colors">1-844-ICE-FREE</a>
                </li>
                <li>
                  <a href="https://wa.me/16198671707" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary transition-colors">
                    <MessageCircle className="h-4 w-4 shrink-0" />
                    <span>WhatsApp: (619) 867-1707</span>
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" />
                  <a href="mailto:ap@amarallegal.com" className="hover:text-white transition-colors">ap@amarallegal.com</a>
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
                  className="bg-white/10 border border-white/20 rounded-sm px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-secondary text-white placeholder:text-white/50"
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
              <a href="#" className="hover:text-white transition-colors">{t("footer.privacy")}</a>
              <a href="#" className="hover:text-white transition-colors">{t("footer.terms")}</a>
              <a href="#" className="hover:text-white transition-colors">{t("footer.disclaimer")}</a>
              <a href="#" className="hover:text-white transition-colors">{t("footer.accessibility")}</a>
              <Link href="/admin">
                <span className="hover:text-white transition-colors cursor-pointer">{t("footer.admin")}</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
