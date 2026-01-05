import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Heart, Users, FileCheck, Globe } from "lucide-react";

export default function FamilyPetitions() {
  return (
    <ServicePageTemplate
      titleKey="service.family.title"
      subtitleKey="service.family.subtitle"
      introKey="service.family.intro"
      heroImage="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1920&q=80"
      sections={[
        {
          titleKey: "service.family.types_title",
          items: [
            {
              titleKey: "service.family.immediate",
              descKey: "service.family.immediate_desc",
              icon: <Heart className="h-6 w-6 text-primary" />,
            },
            {
              titleKey: "service.family.preference",
              descKey: "service.family.preference_desc",
              icon: <Users className="h-6 w-6 text-primary" />,
            },
          ],
        },
        {
          titleKey: "service.family.adjustment_title",
          descKey: "service.family.adjustment_desc",
        },
      ]}
      ctaKey="service.family.cta"
      ctaLink="/consultation"
      seoTitle="Family Petitions"
      seoDescription="Family-based immigration petitions and green card applications. Reunite with your loved ones through proper immigration channels."
      seoKeywords="family petition, green card, family immigration, spouse visa"
      canonicalUrl="/services/family-petitions"
    />
  );
}
