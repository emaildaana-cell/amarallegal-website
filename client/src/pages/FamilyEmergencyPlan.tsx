import { useState, useCallback } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  AlertCircle, 
  Plus, 
  Trash2, 
  Upload, 
  FileText, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Shield, 
  Heart, 
  Building, 
  Save,
  Download,
  Loader2,
  CheckCircle2,
  X
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLoginUrl } from "@/const";
import SEO from "@/components/SEO";

// Document type options
const documentTypes = [
  { value: "passport", label: "Passport" },
  { value: "birth_certificate", label: "Birth Certificate" },
  { value: "social_security_card", label: "Social Security Card" },
  { value: "green_card", label: "Green Card / Permanent Resident Card" },
  { value: "work_permit", label: "Work Permit (EAD)" },
  { value: "visa", label: "Visa" },
  { value: "marriage_certificate", label: "Marriage Certificate" },
  { value: "divorce_decree", label: "Divorce Decree" },
  { value: "power_of_attorney", label: "Power of Attorney" },
  { value: "medical_records", label: "Medical Records" },
  { value: "school_records", label: "School Records" },
  { value: "financial_records", label: "Financial Records" },
  { value: "property_deed", label: "Property Deed" },
  { value: "vehicle_title", label: "Vehicle Title" },
  { value: "insurance_policy", label: "Insurance Policy" },
  { value: "other", label: "Other Document" },
];

// Emergency contact type
interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email: string;
  canPickUpChildren: boolean;
}

// Child type
interface Child {
  name: string;
  dob: string;
  school: string;
  schoolPhone: string;
  medicalInfo: string;
  specialNeeds: string;
  allergies: string;
}

// Document locations type
interface DocumentLocations {
  passports: string;
  birthCertificates: string;
  socialSecurityCards: string;
  greenCards: string;
  workPermits: string;
  marriageCertificate: string;
  financialRecords: string;
  propertyDeeds: string;
  vehicleTitles: string;
  insurancePolicies: string;
  medicalRecords: string;
  other: string;
}

export default function FamilyEmergencyPlan() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("info");
  const [saving, setSaving] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  
  // Form state
  const [planName, setPlanName] = useState("My Family Emergency Plan");
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  
  // Emergency contacts
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { name: "", relationship: "", phone: "", email: "", canPickUpChildren: false }
  ]);
  
  // Attorney info
  const [attorneyName, setAttorneyName] = useState("");
  const [attorneyPhone, setAttorneyPhone] = useState("");
  const [attorneyEmail, setAttorneyEmail] = useState("");
  const [attorneyFirm, setAttorneyFirm] = useState("");
  
  // Consulate info
  const [consulateName, setConsulateName] = useState("");
  const [consulatePhone, setConsulatePhone] = useState("");
  const [consulateAddress, setConsulateAddress] = useState("");
  
  // Children
  const [children, setChildren] = useState<Child[]>([]);
  
  // Power of Attorney
  const [poaDesignee, setPoaDesignee] = useState("");
  const [poaDesigneePhone, setPoaDesigneePhone] = useState("");
  const [poaDesigneeRelationship, setPoaDesigneeRelationship] = useState("");
  const [hasPOADocument, setHasPOADocument] = useState(false);
  
  // Document locations
  const [documentLocations, setDocumentLocations] = useState<DocumentLocations>({
    passports: "",
    birthCertificates: "",
    socialSecurityCards: "",
    greenCards: "",
    workPermits: "",
    marriageCertificate: "",
    financialRecords: "",
    propertyDeeds: "",
    vehicleTitles: "",
    insurancePolicies: "",
    medicalRecords: "",
    other: "",
  });
  
  // Financial info
  const [bankName, setBankName] = useState("");
  const [bankAccountInfo, setBankAccountInfo] = useState("");
  const [financialPOA, setFinancialPOA] = useState("");
  
  // Instructions
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [knowYourRightsAcknowledged, setKnowYourRightsAcknowledged] = useState(false);
  
  // Document upload state
  const [uploadDocType, setUploadDocType] = useState<string>("");
  const [uploadDocName, setUploadDocName] = useState("");
  const [uploadDocDescription, setUploadDocDescription] = useState("");
  const [uploadDocBelongsTo, setUploadDocBelongsTo] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // tRPC queries and mutations
  const { data: plans, refetch: refetchPlans } = trpc.emergencyPlan.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  
  const { data: currentPlan, refetch: refetchCurrentPlan } = trpc.emergencyPlan.getById.useQuery(
    { id: selectedPlanId! },
    { enabled: !!selectedPlanId }
  );
  
  const { data: documents, refetch: refetchDocuments } = trpc.emergencyPlan.documents.list.useQuery(
    { planId: selectedPlanId! },
    { enabled: !!selectedPlanId }
  );
  
  const createPlanMutation = trpc.emergencyPlan.create.useMutation({
    onSuccess: (data) => {
      if (data.plan) {
        setSelectedPlanId(data.plan.id);
        refetchPlans();
      }
    },
  });
  
  const updatePlanMutation = trpc.emergencyPlan.update.useMutation({
    onSuccess: () => {
      refetchCurrentPlan();
      refetchPlans();
    },
  });
  
  const deletePlanMutation = trpc.emergencyPlan.delete.useMutation({
    onSuccess: () => {
      setSelectedPlanId(null);
      refetchPlans();
    },
  });
  
  const uploadDocumentMutation = trpc.emergencyPlan.documents.upload.useMutation({
    onSuccess: () => {
      refetchDocuments();
      setSelectedFile(null);
      setUploadDocType("");
      setUploadDocName("");
      setUploadDocDescription("");
      setUploadDocBelongsTo("");
    },
  });
  
  const deleteDocumentMutation = trpc.emergencyPlan.documents.delete.useMutation({
    onSuccess: () => {
      refetchDocuments();
    },
  });
  
  // Load plan data when selected
  const loadPlanData = useCallback((plan: any) => {
    setPlanName(plan.planName || "My Family Emergency Plan");
    setOwnerName(plan.ownerName || "");
    setOwnerPhone(plan.ownerPhone || "");
    setOwnerEmail(plan.ownerEmail || "");
    setOwnerAddress(plan.ownerAddress || "");
    setEmergencyContacts(plan.emergencyContacts?.length > 0 ? plan.emergencyContacts : [{ name: "", relationship: "", phone: "", email: "", canPickUpChildren: false }]);
    setAttorneyName(plan.attorneyName || "");
    setAttorneyPhone(plan.attorneyPhone || "");
    setAttorneyEmail(plan.attorneyEmail || "");
    setAttorneyFirm(plan.attorneyFirm || "");
    setConsulateName(plan.consulateName || "");
    setConsulatePhone(plan.consulatePhone || "");
    setConsulateAddress(plan.consulateAddress || "");
    setChildren(plan.children || []);
    setPoaDesignee(plan.poaDesignee || "");
    setPoaDesigneePhone(plan.poaDesigneePhone || "");
    setPoaDesigneeRelationship(plan.poaDesigneeRelationship || "");
    setHasPOADocument(plan.hasPOADocument || false);
    setDocumentLocations(plan.documentLocations || {
      passports: "", birthCertificates: "", socialSecurityCards: "", greenCards: "",
      workPermits: "", marriageCertificate: "", financialRecords: "", propertyDeeds: "",
      vehicleTitles: "", insurancePolicies: "", medicalRecords: "", other: "",
    });
    setBankName(plan.bankName || "");
    setBankAccountInfo(plan.bankAccountInfo || "");
    setFinancialPOA(plan.financialPOA || "");
    setSpecialInstructions(plan.specialInstructions || "");
    setKnowYourRightsAcknowledged(plan.knowYourRightsAcknowledged || false);
  }, []);
  
  // Effect to load plan when currentPlan changes
  if (currentPlan && selectedPlanId) {
    // Only update if data is different to avoid infinite loops
  }
  
  // Save plan
  const handleSave = async () => {
    setSaving(true);
    try {
      const planData = {
        planName,
        ownerName,
        ownerPhone,
        ownerEmail,
        ownerAddress,
        emergencyContacts,
        attorneyName,
        attorneyPhone,
        attorneyEmail,
        attorneyFirm,
        consulateName,
        consulatePhone,
        consulateAddress,
        children,
        poaDesignee,
        poaDesigneePhone,
        poaDesigneeRelationship,
        hasPOADocument,
        documentLocations,
        bankName,
        bankAccountInfo,
        financialPOA,
        specialInstructions,
        knowYourRightsAcknowledged,
      };
      
      if (selectedPlanId) {
        await updatePlanMutation.mutateAsync({ id: selectedPlanId, data: planData });
      } else {
        await createPlanMutation.mutateAsync(planData);
      }
    } catch (error) {
      console.error("Failed to save plan:", error);
    } finally {
      setSaving(false);
    }
  };
  
  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }
      setSelectedFile(file);
      if (!uploadDocName) {
        setUploadDocName(file.name.split('.')[0]);
      }
    }
  };
  
  // Upload document
  const handleUploadDocument = async () => {
    if (!selectedFile || !uploadDocType || !uploadDocName || !selectedPlanId) {
      alert("Please fill in all required fields and select a file");
      return;
    }
    
    setUploadingFile(true);
    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        
        await uploadDocumentMutation.mutateAsync({
          planId: selectedPlanId,
          documentType: uploadDocType as any,
          documentName: uploadDocName,
          description: uploadDocDescription,
          belongsTo: uploadDocBelongsTo,
          fileName: selectedFile.name,
          fileData: base64,
          mimeType: selectedFile.type,
          fileSize: selectedFile.size,
        });
        
        setUploadingFile(false);
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error("Failed to upload document:", error);
      setUploadingFile(false);
    }
  };
  
  // Add emergency contact
  const addEmergencyContact = () => {
    setEmergencyContacts([...emergencyContacts, { name: "", relationship: "", phone: "", email: "", canPickUpChildren: false }]);
  };
  
  // Remove emergency contact
  const removeEmergencyContact = (index: number) => {
    setEmergencyContacts(emergencyContacts.filter((_, i) => i !== index));
  };
  
  // Update emergency contact
  const updateEmergencyContact = (index: number, field: keyof EmergencyContact, value: any) => {
    const updated = [...emergencyContacts];
    updated[index] = { ...updated[index], [field]: value };
    setEmergencyContacts(updated);
  };
  
  // Add child
  const addChild = () => {
    setChildren([...children, { name: "", dob: "", school: "", schoolPhone: "", medicalInfo: "", specialNeeds: "", allergies: "" }]);
  };
  
  // Remove child
  const removeChild = (index: number) => {
    setChildren(children.filter((_, i) => i !== index));
  };
  
  // Update child
  const updateChild = (index: number, field: keyof Child, value: string) => {
    const updated = [...children];
    updated[index] = { ...updated[index], [field]: value };
    setChildren(updated);
  };
  
  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  // If not authenticated, show login prompt
  if (!authLoading && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-muted/30 py-12">
        <SEO titleKey="Family Emergency Plan" descriptionKey="Create and manage your family emergency plan" />
        <div className="container max-w-4xl">
          <Card className="text-center py-12">
            <CardContent>
              <Shield className="h-16 w-16 mx-auto text-primary mb-6" />
              <h1 className="text-3xl font-serif font-bold text-primary mb-4">Family Emergency Plan</h1>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Create a secure, digital emergency plan for your family. Store important contacts, document locations, and upload copies of critical documents.
              </p>
              <a href={getLoginUrl()}>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Sign In to Create Your Plan
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <SEO titleKey="Family Emergency Plan" descriptionKey="Create and manage your family emergency plan" />
      
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-serif font-bold text-primary">Family Emergency Plan</h1>
              <p className="text-muted-foreground mt-2">
                Prepare your family for any situation with a comprehensive emergency plan
              </p>
            </div>
            <div className="flex items-center gap-4">
              {plans && plans.length > 0 && (
                <Select 
                  value={selectedPlanId?.toString() || ""} 
                  onValueChange={(val) => {
                    const id = parseInt(val);
                    setSelectedPlanId(id);
                    const plan = plans.find(p => p.id === id);
                    if (plan) loadPlanData(plan);
                  }}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {plans.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id.toString()}>
                        {plan.planName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <Button 
                onClick={() => {
                  setSelectedPlanId(null);
                  setPlanName("My Family Emergency Plan");
                  setOwnerName("");
                  setOwnerPhone("");
                  setOwnerEmail("");
                  setOwnerAddress("");
                  setEmergencyContacts([{ name: "", relationship: "", phone: "", email: "", canPickUpChildren: false }]);
                  setChildren([]);
                }}
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Plan
              </Button>
            </div>
          </div>
          
          {/* Plan name input */}
          <div className="flex items-center gap-4">
            <Input
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              className="max-w-md text-lg font-medium"
              placeholder="Plan Name"
            />
            <Button onClick={handleSave} disabled={saving || !ownerName}>
              {saving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {selectedPlanId ? "Update Plan" : "Save Plan"}
            </Button>
          </div>
        </div>
        
        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full mb-6">
            <TabsTrigger value="info">Your Info</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="children">Children</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
          </TabsList>
          
          {/* Your Information Tab */}
          <TabsContent value="info">
            <div className="grid gap-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Your Information
                  </CardTitle>
                  <CardDescription>
                    Basic information about you (the plan owner)
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="ownerName">Full Name *</Label>
                    <Input
                      id="ownerName"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="Your full legal name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="ownerPhone">Phone Number</Label>
                    <Input
                      id="ownerPhone"
                      value={ownerPhone}
                      onChange={(e) => setOwnerPhone(e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ownerEmail">Email Address</Label>
                    <Input
                      id="ownerEmail"
                      type="email"
                      value={ownerEmail}
                      onChange={(e) => setOwnerEmail(e.target.value)}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="ownerAddress">Home Address</Label>
                    <Textarea
                      id="ownerAddress"
                      value={ownerAddress}
                      onChange={(e) => setOwnerAddress(e.target.value)}
                      placeholder="Street address, city, state, ZIP"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Attorney Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    Attorney Information
                  </CardTitle>
                  <CardDescription>
                    Your immigration attorney's contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="attorneyName">Attorney Name</Label>
                    <Input
                      id="attorneyName"
                      value={attorneyName}
                      onChange={(e) => setAttorneyName(e.target.value)}
                      placeholder="Attorney's full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="attorneyFirm">Law Firm</Label>
                    <Input
                      id="attorneyFirm"
                      value={attorneyFirm}
                      onChange={(e) => setAttorneyFirm(e.target.value)}
                      placeholder="Law firm name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="attorneyPhone">Phone Number</Label>
                    <Input
                      id="attorneyPhone"
                      value={attorneyPhone}
                      onChange={(e) => setAttorneyPhone(e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="attorneyEmail">Email Address</Label>
                    <Input
                      id="attorneyEmail"
                      type="email"
                      value={attorneyEmail}
                      onChange={(e) => setAttorneyEmail(e.target.value)}
                      placeholder="attorney@lawfirm.com"
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Consulate Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Consulate Information
                  </CardTitle>
                  <CardDescription>
                    Your country's consulate contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="consulateName">Consulate Name</Label>
                    <Input
                      id="consulateName"
                      value={consulateName}
                      onChange={(e) => setConsulateName(e.target.value)}
                      placeholder="e.g., Mexican Consulate"
                    />
                  </div>
                  <div>
                    <Label htmlFor="consulatePhone">Phone Number</Label>
                    <Input
                      id="consulatePhone"
                      value={consulatePhone}
                      onChange={(e) => setConsulatePhone(e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="consulateAddress">Address</Label>
                    <Textarea
                      id="consulateAddress"
                      value={consulateAddress}
                      onChange={(e) => setConsulateAddress(e.target.value)}
                      placeholder="Consulate address"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Financial Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    Financial Information
                  </CardTitle>
                  <CardDescription>
                    Bank and financial account information for your family
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="Primary bank name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="financialPOA">Financial Power of Attorney</Label>
                    <Input
                      id="financialPOA"
                      value={financialPOA}
                      onChange={(e) => setFinancialPOA(e.target.value)}
                      placeholder="Person with financial POA"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="bankAccountInfo">Account Information (encrypted)</Label>
                    <Textarea
                      id="bankAccountInfo"
                      value={bankAccountInfo}
                      onChange={(e) => setBankAccountInfo(e.target.value)}
                      placeholder="Account numbers, access information (stored securely)"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Emergency Contacts Tab */}
          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-primary" />
                      Emergency Contacts
                    </CardTitle>
                    <CardDescription>
                      People who should be contacted in case of emergency
                    </CardDescription>
                  </div>
                  <Button onClick={addEmergencyContact} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Contact
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Contact {index + 1}</h4>
                      {emergencyContacts.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEmergencyContact(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label>Full Name</Label>
                        <Input
                          value={contact.name}
                          onChange={(e) => updateEmergencyContact(index, "name", e.target.value)}
                          placeholder="Contact's full name"
                        />
                      </div>
                      <div>
                        <Label>Relationship</Label>
                        <Input
                          value={contact.relationship}
                          onChange={(e) => updateEmergencyContact(index, "relationship", e.target.value)}
                          placeholder="e.g., Brother, Friend, Neighbor"
                        />
                      </div>
                      <div>
                        <Label>Phone Number</Label>
                        <Input
                          value={contact.phone}
                          onChange={(e) => updateEmergencyContact(index, "phone", e.target.value)}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <Label>Email Address</Label>
                        <Input
                          type="email"
                          value={contact.email}
                          onChange={(e) => updateEmergencyContact(index, "email", e.target.value)}
                          placeholder="contact@example.com"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`canPickUp-${index}`}
                        checked={contact.canPickUpChildren}
                        onCheckedChange={(checked) => updateEmergencyContact(index, "canPickUpChildren", checked)}
                      />
                      <Label htmlFor={`canPickUp-${index}`} className="text-sm">
                        This person is authorized to pick up my children from school
                      </Label>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* Power of Attorney */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Power of Attorney
                </CardTitle>
                <CardDescription>
                  Person designated to make decisions on your behalf
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="poaDesignee">Designated Person</Label>
                  <Input
                    id="poaDesignee"
                    value={poaDesignee}
                    onChange={(e) => setPoaDesignee(e.target.value)}
                    placeholder="Person with power of attorney"
                  />
                </div>
                <div>
                  <Label htmlFor="poaRelationship">Relationship</Label>
                  <Input
                    id="poaRelationship"
                    value={poaDesigneeRelationship}
                    onChange={(e) => setPoaDesigneeRelationship(e.target.value)}
                    placeholder="e.g., Spouse, Sibling"
                  />
                </div>
                <div>
                  <Label htmlFor="poaPhone">Phone Number</Label>
                  <Input
                    id="poaPhone"
                    value={poaDesigneePhone}
                    onChange={(e) => setPoaDesigneePhone(e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Checkbox
                    id="hasPOA"
                    checked={hasPOADocument}
                    onCheckedChange={(checked) => setHasPOADocument(checked as boolean)}
                  />
                  <Label htmlFor="hasPOA" className="text-sm">
                    I have a signed Power of Attorney document
                  </Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Children Tab */}
          <TabsContent value="children">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-primary" />
                      Children Information
                    </CardTitle>
                    <CardDescription>
                      Important information about your children
                    </CardDescription>
                  </div>
                  <Button onClick={addChild} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Child
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {children.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No children added yet. Click "Add Child" to add information.</p>
                  </div>
                ) : (
                  children.map((child, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Child {index + 1}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeChild(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label>Full Name</Label>
                          <Input
                            value={child.name}
                            onChange={(e) => updateChild(index, "name", e.target.value)}
                            placeholder="Child's full name"
                          />
                        </div>
                        <div>
                          <Label>Date of Birth</Label>
                          <Input
                            type="date"
                            value={child.dob}
                            onChange={(e) => updateChild(index, "dob", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>School Name</Label>
                          <Input
                            value={child.school}
                            onChange={(e) => updateChild(index, "school", e.target.value)}
                            placeholder="School name"
                          />
                        </div>
                        <div>
                          <Label>School Phone</Label>
                          <Input
                            value={child.schoolPhone}
                            onChange={(e) => updateChild(index, "schoolPhone", e.target.value)}
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label>Medical Information</Label>
                          <Textarea
                            value={child.medicalInfo}
                            onChange={(e) => updateChild(index, "medicalInfo", e.target.value)}
                            placeholder="Doctor's name, insurance info, regular medications"
                            rows={2}
                          />
                        </div>
                        <div>
                          <Label>Special Needs</Label>
                          <Input
                            value={child.specialNeeds}
                            onChange={(e) => updateChild(index, "specialNeeds", e.target.value)}
                            placeholder="Any special needs or requirements"
                          />
                        </div>
                        <div>
                          <Label>Allergies</Label>
                          <Input
                            value={child.allergies}
                            onChange={(e) => updateChild(index, "allergies", e.target.value)}
                            placeholder="Food, medication, or other allergies"
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Documents Tab */}
          <TabsContent value="documents">
            <div className="grid gap-6">
              {/* Document Locations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Document Locations
                  </CardTitle>
                  <CardDescription>
                    Where physical copies of important documents are stored
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Passports</Label>
                    <Input
                      value={documentLocations.passports}
                      onChange={(e) => setDocumentLocations({ ...documentLocations, passports: e.target.value })}
                      placeholder="e.g., Safe in bedroom closet"
                    />
                  </div>
                  <div>
                    <Label>Birth Certificates</Label>
                    <Input
                      value={documentLocations.birthCertificates}
                      onChange={(e) => setDocumentLocations({ ...documentLocations, birthCertificates: e.target.value })}
                      placeholder="Location"
                    />
                  </div>
                  <div>
                    <Label>Social Security Cards</Label>
                    <Input
                      value={documentLocations.socialSecurityCards}
                      onChange={(e) => setDocumentLocations({ ...documentLocations, socialSecurityCards: e.target.value })}
                      placeholder="Location"
                    />
                  </div>
                  <div>
                    <Label>Green Cards / Work Permits</Label>
                    <Input
                      value={documentLocations.greenCards}
                      onChange={(e) => setDocumentLocations({ ...documentLocations, greenCards: e.target.value })}
                      placeholder="Location"
                    />
                  </div>
                  <div>
                    <Label>Marriage Certificate</Label>
                    <Input
                      value={documentLocations.marriageCertificate}
                      onChange={(e) => setDocumentLocations({ ...documentLocations, marriageCertificate: e.target.value })}
                      placeholder="Location"
                    />
                  </div>
                  <div>
                    <Label>Financial Records</Label>
                    <Input
                      value={documentLocations.financialRecords}
                      onChange={(e) => setDocumentLocations({ ...documentLocations, financialRecords: e.target.value })}
                      placeholder="Location"
                    />
                  </div>
                  <div>
                    <Label>Property Deeds</Label>
                    <Input
                      value={documentLocations.propertyDeeds}
                      onChange={(e) => setDocumentLocations({ ...documentLocations, propertyDeeds: e.target.value })}
                      placeholder="Location"
                    />
                  </div>
                  <div>
                    <Label>Vehicle Titles</Label>
                    <Input
                      value={documentLocations.vehicleTitles}
                      onChange={(e) => setDocumentLocations({ ...documentLocations, vehicleTitles: e.target.value })}
                      placeholder="Location"
                    />
                  </div>
                  <div>
                    <Label>Insurance Policies</Label>
                    <Input
                      value={documentLocations.insurancePolicies}
                      onChange={(e) => setDocumentLocations({ ...documentLocations, insurancePolicies: e.target.value })}
                      placeholder="Location"
                    />
                  </div>
                  <div>
                    <Label>Medical Records</Label>
                    <Input
                      value={documentLocations.medicalRecords}
                      onChange={(e) => setDocumentLocations({ ...documentLocations, medicalRecords: e.target.value })}
                      placeholder="Location"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Other Important Documents</Label>
                    <Textarea
                      value={documentLocations.other}
                      onChange={(e) => setDocumentLocations({ ...documentLocations, other: e.target.value })}
                      placeholder="List any other important documents and their locations"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Upload Documents */}
              {selectedPlanId && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5 text-primary" />
                      Upload Digital Copies
                    </CardTitle>
                    <CardDescription>
                      Securely upload digital copies of important documents (max 10MB per file)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label>Document Type *</Label>
                        <Select value={uploadDocType} onValueChange={setUploadDocType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select document type" />
                          </SelectTrigger>
                          <SelectContent>
                            {documentTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Document Name *</Label>
                        <Input
                          value={uploadDocName}
                          onChange={(e) => setUploadDocName(e.target.value)}
                          placeholder="e.g., John's Passport"
                        />
                      </div>
                      <div>
                        <Label>Belongs To</Label>
                        <Input
                          value={uploadDocBelongsTo}
                          onChange={(e) => setUploadDocBelongsTo(e.target.value)}
                          placeholder="Family member name (optional)"
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Input
                          value={uploadDocDescription}
                          onChange={(e) => setUploadDocDescription(e.target.value)}
                          placeholder="Additional notes (optional)"
                        />
                      </div>
                    </div>
                    
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      {selectedFile ? (
                        <div className="flex items-center justify-center gap-4">
                          <FileText className="h-8 w-8 text-primary" />
                          <div className="text-left">
                            <p className="font-medium">{selectedFile.name}</p>
                            <p className="text-sm text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedFile(null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-muted-foreground mb-2">Drag and drop or click to select a file</p>
                          <input
                            type="file"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="file-upload"
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          />
                          <label htmlFor="file-upload">
                            <Button variant="outline" asChild>
                              <span>Select File</span>
                            </Button>
                          </label>
                        </div>
                      )}
                    </div>
                    
                    <Button
                      onClick={handleUploadDocument}
                      disabled={uploadingFile || !selectedFile || !uploadDocType || !uploadDocName}
                      className="w-full"
                    >
                      {uploadingFile ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Upload className="h-4 w-4 mr-2" />
                      )}
                      Upload Document
                    </Button>
                  </CardContent>
                </Card>
              )}
              
              {/* Uploaded Documents List */}
              {selectedPlanId && documents && documents.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Uploaded Documents ({documents.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="h-8 w-8 text-primary" />
                            <div>
                              <p className="font-medium">{doc.documentName}</p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Badge variant="secondary">
                                  {documentTypes.find(t => t.value === doc.documentType)?.label || doc.documentType}
                                </Badge>
                                {doc.belongsTo && <span>• {doc.belongsTo}</span>}
                                <span>• {formatFileSize(doc.fileSize)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </a>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteDocumentMutation.mutate({ id: doc.id })}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {!selectedPlanId && (
                <Card className="border-dashed">
                  <CardContent className="py-8 text-center">
                    <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Save your plan first to upload documents
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          {/* Instructions Tab */}
          <TabsContent value="instructions">
            <div className="grid gap-6">
              {/* Special Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Special Instructions
                  </CardTitle>
                  <CardDescription>
                    Important instructions for your family in case of emergency
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Write any special instructions for your family members here. For example:
- Who should be contacted first
- Where to find emergency cash
- Pet care instructions
- Any ongoing medical treatments
- Important passwords or access codes
- Instructions for your children"
                    rows={10}
                    className="font-mono text-sm"
                  />
                </CardContent>
              </Card>
              
              {/* Know Your Rights */}
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Shield className="h-5 w-5" />
                    Know Your Rights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="prose prose-sm max-w-none">
                    <h4 className="font-semibold">If ICE comes to your door:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>You have the right to remain silent. You do not have to answer questions about where you were born or your immigration status.</li>
                      <li>You do not have to open your door unless the officer has a warrant signed by a judge.</li>
                      <li>Ask to see the warrant through a window or slipped under the door.</li>
                      <li>If they have a valid warrant, you have the right to remain silent.</li>
                      <li>You have the right to speak to a lawyer.</li>
                      <li>Do not sign anything without speaking to a lawyer.</li>
                      <li>Do not run or resist arrest.</li>
                    </ul>
                    
                    <h4 className="font-semibold mt-4">Emergency Phone Numbers:</h4>
                    <ul className="space-y-1 text-sm">
                      <li><strong>Amaral Law:</strong> 1-844-423-3733</li>
                      <li><strong>ICE Detainee Locator:</strong> 1-888-351-4024</li>
                      <li><strong>ACLU Immigrants' Rights:</strong> 1-212-549-2660</li>
                    </ul>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-4 border-t">
                    <Checkbox
                      id="knowYourRights"
                      checked={knowYourRightsAcknowledged}
                      onCheckedChange={(checked) => setKnowYourRightsAcknowledged(checked as boolean)}
                    />
                    <Label htmlFor="knowYourRights" className="text-sm">
                      I have read and understand my rights
                    </Label>
                  </div>
                </CardContent>
              </Card>
              
              {/* Save Button */}
              <div className="flex justify-end gap-4">
                {selectedPlanId && (
                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this plan? This action cannot be undone.")) {
                        deletePlanMutation.mutate({ id: selectedPlanId });
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Plan
                  </Button>
                )}
                <Button onClick={handleSave} disabled={saving || !ownerName} size="lg">
                  {saving ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                  )}
                  {selectedPlanId ? "Save Changes" : "Create Plan"}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
