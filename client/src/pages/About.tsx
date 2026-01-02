import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Scale, Shield, Users } from "lucide-react";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
              {t("nav.about")}
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              {t("home.excellence_p1")}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-bold text-primary">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Amaral Law, our mission is simple yet profound: to provide aggressive, compassionate, and effective legal representation to immigrants facing removal proceedings. We believe that every individual deserves a fair chance to present their case and fight for their right to remain in the United States.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded on the principles of justice and integrity, our firm has dedicated itself exclusively to immigration law. We understand the complexities of the immigration system and the high stakes involved for our clients and their families.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-primary/10"></div>
              {/* Placeholder for office or team image */}
              <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                [Office/Team Image Placeholder]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground">
              These principles guide every case we handle and every interaction we have with our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-lg shadow-sm border border-border/50 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-primary">Protection</h3>
              <p className="text-muted-foreground">
                We are the shield between our clients and deportation. We fight tirelessly to protect your rights and your future in this country.
              </p>
            </div>

            <div className="bg-background p-8 rounded-lg shadow-sm border border-border/50 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <Scale className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-primary">Justice</h3>
              <p className="text-muted-foreground">
                We believe in equal justice under the law. We ensure that every legal avenue is explored and every defense is presented.
              </p>
            </div>

            <div className="bg-background p-8 rounded-lg shadow-sm border border-border/50 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-primary">Compassion</h3>
              <p className="text-muted-foreground">
                We treat every client with dignity and respect. We understand the emotional toll of immigration proceedings and provide supportive counsel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            Ready to Discuss Your Case?
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Don't face the immigration system alone. Contact us today for a consultation with our experienced removal defense attorneys.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/consultation">
              <Button size="lg" variant="secondary" className="font-bold text-primary">
                {t("nav.request_consultation")}
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                {t("nav.contact")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
