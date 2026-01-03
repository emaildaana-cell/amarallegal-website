import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { X } from "lucide-react";

interface CaseEvaluationPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CaseEvaluationPopup({ open, onOpenChange }: CaseEvaluationPopupProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    detentionFacility: "",
    aNumber: "",
    arrestDate: "",
    urgentDetails: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would send data to a server
    console.log("Case Evaluation Form Submitted:", formData);
    
    toast.success("Your case evaluation request has been submitted! We'll contact you within 24 hours.", {
      duration: 5000,
    });
    
    // Reset form and close dialog
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      detentionFacility: "",
      aNumber: "",
      arrestDate: "",
      urgentDetails: "",
    });
    onOpenChange(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            Free Case Evaluation
          </DialogTitle>
          <DialogDescription className="text-base">
            If you or a loved one is facing immigration detention, time is critical. Fill out this form and we'll contact you within 24 hours for a free case evaluation.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="detentionFacility">Detention Facility Name *</Label>
            <Input
              id="detentionFacility"
              name="detentionFacility"
              value={formData.detentionFacility}
              onChange={handleChange}
              placeholder="e.g., Broward Transitional Center"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="aNumber">A-Number (if known)</Label>
              <Input
                id="aNumber"
                name="aNumber"
                value={formData.aNumber}
                onChange={handleChange}
                placeholder="A123-456-789"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="arrestDate">Arrest/Detention Date</Label>
              <Input
                id="arrestDate"
                name="arrestDate"
                type="date"
                value={formData.arrestDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="urgentDetails">Urgent Details / Questions</Label>
            <Textarea
              id="urgentDetails"
              name="urgentDetails"
              value={formData.urgentDetails}
              onChange={handleChange}
              placeholder="Please provide any urgent details about your case..."
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Submit Case Evaluation
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            By submitting this form, you agree to be contacted by Amaral Law regarding your case. Your information is confidential.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
