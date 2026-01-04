import { motion } from "framer-motion";
import { 
  Users, 
  Scale, 
  FileCheck, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Phone,
  ClipboardList,
  Home,
  Briefcase
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SponsorGuide() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
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
              <Users className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Court Sponsor Guide
            </h1>
            <p className="text-xl text-white/80">
              Understanding the responsibilities and requirements for being a court sponsor in immigration bond cases.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What is a Court Sponsor */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">What is a Court Sponsor?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A court sponsor is someone who agrees to help ensure that a person released on immigration bond attends all required court hearings and complies with the conditions of their release.
              </p>
            </motion.div>

            {/* Comparison Table */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-2xl border-2 border-primary/20 p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Scale className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Court Sponsor (Immigration Bond)</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Helps ensure the person attends all immigration court hearings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Provides a place for the person to live after release</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Demonstrates community ties to the immigration judge</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">May need to testify at bond hearing about their relationship</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Not financially responsible for the bond amount</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-2xl border-2 border-secondary/20 p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <FileCheck className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold">USCIS Sponsor (Affidavit of Support)</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Financially supports the immigrant to prevent them from becoming a public charge</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Signs a legally binding contract (Form I-864)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Must meet income requirements (125% of poverty guidelines)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Obligation continues until immigrant becomes citizen or works 40 quarters</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">Can be sued by government to reimburse public benefits</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsor Requirements */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Court Sponsor Requirements
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-sm border"
              >
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-green-800">Who Can Be a Sponsor</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>U.S. citizens or lawful permanent residents</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Family members (spouse, parent, sibling, child)</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Close friends with established relationship</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Employers or coworkers</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Community or religious organization members</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border"
              >
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-4">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-red-800">Who Cannot Be a Sponsor</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-slate-600">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Undocumented immigrants</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Individuals with pending immigration cases</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>People with serious criminal records</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Those who cannot provide stable housing</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-600">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Strangers with no established relationship</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsor Responsibilities */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Sponsor Responsibilities
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Home,
                  title: "Provide Housing",
                  description: "Offer a place for the person to live after release from detention."
                },
                {
                  icon: Phone,
                  title: "Maintain Contact",
                  description: "Stay in regular communication and know the person's whereabouts."
                },
                {
                  icon: ClipboardList,
                  title: "Ensure Compliance",
                  description: "Help ensure attendance at all court hearings and check-ins."
                },
                {
                  icon: Briefcase,
                  title: "Support Integration",
                  description: "Help the person find employment and integrate into the community."
                }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl border p-6 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect at Bond Hearing */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              What to Expect at the Bond Hearing
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              As a sponsor, you may be asked to testify at the bond hearing. Here's what to prepare for:
            </p>

            <div className="bg-white rounded-2xl border-2 border-slate-100 p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-semibold mb-1">Relationship Questions</h4>
                    <p className="text-slate-600">Be prepared to explain how you know the detained person and the length of your relationship.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-semibold mb-1">Housing Arrangements</h4>
                    <p className="text-slate-600">Describe where the person will live, including address and living conditions.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-semibold mb-1">Commitment to Compliance</h4>
                    <p className="text-slate-600">Explain how you will help ensure the person attends all court hearings.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="font-semibold mb-1">Character Testimony</h4>
                    <p className="text-slate-600">Speak to the person's character, work ethic, and ties to the community.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-amber-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-amber-900 mb-2">Important Notice</h3>
                  <p className="text-amber-800 mb-4">
                    Being a court sponsor is a serious commitment. While you are not financially responsible for the bond amount, you are making a moral commitment to help ensure the person complies with all immigration court requirements. If the person fails to appear at hearings, it can affect future bond requests and the outcome of their case.
                  </p>
                  <p className="text-amber-800">
                    Before agreeing to be a sponsor, make sure you understand the responsibilities and are confident in your ability to fulfill them.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Help as a Sponsor?</h2>
            <p className="text-xl text-white/80 mb-8">
              If you're considering being a court sponsor for someone in immigration detention, speak with our attorneys to understand the process and your responsibilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultation">
                <Button size="lg" variant="secondary" className="text-primary font-semibold">
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/bond-questionnaire">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Complete Bond Questionnaire
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
