import { motion } from "framer-motion";
import { 
  BookOpen, 
  FileText, 
  HelpCircle, 
  AlertTriangle,
  Users,
  Download,
  ExternalLink,
  ArrowRight
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface ResourceCard {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  external?: boolean;
  color: string;
}

const resources: ResourceCard[] = [
  {
    title: "ICE Detention Process",
    description: "A comprehensive step-by-step guide explaining what happens when someone is detained by ICE, from arrest through removal proceedings.",
    icon: AlertTriangle,
    href: "/detention-process",
    color: "bg-red-500"
  },
  {
    title: "Frequently Asked Questions",
    description: "Find answers to common immigration questions across categories including bonds, asylum, citizenship, and more.",
    icon: HelpCircle,
    href: "/faq",
    color: "bg-blue-500"
  },
  {
    title: "Court Sponsor Guide",
    description: "Learn about the responsibilities and requirements for being a court sponsor in immigration bond cases.",
    icon: Users,
    href: "/sponsor-guide",
    color: "bg-green-500"
  },
  {
    title: "Downloadable Guides",
    description: "Free downloadable resources including checklists, forms guides, and informational documents.",
    icon: Download,
    href: "/downloads",
    color: "bg-purple-500"
  }
];

const externalResources = [
  {
    title: "ICE Detainee Locator",
    description: "Official ICE tool to locate detained individuals using their name or A-Number.",
    href: "https://locator.ice.gov/odls/#/index",
    icon: ExternalLink
  },
  {
    title: "EOIR Court Information",
    description: "Check immigration court case status and hearing schedules.",
    href: "https://acis.eoir.justice.gov/en/",
    icon: ExternalLink
  },
  {
    title: "USCIS Case Status",
    description: "Track the status of your pending USCIS applications.",
    href: "https://egov.uscis.gov/casestatus/landing.do",
    icon: ExternalLink
  }
];

export default function Resources() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
              <BookOpen className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Immigration Resources
            </h1>
            <p className="text-xl text-white/80">
              Free educational resources to help you understand the immigration process. Knowledge is power when navigating the complex U.S. immigration system.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Resources Grid */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Educational Guides
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={resource.href}>
                    <div className="group bg-white rounded-2xl border-2 border-slate-100 p-6 h-full hover:border-primary/20 hover:shadow-lg transition-all cursor-pointer">
                      <div className={`w-14 h-14 rounded-xl ${resource.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-slate-600 mb-4">
                        {resource.description}
                      </p>
                      <div className="flex items-center text-primary font-medium">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">
            Official Government Resources
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            These external links connect you to official government tools for checking case status and locating detained individuals.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {externalResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <motion.a
                  key={resource.title}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white rounded-xl border p-6 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm text-slate-600">
                    {resource.description}
                  </p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Know Your Rights */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-amber-600" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-amber-900 mb-4">
                  Know Your Rights
                </h2>
                <p className="text-amber-800 mb-6">
                  Everyone in the United States has certain constitutional rights, regardless of immigration status. Understanding these rights is crucial if you or a loved one encounters immigration enforcement.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/60 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-900 mb-2">Right to Remain Silent</h4>
                    <p className="text-sm text-amber-700">You do not have to answer questions about your immigration status.</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-900 mb-2">Right to an Attorney</h4>
                    <p className="text-sm text-amber-700">You have the right to speak with a lawyer before answering questions.</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-900 mb-2">Right to Refuse Entry</h4>
                    <p className="text-sm text-amber-700">Without a warrant, you do not have to let officers into your home.</p>
                  </div>
                  <div className="bg-white/60 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-900 mb-2">Right to a Hearing</h4>
                    <p className="text-sm text-amber-700">You have the right to a hearing before an immigration judge.</p>
                  </div>
                </div>
                <Link href="/consultation">
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                    Speak With an Attorney
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Need Personalized Help?</h2>
            <p className="text-xl text-white/80 mb-8">
              While these resources provide general information, every immigration case is unique. Schedule a consultation to discuss your specific situation with an experienced attorney.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultation">
                <Button size="lg" variant="secondary" className="text-primary font-semibold">
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/bond-questionnaire">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Complete Bond Questionnaire
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
