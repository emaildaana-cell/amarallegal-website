import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ChevronUp, Scale, Users, Heart, Shield, Award, Briefcase, HelpCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  // Immigration Bonds
  {
    id: "bond-1",
    category: "Immigration Bonds",
    question: "What is an immigration bond?",
    answer: "An immigration bond is a financial guarantee that allows a detained immigrant to be released from custody while their immigration case proceeds. The bond ensures the person will attend all required immigration court hearings. If they attend all hearings, the bond money is returned; if they fail to appear, the bond is forfeited."
  },
  {
    id: "bond-2",
    category: "Immigration Bonds",
    question: "How much does an immigration bond cost?",
    answer: "Immigration bond amounts typically range from $1,500 to $25,000 or more, depending on factors such as flight risk, criminal history, and ties to the community. An immigration judge or ICE officer sets the bond amount based on individual circumstances."
  },
  {
    id: "bond-3",
    category: "Immigration Bonds",
    question: "How long does it take to get released on bond?",
    answer: "After bond is posted, release typically takes 4-8 hours but can take up to 24 hours depending on the facility. The bond must be paid in full before release can occur."
  },
  {
    id: "bond-4",
    category: "Immigration Bonds",
    question: "Who can pay an immigration bond?",
    answer: "Any U.S. citizen or legal permanent resident over 18 can pay an immigration bond. The bond can be paid directly to ICE or through a licensed immigration bond company (bondsman)."
  },
  // Detention & Removal
  {
    id: "detention-1",
    category: "Detention & Removal",
    question: "What happens if I'm detained by ICE?",
    answer: "If detained by ICE, you will be processed, fingerprinted, and held in a detention facility. You have the right to remain silent, the right to an attorney, and the right to a hearing before an immigration judge. Contact an attorney immediately."
  },
  {
    id: "detention-2",
    category: "Detention & Removal",
    question: "Can I fight my deportation?",
    answer: "Yes, there are several forms of relief from deportation including asylum, cancellation of removal, adjustment of status, voluntary departure, and others. An experienced immigration attorney can evaluate your case and identify your options."
  },
  {
    id: "detention-3",
    category: "Detention & Removal",
    question: "What is cancellation of removal?",
    answer: "Cancellation of removal is a form of relief that allows certain individuals in removal proceedings to remain in the United States. Requirements differ for lawful permanent residents and non-permanent residents, including continuous physical presence and good moral character."
  },
  {
    id: "detention-4",
    category: "Detention & Removal",
    question: "Do I have the right to an attorney in immigration court?",
    answer: "Yes, you have the right to be represented by an attorney in immigration court, but unlike criminal court, the government does not provide a free attorney. You must hire your own attorney or find pro bono representation."
  },
  // Family-Based Immigration
  {
    id: "family-1",
    category: "Family-Based Immigration",
    question: "How can I bring my spouse to the United States?",
    answer: "U.S. citizens can petition for their spouse as an immediate relative, with no waiting period. Green card holders can also petition for their spouse, but there may be a waiting period depending on visa availability."
  },
  {
    id: "family-2",
    category: "Family-Based Immigration",
    question: "Can I sponsor my parents for a green card?",
    answer: "Only U.S. citizens who are 21 years or older can sponsor their parents for a green card. Parents of U.S. citizens are considered immediate relatives and do not face visa number limitations."
  },
  {
    id: "family-3",
    category: "Family-Based Immigration",
    question: "What is the difference between immediate relatives and preference categories?",
    answer: "Immediate relatives (spouses, unmarried children under 21, and parents of U.S. citizens) have no visa number limits and can immigrate immediately. Preference categories have annual limits and may face multi-year waiting periods."
  },
  {
    id: "family-4",
    category: "Family-Based Immigration",
    question: "How long does it take to get a green card through marriage?",
    answer: "For spouses of U.S. citizens, the process typically takes 10-13 months if filing from within the U.S. For spouses of green card holders, wait times can be 2+ years due to visa backlogs."
  },
  // Asylum & Humanitarian Relief
  {
    id: "asylum-1",
    category: "Asylum & Humanitarian Relief",
    question: "What is asylum and who qualifies?",
    answer: "Asylum is protection granted to individuals who have been persecuted or fear persecution based on race, religion, nationality, political opinion, or membership in a particular social group. You must apply within one year of arriving in the U.S."
  },
  {
    id: "asylum-2",
    category: "Asylum & Humanitarian Relief",
    question: "What is the difference between asylum and refugee status?",
    answer: "Both provide protection from persecution, but refugees apply from outside the U.S. while asylum seekers apply from within the U.S. or at a port of entry. The substantive requirements are similar."
  },
  {
    id: "asylum-3",
    category: "Asylum & Humanitarian Relief",
    question: "What is a U visa and who qualifies?",
    answer: "U visas are for victims of certain crimes who have suffered mental or physical abuse and are helpful to law enforcement in the investigation or prosecution of criminal activity."
  },
  {
    id: "asylum-4",
    category: "Asylum & Humanitarian Relief",
    question: "What is VAWA and how does it help abuse victims?",
    answer: "The Violence Against Women Act (VAWA) allows victims of domestic violence to self-petition for immigration status without relying on their abuser. Both men and women can qualify."
  },
  {
    id: "asylum-5",
    category: "Asylum & Humanitarian Relief",
    question: "What is Temporary Protected Status (TPS)?",
    answer: "TPS is a temporary immigration status granted to nationals of designated countries experiencing armed conflict, environmental disaster, or other extraordinary conditions. TPS provides work authorization and protection from deportation."
  },
  // Citizenship & Naturalization
  {
    id: "citizenship-1",
    category: "Citizenship & Naturalization",
    question: "When can I apply for U.S. citizenship?",
    answer: "Generally, you can apply for citizenship after 5 years as a green card holder (3 years if married to a U.S. citizen). You must meet continuous residence, physical presence, and good moral character requirements."
  },
  {
    id: "citizenship-2",
    category: "Citizenship & Naturalization",
    question: "What is the naturalization process?",
    answer: "The naturalization process includes filing Form N-400, biometrics appointment, interview with USCIS officer, English and civics tests, and the oath ceremony where you become a citizen."
  },
  {
    id: "citizenship-3",
    category: "Citizenship & Naturalization",
    question: "Can I lose my green card?",
    answer: "Yes, you can lose your green card by abandoning your residence, committing certain crimes, or through fraud. Extended absences from the U.S. can also jeopardize your status."
  },
  {
    id: "citizenship-4",
    category: "Citizenship & Naturalization",
    question: "Do I need to speak English to become a U.S. citizen?",
    answer: "Generally yes, but exemptions exist for applicants over 50 who have been green card holders for 20+ years, or over 55 with 15+ years as a green card holder. Medical exemptions are also available."
  },
  // Employment-Based Immigration
  {
    id: "employment-1",
    category: "Employment-Based Immigration",
    question: "Can I get a green card through my employer?",
    answer: "Yes, employers can sponsor employees for green cards through the employment-based immigration system. The process typically involves labor certification (PERM), I-140 petition, and adjustment of status or consular processing."
  },
  {
    id: "employment-2",
    category: "Employment-Based Immigration",
    question: "What is PERM labor certification?",
    answer: "PERM is the process by which the Department of Labor certifies that there are no qualified U.S. workers available for a position, allowing an employer to sponsor a foreign worker for a green card."
  },
  {
    id: "employment-3",
    category: "Employment-Based Immigration",
    question: "What is an H-1B visa?",
    answer: "The H-1B is a temporary work visa for specialty occupations requiring at least a bachelor's degree. It allows employers to hire foreign workers for up to 6 years and can be a pathway to a green card."
  },
  // General Immigration
  {
    id: "general-1",
    category: "General Immigration",
    question: "What is the difference between a visa and a green card?",
    answer: "A visa is temporary permission to enter the U.S. for a specific purpose (tourism, work, study). A green card grants permanent resident status, allowing you to live and work in the U.S. indefinitely."
  },
  {
    id: "general-2",
    category: "General Immigration",
    question: "Can I work in the U.S. while my green card application is pending?",
    answer: "If you've filed for adjustment of status, you can apply for an Employment Authorization Document (EAD) that allows you to work while your green card is pending."
  },
  {
    id: "general-3",
    category: "General Immigration",
    question: "What should I do if my visa or green card application is denied?",
    answer: "Options depend on the reason for denial and may include filing a motion to reopen or reconsider, appealing to the Administrative Appeals Office, or filing a new application addressing the issues."
  },
  {
    id: "general-4",
    category: "General Immigration",
    question: "How long does the immigration process take?",
    answer: "Processing times vary widely depending on the type of application, your country of origin, and current backlogs. Family-based cases can take months to years; employment-based cases can take 1-10+ years."
  }
];

const categories = [
  { id: "all", label: "All", icon: HelpCircle },
  { id: "Immigration Bonds", label: "Immigration Bonds", icon: Scale },
  { id: "Detention & Removal", label: "Detention & Removal", icon: Shield },
  { id: "Family-Based Immigration", label: "Family-Based Immigration", icon: Users },
  { id: "Asylum & Humanitarian Relief", label: "Asylum & Humanitarian Relief", icon: Heart },
  { id: "Citizenship & Naturalization", label: "Citizenship & Naturalization", icon: Award },
  { id: "Employment-Based Immigration", label: "Employment-Based Immigration", icon: Briefcase },
  { id: "General Immigration", label: "General Immigration", icon: HelpCircle }
];

export default function FAQ() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const filteredFAQs = useMemo(() => {
    return faqData.filter((faq) => {
      const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
      const matchesSearch = searchQuery === "" || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <SEO 
        title="Frequently Asked Questions"
        description="Find answers to common immigration questions about bonds, asylum, deportation defense, and more. Expert guidance from Amaral Law attorneys."
        keywords="immigration FAQ, immigration questions, bond FAQ, asylum questions"
        canonicalUrl="/faq"
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
              <HelpCircle className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/80">
              Find answers to common immigration questions. Use the search bar or browse by category.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container">
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg rounded-full border-2 focus:border-primary"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="rounded-full"
                >
                  <Icon className="w-4 h-4 mr-1" />
                  {category.label}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12">
        <div className="container max-w-4xl">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No questions found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or category filter.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-xl border-2 border-slate-100 hover:border-primary/20 transition-colors overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-6 text-left flex items-start justify-between gap-4"
                  >
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-2">
                        {faq.category}
                      </span>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 mt-1">
                      {expandedItems.has(faq.id) ? (
                        <ChevronUp className="w-5 h-5 text-primary" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>
                  <AnimatePresence>
                    {expandedItems.has(faq.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0">
                          <div className="h-px bg-slate-100 mb-4" />
                          <p className="text-slate-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-xl text-white/80 mb-8">
              Our experienced immigration attorneys are here to help. Schedule a consultation to discuss your specific situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultation">
                <Button size="lg" variant="secondary" className="text-primary font-semibold">
                  Schedule Consultation
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
