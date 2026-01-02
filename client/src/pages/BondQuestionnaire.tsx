import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function BondQuestionnaire() {
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would submit the data to a backend
    alert("Thank you for submitting the questionnaire. We will review your information and contact you shortly.");
  };

  return (
    <div className="container py-12 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif font-bold text-primary mb-4">{t("bond.title")}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("bond.subtitle")}
        </p>
      </div>

      <Card className="shadow-lg border-t-4 border-t-secondary">
        <CardHeader>
          <CardTitle className="text-2xl font-serif">{t("bond.detainee_info")}</CardTitle>
          <CardDescription>Please provide accurate details about the person currently detained.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Detainee Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">{t("bond.full_name")}</Label>
                <Input id="fullName" required placeholder="e.g. Juan Perez" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aNumber">{t("bond.a_number")}</Label>
                <Input id="aNumber" required placeholder="A-123-456-789" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">{t("bond.dob")}</Label>
                <Input id="dob" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="countryBirth">{t("bond.country_birth")}</Label>
                <Input id="countryBirth" required placeholder="e.g. Brazil" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateEntry">{t("bond.date_entry")}</Label>
                <Input id="dateEntry" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mannerEntry">{t("bond.manner_entry")}</Label>
                <Input id="mannerEntry" placeholder="e.g. Visa, Border Crossing" />
              </div>
            </div>

            <Separator />

            {/* Detention Information Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-semibold text-primary">{t("bond.detention_info")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="detentionCenter">{t("bond.detention_center")}</Label>
                  <Input id="detentionCenter" required placeholder="e.g. Krome Detention Center" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateDetained">{t("bond.date_detained")}</Label>
                  <Input id="dateDetained" type="date" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="criminalHistory">{t("bond.criminal_history")}</Label>
                <Textarea id="criminalHistory" placeholder="Please list any arrests or convictions..." className="min-h-[100px]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="familyTies">{t("bond.family_ties")}</Label>
                <Textarea id="familyTies" placeholder="List family members currently in the U.S. (Relationship and Status)" className="min-h-[100px]" />
              </div>
            </div>

            <Separator />

            {/* Sponsor Information Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-semibold text-primary">{t("bond.sponsor_info")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sponsorName">{t("bond.sponsor_name")}</Label>
                  <Input id="sponsorName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sponsorRelation">{t("bond.sponsor_relation")}</Label>
                  <Input id="sponsorRelation" placeholder="e.g. Brother, Spouse" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sponsorStatus">{t("bond.sponsor_status")}</Label>
                  <Input id="sponsorStatus" placeholder="e.g. U.S. Citizen, Green Card Holder" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sponsorIncome">{t("bond.sponsor_income")}</Label>
                  <Input id="sponsorIncome" type="number" placeholder="Annual Income USD" />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" size="lg" className="w-full md:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-lg px-8">
                {t("bond.submit")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
