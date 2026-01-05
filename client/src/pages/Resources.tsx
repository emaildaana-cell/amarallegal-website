import { motion } from "framer-motion";
import { 
  BookOpen, 
  FileText, 
  HelpCircle, 
  AlertTriangle,
  Users,
  Download,
  ExternalLink,
  ArrowRight,
  Search,
  MapPin,
  DollarSign,
  Calendar,
  FileCheck,
  Phone,
  Scale,
  Building2,
  Gavel
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";

interface ResourceCard {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  external?: boolean;
  color: string;
}

const resources: ResourceCard[] = [
  {
    title: "ICE Detention Process",
    description: "A comprehensive step-by-step guide explaining what happens when someone is detained by ICE, from arrest through removal proceedings.",
    icon: AlertTriangle,
    href: "/detention-process",
    color: "bg-red-500"
  },
  {
    title: "Frequently Asked Questions",
    description: "Find answers to common immigration questions across categories including bonds, asylum, citizenship, and more.",
    icon: HelpCircle,
    href: "/faq",
    color: "bg-blue-500"
  },
  {
    title: "Court Sponsor Guide",
    description: "Learn about the responsibilities and requirements for being a court sponsor in immigration bond cases.",
    icon: Users,
    href: "/sponsor-guide",
    color: "bg-green-500"
  },
  {
    title: "Downloadable Guides",
    description: "Free downloadable resources including checklists, forms guides, and informational documents.",
    icon: Download,
    href: "/downloads",
    color: "bg-purple-500"
  }
];

// Most Frequently Used Resources
const quickAccessResources = [
  {
    title: "Find a Detainee",
    description: "Locate someone in ICE custody",
    href: "https://locator.ice.gov/odls/#/index",
    icon: Search,
    buttonText: "ICE Detainee Locator"
  },
  {
    title: "Check Case Status",
    description: "View your court case information",
    href: "https://acis.eoir.justice.gov/en/",
    icon: FileCheck,
    buttonText: "EOIR Case Status"
  },
  {
    title: "Post a Bond",
    description: "Pay immigration bonds online",
    href: "https://www.ice.gov/detain/cebonds",
    icon: DollarSign,
    buttonText: "CeBONDS System"
  }
];

// Detention Information
const detentionResources = [
  {
    title: "ICE Detainee Locator",
    description: "Use this tool to locate individuals currently in ICE custody. You can search by alien registration number (A-Number), name, date of birth, and country of citizenship. This is the official ICE system for finding detained individuals across all ICE detention facilities nationwide.",
    href: "https://locator.ice.gov/odls/#/index",
    icon: Search
  },
  {
    title: "ICE Detention Facility Locator",
    description: "Find detailed information about ICE detention facilities, including addresses, phone numbers, visitation policies, and facility types. Use this to locate where someone is detained and understand facility-specific rules and procedures.",
    href: "https://www.ice.gov/detention-facilities",
    icon: MapPin
  }
];

// Case Information
const caseResources = [
  {
    title: "EOIR Case Status",
    description: "Check the status of your immigration court case with the Executive Office for Immigration Review (EOIR). You can search using your alien registration number (A-Number) to view hearing dates, case status, and court decisions. This system provides real-time updates on pending immigration court proceedings.",
    href: "https://acis.eoir.justice.gov/en/",
    icon: FileCheck
  }
];

// Court Information
const courtResources = [
  {
    title: "Immigration Court Hearing Locations",
    description: "Find the address, contact information, and directions for all immigration courts across the United States. Use this resource to locate your assigned court, verify hearing locations, and plan your travel to court appearances.",
    href: "https://www.justice.gov/eoir/eoir-immigration-court-listing",
    icon: Gavel
  }
];

// Bond Services
const bondResources = [
  {
    title: "ICE Bond Payment (CeBONDS)",
    description: "The Cash Electronic Bonds (CeBONDS) system allows you to post immigration bonds online. You can verify bond information, pay bonds for eligible detained individuals, and receive electronic notifications about bond status. Bond posting hours are 9 AM - 3 PM in the detention facility's time zone.",
    href: "https://www.ice.gov/detain/cebonds",
    icon: DollarSign
  }
];

// Compliance
const complianceResources = [
  {
    title: "ICE Check-In",
    description: "If you have been released from detention and are required to check in with ICE regularly, use this online system to schedule and complete your check-in appointments. This helps you maintain compliance with your release conditions.",
    href: "https://checkin.ice.gov/",
    icon: Calendar
  }
];

// USCIS Services
const uscisResources = [
  {
    title: "USCIS Case Status",
    description: "Track the status of applications filed with U.S. Citizenship and Immigration Services (USCIS), including green card applications, work permits, travel documents, and naturalization petitions. Enter your receipt number to view current processing status.",
    href: "https://egov.uscis.gov/casestatus/landing.do",
    icon: FileText
  }
];

// Forms & Documents
const formsResources = [
  {
    title: "EOIR Forms and Resources",
    description: "Access official immigration court forms, practice manuals, and legal resources. This includes applications for relief, motions, appeals forms, and guidance documents for immigration court proceedings.",
    href: "https://www.justice.gov/eoir/forms-eoir",
    icon: FileText
  }
];

// Legal Assistance
const legalResources = [
  {
    title: "Legal Orientation Program (LOP)",
    description: "Learn about free legal orientation services available to detained individuals. The LOP provides group presentations and individual consultations to help detainees understand their rights, court procedures, and available relief options.",
    href: "https://www.justice.gov/eoir/legal-orientation-program",
    icon: Scale
  }
];

// Contact Information
const contactResources = [
  {
    title: "ICE ERO Field Offices",
    description: "Contact information for ICE Enforcement and Removal Operations (ERO) field offices across the United States. Use this to reach local ICE offices for questions about detention, bonds, or removal proceedings.",
    href: "https://www.ice.gov/contact/ero",
    icon: Phone
  }
];

// Legal Resources
const legalReferenceResources = [
  {
    title: "Immigration Court Practice Manual",
    description: "The official practice manual for immigration court proceedings. This comprehensive guide explains court procedures, filing requirements, evidence rules, and hearing processes. Essential reading for anyone representing themselves or preparing for court.",
    href: "https://www.justice.gov/eoir/eoir-policy-manual/part-i-immigration-court-practice-manual",
    icon: BookOpen
  },
  {
    title: "BIA Decisions Database",
    description: "Search Board of Immigration Appeals (BIA) precedent decisions. These binding decisions establish legal standards for immigration cases nationwide and can be cited in your case to support legal arguments.",
    href: "https://www.justice.gov/eoir/board-of-immigration-appeals-decisions",
    icon: Scale
  }
];

// Detention Centers
const detentionCenters = {
  florida: [
    { name: "Krome North Service Processing Center", address: "18201 SW 12th Street, Miami, FL 33194", phone: "(305) 207-2100", hours: "8 AM - 4 PM" },
    { name: "Broward Transitional Center", address: "Pompano Beach, FL", phone: "(954) 973-4485", hours: "8 AM - 4 PM" },
    { name: "Baker County Detention Center", address: "Macclenny, FL", phone: "(904) 288-4600", hours: "8 AM - 4 PM" }
  ],
  texas: [
    { name: "El Paso Service Processing Center", address: "8915 Montana Ave, El Paso, TX 79925", phone: "(915) 225-0700 / 0717", hours: "7 AM - 11 PM" },
    { name: "South Texas ICE Processing Center", address: "566 Veteran Drive, Pearsall, TX 78061", phone: "(210) 231-4505", hours: "8 AM - 4 PM" },
    { name: "Prairieland Detention Facility", address: "Alvarado, TX", phone: "(817) 409-3995", hours: "24 hours" },
    { name: "Bluebonnet Detention Facility", address: "400 2nd Street, Anson, TX 79501", phone: "(325) 823-8031", hours: "8 AM - 5 PM" },
    { name: "Houston Processing Center", address: "15850 Export Plaza Drive, Houston, TX", phone: "(281) 449-1481", hours: "Contact facility" },
    { name: "Camp East Montana Detention Facility", address: "El Paso, TX", phone: "(915) 208-0980", hours: "24 hours" }
  ],
  louisiana: [
    { name: "Louisiana ICE Processing Center (LaSalle)", address: "830 Pine Hill Road, Jena, LA 71342", phone: "(225) 756-9400", hours: "Contact facility" },
    { name: "Central Louisiana ICE Processing Center", address: "830 Pinehill Road, Jena, LA", phone: "(318) 992-1600", hours: "Contact facility" },
    { name: "South Louisiana ICE Processing Center", address: "3843 Stagg Avenue, Basile, LA 70515", phone: "(318) 668-5900", hours: "Contact facility" },
    { name: "Pine Prairie ICE Processing Center", address: "Pine Prairie, LA", phone: "(318) 335-7500", hours: "8 AM - 4 PM" }
  ]
};

function ResourceSection({ title, resources }: { title: string; resources: { title: string; description: string; href: string; icon: React.ElementType }[] }) {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold text-slate-900 mb-6">{title}</h3>
      <div className="space-y-4">
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <Card key={resource.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-slate-900 mb-2">{resource.title}</h4>
                    <p className="text-slate-600 text-sm mb-3">{resource.description}</p>
                    <a 
                      href={resource.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm"
                    >
                      Visit Website <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default function Resources() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <SEO 
        title="Immigration Resources"
        description="Access essential immigration resources including ICE detainee locator, EOIR case status, bond payment systems, and detention facility information."
        keywords="immigration resources, ICE locator, EOIR case status, immigration tools"
        canonicalUrl="/resources"
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Important Immigration Resources
            </h1>
            <p className="text-xl text-white/80">
              Essential tools and links to help you navigate the immigration detention and court process. These official government resources provide case information, detention facility details, and legal guidance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Most Frequently Used Resources */}
      <section className="py-12 bg-white border-b">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">Most Frequently Used Resources</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {quickAccessResources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Card key={resource.title} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                    <a href={resource.href} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full">
                        {resource.buttonText} <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Educational Guides */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Educational Guides
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={resource.href}>
                    <div className="group bg-white rounded-2xl border-2 border-slate-100 p-6 h-full hover:border-primary/20 hover:shadow-lg transition-all cursor-pointer">
                      <div className={`w-14 h-14 rounded-xl ${resource.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-slate-600 mb-4">
                        {resource.description}
                      </p>
                      <div className="flex items-center text-primary font-medium">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* External Resources Sections */}
      <section className="py-16 bg-slate-50">
        <div className="container max-w-4xl">
          <ResourceSection title="Detention Information" resources={detentionResources} />
          <ResourceSection title="Case Information" resources={caseResources} />
          <ResourceSection title="Court Information" resources={courtResources} />
          <ResourceSection title="Bond Services" resources={bondResources} />
          <ResourceSection title="Compliance" resources={complianceResources} />
          <ResourceSection title="USCIS Services" resources={uscisResources} />
          <ResourceSection title="Forms & Documents" resources={formsResources} />
          <ResourceSection title="Legal Assistance" resources={legalResources} />
          <ResourceSection title="Contact Information" resources={contactResources} />
          <ResourceSection title="Legal Resources" resources={legalReferenceResources} />
        </div>
      </section>

      {/* ICE Detention Centers */}
      <section className="py-16">
        <div className="container max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4">ICE Detention Centers</h2>
          <p className="text-center text-muted-foreground mb-12">
            Contact information and visitation procedures for ICE detention facilities in Florida, Texas, and Louisiana. Always call ahead to confirm visitation hours and current restrictions.
          </p>

          <div className="space-y-8">
            {/* Florida */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" /> Florida Detention Centers
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {detentionCenters.florida.map((center) => (
                  <Card key={center.name}>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-sm mb-2">{center.name}</h4>
                      <p className="text-xs text-muted-foreground mb-1">{center.address}</p>
                      <p className="text-xs"><span className="font-medium">Phone:</span> {center.phone}</p>
                      <p className="text-xs"><span className="font-medium">Hours:</span> {center.hours}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Texas */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" /> Texas Detention Centers
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {detentionCenters.texas.map((center) => (
                  <Card key={center.name}>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-sm mb-2">{center.name}</h4>
                      <p className="text-xs text-muted-foreground mb-1">{center.address}</p>
                      <p className="text-xs"><span className="font-medium">Phone:</span> {center.phone}</p>
                      <p className="text-xs"><span className="font-medium">Hours:</span> {center.hours}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Louisiana */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" /> Louisiana Detention Centers
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {detentionCenters.louisiana.map((center) => (
                  <Card key={center.name}>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-sm mb-2">{center.name}</h4>
                      <p className="text-xs text-muted-foreground mb-1">{center.address}</p>
                      <p className="text-xs"><span className="font-medium">Phone:</span> {center.phone}</p>
                      <p className="text-xs"><span className="font-medium">Hours:</span> {center.hours}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Visitation Guidelines */}
          <Card className="mt-8 bg-amber-50 border-amber-200">
            <CardContent className="p-6">
              <h4 className="font-bold text-amber-900 mb-4">General Visitation Guidelines</h4>
              <ul className="space-y-2 text-sm text-amber-800">
                <li><strong>ID Required:</strong> All visitors must present valid government-issued photo identification</li>
                <li><strong>Advance Contact:</strong> Always call ahead to confirm visitation hours and current restrictions</li>
                <li><strong>Dress Code:</strong> Most facilities require modest, appropriate attire (no shorts, tank tops, or revealing clothing)</li>
                <li><strong>Prohibited Items:</strong> No cell phones, cameras, or recording devices typically allowed</li>
                <li><strong>Background Checks:</strong> Some facilities may require advance visitor registration</li>
                <li><strong>ICE DRIL:</strong> For general detention inquiries, call 1-888-351-4024</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-slate-50">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-8">Tips for Using These Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Have Your A-Number Ready</h4>
                <p className="text-sm text-muted-foreground">Most systems require your Alien Registration Number (A-Number). This is a 7-9 digit number that appears on immigration documents and court notices.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Check Information Regularly</h4>
                <p className="text-sm text-muted-foreground">Case statuses and hearing dates can change. Check the EOIR case status system regularly, especially in the weeks before a scheduled hearing.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Keep Records</h4>
                <p className="text-sm text-muted-foreground">Print or screenshot important information from these systems, including case status updates, hearing notices, and bond payment confirmations.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2">Understand Time Zones</h4>
                <p className="text-sm text-muted-foreground">When posting bonds or scheduling check-ins, pay attention to time zone differences. Bond posting hours are based on the detention facility's local time zone.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help Navigating These Resources?</h2>
            <p className="text-xl text-white/80 mb-8">
              These online tools can be complex and confusing. Our experienced attorneys can help you use these resources effectively, interpret the information you find, and take appropriate action based on your case status.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultation">
                <Button size="lg" variant="secondary" className="text-primary font-semibold">
                  Schedule Consultation
                </Button>
              </Link>
              <a href="tel:3055759531">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Call (305) 575-9531
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
