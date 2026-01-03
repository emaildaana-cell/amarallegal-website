import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";

export default function Attorneys() {
  const { t } = useLanguage();

  const attorneys = [
    {
      name: "Ana Paola Amaral-Muschlitz",
      role: "Lead Immigration Attorney",
      bio: "An immigrant from Brazil with over 40 years in the U.S., Ana Paola specializes in detention defense and removal proceedings, bringing personal experience and deep empathy to every case.",
      image: "/images/ana-paola.webp"
    },
    {
      name: "Reggie Smith",
      role: "Complex Immigration Litigation Attorney",
      bio: "Specialized in complex immigration litigation with extensive experience in appellate proceedings, federal court litigation, and challenging immigration cases requiring advanced legal strategies.",
      image: "/images/reggie-smith.webp"
    },
    {
      name: "Balaiz Vigh",
      role: "Of Counsel - Civil Litigation",
      bio: "Experienced in civil litigation matters including contract disputes, property claims, and complex civil cases. Provides expert legal representation for clients needing specialized civil law counsel.",
      image: "/images/balaiz-vigh.webp"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center font-serif">
            {t('attorneys.title') || "Our Legal Team"}
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto opacity-90">
            {t('attorneys.subtitle') || "Experienced attorneys dedicated to your case"}
          </p>
        </div>
      </section>

      {/* Attorneys Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attorneys.map((attorney, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                  <img 
                    src={attorney.image} 
                    alt={attorney.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-primary">{attorney.name}</CardTitle>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    {attorney.role}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {attorney.bio}
                  </p>
                  <div className="mt-6">
                    <Link href="/contact">
                      <Button className="w-full" variant="outline">
                        Schedule Consultation
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 font-serif text-primary">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-2xl">
                ⚖️
              </div>
              <h3 className="text-xl font-semibold mb-3">Justice for All</h3>
              <p className="text-muted-foreground">We believe every person deserves quality legal representation, regardless of their circumstances.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-2xl">
                ❤️
              </div>
              <h3 className="text-xl font-semibold mb-3">Compassionate Advocacy</h3>
              <p className="text-muted-foreground">We treat each client with dignity, respect, and genuine understanding of their situation.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-2xl">
                🏆
              </div>
              <h3 className="text-xl font-semibold mb-3">Legal Excellence</h3>
              <p className="text-muted-foreground">We maintain the highest standards of legal practice and tirelessly pursue the best outcomes.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-2xl">
                🤝
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Commitment</h3>
              <p className="text-muted-foreground">We actively serve immigrant communities and advocate for fair immigration reform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Don't Face Immigration Detention Alone</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Every day in detention matters. Contact us today for a free consultation and learn how we can help secure your release and fight for your rights.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="font-semibold text-lg px-8">
              Request Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
