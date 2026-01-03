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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Calendar, Mail, CreditCard } from "lucide-react";
import { practiceAreas } from "@/lib/data";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { InlineWidget } from "react-calendly";

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
  const { t } = useLanguage();
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
      toast.success(t("consultation.success.title"));
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
            <h2 className="font-serif text-3xl font-bold text-primary">{t("consultation.success.title")}</h2>
            <p className="text-muted-foreground text-lg">
              {t("consultation.success.desc")}
            </p>
            <Button className="mt-6" onClick={() => window.location.href = "/"}>
              {t("consultation.button.home")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/10 py-12 md:py-20">
      <div className="container max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl font-bold text-primary mb-4">{t("consultation.title")}</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t("consultation.subtitle")}
          </p>
        </div>

        <Tabs defaultValue="inquiry" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="inquiry" className="text-lg py-3">
              <Mail className="mr-2 h-5 w-5" />
              {t("consultation.tab.inquiry")}
            </TabsTrigger>
            <TabsTrigger value="booking" className="text-lg py-3">
              <Calendar className="mr-2 h-5 w-5" />
              {t("consultation.tab.booking")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inquiry">
            <div className="mb-8">
              <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2">
                <span>{t("consultation.step1")}</span>
                <span>{t("consultation.step2")}</span>
                <span>{t("consultation.step3")}</span>
              </div>
              <Progress value={(step / 3) * 100} className="h-2" />
            </div>

            <Card className="law-card">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">
                  {step === 1 && t("consultation.step1_title")}
                  {step === 2 && t("consultation.step2_title")}
                  {step === 3 && t("consultation.step3_title")}
                </CardTitle>
                <CardDescription>
                  {t("consultation.confidentiality")}
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
                            <FormLabel>{t("consultation.label.area")}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={t("consultation.placeholder.area")} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {practiceAreas.map((area) => (
                                  <SelectItem key={area} value={area}>{area}</SelectItem>
                                ))}
                                <SelectItem value="other">{t("consultation.option.other")}</SelectItem>
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
                            <FormLabel>{t("consultation.label.description")}</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder={t("consultation.placeholder.description")} 
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
                            <FormLabel>{t("consultation.label.urgency")}</FormLabel>
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
                                    {t("consultation.urgency.low")}
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="medium" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {t("consultation.urgency.medium")}
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="high" />
                                  </FormControl>
                                  <FormLabel className="font-normal text-destructive font-bold">
                                    {t("consultation.urgency.high")}
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
                          {t("consultation.button.next")} <ArrowRight className="ml-2 h-4 w-4" />
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
                              <FormLabel>{t("consultation.label.firstname")}</FormLabel>
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
                              <FormLabel>{t("consultation.label.lastname")}</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form2.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("consultation.label.email")}</FormLabel>
                              <FormControl>
                                <Input placeholder="john@example.com" {...field} />
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
                              <FormLabel>{t("consultation.label.phone")}</FormLabel>
                              <FormControl>
                                <Input placeholder="(555) 123-4567" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form2.control}
                        name="preferredContact"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>{t("consultation.label.preferred_contact")}</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-row space-x-4"
                              >
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="email" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {t("consultation.option.email")}
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="phone" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {t("consultation.option.phone")}
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-between pt-4">
                        <Button type="button" variant="outline" onClick={() => setStep(1)}>
                          <ArrowLeft className="mr-2 h-4 w-4" /> {t("consultation.button.back")}
                        </Button>
                        <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          {t("consultation.button.next")} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}

                {step === 3 && (
                  <Form {...form3}>
                    <form onSubmit={form3.handleSubmit(onStep3Submit)} className="space-y-6">
                      <div className="bg-muted/30 p-4 rounded-lg space-y-2 mb-6">
                        <h3 className="font-semibold text-primary">{t("consultation.summary.title")}</h3>
                        <p className="text-sm"><span className="font-medium">{t("consultation.label.area")}:</span> {formData.practiceArea}</p>
                        <p className="text-sm"><span className="font-medium">{t("consultation.label.description")}:</span> {formData.description}</p>
                        <p className="text-sm"><span className="font-medium">{t("consultation.label.urgency")}:</span> {formData.urgency}</p>
                        <p className="text-sm"><span className="font-medium">{t("consultation.label.name")}:</span> {formData.firstName} {formData.lastName}</p>
                        <p className="text-sm"><span className="font-medium">{t("consultation.label.contact")}:</span> {formData.email} | {formData.phone}</p>
                      </div>

                      <FormField
                        control={form3.control}
                        name="preferredTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("consultation.label.time")}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select preferred time" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="morning">{t("consultation.option.morning")}</SelectItem>
                                <SelectItem value="afternoon">{t("consultation.option.afternoon")}</SelectItem>
                                <SelectItem value="evening">{t("consultation.option.evening")}</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

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
                                className="h-4 w-4 mt-1"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                {t("consultation.consent")}
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-between pt-4">
                        <Button type="button" variant="outline" onClick={() => setStep(2)}>
                          <ArrowLeft className="mr-2 h-4 w-4" /> {t("consultation.button.back")}
                        </Button>
                        <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full md:w-auto">
                          {t("consultation.button.submit")}
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="booking">
            <Card className="law-card">
              <CardHeader>
                <CardTitle className="font-serif text-2xl flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-primary" />
                  {t("consultation.booking.title")}
                </CardTitle>
                <CardDescription>
                  {t("consultation.booking.subtitle")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-md">
                  <div className="flex items-start gap-3">
                    <CreditCard className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-amber-800">{t("consultation.fee.title")}</h4>
                      <p className="text-amber-700 text-sm mt-1">
                        {t("consultation.fee.desc")}
                      </p>
                      <p className="text-amber-700 text-sm mt-2 font-medium">
                        {t("consultation.fee.invoice")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="h-[600px] w-full border rounded-md overflow-hidden">
                  <InlineWidget 
                    url="https://calendly.com/amaral-law" 
                    styles={{ height: '100%', width: '100%' }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
