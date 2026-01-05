'use client';
import { useState } from 'react';
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
import { AlertTriangle, CheckCircle2, Shield, Users, FileText, Heart, UserCheck, Phone, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { trpc } from '@/lib/trpc';

export default function BondQuestionnaire() {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    detainee: true,
    detention: true,
    eligibility: true,
    criminal: true,
    community: true,
    immigration: true,
    health: true,
    prior: false,
    financial: false,
    education: false,
    dependents: false,
    countryTies: false,
    references: false,
    sponsor: true,
    contact: true,
  });
  
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
    mentalHealthHistory: '',
    currentMedications: '',
    mentalHealthSupport: '',
    physicalDisabilities: '',
    
    // Prior Immigration Proceedings
    priorImmigrationHearings: '',
    priorAppeals: '',
    previousBondHearings: '',
    
    // Financial Information
    hasAssets: false,
    assetsDescription: '',
    hasDebts: false,
    debtsDescription: '',
    bankAccounts: '',
    abilityToPostBond: '',
    
    // Education & Skills
    educationLevel: '',
    certifications: '',
    professionalSkills: '',
    
    // Dependents & Family Obligations
    hasDependents: false,
    dependentsDescription: '',
    elderlyDependents: '',
    childrenInUS: 0,
    childrenCountries: '',
    
    // Ties to Country of Origin
    tiesCountryOfOrigin: '',
    frequencyOfVisits: '',
    lastVisitCountryOfOrigin: '',
    
    // Expanded Criminal Record
    criminalRecordDetails: '',
    sentencesServed: '',
    rehabilitationPrograms: '',
    
    // Character References
    characterReference1Name: '',
    characterReference1Relation: '',
    characterReference1Contact: '',
    characterReference2Name: '',
    characterReference2Relation: '',
    characterReference2Contact: '',
    characterReference3Name: '',
    characterReference3Relation: '',
    characterReference3Contact: '',
    
    // Sponsor Information
    sponsorName: '',
    sponsorRelation: '',
    sponsorStatus: '',
    sponsorIncome: '',
    sponsorPhone: '',
    sponsorEmail: '',
    sponsorUnderstandsRisk: false,
    sponsorCriminalHistory: '',
    sponsorEmploymentHistory: '',
    
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

  const handleNumberChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitMutation.mutateAsync(formData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-16">
        <SEO 
          title="Bond Questionnaire"
          description="Complete our immigration bond questionnaire to help prepare your case. Gather essential information for your bond hearing representation."
          keywords="immigration bond questionnaire, bond hearing preparation, ICE bond"
          canonicalUrl="/bond-questionnaire"
        />
        <div className="container max-w-2xl">
          <Card className="border-2 border-green-500">
            <CardContent className="pt-8">
              <div className="text-center">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
                <p className="text-muted-foreground mb-6">
                  Your bond questionnaire has been submitted successfully. Our legal team will review your information and contact you within 24 hours.
                </p>
                <Button onClick={() => window.location.href = '/'} className="bg-primary">
                  Return to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-16">
      <SEO 
        title="Bond Questionnaire"
        description="Complete our immigration bond questionnaire to help prepare your case. Gather essential information for your bond hearing representation."
        keywords="immigration bond questionnaire, bond hearing preparation, ICE bond"
        canonicalUrl="/bond-questionnaire"
      />
      <div className="container max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{t("bond.title")}</h1>
          <p className="text-lg text-muted-foreground">{t("bond.subtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* DETAINEE INFORMATION */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => toggleSection('detainee')}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {t("bond.detainee_info")}
                </CardTitle>
                {expandedSections.detainee ? <ChevronUp /> : <ChevronDown />}
              </div>
            </CardHeader>
            {expandedSections.detainee && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="detaineeName">{t("bond.full_name")}</Label>
                    <Input
                      id="detaineeName"
                      name="detaineeName"
                      value={formData.detaineeName}
                      onChange={handleInputChange}
                      placeholder={t("bond.placeholder.name")}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="aNumber">{t("bond.a_number")}</Label>
                    <Input
                      id="aNumber"
                      name="aNumber"
                      value={formData.aNumber}
                      onChange={handleInputChange}
                      placeholder={t("bond.placeholder.a_number")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">{t("bond.dob")}</Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="countryOfBirth">{t("bond.country_birth")}</Label>
                    <Input
                      id="countryOfBirth"
                      name="countryOfBirth"
                      value={formData.countryOfBirth}
                      onChange={handleInputChange}
                      placeholder={t("bond.placeholder.country")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfEntry">{t("bond.date_entry")}</Label>
                    <Input
                      id="dateOfEntry"
                      name="dateOfEntry"
                      type="date"
                      value={formData.dateOfEntry}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
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
            )}
          </Card>

          {/* DETENTION INFORMATION */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => toggleSection('detention')}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {t("bond.detention_info")}
                </CardTitle>
                {expandedSections.detention ? <ChevronUp /> : <ChevronDown />}
              </div>
            </CardHeader>
            {expandedSections.detention && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="detentionCenter">{t("bond.detention_center")}</Label>
                    <Input
                      id="detentionCenter"
                      name="detentionCenter"
                      value={formData.detentionCenter}
                      onChange={handleInputChange}
                      placeholder={t("bond.placeholder.center")}
                    />
                  </div>
                  <div>
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
            )}
          </Card>

          {/* ELIGIBILITY CHECK */}
          <Card className="border-2 border-red-200 bg-red-50/50">
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => toggleSection('eligibility')}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <AlertTriangle className="h-5 w-5" />
                  {t("bond.eligibility_check")}
                </CardTitle>
                {expandedSections.eligibility ? <ChevronUp /> : <ChevronDown />}
              </div>
              <CardDescription className="text-red-600">Critical factors that may affect bond eligibility</CardDescription>
            </CardHeader>
            {expandedSections.eligibility && (
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasAggravatedFelony"
                      checked={formData.hasAggravatedFelony}
                      onCheckedChange={(checked) => handleCheckboxChange('hasAggravatedFelony', checked as boolean)}
                    />
                    <Label htmlFor="hasAggravatedFelony" className="font-medium">{t("bond.criminal_convictions")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="detainedAtPortOfEntry"
                      checked={formData.detainedAtPortOfEntry}
                      onCheckedChange={(checked) => handleCheckboxChange('detainedAtPortOfEntry', checked as boolean)}
                    />
                    <Label htmlFor="detainedAtPortOfEntry" className="font-medium">{t("bond.port_entry_detention")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasPriorDeportation"
                      checked={formData.hasPriorDeportation}
                      onCheckedChange={(checked) => handleCheckboxChange('hasPriorDeportation', checked as boolean)}
                    />
                    <Label htmlFor="hasPriorDeportation" className="font-medium">{t("bond.prior_deportation")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasFinalRemovalOrder"
                      checked={formData.hasFinalRemovalOrder}
                      onCheckedChange={(checked) => handleCheckboxChange('hasFinalRemovalOrder', checked as boolean)}
                    />
                    <Label htmlFor="hasFinalRemovalOrder" className="font-medium">{t("bond.final_order")}</Label>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* CRIMINAL HISTORY & REHABILITATION */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => toggleSection('criminal')}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {t("bond.danger_community")}
                </CardTitle>
                {expandedSections.criminal ? <ChevronUp /> : <ChevronDown />}
              </div>
            </CardHeader>
            {expandedSections.criminal && (
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="criminalHistory">{t("bond.criminal_history")}</Label>
                  <Textarea
                    id="criminalHistory"
                    name="criminalHistory"
                    value={formData.criminalHistory}
                    onChange={handleInputChange}
                    placeholder={t("bond.placeholder.criminal")}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="criminalRecordDetails">{t("bond.criminal_record_details")}</Label>
                  <Textarea
                    id="criminalRecordDetails"
                    name="criminalRecordDetails"
                    value={formData.criminalRecordDetails}
                    onChange={handleInputChange}
                    placeholder="List all arrests and convictions with dates and sentences..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="sentencesServed">{t("bond.sentences_served")}</Label>
                  <Textarea
                    id="sentencesServed"
                    name="sentencesServed"
                    value={formData.sentencesServed}
                    onChange={handleInputChange}
                    placeholder="Describe sentences served and completion dates..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="rehabilitationEvidence">{t("bond.rehabilitation")}</Label>
                  <Textarea
                    id="rehabilitationEvidence"
                    name="rehabilitationEvidence"
                    value={formData.rehabilitationEvidence}
                    onChange={handleInputChange}
                    placeholder={t("bond.placeholder.rehabilitation")}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="rehabilitationPrograms">{t("bond.rehabilitation_programs")}</Label>
                  <Textarea
                    id="rehabilitationPrograms"
                    name="rehabilitationPrograms"
                    value={formData.rehabilitationPrograms}
                    onChange={handleInputChange}
                    placeholder="List rehabilitation programs completed..."
                    rows={2}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasCharacterLetters"
                    checked={formData.hasCharacterLetters}
                    onCheckedChange={(checked) => handleCheckboxChange('hasCharacterLetters', checked as boolean)}
                  />
                  <Label htmlFor="hasCharacterLetters">{t("bond.character_letters")}</Label>
                </div>
                {formData.hasCharacterLetters && (
                  <div>
                    <Label htmlFor="characterLettersCount">Number of Letters</Label>
                    <Input
                      id="characterLettersCount"
                      name="characterLettersCount"
                      type="number"
                      value={formData.characterLettersCount}
                      onChange={(e) => handleNumberChange('characterLettersCount', e.target.value)}
                      min="0"
                    />
                  </div>
                )}
              </CardContent>
            )}
          </Card>

          {/* COMMUNITY TIES - FLIGHT RISK ASSESSMENT */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => toggleSection('community')}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {t("bond.community_ties")}
                </CardTitle>
                {expandedSections.community ? <ChevronUp /> : <ChevronDown />}
              </div>
            </CardHeader>
            {expandedSections.community && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="usResidenceLength">{t("bond.residence_length")}</Label>
                    <Input
                      id="usResidenceLength"
                      name="usResidenceLength"
                      value={formData.usResidenceLength}
                      onChange={handleInputChange}
                      placeholder={t("bond.placeholder.residence")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentEmployer">{t("bond.employment_history")}</Label>
                    <Input
                      id="currentEmployer"
                      name="currentEmployer"
                      value={formData.currentEmployer}
                      onChange={handleInputChange}
                      placeholder="Current employer"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="familyTiesInUS">{t("bond.family_ties")}</Label>
                  <Textarea
                    id="familyTiesInUS"
                    name="familyTiesInUS"
                    value={formData.familyTiesInUS}
                    onChange={handleInputChange}
                    placeholder={t("bond.placeholder.family")}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="employmentHistory">{t("bond.employment_history")}</Label>
                  <Textarea
                    id="employmentHistory"
                    name="employmentHistory"
                    value={formData.employmentHistory}
                    onChange={handleInputChange}
                    placeholder={t("bond.placeholder.employment")}
                    rows={3}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasFixedAddress"
                    checked={formData.hasFixedAddress}
                    onCheckedChange={(checked) => handleCheckboxChange('hasFixedAddress', checked as boolean)}
                  />
                  <Label htmlFor="hasFixedAddress">{t("bond.fixed_address")}</Label>
                </div>
                {formData.hasFixedAddress && (
                  <div>
                    <Label htmlFor="currentAddress">Current Address</Label>
                    <Textarea
                      id="currentAddress"
                      name="currentAddress"
                      value={formData.currentAddress}
                      onChange={handleInputChange}
                      placeholder="Full address..."
                      rows={2}
                    />
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasPropertyInUS"
                    checked={formData.hasPropertyInUS}
                    onCheckedChange={(checked) => handleCheckboxChange('hasPropertyInUS', checked as boolean)}
                  />
                  <Label htmlFor="hasPropertyInUS">{t("bond.property_ownership")}</Label>
                </div>
                {formData.hasPropertyInUS && (
                  <div>
                    <Label htmlFor="propertyDetails">Property Details</Label>
                    <Textarea
                      id="propertyDetails"
                      name="propertyDetails"
                      value={formData.propertyDetails}
                      onChange={handleInputChange}
                      placeholder={t("bond.placeholder.property")}
                      rows={2}
                    />
                  </div>
                )}
              </CardContent>
            )}
          </Card>

          {/* IMMIGRATION HISTORY */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => toggleSection('immigration')}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {t("bond.immigration_history")}
                </CardTitle>
                {expandedSections.immigration ? <ChevronUp /> : <ChevronDown />}
              </div>
            </CardHeader>
            {expandedSections.immigration && (
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="previousDeportations">{t("bond.deportations")}</Label>
                  <Textarea
                    id="previousDeportations"
                    name="previousDeportations"
                    value={formData.previousDeportations}
                    onChange={handleInputChange}
                    placeholder={t("bond.placeholder.deportations")}
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="pendingApplications">{t("bond.pending_applications")}</Label>
                  <Textarea
                    id="pendingApplications"
                    name="pendingApplications"
                    value={formData.pendingApplications}
                    onChange={handleInputChange}
                    placeholder={t("bond.placeholder.pending")}
                    rows={2}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="eligibleForRelief"
                    checked={formData.eligibleForRelief}
                    onCheckedChange={(checked) => handleCheckboxChange('eligibleForRelief', checked as boolean)}
                  />
                  <Label htmlFor="eligibleForRelief">{t("bond.relief_eligibility")}</Label>
                </div>
                {formData.eligibleForRelief && (
                  <div>
                    <Label htmlFor="reliefType">Type of Relief</Label>
                    <Input
                      id="reliefType"
                      name="reliefType"
                      value={formData.reliefType}
                      onChange={handleInputChange}
                      placeholder="e.g. Asylum, VAWA, U-visa"
                    />
                  </div>
                )}
              </CardContent>
            )}
          </Card>

          {/* HEALTH & HUMANITARIAN */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => toggleSection('health')}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  {t("bond.health_humanitarian")}
                </CardTitle>
                {expandedSections.health ? <ChevronUp /> : <ChevronDown />}
              </div>
            </CardHeader>
            {expandedSections.health && (
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="medicalConditions">{t("bond.medical_conditions")}</Label>
                  <Textarea
                    id="medicalConditions"
                    name="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={handleInputChange}
                    placeholder={t("bond.placeholder.medical")}
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="mentalHealthHistory">{t("bond.mental_health_history")}</Label>
                  <Textarea
                    id="mentalHealthHistory"
                    name="mentalHealthHistory"
                    value={formData.mentalHealthHistory}
                    onChange={handleInputChange}
                    placeholder="Describe any mental health conditions and treatment..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="currentMedications">{t("bond.current_medications")}</Label>
                  <Textarea
                    id="currentMedications"
                    name="currentMedications"
                    value={formData.currentMedications}
                    onChange={handleInputChange}
                    placeholder="List current medications and dosages..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="physicalDisabilities">{t("bond.physical_disabilities")}</Label>
                  <Textarea
                    id="physicalDisabilities"
                    name="physicalDisabilities"
                    value={formData.physicalDisabilities}
                    onChange={handleInputChange}
                    placeholder="Describe any physical disabilities or limitations..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="specialCircumstances">{t("bond.special_circumstances")}</Label>
                  <Textarea
                    id="specialCircumstances"
                    name="specialCircumstances"
                    value={formData.specialCircumstances}
                    onChange={handleInputChange}
                    placeholder={t("bond.placeholder.special")}
                    rows={2}
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* PRIOR IMMIGRATION PROCEEDINGS */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => toggleSection('prior')}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {t("bond.prior_proceedings")}
                </CardTitle>
                {expandedSections.prior ? <ChevronUp /> : <ChevronDown />}
              </div>
            </CardHeader>
            {expandedSections.prior && (
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="priorImmigrationHearings">{t("bond.prior_hearings")}</Label>
                  <Textarea
                    id="priorImmigrationHearings"
                    name="priorImmigrationHearings"
                    value={formData.priorImmigrationHearings}
                    onChange={handleInputChange}
                    placeholder="Describe any previous immigration hearings..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="priorAppeals">{t("bond.prior_appeals")}</Label>
                  <Textarea
                    id="priorAppeals"
                    name="priorAppeals"
                    value={formData.priorAppeals}
                    onChange={handleInputChange}
                    placeholder="List any appeals filed..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="previousBondHearings">Previous Bond Hearings</Label>
                  <Textarea
                    id="previousBondHearings"
                    name="previousBondHearings"
                    value={formData.previousBondHearings}
                    onChange={handleInputChange}
                    placeholder="Describe outcomes of previous bond hearings..."
                    rows={2}
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* FINANCIAL INFORMATION */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => toggleSection('financial')}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {t("bond.financial_info")}
                </CardTitle>
                {expandedSections.financial ? <ChevronUp /> : <ChevronDown />}
              </div>
            </CardHeader>
            {expandedSections.financial && (
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasAssets"
                    checked={formData.hasAssets}
                    onCheckedChange={(checked) => handleCheckboxChange('hasAssets', checked as boolean)}
                  />
                  <Label htmlFor="hasAssets">{t("bond.has_assets")}</Label>
                </div>
                {formData.hasAssets && (
                  <div>
                    <Label htmlFor="assetsDescription">{t("bond.assets_description")}</Label>
                    <Textarea
                      id="assetsDescription"
                      name="assetsDescription"
                      value={formData.assetsDescription}
                      onChange={handleInputChange}
                      placeholder="List assets (property, vehicles, savings, etc.)..."
                      rows={2}
                    />
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasDebts"
                    checked={formData.hasDebts}
                    onCheckedChange={(checked) => handleCheckboxChange('hasDebts', checked as boolean)}
                  />
                  <Label htmlFor="hasDebts">{t("bond.has_debts")}</Label>
                </div>
                {formData.hasDebts && (
                  <div>
                    <Label htmlFor="debtsDescription">{t("bond.debts_description")}</Label>
                    <Textarea
                      id="debtsDescription"
                      name="debtsDescription"
                      value={formData.debtsDescription}
                      onChange={handleInputChange}
                      placeholder="List debts and creditors..."
                      rows={2}
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="bankAccounts">{t("bond.bank_accounts")}</Label>
                  <Textarea
                    id="bankAccounts"
                    name="bankAccounts"
                    value={formData.bankAccounts}
                    onChange={handleInputChange}
                    placeholder="Bank names and account information..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="abilityToPostBond">{t("bond.ability_post_bond")}</Label>
                  <Select value={formData.abilityToPostBond} onValueChange={(value) => handleSelectChange('abilityToPostBond', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="can_post_full">Can post full bond</SelectItem>
                      <SelectItem value="can_post_partial">Can post partial bond</SelectItem>
                      <SelectItem value="needs_sponsor">Needs sponsor assistance</SelectItem>
                      <SelectItem value="cannot_post">Cannot post bond</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            )}
          </Card>

          {/* EDUCATION & SKILLS */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => toggleSection('education')}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {t("bond.education_skills")}
                </CardTitle>
                {expandedSections.education ? <ChevronUp /> : <ChevronDown />}
              </div>
            </CardHeader>
            {expandedSections.education && (
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="educationLevel">{t("bond.education_level")}</Label>
                  <Input
                    id="educationLevel"
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleInputChange}
                    placeholder="e.g. High School, Bachelor's Degree"
                  />
                </div>
                <div>
                  <Label htmlFor="certifications">{t("bond.certifications")}</Label>
                  <Textarea
                    id="certifications"
                    name="certifications"
                    value={formData.certifications}
                    onChange={handleInputChange}
                    placeholder="List any certifications or professional licenses..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="professionalSkills">{t("bond.professional_skills")}</Label>
                  <Textarea
                    id="professionalSkills"
                    name="professionalSkills"
                    value={formData.professionalSkills}
                    onChange={handleInputChange}
                    placeholder="List professional skills and expertise..."
                    rows={2}
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* DEPENDENTS & FAMILY OBLIGATIONS */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => toggleSection('dependents')}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {t("bond.dependents_obligations")}
                </CardTitle>
                {expandedSections.dependents ? <ChevronUp /> : <ChevronDown />}
              </div>
            </CardHeader>
            {expandedSections.dependents && (
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasDependents"
                    checked={formData.hasDependents}
                    onCheckedChange={(checked) => handleCheckboxChange('hasDependents', checked as boolean)}
                  />
                  <Label htmlFor="hasDependents">{t("bond.has_dependents")}</Label>
                </div>
                {formData.hasDependents && (
                  <>
                    <div>
                      <Label htmlFor="dependentsDescription">{t("bond.dependents_description")}</Label>
                      <Textarea
                        id="dependentsDescription"
                        name="dependentsDescription"
                        value={formData.dependentsDescription}
                        onChange={handleInputChange}
                        placeholder="List dependents (names, ages, relationship)..."
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="childrenInUS">{t("bond.children_us")}</Label>
                      <Input
                        id="childrenInUS"
                        name="childrenInUS"
                        type="number"
                        value={formData.childrenInUS}
                        onChange={(e) => handleNumberChange('childrenInUS', e.target.value)}
                        min="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="childrenCountries">{t("bond.children_countries")}</Label>
                      <Textarea
                        id="childrenCountries"
                        name="childrenCountries"
                        value={formData.childrenCountries}
                        onChange={handleInputChange}
                        placeholder="List children in other countries..."
                        rows={2}
                      />
                    </div>
                  </>
                )}
                <div>
                  <Label htmlFor="elderlyDependents">{t("bond.elderly_dependents")}</Label>
                  <Textarea
                    id="elderlyDependents"
                    name="elderlyDependents"
                    value={formData.elderlyDependents}
                    onChange={handleInputChange}
                    placeholder="Describe elderly or disabled family members you support..."
                    rows={2}
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* TIES TO COUNTRY OF ORIGIN */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => toggleSection('countryTies')}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  {t("bond.country_ties")}
                </CardTitle>
                {expandedSections.countryTies ? <ChevronUp /> : <ChevronDown />}
              </div>
            </CardHeader>
            {expandedSections.countryTies && (
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="tiesCountryOfOrigin">{t("bond.ties_country_origin")}</Label>
                  <Textarea
                    id="tiesCountryOfOrigin"
                    name="tiesCountryOfOrigin"
                    value={formData.tiesCountryOfOrigin}
                    onChange={handleInputChange}
                    placeholder="Describe family, property, or business ties to country of origin..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="frequencyOfVisits">{t("bond.frequency_visits")}</Label>
                  <Select value={formData.frequencyOfVisits} onValueChange={(value) => handleSelectChange('frequencyOfVisits', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="rarely">Rarely (5+ years)</SelectItem>
                      <SelectItem value="occasionally">Occasionally (1-5 years)</SelectItem>
                      <SelectItem value="frequently">Frequently (annually)</SelectItem>
                      <SelectItem value="very_frequently">Very frequently (multiple times/year)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="lastVisitCountryOfOrigin">{t("bond.last_visit_origin")}</Label>
                  <Input
                    id="lastVisitCountryOfOrigin"
                    name="lastVisitCountryOfOrigin"
                    type="date"
                    value={formData.lastVisitCountryOfOrigin}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* CHARACTER REFERENCES */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => toggleSection('references')}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  {t("bond.character_references")}
                </CardTitle>
                {expandedSections.references ? <ChevronUp /> : <ChevronDown />}
              </div>
            </CardHeader>
            {expandedSections.references && (
              <CardContent className="space-y-6">
                {[1, 2, 3].map((refNum) => (
                  <div key={refNum} className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3">Reference {refNum}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <Label htmlFor={`characterReference${refNum}Name`}>{t("bond.reference_name")}</Label>
                        <Input
                          id={`characterReference${refNum}Name`}
                          name={`characterReference${refNum}Name`}
                          value={formData[`characterReference${refNum}Name` as keyof typeof formData] as string}
                          onChange={handleInputChange}
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`characterReference${refNum}Relation`}>{t("bond.reference_relation")}</Label>
                        <Input
                          id={`characterReference${refNum}Relation`}
                          name={`characterReference${refNum}Relation`}
                          value={formData[`characterReference${refNum}Relation` as keyof typeof formData] as string}
                          onChange={handleInputChange}
                          placeholder="e.g. Friend, Employer"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`characterReference${refNum}Contact`}>{t("bond.reference_contact")}</Label>
                        <Input
                          id={`characterReference${refNum}Contact`}
                          name={`characterReference${refNum}Contact`}
                          value={formData[`characterReference${refNum}Contact` as keyof typeof formData] as string}
                          onChange={handleInputChange}
                          placeholder="Phone or email"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            )}
          </Card>

          {/* SPONSOR INFORMATION */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => toggleSection('sponsor')}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {t("bond.sponsor_info")}
                </CardTitle>
                {expandedSections.sponsor ? <ChevronUp /> : <ChevronDown />}
              </div>
            </CardHeader>
            {expandedSections.sponsor && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sponsorName">{t("bond.sponsor_name")}</Label>
                    <Input
                      id="sponsorName"
                      name="sponsorName"
                      value={formData.sponsorName}
                      onChange={handleInputChange}
                      placeholder={t("bond.placeholder.sponsor_name")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sponsorRelation">{t("bond.sponsor_relation")}</Label>
                    <Input
                      id="sponsorRelation"
                      name="sponsorRelation"
                      value={formData.sponsorRelation}
                      onChange={handleInputChange}
                      placeholder={t("bond.placeholder.sponsor_relation")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sponsorStatus">{t("bond.sponsor_status")}</Label>
                    <Input
                      id="sponsorStatus"
                      name="sponsorStatus"
                      value={formData.sponsorStatus}
                      onChange={handleInputChange}
                      placeholder={t("bond.placeholder.sponsor_status")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sponsorIncome">{t("bond.sponsor_income")}</Label>
                    <Input
                      id="sponsorIncome"
                      name="sponsorIncome"
                      value={formData.sponsorIncome}
                      onChange={handleInputChange}
                      placeholder={t("bond.placeholder.sponsor_income")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sponsorPhone">{t("contact.phone")}</Label>
                    <Input
                      id="sponsorPhone"
                      name="sponsorPhone"
                      type="tel"
                      value={formData.sponsorPhone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sponsorEmail">{t("contact.email")}</Label>
                    <Input
                      id="sponsorEmail"
                      name="sponsorEmail"
                      type="email"
                      value={formData.sponsorEmail}
                      onChange={handleInputChange}
                      placeholder="sponsor@example.com"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="sponsorCriminalHistory">{t("bond.sponsor_criminal_history")}</Label>
                  <Textarea
                    id="sponsorCriminalHistory"
                    name="sponsorCriminalHistory"
                    value={formData.sponsorCriminalHistory}
                    onChange={handleInputChange}
                    placeholder="Any criminal history or convictions..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="sponsorEmploymentHistory">{t("bond.sponsor_employment")}</Label>
                  <Textarea
                    id="sponsorEmploymentHistory"
                    name="sponsorEmploymentHistory"
                    value={formData.sponsorEmploymentHistory}
                    onChange={handleInputChange}
                    placeholder="Current and previous employment..."
                    rows={2}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sponsorUnderstandsRisk"
                    checked={formData.sponsorUnderstandsRisk}
                    onCheckedChange={(checked) => handleCheckboxChange('sponsorUnderstandsRisk', checked as boolean)}
                  />
                  <Label htmlFor="sponsorUnderstandsRisk">{t("bond.sponsor_agreement")}</Label>
                </div>
              </CardContent>
            )}
          </Card>

          {/* CONTACT INFORMATION */}
          <Card>
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => toggleSection('contact')}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Contact Information
                </CardTitle>
                {expandedSections.contact ? <ChevronUp /> : <ChevronDown />}
              </div>
            </CardHeader>
            {expandedSections.contact && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactPhone">{t("contact.phone")}</Label>
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      type="tel"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactEmail">{t("contact.email")}</Label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* SUBMIT BUTTON */}
          <div className="flex gap-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 bg-primary hover:bg-primary/90 h-12 text-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                t("bond.submit")
              )}
            </Button>
            <Button 
              type="button"
              variant="outline"
              onClick={() => window.location.href = '/'}
              className="h-12"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Import Globe icon
import { Globe } from 'lucide-react';
