import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Shield, FileText, Scale, Users } from "lucide-react";

export default function Asylum() {
  return (
    <ServicePageTemplate
      titleKey="service.asylum.title"
      subtitleKey="service.asylum.subtitle"
      introKey="service.asylum.intro"
      heroImage="https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1920&q=80"
      sections={[
        {
          titleKey: "service.asylum.eligibility_title",
          descKey: "service.asylum.eligibility_desc",
        },
        {
          titleKey: "service.asylum.process_title",
          items: [
            {
              titleKey: "service.asylum.affirmative",
              descKey: "service.asylum.affirmative_desc",
              icon: <FileText className="h-6 w-6 text-primary" />,
            },
            {
              titleKey: "service.asylum.defensive",
              descKey: "service.asylum.defensive_desc",
              icon: <Shield className="h-6 w-6 text-primary" />,
            },
          ],
        },
        {
          titleKey: "service.asylum.appeals_title",
          descKey: "service.asylum.appeals_desc",
        },
      ]}
      ctaKey="service.asylum.cta"
      ctaLink="/consultation"
    />
  );
}
