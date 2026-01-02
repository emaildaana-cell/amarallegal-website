import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck } from "lucide-react";
import { practiceAreas } from "@/lib/data";
import { toast } from "sonner";

// Schema for Step 1: Case Details
const step1Schema = z.object({
  practiceArea: z.string().min(1, "Please select a practice area"),
  description: z.string().min(20, "Please provide at least 20 characters describing your situation"),
  urgency: z.enum(["low", "medium", "high"]),
});

// Schema for Step 2: Personal Info
const step2Schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  preferredContact: z.enum(["email", "phone"]),
});

// Schema for Step 3: Scheduling
const step3Schema = z.object({
  preferredTime: z.enum(["morning", "afternoon", "evening"]),
  consent: z.boolean().refine(val => val === true, "You must agree to the terms"),
});

export default function Consultation() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Forms for each step
  const form1 = useForm<z.infer<typeof step1Schema>>({
    resolver: zodResolver(step1Schema),
    defaultValues: { urgency: "medium" }
  });

  const form2 = useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step2Schema),
    defaultValues: { preferredContact: "email" }
  });

  const form3 = useForm<z.infer<typeof step3Schema>>({
    resolver: zodResolver(step3Schema),
    defaultValues: { consent: false }
  });

  const onStep1Submit = (data: z.infer<typeof step1Schema>) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(2);
    window.scrollTo(0, 0);
  };

  const onStep2Submit = (data: z.infer<typeof step2Schema>) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(3);
    window.scrollTo(0, 0);
  };

  const onStep3Submit = (data: z.infer<typeof step3Schema>) => {
    const finalData = { ...formData, ...data };
    console.log("Form Submitted:", finalData);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      toast.success("Consultation request received successfully.");
      window.scrollTo(0, 0);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
        <Card className="max-w-lg w-full law-card border-t-4 border-t-primary">
          <CardContent className="pt-12 pb-12 text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-primary">Request Received</h2>
            <p className="text-muted-foreground text-lg">
              Thank you for contacting Amaral Law. Our intake team will review your details and contact you within 24 hours to schedule your consultation.
            </p>
            <Button className="mt-6" onClick={() => window.location.href = "/"}>
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/10 py-12 md:py-20">
      <div className="container max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-bold text-primary mb-4">Request a Consultation</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Please provide details about your legal matter so we can match you with the most appropriate attorney.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2">
            <span>Case Details</span>
            <span>Contact Info</span>
            <span>Review</span>
          </div>
          <Progress value={(step / 3) * 100} className="h-2" />
        </div>

        <Card className="law-card">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">
              {step === 1 && "Step 1: Tell us about your case"}
              {step === 2 && "Step 2: Your Contact Information"}
              {step === 3 && "Step 3: Scheduling & Confirmation"}
            </CardTitle>
            <CardDescription>
              All information provided is strictly confidential and protected by attorney-client privilege.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {step === 1 && (
              <Form {...form1}>
                <form onSubmit={form1.handleSubmit(onStep1Submit)} className="space-y-6">
                  <FormField
                    control={form1.control}
                    name="practiceArea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Legal Area</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the area of law" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {practiceAreas.map((area) => (
                              <SelectItem key={area} value={area}>{area}</SelectItem>
                            ))}
                            <SelectItem value="other">Other / Unsure</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form1.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Case Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please briefly describe your legal situation..." 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form1.control}
                    name="urgency"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Urgency Level</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="low" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Standard (Planning ahead)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="medium" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Important (Action needed soon)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="high" />
                              </FormControl>
                              <FormLabel className="font-normal text-destructive font-bold">
                                Urgent (Immediate action required)
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end pt-4">
                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Next Step <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </Form>
            )}

            {step === 2 && (
              <Form {...form2}>
                <form onSubmit={form2.handleSubmit(onStep2Submit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form2.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form2.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form2.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form2.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form2.control}
                    name="preferredContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Contact Method</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select preference" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="phone">Phone Call</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between pt-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      Next Step <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </Form>
            )}

            {step === 3 && (
              <Form {...form3}>
                <form onSubmit={form3.handleSubmit(onStep3Submit)} className="space-y-6">
                  <FormField
                    control={form3.control}
                    name="preferredTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Best Time to Contact</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select time of day" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                            <SelectItem value="evening">Evening (5PM - 7PM)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-muted/30 p-4 rounded-sm border border-border">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-primary" /> Disclaimer
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Submitting this form does not create an attorney-client relationship. Please do not include any confidential or sensitive information in this form. An attorney-client relationship is only formed when a written agreement is signed by both parties.
                    </p>
                  </div>

                  <FormField
                    control={form3.control}
                    name="consent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <input 
                            type="checkbox" 
                            checked={field.value} 
                            onChange={field.onChange}
                            className="h-4 w-4 mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I understand and agree to the disclaimer above.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between pt-4">
                    <Button type="button" variant="outline" onClick={() => setStep(2)}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground w-32">
                      Submit Request
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
