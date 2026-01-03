import React, { useState, useMemo } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { useLocation } from 'wouter';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { 
  BarChart3, 
  FileText, 
  Search, 
  Filter, 
  ChevronDown, 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Download,
  Loader2,
  ArrowUpDown
} from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { BondSubmissionActions } from '@/components/BondSubmissionActions';
import { exportBondSubmissionToPDF } from '@/lib/exportPDF';
import type { BondSubmission } from '@shared/types';

type SortBy = 'date' | 'name' | 'status';
type SortOrder = 'asc' | 'desc';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortBy>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedSubmission, setSelectedSubmission] = useState<BondSubmission | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Redirect if not authenticated
  if (!user) {
    navigate('/');
    return null;
  }

  // Fetch filtered submissions
  const { data: submissions, isLoading, error } = trpc.bond.getFiltered.useQuery({
    status: statusFilter as any,
    search: searchTerm,
    sortBy,
    sortOrder,
  });

  // Calculate statistics
  const stats = useMemo(() => {
    if (!submissions) return { total: 0, new: 0, reviewed: 0, inProgress: 0, completed: 0 };
    
    return {
      total: submissions.length,
      new: submissions.filter(s => s.status === 'new').length,
      reviewed: submissions.filter(s => s.status === 'reviewed').length,
      inProgress: submissions.filter(s => s.status === 'in_progress').length,
      completed: submissions.filter(s => s.status === 'completed').length,
    };
  }, [submissions]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'reviewed':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'in_progress':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="h-4 w-4" />;
      case 'reviewed':
        return <Eye className="h-4 w-4" />;
      case 'in_progress':
        return <Clock className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleViewDetails = (submission: BondSubmission) => {
    setSelectedSubmission(submission);
    setIsDetailOpen(true);
  };

  const toggleSort = (column: SortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO titleKey="seo.admin.title" descriptionKey="seo.admin.desc" />
      
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container py-8">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-serif font-bold text-primary">Bond Questionnaire Dashboard</h1>
          </div>
          <p className="text-muted-foreground">Manage and track all submitted bond questionnaires</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.total}</div>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">Total Submissions</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-red-900 dark:text-red-100">{stats.new}</div>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">New</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">{stats.reviewed}</div>
              <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">Reviewed</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-amber-900 dark:text-amber-100">{stats.inProgress}</div>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">In Progress</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-900 dark:text-green-100">{stats.completed}</div>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">Completed</p>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, A#, email..."
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
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
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
                    <SelectItem value="name">Detainee Name</SelectItem>
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
                Submissions ({submissions?.length || 0})
              </span>
              <Button variant="outline" size="sm" disabled>
                <Download className="h-4 w-4 mr-2" />
                Export
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
                <p className="text-red-600 dark:text-red-400">Error loading submissions</p>
              </div>
            ) : submissions && submissions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">
                        <button
                          onClick={() => toggleSort('name')}
                          className="flex items-center gap-2 hover:text-primary"
                        >
                          Detainee Name
                          {sortBy === 'name' && <ArrowUpDown className="h-4 w-4" />}
                        </button>
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">A-Number</th>
                      <th className="text-left py-3 px-4 font-semibold">Detention Center</th>
                      <th className="text-left py-3 px-4 font-semibold">
                        <button
                          onClick={() => toggleSort('status')}
                          className="flex items-center gap-2 hover:text-primary"
                        >
                          Status
                          {sortBy === 'status' && <ArrowUpDown className="h-4 w-4" />}
                        </button>
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        <button
                          onClick={() => toggleSort('date')}
                          className="flex items-center gap-2 hover:text-primary"
                        >
                          Submitted
                          {sortBy === 'date' && <ArrowUpDown className="h-4 w-4" />}
                        </button>
                      </th>
                      <th className="text-center py-3 px-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((submission) => (
                      <tr key={submission.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4 font-medium">{submission.detaineeName}</td>
                        <td className="py-3 px-4 text-muted-foreground">{submission.aNumber || '—'}</td>
                        <td className="py-3 px-4 text-muted-foreground text-xs">{submission.detentionCenter || '—'}</td>
                        <td className="py-3 px-4">
                          <Badge className={`${getStatusColor(submission.status)} flex items-center gap-1 w-fit`}>
                            {getStatusIcon(submission.status)}
                            {submission.status.replace('_', ' ')}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground text-xs">
                          {formatDate(submission.createdAt)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2 justify-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDetails(submission)}
                              className="text-primary hover:text-primary hover:bg-primary/10"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <BondSubmissionActions 
                              submission={submission}
                              onStatusUpdated={() => {
                                // Refetch data
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No submissions found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedSubmission && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-serif">
                  {selectedSubmission.detaineeName}
                </DialogTitle>
                <DialogDescription>
                  A-Number: {selectedSubmission.aNumber || 'Not provided'} • Submitted {formatDate(selectedSubmission.createdAt)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Status & Notes */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Status</p>
                      <Badge className={`${getStatusColor(selectedSubmission.status)} mt-2`}>
                        {selectedSubmission.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Detention Center</p>
                      <p className="mt-2 font-medium">{selectedSubmission.detentionCenter || '—'}</p>
                    </div>
                  </div>
                  {selectedSubmission.notes && (
                    <>
                      <Separator className="my-4" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Notes</p>
                        <p className="text-sm">{selectedSubmission.notes}</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Detainee Information */}
                <div>
                  <h3 className="font-semibold text-primary mb-3">Detainee Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Date of Birth</p>
                      <p className="font-medium">{selectedSubmission.dateOfBirth || '—'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Country of Birth</p>
                      <p className="font-medium">{selectedSubmission.countryOfBirth || '—'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Date of Entry</p>
                      <p className="font-medium">{selectedSubmission.dateOfEntry || '—'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Manner of Entry</p>
                      <p className="font-medium">{selectedSubmission.mannerOfEntry || '—'}</p>
                    </div>
                  </div>
                </div>

                {/* Eligibility Check */}
                <div>
                  <h3 className="font-semibold text-primary mb-3">Eligibility Factors</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Aggravated Felony:</span>
                      <span className={selectedSubmission.hasAggravatedFelony ? 'text-red-600 font-semibold' : 'text-green-600'}>
                        {selectedSubmission.hasAggravatedFelony ? 'Yes ⚠️' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Drug Crimes:</span>
                      <span className={selectedSubmission.hasDrugCrimes ? 'text-red-600 font-semibold' : 'text-green-600'}>
                        {selectedSubmission.hasDrugCrimes ? 'Yes ⚠️' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Prior Deportation:</span>
                      <span className={selectedSubmission.hasPriorDeportation ? 'text-red-600 font-semibold' : 'text-green-600'}>
                        {selectedSubmission.hasPriorDeportation ? 'Yes ⚠️' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Final Removal Order:</span>
                      <span className={selectedSubmission.hasFinalRemovalOrder ? 'text-red-600 font-semibold' : 'text-green-600'}>
                        {selectedSubmission.hasFinalRemovalOrder ? 'Yes ⚠️' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Community Ties */}
                <div>
                  <h3 className="font-semibold text-primary mb-3">Community Ties</h3>
                  <div className="space-y-3 text-sm">
                    {selectedSubmission.usResidenceLength && (
                      <div>
                        <p className="text-muted-foreground">U.S. Residence Length</p>
                        <p className="font-medium">{selectedSubmission.usResidenceLength}</p>
                      </div>
                    )}
                    {selectedSubmission.currentEmployer && (
                      <div>
                        <p className="text-muted-foreground">Current Employer</p>
                        <p className="font-medium">{selectedSubmission.currentEmployer}</p>
                      </div>
                    )}
                    {selectedSubmission.familyTiesInUS && (
                      <div>
                        <p className="text-muted-foreground">Family Ties in U.S.</p>
                        <p className="font-medium whitespace-pre-wrap">{selectedSubmission.familyTiesInUS}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sponsor Information */}
                {selectedSubmission.sponsorName && (
                  <div>
                    <h3 className="font-semibold text-primary mb-3">Sponsor Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium">{selectedSubmission.sponsorName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Relation:</span>
                        <span className="font-medium">{selectedSubmission.sponsorRelation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="font-medium">{selectedSubmission.sponsorStatus}</span>
                      </div>
                      {selectedSubmission.sponsorEmail && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Email:</span>
                          <span className="font-medium">{selectedSubmission.sponsorEmail}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                <div>
                  <h3 className="font-semibold text-primary mb-3">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    {selectedSubmission.contactPhone && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone:</span>
                        <a href={`tel:${selectedSubmission.contactPhone}`} className="font-medium text-primary hover:underline">
                          {selectedSubmission.contactPhone}
                        </a>
                      </div>
                    )}
                    {selectedSubmission.contactEmail && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <a href={`mailto:${selectedSubmission.contactEmail}`} className="font-medium text-primary hover:underline">
                          {selectedSubmission.contactEmail}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                  Close
                </Button>
                <Button 
                  onClick={() => {
                    exportBondSubmissionToPDF(selectedSubmission);
                    toast.success('PDF exported successfully');
                  }}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export as PDF
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
