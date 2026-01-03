import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Heart, Scale, Users } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Amaral Law
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Dedicated to defending the rights of immigrants facing detention and removal proceedings. We provide compassionate, aggressive legal representation when it matters most.
          </p>
        </div>
      </section>

      {/* Our Story Section with Immigration Image */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Amaral Law was founded on the principle that every person deserves vigorous legal representation, regardless of their immigration status. We understand that immigration detention is one of the most stressful experiences a family can face, and we are committed to fighting for your freedom and your future.
                </p>
                <p>
                  Our firm specializes in immigration detention defense, bond hearings, removal proceedings, and all forms of relief from deportation. We have successfully represented hundreds of clients in immigration court, securing bonds, winning asylum cases, and preventing deportations.
                </p>
                <p>
                  What sets us apart is our deep understanding of both the legal complexities and the human impact of immigration enforcement. We don't just see cases—we see families, dreams, and futures worth fighting for.
                </p>
              </div>
            </div>
            <div>
              <img
                src="/about-story.jpg"
                alt="Immigrant families"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Legal Team Section */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Legal Team
            </h2>
            <p className="text-lg text-muted-foreground">
              Experienced attorneys dedicated to your case
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Lead Attorney */}
            <Card className="text-center">
              <CardContent className="pt-6">
                <img
                  src="/attorney-ana.jpg"
                  alt="Ana Paola Amaral-Muschlitz"
                  className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold mb-2">
                  Ana Paola Amaral-Muschlitz
                </h3>
                <p className="text-secondary font-semibold mb-4">
                  Lead Immigration Attorney
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  An immigrant from Brazil with over 40 years in the U.S., Ana Paola specializes in detention defense and removal proceedings, bringing personal experience and deep empathy to every case.
                </p>
                <Link href="/contact">
                  <Button variant="default" size="sm">
                    Schedule Consultation
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Associate Attorney 1 */}
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-48 h-48 rounded-full mx-auto mb-4 bg-muted flex items-center justify-center">
                  <Users className="w-24 h-24 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Associate Attorney</h3>
                <p className="text-secondary font-semibold mb-4">
                  Immigration Law Specialist
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Dedicated to providing compassionate and effective legal representation for clients facing immigration challenges. Expertise in family-based immigration and humanitarian relief.
                </p>
                <Link href="/contact">
                  <Button variant="default" size="sm">
                    Schedule Consultation
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Associate Attorney 2 */}
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-48 h-48 rounded-full mx-auto mb-4 bg-muted flex items-center justify-center">
                  <Users className="w-24 h-24 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Associate Attorney</h3>
                <p className="text-secondary font-semibold mb-4">
                  Deportation Defense Attorney
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Focused on defending clients in removal proceedings and bond hearings. Committed to fighting for the rights of detained individuals and their families.
                </p>
                <Link href="/contact">
                  <Button variant="default" size="sm">
                    Schedule Consultation
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <Scale className="w-6 h-6 text-secondary-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Justice for All</h3>
                <p className="text-muted-foreground">
                  We believe every person deserves quality legal representation, regardless of their circumstances.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-secondary-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Compassionate Advocacy</h3>
                <p className="text-muted-foreground">
                  We treat each client with dignity, respect, and genuine understanding of their situation.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-secondary-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Legal Excellence</h3>
                <p className="text-muted-foreground">
                  We maintain the highest standards of legal practice and tirelessly pursue the best outcomes.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-secondary-foreground" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Community Commitment</h3>
                <p className="text-muted-foreground">
                  We actively serve immigrant communities and advocate for fair immigration reform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don't Face Immigration Detention Alone
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Every day in detention matters. Contact us today for a free consultation and learn how we can help secure your release and fight for your rights.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Schedule Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
