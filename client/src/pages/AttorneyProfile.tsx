import { useRoute, Link } from "wouter";
import { attorneys } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Award, BookOpen, GraduationCap, ArrowLeft, Linkedin } from "lucide-react";
import NotFound from "./NotFound";

export default function AttorneyProfile() {
  const [match, params] = useRoute("/attorneys/:id");
  
  if (!match) return <NotFound />;
  
  const attorney = attorneys.find(a => a.id === params.id);
  
  if (!attorney) return <NotFound />;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Breadcrumb / Back Navigation */}
      <div className="bg-muted/30 border-b border-border/50 py-4">
        <div className="container">
          <Link href="/attorneys">
            <a className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Directory
            </a>
          </Link>
        </div>
      </div>

      <div className="container mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar / Profile Image */}
          <div className="lg:col-span-4 space-y-8">
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden rounded-sm border border-border shadow-md">
                <img 
                  src={attorney.image} 
                  alt={attorney.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 right-6 bg-primary text-primary-foreground p-4 shadow-lg rounded-sm hidden md:block">
                <ScaleIcon className="h-8 w-8" />
              </div>
            </div>

            <Card className="law-card border-t-4 border-t-primary">
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-3">
                  <a href={`mailto:${attorney.email}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-muted/50 rounded-sm">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{attorney.email}</span>
                  </a>
                  <a href={`tel:${attorney.phone}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-muted/50 rounded-sm">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{attorney.phone}</span>
                  </a>
                  <div className="flex items-center gap-3 text-muted-foreground p-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{attorney.location}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="pt-2">
                  <Link href="/consultation">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-serif tracking-wide">
                      Request Consultation
                    </Button>
                  </Link>
                </div>
                
                <div className="flex justify-center pt-2">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-[#0077b5]">
                    <Linkedin className="h-5 w-5 mr-2" /> Connect on LinkedIn
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">{attorney.name}</h1>
              <p className="text-xl text-muted-foreground font-light uppercase tracking-widest">{attorney.role}</p>
            </div>

            <div className="prose prose-lg prose-slate max-w-none">
              <h3 className="font-serif text-2xl font-bold text-foreground border-l-4 border-primary pl-4 mb-4">Biography</h3>
              <p className="text-muted-foreground leading-relaxed">
                {attorney.bio}
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                With a career built on integrity and results, {attorney.name.split(' ')[0]} has established a reputation for excellence in the legal community. 
                Clients value {attorney.name.split(' ')[0]}'s strategic approach and unwavering dedication to achieving the best possible outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="law-card bg-muted/10 border-none shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-serif text-xl">
                    <GraduationCap className="h-5 w-5 text-primary" /> Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {attorney.education.map((edu, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        {edu}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="law-card bg-muted/10 border-none shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-serif text-xl">
                    <Award className="h-5 w-5 text-primary" /> Admissions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {attorney.admissions.map((adm, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        {adm}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-foreground border-l-4 border-primary pl-4 mb-6">Publications & Insights</h3>
              <div className="grid gap-4">
                {attorney.publications.map((pub, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 border border-border rounded-sm hover:bg-muted/20 transition-colors group cursor-pointer">
                    <div className="bg-primary/10 p-3 rounded-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <BookOpen className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-lg group-hover:text-primary transition-colors">{pub}</h4>
                      <p className="text-sm text-muted-foreground mt-1">Published in Legal Review Journal</p>
                      <Button variant="link" className="p-0 h-auto mt-2 text-primary font-bold text-xs uppercase tracking-wider">Read Article &rarr;</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function ScaleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  )
}
