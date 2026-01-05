import { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, Home, FileText, PenTool, 
  CheckCircle2, Download, ArrowLeft, ArrowRight,
  AlertCircle, Users, DollarSign
} from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { trpc } from "@/lib/trpc";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming", "District of Columbia"
];

const translations = {
  en: {
    title: "Sponsor Letter Generator",
    subtitle: "Create a professional letter of support for an immigration bond hearing",
    description: "This tool helps you create a formal sponsor letter to submit to the Immigration Court.",
    respondentTab: "Respondent",
    sponsorTab: "Your Info",
    financialTab: "Financial",
    housingTab: "Housing",
    commitmentsTab: "Commitments",
    statementsTab: "Statements",
    signatureTab: "Sign",
    respondentTitle: "Person You Are Sponsoring",
    respondentName: "Full Legal Name",
    respondentRelationship: "Your Relationship",
    respondentANumber: "A-Number (if known)",
    sponsorTitle: "Your Information",
    sponsorName: "Your Full Legal Name",
    sponsorAddress: "Street Address",
    sponsorCity: "City",
    sponsorState: "State",
    sponsorZip: "ZIP Code",
    sponsorPhone: "Phone Number",
    sponsorEmail: "Email Address",
    sponsorImmigrationStatus: "Your Immigration Status",
    usCitizen: "U.S. Citizen",
    permanentResident: "Lawful Permanent Resident",
    asylumGranted: "Asylee",
    refugeeStatus: "Refugee",
    validVisa: "Valid Visa Holder",
    tpsHolder: "TPS Holder",
    dacaRecipient: "DACA Recipient",
    other: "Other",
    financialTitle: "Financial Information",
    occupation: "Occupation",
    employer: "Employer Name",
    employerAddress: "Employer Address",
    annualIncome: "Annual Income",
    employmentLength: "Length of Employment",
    householdSize: "Household Size",
    housingTitle: "Housing Information",
    housingType: "Housing Type",
    housingOwn: "I own my home",
    housingRent: "I rent",
    housingOther: "Other arrangement",
    housingAddress: "Address Where Respondent Will Live",
    bedroomCount: "Number of Bedrooms",
    willProvideHousing: "I will provide housing",
    commitmentsTitle: "Your Commitments",
    willEnsureCourtAppearance: "I will ensure court appearances",
    willProvideTransportation: "I will provide transportation",
    willProvideFinancialSupport: "I will provide financial support",
    additionalCommitments: "Additional Commitments",
    statementsTitle: "Supporting Statements",
    howLongKnown: "How Long Have You Known Them?",
    relationshipDescription: "Describe Your Relationship",
    whyWillingToSponsor: "Why Are You Willing to Sponsor?",
    characterStatement: "Character Statement",
    flightRiskStatement: "Why Not a Flight Risk",
    signatureTitle: "Electronic Signature",
    signatureInstructions: "Draw your signature below",
    clearSignature: "Clear",
    previous: "Previous",
    next: "Next",
    generateLetter: "Generate Letter",
    downloadHtml: "Download Letter",
    printLetter: "Print Letter",
    successTitle: "Letter Generated!",
    successDesc: "Your sponsor letter has been created.",
    requiredField: "This field is required",
    signatureRequired: "Please sign before generating",
  },
  es: {
    title: "Generador de Carta de Patrocinador",
    subtitle: "Cree una carta de apoyo profesional para una audiencia de fianza",
    description: "Esta herramienta le ayuda a crear una carta formal de patrocinador.",
    respondentTab: "Beneficiario",
    sponsorTab: "Su Info",
    financialTab: "Financiero",
    housingTab: "Vivienda",
    commitmentsTab: "Compromisos",
    statementsTab: "Declaraciones",
    signatureTab: "Firmar",
    respondentTitle: "Persona que Está Patrocinando",
    respondentName: "Nombre Legal Completo",
    respondentRelationship: "Su Relación",
    respondentANumber: "Número A (si lo conoce)",
    sponsorTitle: "Su Información",
    sponsorName: "Su Nombre Legal Completo",
    sponsorAddress: "Dirección",
    sponsorCity: "Ciudad",
    sponsorState: "Estado",
    sponsorZip: "Código Postal",
    sponsorPhone: "Teléfono",
    sponsorEmail: "Correo Electrónico",
    sponsorImmigrationStatus: "Su Estatus Migratorio",
    usCitizen: "Ciudadano de EE.UU.",
    permanentResident: "Residente Permanente",
    asylumGranted: "Asilado",
    refugeeStatus: "Refugiado",
    validVisa: "Titular de Visa",
    tpsHolder: "Titular de TPS",
    dacaRecipient: "Beneficiario de DACA",
    other: "Otro",
    financialTitle: "Información Financiera",
    occupation: "Ocupación",
    employer: "Empleador",
    employerAddress: "Dirección del Empleador",
    annualIncome: "Ingreso Anual",
    employmentLength: "Tiempo de Empleo",
    householdSize: "Tamaño del Hogar",
    housingTitle: "Información de Vivienda",
    housingType: "Tipo de Vivienda",
    housingOwn: "Soy propietario",
    housingRent: "Alquilo",
    housingOther: "Otro",
    housingAddress: "Dirección Donde Vivirá",
    bedroomCount: "Número de Habitaciones",
    willProvideHousing: "Proporcionaré vivienda",
    commitmentsTitle: "Sus Compromisos",
    willEnsureCourtAppearance: "Aseguraré asistencia a audiencias",
    willProvideTransportation: "Proporcionaré transporte",
    willProvideFinancialSupport: "Proporcionaré apoyo financiero",
    additionalCommitments: "Compromisos Adicionales",
    statementsTitle: "Declaraciones de Apoyo",
    howLongKnown: "¿Cuánto Tiempo Lo Conoce?",
    relationshipDescription: "Describa Su Relación",
    whyWillingToSponsor: "¿Por Qué Está Dispuesto a Patrocinar?",
    characterStatement: "Declaración de Carácter",
    flightRiskStatement: "Por Qué No Es Riesgo de Fuga",
    signatureTitle: "Firma Electrónica",
    signatureInstructions: "Dibuje su firma abajo",
    clearSignature: "Borrar",
    previous: "Anterior",
    next: "Siguiente",
    generateLetter: "Generar Carta",
    downloadHtml: "Descargar Carta",
    printLetter: "Imprimir",
    successTitle: "¡Carta Generada!",
    successDesc: "Su carta de patrocinador ha sido creada.",
    requiredField: "Campo requerido",
    signatureRequired: "Firme antes de generar",
  },
  pt: {
    title: "Gerador de Carta de Patrocinador",
    subtitle: "Crie uma carta de apoio profissional para audiência de fiança",
    description: "Esta ferramenta ajuda a criar uma carta formal de patrocinador.",
    respondentTab: "Beneficiário",
    sponsorTab: "Suas Info",
    financialTab: "Financeiro",
    housingTab: "Moradia",
    commitmentsTab: "Compromissos",
    statementsTab: "Declarações",
    signatureTab: "Assinar",
    respondentTitle: "Pessoa que Está Patrocinando",
    respondentName: "Nome Legal Completo",
    respondentRelationship: "Seu Relacionamento",
    respondentANumber: "Número A (se conhecido)",
    sponsorTitle: "Suas Informações",
    sponsorName: "Seu Nome Legal Completo",
    sponsorAddress: "Endereço",
    sponsorCity: "Cidade",
    sponsorState: "Estado",
    sponsorZip: "CEP",
    sponsorPhone: "Telefone",
    sponsorEmail: "E-mail",
    sponsorImmigrationStatus: "Seu Status Imigratório",
    usCitizen: "Cidadão dos EUA",
    permanentResident: "Residente Permanente",
    asylumGranted: "Asilado",
    refugeeStatus: "Refugiado",
    validVisa: "Portador de Visto",
    tpsHolder: "Portador de TPS",
    dacaRecipient: "Beneficiário do DACA",
    other: "Outro",
    financialTitle: "Informações Financeiras",
    occupation: "Ocupação",
    employer: "Empregador",
    employerAddress: "Endereço do Empregador",
    annualIncome: "Renda Anual",
    employmentLength: "Tempo de Emprego",
    householdSize: "Tamanho da Família",
    housingTitle: "Informações de Moradia",
    housingType: "Tipo de Moradia",
    housingOwn: "Sou proprietário",
    housingRent: "Alugo",
    housingOther: "Outro",
    housingAddress: "Endereço Onde Viverá",
    bedroomCount: "Número de Quartos",
    willProvideHousing: "Fornecerei moradia",
    commitmentsTitle: "Seus Compromissos",
    willEnsureCourtAppearance: "Garantirei comparecimento",
    willProvideTransportation: "Fornecerei transporte",
    willProvideFinancialSupport: "Fornecerei apoio financeiro",
    additionalCommitments: "Compromissos Adicionais",
    statementsTitle: "Declarações de Apoio",
    howLongKnown: "Há Quanto Tempo Conhece?",
    relationshipDescription: "Descreva Seu Relacionamento",
    whyWillingToSponsor: "Por Que Está Disposto a Patrocinar?",
    characterStatement: "Declaração de Caráter",
    flightRiskStatement: "Por Que Não É Risco de Fuga",
    signatureTitle: "Assinatura Eletrônica",
    signatureInstructions: "Desenhe sua assinatura abaixo",
    clearSignature: "Limpar",
    previous: "Anterior",
    next: "Próximo",
    generateLetter: "Gerar Carta",
    downloadHtml: "Baixar Carta",
    printLetter: "Imprimir",
    successTitle: "Carta Gerada!",
    successDesc: "Sua carta de patrocinador foi criada.",
    requiredField: "Campo obrigatório",
    signatureRequired: "Assine antes de gerar",
  },
};

export default function SponsorLetterGenerator() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;
  
  const [activeTab, setActiveTab] = useState("respondent");
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedLetterId, setGeneratedLetterId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const signatureRef = useRef<SignatureCanvas>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    respondentName: "",
    respondentRelationship: "",
    respondentANumber: "",
    sponsorName: "",
    sponsorAddress: "",
    sponsorCity: "",
    sponsorState: "",
    sponsorZip: "",
    sponsorPhone: "",
    sponsorEmail: "",
    sponsorImmigrationStatus: "",
    sponsorOccupation: "",
    sponsorEmployer: "",
    sponsorEmployerAddress: "",
    sponsorAnnualIncome: "",
    sponsorEmploymentLength: "",
    householdSize: "",
    housingType: "",
    housingAddress: "",
    bedroomCount: "",
    willProvideHousing: true,
    willEnsureCourtAppearance: true,
    willProvideTransportation: false,
    willProvideFinancialSupport: false,
    additionalCommitments: "",
    howLongKnown: "",
    relationshipDescription: "",
    whyWillingToSponsor: "",
    characterStatement: "",
    flightRiskStatement: "",
  });
  
  const createMutation = trpc.sponsorLetter.create.useMutation();
  const generateHtmlQuery = trpc.sponsorLetter.generateLetterHtml.useQuery(
    { id: generatedLetterId! },
    { enabled: !!generatedLetterId }
  );
  
  const tabs = [
    { id: "respondent", label: t.respondentTab, icon: User },
    { id: "sponsor", label: t.sponsorTab, icon: Users },
    { id: "financial", label: t.financialTab, icon: DollarSign },
    { id: "housing", label: t.housingTab, icon: Home },
    { id: "commitments", label: t.commitmentsTab, icon: CheckCircle2 },
    { id: "statements", label: t.statementsTab, icon: FileText },
    { id: "signature", label: t.signatureTab, icon: PenTool },
  ];
  
  const currentTabIndex = tabs.findIndex(tab => tab.id === activeTab);
  
  const updateField = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const goToNextTab = () => {
    if (currentTabIndex < tabs.length - 1) {
      setActiveTab(tabs[currentTabIndex + 1].id);
    }
  };
  
  const goToPreviousTab = () => {
    if (currentTabIndex > 0) {
      setActiveTab(tabs[currentTabIndex - 1].id);
    }
  };
  
  const clearSignature = () => {
    signatureRef.current?.clear();
    setSignatureData(null);
  };
  
  const saveSignature = () => {
    if (signatureRef.current && !signatureRef.current.isEmpty()) {
      setSignatureData(signatureRef.current.toDataURL());
    }
  };
  
  const handleSubmit = async () => {
    if (!signatureData) {
      toast.error(t.signatureRequired);
      return;
    }
    
    if (!formData.respondentName || !formData.sponsorName || !formData.sponsorImmigrationStatus) {
      toast.error(t.requiredField);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await createMutation.mutateAsync({
        ...formData,
        householdSize: formData.householdSize ? parseInt(formData.householdSize) : undefined,
        bedroomCount: formData.bedroomCount ? parseInt(formData.bedroomCount) : undefined,
        signatureData,
        language,
      });
      
      if (result?.id) {
        setGeneratedLetterId(result.id);
        setIsGenerated(true);
        toast.success(t.successTitle);
      }
    } catch (error) {
      toast.error("Failed to generate letter. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handlePrint = () => {
    if (generateHtmlQuery.data) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(generateHtmlQuery.data);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };
  
  const handleDownloadHtml = () => {
    if (generateHtmlQuery.data) {
      const blob = new Blob([generateHtmlQuery.data], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `sponsor-letter-${formData.respondentName.replace(/\s+/g, "-")}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };
  
  if (isGenerated && generateHtmlQuery.data) {
    return (
      <>
        <SEO title={t.title} description={t.subtitle} />
        <div className="min-h-screen bg-muted/30 py-12">
          <div className="container max-w-4xl">
            <Card className="border-green-200 bg-green-50/50">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-800">{t.successTitle}</CardTitle>
                <CardDescription className="text-green-700">{t.successDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap justify-center gap-4">
                  <Button onClick={handlePrint} variant="outline" className="gap-2">
                    <FileText className="h-4 w-4" />
                    {t.printLetter}
                  </Button>
                  <Button onClick={handleDownloadHtml} className="gap-2">
                    <Download className="h-4 w-4" />
                    {t.downloadHtml}
                  </Button>
                </div>
                
                <div className="border rounded-lg p-4 bg-white max-h-[500px] overflow-auto">
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: generateHtmlQuery.data }}
                  />
                </div>
                
                <div className="text-center">
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      setIsGenerated(false);
                      setGeneratedLetterId(null);
                      setFormData({
                        respondentName: "",
                        respondentRelationship: "",
                        respondentANumber: "",
                        sponsorName: "",
                        sponsorAddress: "",
                        sponsorCity: "",
                        sponsorState: "",
                        sponsorZip: "",
                        sponsorPhone: "",
                        sponsorEmail: "",
                        sponsorImmigrationStatus: "",
                        sponsorOccupation: "",
                        sponsorEmployer: "",
                        sponsorEmployerAddress: "",
                        sponsorAnnualIncome: "",
                        sponsorEmploymentLength: "",
                        householdSize: "",
                        housingType: "",
                        housingAddress: "",
                        bedroomCount: "",
                        willProvideHousing: true,
                        willEnsureCourtAppearance: true,
                        willProvideTransportation: false,
                        willProvideFinancialSupport: false,
                        additionalCommitments: "",
                        howLongKnown: "",
                        relationshipDescription: "",
                        whyWillingToSponsor: "",
                        characterStatement: "",
                        flightRiskStatement: "",
                      });
                      clearSignature();
                      setActiveTab("respondent");
                    }}
                  >
                    Create Another Letter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <SEO title={t.title} description={t.subtitle} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <FileText className="h-5 w-5" />
              <span className="text-sm font-medium">Immigration Support Document</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
            <p className="text-xl text-primary-foreground/90">{t.subtitle}</p>
          </div>
        </div>
      </section>
      
      {/* Form Section */}
      <section className="py-12 bg-muted/30">
        <div className="container max-w-4xl">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-7 mb-8 h-auto p-1">
              {tabs.map((tab, index) => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className="flex flex-col gap-1 py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="text-xs hidden md:block">{tab.label}</span>
                  <span className="text-xs md:hidden">{index + 1}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            {/* Respondent Tab */}
            <TabsContent value="respondent">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    {t.respondentTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>{t.respondentName} *</Label>
                    <Input 
                      value={formData.respondentName}
                      onChange={e => updateField("respondentName", e.target.value)}
                      placeholder="Enter full legal name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{t.respondentRelationship} *</Label>
                    <Input 
                      value={formData.respondentRelationship}
                      onChange={e => updateField("respondentRelationship", e.target.value)}
                      placeholder="e.g., Spouse, Parent, Sibling, Friend"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{t.respondentANumber}</Label>
                    <Input 
                      value={formData.respondentANumber}
                      onChange={e => updateField("respondentANumber", e.target.value)}
                      placeholder="e.g., A123-456-789"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Sponsor Info Tab */}
            <TabsContent value="sponsor">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    {t.sponsorTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>{t.sponsorName} *</Label>
                    <Input 
                      value={formData.sponsorName}
                      onChange={e => updateField("sponsorName", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{t.sponsorAddress} *</Label>
                    <Input 
                      value={formData.sponsorAddress}
                      onChange={e => updateField("sponsorAddress", e.target.value)}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>{t.sponsorCity} *</Label>
                      <Input 
                        value={formData.sponsorCity}
                        onChange={e => updateField("sponsorCity", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>{t.sponsorState} *</Label>
                      <Select 
                        value={formData.sponsorState} 
                        onValueChange={v => updateField("sponsorState", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {US_STATES.map(state => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>{t.sponsorZip} *</Label>
                      <Input 
                        value={formData.sponsorZip}
                        onChange={e => updateField("sponsorZip", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t.sponsorPhone} *</Label>
                      <Input 
                        type="tel"
                        value={formData.sponsorPhone}
                        onChange={e => updateField("sponsorPhone", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>{t.sponsorEmail}</Label>
                      <Input 
                        type="email"
                        value={formData.sponsorEmail}
                        onChange={e => updateField("sponsorEmail", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{t.sponsorImmigrationStatus} *</Label>
                    <Select 
                      value={formData.sponsorImmigrationStatus} 
                      onValueChange={v => updateField("sponsorImmigrationStatus", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your immigration status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="U.S. Citizen">{t.usCitizen}</SelectItem>
                        <SelectItem value="Lawful Permanent Resident">{t.permanentResident}</SelectItem>
                        <SelectItem value="Asylee">{t.asylumGranted}</SelectItem>
                        <SelectItem value="Refugee">{t.refugeeStatus}</SelectItem>
                        <SelectItem value="Valid Visa Holder">{t.validVisa}</SelectItem>
                        <SelectItem value="TPS Holder">{t.tpsHolder}</SelectItem>
                        <SelectItem value="DACA Recipient">{t.dacaRecipient}</SelectItem>
                        <SelectItem value="Other">{t.other}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Financial Tab */}
            <TabsContent value="financial">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    {t.financialTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>{t.occupation}</Label>
                    <Input 
                      value={formData.sponsorOccupation}
                      onChange={e => updateField("sponsorOccupation", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{t.employer}</Label>
                    <Input 
                      value={formData.sponsorEmployer}
                      onChange={e => updateField("sponsorEmployer", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{t.employerAddress}</Label>
                    <Input 
                      value={formData.sponsorEmployerAddress}
                      onChange={e => updateField("sponsorEmployerAddress", e.target.value)}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t.annualIncome}</Label>
                      <Input 
                        value={formData.sponsorAnnualIncome}
                        onChange={e => updateField("sponsorAnnualIncome", e.target.value)}
                        placeholder="e.g., $45,000"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>{t.employmentLength}</Label>
                      <Input 
                        value={formData.sponsorEmploymentLength}
                        onChange={e => updateField("sponsorEmploymentLength", e.target.value)}
                        placeholder="e.g., 3 years"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{t.householdSize}</Label>
                    <Input 
                      type="number"
                      min="1"
                      value={formData.householdSize}
                      onChange={e => updateField("householdSize", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Housing Tab */}
            <TabsContent value="housing">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-primary" />
                    {t.housingTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>{t.housingType}</Label>
                    <Select 
                      value={formData.housingType} 
                      onValueChange={v => updateField("housingType", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select housing type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="own">{t.housingOwn}</SelectItem>
                        <SelectItem value="rent">{t.housingRent}</SelectItem>
                        <SelectItem value="other">{t.housingOther}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{t.housingAddress}</Label>
                    <Input 
                      value={formData.housingAddress}
                      onChange={e => updateField("housingAddress", e.target.value)}
                      placeholder="Leave blank if same as your address"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{t.bedroomCount}</Label>
                    <Input 
                      type="number"
                      min="1"
                      value={formData.bedroomCount}
                      onChange={e => updateField("bedroomCount", e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-3 rounded-md border p-4">
                    <Checkbox
                      id="willProvideHousing"
                      checked={formData.willProvideHousing}
                      onCheckedChange={v => updateField("willProvideHousing", !!v)}
                    />
                    <Label htmlFor="willProvideHousing">{t.willProvideHousing}</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Commitments Tab */}
            <TabsContent value="commitments">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    {t.commitmentsTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-3 rounded-md border p-4 bg-primary/5">
                    <Checkbox
                      id="willEnsureCourtAppearance"
                      checked={formData.willEnsureCourtAppearance}
                      onCheckedChange={v => updateField("willEnsureCourtAppearance", !!v)}
                    />
                    <Label htmlFor="willEnsureCourtAppearance" className="font-medium">
                      {t.willEnsureCourtAppearance}
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 rounded-md border p-4">
                    <Checkbox
                      id="willProvideTransportation"
                      checked={formData.willProvideTransportation}
                      onCheckedChange={v => updateField("willProvideTransportation", !!v)}
                    />
                    <Label htmlFor="willProvideTransportation">{t.willProvideTransportation}</Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 rounded-md border p-4">
                    <Checkbox
                      id="willProvideFinancialSupport"
                      checked={formData.willProvideFinancialSupport}
                      onCheckedChange={v => updateField("willProvideFinancialSupport", !!v)}
                    />
                    <Label htmlFor="willProvideFinancialSupport">{t.willProvideFinancialSupport}</Label>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{t.additionalCommitments}</Label>
                    <Textarea 
                      value={formData.additionalCommitments}
                      onChange={e => updateField("additionalCommitments", e.target.value)}
                      className="min-h-[100px]"
                      placeholder="Describe any other ways you will support..."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Statements Tab */}
            <TabsContent value="statements">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    {t.statementsTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>{t.howLongKnown}</Label>
                    <Input 
                      value={formData.howLongKnown}
                      onChange={e => updateField("howLongKnown", e.target.value)}
                      placeholder="e.g., 5 years, since childhood"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{t.relationshipDescription}</Label>
                    <Textarea 
                      value={formData.relationshipDescription}
                      onChange={e => updateField("relationshipDescription", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{t.whyWillingToSponsor}</Label>
                    <Textarea 
                      value={formData.whyWillingToSponsor}
                      onChange={e => updateField("whyWillingToSponsor", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{t.characterStatement}</Label>
                    <Textarea 
                      value={formData.characterStatement}
                      onChange={e => updateField("characterStatement", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{t.flightRiskStatement}</Label>
                    <Textarea 
                      value={formData.flightRiskStatement}
                      onChange={e => updateField("flightRiskStatement", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Signature Tab */}
            <TabsContent value="signature">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PenTool className="h-5 w-5 text-primary" />
                    {t.signatureTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{t.signatureInstructions}</p>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-2 bg-white">
                      <SignatureCanvas
                        ref={signatureRef}
                        canvasProps={{
                          className: "w-full h-40 border rounded",
                          style: { touchAction: "none" }
                        }}
                        onEnd={saveSignature}
                      />
                    </div>
                    <Button type="button" variant="outline" onClick={clearSignature} className="gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {t.clearSignature}
                    </Button>
                  </div>
                  
                  {signatureData && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-700 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Signature captured successfully
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={goToPreviousTab}
                disabled={currentTabIndex === 0}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {t.previous}
              </Button>
              
              {currentTabIndex < tabs.length - 1 ? (
                <Button
                  type="button"
                  onClick={goToNextTab}
                  className="gap-2"
                >
                  {t.next}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !signatureData}
                  className="gap-2"
                >
                  {isSubmitting ? (
                    <>Generating...</>
                  ) : (
                    <>
                      <FileText className="h-4 w-4" />
                      {t.generateLetter}
                    </>
                  )}
                </Button>
              )}
            </div>
          </Tabs>
        </div>
      </section>
    </>
  );
}
