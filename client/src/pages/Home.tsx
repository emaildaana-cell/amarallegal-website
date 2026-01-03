import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Scale, Shield, Users, BookOpen, CheckCircle2, Gavel, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col">
          {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/courthouse-architecture.jpg" 
            alt="Courthouse Architecture" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 mix-blend-multiply" />
        </div>
        
        <div className="container relative z-10 text-center md:text-left">
          <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <a href="tel:18442625442" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6 py-2 rounded-full text-sm font-bold tracking-wider uppercase mb-2 transition-colors">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/> {t("hero.call_now")}: 1-844-ICE-FREE
            </a>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight">
              {t("hero.title_prefix")} <span className="text-secondary italic">{t("hero.title_suffix")}</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl font-light leading-relaxed">
              {t("hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/consultation">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-serif text-lg px-8 h-14 rounded-sm">
                  {t("nav.request_consultation")}
                </Button>
              </Link>
          <Link href="/bond-questionnaire">
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary font-serif text-lg px-10 h-14 rounded-sm backdrop-blur-sm bg-white/10">
              {t("hero.meet_attorneys")}
            </Button>
          </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Vanity Number Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-6">
              <div className="inline-block bg-secondary/20 px-4 py-1 rounded-full text-secondary font-bold tracking-wider text-sm uppercase">
                {t("vanity.subtitle")}
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
                {t("vanity.title")}
              </h2>
              <p className="text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
                {t("vanity.description")}
              </p>
              <a href="tel:18442625442">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-lg px-8 h-14 rounded-sm mt-4">
                  <Phone className="mr-2 h-5 w-5" /> {t("vanity.cta")}
                </Button>
              </a>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-md aspect-square flex items-center justify-center bg-white/5 rounded-full border border-white/10 backdrop-blur-sm p-8 overflow-hidden">
                <img 
                  src="/images/ana-paola-ice-free.png" 
                  alt="Ana Paola Amaral-Muschlitz - 1-844-ICE-FREE" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4 text-secondary">{t("home.practice_areas_title")}</h2>
            <p className="text-primary-foreground/80 text-lg">
              {t("home.practice_areas_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Scale, title: t("practice.removal_defense"), desc: t("practice.removal_defense_desc") },
              { icon: Shield, title: t("practice.asylum"), desc: t("practice.asylum_desc") },
              { icon: Users, title: t("practice.family"), desc: t("practice.family_desc") },
              { icon: BookOpen, title: t("practice.bond"), desc: t("practice.bond_desc") },
              { icon: CheckCircle2, title: t("practice.crimmigration"), desc: t("practice.crimmigration_desc") },
              { icon: Scale, title: t("practice.federal"), desc: t("practice.federal_desc") },
            ].map((area, i) => (
              <Card key={i} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors duration-300 border-none">
                <CardHeader>
                  <div className="bg-secondary/20 w-12 h-12 rounded-sm flex items-center justify-center mb-4">
                    <area.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-xl font-serif text-secondary">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary-foreground/70 leading-relaxed">
                    {area.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* Latest Insights */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif font-bold text-primary mb-4">{t("home.latest_insights")}</h2>
              <div className="w-20 h-1 bg-secondary"></div>
            </div>
            <Link href="/knowledge-center">
              <Button variant="outline" className="hidden md:flex">{t("home.view_all_articles")}</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Understanding Your Rights in Immigration Court", date: "Oct 12, 2025", cat: "Removal Defense" },
              { title: "How to Post Bond for a Detained Relative", date: "Sep 28, 2025", cat: "Detention" },
              { title: "Changes to Asylum Eligibility in 2024", date: "Sep 15, 2025", cat: "Asylum" },
            ].map((article, i) => (
              <Link key={i} href="/knowledge-center">
                <div className="group cursor-pointer space-y-4">
                  <div className="aspect-video bg-muted rounded-sm overflow-hidden relative">
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition-colors" />
                    {/* Placeholder for article image */}
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      <span className="text-primary">{article.cat}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">
                      Read our expert analysis on this critical topic affecting businesses and individuals alike.
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 md:hidden">
            <Link href="/knowledge-center">
              <Button variant="outline" className="w-full">{t("home.view_all_articles")}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">{t("contact.title")}</h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
            {t("contact.subtitle")}
          </p>
          <Link href="/consultation">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-serif text-lg px-10 h-14 rounded-sm shadow-lg font-bold">
              {t("nav.request_consultation")}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
