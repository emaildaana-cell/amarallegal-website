import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

export default function ClientIntake() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    
    try {
      // Replace with your actual EmailJS service ID, template ID, and public key
      // await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form, 'YOUR_PUBLIC_KEY');
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Intake Form Submitted",
        description: "Thank you for providing your information. Our team will review it and contact you shortly.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your form. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container max-w-3xl">
        <div className="mb-8 text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary">
            Client Intake Questionnaire
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Please complete this form to help us understand your immigration situation. All information provided is confidential and protected by attorney-client privilege.
          </p>
        </div>

        <Card className="border-t-4 border-t-secondary shadow-lg">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Basic details about the person needing legal assistance.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Legal Name</Label>
                  <Input id="fullName" name="fullName" required placeholder="First Middle Last" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" name="dob" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" required placeholder="(555) 555-5555" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" required placeholder="you@example.com" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Current Address</Label>
                  <Input id="address" name="address" required placeholder="Street, City, State, Zip" />
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold mb-4">Immigration History</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="countryBirth">Country of Birth</Label>
                    <Input id="countryBirth" name="countryBirth" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="citizenship">Country of Citizenship</Label>
                    <Input id="citizenship" name="citizenship" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateEntry">Date of Last Entry to U.S.</Label>
                    <Input id="dateEntry" name="dateEntry" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mannerEntry">Manner of Entry</Label>
                    <Select name="mannerEntry">
                      <SelectTrigger>
                        <SelectValue placeholder="Select manner of entry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visa">With a Visa</SelectItem>
                        <SelectItem value="border">Crossed Border (No Inspection)</SelectItem>
                        <SelectItem value="parole">Parole</SelectItem>
                        <SelectItem value="refugee">Refugee/Asylee</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentStatus">Current Immigration Status</Label>
                    <Select name="currentStatus">
                      <SelectTrigger>
                        <SelectValue placeholder="Select current status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None / Undocumented</SelectItem>
                        <SelectItem value="visitor">Visitor (B1/B2)</SelectItem>
                        <SelectItem value="student">Student (F1)</SelectItem>
                        <SelectItem value="work">Work Visa (H1B, etc)</SelectItem>
                        <SelectItem value="tps">TPS</SelectItem>
                        <SelectItem value="daca">DACA</SelectItem>
                        <SelectItem value="lpr">Permanent Resident (Green Card)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aNumber">A-Number (if known)</Label>
                    <Input id="aNumber" name="aNumber" placeholder="A-123-456-789" />
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold mb-4">Case Details</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Have you ever been in immigration court proceedings?</Label>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="court-yes" name="courtProceedings" value="yes" className="accent-primary h-4 w-4" />
                        <Label htmlFor="court-yes" className="font-normal">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="court-no" name="courtProceedings" value="no" className="accent-primary h-4 w-4" />
                        <Label htmlFor="court-no" className="font-normal">No</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Have you ever been arrested or convicted of a crime?</Label>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="crime-yes" name="criminalHistory" value="yes" className="accent-primary h-4 w-4" />
                        <Label htmlFor="crime-yes" className="font-normal">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="crime-no" name="criminalHistory" value="no" className="accent-primary h-4 w-4" />
                        <Label htmlFor="crime-no" className="font-normal">No</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Briefly describe your immigration situation and what you need help with:</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      placeholder="Please provide details about your case..." 
                      className="min-h-[120px]"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold mb-4">Family Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="spouseUSC" name="spouseUSC" />
                    <Label htmlFor="spouseUSC" className="font-normal">I have a spouse who is a U.S. Citizen or Green Card holder</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="parentUSC" name="parentUSC" />
                    <Label htmlFor="parentUSC" className="font-normal">I have a parent who is a U.S. Citizen or Green Card holder</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="childUSC" name="childUSC" />
                    <Label htmlFor="childUSC" className="font-normal">I have a child (over 21) who is a U.S. Citizen</Label>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full text-lg py-6 font-bold" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Intake Form"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
