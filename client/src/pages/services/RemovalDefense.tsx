import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Shield, Scale, FileCheck, Plane } from "lucide-react";

export default function RemovalDefense() {
  return (
    <ServicePageTemplate
      titleKey="service.removal.title"
      subtitleKey="service.removal.subtitle"
      introKey="service.removal.intro"
      heroImage="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=80"
      sections={[
        {
          titleKey: "service.removal.what_title",
          descKey: "service.removal.what_desc",
        },
        {
          titleKey: "service.removal.forms_title",
          items: [
            {
              titleKey: "service.removal.cancellation",
              descKey: "service.removal.cancellation_desc",
              icon: <Shield className="h-6 w-6 text-primary" />,
            },
            {
              titleKey: "service.removal.asylum",
              descKey: "service.removal.asylum_desc",
              icon: <Scale className="h-6 w-6 text-primary" />,
            },
            {
              titleKey: "service.removal.adjustment",
              descKey: "service.removal.adjustment_desc",
              icon: <FileCheck className="h-6 w-6 text-primary" />,
            },
            {
              titleKey: "service.removal.voluntary",
              descKey: "service.removal.voluntary_desc",
              icon: <Plane className="h-6 w-6 text-primary" />,
            },
          ],
        },
        {
          titleKey: "service.removal.why_title",
          descKey: "service.removal.why_desc",
        },
      ]}
      ctaKey="service.removal.cta"
      ctaLink="/consultation"
    />
  );
}
