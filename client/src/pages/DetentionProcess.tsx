import { motion } from "framer-motion";
import { 
  AlertTriangle, 
  Phone, 
  FileText, 
  Building, 
  Scale, 
  Gavel, 
  Clock, 
  CheckCircle2,
  XCircle,
  Users,
  ExternalLink,
  AlertCircle
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";

interface ProcessStep {
  number: number;
  title: string;
  timing: string;
  description: string;
  details: string[];
  icon: React.ElementType;
  highlight?: {
    type: "warning" | "info" | "success" | "danger";
    title: string;
    items: string[];
  };
  cta?: {
    text: string;
    href: string;
    external?: boolean;
  };
}

const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "Arrest by ICE",
    timing: "Day 1 - Initial Contact",
    description: "ICE officers may arrest individuals at their home, workplace, during routine check-ins, or after release from local law enforcement custody. Officers must identify themselves and present proper credentials.",
    details: [],
    icon: AlertTriangle,
    highlight: {
      type: "warning",
      title: "Your Rights During Arrest:",
      items: [
        "Right to remain silent (except for providing your name)",
        "Right to refuse to sign any documents without an attorney",
        "Right to contact your consulate if you are not a U.S. citizen",
        "Right to make a phone call to notify family or attorney"
      ]
    }
  },
  {
    number: 2,
    title: "Initial Processing",
    timing: "Day 1-2 - Documentation and Fingerprinting",
    description: "After arrest, you will be taken to a local ICE office or processing center for initial intake. This includes:",
    details: [
      "Fingerprinting and photographing",
      "Background checks and criminal history review",
      "Medical screening for communicable diseases",
      "Assignment of an Alien Registration Number (A-Number)",
      "Completion of biographical information forms"
    ],
    icon: FileText,
    highlight: {
      type: "danger",
      title: "Important:",
      items: [
        "Do not sign any documents, especially voluntary departure forms, without speaking to an attorney first. Signing certain documents can waive your right to see an immigration judge."
      ]
    }
  },
  {
    number: 3,
    title: "Custody Determination",
    timing: "Day 2-3 - Bond Eligibility Review",
    description: "ICE will make a custody determination to decide whether you will be held in detention or released. This decision considers:",
    details: [
      "Whether you are subject to mandatory detention",
      "Your criminal history and immigration violations",
      "Flight risk assessment and community ties",
      "Danger to the community evaluation"
    ],
    icon: Scale,
    highlight: {
      type: "info",
      title: "Bond Eligibility Comparison",
      items: []
    }
  },
  {
    number: 4,
    title: "Transfer to Detention Facility",
    timing: "Day 3-7 - Facility Assignment",
    description: "If you are not released, you will be transferred to an ICE detention facility. Facilities can be:",
    details: [
      "ICE Processing Centers (dedicated immigration facilities)",
      "Contract Detention Facilities (privately operated)",
      "County jails with ICE contracts"
    ],
    icon: Building,
    cta: {
      text: "Use ICE Detainee Locator",
      href: "https://locator.ice.gov/odls/#/index",
      external: true
    }
  },
  {
    number: 5,
    title: "Notice to Appear (NTA)",
    timing: "Within 10 Days - Formal Charges",
    description: "You will receive a Notice to Appear (NTA), which is the formal charging document that begins removal proceedings. The NTA includes:",
    details: [
      "Allegations of immigration law violations",
      "Charges of removability (deportability)",
      "Date, time, and location of your first hearing",
      "Your rights in immigration court"
    ],
    icon: FileText,
    highlight: {
      type: "warning",
      title: "Critical:",
      items: [
        "Keep all copies of the NTA and any other documents you receive. These are essential for your attorney to build your defense."
      ]
    }
  },
  {
    number: 6,
    title: "Master Calendar Hearing",
    timing: "2-4 Weeks - First Court Appearance",
    description: "Your first hearing before an immigration judge is called a Master Calendar Hearing. This is a brief procedural hearing where:",
    details: [
      "The judge reviews the charges against you",
      "You admit or deny the allegations",
      "You indicate what relief from removal you may seek",
      "The judge schedules future hearings",
      "Bond hearings may be requested"
    ],
    icon: Gavel
  },
  {
    number: 7,
    title: "Bond Hearing (If Eligible)",
    timing: "Varies - Request for Release",
    description: "If ICE did not set a bond or if you believe the bond amount is too high, you can request a bond hearing before an immigration judge. The judge will consider:",
    details: [
      "Whether you are a flight risk",
      "Whether you pose a danger to the community",
      "Your ties to the United States (family, employment, property)",
      "Your immigration and criminal history"
    ],
    icon: Scale,
    cta: {
      text: "Learn More About Immigration Bonds",
      href: "/services/bond-hearings"
    }
  },
  {
    number: 8,
    title: "Individual (Merits) Hearing",
    timing: "Months to Years - Full Trial",
    description: "The individual hearing is your full trial before the immigration judge. This is where you present your case for relief from removal, such as:",
    details: [
      "Cancellation of removal",
      "Asylum or withholding of removal",
      "Adjustment of status",
      "Voluntary departure"
    ],
    icon: Clock,
    cta: {
      text: "Explore Forms of Relief from Removal",
      href: "/services/removal-defense"
    }
  },
  {
    number: 9,
    title: "Judge's Decision and Appeals",
    timing: "Final Outcome",
    description: "After the individual hearing, the judge will issue a decision to either:",
    details: [
      "Grant relief and terminate removal proceedings",
      "Order removal (deportation) from the United States"
    ],
    icon: Gavel,
    highlight: {
      type: "info",
      title: "Note:",
      items: [
        "If the judge orders removal, you have 30 days to appeal to the Board of Immigration Appeals (BIA). The government can also appeal if you win. During the appeal, you may remain in detention or be released on bond depending on your circumstances."
      ]
    }
  }
];

export default function DetentionProcess() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <SEO 
        title="ICE Detention Process"
        description="Understand the ICE detention process step-by-step. Learn what happens after arrest, bond hearings, and how to secure release from immigration detention."
        keywords="ICE detention process, immigration arrest, bond hearing process, detention timeline"
        canonicalUrl="/detention-process"
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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Understanding the ICE Detention Process
            </h1>
            <p className="text-xl text-white/80">
              A comprehensive guide to what happens when someone is detained by Immigration and Customs Enforcement (ICE), from arrest through release or removal proceedings.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Time Critical Alert */}
      <section className="py-8">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl mx-auto bg-red-50 border-2 border-red-200 rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-red-800 mb-2">Time is Critical</h2>
                <p className="text-red-700 mb-4">
                  If someone you know has been detained by ICE, immediate action is essential. The first 48-72 hours are crucial for securing legal representation and understanding options for release. Do not wait to seek help.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/consultation">
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      Schedule Emergency Consultation
                    </Button>
                  </Link>
                  <a href="tel:+18444233733">
                    <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                      <Phone className="w-4 h-4 mr-2" />
                      Call 1-844-423-3733
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              The Detention Process: Step by Step
            </h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20 hidden md:block" />

              {/* Steps */}
              <div className="space-y-8">
                {processSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative"
                    >
                      {/* Step number circle */}
                      <div className="hidden md:flex absolute left-0 w-16 h-16 rounded-full bg-primary text-white items-center justify-center text-2xl font-bold shadow-lg z-10">
                        {step.number}
                      </div>

                      {/* Content card */}
                      <div className="md:ml-24 bg-white rounded-2xl border-2 border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6">
                          {/* Mobile step number */}
                          <div className="flex md:hidden items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold">
                              {step.number}
                            </div>
                            <span className="text-sm text-muted-foreground">{step.timing}</span>
                          </div>

                          <div className="flex items-start gap-4">
                            <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 items-center justify-center">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="hidden md:block text-sm text-muted-foreground mb-1">
                                {step.timing}
                              </div>
                              <h3 className="text-xl font-bold text-slate-900 mb-2">
                                {step.title}
                              </h3>
                              <p className="text-slate-600 mb-4">
                                {step.description}
                              </p>

                              {step.details.length > 0 && (
                                <ul className="space-y-2 mb-4">
                                  {step.details.map((detail, i) => (
                                    <li key={i} className="flex items-start gap-2 text-slate-600">
                                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                      <span>{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}

                              {/* Bond Eligibility Comparison for Step 3 */}
                              {step.number === 3 && (
                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                    <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                                      <CheckCircle2 className="w-5 h-5" />
                                      May Be Eligible for Bond
                                    </h4>
                                    <ul className="space-y-1 text-sm text-green-700">
                                      <li>• No serious criminal convictions</li>
                                      <li>• Strong community ties</li>
                                      <li>• No prior immigration violations</li>
                                      <li>• Not subject to mandatory detention</li>
                                    </ul>
                                  </div>
                                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                    <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                                      <XCircle className="w-5 h-5" />
                                      Mandatory Detention (No Bond)
                                    </h4>
                                    <ul className="space-y-1 text-sm text-red-700">
                                      <li>• Certain criminal convictions</li>
                                      <li>• Aggravated felonies</li>
                                      <li>• Crimes of moral turpitude</li>
                                      <li>• National security concerns</li>
                                    </ul>
                                  </div>
                                </div>
                              )}

                              {step.highlight && step.number !== 3 && (
                                <div className={`rounded-xl p-4 mb-4 ${
                                  step.highlight.type === "warning" ? "bg-amber-50 border border-amber-200" :
                                  step.highlight.type === "danger" ? "bg-red-50 border border-red-200" :
                                  step.highlight.type === "success" ? "bg-green-50 border border-green-200" :
                                  "bg-blue-50 border border-blue-200"
                                }`}>
                                  <h4 className={`font-semibold mb-2 ${
                                    step.highlight.type === "warning" ? "text-amber-800" :
                                    step.highlight.type === "danger" ? "text-red-800" :
                                    step.highlight.type === "success" ? "text-green-800" :
                                    "text-blue-800"
                                  }`}>
                                    {step.highlight.title}
                                  </h4>
                                  <ul className={`space-y-1 text-sm ${
                                    step.highlight.type === "warning" ? "text-amber-700" :
                                    step.highlight.type === "danger" ? "text-red-700" :
                                    step.highlight.type === "success" ? "text-green-700" :
                                    "text-blue-700"
                                  }`}>
                                    {step.highlight.items.map((item, i) => (
                                      <li key={i}>• {item}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {step.cta && (
                                step.cta.external ? (
                                  <a href={step.cta.href} target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" className="gap-2">
                                      {step.cta.text}
                                      <ExternalLink className="w-4 h-4" />
                                    </Button>
                                  </a>
                                ) : (
                                  <Link href={step.cta.href}>
                                    <Button variant="outline">
                                      {step.cta.text}
                                    </Button>
                                  </Link>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Families Can Do */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              What Families Can Do
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-sm border"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <AlertCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Immediate Steps</h3>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">1</span>
                    <span className="text-slate-600">Get the detainee's A-Number (Alien Registration Number) if possible</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">2</span>
                    <span className="text-slate-600">Use the ICE Detainee Locator to find their location</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">3</span>
                    <span className="text-slate-600">Contact an experienced immigration attorney immediately</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">4</span>
                    <span className="text-slate-600">Gather important documents (birth certificates, marriage certificates, etc.)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">5</span>
                    <span className="text-slate-600">Begin preparing for bond if eligible</span>
                  </li>
                </ol>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Ongoing Support</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Maintain regular communication through phone calls and visits</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Send money to the detainee's commissary account</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Attend all court hearings to show family support</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Collect evidence and documents for the case</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Stay in close contact with the attorney</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Don't Navigate This Process Alone</h2>
            <p className="text-xl text-white/80 mb-8">
              The immigration detention and removal process is complex and moves quickly. Having an experienced attorney from the very beginning can make the difference between release and prolonged detention, between winning your case and being deported.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultation">
                <Button size="lg" variant="secondary" className="text-primary font-semibold">
                  Schedule Consultation
                </Button>
              </Link>
              <a href="tel:+18444233733">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Phone className="w-5 h-5 mr-2" />
                  Call 1-844-423-3733
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
