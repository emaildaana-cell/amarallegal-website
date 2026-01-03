import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { GraduationCap, Briefcase, Shield, FileText } from "lucide-react";

export default function DACA() {
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
            backgroundImage: "url(/daca.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2,
          }}
        />
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            DACA (Deferred Action for Childhood Arrivals)
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Protect your future with expert DACA application and renewal assistance
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6">What is DACA?</h2>
            <p className="text-lg text-gray-700 mb-6">
              Deferred Action for Childhood Arrivals (DACA) is a program that provides temporary protection from deportation and work authorization for certain individuals who came to the United States as children. DACA recipients, often called "Dreamers," can live and work legally in the U.S. for renewable two-year periods.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">DACA Benefits</h2>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start">
                <Shield className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Protection from Deportation:</strong> DACA provides temporary relief from removal proceedings and deportation.</span>
              </li>
              <li className="flex items-start">
                <Briefcase className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Work Authorization:</strong> Receive an Employment Authorization Document (EAD) allowing you to work legally in the United States.</span>
              </li>
              <li className="flex items-start">
                <GraduationCap className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Educational Opportunities:</strong> Access in-state tuition and financial aid in many states.</span>
              </li>
              <li className="flex items-start">
                <FileText className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Driver's License:</strong> Obtain a driver's license or state ID in most states.</span>
              </li>
              <li className="flex items-start">
                <FileText className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Social Security Number:</strong> Receive a valid Social Security number for employment and other purposes.</span>
              </li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-12">DACA Eligibility Requirements</h2>
            <p className="text-lg text-gray-700 mb-4">
              To qualify for DACA, you must meet all of the following criteria:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <ul className="space-y-3 text-gray-700">
                <li><strong>Age:</strong> Were under the age of 31 as of June 15, 2012</li>
                <li><strong>Arrival:</strong> Came to the United States before reaching your 16th birthday</li>
                <li><strong>Continuous Residence:</strong> Have continuously resided in the U.S. since June 15, 2007</li>
                <li><strong>Physical Presence:</strong> Were physically present in the U.S. on June 15, 2012, and at the time of making your DACA request</li>
                <li><strong>Status:</strong> Had no lawful status on June 15, 2012</li>
                <li><strong>Education:</strong> Are currently in school, have graduated or obtained a GED, or are an honorably discharged veteran</li>
                <li><strong>Criminal History:</strong> Have not been convicted of a felony, significant misdemeanor, or three or more other misdemeanors, and do not pose a threat to national security or public safety</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Our DACA Services</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-3">Initial DACA Applications</h3>
                <p className="text-gray-700">
                  We help first-time applicants determine eligibility, gather required documentation, and prepare comprehensive DACA applications. Our thorough approach minimizes the risk of denial and ensures your application is complete and accurate.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-3">DACA Renewals</h3>
                <p className="text-gray-700">
                  DACA must be renewed every two years. We handle the renewal process efficiently, ensuring your application is submitted on time and your protection and work authorization continue without interruption. We recommend starting the renewal process 150-180 days before expiration.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-3">Advance Parole for DACA Recipients</h3>
                <p className="text-gray-700">
                  In certain circumstances, DACA recipients can apply for advance parole to travel outside the U.S. for humanitarian, educational, or employment purposes. We assist with advance parole applications and advise on the risks and benefits of international travel.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-3">Exploring Permanent Solutions</h3>
                <p className="text-gray-700">
                  While DACA provides temporary protection, we also help you explore pathways to permanent residence through family relationships, employment, or other immigration benefits. We develop long-term strategies for achieving permanent status.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Required Documentation</h2>
            <p className="text-lg text-gray-700 mb-4">
              DACA applications require extensive documentation to prove eligibility. We help you gather and organize:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 mb-6">
              <li>Proof of identity (passport, birth certificate, national ID)</li>
              <li>Evidence of arrival before age 16 (school records, medical records, etc.)</li>
              <li>Proof of continuous residence since June 15, 2007</li>
              <li>Educational documents (diplomas, transcripts, GED certificates)</li>
              <li>Military service records (if applicable)</li>
              <li>Criminal history documentation (if any)</li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 my-8">
              <p className="text-lg font-semibold text-yellow-800 mb-2">Current DACA Status</p>
              <p className="text-gray-700">
                DACA policy is subject to ongoing legal challenges and potential changes. Current DACA recipients can renew their status, but the program's future remains uncertain. We stay updated on all policy changes and provide current guidance based on the latest developments.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Common DACA Concerns</h2>
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                <strong>Can I travel outside the U.S. with DACA?</strong> Generally, DACA recipients should not travel internationally without advance parole. Leaving without advance parole terminates your DACA status. We can help you apply for advance parole if you have a valid reason to travel.
              </p>
              <p>
                <strong>What if I have a criminal record?</strong> Not all criminal convictions disqualify you from DACA. We analyze your criminal history to determine eligibility and can help with expungement or other post-conviction relief when appropriate.
              </p>
              <p>
                <strong>Can DACA lead to a green card?</strong> DACA itself does not provide a direct path to permanent residence. However, DACA recipients may qualify for green cards through other means such as family relationships, employment, or special programs. We evaluate all available options.
              </p>
            </div>

            <div className="bg-primary/10 border-l-4 border-primary p-6 my-8">
              <p className="text-lg font-semibold text-primary mb-2">Don't Miss Your Renewal Deadline</p>
              <p className="text-gray-700">
                Allowing your DACA to expire can result in loss of work authorization and vulnerability to deportation. Contact us well in advance of your expiration date to ensure timely renewal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Help with DACA?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're applying for the first time or renewing your DACA status, we're here to help. Contact us for expert guidance.
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
