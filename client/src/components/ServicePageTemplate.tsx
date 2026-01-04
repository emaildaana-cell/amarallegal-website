import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, ArrowRight, CheckCircle, Scale, Shield, Users } from "lucide-react";

interface ServiceItem {
  titleKey: string;
  descKey: string;
  icon?: React.ReactNode;
}

interface ServicePageProps {
  titleKey: string;
  subtitleKey: string;
  introKey: string;
  heroImage: string;
  sections: {
    titleKey: string;
    descKey?: string;
    items?: ServiceItem[];
  }[];
  ctaKey: string;
  ctaLink: string;
}

export default function ServicePageTemplate({
  titleKey,
  subtitleKey,
  introKey,
  heroImage,
  sections,
  ctaKey,
  ctaLink,
}: ServicePageProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
              {t(titleKey)}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light mb-8">
              {t(subtitleKey)}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={ctaLink}>
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold">
                  {t(ctaKey)}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="tel:1-844-423-3733">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Phone className="mr-2 h-5 w-5" />
                  1-844-423-3733
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t(introKey)}
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      {sections.map((section, index) => (
        <section 
          key={index} 
          className={`py-16 md:py-20 ${index % 2 === 0 ? 'bg-muted/30' : 'bg-background'}`}
        >
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
                {t(section.titleKey)}
              </h2>
              
              {section.descKey && (
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {t(section.descKey)}
                </p>
              )}

              {section.items && (
                <div className="grid md:grid-cols-2 gap-6">
                  {section.items.map((item, itemIndex) => (
                    <Card key={itemIndex} className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                            {item.icon || <CheckCircle className="h-6 w-6 text-primary" />}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                              {t(item.titleKey)}
                            </h3>
                            <p className="text-muted-foreground">
                              {t(item.descKey)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              {t("home.excellence_title")}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              {t("home.excellence_p1")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={ctaLink}>
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold">
                  {t(ctaKey)}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="tel:1-844-423-3733">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Phone className="mr-2 h-5 w-5" />
                  1-844-423-3733
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
