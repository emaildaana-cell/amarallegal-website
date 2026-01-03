import React, { useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from "@/components/SEO";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import { CreditCard } from 'lucide-react';

export default function BondQuestionnaire() {
  const { t } = useLanguage();
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.current) return;

    setIsSubmitting(true);

    // Replace these with your actual EmailJS credentials
    // You can find these in your EmailJS dashboard: https://dashboard.emailjs.com/
    const SERVICE_ID = 'YOUR_SERVICE_ID';
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          toast.success('Questionnaire submitted successfully!');
          form.current?.reset();
        },
        (error) => {
          console.error('FAILED...', error.text);
          toast.error('Failed to submit questionnaire. Please try again.');
        },
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="container py-12 max-w-4xl">
      <SEO 
        titleKey="seo.bond.title"
        descriptionKey="seo.bond.desc"
      />
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif font-bold text-primary mb-4">{t("bond.title")}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("bond.subtitle")}
        </p>
      </div>

      <Card className="shadow-lg border-t-4 border-t-secondary">
        <CardHeader>
          <CardTitle className="text-2xl font-serif">{t("bond.detainee_info")}</CardTitle>
          <CardDescription>{t("bond.description")}</CardDescription>
        </CardHeader>
        <CardContent>

          <form ref={form} onSubmit={handleSubmit} className="space-y-8">
            {/* Detainee Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">{t("bond.full_name")}</Label>
                <Input id="fullName" name="fullName" required placeholder={t("bond.placeholder.name")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aNumber">{t("bond.a_number")}</Label>
                <Input id="aNumber" name="aNumber" required placeholder={t("bond.placeholder.a_number")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">{t("bond.dob")}</Label>
                <Input id="dob" name="dob" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="countryBirth">{t("bond.country_birth")}</Label>
                <Input id="countryBirth" name="countryBirth" required placeholder={t("bond.placeholder.country")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateEntry">{t("bond.date_entry")}</Label>
                <Input id="dateEntry" name="dateEntry" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mannerEntry">{t("bond.manner_entry")}</Label>
                <Input id="mannerEntry" name="mannerEntry" placeholder={t("bond.placeholder.manner")} />
              </div>
            </div>

            <Separator />

            {/* Detention Information Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-semibold text-primary">{t("bond.detention_info")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="detentionCenter">{t("bond.detention_center")}</Label>
                  <Input id="detentionCenter" name="detentionCenter" required placeholder={t("bond.placeholder.center")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateDetained">{t("bond.date_detained")}</Label>
                  <Input id="dateDetained" name="dateDetained" type="date" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="criminalHistory">{t("bond.criminal_history")}</Label>
                <Textarea id="criminalHistory" name="criminalHistory" placeholder={t("bond.placeholder.criminal")} className="min-h-[100px]" />
              </div>
            </div>

            <Separator />

            {/* Immigration History Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-semibold text-primary">{t("bond.immigration_history")}</h3>
              <div className="space-y-2">
                <Label htmlFor="deportations">{t("bond.deportations")}</Label>
                <Textarea id="deportations" name="deportations" placeholder={t("bond.placeholder.deportations")} className="min-h-[80px]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pendingApplications">{t("bond.pending_applications")}</Label>
                <Textarea id="pendingApplications" name="pendingApplications" placeholder={t("bond.placeholder.pending")} className="min-h-[80px]" />
              </div>
            </div>

            <Separator />

            {/* Community Ties Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-semibold text-primary">{t("bond.community_ties")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="residenceLength">{t("bond.residence_length")}</Label>
                  <Input id="residenceLength" name="residenceLength" placeholder={t("bond.placeholder.residence")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="propertyOwnership">{t("bond.property_ownership")}</Label>
                  <Input id="propertyOwnership" name="propertyOwnership" placeholder={t("bond.placeholder.property")} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="familyTies">{t("bond.family_ties")}</Label>
                <Textarea id="familyTies" name="familyTies" placeholder={t("bond.placeholder.family")} className="min-h-[100px]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employmentHistory">{t("bond.employment_history")}</Label>
                <Textarea id="employmentHistory" name="employmentHistory" placeholder={t("bond.placeholder.employment")} className="min-h-[100px]" />
              </div>
            </div>

            <Separator />

            {/* Health & Humanitarian Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-semibold text-primary">{t("bond.health_humanitarian")}</h3>
              <div className="space-y-2">
                <Label htmlFor="medicalConditions">{t("bond.medical_conditions")}</Label>
                <Textarea id="medicalConditions" name="medicalConditions" placeholder={t("bond.placeholder.medical")} className="min-h-[80px]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialCircumstances">{t("bond.special_circumstances")}</Label>
                <Textarea id="specialCircumstances" name="specialCircumstances" placeholder={t("bond.placeholder.special")} className="min-h-[80px]" />
              </div>
            </div>

            <Separator />

            {/* Sponsor Information Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-semibold text-primary">{t("bond.sponsor_info")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sponsorName">{t("bond.sponsor_name")}</Label>
                  <Input id="sponsorName" name="sponsorName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sponsorRelation">{t("bond.sponsor_relation")}</Label>
                  <Input id="sponsorRelation" name="sponsorRelation" placeholder={t("bond.placeholder.relation")} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sponsorStatus">{t("bond.sponsor_status")}</Label>
                  <Input id="sponsorStatus" name="sponsorStatus" placeholder={t("bond.placeholder.status")} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sponsorIncome">{t("bond.sponsor_income")}</Label>
                  <Input id="sponsorIncome" name="sponsorIncome" type="number" placeholder={t("bond.placeholder.income")} />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-lg px-8">
                {isSubmitting ? t("bond.sending") : t("bond.submit")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
