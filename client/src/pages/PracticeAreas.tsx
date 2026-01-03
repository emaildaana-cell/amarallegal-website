import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Shield, Scale, Users, FileText, AlertTriangle, Gavel } from "lucide-react";

export default function PracticeAreas() {
  const { t } = useLanguage();

  const practices = [
    {
      id: "removal-defense",
      icon: Shield,
      title: t("practice.removal_defense"),
      desc: t("practice.removal_defense_desc"),
      details: "We provide aggressive representation in immigration court for individuals facing deportation. Whether you are detained or non-detained, we fight to terminate proceedings or find relief to allow you to stay."
    },
    {
      id: "asylum",
      icon: Scale,
      title: t("practice.asylum"),
      desc: t("practice.asylum_desc"),
      details: "If you fear persecution in your home country, we can help you apply for asylum, withholding of removal, and protection under the Convention Against Torture."
    },
    {
      id: "family",
      icon: Users,
      title: t("practice.family"),
      desc: t("practice.family_desc"),
      details: "We assist with family-based petitions (I-130), adjustment of status (Green Cards), consular processing, and waivers for unlawful presence."
    },
    {
      id: "bond",
      icon: FileText,
      title: t("practice.bond"),
      desc: t("practice.bond_desc"),
      details: "We represent detained clients in bond hearings to secure their release from ICE custody so they can fight their case from the outside."
    },
    {
      id: "crimmigration",
      icon: AlertTriangle,
      title: t("practice.crimmigration"),
      desc: t("practice.crimmigration_desc"),
      details: "We analyze the immigration consequences of criminal charges and work with criminal defense attorneys to minimize the risk of deportation."
    },
    {
      id: "federal",
      icon: Gavel,
      title: t("practice.federal"),
      desc: t("practice.federal_desc"),
      details: "When administrative remedies are exhausted or delayed, we take the fight to federal court through mandamus actions and petitions for review."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
              {t("nav.practice_areas")}
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              {t("home.practice_areas_desc")}
            </p>
          </div>
        </div>
      </section>

      {/* Practice Areas List */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid gap-12">
            {practices.map((practice, i) => (
              <div key={i} id={practice.id} className="flex flex-col md:flex-row gap-8 items-start p-8 rounded-lg border border-border/50 hover:shadow-md transition-shadow bg-card">
                <div className="shrink-0 w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                  <practice.icon className="h-8 w-8" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-primary">{practice.title}</h2>
                  <p className="text-lg font-medium text-foreground">{practice.desc}</p>
                  <p className="text-muted-foreground leading-relaxed">{practice.details}</p>
                  <Link href="/consultation">
                    <Button variant="outline" className="mt-2">
                      {t("nav.request_consultation")}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container text-center space-y-8">
          <h2 className="text-3xl font-serif font-bold text-primary">
            Need Legal Assistance?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every case is unique. Contact us today to schedule a consultation and discuss your specific immigration needs.
          </p>
          <Link href="/contact">
            <Button size="lg" className="font-bold">
              {t("nav.contact")}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
