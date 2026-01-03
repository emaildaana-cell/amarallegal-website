import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

export default function Services() {
  const services = [
    {
      title: "Immigration Bonds",
      description: "Secure release from detention",
      details: "We help secure delivery bonds and voluntary departure bonds, navigating the complex ICE bond process to reunite families.",
      image: "/service-bonds-money.jpg",
    },
    {
      title: "Removal Defense",
      description: "Fight deportation proceedings",
      details: "Comprehensive defense strategies in immigration court to challenge removal orders and protect your right to stay.",
      image: "/immigration-court.jpg",
    },
    {
      title: "Citizenship & Naturalization",
      description: "Become a U.S. citizen",
      details: "Guidance through the naturalization process, from application to citizenship ceremony.",
      image: "/service-citizenship-flag.jpg",
    },
    {
      title: "Family-Based Immigration",
      description: "Reunite with loved ones",
      details: "Help with family petitions, spousal visas, and bringing family members to the United States.",
      image: "/service-relief.jpg",
    },
    {
      title: "Humanitarian Relief",
      description: "Asylum, VAWA, U visas",
      details: "Protection for victims of persecution, domestic violence, and crime through various humanitarian programs.",
      image: "/service-bonds.jpg",
    },
    {
      title: "Employment Immigration",
      description: "Work visas and green cards",
      details: "Employment-based immigration solutions including H-1B visas, L-1 visas, and PERM labor certification.",
      image: "/service-relief.jpg",
    },
    {
      title: "Cancellation of Removal",
      description: "Stop deportation for long-term residents",
      details: "Relief for individuals who have lived in the U.S. for many years and face removal proceedings.",
      image: "/service-bonds.jpg",
    },
    {
      title: "ICE Detention Representation",
      description: "Legal representation for detained individuals",
      details: "Immediate legal assistance for those detained by ICE, including bond hearings and removal defense.",
      image: "/service-detention-jail.jpg",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Immigration Services
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Comprehensive legal representation across all aspects of immigration law
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div
                  className="h-40 bg-cover bg-center"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                <CardHeader>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {service.details}
                  </p>
                  <Link href="/contact">
                    <Button variant="link" className="p-0">
                      Learn More →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How We Work
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Initial Consultation</h3>
              <p className="text-muted-foreground">
                Complete analysis of your case
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Strategy Development</h3>
              <p className="text-muted-foreground">
                Personalized legal plan
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Execution</h3>
              <p className="text-muted-foreground">
                Preparation and submission
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold mb-2">Follow-up</h3>
              <p className="text-muted-foreground">
                Support until case resolution
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our experience spans many areas of immigration law. Contact us for a personalized consultation about your specific case.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Schedule Consultation
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 hover:bg-white/20 text-white border-white">
              (305) 575-9531
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
