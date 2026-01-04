import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertCircle, 
  Lock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Shield, 
  Heart, 
  Building, 
  FileText,
  Download,
  Loader2,
  Clock,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import SEO from "@/components/SEO";

// Document type labels
const documentTypeLabels: Record<string, string> = {
  passport: "Passport",
  birth_certificate: "Birth Certificate",
  social_security_card: "Social Security Card",
  green_card: "Green Card / Permanent Resident Card",
  work_permit: "Work Permit (EAD)",
  visa: "Visa",
  marriage_certificate: "Marriage Certificate",
  divorce_decree: "Divorce Decree",
  power_of_attorney: "Power of Attorney",
  medical_records: "Medical Records",
  school_records: "School Records",
  financial_records: "Financial Records",
  property_deed: "Property Deed",
  vehicle_title: "Vehicle Title",
  insurance_policy: "Insurance Policy",
  other: "Other Document",
};

export default function SharedPlanViewer() {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState("");
  const [accessError, setAccessError] = useState<string | null>(null);
  const [planData, setPlanData] = useState<any>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [sharedBy, setSharedBy] = useState<string>("");
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [isAccessing, setIsAccessing] = useState(false);

  // Validate the share link first
  const validationQuery = trpc.emergencyPlan.share.validate.useQuery(
    { token: token || "" },
    { enabled: !!token }
  );

  // Access mutation
  const accessMutation = trpc.emergencyPlan.share.access.useMutation({
    onSuccess: (data) => {
      setIsAccessing(false);
      if (data.success) {
        setPlanData(data.plan);
        setDocuments(data.documents || []);
        setSharedBy(data.sharedBy || "");
        setExpiresAt(data.expiresAt ? new Date(data.expiresAt) : null);
        setAccessError(null);
      } else {
        setAccessError(data.error || "Failed to access plan");
      }
    },
    onError: (error) => {
      setIsAccessing(false);
      setAccessError(error.message || "Failed to access plan");
    },
  });

  // Auto-access if no password required
  useEffect(() => {
    if (validationQuery.data?.valid && !validationQuery.data?.requiresPassword && !planData) {
      handleAccess();
    }
  }, [validationQuery.data]);

  const handleAccess = () => {
    if (!token) return;
    setIsAccessing(true);
    setAccessError(null);
    accessMutation.mutate({ token, password: password || undefined });
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  // Loading state
  if (validationQuery.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-muted-foreground">Validating share link...</p>
        </div>
      </div>
    );
  }

  // Invalid link
  if (validationQuery.data && !validationQuery.data.valid) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
        <SEO 
          title="Invalid Share Link | Amaral Law"
          description="This share link is no longer valid."
        />
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle>Share Link Invalid</CardTitle>
            <CardDescription>{validationQuery.data.error}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              This link may have expired, been revoked, or reached its maximum views.
            </p>
            <Button variant="outline" onClick={() => window.location.href = "/"}>
              Go to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Password required
  if (validationQuery.data?.requiresPassword && !planData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
        <SEO 
          title="Enter Password | Shared Emergency Plan"
          description="This emergency plan is password protected."
        />
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>Password Required</CardTitle>
            <CardDescription>
              {validationQuery.data.recipientName 
                ? `This plan was shared with ${validationQuery.data.recipientName}`
                : "This emergency plan is password protected"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {accessError && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{accessError}</span>
              </div>
            )}
            <div>
              <Label htmlFor="password">Enter Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter the password"
                onKeyDown={(e) => e.key === "Enter" && handleAccess()}
              />
            </div>
            <Button onClick={handleAccess} disabled={isAccessing || !password} className="w-full">
              {isAccessing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Lock className="h-4 w-4 mr-2" />
              )}
              Access Plan
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show plan data
  if (planData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <SEO 
          title={`${planData.planName || "Emergency Plan"} | Shared with You`}
          description="View the shared family emergency plan."
        />
        
        {/* Header */}
        <div className="bg-primary text-primary-foreground py-8">
          <div className="container max-w-4xl">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-6 w-6" />
              <span className="text-sm opacity-80">Shared Emergency Plan</span>
            </div>
            <h1 className="text-3xl font-bold">{planData.planName || "Family Emergency Plan"}</h1>
            <p className="mt-2 opacity-80">Shared by {sharedBy}</p>
            {expiresAt && (
              <div className="flex items-center gap-2 mt-4 text-sm opacity-80">
                <Clock className="h-4 w-4" />
                <span>This link expires on {expiresAt.toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="container max-w-4xl py-8 space-y-6">
          {/* Important Notice */}
          <Card className="border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
            <CardContent className="flex items-start gap-4 pt-6">
              <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-800 dark:text-amber-200">Important Information</h3>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  This emergency plan has been shared with you for safekeeping. Please keep this information confidential and only use it in case of emergency.
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Plan Owner Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Plan Owner
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{planData.ownerName}</p>
                </div>
              </div>
              {planData.ownerPhone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{planData.ownerPhone}</p>
                  </div>
                </div>
              )}
              {planData.ownerEmail && (
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{planData.ownerEmail}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Emergency Contacts */}
          {planData.emergencyContacts && planData.emergencyContacts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {planData.emergencyContacts.map((contact: any, index: number) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{contact.name}</h4>
                      {contact.canPickUpChildren && (
                        <Badge variant="secondary">Can pick up children</Badge>
                      )}
                    </div>
                    <div className="grid gap-2 md:grid-cols-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Relationship:</span>{" "}
                        {contact.relationship}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Phone:</span>{" "}
                        <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
                          {contact.phone}
                        </a>
                      </div>
                      {contact.email && (
                        <div>
                          <span className="text-muted-foreground">Email:</span>{" "}
                          <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                            {contact.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
          
          {/* Attorney Information */}
          {planData.attorneyName && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Attorney Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Attorney Name</p>
                  <p className="font-medium">{planData.attorneyName}</p>
                </div>
                {planData.attorneyFirm && (
                  <div>
                    <p className="text-sm text-muted-foreground">Law Firm</p>
                    <p className="font-medium">{planData.attorneyFirm}</p>
                  </div>
                )}
                {planData.attorneyPhone && (
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a href={`tel:${planData.attorneyPhone}`} className="font-medium text-primary hover:underline">
                      {planData.attorneyPhone}
                    </a>
                  </div>
                )}
                {planData.attorneyEmail && (
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href={`mailto:${planData.attorneyEmail}`} className="font-medium text-primary hover:underline">
                      {planData.attorneyEmail}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          {/* Consulate Information */}
          {planData.consulateName && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Consulate Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Consulate</p>
                  <p className="font-medium">{planData.consulateName}</p>
                </div>
                {planData.consulatePhone && (
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a href={`tel:${planData.consulatePhone}`} className="font-medium text-primary hover:underline">
                      {planData.consulatePhone}
                    </a>
                  </div>
                )}
                {planData.consulateAddress && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{planData.consulateAddress}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          {/* Power of Attorney */}
          {planData.poaDesignee && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Power of Attorney
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Designee</p>
                  <p className="font-medium">{planData.poaDesignee}</p>
                </div>
                {planData.poaDesigneeRelationship && (
                  <div>
                    <p className="text-sm text-muted-foreground">Relationship</p>
                    <p className="font-medium">{planData.poaDesigneeRelationship}</p>
                  </div>
                )}
                {planData.poaDesigneePhone && (
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a href={`tel:${planData.poaDesigneePhone}`} className="font-medium text-primary hover:underline">
                      {planData.poaDesigneePhone}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          {/* Children Information */}
          {planData.children && planData.children.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Children Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {planData.children.map((child: any, index: number) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-3">{child.name}</h4>
                    <div className="grid gap-3 md:grid-cols-2 text-sm">
                      {child.dob && (
                        <div>
                          <span className="text-muted-foreground">Date of Birth:</span>{" "}
                          {child.dob}
                        </div>
                      )}
                      {child.school && (
                        <div>
                          <span className="text-muted-foreground">School:</span>{" "}
                          {child.school}
                        </div>
                      )}
                      {child.schoolPhone && (
                        <div>
                          <span className="text-muted-foreground">School Phone:</span>{" "}
                          <a href={`tel:${child.schoolPhone}`} className="text-primary hover:underline">
                            {child.schoolPhone}
                          </a>
                        </div>
                      )}
                      {child.allergies && (
                        <div className="md:col-span-2">
                          <span className="text-muted-foreground">Allergies:</span>{" "}
                          <span className="text-destructive font-medium">{child.allergies}</span>
                        </div>
                      )}
                      {child.medicalInfo && (
                        <div className="md:col-span-2">
                          <span className="text-muted-foreground">Medical Info:</span>{" "}
                          {child.medicalInfo}
                        </div>
                      )}
                      {child.specialNeeds && (
                        <div className="md:col-span-2">
                          <span className="text-muted-foreground">Special Needs:</span>{" "}
                          {child.specialNeeds}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
          
          {/* Document Locations */}
          {planData.documentLocations && Object.keys(planData.documentLocations).some(k => planData.documentLocations[k]) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Document Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  {Object.entries(planData.documentLocations).map(([key, value]) => 
                    value ? (
                      <div key={key} className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="font-medium">{value as string}</p>
                      </div>
                    ) : null
                  )}
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Financial Information */}
          {(planData.bankName || planData.financialPOA) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Financial Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {planData.bankName && (
                  <div>
                    <p className="text-sm text-muted-foreground">Bank</p>
                    <p className="font-medium">{planData.bankName}</p>
                  </div>
                )}
                {planData.financialPOA && (
                  <div>
                    <p className="text-sm text-muted-foreground">Financial POA</p>
                    <p className="font-medium">{planData.financialPOA}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          {/* Special Instructions */}
          {planData.specialInstructions && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Special Instructions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted/50 rounded-lg whitespace-pre-wrap font-mono text-sm">
                  {planData.specialInstructions}
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Uploaded Documents */}
          {documents.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-primary" />
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
                              {documentTypeLabels[doc.documentType] || doc.documentType}
                            </Badge>
                            {doc.belongsTo && <span>• {doc.belongsTo}</span>}
                            <span>• {formatFileSize(doc.fileSize)}</span>
                          </div>
                        </div>
                      </div>
                      <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
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
                  <li><strong>Amaral Law:</strong> <a href="tel:1-844-423-3733" className="text-primary">1-844-423-3733</a></li>
                  <li><strong>ICE Detainee Locator:</strong> <a href="tel:1-888-351-4024" className="text-primary">1-888-351-4024</a></li>
                  <li><strong>ACLU Immigrants' Rights:</strong> <a href="tel:1-212-549-2660" className="text-primary">1-212-549-2660</a></li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground py-8">
            <p>This emergency plan was created using <a href="/" className="text-primary hover:underline">Amaral Law</a></p>
            <p className="mt-1">For immigration legal assistance, call <a href="tel:1-844-423-3733" className="text-primary hover:underline">1-844-423-3733</a></p>
          </div>
        </div>
      </div>
    );
  }

  // Default loading state while accessing
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
        <p className="mt-4 text-muted-foreground">Loading emergency plan...</p>
      </div>
    </div>
  );
}
