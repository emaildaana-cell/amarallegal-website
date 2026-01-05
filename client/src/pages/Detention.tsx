import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Phone, Search, FileText, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "wouter";
import SEO from "@/components/SEO";

export default function Detention() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="ICE Detention Information"
        description="Learn about ICE detention, your rights when detained, and how to get legal help. Immediate assistance available 24/7 for detained individuals and families."
        keywords="ICE detention, immigration detention, detained by ICE, detention rights"
        canonicalUrl="/detention"
      />
      {/* Hero Section */}
      <section className="bg-destructive text-destructive-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <AlertTriangle className="h-16 w-16" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            {t("detention.hero.title")}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            {t("detention.hero.subtitle")}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        {/* Step 1 */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-start gap-4 md:gap-6">
            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">1</div>
            <div className="space-y-4">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">{t("detention.step1.title")}</h2>
              <p className="text-lg text-muted-foreground">{t("detention.step1.desc")}</p>
              <Card className="bg-muted/30 border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">{t("detention.step1.know_title")}</h3>
                  <ul className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span>{t(`detention.step1.point${i}`)}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-start gap-4 md:gap-6">
            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">2</div>
            <div className="space-y-4">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">{t("detention.step2.title")}</h2>
              <p className="text-lg text-muted-foreground">{t("detention.step2.desc")}</p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t("detention.step2.call_title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{t("detention.step2.call_desc")}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t("detention.step2.no_call_title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{t("detention.step2.no_call_desc")}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <p className="text-yellow-800 font-medium flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                  {t("detention.step2.warning")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-start gap-4 md:gap-6">
            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">3</div>
            <div className="space-y-4 w-full">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">{t("detention.step3.title")}</h2>
              <p className="text-lg text-muted-foreground">{t("detention.step3.desc")}</p>
              
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6 text-center space-y-6">
                  <div>
                    <h3 className="font-bold text-xl mb-2">{t("detention.step3.hotline_title")}</h3>
                    <a href="tel:3055759531" className="text-3xl md:text-4xl font-bold text-primary hover:underline flex items-center justify-center gap-3">
                      <Phone className="h-8 w-8" />
                      (305) 575-9531
                    </a>
                    <p className="text-muted-foreground mt-2">{t("detention.step3.available")}</p>
                  </div>
                  
                  <div className="text-left bg-background p-6 rounded-lg border">
                    <h4 className="font-semibold mb-3">{t("detention.step3.what_to_tell")}</h4>
                    <ul className="space-y-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span>{t(`detention.step3.point${i}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Step 4 & 5 - Tools */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">4</div>
              <h2 className="font-serif text-2xl font-bold text-primary">{t("detention.step4.title")}</h2>
            </div>
            <p className="text-muted-foreground">{t("detention.step4.desc")}</p>
            <Button asChild className="w-full" variant="outline">
              <a href="https://locator.ice.gov/odls/" target="_blank" rel="noopener noreferrer">
                <Search className="mr-2 h-4 w-4" />
                {t("detention.step4.button")}
              </a>
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">5</div>
              <h2 className="font-serif text-2xl font-bold text-primary">{t("detention.step5.title")}</h2>
            </div>
            <p className="text-muted-foreground">{t("detention.step5.desc")}</p>
            <Button asChild className="w-full" variant="outline">
              <a href="https://portal.eoir.justice.gov/" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                {t("detention.step5.button")}
              </a>
            </Button>
          </div>
        </div>

        {/* Do's and Don'ts */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6" />
                {t("detention.dos.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i} className="flex items-start gap-2 text-green-900">
                    <span className="font-bold">•</span>
                    <span>{t(`detention.dos.point${i}`)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center gap-2">
                <XCircle className="h-6 w-6" />
                {t("detention.donts.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i} className="flex items-start gap-2 text-red-900">
                    <span className="font-bold">•</span>
                    <span>{t(`detention.donts.point${i}`)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h2 className="font-serif text-3xl font-bold text-primary mb-6">{t("detention.cta.title")}</h2>
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/contact">{t("detention.cta.button")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
