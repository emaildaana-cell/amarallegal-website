import React, { useState } from 'react';
import { useParams } from 'wouter';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FolderOpen, 
  FileText, 
  Download,
  Loader2,
  Lock,
  User,
  Calendar,
  Files,
  Eye,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  FileCheck
} from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

// Document category labels
const categoryLabels: Record<string, string> = {
  pay_stub: "Pay Stub",
  tax_return: "Tax Return",
  w2_form: "W-2 Form",
  bank_statement: "Bank Statement",
  employment_letter: "Employment Letter",
  lease_agreement: "Lease Agreement",
  mortgage_statement: "Mortgage Statement",
  utility_bill: "Utility Bill",
  property_deed: "Property Deed",
  id_document: "ID Document",
  immigration_status: "Immigration Status",
  other: "Other Document",
};

export default function SharedDocumentsViewer() {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState('');
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [hasAttemptedAccess, setHasAttemptedAccess] = useState(false);

  // Query for shared documents
  const { data, isLoading, error, refetch } = trpc.sponsorDocument.accessSharedDocuments.useQuery(
    { shareToken: token || '', password: password || undefined },
    { 
      enabled: !!token && (!isPasswordRequired || password.length > 0),
      retry: false,
    }
  );

  // Handle password required error
  React.useEffect(() => {
    if (error?.message === 'Password required') {
      setIsPasswordRequired(true);
    }
  }, [error]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedAccess(true);
    refetch();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'reviewed':
        return 'bg-purple-100 text-purple-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'submitted':
        return <FileCheck className="h-4 w-4" />;
      case 'reviewed':
        return <Eye className="h-4 w-4" />;
      case 'approved':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Password required screen
  if (isPasswordRequired && !data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
        <SEO titleKey="Shared Documents" descriptionKey="View shared sponsor documents" />
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>Password Protected</CardTitle>
            <CardDescription>
              This document package is password protected. Please enter the password to view.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-center"
                />
                {hasAttemptedAccess && error && (
                  <p className="text-sm text-destructive text-center">
                    Incorrect password. Please try again.
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={!password}>
                <Lock className="h-4 w-4 mr-2" />
                Access Documents
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // Error state
  if (error && !isPasswordRequired) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
        <SEO titleKey="Shared Documents" descriptionKey="View shared sponsor documents" />
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              {error.message || 'This share link is invalid, expired, or has reached its view limit.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">
              Please contact the person who shared this link with you for assistance.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Success - show documents
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <SEO titleKey="Shared Documents" descriptionKey="View shared sponsor documents" />
      
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container py-8">
          <div className="flex items-center gap-3 mb-2">
            <FolderOpen className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-serif font-bold text-primary">Shared Documents</h1>
          </div>
          <p className="text-muted-foreground">
            Sponsor documents for {data?.respondentName}
          </p>
        </div>
      </div>

      <div className="container py-8">
        {/* Summary Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Document Summary
              </CardTitle>
              <Badge className={`${getStatusColor(data?.status || '')} flex items-center gap-1`}>
                {getStatusIcon(data?.status || '')}
                <span className="capitalize">{data?.status}</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Sponsor</p>
                <p className="font-medium">{data?.sponsorName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Respondent</p>
                <p className="font-medium">{data?.respondentName}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Files className="h-5 w-5" />
              Uploaded Documents ({data?.files?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data?.files && data.files.length > 0 ? (
              <div className="space-y-3">
                {data.files.map((file: any) => (
                  <div 
                    key={file.id} 
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{file.documentName}</div>
                        <div className="text-sm text-muted-foreground">
                          {categoryLabels[file.documentCategory] || file.documentCategory} • {formatFileSize(file.fileSize)}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3 inline mr-1" />
                          Uploaded: {formatDate(file.uploadedAt)}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(file.fileUrl, '_blank')}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <a href={file.fileUrl} download={file.fileName}>
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Files className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No documents available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer Notice */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>This is a secure shared view of sponsor documents.</p>
          <p>For questions, please contact Amaral Law at 1-844-423-3733.</p>
        </div>
      </div>
    </div>
  );
}
