import React, { useState, useMemo } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { useLocation } from 'wouter';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  FolderOpen, 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Download,
  Loader2,
  ArrowUpDown,
  Share2,
  XCircle,
  FileCheck,
  User,
  Mail,
  Phone,
  Calendar,
  Files,
  Link2,
  Copy,
  ExternalLink,
  Lock,
  Trash2
} from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

type SortBy = 'date' | 'sponsor' | 'respondent' | 'status';
type SortOrder = 'asc' | 'desc';
type DocumentStatus = 'pending' | 'submitted' | 'reviewed' | 'approved' | 'rejected';

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

export default function AdminSponsorDocuments() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedDocument, setSelectedDocument] = useState<any | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<DocumentStatus>('reviewed');
  const [adminNotes, setAdminNotes] = useState('');
  const [sharePassword, setSharePassword] = useState('');
  const [shareExpiry, setShareExpiry] = useState('72');

  // Redirect if not authenticated or not admin
  if (!user) {
    navigate('/');
    return null;
  }

  // Fetch all sponsor documents
  const { data: documents, isLoading, error, refetch } = trpc.sponsorDocument.getAll.useQuery();

  // Fetch document details when selected
  const { data: documentDetails, isLoading: isLoadingDetails } = trpc.sponsorDocument.getById.useQuery(
    { id: selectedDocument?.id || 0 },
    { enabled: !!selectedDocument?.id }
  );

  // Mutations
  const updateStatusMutation = trpc.sponsorDocument.updateStatus.useMutation({
    onSuccess: () => {
      toast.success('Status updated successfully');
      refetch();
      setIsStatusDialogOpen(false);
      setIsDetailOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update status');
    },
  });

  const createShareLinkMutation = trpc.sponsorDocument.createShareLink.useMutation({
    onSuccess: (data) => {
      if (!data) return;
      const shareUrl = `${window.location.origin}/shared-documents/${data.shareToken}`;
      navigator.clipboard.writeText(shareUrl);
      toast.success('Share link created and copied to clipboard!');
      setIsShareDialogOpen(false);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create share link');
    },
  });

  const deleteDocumentMutation = trpc.sponsorDocument.delete.useMutation({
    onSuccess: () => {
      toast.success('Document submission deleted');
      refetch();
      setIsDetailOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete document');
    },
  });

  const bulkDownloadMutation = trpc.sponsorDocument.generateBulkDownloadZip.useMutation({
    onSuccess: (data) => {
      if (data?.downloadUrl) {
        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        link.download = data.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success(`Downloaded ${data.fileCount} files as ZIP`);
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to generate ZIP file');
    },
  });

  // Filter and sort documents
  const filteredDocuments = useMemo(() => {
    if (!documents) return [];
    
    let filtered = [...documents];
    
    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(doc => doc.status === statusFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.sponsorName.toLowerCase().includes(search) ||
        doc.respondentName.toLowerCase().includes(search) ||
        doc.sponsorEmail.toLowerCase().includes(search) ||
        (doc.respondentANumber && doc.respondentANumber.toLowerCase().includes(search))
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'sponsor':
          comparison = a.sponsorName.localeCompare(b.sponsorName);
          break;
        case 'respondent':
          comparison = a.respondentName.localeCompare(b.respondentName);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    return filtered;
  }, [documents, statusFilter, searchTerm, sortBy, sortOrder]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (!documents) return { total: 0, pending: 0, submitted: 0, reviewed: 0, approved: 0, rejected: 0 };
    
    return {
      total: documents.length,
      pending: documents.filter(d => d.status === 'pending').length,
      submitted: documents.filter(d => d.status === 'submitted').length,
      reviewed: documents.filter(d => d.status === 'reviewed').length,
      approved: documents.filter(d => d.status === 'approved').length,
      rejected: documents.filter(d => d.status === 'rejected').length,
    };
  }, [documents]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      case 'submitted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'reviewed':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
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

  const handleViewDetails = (doc: any) => {
    setSelectedDocument(doc);
    setIsDetailOpen(true);
  };

  const handleUpdateStatus = () => {
    if (!selectedDocument) return;
    updateStatusMutation.mutate({
      id: selectedDocument.id,
      status: newStatus,
      adminNotes: adminNotes || undefined,
    });
  };

  const handleCreateShareLink = () => {
    if (!selectedDocument) return;
    createShareLinkMutation.mutate({
      sponsorDocumentId: selectedDocument.id,
      expiresInHours: parseInt(shareExpiry),
      password: sharePassword || undefined,
    });
  };

  const handleDeleteDocument = () => {
    if (!selectedDocument) return;
    if (confirm('Are you sure you want to delete this document submission? This action cannot be undone.')) {
      deleteDocumentMutation.mutate({ id: selectedDocument.id });
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO titleKey="seo.admin.title" descriptionKey="seo.admin.desc" />
      
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container py-8">
          <div className="flex items-center gap-3 mb-2">
            <FolderOpen className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-serif font-bold text-primary">Sponsor Documents Dashboard</h1>
          </div>
          <p className="text-muted-foreground">Manage and review sponsor document submissions for bond hearings</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="container py-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 border-slate-200 dark:border-slate-800">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stats.total}</div>
              <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">Total</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 border-gray-200 dark:border-gray-800">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.pending}</div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Pending</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.submitted}</div>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">Submitted</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">{stats.reviewed}</div>
              <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">Reviewed</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-900 dark:text-green-100">{stats.approved}</div>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">Approved</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-red-900 dark:text-red-100">{stats.rejected}</div>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">Rejected</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by sponsor, respondent, email, A#..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Sort By</label>
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortBy)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="sponsor">Sponsor Name</SelectItem>
                    <SelectItem value="respondent">Respondent Name</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Document Submissions ({filteredDocuments.length})
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                <ArrowUpDown className="h-4 w-4 mr-2" />
                {sortOrder === 'asc' ? 'Oldest First' : 'Newest First'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <p className="text-destructive">Error loading documents</p>
              </div>
            ) : filteredDocuments.length === 0 ? (
              <div className="text-center py-12">
                <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No document submissions found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Sponsor</th>
                      <th className="text-left py-3 px-4 font-medium">Respondent</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Files</th>
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                      <th className="text-right py-3 px-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium">{doc.sponsorName}</div>
                            <div className="text-sm text-muted-foreground">{doc.sponsorEmail}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium">{doc.respondentName}</div>
                            {doc.respondentANumber && (
                              <div className="text-sm text-muted-foreground">{doc.respondentANumber}</div>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={`${getStatusColor(doc.status)} flex items-center gap-1 w-fit`}>
                            {getStatusIcon(doc.status)}
                            <span className="capitalize">{doc.status}</span>
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Files className="h-4 w-4 text-muted-foreground" />
                            <span>{doc.fileCount || 0}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {formatDate(doc.createdAt)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(doc)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Document Submission Details
            </DialogTitle>
            <DialogDescription>
              Review uploaded documents and manage submission status
            </DialogDescription>
          </DialogHeader>

          {isLoadingDetails ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : documentDetails ? (
            <div className="space-y-6">
              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <Badge className={`${getStatusColor(documentDetails.status)} flex items-center gap-1`}>
                  {getStatusIcon(documentDetails.status)}
                  <span className="capitalize">{documentDetails.status}</span>
                </Badge>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setNewStatus(documentDetails.status as DocumentStatus);
                      setAdminNotes(documentDetails.adminNotes || '');
                      setIsStatusDialogOpen(true);
                    }}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Update Status
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSharePassword('');
                      setShareExpiry('72');
                      setIsShareDialogOpen(true);
                    }}
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => bulkDownloadMutation.mutate({ id: documentDetails.id })}
                    disabled={bulkDownloadMutation.isPending || !documentDetails.files?.length}
                  >
                    {bulkDownloadMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4 mr-1" />
                    )}
                    Download All
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Sponsor & Respondent Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Sponsor Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{documentDetails.sponsorName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${documentDetails.sponsorEmail}`} className="text-primary hover:underline">
                        {documentDetails.sponsorEmail}
                      </a>
                    </div>
                    {documentDetails.sponsorPhone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a href={`tel:${documentDetails.sponsorPhone}`} className="text-primary hover:underline">
                          {documentDetails.sponsorPhone}
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Respondent Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{documentDetails.respondentName}</span>
                    </div>
                    {documentDetails.respondentANumber && (
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{documentDetails.respondentANumber}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Submitted: {formatDate(documentDetails.createdAt)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Admin Notes */}
              {documentDetails.adminNotes && (
                <Card className="bg-muted/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Admin Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{documentDetails.adminNotes}</p>
                  </CardContent>
                </Card>
              )}

              {/* Uploaded Files */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Files className="h-4 w-4" />
                    Uploaded Documents ({documentDetails.files?.length || 0})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {documentDetails.files && documentDetails.files.length > 0 ? (
                    <div className="space-y-3">
                      {documentDetails.files.map((file: any) => (
                        <div 
                          key={file.id} 
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{file.documentName}</div>
                              <div className="text-sm text-muted-foreground">
                                {categoryLabels[file.documentCategory] || file.documentCategory} • {formatFileSize(file.fileSize)}
                              </div>
                              {file.description && (
                                <div className="text-sm text-muted-foreground mt-1">
                                  {file.description}
                                </div>
                              )}
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
                    <div className="text-center py-8 text-muted-foreground">
                      <Files className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No documents uploaded yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Share Links */}
              {documentDetails.shareLinks && documentDetails.shareLinks.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Link2 className="h-4 w-4" />
                      Active Share Links
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {documentDetails.shareLinks.filter((link: any) => link.isActive).map((link: any) => (
                        <div 
                          key={link.id} 
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Link2 className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="text-sm font-mono">
                                {`${window.location.origin}/shared-documents/${link.shareToken.slice(0, 8)}...`}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Expires: {formatDate(link.expiresAt)} • Views: {link.viewCount}
                                {link.maxViews && ` / ${link.maxViews}`}
                                {link.passwordHash && ' • Password protected'}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(`${window.location.origin}/shared-documents/${link.shareToken}`);
                              toast.success('Link copied to clipboard');
                            }}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Danger Zone */}
              <Card className="border-destructive/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-destructive flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDeleteDocument}
                    disabled={deleteDocumentMutation.isPending}
                  >
                    {deleteDocumentMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4 mr-1" />
                    )}
                    Delete Submission
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Status</DialogTitle>
            <DialogDescription>
              Change the status of this document submission
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={newStatus} onValueChange={(v) => setNewStatus(v as DocumentStatus)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Admin Notes (Optional)</Label>
              <Textarea
                placeholder="Add any notes about this status change..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStatusDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateStatus}
              disabled={updateStatusMutation.isPending}
            >
              {updateStatusMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Share Link Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Create Share Link
            </DialogTitle>
            <DialogDescription>
              Generate a secure link to share these documents with other attorneys
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Link Expiration</Label>
              <Select value={shareExpiry} onValueChange={setShareExpiry}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24">24 hours</SelectItem>
                  <SelectItem value="72">3 days</SelectItem>
                  <SelectItem value="168">1 week</SelectItem>
                  <SelectItem value="336">2 weeks</SelectItem>
                  <SelectItem value="720">30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password Protection (Optional)
              </Label>
              <Input
                type="password"
                placeholder="Enter a password to protect this link"
                value={sharePassword}
                onChange={(e) => setSharePassword(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Leave empty for no password protection
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsShareDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreateShareLink}
              disabled={createShareLinkMutation.isPending}
            >
              {createShareLinkMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Create & Copy Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
