import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { FileText, ExternalLink, Download, BookOpen } from "lucide-react";

export default function Resources() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
              {t("nav.resources")}
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Helpful information, forms, and guides to navigate the immigration process.
            </p>
          </div>
        </div>
      </section>

      {/* Official Forms Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl font-serif font-bold text-primary mb-8 flex items-center gap-3">
            <FileText className="h-8 w-8" />
            Official Immigration Forms
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                code: "I-589",
                title: "Application for Asylum and for Withholding of Removal",
                desc: "Used to apply for asylum in the United States and for withholding of removal.",
                link: "https://www.uscis.gov/i-589"
              },
              {
                code: "EOIR-42B",
                title: "Application for Cancellation of Removal (Non-LPR)",
                desc: "For certain non-permanent residents to apply for cancellation of removal.",
                link: "https://www.justice.gov/eoir/page/file/eoir-42b/download"
              },
              {
                code: "I-130",
                title: "Petition for Alien Relative",
                desc: "For a citizen or lawful permanent resident of the United States to establish the relationship to certain alien relatives who wish to immigrate to the United States.",
                link: "https://www.uscis.gov/i-130"
              },
              {
                code: "I-485",
                title: "Application to Register Permanent Residence",
                desc: "Used to apply for lawful permanent resident status if you are in the United States.",
                link: "https://www.uscis.gov/i-485"
              },
              {
                code: "I-765",
                title: "Application for Employment Authorization",
                desc: "Used to request an Employment Authorization Document (EAD).",
                link: "https://www.uscis.gov/i-765"
              },
              {
                code: "AR-11",
                title: "Alien's Change of Address Card",
                desc: "Used to report a change of address to USCIS.",
                link: "https://www.uscis.gov/ar-11"
              }
            ].map((form, i) => (
              <div key={i} className="bg-background border border-border/50 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-secondary/10 text-secondary-foreground font-bold px-3 py-1 rounded text-sm">
                    {form.code}
                  </span>
                  <a href={form.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
                <h3 className="font-bold text-lg mb-2">{form.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{form.desc}</p>
                <a href={form.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="w-full">
                    Download Form <Download className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-serif font-bold text-primary mb-8 flex items-center gap-3">
            <BookOpen className="h-8 w-8" />
            Helpful External Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background p-8 rounded-lg shadow-sm border border-border/50">
              <h3 className="text-xl font-bold text-primary mb-4">Government Agencies</h3>
              <ul className="space-y-4">
                <li>
                  <a href="https://www.uscis.gov/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground hover:text-primary font-medium">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    U.S. Citizenship and Immigration Services (USCIS)
                  </a>
                  <p className="text-sm text-muted-foreground ml-6 mt-1">Check case status, processing times, and download forms.</p>
                </li>
                <li>
                  <a href="https://www.ice.gov/locator" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground hover:text-primary font-medium">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    ICE Detainee Locator
                  </a>
                  <p className="text-sm text-muted-foreground ml-6 mt-1">Find a detained person in ICE custody.</p>
                </li>
                <li>
                  <a href="https://acis.eoir.justice.gov/en/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground hover:text-primary font-medium">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    Immigration Court Automated Case Information
                  </a>
                  <p className="text-sm text-muted-foreground ml-6 mt-1">Check your next hearing date and case status.</p>
                </li>
              </ul>
            </div>

            <div className="bg-background p-8 rounded-lg shadow-sm border border-border/50">
              <h3 className="text-xl font-bold text-primary mb-4">Know Your Rights</h3>
              <ul className="space-y-4">
                <li>
                  <a href="https://www.aclu.org/know-your-rights/immigrants-rights" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground hover:text-primary font-medium">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    ACLU - Immigrants' Rights
                  </a>
                  <p className="text-sm text-muted-foreground ml-6 mt-1">Information about your rights when interacting with law enforcement.</p>
                </li>
                <li>
                  <a href="https://www.ilrc.org/red-cards" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground hover:text-primary font-medium">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    ILRC Red Cards
                  </a>
                  <p className="text-sm text-muted-foreground ml-6 mt-1">Cards to help you assert your rights in various situations.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Firm Documents */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl font-serif font-bold text-primary mb-8 flex items-center gap-3">
            <FileText className="h-8 w-8" />
            Firm Documents & Questionnaires
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-xl mb-2">Bond Questionnaire</h3>
                <p className="text-muted-foreground mb-4">
                  Required for sponsors evaluating eligibility for an immigration bond. Please complete this before your consultation regarding a detained individual.
                </p>
              </div>
              <Link href="/bond-questionnaire">
                <Button className="w-full">Go to Questionnaire</Button>
              </Link>
            </div>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-xl mb-2">Client Intake Form</h3>
                <p className="text-muted-foreground mb-4">
                  General intake form for new clients. Helps our attorneys understand your case background before the initial consultation.
                </p>
              </div>
              <Link href="/client-intake">
                <Button className="w-full">Go to Intake Form</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
