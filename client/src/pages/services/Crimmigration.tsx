import ServicePageTemplate from "@/components/ServicePageTemplate";
import { AlertOctagon, Scale, Pill, Handshake } from "lucide-react";

export default function Crimmigration() {
  return (
    <ServicePageTemplate
      titleKey="service.crimmigration.title"
      subtitleKey="service.crimmigration.subtitle"
      introKey="service.crimmigration.intro"
      heroImage="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1920&q=80"
      sections={[
        {
          titleKey: "service.crimmigration.consequences_title",
          items: [
            {
              titleKey: "service.crimmigration.aggravated",
              descKey: "service.crimmigration.aggravated_desc",
              icon: <AlertOctagon className="h-6 w-6 text-primary" />,
            },
            {
              titleKey: "service.crimmigration.cimt",
              descKey: "service.crimmigration.cimt_desc",
              icon: <Scale className="h-6 w-6 text-primary" />,
            },
            {
              titleKey: "service.crimmigration.drug",
              descKey: "service.crimmigration.drug_desc",
              icon: <Pill className="h-6 w-6 text-primary" />,
            },
          ],
        },
        {
          titleKey: "service.crimmigration.defense_title",
          descKey: "service.crimmigration.defense_desc",
        },
      ]}
      ctaKey="service.crimmigration.cta"
      ctaLink="/consultation"
    />
  );
}
