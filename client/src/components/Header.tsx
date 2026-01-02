import { Link, useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { t, language, setLanguage } = useLanguage();
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/resources", label: t("nav.resources") },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <a className="flex items-center space-x-2">
              <span className="text-xl font-serif font-bold text-primary">Amaral Law</span>
            </a>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === item.href
                    ? "text-primary font-bold"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </a>
            </Link>
          ))}
          
          <div className="flex items-center gap-2 ml-4 border-l pl-4">
            <Button 
              variant={language === 'en' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setLanguage('en')}
              className="h-8 px-2"
            >
              EN
            </Button>
            <Button 
              variant={language === 'es' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setLanguage('es')}
              className="h-8 px-2"
            >
              ES
            </Button>
            <Button 
              variant={language === 'pt' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setLanguage('pt')}
              className="h-8 px-2"
            >
              PT
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-muted-foreground"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-4">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location === item.href
                      ? "text-primary font-bold"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              </Link>
            ))}
            <div className="flex gap-2 pt-4 border-t">
              <Button 
                variant={language === 'en' ? 'default' : 'ghost'} 
                size="sm" 
                onClick={() => setLanguage('en')}
              >
                EN
              </Button>
              <Button 
                variant={language === 'es' ? 'default' : 'ghost'} 
                size="sm" 
                onClick={() => setLanguage('es')}
              >
                ES
              </Button>
              <Button 
                variant={language === 'pt' ? 'default' : 'ghost'} 
                size="sm" 
                onClick={() => setLanguage('pt')}
              >
                PT
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
