import { useState, useEffect } from "react";
import { Link } from "wouter";
import { X, AlertTriangle, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const BANNER_DISMISSED_KEY = "emergency_banner_dismissed";
const BANNER_DISMISS_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export default function EmergencyBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    // Check if banner was dismissed recently
    const dismissedAt = localStorage.getItem(BANNER_DISMISSED_KEY);
    if (dismissedAt) {
      const dismissedTime = parseInt(dismissedAt, 10);
      if (Date.now() - dismissedTime < BANNER_DISMISS_DURATION) {
        return; // Still within dismiss period
      }
    }
    setIsVisible(true);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(BANNER_DISMISSED_KEY, Date.now().toString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const content = {
    en: {
      title: "Someone Detained by ICE?",
      subtitle: "Time is critical. Get immediate legal help.",
      cta: "Get Help Now",
      call: "Call 24/7",
    },
    es: {
      title: "¿Alguien Detenido por ICE?",
      subtitle: "El tiempo es crítico. Obtenga ayuda legal inmediata.",
      cta: "Obtener Ayuda",
      call: "Llamar 24/7",
    },
    pt: {
      title: "Alguém Detido pelo ICE?",
      subtitle: "O tempo é crítico. Obtenha ajuda jurídica imediata.",
      cta: "Obter Ajuda",
      call: "Ligar 24/7",
    },
  };

  const t = content[language] || content.en;

  return (
    <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white overflow-hidden">
      {/* Animated background pulse */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)] animate-pulse" />
      
      <div className="container relative py-3 md:py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
          {/* Left side - Alert icon and text */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
              <AlertTriangle className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg md:text-xl tracking-tight">
                {t.title}
              </h3>
              <p className="text-sm md:text-base text-red-100 hidden sm:block">
                {t.subtitle}
              </p>
            </div>
          </div>

          {/* Right side - CTAs */}
          <div className="flex items-center gap-2 md:gap-3">
            <a href="tel:18444233733">
              <Button 
                size="sm" 
                className="bg-white text-red-700 hover:bg-red-50 font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <Phone className="w-4 h-4 mr-2" />
                {t.call}
              </Button>
            </a>
            <Link href="/detention">
              <Button 
                size="sm" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 font-semibold"
              >
                {t.cta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 md:top-1/2 md:-translate-y-1/2 md:right-4 p-1.5 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400" />
    </div>
  );
}
