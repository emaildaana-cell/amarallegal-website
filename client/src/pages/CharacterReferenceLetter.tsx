import { useState, useRef, useEffect } from "react";
import { useRoute } from "wouter";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  RefreshCw
} from "lucide-react";

export default function CharacterReferenceLetter() {
  const [, params] = useRoute("/character-letter/:token");
  const accessToken = params?.token || "";
  const { t } = useLanguage();
  
  const signatureRef = useRef<SignatureCanvas>(null);
  const [activeTab, setActiveTab] = useState("writer");
  const [isSaving, setIsSaving] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  
  // Form state
  const [formData, setFormData] = useState({
    writerName: "",
    writerRelationship: "",
    writerAddress: "",
    writerCity: "",
    writerState: "",
    writerZip: "",
    writerPhone: "",
    writerEmail: "",
    writerOccupation: "",
    writerEmployer: "",
    writerImmigrationStatus: "",
    howLongKnown: "",
    howMet: "",
    frequencyOfContact: "",
    characterDescription: "",
    specificExamples: "",
    communityInvolvement: "",
    familyRole: "",
    workEthic: "",
    moralCharacter: "",
    whyDeservesBond: "",
    additionalComments: "",
  });
  
  // Fetch letter data
  const { data: letter, isLoading, error, refetch } = trpc.characterLetter.getByToken.useQuery(
    { accessToken },
    { enabled: !!accessToken }
  );
  
  // Update mutation
  const updateMutation = trpc.characterLetter.update.useMutation({
    onSuccess: () => {
      setSaveMessage("Progress saved successfully!");
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
      setFormData({
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
      });
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
        ...formData,
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
    
    // Validate required fields
    if (!formData.writerName || !formData.characterDescription) {
      alert("Please complete all required fields (Your Name and Character Description) before signing.");
      return;
    }
    
    setIsSigning(true);
    try {
      // First save the form data
      await updateMutation.mutateAsync({
        accessToken,
        ...formData,
      });
      
      // Then sign with signature data
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
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              This character reference letter link is invalid or has expired. 
              Please contact the attorney's office for a new link.
            </p>
            <Button variant="outline" onClick={() => window.location.href = "/"}>
              Return to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Show completed state
  if (letter.status === "completed" || letter.status === "submitted") {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-700">Thank You!</CardTitle>
              <CardDescription className="text-lg">
                Your character reference letter for <strong>{letter.respondentName}</strong> has been submitted successfully.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <FileText className="w-4 h-4" />
                <AlertTitle>Letter Submitted</AlertTitle>
                <AlertDescription>
                  Your letter was signed on {letter.signedAt ? new Date(letter.signedAt).toLocaleDateString() : "N/A"}.
                  The attorney's office will include this letter in the case file.
                </AlertDescription>
              </Alert>
              
              <div className="flex gap-4 justify-center pt-4">
                <Button onClick={handleDownloadPdf} disabled={generatePdfMutation.isPending}>
                  {generatePdfMutation.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4 mr-2" />
                  )}
                  Download Copy
                </Button>
                <Button variant="outline" onClick={() => window.location.href = "/"}>
                  Return to Homepage
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Character Reference Letter</h1>
          <p className="text-lg text-gray-600">
            For: <strong>{letter.respondentName}</strong>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Case Type: {letter.caseType?.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
          </p>
        </div>
        
        {/* Instructions */}
        <Alert className="mb-6">
          <FileText className="w-4 h-4" />
          <AlertTitle>Instructions</AlertTitle>
          <AlertDescription>
            Please complete this form to provide a character reference letter. Your letter will help support 
            {letter.respondentName}'s immigration case. Be specific and honest in your responses. 
            You can save your progress and return later to complete the form.
          </AlertDescription>
        </Alert>
        
        {/* Save Message */}
        {saveMessage && (
          <Alert className={`mb-4 ${saveMessage.includes("Error") ? "border-red-500" : "border-green-500"}`}>
            <AlertDescription>{saveMessage}</AlertDescription>
          </Alert>
        )}
        
        {/* Form Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="writer" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Your Info</span>
            </TabsTrigger>
            <TabsTrigger value="relationship" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Relationship</span>
            </TabsTrigger>
            <TabsTrigger value="character" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Character</span>
            </TabsTrigger>
            <TabsTrigger value="signature" className="flex items-center gap-2">
              <PenTool className="w-4 h-4" />
              <span className="hidden sm:inline">Sign</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Tab 1: Writer Information */}
          <TabsContent value="writer">
            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>
                  Please provide your personal information. This will appear on the letter.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="writerName">Full Legal Name *</Label>
                    <Input
                      id="writerName"
                      value={formData.writerName}
                      onChange={(e) => handleInputChange("writerName", e.target.value)}
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="writerRelationship">Relationship to {letter.respondentName} *</Label>
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
                        <SelectItem value="child">Child</SelectItem>
                        <SelectItem value="sibling">Sibling</SelectItem>
                        <SelectItem value="relative">Other Relative</SelectItem>
                        <SelectItem value="friend">Friend</SelectItem>
                        <SelectItem value="neighbor">Neighbor</SelectItem>
                        <SelectItem value="employer">Employer</SelectItem>
                        <SelectItem value="coworker">Coworker</SelectItem>
                        <SelectItem value="teacher">Teacher/Professor</SelectItem>
                        <SelectItem value="religious_leader">Religious Leader</SelectItem>
                        <SelectItem value="community_member">Community Member</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="writerAddress">Street Address</Label>
                  <Input
                    id="writerAddress"
                    value={formData.writerAddress}
                    onChange={(e) => handleInputChange("writerAddress", e.target.value)}
                    placeholder="123 Main Street"
                  />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="writerCity">City</Label>
                    <Input
                      id="writerCity"
                      value={formData.writerCity}
                      onChange={(e) => handleInputChange("writerCity", e.target.value)}
                      placeholder="Miami"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="writerState">State</Label>
                    <Input
                      id="writerState"
                      value={formData.writerState}
                      onChange={(e) => handleInputChange("writerState", e.target.value)}
                      placeholder="FL"
                    />
                  </div>
                  <div className="space-y-2">
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
                  <div className="space-y-2">
                    <Label htmlFor="writerPhone">Phone Number</Label>
                    <Input
                      id="writerPhone"
                      type="tel"
                      value={formData.writerPhone}
                      onChange={(e) => handleInputChange("writerPhone", e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="writerEmail">Email Address</Label>
                    <Input
                      id="writerEmail"
                      type="email"
                      value={formData.writerEmail}
                      onChange={(e) => handleInputChange("writerEmail", e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="writerOccupation">Occupation</Label>
                    <Input
                      id="writerOccupation"
                      value={formData.writerOccupation}
                      onChange={(e) => handleInputChange("writerOccupation", e.target.value)}
                      placeholder="Teacher"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="writerEmployer">Employer</Label>
                    <Input
                      id="writerEmployer"
                      value={formData.writerEmployer}
                      onChange={(e) => handleInputChange("writerEmployer", e.target.value)}
                      placeholder="Miami-Dade County Public Schools"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="writerImmigrationStatus">Your Immigration Status</Label>
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
                      <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button onClick={() => { handleSave(); setActiveTab("relationship"); }}>
                    Save & Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tab 2: Relationship */}
          <TabsContent value="relationship">
            <Card>
              <CardHeader>
                <CardTitle>Your Relationship</CardTitle>
                <CardDescription>
                  Tell us about how you know {letter.respondentName}.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="howLongKnown">How long have you known {letter.respondentName}?</Label>
                    <Input
                      id="howLongKnown"
                      value={formData.howLongKnown}
                      onChange={(e) => handleInputChange("howLongKnown", e.target.value)}
                      placeholder="e.g., 5 years, since 2018"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="frequencyOfContact">How often do you interact?</Label>
                    <Select
                      value={formData.frequencyOfContact}
                      onValueChange={(value) => handleInputChange("frequencyOfContact", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="occasionally">Occasionally</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="howMet">How did you meet?</Label>
                  <Textarea
                    id="howMet"
                    value={formData.howMet}
                    onChange={(e) => handleInputChange("howMet", e.target.value)}
                    placeholder="Describe how and where you first met..."
                    rows={3}
                  />
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("writer")}>
                    Back
                  </Button>
                  <Button onClick={() => { handleSave(); setActiveTab("character"); }}>
                    Save & Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tab 3: Character */}
          <TabsContent value="character">
            <Card>
              <CardHeader>
                <CardTitle>Character Reference</CardTitle>
                <CardDescription>
                  Please describe {letter.respondentName}'s character in detail. Be specific and provide examples.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="characterDescription">General Character Description *</Label>
                  <Textarea
                    id="characterDescription"
                    value={formData.characterDescription}
                    onChange={(e) => handleInputChange("characterDescription", e.target.value)}
                    placeholder="Describe the person's character, personality, and qualities..."
                    rows={4}
                    required
                  />
                  <p className="text-sm text-gray-500">
                    This is a required field. Please describe their honesty, integrity, and moral character.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="specificExamples">Specific Examples</Label>
                  <Textarea
                    id="specificExamples"
                    value={formData.specificExamples}
                    onChange={(e) => handleInputChange("specificExamples", e.target.value)}
                    placeholder="Provide specific examples that demonstrate their good character..."
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="communityInvolvement">Community Involvement</Label>
                  <Textarea
                    id="communityInvolvement"
                    value={formData.communityInvolvement}
                    onChange={(e) => handleInputChange("communityInvolvement", e.target.value)}
                    placeholder="Describe their involvement in the community, volunteer work, church activities, etc..."
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="familyRole">Role in Family</Label>
                  <Textarea
                    id="familyRole"
                    value={formData.familyRole}
                    onChange={(e) => handleInputChange("familyRole", e.target.value)}
                    placeholder="Describe their role as a parent, spouse, child, or family member..."
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="workEthic">Work Ethic</Label>
                  <Textarea
                    id="workEthic"
                    value={formData.workEthic}
                    onChange={(e) => handleInputChange("workEthic", e.target.value)}
                    placeholder="Describe their work ethic, reliability, and professional qualities..."
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="moralCharacter">Moral Character</Label>
                  <Textarea
                    id="moralCharacter"
                    value={formData.moralCharacter}
                    onChange={(e) => handleInputChange("moralCharacter", e.target.value)}
                    placeholder="Describe their moral character and values..."
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="whyDeservesBond">
                    Why do you believe {letter.respondentName} deserves to be released on bond?
                  </Label>
                  <Textarea
                    id="whyDeservesBond"
                    value={formData.whyDeservesBond}
                    onChange={(e) => handleInputChange("whyDeservesBond", e.target.value)}
                    placeholder="Explain why you believe they should be released and will appear for their court hearings..."
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="additionalComments">Additional Comments</Label>
                  <Textarea
                    id="additionalComments"
                    value={formData.additionalComments}
                    onChange={(e) => handleInputChange("additionalComments", e.target.value)}
                    placeholder="Any other information you would like to share..."
                    rows={3}
                  />
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("relationship")}>
                    Back
                  </Button>
                  <Button onClick={() => { handleSave(); setActiveTab("signature"); }}>
                    Save & Continue to Sign
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Tab 4: Signature */}
          <TabsContent value="signature">
            <Card>
              <CardHeader>
                <CardTitle>Review & Sign</CardTitle>
                <CardDescription>
                  Please review your information and sign below to submit your character reference letter.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Summary */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <h4 className="font-semibold">Letter Summary</h4>
                  <p><strong>Written by:</strong> {formData.writerName || "Not provided"}</p>
                  <p><strong>Relationship:</strong> {formData.writerRelationship || "Not provided"}</p>
                  <p><strong>For:</strong> {letter.respondentName}</p>
                  <p><strong>Case Type:</strong> {letter.caseType?.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</p>
                </div>
                
                {/* Declaration */}
                <Alert>
                  <AlertCircle className="w-4 h-4" />
                  <AlertTitle>Declaration</AlertTitle>
                  <AlertDescription>
                    By signing below, I declare under penalty of perjury that the information provided 
                    in this letter is true and correct to the best of my knowledge. I understand that 
                    this letter may be submitted to an Immigration Judge as part of {letter.respondentName}'s 
                    immigration case.
                  </AlertDescription>
                </Alert>
                
                {/* Signature Pad */}
                <div className="space-y-2">
                  <Label>Your Signature *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 bg-white">
                    <SignatureCanvas
                      ref={signatureRef}
                      canvasProps={{
                        className: "w-full h-40 border rounded",
                        style: { width: "100%", height: "160px" }
                      }}
                      backgroundColor="white"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm" onClick={handleClearSignature}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Clear Signature
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setActiveTab("character")}>
                    Back to Edit
                  </Button>
                  <Button 
                    onClick={handleSign} 
                    disabled={isSigning}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isSigning ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <PenTool className="w-4 h-4 mr-2" />
                        Sign & Submit Letter
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Save Progress Button (always visible) */}
        <div className="fixed bottom-4 right-4">
          <Button 
            variant="outline" 
            onClick={handleSave}
            disabled={isSaving}
            className="shadow-lg bg-white"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Save Progress
          </Button>
        </div>
      </div>
    </div>
  );
}
