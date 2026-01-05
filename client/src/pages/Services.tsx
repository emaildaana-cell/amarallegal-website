import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";

interface ServiceCard {
  title: string;
  description: string;
  href: string;
  image: string;
  popular?: boolean;
}

const services: ServiceCard[] = [
  {
    title: "Immigration Bonds",
    description: "Secure release from detention through bond hearings",
    href: "/services/bond-hearings",
    image: "/images/services/immigration-bonds.jpg",
    popular: true
  },
  {
    title: "Removal Defense",
    description: "Fight deportation proceedings in immigration court",
    href: "/services/removal-defense",
    image: "/images/services/removal-defense.jpg",
    popular: true
  },
  {
    title: "Citizenship & Naturalization",
    description: "Become a U.S. citizen through naturalization",
    href: "/services/citizenship",
    image: "/images/services/citizenship.jpg"
  },
  {
    title: "Family-Based Immigration",
    description: "Reunite with loved ones through family petitions",
    href: "/services/family-petitions",
    image: "/images/services/family-immigration.jpg",
    popular: true
  },
  {
    title: "Humanitarian Relief",
    description: "Asylum, VAWA, U visas, and protection from persecution",
    href: "/services/asylum",
    image: "/images/services/humanitarian.jpg"
  },
  {
    title: "Employment Immigration",
    description: "Work visas and employment-based green cards",
    href: "/services/employment",
    image: "/images/services/employment.jpg"
  },
  {
    title: "Cancellation of Removal",
    description: "Stop deportation for long-term U.S. residents",
    href: "/services/removal-defense",
    image: "/images/services/cancellation.jpg"
  },
  {
    title: "ICE Detention Representation",
    description: "Legal representation for detained individuals",
    href: "/services/bond-hearings",
    image: "/images/services/detention.jpg",
    popular: true
  }
];

export default function Services() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <SEO 
        title="Practice Areas"
        description="Explore our immigration law practice areas including removal defense, asylum, family petitions, bond hearings, crimmigration, and federal litigation."
        keywords="immigration services, practice areas, removal defense, asylum, family petitions"
        canonicalUrl="/services"
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-sm font-medium">Comprehensive Legal Services</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our Immigration Services
            </h1>
            <p className="text-xl text-white/80">
              Comprehensive legal representation across all aspects of immigration law
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={service.href}>
                  <div className="group relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all">
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ 
                        backgroundImage: `url(${service.image})`,
                        backgroundColor: '#1e3a5f'
                      }}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Popular Badge */}
                    {service.popular && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-secondary text-secondary-foreground font-bold">
                          POPULAR
                        </Badge>
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <h3 className="text-lg font-bold mb-1 group-hover:text-secondary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-white/80">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Need Legal Assistance?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Every immigration case is unique. Schedule a consultation to discuss your specific situation with an experienced attorney who can guide you through the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultation">
                <button className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                  Schedule Consultation
                </button>
              </Link>
              <a href="tel:3055759531">
                <button className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-colors">
                  Call (305) 575-9531
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
