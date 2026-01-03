import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message Sent",
      description: "We have received your message and will contact you shortly.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
              {t("contact.title")}
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              {t("contact.subtitle")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-primary mb-6">
                  {t("contact.info_title")}
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{t("contact.address")}</h3>
                      <p className="text-muted-foreground">
                        6750 N. Andrews Avenue Ste 208<br />
                        Fort Lauderdale, FL 33309
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{t("contact.phone")}</h3>
                      <p className="text-muted-foreground">
                        <a href="tel:1-844-262-5442" className="hover:text-primary transition-colors">1-844-ICE-FREE (1-844-262-5442)</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">WhatsApp</h3>
                      <p className="text-muted-foreground">
                        <a href="https://wa.me/16198671707" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                          (619) 867-1707
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{t("contact.email")}</h3>
                      <p className="text-muted-foreground">
                        <a href="mailto:ap@amarallegal.com" className="hover:text-primary transition-colors">ap@amarallegal.com</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{t("contact.hours")}</h3>
                      <p className="text-muted-foreground">{t("contact.hours_val")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="h-[300px] bg-muted rounded-lg overflow-hidden border border-border/50">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.699667636984!2d-80.1495!3d26.1785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDEwJzQyLjYiTiA4MMKwMDgnNTguMiJX!5e0!3m2!1sen!2sus!4v1625680000000!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  title="Office Location"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card p-8 rounded-lg shadow-sm border border-border/50">
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">
                {t("contact.form_title")}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">{t("contact.name")}</label>
                  <Input id="name" required placeholder="John Doe" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">{t("contact.email")}</label>
                    <Input id="email" type="email" required placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">{t("contact.phone")}</label>
                    <Input id="phone" type="tel" required placeholder="(555) 555-5555" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">{t("contact.message")}</label>
                  <Textarea id="message" required placeholder="How can we help you?" className="min-h-[150px]" />
                </div>

                <Button type="submit" className="w-full font-bold" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : t("contact.submit")}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
