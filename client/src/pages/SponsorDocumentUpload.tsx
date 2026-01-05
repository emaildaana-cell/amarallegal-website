import { useState, useCallback, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  Upload, 
  FileText, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  DollarSign,
  Home,
  Briefcase,
  FileCheck,
  Shield,
  Send,
  ArrowLeft,
  Info,
  X
} from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

// Document category configuration
const documentCategories = [
  { value: "pay_stub", label: "Pay Stub", icon: DollarSign, description: "Recent pay stubs (last 2-3 months)" },
  { value: "tax_return", label: "Tax Return", icon: FileText, description: "Most recent tax return (Form 1040)" },
  { value: "w2_form", label: "W-2 Form", icon: FileCheck, description: "W-2 forms from employer" },
  { value: "bank_statement", label: "Bank Statement", icon: DollarSign, description: "Recent bank statements (last 2-3 months)" },
  { value: "employment_letter", label: "Employment Letter", icon: Briefcase, description: "Letter from employer verifying employment" },
  { value: "lease_agreement", label: "Lease Agreement", icon: Home, description: "Current lease or rental agreement" },
  { value: "mortgage_statement", label: "Mortgage Statement", icon: Home, description: "Recent mortgage statement" },
  { value: "utility_bill", label: "Utility Bill", icon: FileText, description: "Recent utility bill showing address" },
  { value: "property_deed", label: "Property Deed", icon: Home, description: "Property deed if you own your home" },
  { value: "id_document", label: "ID Document", icon: Shield, description: "Government-issued ID (driver's license, passport)" },
  { value: "immigration_status", label: "Immigration Status", icon: Shield, description: "Proof of immigration status (green card, work permit)" },
  { value: "other", label: "Other Document", icon: FileText, description: "Other supporting documents" },
] as const;

type DocumentCategory = typeof documentCategories[number]["value"];

interface UploadedFile {
  id: number;
  documentCategory: string;
  documentName: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string | Date;
}

// Start page - create new submission
function StartPage() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    sponsorName: "",
    sponsorEmail: "",
    sponsorPhone: "",
    respondentName: "",
    respondentANumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createMutation = trpc.sponsorDocument.create.useMutation({
    onSuccess: (data) => {
      if (data?.accessToken) {
        setLocation(`/sponsor-documents/${data.accessToken}`);
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create document submission");
      setIsSubmitting(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sponsorName || !formData.sponsorEmail || !formData.respondentName) {
      toast.error("Please fill in all required fields");
      return;
    }
    setIsSubmitting(true);
    createMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      <Helmet>
        <title>Upload Sponsor Documents | Amaral Law</title>
        <meta name="description" content="Securely upload sponsor financial documents for immigration bond hearings. Submit pay stubs, tax returns, and housing documents online." />
        <meta name="keywords" content="sponsor documents, upload documents, bond hearing documents, financial documents" />
        <link rel="canonical" href="https://amarallegal.com/sponsor-documents" />
        <meta property="og:title" content="Upload Sponsor Documents | Amaral Law" />
        <meta property="og:description" content="Securely upload sponsor financial documents for immigration bond hearings. Submit pay stubs, tax returns, and housing documents online." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] opacity-5" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary mb-6">
              <Upload className="h-4 w-4" />
              <span className="text-sm font-medium">Secure Document Upload</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 font-serif">
              Sponsor Document Upload Portal
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Securely upload your financial and housing documents to support your sponsorship for an immigration bond hearing.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-serif">Get Started</CardTitle>
                <CardDescription className="text-base">
                  Enter your information to begin uploading documents
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Sponsor Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Your Information (Sponsor)
                    </h3>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="sponsorName">Full Name *</Label>
                        <Input
                          id="sponsorName"
                          value={formData.sponsorName}
                          onChange={(e) => setFormData({ ...formData, sponsorName: e.target.value })}
                          placeholder="Your full legal name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sponsorEmail">Email Address *</Label>
                        <Input
                          id="sponsorEmail"
                          type="email"
                          value={formData.sponsorEmail}
                          onChange={(e) => setFormData({ ...formData, sponsorEmail: e.target.value })}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sponsorPhone">Phone Number</Label>
                      <Input
                        id="sponsorPhone"
                        type="tel"
                        value={formData.sponsorPhone}
                        onChange={(e) => setFormData({ ...formData, sponsorPhone: e.target.value })}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Respondent Information */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Person You Are Sponsoring
                    </h3>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="respondentName">Full Name *</Label>
                        <Input
                          id="respondentName"
                          value={formData.respondentName}
                          onChange={(e) => setFormData({ ...formData, respondentName: e.target.value })}
                          placeholder="Full legal name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="respondentANumber">A-Number (if known)</Label>
                        <Input
                          id="respondentANumber"
                          value={formData.respondentANumber}
                          onChange={(e) => setFormData({ ...formData, respondentANumber: e.target.value })}
                          placeholder="A123456789"
                        />
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        Continue to Upload Documents
                        <Upload className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Info Box */}
            <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900">
              <div className="flex gap-4">
                <Info className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">What documents should I upload?</h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Recent pay stubs (last 2-3 months)</li>
                    <li>• Most recent tax return</li>
                    <li>• Bank statements showing sufficient funds</li>
                    <li>• Proof of housing (lease, mortgage, utility bills)</li>
                    <li>• Government-issued ID</li>
                    <li>• Proof of immigration status</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Upload page - upload documents to existing submission
function UploadPage({ accessToken }: { accessToken: string }) {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory>("pay_stub");
  const [documentName, setDocumentName] = useState("");
  const [description, setDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch document submission data
  const { data: submission, isLoading, error, refetch } = trpc.sponsorDocument.getByToken.useQuery(
    { accessToken },
    { retry: false }
  );

  const uploadMutation = trpc.sponsorDocument.uploadFile.useMutation({
    onSuccess: () => {
      toast.success("Document uploaded successfully");
      setDocumentName("");
      setDescription("");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to upload document");
    },
    onSettled: () => {
      setIsUploading(false);
    },
  });

  const deleteMutation = trpc.sponsorDocument.deleteFile.useMutation({
    onSuccess: () => {
      toast.success("Document deleted");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete document");
    },
  });

  const submitMutation = trpc.sponsorDocument.submit.useMutation({
    onSuccess: () => {
      toast.success("Documents submitted successfully!");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit documents");
    },
  });

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size exceeds 10MB limit");
      return;
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload PDF, image, or Word documents.");
      return;
    }

    setIsUploading(true);

    // Convert file to base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      
      uploadMutation.mutate({
        accessToken,
        documentCategory: selectedCategory,
        documentName: documentName || getCategoryLabel(selectedCategory),
        description: description || undefined,
        fileName: file.name,
        fileData: base64,
        mimeType: file.type,
      });
    };
    reader.onerror = () => {
      toast.error("Failed to read file");
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  }, [accessToken, selectedCategory, documentName, description, uploadMutation]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const getCategoryLabel = (value: string) => {
    return documentCategories.find(c => c.value === value)?.label || value;
  };

  const getCategoryIcon = (value: string) => {
    const category = documentCategories.find(c => c.value === value);
    return category?.icon || FileText;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !submission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Submission Not Found</h2>
            <p className="text-muted-foreground mb-4">
              This document submission link is invalid or has expired.
            </p>
            <Link href="/sponsor-documents">
              <Button>Start New Submission</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isSubmitted = submission.status !== "pending";
  const files = submission.files || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background">
      <Helmet>
        <title>Upload Documents for {submission.respondentName} | Amaral Law</title>
      </Helmet>

      {/* Header */}
      <section className="py-8 bg-primary text-primary-foreground">
        <div className="container">
          <Link href="/sponsor-guide" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Sponsor Guide
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-serif">
                Document Upload Portal
              </h1>
              <p className="text-primary-foreground/80 mt-1">
                Uploading documents for <span className="font-semibold">{submission.respondentName}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              {isSubmitted ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-100 rounded-lg">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-medium">Submitted</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-100 rounded-lg">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-medium">Pending Submission</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upload Form */}
            <div className="lg:col-span-2 space-y-6">
              {!isSubmitted && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5 text-primary" />
                      Upload New Document
                    </CardTitle>
                    <CardDescription>
                      Select a document category and upload your file
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Category Selection */}
                    <div className="space-y-2">
                      <Label>Document Category *</Label>
                      <Select value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as DocumentCategory)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {documentCategories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              <div className="flex items-center gap-2">
                                <cat.icon className="h-4 w-4" />
                                {cat.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground">
                        {documentCategories.find(c => c.value === selectedCategory)?.description}
                      </p>
                    </div>

                    {/* Document Name */}
                    <div className="space-y-2">
                      <Label htmlFor="docName">Document Name (Optional)</Label>
                      <Input
                        id="docName"
                        value={documentName}
                        onChange={(e) => setDocumentName(e.target.value)}
                        placeholder={`e.g., ${getCategoryLabel(selectedCategory)} - January 2026`}
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="docDesc">Description (Optional)</Label>
                      <Textarea
                        id="docDesc"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add any notes about this document..."
                        rows={2}
                      />
                    </div>

                    {/* Drop Zone */}
                    <div
                      className={cn(
                        "border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer",
                        isDragging 
                          ? "border-primary bg-primary/5" 
                          : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
                      )}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => document.getElementById("fileInput")?.click()}
                    >
                      <input
                        id="fileInput"
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.doc,.docx"
                        onChange={(e) => handleFileSelect(e.target.files)}
                        disabled={isUploading}
                      />
                      
                      {isUploading ? (
                        <div className="flex flex-col items-center gap-3">
                          <Loader2 className="h-10 w-10 animate-spin text-primary" />
                          <p className="text-muted-foreground">Uploading document...</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          <div className="p-4 rounded-full bg-primary/10">
                            <Upload className="h-8 w-8 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              Drop your file here or click to browse
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              PDF, images, or Word documents up to 10MB
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Uploaded Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Uploaded Documents ({files.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {files.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No documents uploaded yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {files.map((file: UploadedFile) => {
                        const Icon = getCategoryIcon(file.documentCategory);
                        return (
                          <div
                            key={file.id}
                            className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg group"
                          >
                            <div className="p-2 rounded-lg bg-primary/10">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{file.documentName}</p>
                              <p className="text-sm text-muted-foreground">
                                {getCategoryLabel(file.documentCategory)} • {formatFileSize(file.fileSize)}
                              </p>
                            </div>
                            {!isSubmitted && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => deleteMutation.mutate({ accessToken, fileId: file.id })}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Submission Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Submission Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Sponsor</p>
                    <p className="font-medium">{submission.sponsorName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{submission.sponsorEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Respondent</p>
                    <p className="font-medium">{submission.respondentName}</p>
                  </div>
                  {submission.respondentANumber && (
                    <div>
                      <p className="text-sm text-muted-foreground">A-Number</p>
                      <p className="font-medium">{submission.respondentANumber}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Submit Button */}
              {!isSubmitted && (
                <Card className="border-primary/50">
                  <CardContent className="pt-6">
                    <Button
                      size="lg"
                      className="w-full"
                      disabled={files.length === 0 || submitMutation.isPending}
                      onClick={() => submitMutation.mutate({ accessToken })}
                    >
                      {submitMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Documents
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-3">
                      Once submitted, you cannot add or remove documents.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Checklist */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recommended Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {[
                      { label: "Pay stubs (2-3 months)", category: "pay_stub" },
                      { label: "Tax return", category: "tax_return" },
                      { label: "Bank statements", category: "bank_statement" },
                      { label: "Proof of housing", category: "lease_agreement" },
                      { label: "Government ID", category: "id_document" },
                      { label: "Immigration status proof", category: "immigration_status" },
                    ].map((item) => {
                      const hasDoc = files.some((f: UploadedFile) => f.documentCategory === item.category);
                      return (
                        <li key={item.category} className="flex items-center gap-2">
                          {hasDoc ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
                          )}
                          <span className={hasDoc ? "text-muted-foreground line-through" : ""}>
                            {item.label}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>

              {/* Help */}
              <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Need Help?
                  </h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                    If you have questions about which documents to upload, please contact our office.
                  </p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href="tel:1-844-423-3733">Call 1-844-423-3733</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Main component - route based on URL
export default function SponsorDocumentUpload() {
  const params = useParams<{ token?: string }>();
  
  if (params.token) {
    return <UploadPage accessToken={params.token} />;
  }
  
  return <StartPage />;
}
