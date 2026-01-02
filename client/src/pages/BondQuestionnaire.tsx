import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function BondQuestionnaire() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Questionnaire Submitted",
      description: "Thank you for providing the bond information. We will review it and contact you shortly.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container max-w-3xl">
        <div className="mb-8 text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary">
            {t("bond.title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("bond.subtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Detainee Information */}
          <Card className="border-t-4 border-t-secondary shadow-lg">
            <CardHeader>
              <CardTitle>{t("bond.detainee_info")}</CardTitle>
              <CardDescription>Information about the person currently detained.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="detaineeName">{t("bond.full_name")}</Label>
                  <Input id="detaineeName" name="detaineeName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aNumber">{t("bond.a_number")}</Label>
                  <Input id="aNumber" name="aNumber" placeholder="A-123-456-789" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">{t("bond.dob")}</Label>
                  <Input id="dob" name="dob" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="countryBirth">{t("bond.country_birth")}</Label>
                  <Input id="countryBirth" name="countryBirth" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateEntry">{t("bond.date_entry")}</Label>
                  <Input id="dateEntry" name="dateEntry" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mannerEntry">{t("bond.manner_entry")}</Label>
                  <Select name="mannerEntry">
                    <SelectTrigger>
                      <SelectValue placeholder="Select manner of entry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visa">With a Visa</SelectItem>
                      <SelectItem value="border">Crossed Border (No Inspection)</SelectItem>
                      <SelectItem value="parole">Parole</SelectItem>
                      <SelectItem value="refugee">Refugee/Asylee</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detention Information */}
          <Card className="border-t-4 border-t-secondary shadow-lg">
            <CardHeader>
              <CardTitle>{t("bond.detention_info")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="detentionCenter">{t("bond.detention_center")}</Label>
                  <Input id="detentionCenter" name="detentionCenter" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateDetained">{t("bond.date_detained")}</Label>
                  <Input id="dateDetained" name="dateDetained" type="date" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="criminalHistory">{t("bond.criminal_history")}</Label>
                  <Input id="criminalHistory" name="criminalHistory" placeholder="List any arrests or convictions..." />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="familyTies">{t("bond.family_ties")}</Label>
                  <Input id="familyTies" name="familyTies" placeholder="List family members in the U.S. and their status..." />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sponsor Information */}
          <Card className="border-t-4 border-t-secondary shadow-lg">
            <CardHeader>
              <CardTitle>{t("bond.sponsor_info")}</CardTitle>
              <CardDescription>Information about the person who will pay the bond and ensure court attendance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sponsorName">{t("bond.sponsor_name")}</Label>
                  <Input id="sponsorName" name="sponsorName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sponsorRelation">{t("bond.sponsor_relation")}</Label>
                  <Input id="sponsorRelation" name="sponsorRelation" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sponsorStatus">{t("bond.sponsor_status")}</Label>
                  <Select name="sponsorStatus">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usc">U.S. Citizen</SelectItem>
                      <SelectItem value="lpr">Permanent Resident (Green Card)</SelectItem>
                      <SelectItem value="work">Work Visa</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sponsorIncome">{t("bond.sponsor_income")}</Label>
                  <Input id="sponsorIncome" name="sponsorIncome" type="number" placeholder="$" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full text-lg py-6 font-bold" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : t("bond.submit")}
          </Button>
        </form>
      </div>
    </div>
  );
}
