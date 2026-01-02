import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, Scale, Shield, Users, FileText, Download, Star } from "lucide-react";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-primary text-primary-foreground">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply z-10"></div>
          <img 
            src="/images/hero-bg.jpg" 
            alt="Immigration Law" 
            className="w-full h-full object-cover opacity-50"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=2000";
            }}
          />
        </div>

        <div className="container relative z-20 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in duration-1000">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-tight">
              <span className="block text-secondary mb-2">{t("hero.title_prefix")}</span>
              <span className="block">{t("hero.title_suffix")}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed font-light">
              {t("hero.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <a href="tel:1-844-262-5442">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                  {t("hero.call_now")}
                </Button>
              </a>
              <Link href="/bond-questionnaire">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                  {t("hero.meet_attorneys")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
          <ArrowRight className="h-6 w-6 rotate-90" />
        </div>
      </section>

      {/* Vanity Number Section */}
      <section className="py-12 bg-secondary text-secondary-foreground">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold font-serif">{t("vanity.title")}</h2>
              <p className="text-lg opacity-90">{t("vanity.subtitle")}</p>
            </div>
            <a href="tel:1-844-262-5442" className="shrink-0">
              <Button size="lg" variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg px-8 py-6 shadow-md">
                {t("vanity.cta")}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              {t("home.practice_areas_title")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("home.practice_areas_desc")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: t("practice.removal_defense"),
                desc: t("practice.removal_defense_desc")
              },
              {
                icon: Scale,
                title: t("practice.asylum"),
                desc: t("practice.asylum_desc")
              },
              {
                icon: Users,
                title: t("practice.family"),
                desc: t("practice.family_desc")
              },
              {
                icon: FileText,
                title: t("practice.bond"),
                desc: t("practice.bond_desc")
              },
              {
                icon: Scale,
                title: t("practice.crimmigration"),
                desc: t("practice.crimmigration_desc")
              },
              {
                icon: Shield,
                title: t("practice.federal"),
                desc: t("practice.federal_desc")
              }
            ].map((service, i) => (
              <div key={i} className="group bg-muted/30 p-8 rounded-lg border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.desc}</p>
                <Link href="/practice-areas">
                  <span className="inline-flex items-center text-sm font-bold text-secondary hover:text-secondary/80 cursor-pointer">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Attorney Profile */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl border-4 border-secondary/30">
                <img 
                  src="/images/attorney-profile.jpg" 
                  alt="Ana Paola Amaral-Muschlitz" 
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800";
                  }}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-secondary/20 rounded-full blur-3xl -z-10"></div>
            </div>
            
            <div className="order-1 md:order-2 space-y-6">
              <div className="inline-block bg-secondary/20 px-4 py-1 rounded-full text-secondary font-bold text-sm tracking-wide uppercase">
                Lead Attorney
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">
                Ana Paola Amaral-Muschlitz
              </h2>
              <p className="text-xl text-primary-foreground/80 font-light italic">
                "As an immigrant myself, I understand the fear and uncertainty that comes with navigating the U.S. immigration system. My mission is to be the fierce advocate you need to keep your family together."
              </p>
              <div className="space-y-4 text-primary-foreground/70">
                <p>
                  Ana Paola Amaral-Muschlitz is the founder and managing partner of Amaral Law. With over a decade of experience exclusively in immigration law, she has successfully represented thousands of clients in removal proceedings, bond hearings, and complex appeals.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-secondary" />
                    <span>Admitted to the Florida Bar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-secondary" />
                    <span>Member of American Immigration Lawyers Association (AILA)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-secondary" />
                    <span>Fluent in English, Spanish, and Portuguese</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4">
                <Link href="/about">
                  <Button variant="secondary" className="font-bold">
                    Read Full Bio
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Client Success Stories
            </h2>
            <p className="text-lg text-muted-foreground">
              We are proud of the results we achieve for our clients. Here is what some of them have to say about our representation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Amaral Law saved my husband from deportation. We had lost hope after two other lawyers said nothing could be done. Ana Paola fought for us and won.",
                author: "Maria G.",
                case: "Cancellation of Removal"
              },
              {
                quote: "I was detained for 3 months and didn't think I would ever see my children again. The team at Amaral Law got me released on bond and then won my asylum case.",
                author: "Jose R.",
                case: "Bond & Asylum"
              },
              {
                quote: "Professional, honest, and aggressive. They didn't promise me a miracle, but they delivered one. I am now a permanent resident thanks to their hard work.",
                author: "Luis M.",
                case: "Adjustment of Status"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-background p-8 rounded-lg shadow-sm border border-border/50 relative">
                <div className="absolute top-6 left-6 text-primary/10">
                  <Star className="h-8 w-8 fill-current" />
                </div>
                <p className="text-muted-foreground italic mb-6 relative z-10">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-primary">{testimonial.author}</p>
                  <p className="text-xs text-secondary font-bold uppercase tracking-wide">{testimonial.case}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
                Why Choose Amaral Law?
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Exclusive Focus</h3>
                    <p className="text-muted-foreground">We only practice immigration removal defense. This specialization allows us to stay ahead of complex and ever-changing laws.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Multilingual Team</h3>
                    <p className="text-muted-foreground">Our entire staff speaks English, Spanish, and Portuguese, ensuring clear communication without language barriers.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Scale className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Proven Results</h3>
                    <p className="text-muted-foreground">We have a strong track record of winning difficult cases in immigration courts across the country.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Honest Assessment</h3>
                    <p className="text-muted-foreground">We will never take a case we don't believe in. We provide honest, realistic assessments of your legal options.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative h-full min-h-[400px] rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/images/office-meeting.jpg" 
                alt="Legal Team Meeting" 
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000";
                }}
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Forms Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">
            Important Forms & Questionnaires
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-12">
            Access our secure online forms to speed up your case evaluation process.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Link href="/bond-questionnaire">
              <div className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-8 transition-all cursor-pointer group">
                <FileText className="h-12 w-12 mx-auto mb-4 text-secondary group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-2">Bond Questionnaire</h3>
                <p className="text-primary-foreground/70 mb-6">For sponsors to evaluate bond eligibility for detained individuals.</p>
                <Button variant="secondary" className="w-full font-bold">Start Questionnaire</Button>
              </div>
            </Link>
            
            <Link href="/client-intake">
              <div className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-8 transition-all cursor-pointer group">
                <FileText className="h-12 w-12 mx-auto mb-4 text-secondary group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-2">Client Intake Form</h3>
                <p className="text-primary-foreground/70 mb-6">General intake form for new clients seeking legal representation.</p>
                <Button variant="secondary" className="w-full font-bold">Start Intake</Button>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
