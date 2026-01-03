import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export default function BondQuestionnaire() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    detentionFacility: "",
    aNumber: "",
    arrestDate: "",
    priorConvictions: "",
    familyInUS: "",
    additionalInfo: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Bond questionnaire submitted successfully! We will contact you shortly.");
    console.log("Bond Questionnaire:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Immigration Bond Questionnaire
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Help us understand your case better by completing this questionnaire. This information will allow us to evaluate your bond eligibility and prepare for your case.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>Bond Case Information</CardTitle>
              <CardDescription>
                Please provide as much detail as possible. All information is confidential.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="(305) 555-0123"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="detentionFacility">Detention Facility Name *</Label>
                  <Input
                    id="detentionFacility"
                    name="detentionFacility"
                    value={formData.detentionFacility}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Krome Service Processing Center"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="aNumber">A-Number (Alien Number)</Label>
                    <Input
                      id="aNumber"
                      name="aNumber"
                      value={formData.aNumber}
                      onChange={handleChange}
                      placeholder="A123456789"
                    />
                  </div>

                  <div>
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

                <div>
                  <Label htmlFor="priorConvictions">Prior Criminal Convictions</Label>
                  <Textarea
                    id="priorConvictions"
                    name="priorConvictions"
                    value={formData.priorConvictions}
                    onChange={handleChange}
                    placeholder="Please list any prior criminal convictions, if any"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="familyInUS">Family Members in the United States</Label>
                  <Textarea
                    id="familyInUS"
                    name="familyInUS"
                    value={formData.familyInUS}
                    onChange={handleChange}
                    placeholder="List family members, their relationship to you, and their immigration status"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    placeholder="Any other relevant information about your case"
                    rows={4}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Submit Questionnaire
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  After submitting, our team will review your information and contact you within 24 hours.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
