import { motion } from "framer-motion";
import { 
  Download, 
  FileText, 
  CheckSquare, 
  BookOpen,
  Scale,
  Users,
  Shield,
  Heart,
  ExternalLink
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface DownloadItem {
  title: string;
  description: string;
  icon: React.ElementType;
  category: string;
  fileType: string;
  comingSoon?: boolean;
  downloadUrl?: string;
  interactiveUrl?: string;
}

const downloads: DownloadItem[] = [
  {
    title: "Bond Hearing Preparation Checklist",
    description: "A comprehensive checklist of documents and evidence to gather before your immigration bond hearing.",
    icon: CheckSquare,
    category: "Immigration Bonds",
    fileType: "PDF",
    downloadUrl: "/downloads/bond-hearing-checklist.pdf"
  },
  {
    title: "Know Your Rights Card",
    description: "A pocket-sized card outlining your constitutional rights during an encounter with immigration enforcement.",
    icon: Shield,
    category: "Know Your Rights",
    fileType: "PDF"
  },
  {
    title: "Sponsor Responsibilities Guide",
    description: "Everything a potential court sponsor needs to know about their responsibilities, requirements, and what to expect.",
    icon: Users,
    category: "Immigration Bonds",
    fileType: "PDF",
    downloadUrl: "/downloads/sponsor-responsibilities-guide.pdf"
  },
  {
    title: "Family Emergency Plan Template",
    description: "A fillable template to help families prepare for immigration enforcement, including emergency contacts, children's information, document locations, and know your rights information.",
    icon: Heart,
    category: "Family Preparedness",
    fileType: "PDF (Fillable)",
    downloadUrl: "/downloads/family-emergency-plan.pdf",
    interactiveUrl: "/family-emergency-plan"
  },
  {
    title: "Immigration Court Process Overview",
    description: "A visual guide explaining the immigration court process from start to finish.",
    icon: Scale,
    category: "Court Process",
    fileType: "PDF"
  },
  {
    title: "Document Gathering Guide",
    description: "A guide to help you identify and organize the documents needed for various immigration applications.",
    icon: FileText,
    category: "General Immigration",
    fileType: "PDF"
  },
  {
    title: "Asylum Application Checklist",
    description: "Step-by-step checklist for preparing your asylum application and supporting documentation.",
    icon: BookOpen,
    category: "Asylum",
    fileType: "PDF",
    comingSoon: true
  },
  {
    title: "Naturalization Study Guide",
    description: "Study materials for the U.S. citizenship test, including civics questions and English practice.",
    icon: BookOpen,
    category: "Citizenship",
    fileType: "PDF",
    comingSoon: true
  }
];

const categories = Array.from(new Set(downloads.map(d => d.category)));

export default function Downloads() {
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
              <Download className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Downloadable Resources
            </h1>
            <p className="text-xl text-white/80">
              Free guides, checklists, and informational documents to help you navigate the immigration process.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Downloads Grid */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            {categories.map((category, categoryIndex) => (
              <div key={category} className="mb-12">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  className="text-2xl font-bold mb-6 pb-2 border-b"
                >
                  {category}
                </motion.h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {downloads
                    .filter(d => d.category === category)
                    .map((download, index) => {
                      const Icon = download.icon;
                      return (
                        <motion.div
                          key={download.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                          className={`bg-white rounded-xl border-2 p-6 ${
                            download.comingSoon 
                              ? "border-slate-100 opacity-60" 
                              : "border-slate-100 hover:border-primary/20 hover:shadow-md transition-all"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                              download.comingSoon ? "bg-slate-100" : "bg-primary/10"
                            }`}>
                              <Icon className={`w-6 h-6 ${download.comingSoon ? "text-slate-400" : "text-primary"}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-slate-900">
                                  {download.title}
                                </h3>
                                {download.comingSoon && (
                                  <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                                    Coming Soon
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-slate-600 mb-4">
                                {download.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                  {download.fileType}
                                </span>
                                {!download.comingSoon && (
                                  <div className="flex gap-2">
                                    {download.interactiveUrl && (
                                      <Link href={download.interactiveUrl}>
                                        <Button 
                                          size="sm" 
                                          className="gap-2"
                                        >
                                          <ExternalLink className="w-4 h-4" />
                                          Create Online
                                        </Button>
                                      </Link>
                                    )}
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      className="gap-2"
                                      asChild
                                    >
                                      {download.downloadUrl ? (
                                        <a href={download.downloadUrl} download>
                                          <Download className="w-4 h-4" />
                                          PDF
                                        </a>
                                      ) : (
                                        <span onClick={() => alert("This resource is coming soon. Please contact us for more information.")}>
                                          <Download className="w-4 h-4" />
                                          Download
                                        </span>
                                      )}
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Custom Resources */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">Need a Specific Resource?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                If you need information on a topic not covered by our current resources, let us know. We're constantly expanding our library based on client needs.
              </p>
              <Link href="/contact">
                <Button size="lg">
                  Request a Resource
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              Official Government Forms
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Links to official USCIS and EOIR forms and instructions.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "USCIS Forms", href: "https://www.uscis.gov/forms", description: "All USCIS immigration forms" },
                { title: "EOIR Forms", href: "https://www.justice.gov/eoir/forms", description: "Immigration court forms" },
                { title: "Fee Schedule", href: "https://www.uscis.gov/fees", description: "Current USCIS filing fees" },
                { title: "Processing Times", href: "https://egov.uscis.gov/processing-times/", description: "Check processing times" },
                { title: "Case Status", href: "https://egov.uscis.gov/casestatus/landing.do", description: "Track your case" },
                { title: "Court Locator", href: "https://www.justice.gov/eoir/eoir-immigration-court-listing", description: "Find immigration courts" }
              ].map((link, index) => (
                <motion.a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group bg-white rounded-lg border p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors">
                      {link.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm text-slate-600">{link.description}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-100 rounded-xl p-6 text-center">
              <p className="text-sm text-slate-600">
                <strong>Disclaimer:</strong> These resources are provided for informational purposes only and do not constitute legal advice. Immigration law is complex and constantly changing. For advice specific to your situation, please consult with a qualified immigration attorney.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Need Legal Assistance?</h2>
            <p className="text-xl text-white/80 mb-8">
              While these resources can help you understand the process, nothing replaces personalized legal advice. Schedule a consultation to discuss your case.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultation">
                <Button size="lg" variant="secondary" className="text-primary font-semibold">
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/resources">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Back to Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
