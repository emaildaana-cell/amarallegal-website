import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Scale, Shield, Users, BookOpen, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
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
            <div className="inline-block bg-secondary/20 backdrop-blur-sm border border-secondary/40 px-4 py-1 rounded-full text-secondary text-sm font-medium tracking-wider uppercase mb-2">
              Established 1985
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight">
              Unwavering Commitment to <span className="text-secondary italic">Justice</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl font-light leading-relaxed">
              Amaral Law provides authoritative legal representation for complex corporate, intellectual property, and estate matters. We fight for your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/consultation">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-serif text-lg px-8 h-14 rounded-sm">
                  Request Consultation
                </Button>
              </Link>
              <Link href="/attorneys">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-serif text-lg px-8 h-14 rounded-sm">
                  Meet Our Attorneys
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction / Stats */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-serif font-bold text-primary">Decades of Excellence in Legal Practice</h2>
              <div className="w-20 h-1 bg-secondary"></div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Amaral Law, we believe that every client deserves a dedicated advocate. Our firm combines the resources of a large practice with the personalized attention of a boutique firm.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With over 40 years of combined experience, our attorneys have secured millions in settlements and successfully defended the rights of countless individuals and businesses.
              </p>
              <div className="pt-4">
                <Link href="/about">
                  <Button variant="link" className="text-primary font-bold p-0 text-lg h-auto">
                    Learn More About Our Firm <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-muted/30 p-8 text-center rounded-sm border border-border">
                <div className="text-4xl font-serif font-bold text-secondary mb-2">40+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Years Experience</div>
              </div>
              <div className="bg-muted/30 p-8 text-center rounded-sm border border-border">
                <div className="text-4xl font-serif font-bold text-secondary mb-2">500+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Cases Won</div>
              </div>
              <div className="bg-muted/30 p-8 text-center rounded-sm border border-border">
                <div className="text-4xl font-serif font-bold text-secondary mb-2">$50M+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Recovered</div>
              </div>
              <div className="bg-muted/30 p-8 text-center rounded-sm border border-border">
                <div className="text-4xl font-serif font-bold text-secondary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Client Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4 text-secondary">Our Practice Areas</h2>
            <p className="text-primary-foreground/80 text-lg">
              We offer comprehensive legal services across a wide range of disciplines, ensuring that whatever your legal need, we have the expertise to handle it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Scale, title: "Corporate Litigation", desc: "Protecting your business interests in complex commercial disputes." },
              { icon: Shield, title: "Intellectual Property", desc: "Safeguarding your innovations, trademarks, and creative works." },
              { icon: Users, title: "Family Law", desc: "Compassionate guidance through divorce, custody, and estate matters." },
              { icon: BookOpen, title: "Estate Planning", desc: "Securing your legacy and ensuring your assets are protected." },
              { icon: CheckCircle2, title: "Real Estate", desc: "Navigating commercial and residential transactions with precision." },
              { icon: Scale, title: "Tax Law", desc: "Strategic advice to minimize liability and resolve disputes with authorities." },
            ].map((area, i) => (
              <Card key={i} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors duration-300 border-none">
                <CardHeader>
                  <div className="bg-secondary/20 w-12 h-12 rounded-sm flex items-center justify-center mb-4">
                    <area.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="font-serif text-xl text-secondary">{area.title}</CardTitle>
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

      {/* Featured Image / Quote */}
      <section className="relative py-24 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/images/scales-justice.jpg')" }}>
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
        <div className="container relative z-10 text-center">
          <blockquote className="font-serif text-3xl md:text-4xl font-bold text-white italic leading-relaxed max-w-4xl mx-auto">
            "Justice is not just a concept; it is a practice. We dedicate ourselves daily to the pursuit of fairness and the protection of our clients' rights."
          </blockquote>
          <div className="mt-8 text-white/80 font-medium tracking-widest uppercase">
            — James Sterling, Senior Partner
          </div>
        </div>
      </section>

      {/* Latest Insights */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif font-bold text-primary mb-2">Legal Insights</h2>
              <p className="text-muted-foreground">Latest updates from our Knowledge Center</p>
            </div>
            <Link href="/knowledge-center">
              <Button variant="outline" className="hidden md:flex">View All Articles</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Corporate Liability in the Digital Age", date: "Oct 12, 2025", cat: "Corporate Law" },
              { title: "Estate Planning for Business Owners", date: "Sep 28, 2025", cat: "Estate Planning" },
              { title: "Intellectual Property: Patent vs. Trade Secret", date: "Sep 15, 2025", cat: "IP Law" },
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
              <Button variant="outline" className="w-full">View All Articles</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Ready to Discuss Your Case?</h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
            Contact us today to schedule a confidential consultation with one of our experienced attorneys.
          </p>
          <Link href="/consultation">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-serif text-lg px-10 h-14 rounded-sm shadow-lg font-bold">
              Start Your Consultation Request
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
