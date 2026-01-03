import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, Heart, Scale } from "lucide-react";
import { Link } from "wouter";


export default function Home() {


  return (
    <div className="min-h-screen">

      {/* Hero Section with Professional Portrait Background */}
      <section
        className="relative min-h-screen overflow-hidden flex items-end"
        style={{
          background: "linear-gradient(135deg, #1a2332 0%, #2d3e50 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/hero-homepage-new.jpg)",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.85,
          }}
        />
        {/* Navy Blue Color Overlay for Photo Blending */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(26, 35, 50, 0.35)",
            mixBlendMode: "multiply"
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(26, 35, 50, 0.7) 0%, rgba(26, 35, 50, 0.6) 20%, rgba(26, 35, 50, 0.5) 40%, rgba(26, 35, 50, 0.4) 60%, rgba(26, 35, 50, 0.3) 80%, rgba(26, 35, 50, 0.2) 100%)"
          }}
        />
        {/* Vignette Effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.3) 100%)"
          }}
        />
        <div className="container mx-auto px-4 text-center text-white relative z-20 pb-16 md:pb-24 w-full">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 mt-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Expert Legal Defense for Immigration
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            When you or a loved one faces immigration detention, time is critical. Our experienced attorneys provide compassionate, aggressive representation to protect your rights and secure your freedom.
          </p>

        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Immigration Detention Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive legal representation for individuals and families facing immigration detention and removal proceedings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Immigration Bonds */}
            <Card className="hover:shadow-lg transition-shadow">
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: "url(/service-bonds-money.jpg)" }}
              />
              <CardHeader>
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Scale className="w-6 h-6 text-secondary-foreground" />
                </div>
                <CardTitle>Immigration Bonds</CardTitle>
                <CardDescription>Secure release from detention</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  We help secure delivery bonds and voluntary departure bonds, navigating the complex ICE bond process to reunite families and allow case preparation outside detention.
                </p>
                <Link href="/services">
                  <Button variant="link" className="p-0">
                    Learn More →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Court Relief Options */}
            <Card className="hover:shadow-lg transition-shadow">
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: "url(/immigration-court.jpg)" }}
              />
              <CardHeader>
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-secondary-foreground" />
                </div>
                <CardTitle>Court Relief Options</CardTitle>
                <CardDescription>Fight for your right to stay</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Explore available forms of relief including asylum, cancellation of removal, adjustment of status, and other defenses against deportation.
                </p>
                <Link href="/services">
                  <Button variant="link" className="p-0">
                    Learn More →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Detention Defense */}
            <Card className="hover:shadow-lg transition-shadow">
              <div
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: "url(/service-detention-jail.jpg)" }}
              />
              <CardHeader>
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-secondary-foreground" />
                </div>
                <CardTitle>Detention Defense</CardTitle>
                <CardDescription>Comprehensive legal representation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Full-service representation in immigration court proceedings, bond hearings, and appeals to protect your rights throughout the detention process.
                </p>
                <Link href="/contact">
                  <Button variant="link" className="p-0">
                    Schedule Consultation →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Attorney Bio Section */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our Lead Attorney
            </h2>
            <p className="text-lg text-muted-foreground">
              Experienced, dedicated, and committed to your case
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src="/attorney-ana.jpg"
                  alt="Ana Paola Amaral-Muschlitz"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold mb-2">
                  Ana Paola Amaral-Muschlitz
                </h3>
                <p className="text-secondary font-semibold mb-4">
                  Immigration Attorney
                </p>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Ana Paola Amaral-Muschlitz is herself an immigrant from Brazil who moved to the United States over 40 years ago. She attended the American School in Rio de Janeiro before pursuing her legal education in the United States, where she earned her law degree and built a distinguished career in immigration law.
                  </p>
                  <p>
                    As someone who has personally experienced the immigrant journey, Ana Paola brings unique insight and empathy to her practice. She specializes in detention defense and removal proceedings, having successfully represented hundreds of clients facing detention and deportation.
                  </p>
                  <p>
                    Fluent in both English and Spanish, Ana Paola provides compassionate, culturally sensitive representation to immigrant communities. She believes that everyone deserves a fair chance to present their case and fight for their right to remain in the United States with their loved ones.
                  </p>
                </div>
                <Link href="/contact">
                  <Button className="mt-6" variant="default">
                    Schedule Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Amaral Law
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Specialized Expertise</h3>
              <p className="text-muted-foreground">
                Our attorneys focus exclusively on immigration detention cases, bringing deep knowledge of bond procedures and court relief options.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Emergency Support</h3>
              <p className="text-muted-foreground">
                Immigration detention doesn't wait for business hours. We provide emergency consultations for urgent cases requiring immediate action.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Compassionate Advocacy</h3>
              <p className="text-muted-foreground">
                We understand the fear and uncertainty families face. Our team provides clear communication and compassionate support throughout your case.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Proven Track Record</h3>
              <p className="text-muted-foreground">
                Successfully secured bonds and relief for hundreds of clients, reuniting families and protecting individuals from unjust removal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Client Success Stories
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Real results from families we've helped navigate immigration detention and deportation defense
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-secondary text-xl">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "Released on $5,000 bond within 24 hours. Ana Paola's expertise and dedication reunited me with my family when I needed it most. Forever grateful."
                </p>
                <p className="font-semibold">— Carlos M., Miami, FL</p>
                <p className="text-sm text-secondary">Immigration Bond Case</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-secondary text-xl">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "After 8 years of uncertainty, my deportation was cancelled. Ana Paola fought tirelessly for my case. I'm now home with my children and wife."
                </p>
                <p className="font-semibold">— Maria S., Fort Lauderdale, FL</p>
                <p className="text-sm text-secondary">Cancellation of Removal</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-secondary text-xl">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "Professional, compassionate, and effective. Ana Paola secured my asylum case and gave me hope for a new life. Highly recommend to anyone facing detention."
                </p>
                <p className="font-semibold">— João P., Boca Raton, FL</p>
                <p className="text-sm text-secondary">Asylum Application</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
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
              🚨 24/7 Emergency: (305) 575-9531
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
