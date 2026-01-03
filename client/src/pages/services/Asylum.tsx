import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Heart, Globe, Shield, Users } from "lucide-react";

export default function Asylum() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative py-24 md:py-32 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a2332 0%, #2d3e50 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/asylum.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2,
          }}
        />
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Asylum & Refugee Protection
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Compassionate legal representation for those fleeing persecution
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6">Protection for Those Fleeing Persecution</h2>
            <p className="text-lg text-gray-700 mb-6">
              Asylum provides protection to individuals who have suffered persecution or have a well-founded fear of persecution in their home country based on race, religion, nationality, membership in a particular social group, or political opinion. Our experienced asylum attorneys provide compassionate, thorough representation to help you find safety and build a new life in the United States.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">What is Asylum?</h2>
            <p className="text-lg text-gray-700 mb-6">
              Asylum is a form of protection available to people who meet the definition of a refugee and are already in the United States or seeking admission at a port of entry. Asylum allows you to remain in the U.S., obtain work authorization, and eventually apply for permanent residence (green card) and citizenship.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Grounds for Asylum</h2>
            <p className="text-lg text-gray-700 mb-4">
              To qualify for asylum, you must demonstrate persecution or a well-founded fear of persecution based on one of five protected grounds:
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-2xl font-bold mb-3 flex items-center">
                <Users className="mr-2 text-primary" />
                Race
              </h3>
              <p className="text-gray-700">
                Persecution based on your race or ethnicity, including discrimination, violence, or threats due to your racial or ethnic identity.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-2xl font-bold mb-3 flex items-center">
                <Heart className="mr-2 text-primary" />
                Religion
              </h3>
              <p className="text-gray-700">
                Persecution for holding particular religious beliefs, practicing your religion, or refusing to practice a religion imposed by others.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-2xl font-bold mb-3 flex items-center">
                <Globe className="mr-2 text-primary" />
                Nationality
              </h3>
              <p className="text-gray-700">
                Persecution based on your country of origin, citizenship, or membership in a particular national or ethnic group.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-2xl font-bold mb-3 flex items-center">
                <Shield className="mr-2 text-primary" />
                Political Opinion
              </h3>
              <p className="text-gray-700">
                Persecution for holding or being perceived to hold particular political beliefs, including opposition to government policies or support for political movements.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-2xl font-bold mb-3 flex items-center">
                <Users className="mr-2 text-primary" />
                Membership in a Particular Social Group
              </h3>
              <p className="text-gray-700 mb-3">
                Persecution based on a characteristic that is fundamental to your identity or conscience. This can include:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Gender-based persecution (domestic violence, female genital mutilation, forced marriage)</li>
                <li>Sexual orientation or gender identity (LGBTQ+ persecution)</li>
                <li>Family membership or clan affiliation</li>
                <li>Former gang membership or resistance to gang recruitment</li>
                <li>Victims of human trafficking</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Types of Asylum Applications</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-3">Affirmative Asylum</h3>
                <p className="text-gray-700">
                  Filed with USCIS by individuals who are not in removal proceedings. You must apply within one year of arriving in the United States (with some exceptions). The process includes an interview with an asylum officer.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-3">Defensive Asylum</h3>
                <p className="text-gray-700">
                  Filed as a defense against removal in immigration court. This applies to individuals who are in removal proceedings, were apprehended at the border, or whose affirmative asylum application was referred to court.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Our Asylum Services</h2>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start">
                <Heart className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Compassionate Case Evaluation:</strong> We listen to your story with sensitivity and assess your eligibility for asylum and related forms of protection.</span>
              </li>
              <li className="flex items-start">
                <Shield className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Comprehensive Application Preparation:</strong> We prepare detailed, well-documented asylum applications including your personal declaration, supporting evidence, and expert testimony when needed.</span>
              </li>
              <li className="flex items-start">
                <Globe className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Country Conditions Research:</strong> We gather and present evidence of country conditions, human rights reports, and expert opinions to support your claim.</span>
              </li>
              <li className="flex items-start">
                <Users className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Interview and Hearing Preparation:</strong> We thoroughly prepare you for asylum interviews and court hearings, conducting practice sessions and addressing potential concerns.</span>
              </li>
              <li className="flex items-start">
                <Shield className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Representation at Interviews and Hearings:</strong> We accompany you to asylum interviews and represent you in immigration court, presenting your case persuasively.</span>
              </li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-12">The Asylum Process</h2>
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                <strong>1. File Application:</strong> Submit Form I-589 (Application for Asylum and Withholding of Removal) within one year of arrival, along with supporting documentation.
              </p>
              <p>
                <strong>2. Biometrics Appointment:</strong> Attend a biometrics appointment for fingerprinting and background checks.
              </p>
              <p>
                <strong>3. Asylum Interview or Court Hearing:</strong> Present your case to an asylum officer (affirmative) or immigration judge (defensive), including testimony and evidence.
              </p>
              <p>
                <strong>4. Decision:</strong> Receive a decision on your asylum application. If granted, you can remain in the U.S., obtain work authorization, and apply for a green card after one year.
              </p>
              <p>
                <strong>5. Appeals (if necessary):</strong> If denied, we can appeal to the Board of Immigration Appeals or federal court.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Related Forms of Protection</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Withholding of Removal</h3>
              <p className="text-gray-700">
                A higher standard of proof than asylum, but available even if you don't meet asylum's one-year filing deadline. Provides protection from deportation but not a path to permanent residence.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Convention Against Torture (CAT)</h3>
              <p className="text-gray-700">
                Protection for individuals who would more likely than not face torture if returned to their home country, regardless of the reason. Does not require persecution based on a protected ground.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Benefits of Asylum</h2>
            <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 mb-6">
              <li>Protection from deportation to your home country</li>
              <li>Work authorization in the United States</li>
              <li>Eligibility for a green card after one year</li>
              <li>Ability to petition for spouse and unmarried children under 21</li>
              <li>Pathway to U.S. citizenship after five years as a permanent resident</li>
              <li>Access to certain public benefits</li>
              <li>Refugee travel document for international travel</li>
            </ul>

            <div className="bg-primary/10 border-l-4 border-primary p-6 my-8">
              <p className="text-lg font-semibold text-primary mb-2">One-Year Filing Deadline</p>
              <p className="text-gray-700">
                You must generally file your asylum application within one year of arriving in the United States. Exceptions exist for changed or extraordinary circumstances. Don't delay—contact us immediately to preserve your asylum eligibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Seeking Safety and Protection?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            If you've fled persecution or fear returning to your home country, contact us for a confidential consultation about asylum and protection options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Schedule Consultation
              </Button>
            </Link>
            <a href="tel:+13055759631">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white text-primary hover:bg-gray-100">
                📞 Call (305) 575-9631
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
