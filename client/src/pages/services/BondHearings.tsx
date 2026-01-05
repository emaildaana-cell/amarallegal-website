import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { 
  Phone, 
  ArrowRight, 
  AlertTriangle, 
  Shield, 
  Clock, 
  FileText, 
  Calendar, 
  Gavel, 
  CheckCircle,
  Scale,
  Lock,
  Unlock
} from "lucide-react";

export default function BondHearings() {
  const { t } = useLanguage();

  const timelineSteps = [
    {
      titleKey: "service.bond.timeline_motion",
      descKey: "service.bond.timeline_motion_desc",
      icon: <FileText className="h-6 w-6" />,
      step: 1,
    },
    {
      titleKey: "service.bond.timeline_scheduled",
      descKey: "service.bond.timeline_scheduled_desc",
      icon: <Calendar className="h-6 w-6" />,
      step: 2,
    },
    {
      titleKey: "service.bond.timeline_hearing",
      descKey: "service.bond.timeline_hearing_desc",
      icon: <Gavel className="h-6 w-6" />,
      step: 3,
    },
    {
      titleKey: "service.bond.timeline_decision",
      descKey: "service.bond.timeline_decision_desc",
      icon: <CheckCircle className="h-6 w-6" />,
      step: 4,
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Immigration Bond Hearings"
        description="Aggressive representation in immigration bond hearings. Fight for release from ICE detention with experienced bond attorneys."
        keywords="immigration bond, bond hearing, ICE bond, detention release"
        canonicalUrl="/services/bond-hearings"
      />
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1453945619913-79ec89a82c51?auto=format&fit=crop&w=1920&q=80)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
              {t("service.bond.title")}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light mb-8">
              {t("service.bond.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/bond-questionnaire">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold">
                  {t("service.bond.cta")}
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
              {t("service.bond.intro")}
            </p>
          </div>
        </div>
      </section>

      {/* How Bond Hearings Work */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
              {t("service.bond.process_title")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t("service.bond.process_desc")}
            </p>
          </div>
        </div>
      </section>

      {/* Scheduling Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                  {t("service.bond.scheduling_title")}
                </h2>
              </div>
            </div>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t("service.bond.scheduling_desc")}
            </p>
            
            {/* Key Timeline Info Box */}
            <Card className="border-l-4 border-l-secondary bg-secondary/5">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">7-14</div>
                    <div className="text-sm text-muted-foreground">Days to Hearing</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">15-30</div>
                    <div className="text-sm text-muted-foreground">Minutes Duration</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">24-48</div>
                    <div className="text-sm text-muted-foreground">Hours to Release</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-12 text-center">
              {t("service.bond.timeline_title")}
            </h2>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform md:-translate-x-1/2" />
              
              {/* Timeline Steps */}
              <div className="space-y-12">
                {timelineSteps.map((step, index) => (
                  <div key={index} className={`relative flex items-start gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Content */}
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} pl-20 md:pl-0`}>
                      <Card className="inline-block text-left">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary md:hidden">
                              {step.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-foreground">
                              {t(step.titleKey)}
                            </h3>
                          </div>
                          <p className="text-muted-foreground">
                            {t(step.descKey)}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Step Number */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                      {step.step}
                    </div>
                    
                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bond Eligibility */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
              {t("service.bond.eligibility_title")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t("service.bond.eligibility_desc")}
            </p>
          </div>
        </div>
      </section>

      {/* Factors in Bond Decisions */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
              {t("service.bond.factors_title")}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <AlertTriangle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {t("service.bond.flight_risk")}
                      </h3>
                      <p className="text-muted-foreground">
                        {t("service.bond.flight_risk_desc")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {t("service.bond.danger")}
                      </h3>
                      <p className="text-muted-foreground">
                        {t("service.bond.danger_desc")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Bonds */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
              {t("service.bond.types_title")}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-green-500/10 rounded-lg shrink-0">
                      <Unlock className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {t("service.bond.delivery_bond")}
                      </h3>
                      <p className="text-muted-foreground">
                        {t("service.bond.delivery_bond_desc")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg shrink-0">
                      <Scale className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {t("service.bond.voluntary_departure")}
                      </h3>
                      <p className="text-muted-foreground">
                        {t("service.bond.voluntary_departure_desc")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Bond Amounts */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
              {t("service.bond.amount_title")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t("service.bond.amount_desc")}
            </p>
            
            {/* Bond Amount Range */}
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">$1,500</div>
                    <div className="text-sm text-muted-foreground mt-1">Minimum</div>
                  </div>
                  <div className="flex-1 mx-8">
                    <div className="h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">$25,000+</div>
                    <div className="text-sm text-muted-foreground mt-1">Maximum</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mandatory Detention */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <Card className="border-l-4 border-l-red-500 bg-red-50/50">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-500/10 rounded-lg shrink-0">
                    <Lock className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
                      {t("service.bond.mandatory_title")}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {t("service.bond.mandatory_desc")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

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
              <Link href="/bond-questionnaire">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold">
                  {t("service.bond.cta")}
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
