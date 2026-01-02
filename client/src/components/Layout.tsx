import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Scale, Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AccessibilityMenu from "./AccessibilityMenu";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Attorneys", href: "/attorneys" },
    { label: "Practice Areas", href: "/practice-areas" },
    { label: "Knowledge Center", href: "/knowledge-center" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground selection:bg-primary/20">
      {/* Top Bar - Contact Info */}
      <div className="bg-primary text-primary-foreground py-2 text-sm hidden md:block border-b border-secondary/30">
        <div className="container flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><Phone className="h-3 w-3" /> (555) 123-4567</span>
            <span className="flex items-center gap-2"><Mail className="h-3 w-3" /> contact@amarallaw.com</span>
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
              <div className="bg-primary text-primary-foreground p-2 rounded-sm group-hover:bg-primary/90 transition-colors">
                <Scale className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold leading-none tracking-tight text-primary">AMARAL LAW</span>
                <span className="text-[0.65rem] uppercase tracking-widest text-muted-foreground font-medium">Est. 1985</span>
              </div>
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
            <Link href="/consultation">
              <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif tracking-wide rounded-sm">
                Request Consultation
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
                  <div className="bg-primary text-primary-foreground p-2 rounded-sm">
                    <Scale className="h-6 w-6" />
                  </div>
                  <span className="font-serif text-xl font-bold text-primary">AMARAL LAW</span>
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
                  <Link href="/consultation">
                    <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-sm">
                      Request Consultation
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
                <Scale className="h-5 w-5 text-primary-foreground/80" />
                <span className="font-serif text-xl font-bold">AMARAL LAW</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Providing authoritative legal representation with a commitment to justice and integrity since 1985.
              </p>
            </div>
            
            <div>
              <h3 className="font-serif text-lg font-semibold mb-4 text-secondary">Practice Areas</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li><a href="#" className="hover:text-secondary transition-colors">Corporate Litigation</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Intellectual Property</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Real Estate Law</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Estate Planning</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold mb-4 text-secondary">Contact</h3>
              <ul className="space-y-3 text-sm text-primary-foreground/70">
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>6750 N. Andrews Avenue Ste 208<br />Fort Lauderdale, FL 33309</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>(555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span>contact@amarallaw.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold mb-4 text-secondary">Newsletter</h3>
              <p className="text-sm text-primary-foreground/70 mb-4">Subscribe for legal insights and firm updates.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-background/5 border border-border/10 rounded-sm px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary/50 text-primary-foreground placeholder:text-muted-foreground/50"
                />
                <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-sm font-bold">
                  Join
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/50">
            <p>&copy; {new Date().getFullYear()} Amaral Law Firm. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary-foreground transition-colors">Disclaimer</a>
              <a href="#" className="hover:text-primary-foreground transition-colors">Accessibility</a>
              <Link href="/admin">
                <a className="hover:text-primary-foreground transition-colors">Admin Portal</a>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
