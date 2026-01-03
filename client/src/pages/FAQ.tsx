import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function FAQ() {
  const faqs = [
    {
      category: "Immigration Bonds",
      questions: [
        {
          q: "What is an immigration bond?",
          a: "An immigration bond is a financial guarantee that allows a detained individual to be released while their immigration case is pending. It ensures they will attend all required court hearings.",
        },
        {
          q: "How much does an immigration bond cost?",
          a: "Immigration bond amounts vary widely, typically ranging from $1,500 to $25,000 or more, depending on factors like flight risk, criminal history, and ties to the community.",
        },
        {
          q: "How long does it take to get released on bond?",
          a: "Once a bond is posted, release typically occurs within 24-48 hours, though it can vary depending on the detention facility and their processing times.",
        },
        {
          q: "Who can pay an immigration bond?",
          a: "Any person who is a U.S. citizen or lawful permanent resident can pay an immigration bond. The person must provide valid identification and the full bond amount.",
        },
      ],
    },
    {
      category: "Detention & Removal",
      questions: [
        {
          q: "What happens if I'm detained by ICE?",
          a: "If detained by ICE, you will be taken to a detention facility and placed in removal proceedings. You have the right to an attorney (at your own expense) and may be eligible for bond or other forms of relief.",
        },
        {
          q: "Can I fight my deportation?",
          a: "Yes, there are several forms of relief available to fight deportation, including asylum, cancellation of removal, adjustment of status, and waivers. An experienced attorney can evaluate your case.",
        },
        {
          q: "What is cancellation of removal?",
          a: "Cancellation of removal is a form of relief that allows certain long-term residents to avoid deportation if they meet specific requirements, including continuous presence in the U.S. and good moral character.",
        },
        {
          q: "Do I have the right to an attorney in immigration court?",
          a: "Yes, you have the right to be represented by an attorney in immigration court, but the government is not required to provide one for you. You must hire your own attorney.",
        },
      ],
    },
    {
      category: "Family-Based Immigration",
      questions: [
        {
          q: "How can I bring my spouse to the United States?",
          a: "U.S. citizens and lawful permanent residents can petition for their spouses through Form I-130. Citizens' spouses are considered immediate relatives with no waiting period for visa availability.",
        },
        {
          q: "Can I sponsor my parents for a green card?",
          a: "Yes, U.S. citizens who are at least 21 years old can petition for their parents to receive green cards. Parents are considered immediate relatives with no visa waiting period.",
        },
        {
          q: "What is the difference between immediate relatives and preference categories?",
          a: "Immediate relatives (spouses, unmarried children under 21, and parents of U.S. citizens) have no visa waiting period. Preference categories have annual limits and waiting periods that can be several years.",
        },
        {
          q: "How long does it take to get a green card through marriage?",
          a: "Processing times vary, but typically 10-13 months for spouses of U.S. citizens living in the U.S., and 12-18 months for those applying from abroad through consular processing.",
        },
      ],
    },
    {
      category: "Asylum & Humanitarian Relief",
      questions: [
        {
          q: "What is asylum and who qualifies?",
          a: "Asylum is protection granted to individuals who have suffered persecution or have a well-founded fear of persecution based on race, religion, nationality, political opinion, or membership in a particular social group.",
        },
        {
          q: "What is the difference between asylum and refugee status?",
          a: "Asylum is requested by individuals already in the U.S. or at a port of entry. Refugee status is applied for from outside the U.S. Both provide the same protections once granted.",
        },
        {
          q: "What is a U visa and who qualifies?",
          a: "A U visa is for victims of certain crimes who have suffered substantial mental or physical abuse and are willing to assist law enforcement in the investigation or prosecution of the crime.",
        },
        {
          q: "What is VAWA and how does it help abuse victims?",
          a: "The Violence Against Women Act (VAWA) allows certain spouses, children, and parents of U.S. citizens and permanent residents to self-petition for immigration benefits without the abuser's knowledge.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Find answers to common immigration questions. Use the categories below to browse by topic.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">
                {category.category}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem
                    key={faqIndex}
                    value={`${categoryIndex}-${faqIndex}`}
                    className="border rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-semibold">{faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our experienced immigration attorneys are here to help. Schedule a consultation to discuss your specific situation.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Schedule Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
