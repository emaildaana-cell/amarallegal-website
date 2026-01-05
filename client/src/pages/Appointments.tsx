import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Phone, Mail, MapPin, Clock, AlertCircle, CheckCircle2, DollarSign, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { MapView } from "@/components/Map";

const appointmentSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  consultationType: z.string().min(1, "Please select a consultation type"),
  preferredDate: z.string().min(1, "Please select a preferred date"),
  preferredTime: z.string().min(1, "Please select a preferred time"),
  message: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

export default function Appointments() {
  const { t, language } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      consultationType: "",
      preferredDate: "",
      preferredTime: "",
      message: "",
    },
  });

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Appointment Request:", data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Appointment request submitted successfully!");
  };

  const consultationTypes = [
    { value: "bond-hearing", label: "Bond Hearing" },
    { value: "removal-defense", label: "Removal Defense" },
    { value: "asylum", label: "Asylum Application" },
    { value: "family-petition", label: "Family Petition" },
    { value: "general", label: "General Consultation" },
    { value: "emergency", label: "Emergency Detention" },
  ];

  const timeSlots = [
    { value: "9:00 AM", label: "9:00 AM" },
    { value: "10:00 AM", label: "10:00 AM" },
    { value: "11:00 AM", label: "11:00 AM" },
    { value: "12:00 PM", label: "12:00 PM" },
    { value: "1:00 PM", label: "1:00 PM" },
    { value: "2:00 PM", label: "2:00 PM" },
    { value: "3:00 PM", label: "3:00 PM" },
    { value: "4:00 PM", label: "4:00 PM" },
    { value: "5:00 PM", label: "5:00 PM" },
  ];

  const content = {
    en: {
      title: "Schedule a Consultation",
      subtitle: "Take the first step toward resolving your immigration detention case. Our experienced attorneys are ready to help you navigate the complex legal process.",
      formTitle: "Consultation Form",
      formSubtitle: "Fill out the form below and we will contact you to confirm your consultation time",
      feeTitle: "Consultation Fee: $250.00",
      feeDesc: "Please note that there is a consultation fee of $250.00 for all initial appointments.",
      payNow: "Pay Now via LawPay",
      orPayLater: "Or pay later - a LawPay invoice will be emailed to you prior to your appointment.",
      contactTitle: "Contact Information",
      contactSubtitle: "Get in touch with our office",
      officeHours: "Office Hours",
      emergency: "Emergency Consultations",
      emergencyDesc: "Available for urgent detention cases. Call our emergency line for immediate assistance.",
      note: "Note: This form is for scheduling consultation appointments. Your information will be kept confidential. For immediate assistance with urgent detention matters, please call our emergency line.",
      submit: "Submit Request",
      success: "Thank You!",
      successDesc: "Your appointment request has been submitted. We will contact you within 24 hours to confirm your consultation time.",
      backHome: "Back to Home",
    },
    es: {
      title: "Programe una Consulta",
      subtitle: "Dé el primer paso para resolver su caso de detención migratoria. Nuestros abogados experimentados están listos para ayudarle a navegar el complejo proceso legal.",
      formTitle: "Formulario de Consulta",
      formSubtitle: "Complete el formulario a continuación y nos comunicaremos con usted para confirmar su hora de consulta",
      feeTitle: "Tarifa de Consulta: $250.00",
      feeDesc: "Tenga en cuenta que hay una tarifa de consulta de $250.00 para todas las citas iniciales.",
      payNow: "Pagar Ahora vía LawPay",
      orPayLater: "O pague después - se le enviará una factura de LawPay por correo electrónico antes de su cita.",
      contactTitle: "Información de Contacto",
      contactSubtitle: "Comuníquese con nuestra oficina",
      officeHours: "Horario de Oficina",
      emergency: "Consultas de Emergencia",
      emergencyDesc: "Disponible para casos urgentes de detención. Llame a nuestra línea de emergencia para asistencia inmediata.",
      note: "Nota: Este formulario es para programar citas de consulta. Su información se mantendrá confidencial. Para asistencia inmediata con asuntos urgentes de detención, llame a nuestra línea de emergencia.",
      submit: "Enviar Solicitud",
      success: "¡Gracias!",
      successDesc: "Su solicitud de cita ha sido enviada. Nos comunicaremos con usted dentro de 24 horas para confirmar su hora de consulta.",
      backHome: "Volver al Inicio",
    },
    pt: {
      title: "Agende uma Consulta",
      subtitle: "Dê o primeiro passo para resolver seu caso de detenção imigratória. Nossos advogados experientes estão prontos para ajudá-lo a navegar pelo complexo processo legal.",
      formTitle: "Formulário de Consulta",
      formSubtitle: "Preencha o formulário abaixo e entraremos em contato para confirmar o horário da sua consulta",
      feeTitle: "Taxa de Consulta: $250.00",
      feeDesc: "Observe que há uma taxa de consulta de $250.00 para todos os agendamentos iniciais.",
      payNow: "Pagar Agora via LawPay",
      orPayLater: "Ou pague depois - uma fatura do LawPay será enviada para você por e-mail antes da sua consulta.",
      contactTitle: "Informações de Contato",
      contactSubtitle: "Entre em contato com nosso escritório",
      officeHours: "Horário de Funcionamento",
      emergency: "Consultas de Emergência",
      emergencyDesc: "Disponível para casos urgentes de detenção. Ligue para nossa linha de emergência para assistência imediata.",
      note: "Nota: Este formulário é para agendar consultas. Suas informações serão mantidas em sigilo. Para assistência imediata com assuntos urgentes de detenção, ligue para nossa linha de emergência.",
      submit: "Enviar Solicitação",
      success: "Obrigado!",
      successDesc: "Sua solicitação de consulta foi enviada. Entraremos em contato dentro de 24 horas para confirmar o horário da sua consulta.",
      backHome: "Voltar ao Início",
    },
  };

  const c = content[language] || content.en;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center py-12 px-4">
        <Card className="max-w-lg w-full border-t-4 border-t-primary">
          <CardContent className="pt-12 pb-12 text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-primary">{c.success}</h2>
            <p className="text-muted-foreground text-lg">
              {c.successDesc}
            </p>
            <Button className="mt-6" onClick={() => window.location.href = "/"}>
              {c.backHome}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <SEO 
        title="Schedule Appointment"
        description="Book an appointment with Amaral Law immigration attorneys. In-person, phone, or video consultations available for your convenience."
        keywords="immigration appointment, lawyer appointment, legal consultation booking"
        canonicalUrl="/appointments"
      />
      
      {/* Hero Section */}
      <div className="relative bg-primary text-primary-foreground py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/courthouse-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="container relative z-10 text-center">
          <div className="mx-auto w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-6">
            <Calendar className="h-8 w-8 text-secondary" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{c.title}</h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            {c.subtitle}
          </p>
        </div>
      </div>

      <div className="container py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Attorney Card */}
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 text-center">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                  <img 
                    src="/images/ana-paola-ice-free.png" 
                    alt="Ana Paola Amaral-Muschlitz"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-serif text-xl font-bold text-primary">Ana Paola Amaral-Muschlitz</h3>
                <p className="text-muted-foreground">Immigration Attorney</p>
              </div>
            </Card>

            {/* Contact Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{c.contactTitle}</CardTitle>
                <p className="text-sm text-muted-foreground">{c.contactSubtitle}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:3055759531" className="text-muted-foreground hover:text-primary transition-colors">
                      (305) 575-9531
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:ap@amarallegal.com" className="text-muted-foreground hover:text-primary transition-colors">
                      ap@amarallegal.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">
                      6750 N. Andrews Avenue<br />
                      Suite 208<br />
                      Fort Lauderdale, FL 33309
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">{c.officeHours}</p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>10:00 AM - 2:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Notice */}
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-800">{c.emergency}</p>
                    <p className="text-sm text-red-700 mt-1">
                      {c.emergencyDesc}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Find Our Office</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-48">
                  <MapView
                    onMapReady={(map: google.maps.Map) => {
                      const marker = new google.maps.Marker({
                        position: { lat: 26.1884, lng: -80.1711 },
                        map,
                        title: "Amaral Law Office",
                      });
                      map.setCenter({ lat: 26.1884, lng: -80.1711 });
                      map.setZoom(15);
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right - Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-2xl">{c.formTitle}</CardTitle>
                <p className="text-muted-foreground">{c.formSubtitle}</p>
              </CardHeader>
              <CardContent>
                {/* Consultation Fee Notice */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-primary text-lg">{c.feeTitle}</p>
                      <p className="text-sm text-muted-foreground mt-1">{c.feeDesc}</p>
                      <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3">
                        <a
                          href="https://secure.lawpay.com/pages/amarallawllc/operating250"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium text-sm transition-colors"
                        >
                          {c.payNow}
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        <span className="text-xs text-muted-foreground">{c.orPayLater}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="(305) 575-9531" type="tel" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="consultationType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Consultation Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select consultation type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {consultationTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="preferredDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Date *</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="preferredTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Time *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeSlots.map((slot) => (
                                  <SelectItem key={slot.value} value={slot.value}>
                                    {slot.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please provide any additional details about your case or specific questions you have..."
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-md">
                      <p className="text-sm text-amber-800">
                        <strong>Note:</strong> {c.note}
                      </p>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : c.submit}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
