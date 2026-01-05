import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { 
  FileText, 
  User, 
  Users, 
  Home, 
  Briefcase, 
  Heart, 
  Shield, 
  Scale,
  Download,
  CheckCircle,
  AlertTriangle,
  Info,
  FileCheck,
  Camera,
  Award,
  Building,
  CreditCard,
  Globe,
  PenTool,
  ChevronRight,
  Languages
} from "lucide-react";
import { useState } from "react";

interface DocumentItem {
  name: string;
  description: string;
  purpose: string;
  icon: React.ReactNode;
  createOnlineLink?: string;
  guideLink?: string;
  important?: boolean;
  requiresTranslation?: boolean;
}

interface DocumentCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  documents: DocumentItem[];
}

export default function BondDocumentChecklist() {
  const { t } = useLanguage();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "identity", "sponsor", "ties", "character", "legal"
  ]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const documentCategories: DocumentCategory[] = [
    {
      title: "Identity & Personal Documents",
      description: "Documents that establish who you are and your personal history",
      icon: <User className="h-6 w-6" />,
      color: "blue",
      documents: [
        {
          name: "Birth Certificate",
          description: "Official document showing your name, date of birth, and place of birth.",
          purpose: "Establishes your identity, age, and nationality. This is a foundational document for your case.",
          icon: <FileText className="h-5 w-5" />,
          requiresTranslation: true
        },
        {
          name: "Passport or National ID",
          description: "Government-issued identification from your home country.",
          purpose: "Provides official proof of your identity and citizenship. If expired, it can still be useful.",
          icon: <Globe className="h-5 w-5" />,
          requiresTranslation: true
        },
        {
          name: "U.S. Visa or Entry Documents",
          description: "Any visa stamps, I-94 arrival records, or entry permits.",
          purpose: "Shows how and when you entered the United States, which is important for establishing your immigration history.",
          icon: <FileCheck className="h-5 w-5" />
        },
        {
          name: "Marriage Certificate",
          description: "Official document proving your marriage.",
          purpose: "Establishes family ties in the U.S. if your spouse is a citizen or resident. Shows stability and roots.",
          icon: <Heart className="h-5 w-5" />,
          requiresTranslation: true
        },
        {
          name: "Children's Birth Certificates",
          description: "Birth certificates for any children, especially U.S.-born children.",
          purpose: "U.S. citizen children are strong evidence of ties to the country and potential hardship if you're not released.",
          icon: <Users className="h-5 w-5" />,
          important: true,
          requiresTranslation: true
        }
      ]
    },
    {
      title: "Sponsor Documents",
      description: "Your sponsor promises to support you and ensure you attend court dates",
      icon: <Shield className="h-6 w-6" />,
      color: "green",
      documents: [
        {
          name: "Sponsor's Letter of Support",
          description: "A detailed letter from your sponsor explaining their relationship to you and their commitment to support you.",
          purpose: "This is one of the most important documents. The sponsor must promise to provide housing, financial support, and ensure you attend all court hearings.",
          icon: <PenTool className="h-5 w-5" />,
          createOnlineLink: "/sponsor-letter-generator",
          guideLink: "/sponsor-guide",
          important: true
        },
        {
          name: "Sponsor's Proof of Legal Status",
          description: "Copy of sponsor's U.S. passport, birth certificate, or green card.",
          purpose: "Shows the judge that your sponsor has legal status in the U.S. and can reliably support you.",
          icon: <CreditCard className="h-5 w-5" />,
          guideLink: "/sponsor-guide",
          important: true
        },
        {
          name: "Sponsor's Proof of Address",
          description: "Recent utility bill, lease agreement, or mortgage statement in the sponsor's name.",
          purpose: "Confirms where you will live if released. The address must match what's stated in the letter of support.",
          icon: <Home className="h-5 w-5" />,
          guideLink: "/sponsor-guide"
        },
        {
          name: "Sponsor's Proof of Income",
          description: "Recent pay stubs (last 3-6 months), tax returns, or employer letter.",
          purpose: "Demonstrates that your sponsor has the financial means to support you while your case is pending.",
          icon: <Briefcase className="h-5 w-5" />,
          guideLink: "/sponsor-guide"
        },
        {
          name: "Sponsor's Photo ID",
          description: "Copy of driver's license or government-issued photo ID.",
          purpose: "Verifies the sponsor's identity and adds credibility to their letter of support.",
          icon: <User className="h-5 w-5" />,
          guideLink: "/sponsor-guide"
        }
      ]
    },
    {
      title: "Ties to the United States",
      description: "Evidence showing you have strong connections to the U.S. and are not a flight risk",
      icon: <Home className="h-6 w-6" />,
      color: "purple",
      documents: [
        {
          name: "Letters of Support from Family & Friends",
          description: "Personal letters from people who know you well, describing your character and their support for you.",
          purpose: "These letters humanize you to the judge and show you have a community that cares about you. Each letter writer MUST include a copy of their photo ID.",
          icon: <Heart className="h-5 w-5" />,
          createOnlineLink: "/character-reference-letter",
          important: true
        },
        {
          name: "Proof of Residence",
          description: "Lease agreements, rent receipts, utility bills, or mortgage documents.",
          purpose: "Shows you have a stable, fixed address in the U.S. This is one of the key factors judges consider.",
          icon: <Home className="h-5 w-5" />
        },
        {
          name: "Employment Records",
          description: "Pay stubs, W-2 forms, tax returns, or a letter from your employer.",
          purpose: "Demonstrates you are a productive member of society with stable employment and income.",
          icon: <Briefcase className="h-5 w-5" />
        },
        {
          name: "Tax Returns",
          description: "Federal and state tax returns from previous years.",
          purpose: "Shows you have been paying taxes and contributing to the U.S. economy. Very persuasive evidence.",
          icon: <FileText className="h-5 w-5" />
        },
        {
          name: "Family Photographs",
          description: "Photos from holidays, birthdays, family events, and everyday life.",
          purpose: "Visual evidence of your family bonds and life in the U.S. Helps the judge see you as a person, not just a case number.",
          icon: <Camera className="h-5 w-5" />
        },
        {
          name: "Children's School Records",
          description: "Report cards, enrollment letters, or school photos.",
          purpose: "Shows your children are established in U.S. schools and your family has deep roots in the community.",
          icon: <Building className="h-5 w-5" />
        },
        {
          name: "Community Organization Letters",
          description: "Letters from churches, volunteer organizations, or community groups.",
          purpose: "Demonstrates you are an active, contributing member of your community.",
          icon: <Users className="h-5 w-5" />
        }
      ]
    },
    {
      title: "Good Character & Rehabilitation",
      description: "Documents showing you are a person of good moral character",
      icon: <Award className="h-6 w-6" />,
      color: "amber",
      documents: [
        {
          name: "Character Reference Letters",
          description: "Letters from employers, teachers, religious leaders, or community members attesting to your good character.",
          purpose: "Personal testimonials about your integrity, work ethic, and positive contributions to society.",
          icon: <PenTool className="h-5 w-5" />,
          createOnlineLink: "/character-reference-letter",
          important: true
        },
        {
          name: "Certificates & Awards",
          description: "Any certificates, diplomas, or awards you've received.",
          purpose: "Shows your achievements and positive contributions. Can include educational certificates, workplace awards, or volunteer recognition.",
          icon: <Award className="h-5 w-5" />,
          requiresTranslation: true
        },
        {
          name: "Rehabilitation Program Certificates",
          description: "Completion certificates from AA/NA, anger management, counseling, or other programs.",
          purpose: "If you have any criminal history, these show you've taken responsibility and made positive changes. Very important for addressing negative factors.",
          icon: <CheckCircle className="h-5 w-5" />,
          important: true
        },
        {
          name: "Letters from Counselors/Therapists",
          description: "Professional letters describing your progress in treatment or counseling.",
          purpose: "Expert testimony about your rehabilitation and reduced risk to the community.",
          icon: <Heart className="h-5 w-5" />
        },
        {
          name: "Police Clearance Records",
          description: "Documents from police departments showing no criminal record.",
          purpose: "Demonstrates you have no criminal history in the jurisdictions where you've lived.",
          icon: <Shield className="h-5 w-5" />,
          requiresTranslation: true
        }
      ]
    },
    {
      title: "Legal & Procedural Documents",
      description: "Formal legal documents required for your bond motion",
      icon: <Scale className="h-6 w-6" />,
      color: "slate",
      documents: [
        {
          name: "Motion for Bond Redetermination",
          description: "The formal written request to the Immigration Judge for a bond hearing.",
          purpose: "This is the official legal document that starts the bond process. Your attorney will prepare this.",
          icon: <FileText className="h-5 w-5" />
        },
        {
          name: "EOIR-28 (Notice of Appearance)",
          description: "Form filed by your attorney to officially appear on your case.",
          purpose: "Required if you have an attorney representing you in immigration court.",
          icon: <FileCheck className="h-5 w-5" />
        },
        {
          name: "G-28 (Notice of Appearance)",
          description: "Form filed with DHS to notify them of your legal representation.",
          purpose: "Ensures DHS knows you have an attorney and sends copies of documents to them.",
          icon: <FileCheck className="h-5 w-5" />
        },
        {
          name: "Client's Affidavit/Declaration",
          description: "A sworn statement from you addressing key bond factors.",
          purpose: "Your own words explaining your situation, ties to the U.S., and promise to attend all court hearings.",
          icon: <PenTool className="h-5 w-5" />
        },
        {
          name: "Proof of Eligibility for Relief",
          description: "Evidence supporting any pending immigration applications (asylum, cancellation of removal, etc.).",
          purpose: "Shows you have a strong incentive to appear for court because you're pursuing legal status.",
          icon: <Scale className="h-5 w-5" />
        }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; light: string }> = {
      blue: { bg: "bg-blue-500", border: "border-blue-200", text: "text-blue-600", light: "bg-blue-50" },
      green: { bg: "bg-green-500", border: "border-green-200", text: "text-green-600", light: "bg-green-50" },
      purple: { bg: "bg-purple-500", border: "border-purple-200", text: "text-purple-600", light: "bg-purple-50" },
      amber: { bg: "bg-amber-500", border: "border-amber-200", text: "text-amber-600", light: "bg-amber-50" },
      slate: { bg: "bg-slate-500", border: "border-slate-200", text: "text-slate-600", light: "bg-slate-50" }
    };
    return colors[color] || colors.blue;
  };

  return (
    <>
      <Helmet>
        <title>Bond Document Checklist | Amaral Law</title>
        <meta name="description" content="Complete checklist of documents needed for immigration bond hearings. Prepare your case with our comprehensive document guide." />
        <meta name="keywords" content="bond documents, immigration bond checklist, bond hearing documents" />
        <link rel="canonical" href="https://amarallegal.com/bond-document-checklist" />
        <meta property="og:title" content="Bond Document Checklist | Amaral Law" />
        <meta property="og:description" content="Complete checklist of documents needed for immigration bond hearings. Prepare your case with our comprehensive document guide." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Bond Document Checklist
            </h1>
            <p className="text-xl text-white/90 mb-4">
              A comprehensive guide to the documents you need for your immigration bond hearing
            </p>
            <p className="text-white/80">
              Gathering the right documents is crucial for a successful bond hearing. This checklist explains what each document is, why it matters, and how to obtain it.
            </p>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-8 bg-amber-50 border-b border-amber-200">
        <div className="container">
          <div className="flex items-start gap-4 max-w-4xl mx-auto">
            <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-bold text-amber-800 mb-1">Important Reminders</h2>
              <ul className="text-amber-700 space-y-1 text-sm">
                <li>• <strong>Translations:</strong> All documents not in English must include a certified translation.</li>
                <li>• <strong>Photo ID Required:</strong> Every person who writes a letter of support must include a copy of their photo ID.</li>
                <li>• <strong>Consult Your Attorney:</strong> This is a general guide. Your attorney will advise which documents are most important for your specific case.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 bg-white border-b">
        <div className="container">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/character-reference-letter">
              <Button variant="outline" className="gap-2">
                <PenTool className="h-4 w-4" />
                Create Character Letter Online
              </Button>
            </Link>
            <Link href="/sponsor-guide">
              <Button variant="outline" className="gap-2">
                <Users className="h-4 w-4" />
                Sponsor Requirements Guide
              </Button>
            </Link>
            <Link href="/downloads">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download Sample Documents
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Document Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {documentCategories.map((category, categoryIndex) => {
              const colors = getColorClasses(category.color);
              const categoryKey = ["identity", "sponsor", "ties", "character", "legal"][categoryIndex];
              const isExpanded = expandedCategories.includes(categoryKey);

              return (
                <Card key={categoryIndex} className={`overflow-hidden ${colors.border} border-2`}>
                  <CardHeader 
                    className={`${colors.light} cursor-pointer`}
                    onClick={() => toggleCategory(categoryKey)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 ${colors.bg} text-white rounded-lg`}>
                          {category.icon}
                        </div>
                        <div>
                          <CardTitle className="text-xl">{category.title}</CardTitle>
                          <p className="text-gray-600 text-sm mt-1">{category.description}</p>
                        </div>
                      </div>
                      <ChevronRight className={`h-6 w-6 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </div>
                  </CardHeader>
                  
                  {isExpanded && (
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {category.documents.map((doc, docIndex) => (
                          <div key={docIndex} className={`p-6 ${doc.important ? 'bg-yellow-50/50' : ''}`}>
                            <div className="flex items-start gap-4">
                              <div className={`p-2 ${colors.light} rounded-lg flex-shrink-0`}>
                                <div className={colors.text}>{doc.icon}</div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-bold text-gray-900">{doc.name}</h3>
                                  {doc.important && (
                                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                                      Important
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-600 mb-3">{doc.description}</p>
                                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                  <div className="flex items-start gap-2">
                                    <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-gray-700">
                                      <strong>Why it matters:</strong> {doc.purpose}
                                    </p>
                                  </div>
                                </div>
                                
                                {/* Translation Warning */}
                                {doc.requiresTranslation && (
                                  <div className="flex items-center gap-2 mb-4 p-2 bg-red-50 border border-red-200 rounded-lg">
                                    <Languages className="h-4 w-4 text-red-600 flex-shrink-0" />
                                    <p className="text-sm text-red-700 font-medium">
                                      This document must be translated to English by a certified translator
                                    </p>
                                  </div>
                                )}
                                
                                {/* Action Links */}
                                <div className="flex flex-wrap gap-2">
                                  {doc.createOnlineLink && (
                                    <Link href={doc.createOnlineLink}>
                                      <Button size="sm" variant="default" className="gap-1">
                                        <PenTool className="h-3 w-3" />
                                        Create Online
                                      </Button>
                                    </Link>
                                  )}
                                  {doc.guideLink && (
                                    <Link href={doc.guideLink}>
                                      <Button size="sm" variant="outline" className="gap-1">
                                        <Info className="h-3 w-3" />
                                        View Requirements
                                      </Button>
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Matter of Guerra Factors */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              The <em>Matter of Guerra</em> Factors
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Immigration Judges consider these nine factors when deciding whether to grant bond. Understanding them helps you gather the most effective evidence.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { factor: "Fixed Address", desc: "Do you have a stable place to live?" },
                { factor: "Length of Residence", desc: "How long have you lived in the U.S.?" },
                { factor: "Family Ties", desc: "Do you have family in the U.S.?" },
                { factor: "Employment History", desc: "Do you have stable employment?" },
                { factor: "Record of Appearance", desc: "Have you attended past court dates?" },
                { factor: "Criminal Record", desc: "What is your criminal history?" },
                { factor: "Immigration Violations", desc: "Have you violated immigration laws?" },
                { factor: "Attempts to Flee", desc: "Have you ever tried to evade authorities?" },
                { factor: "Manner of Entry", desc: "How did you enter the U.S.?" }
              ].map((item, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-sm">
                      {index + 1}
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{item.factor}</h3>
                    <p className="text-gray-600 text-xs">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Need Help Preparing Your Bond Documents?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Our experienced immigration attorneys can help you gather and organize the most effective evidence for your bond hearing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/appointments">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Schedule Consultation
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="tel:1-844-423-3733">
                <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary">
                  Call 1-844-423-3733
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-gray-100">
        <div className="container">
          <p className="text-sm text-gray-500 text-center max-w-3xl mx-auto">
            <strong>Disclaimer:</strong> This checklist is for informational purposes only and does not constitute legal advice. 
            The requirements for a bond motion can vary depending on your specific case and jurisdiction. 
            Always consult with a qualified immigration attorney for assistance with your bond proceedings.
          </p>
        </div>
      </section>
    </>
  );
}
