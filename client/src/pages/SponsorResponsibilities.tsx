import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, AlertTriangle, FileText, ArrowRight } from "lucide-react";

export default function SponsorResponsibilities() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
              Sponsor Responsibilities
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Understanding your role and obligations when sponsoring a detainee for an immigration bond.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="lead text-xl text-foreground font-medium mb-6">
              Serving as a sponsor for an immigration bond is a serious commitment. It involves more than just paying the bond amount; it requires ensuring the detainee complies with all immigration court requirements.
            </p>
            <p>
              When you sign as a sponsor (obligor), you are entering into a contract with the Department of Homeland Security (DHS). You are guaranteeing that the detained individual will appear for all scheduled court hearings and will comply with any orders from the immigration judge.
            </p>
          </div>
        </div>
      </section>

      {/* Key Responsibilities */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-serif font-bold text-primary mb-12 text-center">
            Key Responsibilities of a Sponsor
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background p-8 rounded-lg shadow-sm border border-border/50">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-green-100 text-green-700 p-2 rounded-full">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Ensure Court Appearance</h3>
                  <p className="text-muted-foreground">
                    The most critical responsibility is ensuring the alien appears at every scheduled immigration court hearing. Failure to appear can result in the bond being breached (forfeited) and the alien being ordered removed in absentia.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background p-8 rounded-lg shadow-sm border border-border/50">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-green-100 text-green-700 p-2 rounded-full">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Update Address Changes</h3>
                  <p className="text-muted-foreground">
                    You must notify DHS and the Immigration Court of any change in the alien's address within 5 days of the move. This ensures all hearing notices are received properly.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background p-8 rounded-lg shadow-sm border border-border/50">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-green-100 text-green-700 p-2 rounded-full">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Financial Liability</h3>
                  <p className="text-muted-foreground">
                    As the obligor, you are financially responsible for the bond money. If the terms of the bond are violated, the money paid may be forfeited to the government and will not be returned.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background p-8 rounded-lg shadow-sm border border-border/50">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-green-100 text-green-700 p-2 rounded-full">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Ensure Departure (if ordered)</h3>
                  <p className="text-muted-foreground">
                    If the immigration judge orders the alien to be removed (deported), you must ensure they surrender to DHS for removal. Failure to do so is a breach of the bond conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risks Section */}
      <section className="py-16 bg-background">
        <div className="container max-w-4xl">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-8 w-8 text-amber-600 shrink-0" />
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-amber-800">Risks of Bond Breach</h3>
                <p className="text-amber-900/80">
                  A bond breach occurs when the alien violates the conditions of their release, most commonly by failing to appear in court. If a breach is declared:
                </p>
                <ul className="list-disc list-inside space-y-2 text-amber-900/80 ml-2">
                  <li>The bond money is forfeited to the U.S. government.</li>
                  <li>The alien becomes a fugitive and is subject to immediate arrest and detention.</li>
                  <li>Future bond eligibility may be negatively impacted.</li>
                  <li>It is extremely difficult, often impossible, to recover forfeited bond money.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Needed */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">
            Documents Required for Sponsors
          </h2>
          <div className="bg-background rounded-lg shadow-sm border border-border/50 p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Proof of Status
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                  <li>U.S. Passport or Birth Certificate</li>
                  <li>Permanent Resident Card (Green Card)</li>
                  <li>Naturalization Certificate</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Proof of Income/Assets
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                  <li>Recent Tax Returns (last 1-3 years)</li>
                  <li>Recent Pay Stubs</li>
                  <li>Employment Verification Letter</li>
                  <li>Bank Statements</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Proof of Address
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                  <li>Utility Bills (Water, Electric, Gas)</li>
                  <li>Lease Agreement or Mortgage Statement</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Identification
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                  <li>Valid State Driver's License or ID</li>
                  <li>Social Security Card</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            Ready to Proceed?
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            If you are ready to sponsor a detainee, please complete our Bond Questionnaire to begin the evaluation process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/bond-questionnaire">
              <Button size="lg" variant="secondary" className="font-bold text-primary">
                Start Bond Questionnaire
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
