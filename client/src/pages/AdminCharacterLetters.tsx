import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { 
  Plus, 
  Copy, 
  Trash2, 
  FileText, 
  CheckCircle, 
  Clock, 
  Edit,
  Loader2,
  ExternalLink
} from "lucide-react";
import { toast } from "sonner";

export default function AdminCharacterLetters() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newLetterData, setNewLetterData] = useState({
    respondentName: "",
    caseType: "bond_hearing" as const,
    caseId: "",
    language: "en",
  });
  
  // Fetch all letters
  const { data: letters, isLoading, refetch } = trpc.characterLetter.getAll.useQuery();
  
  // Create mutation
  const createMutation = trpc.characterLetter.create.useMutation({
    onSuccess: () => {
      toast.success("Letter request created successfully!");
      setIsCreateOpen(false);
      setNewLetterData({
        respondentName: "",
        caseType: "bond_hearing",
        caseId: "",
        language: "en",
      });
      refetch();
    },
    onError: (error) => {
      toast.error(`Failed to create letter: ${error.message}`);
    },
  });
  
  // Delete mutation
  const deleteMutation = trpc.characterLetter.delete.useMutation({
    onSuccess: () => {
      toast.success("Letter deleted successfully!");
      refetch();
    },
    onError: (error) => {
      toast.error(`Failed to delete letter: ${error.message}`);
    },
  });
  
  const handleCreate = () => {
    if (!newLetterData.respondentName) {
      toast.error("Respondent name is required");
      return;
    }
    createMutation.mutate(newLetterData);
  };
  
  const handleCopyLink = (accessToken: string) => {
    const link = `${window.location.origin}/character-letter/${accessToken}`;
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };
  
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this letter request?")) {
      deleteMutation.mutate({ id });
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "draft":
        return <Badge variant="outline"><Edit className="w-3 h-3 mr-1" /> In Progress</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" /> Completed</Badge>;
      case "submitted":
        return <Badge className="bg-blue-100 text-blue-800"><FileText className="w-3 h-3 mr-1" /> Submitted</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };
  
  const formatDate = (date: Date | string | null) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Character Reference Letters</h1>
            <p className="text-gray-600 mt-1">Manage character reference letter requests for clients</p>
          </div>
          
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Letter Request
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Letter Request</DialogTitle>
                <DialogDescription>
                  Create a new character reference letter request. You'll receive a unique link to share with the letter writer.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="respondentName">Respondent Name *</Label>
                  <Input
                    id="respondentName"
                    value={newLetterData.respondentName}
                    onChange={(e) => setNewLetterData(prev => ({ ...prev, respondentName: e.target.value }))}
                    placeholder="Enter the client's name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="caseType">Case Type</Label>
                  <Select
                    value={newLetterData.caseType}
                    onValueChange={(value: any) => setNewLetterData(prev => ({ ...prev, caseType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bond_hearing">Bond Hearing</SelectItem>
                      <SelectItem value="asylum">Asylum</SelectItem>
                      <SelectItem value="cancellation_of_removal">Cancellation of Removal</SelectItem>
                      <SelectItem value="adjustment_of_status">Adjustment of Status</SelectItem>
                      <SelectItem value="naturalization">Naturalization</SelectItem>
                      <SelectItem value="waiver">Waiver</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="caseId">Case ID / A-Number (Optional)</Label>
                  <Input
                    id="caseId"
                    value={newLetterData.caseId}
                    onChange={(e) => setNewLetterData(prev => ({ ...prev, caseId: e.target.value }))}
                    placeholder="e.g., A123-456-789"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Preferred Language</Label>
                  <Select
                    value={newLetterData.language}
                    onValueChange={(value) => setNewLetterData(prev => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="pt">Portuguese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreate} disabled={createMutation.isPending}>
                  {createMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Create Request
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Letters List */}
        {isLoading ? (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            <p className="text-gray-600 mt-2">Loading letters...</p>
          </div>
        ) : letters && letters.length > 0 ? (
          <div className="grid gap-4">
            {letters.map((letter) => (
              <Card key={letter.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{letter.respondentName}</h3>
                        {getStatusBadge(letter.status)}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          <strong>Case Type:</strong> {letter.caseType?.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                          {letter.caseId && ` • ${letter.caseId}`}
                        </p>
                        <p>
                          <strong>Created:</strong> {formatDate(letter.createdAt)}
                          {letter.signedAt && ` • Signed: ${formatDate(letter.signedAt)}`}
                        </p>
                        {letter.writerName && (
                          <p><strong>Writer:</strong> {letter.writerName} ({letter.writerRelationship})</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyLink(letter.accessToken)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Link
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`/character-letter/${letter.accessToken}`, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      
                      {letter.pdfFileUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(letter.pdfFileUrl!, "_blank")}
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          PDF
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(letter.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Letter Requests</h3>
              <p className="text-gray-600 mb-4">
                Create your first character reference letter request to get started.
              </p>
              <Button onClick={() => setIsCreateOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Letter Request
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
