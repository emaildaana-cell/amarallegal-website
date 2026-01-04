import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Gavel, FileWarning, Scale, Building2 } from "lucide-react";

export default function FederalLitigation() {
  return (
    <ServicePageTemplate
      titleKey="service.federal.title"
      subtitleKey="service.federal.subtitle"
      introKey="service.federal.intro"
      heroImage="https://images.unsplash.com/photo-1564596823821-79b97151055e?auto=format&fit=crop&w=1920&q=80"
      sections={[
        {
          titleKey: "service.federal.types_title",
          items: [
            {
              titleKey: "service.federal.mandamus",
              descKey: "service.federal.mandamus_desc",
              icon: <Gavel className="h-6 w-6 text-primary" />,
            },
            {
              titleKey: "service.federal.apa",
              descKey: "service.federal.apa_desc",
              icon: <FileWarning className="h-6 w-6 text-primary" />,
            },
            {
              titleKey: "service.federal.habeas",
              descKey: "service.federal.habeas_desc",
              icon: <Scale className="h-6 w-6 text-primary" />,
            },
          ],
        },
        {
          titleKey: "service.federal.process_title",
          descKey: "service.federal.process_desc",
        },
      ]}
      ctaKey="service.federal.cta"
      ctaLink="/consultation"
    />
  );
}
