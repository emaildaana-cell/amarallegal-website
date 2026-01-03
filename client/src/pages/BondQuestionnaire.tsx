import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from "@/components/SEO";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { AlertTriangle, CheckCircle2, Shield, Users, FileText, Heart, UserCheck, Phone, Loader2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function BondQuestionnaire() {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    // Detainee Information
    detaineeName: '',
    aNumber: '',
    dateOfBirth: '',
    countryOfBirth: '',
    dateOfEntry: '',
    mannerOfEntry: '',
    
    // Detention Information
    detentionCenter: '',
    dateDetained: '',
    
    // Eligibility Check
    hasAggravatedFelony: false,
    hasDrugCrimes: false,
    detainedAtPortOfEntry: false,
    hasPriorDeportation: false,
    hasFinalRemovalOrder: false,
    
    // Criminal History & Rehabilitation
    criminalHistory: '',
    rehabilitationEvidence: '',
    hasCharacterLetters: false,
    characterLettersCount: 0,
    
    // Community Ties
    familyTiesInUS: '',
    usResidenceLength: '',
    hasFixedAddress: false,
    currentAddress: '',
    employmentHistory: '',
    currentEmployer: '',
    hasPropertyInUS: false,
    propertyDetails: '',
    
    // Immigration History
    previousDeportations: '',
    pendingApplications: '',
    eligibleForRelief: false,
    reliefType: '',
    
    // Health & Humanitarian
    medicalConditions: '',
    specialCircumstances: '',
    
    // Sponsor Information
    sponsorName: '',
    sponsorRelation: '',
    sponsorStatus: '',
    sponsorIncome: '',
    sponsorPhone: '',
    sponsorEmail: '',
    sponsorUnderstandsRisk: false,
    
    // Contact Information
    contactPhone: '',
    contactEmail: '',
    preferredLanguage: language,
  });

  const submitMutation = trpc.bond.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success(t("bond.success_message") || 'Questionnaire submitted successfully! We will contact you soon.');
    },
    onError: (error) => {
      console.error('Submission failed:', error);
      toast.error(t("bond.error_message") || 'Failed to submit questionnaire. Please try again.');
    },
    onSettled: () => {
      setIsSubmitting(false);
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.detaineeName) {
      toast.error('Please enter the detainee name');
      return;
    }

    setIsSubmitting(true);
    submitMutation.mutate({
      ...formData,
      characterLettersCount: formData.hasCharacterLetters ? formData.characterLettersCount : 0,
      preferredLanguage: language,
    });
  };

  // Check if any eligibility disqualifiers are selected
  const hasEligibilityIssues = formData.hasAggravatedFelony || formData.hasDrugCrimes || 
    formData.detainedAtPortOfEntry || formData.hasPriorDeportation || formData.hasFinalRemovalOrder;

  if (submitted) {
    return (
      <div className="container py-12 max-w-4xl">
        <Card className="shadow-lg border-t-4 border-t-green-500">
          <CardContent className="pt-12 pb-12 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">
              {t("bond.submission_received") || "Questionnaire Received"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              {t("bond.submission_message") || "Thank you for submitting your bond questionnaire. Our legal team will review your information and contact you within 24-48 hours."}
            </p>
            <div className="bg-secondary/10 rounded-lg p-6 max-w-md mx-auto">
              <p className="font-semibold text-primary mb-2">{t("bond.urgent_contact") || "For urgent matters, call:"}</p>
              <a href="tel:18442625442" className="text-2xl font-bold text-secondary hover:underline">
                1-844-ICE-FREE
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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

      {/* Important Warning */}
      <Card className="mb-8 border-amber-500 bg-amber-50 dark:bg-amber-950/20">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-2">
                {t("bond.warning_title") || "Important: You Only Get One Chance"}
              </h3>
              <p className="text-amber-700 dark:text-amber-300 text-sm">
                {t("bond.warning_message") || "If the judge denies your bond request, you will remain in detention for the duration of your removal case. This questionnaire helps us prepare the strongest possible case for your one opportunity at a bond hearing."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Detainee Information */}
        <Card className="shadow-lg">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <div>
                <CardTitle className="text-xl font-serif">{t("bond.detainee_info")}</CardTitle>
                <CardDescription>{t("bond.description")}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="detaineeName">{t("bond.full_name")} *</Label>
                <Input 
                  id="detaineeName" 
                  name="detaineeName" 
                  value={formData.detaineeName}
                  onChange={handleInputChange}
                  required 
                  placeholder={t("bond.placeholder.name")} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aNumber">{t("bond.a_number")}</Label>
                <Input 
                  id="aNumber" 
                  name="aNumber" 
                  value={formData.aNumber}
                  onChange={handleInputChange}
                  placeholder={t("bond.placeholder.a_number")} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">{t("bond.dob")}</Label>
                <Input 
                  id="dateOfBirth" 
                  name="dateOfBirth" 
                  type="date" 
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="countryOfBirth">{t("bond.country_birth")}</Label>
                <Input 
                  id="countryOfBirth" 
                  name="countryOfBirth" 
                  value={formData.countryOfBirth}
                  onChange={handleInputChange}
                  placeholder={t("bond.placeholder.country")} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfEntry">{t("bond.date_entry")}</Label>
                <Input 
                  id="dateOfEntry" 
                  name="dateOfEntry" 
                  type="date" 
                  value={formData.dateOfEntry}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mannerOfEntry">{t("bond.manner_entry")}</Label>
                <Input 
                  id="mannerOfEntry" 
                  name="mannerOfEntry" 
                  value={formData.mannerOfEntry}
                  onChange={handleInputChange}
                  placeholder={t("bond.placeholder.manner")} 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Detention Information */}
        <Card className="shadow-lg">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <CardTitle className="text-xl font-serif">{t("bond.detention_info")}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="detentionCenter">{t("bond.detention_center")}</Label>
                <Input 
                  id="detentionCenter" 
                  name="detentionCenter" 
                  value={formData.detentionCenter}
                  onChange={handleInputChange}
                  placeholder={t("bond.placeholder.center")} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateDetained">{t("bond.date_detained")}</Label>
                <Input 
                  id="dateDetained" 
                  name="dateDetained" 
                  type="date" 
                  value={formData.dateDetained}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Eligibility Check */}
        <Card className={`shadow-lg ${hasEligibilityIssues ? 'border-red-500' : ''}`}>
          <CardHeader className="bg-red-50 dark:bg-red-950/20">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <div>
                <CardTitle className="text-xl font-serif text-red-800 dark:text-red-200">
                  {t("bond.eligibility_check")}
                </CardTitle>
                <CardDescription className="text-red-600 dark:text-red-300">
                  {t("bond.eligibility_warning") || "Answer honestly - these factors may affect bond eligibility"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="hasAggravatedFelony" 
                checked={formData.hasAggravatedFelony}
                onCheckedChange={(checked) => handleCheckboxChange('hasAggravatedFelony', checked as boolean)}
              />
              <Label htmlFor="hasAggravatedFelony" className="text-sm leading-relaxed cursor-pointer">
                {t("bond.criminal_convictions")}
              </Label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="hasDrugCrimes" 
                checked={formData.hasDrugCrimes}
                onCheckedChange={(checked) => handleCheckboxChange('hasDrugCrimes', checked as boolean)}
              />
              <Label htmlFor="hasDrugCrimes" className="text-sm leading-relaxed cursor-pointer">
                {t("bond.drug_crimes") || "Drug-related criminal convictions?"}
              </Label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="detainedAtPortOfEntry" 
                checked={formData.detainedAtPortOfEntry}
                onCheckedChange={(checked) => handleCheckboxChange('detainedAtPortOfEntry', checked as boolean)}
              />
              <Label htmlFor="detainedAtPortOfEntry" className="text-sm leading-relaxed cursor-pointer">
                {t("bond.port_entry_detention")}
              </Label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="hasPriorDeportation" 
                checked={formData.hasPriorDeportation}
                onCheckedChange={(checked) => handleCheckboxChange('hasPriorDeportation', checked as boolean)}
              />
              <Label htmlFor="hasPriorDeportation" className="text-sm leading-relaxed cursor-pointer">
                {t("bond.prior_deportation")}
              </Label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="hasFinalRemovalOrder" 
                checked={formData.hasFinalRemovalOrder}
                onCheckedChange={(checked) => handleCheckboxChange('hasFinalRemovalOrder', checked as boolean)}
              />
              <Label htmlFor="hasFinalRemovalOrder" className="text-sm leading-relaxed cursor-pointer">
                {t("bond.final_order")}
              </Label>
            </div>
            
            {hasEligibilityIssues && (
              <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <p className="text-red-800 dark:text-red-200 text-sm font-medium">
                  {t("bond.eligibility_issue_notice") || "⚠️ One or more factors may affect bond eligibility. Our attorneys will review your specific situation."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section 4: Danger to Community Assessment */}
        <Card className="shadow-lg">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <div>
                <CardTitle className="text-xl font-serif">{t("bond.danger_community")}</CardTitle>
                <CardDescription>
                  {t("bond.danger_desc") || "Evidence showing you are not a danger to the community"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="criminalHistory">{t("bond.criminal_history")}</Label>
              <Textarea 
                id="criminalHistory" 
                name="criminalHistory" 
                value={formData.criminalHistory}
                onChange={handleInputChange}
                placeholder={t("bond.placeholder.criminal")} 
                className="min-h-[100px]" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rehabilitationEvidence">{t("bond.rehabilitation")}</Label>
              <Textarea 
                id="rehabilitationEvidence" 
                name="rehabilitationEvidence" 
                value={formData.rehabilitationEvidence}
                onChange={handleInputChange}
                placeholder={t("bond.placeholder.rehabilitation")} 
                className="min-h-[100px]" 
              />
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="hasCharacterLetters" 
                checked={formData.hasCharacterLetters}
                onCheckedChange={(checked) => handleCheckboxChange('hasCharacterLetters', checked as boolean)}
              />
              <Label htmlFor="hasCharacterLetters" className="text-sm leading-relaxed cursor-pointer">
                {t("bond.character_letters")}
              </Label>
            </div>
            {formData.hasCharacterLetters && (
              <div className="space-y-2 ml-6">
                <Label htmlFor="characterLettersCount">{t("bond.letters_count") || "How many letters?"}</Label>
                <Input 
                  id="characterLettersCount" 
                  name="characterLettersCount" 
                  type="number" 
                  min="0"
                  value={formData.characterLettersCount}
                  onChange={handleInputChange}
                  className="w-24"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section 5: Flight Risk Assessment - Community Ties */}
        <Card className="shadow-lg">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-primary" />
              <div>
                <CardTitle className="text-xl font-serif">{t("bond.flight_risk")}</CardTitle>
                <CardDescription>
                  {t("bond.flight_desc") || "Strong community ties reduce flight risk assessment"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="usResidenceLength">{t("bond.residence_length")}</Label>
                <Input 
                  id="usResidenceLength" 
                  name="usResidenceLength" 
                  value={formData.usResidenceLength}
                  onChange={handleInputChange}
                  placeholder={t("bond.placeholder.residence")} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentEmployer">{t("bond.current_employer") || "Current Employer"}</Label>
                <Input 
                  id="currentEmployer" 
                  name="currentEmployer" 
                  value={formData.currentEmployer}
                  onChange={handleInputChange}
                  placeholder={t("bond.placeholder.employer") || "Company name"} 
                />
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="hasFixedAddress" 
                checked={formData.hasFixedAddress}
                onCheckedChange={(checked) => handleCheckboxChange('hasFixedAddress', checked as boolean)}
              />
              <Label htmlFor="hasFixedAddress" className="text-sm leading-relaxed cursor-pointer">
                {t("bond.fixed_address")}
              </Label>
            </div>
            {formData.hasFixedAddress && (
              <div className="space-y-2 ml-6">
                <Label htmlFor="currentAddress">{t("bond.current_address") || "Current Address"}</Label>
                <Textarea 
                  id="currentAddress" 
                  name="currentAddress" 
                  value={formData.currentAddress}
                  onChange={handleInputChange}
                  placeholder={t("bond.placeholder.address") || "Full address..."} 
                  className="min-h-[60px]" 
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="familyTiesInUS">{t("bond.family_ties")}</Label>
              <Textarea 
                id="familyTiesInUS" 
                name="familyTiesInUS" 
                value={formData.familyTiesInUS}
                onChange={handleInputChange}
                placeholder={t("bond.placeholder.family")} 
                className="min-h-[100px]" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="employmentHistory">{t("bond.employment_history")}</Label>
              <Textarea 
                id="employmentHistory" 
                name="employmentHistory" 
                value={formData.employmentHistory}
                onChange={handleInputChange}
                placeholder={t("bond.placeholder.employment")} 
                className="min-h-[100px]" 
              />
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox 
                id="hasPropertyInUS" 
                checked={formData.hasPropertyInUS}
                onCheckedChange={(checked) => handleCheckboxChange('hasPropertyInUS', checked as boolean)}
              />
              <Label htmlFor="hasPropertyInUS" className="text-sm leading-relaxed cursor-pointer">
                {t("bond.has_property") || "Own property in the U.S.?"}
              </Label>
            </div>
            {formData.hasPropertyInUS && (
              <div className="space-y-2 ml-6">
                <Label htmlFor="propertyDetails">{t("bond.property_ownership")}</Label>
                <Textarea 
                  id="propertyDetails" 
                  name="propertyDetails" 
                  value={formData.propertyDetails}
                  onChange={handleInputChange}
                  placeholder={t("bond.placeholder.property")} 
                  className="min-h-[60px]" 
                />
              </div>
            )}

            <Separator />

            <div className="space-y-4">
              <h4 className="font-semibold text-primary">{t("bond.relief_section") || "Relief from Removal"}</h4>
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="eligibleForRelief" 
                  checked={formData.eligibleForRelief}
                  onCheckedChange={(checked) => handleCheckboxChange('eligibleForRelief', checked as boolean)}
                />
                <Label htmlFor="eligibleForRelief" className="text-sm leading-relaxed cursor-pointer">
                  {t("bond.relief_eligibility")}
                </Label>
              </div>
              {formData.eligibleForRelief && (
                <div className="space-y-2 ml-6">
                  <Label htmlFor="reliefType">{t("bond.relief_type") || "Type of Relief"}</Label>
                  <Select value={formData.reliefType} onValueChange={(value) => handleSelectChange('reliefType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("bond.select_relief") || "Select type of relief..."} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asylum">Asylum</SelectItem>
                      <SelectItem value="cancellation">Cancellation of Removal</SelectItem>
                      <SelectItem value="adjustment">Adjustment of Status</SelectItem>
                      <SelectItem value="withholding">Withholding of Removal</SelectItem>
                      <SelectItem value="cat">Convention Against Torture (CAT)</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="previousDeportations">{t("bond.deportations")}</Label>
              <Textarea 
                id="previousDeportations" 
                name="previousDeportations" 
                value={formData.previousDeportations}
                onChange={handleInputChange}
                placeholder={t("bond.placeholder.deportations")} 
                className="min-h-[80px]" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pendingApplications">{t("bond.pending_applications")}</Label>
              <Textarea 
                id="pendingApplications" 
                name="pendingApplications" 
                value={formData.pendingApplications}
                onChange={handleInputChange}
                placeholder={t("bond.placeholder.pending")} 
                className="min-h-[80px]" 
              />
            </div>
          </CardContent>
        </Card>

        {/* Section 6: Health & Humanitarian */}
        <Card className="shadow-lg">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center gap-3">
              <Heart className="h-6 w-6 text-primary" />
              <CardTitle className="text-xl font-serif">{t("bond.health_humanitarian")}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="medicalConditions">{t("bond.medical_conditions")}</Label>
              <Textarea 
                id="medicalConditions" 
                name="medicalConditions" 
                value={formData.medicalConditions}
                onChange={handleInputChange}
                placeholder={t("bond.placeholder.medical")} 
                className="min-h-[80px]" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialCircumstances">{t("bond.special_circumstances")}</Label>
              <Textarea 
                id="specialCircumstances" 
                name="specialCircumstances" 
                value={formData.specialCircumstances}
                onChange={handleInputChange}
                placeholder={t("bond.placeholder.special")} 
                className="min-h-[80px]" 
              />
            </div>
          </CardContent>
        </Card>

        {/* Section 7: Sponsor Information */}
        <Card className="shadow-lg">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center gap-3">
              <UserCheck className="h-6 w-6 text-primary" />
              <div>
                <CardTitle className="text-xl font-serif">{t("bond.sponsor_info")}</CardTitle>
                <CardDescription>
                  {t("bond.sponsor_desc") || "Person who will pay the bond and ensure court appearances"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="sponsorName">{t("bond.sponsor_name")}</Label>
                <Input 
                  id="sponsorName" 
                  name="sponsorName" 
                  value={formData.sponsorName}
                  onChange={handleInputChange}
                  placeholder={t("bond.placeholder.sponsor_name")} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sponsorRelation">{t("bond.sponsor_relation")}</Label>
                <Input 
                  id="sponsorRelation" 
                  name="sponsorRelation" 
                  value={formData.sponsorRelation}
                  onChange={handleInputChange}
                  placeholder={t("bond.placeholder.sponsor_relation")} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sponsorStatus">{t("bond.sponsor_status")}</Label>
                <Select value={formData.sponsorStatus} onValueChange={(value) => handleSelectChange('sponsorStatus', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("bond.placeholder.sponsor_status")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us_citizen">U.S. Citizen</SelectItem>
                    <SelectItem value="lpr">Lawful Permanent Resident (Green Card)</SelectItem>
                    <SelectItem value="visa_holder">Valid Visa Holder</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sponsorIncome">{t("bond.sponsor_income")}</Label>
                <Input 
                  id="sponsorIncome" 
                  name="sponsorIncome" 
                  value={formData.sponsorIncome}
                  onChange={handleInputChange}
                  placeholder={t("bond.placeholder.sponsor_income")} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sponsorPhone">{t("bond.sponsor_phone") || "Sponsor Phone"}</Label>
                <Input 
                  id="sponsorPhone" 
                  name="sponsorPhone" 
                  type="tel"
                  value={formData.sponsorPhone}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sponsorEmail">{t("bond.sponsor_email") || "Sponsor Email"}</Label>
                <Input 
                  id="sponsorEmail" 
                  name="sponsorEmail" 
                  type="email"
                  value={formData.sponsorEmail}
                  onChange={handleInputChange}
                  placeholder="sponsor@email.com" 
                />
              </div>
            </div>
            
            <div className="flex items-start space-x-3 pt-4">
              <Checkbox 
                id="sponsorUnderstandsRisk" 
                checked={formData.sponsorUnderstandsRisk}
                onCheckedChange={(checked) => handleCheckboxChange('sponsorUnderstandsRisk', checked as boolean)}
              />
              <Label htmlFor="sponsorUnderstandsRisk" className="text-sm leading-relaxed cursor-pointer">
                {t("bond.sponsor_agreement")}
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Section 8: Contact Information */}
        <Card className="shadow-lg">
          <CardHeader className="bg-secondary/10">
            <div className="flex items-center gap-3">
              <Phone className="h-6 w-6 text-secondary" />
              <div>
                <CardTitle className="text-xl font-serif">{t("bond.contact_info") || "Contact Information"}</CardTitle>
                <CardDescription>
                  {t("bond.contact_desc") || "How should we contact you about this case?"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contactPhone">{t("bond.contact_phone") || "Phone Number"} *</Label>
                <Input 
                  id="contactPhone" 
                  name="contactPhone" 
                  type="tel"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">{t("bond.contact_email") || "Email Address"}</Label>
                <Input 
                  id="contactEmail" 
                  name="contactEmail" 
                  type="email"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  placeholder="your@email.com" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="pt-4 flex flex-col items-center gap-4">
          <Button 
            type="submit" 
            size="lg" 
            disabled={isSubmitting} 
            className="w-full md:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-lg px-12 h-14"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {t("bond.sending") || "Submitting..."}
              </>
            ) : (
              t("bond.submit")
            )}
          </Button>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            {t("bond.privacy_notice") || "Your information is confidential and protected by attorney-client privilege."}
          </p>
        </div>
      </form>
    </div>
  );
}
