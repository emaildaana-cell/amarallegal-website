import { useState, useRef, useEffect } from "react";
import { useRoute } from "wouter";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  FileText, 
  User, 
  Heart, 
  PenTool, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Download,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  Users,
  Briefcase,
  Home,
  Scale,
  Shield,
  HelpCircle,
  Lightbulb,
  Star
} from "lucide-react";

// Matter of Guerra factors for bond hearings
const GUERRA_FACTORS = [
  "Whether the alien has a fixed address in the United States",
  "The alien's length of residence in the United States",
  "The alien's family ties in the United States",
  "The alien's employment history",
  "The alien's record of appearance at court proceedings",
  "The alien's criminal record, including the extensiveness of criminal activity",
  "The alien's history of immigration violations",
  "Any attempts by the alien to flee prosecution or otherwise escape from authorities",
  "The alien's manner of entry to the United States"
];

interface StepProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  guerraFactor?: string;
  tip?: string;
  example?: string;
}

const STEPS: StepProps[] = [
  {
    title: "Your Information",
    description: "Tell us about yourself so the judge knows who is writing this letter.",
    icon: <User className="w-6 h-6" />,
    tip: "Your credibility matters. Include your immigration status if you are a U.S. citizen or permanent resident - this carries more weight with the judge."
  },
  {
    title: "Your Relationship",
    description: "Explain how you know the person and for how long.",
    icon: <Users className="w-6 h-6" />,
    guerraFactor: "The alien's family ties in the United States",
    tip: "The longer and closer your relationship, the more valuable your testimony. Be specific about dates and how you met.",
    example: "I have known [Name] for 8 years. We met when our children started kindergarten together at Lincoln Elementary School in 2016."
  },
  {
    title: "Community & Family Ties",
    description: "Describe their connections to the community and family relationships.",
    icon: <Home className="w-6 h-6" />,
    guerraFactor: "Whether the alien has a fixed address in the United States / Family ties",
    tip: "Judges want to know the person has strong roots here and won't flee. Mention their home, children in school, church membership, etc.",
    example: "He has lived at the same address for 5 years, his three children attend local schools, and he is an active member of St. Mary's Church where he volunteers weekly."
  },
  {
    title: "Employment & Work Ethic",
    description: "Describe their employment history and work ethic.",
    icon: <Briefcase className="w-6 h-6" />,
    guerraFactor: "The alien's employment history",
    tip: "Steady employment shows stability and responsibility. Mention how long they've worked, their reliability, and any promotions or recognition.",
    example: "Maria has worked at ABC Construction for 6 years, starting as a laborer and being promoted to crew supervisor. Her employer says she has never missed a day of work."
  },
  {
    title: "Moral Character",
    description: "Describe their character, values, and how they treat others.",
    icon: <Heart className="w-6 h-6" />,
    guerraFactor: "The alien's criminal record / manner of entry",
    tip: "Focus on positive character traits: honesty, kindness, responsibility. If they made mistakes in the past, explain how they've changed.",
    example: "He is one of the most honest and hardworking people I know. He always puts his family first and has never been involved in any trouble."
  },
  {
    title: "Flight Risk Assessment",
    description: "Explain why they will appear for all court dates.",
    icon: <Scale className="w-6 h-6" />,
    guerraFactor: "Record of appearance at court proceedings / attempts to flee",
    tip: "This is crucial. Explain why they have every reason to stay and appear in court - family, job, home, community ties.",
    example: "I am confident he will appear for all court dates because his entire life is here - his wife, children, job, and home. He has nowhere else to go and would never abandon his family."
  },
  {
    title: "Why They Deserve Bond",
    description: "Make your final case for why bond should be granted.",
    icon: <Shield className="w-6 h-6" />,
    tip: "Summarize the key points: they are not a danger to the community, they will appear for court, and they have strong ties here.",
    example: "I respectfully ask the court to grant bond because [Name] is not a danger to anyone, has deep roots in this community, and will absolutely appear for all court dates."
  },
  {
    title: "Review & Sign",
    description: "Review your letter and provide your signature.",
    icon: <PenTool className="w-6 h-6" />,
    tip: "Your signature certifies that everything in this letter is true. Make sure all information is accurate before signing."
  }
];

export default function CharacterReferenceLetter() {
  const [, params] = useRoute("/character-letter/:token");
  const accessToken = params?.token || "";
  const { t } = useLanguage();
  
  const signatureRef = useRef<SignatureCanvas>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [showTip, setShowTip] = useState(true);
  
  // Form state organized by step
  const [formData, setFormData] = useState({
    // Step 1: Your Information
    writerName: "",
    writerAddress: "",
    writerCity: "",
    writerState: "",
    writerZip: "",
    writerPhone: "",
    writerEmail: "",
    writerOccupation: "",
    writerEmployer: "",
    writerImmigrationStatus: "",
    
    // Step 2: Relationship
    writerRelationship: "",
    howLongKnown: "",
    howMet: "",
    frequencyOfContact: "",
    
    // Step 3: Community & Family Ties
    communityInvolvement: "",
    familyRole: "",
    lengthOfResidence: "",
    homeOwnership: "",
    childrenInSchool: "",
    churchOrOrganizations: "",
    
    // Step 4: Employment
    workEthic: "",
    employmentDetails: "",
    employerRelationship: "",
    
    // Step 5: Moral Character
    characterDescription: "",
    specificExamples: "",
    moralCharacter: "",
    howTheyTreatOthers: "",
    
    // Step 6: Flight Risk
    whyWillAppear: "",
    tiesPreventingFlight: "",
    
    // Step 7: Why Deserve Bond
    whyDeservesBond: "",
    additionalComments: "",
    closingStatement: "",
  });
  
  // Fetch letter data
  const { data: letter, isLoading, error, refetch } = trpc.characterLetter.getByToken.useQuery(
    { accessToken },
    { enabled: !!accessToken }
  );
  
  // Update mutation
  const updateMutation = trpc.characterLetter.update.useMutation({
    onSuccess: () => {
      setSaveMessage("Progress saved!");
      setTimeout(() => setSaveMessage(""), 3000);
    },
    onError: (error) => {
      setSaveMessage(`Error: ${error.message}`);
    },
  });
  
  // Sign mutation
  const signMutation = trpc.characterLetter.sign.useMutation({
    onSuccess: () => {
      refetch();
    },
  });
  
  // Generate PDF mutation
  const generatePdfMutation = trpc.characterLetter.generatePdf.useMutation();
  
  // Load existing data into form
  useEffect(() => {
    if (letter) {
      setFormData(prev => ({
        ...prev,
        writerName: letter.writerName || "",
        writerRelationship: letter.writerRelationship || "",
        writerAddress: letter.writerAddress || "",
        writerCity: letter.writerCity || "",
        writerState: letter.writerState || "",
        writerZip: letter.writerZip || "",
        writerPhone: letter.writerPhone || "",
        writerEmail: letter.writerEmail || "",
        writerOccupation: letter.writerOccupation || "",
        writerEmployer: letter.writerEmployer || "",
        writerImmigrationStatus: letter.writerImmigrationStatus || "",
        howLongKnown: letter.howLongKnown || "",
        howMet: letter.howMet || "",
        frequencyOfContact: letter.frequencyOfContact || "",
        characterDescription: letter.characterDescription || "",
        specificExamples: letter.specificExamples || "",
        communityInvolvement: letter.communityInvolvement || "",
        familyRole: letter.familyRole || "",
        workEthic: letter.workEthic || "",
        moralCharacter: letter.moralCharacter || "",
        whyDeservesBond: letter.whyDeservesBond || "",
        additionalComments: letter.additionalComments || "",
      }));
    }
  }, [letter]);
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateMutation.mutateAsync({
        accessToken,
        writerName: formData.writerName,
        writerRelationship: formData.writerRelationship,
        writerAddress: formData.writerAddress,
        writerCity: formData.writerCity,
        writerState: formData.writerState,
        writerZip: formData.writerZip,
        writerPhone: formData.writerPhone,
        writerEmail: formData.writerEmail,
        writerOccupation: formData.writerOccupation,
        writerEmployer: formData.writerEmployer,
        writerImmigrationStatus: formData.writerImmigrationStatus,
        howLongKnown: formData.howLongKnown,
        howMet: formData.howMet,
        frequencyOfContact: formData.frequencyOfContact,
        characterDescription: formData.characterDescription,
        specificExamples: formData.specificExamples,
        communityInvolvement: formData.communityInvolvement,
        familyRole: formData.familyRole,
        workEthic: formData.workEthic,
        moralCharacter: formData.moralCharacter,
        whyDeservesBond: formData.whyDeservesBond,
        additionalComments: formData.additionalComments,
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleSign = async () => {
    if (!signatureRef.current || signatureRef.current.isEmpty()) {
      alert("Please provide your signature before submitting.");
      return;
    }
    
    if (!formData.writerName || !formData.characterDescription) {
      alert("Please complete all required fields before signing.");
      return;
    }
    
    setIsSigning(true);
    try {
      await updateMutation.mutateAsync({
        accessToken,
        writerName: formData.writerName,
        writerRelationship: formData.writerRelationship,
        writerAddress: formData.writerAddress,
        writerCity: formData.writerCity,
        writerState: formData.writerState,
        writerZip: formData.writerZip,
        writerPhone: formData.writerPhone,
        writerEmail: formData.writerEmail,
        writerOccupation: formData.writerOccupation,
        writerEmployer: formData.writerEmployer,
        writerImmigrationStatus: formData.writerImmigrationStatus,
        howLongKnown: formData.howLongKnown,
        howMet: formData.howMet,
        frequencyOfContact: formData.frequencyOfContact,
        characterDescription: formData.characterDescription,
        specificExamples: formData.specificExamples,
        communityInvolvement: formData.communityInvolvement,
        familyRole: formData.familyRole,
        workEthic: formData.workEthic,
        moralCharacter: formData.moralCharacter,
        whyDeservesBond: formData.whyDeservesBond,
        additionalComments: formData.additionalComments,
      });
      
      const signatureData = signatureRef.current.toDataURL();
      await signMutation.mutateAsync({
        accessToken,
        signatureData,
      });
    } finally {
      setIsSigning(false);
    }
  };
  
  const handleClearSignature = () => {
    signatureRef.current?.clear();
  };
  
  const handleDownloadPdf = async () => {
    try {
      const result = await generatePdfMutation.mutateAsync({ accessToken });
      if (result.pdfUrl) {
        window.open(result.pdfUrl, "_blank");
      }
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };
  
  const nextStep = () => {
    handleSave();
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const progress = ((currentStep + 1) / STEPS.length) * 100;
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading letter...</p>
        </div>
      </div>
    );
  }
  
  if (error || !letter) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              Letter Not Found
            </CardTitle>
            <CardDescription>
              This letter link may be invalid or expired. Please contact the attorney's office for a new link.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }
  
  // If already signed, show completion
  if (letter.signedAt) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-700">Letter Submitted Successfully!</CardTitle>
              <CardDescription className="text-base">
                Thank you for submitting your character reference letter for {letter.respondentName}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <FileText className="w-4 h-4" />
                <AlertTitle>What happens next?</AlertTitle>
                <AlertDescription>
                  Your letter has been sent to the attorney's office and will be included in the bond hearing package.
                  The attorney may contact you if they need any additional information.
                </AlertDescription>
              </Alert>
              
              <Button onClick={handleDownloadPdf} className="w-full" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Your Letter (PDF)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  const currentStepData = STEPS[currentStep];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Character Reference Letter Builder
          </h1>
          <p className="text-gray-600">
            For: <span className="font-semibold text-primary">{letter.respondentName}</span>
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Step {currentStep + 1} of {STEPS.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
          
          {/* Step indicators */}
          <div className="flex justify-between mt-4">
            {STEPS.map((step, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`flex flex-col items-center ${
                  index <= currentStep ? 'text-primary' : 'text-gray-400'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index < currentStep 
                    ? 'bg-primary text-white' 
                    : index === currentStep 
                      ? 'bg-primary/20 text-primary border-2 border-primary' 
                      : 'bg-gray-200 text-gray-500'
                }`}>
                  {index < currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
                </div>
                <span className="text-xs mt-1 hidden md:block max-w-[80px] text-center truncate">
                  {step.title}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Save Message */}
        {saveMessage && (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <AlertDescription className="text-green-700">{saveMessage}</AlertDescription>
          </Alert>
        )}
        
        {/* Current Step Card */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                {currentStepData.icon}
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl">{currentStepData.title}</CardTitle>
                <CardDescription className="text-base mt-1">
                  {currentStepData.description}
                </CardDescription>
              </div>
            </div>
            
            {/* Guerra Factor Badge */}
            {currentStepData.guerraFactor && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start gap-2">
                  <Scale className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-blue-800 uppercase tracking-wide">
                      Matter of Guerra Factor
                    </p>
                    <p className="text-sm text-blue-700 mt-0.5">
                      {currentStepData.guerraFactor}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Tip Box */}
            {currentStepData.tip && showTip && (
              <Alert className="bg-amber-50 border-amber-200">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <AlertTitle className="text-amber-800">Tip for a Strong Letter</AlertTitle>
                <AlertDescription className="text-amber-700">
                  {currentStepData.tip}
                </AlertDescription>
                {currentStepData.example && (
                  <div className="mt-3 p-3 bg-white rounded border border-amber-200">
                    <p className="text-xs font-medium text-amber-800 uppercase tracking-wide mb-1">
                      Example
                    </p>
                    <p className="text-sm text-gray-700 italic">
                      "{currentStepData.example}"
                    </p>
                  </div>
                )}
              </Alert>
            )}
            
            {/* Step Content */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="writerName">Your Full Legal Name *</Label>
                    <Input
                      id="writerName"
                      value={formData.writerName}
                      onChange={(e) => handleInputChange("writerName", e.target.value)}
                      placeholder="John Michael Smith"
                    />
                  </div>
                  <div>
                    <Label htmlFor="writerImmigrationStatus">Your Immigration Status *</Label>
                    <Select
                      value={formData.writerImmigrationStatus}
                      onValueChange={(value) => handleInputChange("writerImmigrationStatus", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us_citizen">U.S. Citizen</SelectItem>
                        <SelectItem value="permanent_resident">Permanent Resident (Green Card)</SelectItem>
                        <SelectItem value="visa_holder">Visa Holder</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-1">
                      Letters from U.S. citizens and permanent residents carry more weight
                    </p>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="writerAddress">Street Address</Label>
                  <Input
                    id="writerAddress"
                    value={formData.writerAddress}
                    onChange={(e) => handleInputChange("writerAddress", e.target.value)}
                    placeholder="123 Main Street, Apt 4B"
                  />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="writerCity">City</Label>
                    <Input
                      id="writerCity"
                      value={formData.writerCity}
                      onChange={(e) => handleInputChange("writerCity", e.target.value)}
                      placeholder="Miami"
                    />
                  </div>
                  <div>
                    <Label htmlFor="writerState">State</Label>
                    <Input
                      id="writerState"
                      value={formData.writerState}
                      onChange={(e) => handleInputChange("writerState", e.target.value)}
                      placeholder="FL"
                    />
                  </div>
                  <div>
                    <Label htmlFor="writerZip">ZIP Code</Label>
                    <Input
                      id="writerZip"
                      value={formData.writerZip}
                      onChange={(e) => handleInputChange("writerZip", e.target.value)}
                      placeholder="33101"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="writerPhone">Phone Number</Label>
                    <Input
                      id="writerPhone"
                      value={formData.writerPhone}
                      onChange={(e) => handleInputChange("writerPhone", e.target.value)}
                      placeholder="(305) 555-1234"
                    />
                  </div>
                  <div>
                    <Label htmlFor="writerEmail">Email Address</Label>
                    <Input
                      id="writerEmail"
                      type="email"
                      value={formData.writerEmail}
                      onChange={(e) => handleInputChange("writerEmail", e.target.value)}
                      placeholder="john.smith@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="writerOccupation">Your Occupation</Label>
                    <Input
                      id="writerOccupation"
                      value={formData.writerOccupation}
                      onChange={(e) => handleInputChange("writerOccupation", e.target.value)}
                      placeholder="Teacher, Business Owner, Nurse, etc."
                    />
                  </div>
                  <div>
                    <Label htmlFor="writerEmployer">Employer (if applicable)</Label>
                    <Input
                      id="writerEmployer"
                      value={formData.writerEmployer}
                      onChange={(e) => handleInputChange("writerEmployer", e.target.value)}
                      placeholder="Company or organization name"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="writerRelationship">What is your relationship to {letter.respondentName}? *</Label>
                  <Select
                    value={formData.writerRelationship}
                    onValueChange={(value) => handleInputChange("writerRelationship", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="child">Son/Daughter</SelectItem>
                      <SelectItem value="sibling">Brother/Sister</SelectItem>
                      <SelectItem value="extended_family">Extended Family Member</SelectItem>
                      <SelectItem value="friend">Close Friend</SelectItem>
                      <SelectItem value="neighbor">Neighbor</SelectItem>
                      <SelectItem value="coworker">Coworker</SelectItem>
                      <SelectItem value="employer">Employer</SelectItem>
                      <SelectItem value="pastor">Pastor/Religious Leader</SelectItem>
                      <SelectItem value="teacher">Teacher/Mentor</SelectItem>
                      <SelectItem value="community">Community Member</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="howLongKnown">How long have you known them? *</Label>
                  <Input
                    id="howLongKnown"
                    value={formData.howLongKnown}
                    onChange={(e) => handleInputChange("howLongKnown", e.target.value)}
                    placeholder="e.g., 8 years, since 2016"
                  />
                </div>
                
                <div>
                  <Label htmlFor="howMet">How did you meet? *</Label>
                  <Textarea
                    id="howMet"
                    value={formData.howMet}
                    onChange={(e) => handleInputChange("howMet", e.target.value)}
                    placeholder="Describe how and where you first met..."
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Be specific - include dates, places, and circumstances
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="frequencyOfContact">How often do you see or speak with them?</Label>
                  <Select
                    value={formData.frequencyOfContact}
                    onValueChange={(value) => handleInputChange("frequencyOfContact", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="several_times_week">Several times a week</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="several_times_month">Several times a month</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="occasionally">Occasionally</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="lengthOfResidence">
                    How long has {letter.respondentName} lived in the United States?
                  </Label>
                  <Input
                    id="lengthOfResidence"
                    value={formData.lengthOfResidence}
                    onChange={(e) => handleInputChange("lengthOfResidence", e.target.value)}
                    placeholder="e.g., 12 years, since 2012"
                  />
                </div>
                
                <div>
                  <Label htmlFor="familyRole">
                    Describe their role in their family *
                  </Label>
                  <Textarea
                    id="familyRole"
                    value={formData.familyRole}
                    onChange={(e) => handleInputChange("familyRole", e.target.value)}
                    placeholder="Are they the primary caregiver? Breadwinner? How do they support their family?"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Mention spouse, children, elderly parents they care for, etc.
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="childrenInSchool">
                    Do they have children in school? If yes, describe.
                  </Label>
                  <Textarea
                    id="childrenInSchool"
                    value={formData.childrenInSchool}
                    onChange={(e) => handleInputChange("childrenInSchool", e.target.value)}
                    placeholder="e.g., Three children attending Miami-Dade County Public Schools - ages 8, 12, and 15"
                    rows={2}
                  />
                </div>
                
                <div>
                  <Label htmlFor="communityInvolvement">
                    Describe their involvement in the community *
                  </Label>
                  <Textarea
                    id="communityInvolvement"
                    value={formData.communityInvolvement}
                    onChange={(e) => handleInputChange("communityInvolvement", e.target.value)}
                    placeholder="Church membership, volunteer work, sports leagues, school activities, neighborhood involvement..."
                    rows={4}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Include specific organizations, how long they've been involved, and what they do
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="churchOrOrganizations">
                    Church or religious community involvement
                  </Label>
                  <Textarea
                    id="churchOrOrganizations"
                    value={formData.churchOrOrganizations}
                    onChange={(e) => handleInputChange("churchOrOrganizations", e.target.value)}
                    placeholder="Name of church, how long they've attended, any roles or volunteer work..."
                    rows={2}
                  />
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="employmentDetails">
                    Describe their employment history *
                  </Label>
                  <Textarea
                    id="employmentDetails"
                    value={formData.employmentDetails}
                    onChange={(e) => handleInputChange("employmentDetails", e.target.value)}
                    placeholder="Where do they work? How long? What do they do? Have they been promoted?"
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="workEthic">
                    Describe their work ethic and reliability *
                  </Label>
                  <Textarea
                    id="workEthic"
                    value={formData.workEthic}
                    onChange={(e) => handleInputChange("workEthic", e.target.value)}
                    placeholder="Are they hardworking? Reliable? Do they show up on time? How do coworkers and supervisors view them?"
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="employerRelationship">
                    If you are their employer or coworker, describe your professional relationship
                  </Label>
                  <Textarea
                    id="employerRelationship"
                    value={formData.employerRelationship}
                    onChange={(e) => handleInputChange("employerRelationship", e.target.value)}
                    placeholder="How long have you worked together? What is their role? How do they perform?"
                    rows={3}
                  />
                </div>
              </div>
            )}
            
            {currentStep === 4 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="characterDescription">
                    Describe their character and personality *
                  </Label>
                  <Textarea
                    id="characterDescription"
                    value={formData.characterDescription}
                    onChange={(e) => handleInputChange("characterDescription", e.target.value)}
                    placeholder="What kind of person are they? What are their best qualities? How would you describe them to someone who doesn't know them?"
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="howTheyTreatOthers">
                    How do they treat others?
                  </Label>
                  <Textarea
                    id="howTheyTreatOthers"
                    value={formData.howTheyTreatOthers}
                    onChange={(e) => handleInputChange("howTheyTreatOthers", e.target.value)}
                    placeholder="How do they treat family, friends, neighbors, strangers? Are they kind, helpful, respectful?"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="specificExamples">
                    Give specific examples of their good character *
                  </Label>
                  <Textarea
                    id="specificExamples"
                    value={formData.specificExamples}
                    onChange={(e) => handleInputChange("specificExamples", e.target.value)}
                    placeholder="Describe specific times when they helped someone, showed kindness, or demonstrated their values..."
                    rows={4}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Specific stories are more powerful than general statements
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="moralCharacter">
                    Is there anything about their moral character you want to emphasize?
                  </Label>
                  <Textarea
                    id="moralCharacter"
                    value={formData.moralCharacter}
                    onChange={(e) => handleInputChange("moralCharacter", e.target.value)}
                    placeholder="Honesty, integrity, responsibility, faith, dedication to family..."
                    rows={3}
                  />
                </div>
              </div>
            )}
            
            {currentStep === 5 && (
              <div className="space-y-4">
                <Alert className="bg-blue-50 border-blue-200">
                  <Scale className="w-4 h-4 text-blue-600" />
                  <AlertTitle className="text-blue-800">Why This Section Matters</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    The judge needs to be convinced that {letter.respondentName} will appear for all future court dates.
                    Your testimony about their ties to the community and reasons to stay is crucial.
                  </AlertDescription>
                </Alert>
                
                <div>
                  <Label htmlFor="whyWillAppear">
                    Why are you confident they will appear for all court dates? *
                  </Label>
                  <Textarea
                    id="whyWillAppear"
                    value={formData.whyWillAppear}
                    onChange={(e) => handleInputChange("whyWillAppear", e.target.value)}
                    placeholder="What makes you certain they will show up? Their character? Their responsibilities? Their family?"
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="tiesPreventingFlight">
                    What ties prevent them from fleeing? *
                  </Label>
                  <Textarea
                    id="tiesPreventingFlight"
                    value={formData.tiesPreventingFlight}
                    onChange={(e) => handleInputChange("tiesPreventingFlight", e.target.value)}
                    placeholder="Family (spouse, children, parents), job, home, community involvement, church..."
                    rows={4}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    List everything that roots them to this community
                  </p>
                </div>
              </div>
            )}
            
            {currentStep === 6 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="whyDeservesBond">
                    In your own words, why should the judge grant bond? *
                  </Label>
                  <Textarea
                    id="whyDeservesBond"
                    value={formData.whyDeservesBond}
                    onChange={(e) => handleInputChange("whyDeservesBond", e.target.value)}
                    placeholder="Summarize why you believe they deserve to be released on bond. Address: 1) They are not a danger to the community, 2) They will appear for court, 3) They have strong ties here."
                    rows={5}
                  />
                </div>
                
                <div>
                  <Label htmlFor="closingStatement">
                    Your closing statement to the judge
                  </Label>
                  <Textarea
                    id="closingStatement"
                    value={formData.closingStatement}
                    onChange={(e) => handleInputChange("closingStatement", e.target.value)}
                    placeholder="e.g., I respectfully ask the court to grant bond so that [Name] can return to their family while their case proceeds. I am willing to testify in person if needed."
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="additionalComments">
                    Anything else you want the judge to know?
                  </Label>
                  <Textarea
                    id="additionalComments"
                    value={formData.additionalComments}
                    onChange={(e) => handleInputChange("additionalComments", e.target.value)}
                    placeholder="Any other information that might help their case..."
                    rows={3}
                  />
                </div>
              </div>
            )}
            
            {currentStep === 7 && (
              <div className="space-y-6">
                {/* Letter Preview */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Letter Preview
                  </h3>
                  <div className="bg-white border rounded-lg p-6 text-sm leading-relaxed max-h-96 overflow-y-auto">
                    <p className="text-right text-gray-600 mb-4">
                      {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    
                    <p className="mb-4">To the Honorable Immigration Judge:</p>
                    
                    <p className="mb-4">
                      My name is <strong>{formData.writerName || "[Your Name]"}</strong>
                      {formData.writerImmigrationStatus && (
                        <>, and I am a {formData.writerImmigrationStatus === 'us_citizen' ? 'United States Citizen' : 
                          formData.writerImmigrationStatus === 'permanent_resident' ? 'Lawful Permanent Resident' : 
                          formData.writerImmigrationStatus}</>
                      )}.
                      I am writing this letter in support of <strong>{letter.respondentName}</strong>'s 
                      request for bond.
                    </p>
                    
                    {formData.howLongKnown && formData.writerRelationship && (
                      <p className="mb-4">
                        I have known {letter.respondentName} for {formData.howLongKnown} as their {formData.writerRelationship}.
                        {formData.howMet && ` ${formData.howMet}`}
                      </p>
                    )}
                    
                    {formData.familyRole && (
                      <p className="mb-4">
                        <strong>Family Role:</strong> {formData.familyRole}
                      </p>
                    )}
                    
                    {formData.communityInvolvement && (
                      <p className="mb-4">
                        <strong>Community Involvement:</strong> {formData.communityInvolvement}
                      </p>
                    )}
                    
                    {(formData.employmentDetails || formData.workEthic) && (
                      <p className="mb-4">
                        <strong>Employment:</strong> {formData.employmentDetails} {formData.workEthic}
                      </p>
                    )}
                    
                    {formData.characterDescription && (
                      <p className="mb-4">
                        <strong>Character:</strong> {formData.characterDescription}
                      </p>
                    )}
                    
                    {formData.specificExamples && (
                      <p className="mb-4">
                        {formData.specificExamples}
                      </p>
                    )}
                    
                    {(formData.whyWillAppear || formData.tiesPreventingFlight) && (
                      <p className="mb-4">
                        <strong>Flight Risk:</strong> {formData.whyWillAppear} {formData.tiesPreventingFlight}
                      </p>
                    )}
                    
                    {formData.whyDeservesBond && (
                      <p className="mb-4">
                        {formData.whyDeservesBond}
                      </p>
                    )}
                    
                    {formData.closingStatement && (
                      <p className="mb-4">
                        {formData.closingStatement}
                      </p>
                    )}
                    
                    <p className="mb-8">
                      I declare under penalty of perjury that the foregoing is true and correct.
                    </p>
                    
                    <p>Respectfully submitted,</p>
                    <p className="mt-8 font-semibold">{formData.writerName || "[Your Signature]"}</p>
                    {formData.writerAddress && (
                      <p className="text-gray-600">
                        {formData.writerAddress}<br />
                        {formData.writerCity}, {formData.writerState} {formData.writerZip}
                      </p>
                    )}
                    {formData.writerPhone && <p className="text-gray-600">{formData.writerPhone}</p>}
                    {formData.writerEmail && <p className="text-gray-600">{formData.writerEmail}</p>}
                  </div>
                </div>
                
                {/* Signature Pad */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <PenTool className="w-5 h-5" />
                    Your Signature
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    By signing below, you certify that all information in this letter is true and correct
                    to the best of your knowledge.
                  </p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 bg-white">
                    <SignatureCanvas
                      ref={signatureRef}
                      canvasProps={{
                        className: "w-full h-32 border rounded",
                        style: { touchAction: 'none' }
                      }}
                      backgroundColor="white"
                    />
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleClearSignature}
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Clear Signature
                    </Button>
                  </div>
                </div>
                
                {/* Submit Button */}
                <Button
                  onClick={handleSign}
                  disabled={isSigning || !formData.writerName || !formData.characterDescription}
                  className="w-full h-12 text-lg"
                >
                  {isSigning ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Sign & Submit Letter
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          {currentStep < STEPS.length - 1 ? (
            <Button onClick={nextStep} className="gap-2">
              Save & Continue
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button variant="outline" onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  Save Progress
                </>
              )}
            </Button>
          )}
        </div>
        
        {/* Matter of Guerra Factors Reference */}
        <Card className="mt-8 bg-gray-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" />
              Matter of Guerra Bond Factors
            </CardTitle>
            <CardDescription>
              Immigration judges consider these factors when deciding bond
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-1">
              {GUERRA_FACTORS.map((factor, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary font-medium">{index + 1}.</span>
                  {factor}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
