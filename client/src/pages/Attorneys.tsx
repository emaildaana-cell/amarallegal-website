import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import SEO from "@/components/SEO";

export default function Attorneys() {
  const { t } = useLanguage();

  const attorneys = [
    {
      name: "Ana Paola Amaral-Muschlitz",
      role: t("attorneys.ana.role"),
      bio: t("attorneys.ana.bio"),
      image: "/images/ana-paola.webp"
    },
    {
      name: "Reggie Smith",
      role: t("attorneys.reggie.role"),
      bio: t("attorneys.reggie.bio"),
      image: "/images/reggie-smith.webp"
    },
    {
      name: "Balaiz Vigh",
      role: t("attorneys.balaiz.role"),
      bio: t("attorneys.balaiz.bio"),
      image: "/images/balaiz-vigh.webp"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Our Attorneys"
        description="Meet our experienced immigration attorneys specializing in removal defense, asylum cases, and immigration bonds. Dedicated legal team serving clients nationwide."
        keywords="immigration attorneys, removal defense lawyers, asylum attorneys, immigration bond lawyers"
        canonicalUrl="/attorneys"
      />
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
          <h2 className="text-3xl font-bold text-center mb-12 font-serif text-primary">{t("attorneys.values.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-2xl">
                ⚖️
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("attorneys.values.justice")}</h3>
              <p className="text-muted-foreground">{t("attorneys.values.justice_desc")}</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-2xl">
                ❤️
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("attorneys.values.compassion")}</h3>
              <p className="text-muted-foreground">{t("attorneys.values.compassion_desc")}</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-2xl">
                🏆
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("attorneys.values.excellence")}</h3>
              <p className="text-muted-foreground">{t("attorneys.values.excellence_desc")}</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-2xl">
                🤝
              </div>
              <h3 className="text-xl font-semibold mb-3">{t("attorneys.values.community")}</h3>
              <p className="text-muted-foreground">{t("attorneys.values.community_desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">{t("attorneys.cta.title")}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {t("attorneys.cta.desc")}
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="font-semibold text-lg px-8">
              {t("attorneys.cta.button")}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
