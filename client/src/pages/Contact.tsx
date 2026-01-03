import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    consultationType: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Consultation request submitted! We'll contact you shortly.");
    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      consultationType: "",
      preferredDate: "",
      preferredTime: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Immigration Consultation Background */}
      <section
        className="relative bg-cover bg-center py-24"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/hero-contact.jpg)",
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Schedule a Consultation
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Take the first step toward resolving your immigration detention case. Our experienced attorneys are ready to help you navigate the complex legal process.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <img
                    src="/attorney-ana.jpg"
                    alt="Ana Paola Amaral-Muschlitz"
                    className="w-full rounded-lg mb-4"
                  />
                  <CardTitle>Ana Paola Amaral-Muschlitz</CardTitle>
                  <CardDescription>Immigration Attorney</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Contact Information</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Get in touch with our office
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Phone</p>
                        <p className="text-sm text-muted-foreground">
                          (305) 575-9531
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Email</p>
                        <p className="text-sm text-muted-foreground">
                          ap@amarallegal.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Address</p>
                        <p className="text-sm text-muted-foreground">
                          6750 N. Andrews Avenue<br />
                          Suite 208<br />
                          Fort Lauderdale, FL 33309
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Office Hours</p>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                          <p>Saturday: 10:00 AM - 2:00 PM</p>
                          <p>Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-secondary/10 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm">
                      Emergency Consultations
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Available for urgent detention cases. Call our emergency line for immediate assistance.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Consultation Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Consultation Form</CardTitle>
                  <CardDescription>
                    Fill out the form below and we will contact you to confirm your consultation time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          placeholder="John Doe"
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(305) 575-9531"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="consultationType">Consultation Type *</Label>
                        <Select
                          value={formData.consultationType}
                          onValueChange={(value) =>
                            setFormData({ ...formData, consultationType: value })
                          }
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select consultation type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bond">Immigration Bond Hearing</SelectItem>
                            <SelectItem value="relief">Court Relief Options</SelectItem>
                            <SelectItem value="defense">Detention Defense</SelectItem>
                            <SelectItem value="general">General Consultation</SelectItem>
                            <SelectItem value="emergency">Emergency Case</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="preferredDate">Preferred Date *</Label>
                        <Input
                          id="preferredDate"
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) =>
                            setFormData({ ...formData, preferredDate: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="preferredTime">Preferred Time *</Label>
                        <Select
                          value={formData.preferredTime}
                          onValueChange={(value) =>
                            setFormData({ ...formData, preferredTime: value })
                          }
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="9am">9:00 AM</SelectItem>
                            <SelectItem value="10am">10:00 AM</SelectItem>
                            <SelectItem value="11am">11:00 AM</SelectItem>
                            <SelectItem value="12pm">12:00 PM</SelectItem>
                            <SelectItem value="1pm">1:00 PM</SelectItem>
                            <SelectItem value="2pm">2:00 PM</SelectItem>
                            <SelectItem value="3pm">3:00 PM</SelectItem>
                            <SelectItem value="4pm">4:00 PM</SelectItem>
                            <SelectItem value="5pm">5:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea
                        id="message"
                        placeholder="Please provide any additional details about your case or specific questions you have..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                      />
                    </div>

                    <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
                      <p>
                        <strong>Note:</strong> This form is for scheduling consultation appointments. Your information will be kept confidential. For immediate assistance with urgent detention matters, please call our emergency line.
                      </p>
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Submit Request
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
