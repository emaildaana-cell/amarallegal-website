import ServicePageTemplate from "@/components/ServicePageTemplate";
import { Unlock, AlertTriangle, Shield, DollarSign } from "lucide-react";

export default function BondHearings() {
  return (
    <ServicePageTemplate
      titleKey="service.bond.title"
      subtitleKey="service.bond.subtitle"
      introKey="service.bond.intro"
      heroImage="https://images.unsplash.com/photo-1453945619913-79ec89a82c51?auto=format&fit=crop&w=1920&q=80"
      sections={[
        {
          titleKey: "service.bond.eligibility_title",
          descKey: "service.bond.eligibility_desc",
        },
        {
          titleKey: "service.bond.factors_title",
          items: [
            {
              titleKey: "service.bond.flight_risk",
              descKey: "service.bond.flight_risk_desc",
              icon: <AlertTriangle className="h-6 w-6 text-primary" />,
            },
            {
              titleKey: "service.bond.danger",
              descKey: "service.bond.danger_desc",
              icon: <Shield className="h-6 w-6 text-primary" />,
            },
          ],
        },
        {
          titleKey: "service.bond.amount_title",
          descKey: "service.bond.amount_desc",
        },
      ]}
      ctaKey="service.bond.cta"
      ctaLink="/bond-questionnaire"
    />
  );
}
