import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Scale, FileText, Heart, Home } from "lucide-react";

export default function CourtRelief() {
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
            backgroundImage: "url(/court-relief.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2,
          }}
        />
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Court Relief Options
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Fight for your right to stay in the United States with expert legal representation
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6">Forms of Relief from Removal</h2>
            <p className="text-lg text-gray-700 mb-6">
              Even if you are in removal proceedings, you may be eligible for various forms of relief that can allow you to remain in the United States legally. Our experienced immigration attorneys analyze your case to identify all available relief options and fight aggressively for your right to stay.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Available Relief Options</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-2xl font-bold mb-3 flex items-center">
                <Heart className="mr-2 text-primary" />
                Cancellation of Removal
              </h3>
              <p className="text-gray-700 mb-3">
                Cancellation of removal is available to both lawful permanent residents and non-permanent residents who meet specific requirements:
              </p>
              <p className="font-semibold text-gray-800 mb-2">For Lawful Permanent Residents:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mb-3">
                <li>Have been a permanent resident for at least 5 years</li>
                <li>Have resided continuously in the U.S. for at least 7 years</li>
                <li>Have not been convicted of an aggravated felony</li>
              </ul>
              <p className="font-semibold text-gray-800 mb-2">For Non-Permanent Residents:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Have been physically present in the U.S. for at least 10 years</li>
                <li>Have good moral character during that time</li>
                <li>Can demonstrate exceptional and extremely unusual hardship to a U.S. citizen or permanent resident spouse, parent, or child</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-2xl font-bold mb-3 flex items-center">
                <Scale className="mr-2 text-primary" />
                Adjustment of Status
              </h3>
              <p className="text-gray-700">
                In some cases, individuals in removal proceedings may be eligible to adjust their status to lawful permanent resident through family relationships, employment, or other categories. This requires an available immigrant visa and meeting all eligibility requirements.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-2xl font-bold mb-3 flex items-center">
                <FileText className="mr-2 text-primary" />
                Waivers of Inadmissibility
              </h3>
              <p className="text-gray-700 mb-3">
                Various waivers can excuse certain grounds of inadmissibility:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li><strong>I-601 Waiver:</strong> For unlawful presence, fraud, and certain criminal grounds</li>
                <li><strong>I-601A Provisional Waiver:</strong> For unlawful presence before consular processing</li>
                <li><strong>212(h) Waiver:</strong> For certain criminal convictions</li>
                <li><strong>212(i) Waiver:</strong> For immigration fraud or misrepresentation</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-2xl font-bold mb-3 flex items-center">
                <Home className="mr-2 text-primary" />
                Voluntary Departure
              </h3>
              <p className="text-gray-700">
                Voluntary departure allows you to leave the United States at your own expense within a specified time period, avoiding a formal removal order. This preserves your ability to apply for admission to the U.S. in the future and avoids certain bars to reentry.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Additional Forms of Relief</h2>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start">
                <FileText className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Asylum and Withholding of Removal:</strong> Protection for those fleeing persecution based on race, religion, nationality, political opinion, or membership in a particular social group.</span>
              </li>
              <li className="flex items-start">
                <FileText className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Convention Against Torture (CAT):</strong> Protection for individuals who would face torture if returned to their home country.</span>
              </li>
              <li className="flex items-start">
                <FileText className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Temporary Protected Status (TPS):</strong> Temporary immigration status for nationals of designated countries experiencing armed conflict, natural disasters, or other extraordinary conditions.</span>
              </li>
              <li className="flex items-start">
                <FileText className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>U Visa:</strong> For victims of certain crimes who have suffered substantial mental or physical abuse and are helpful to law enforcement.</span>
              </li>
              <li className="flex items-start">
                <FileText className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>T Visa:</strong> For victims of human trafficking who assist law enforcement in investigating or prosecuting trafficking crimes.</span>
              </li>
              <li className="flex items-start">
                <FileText className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>VAWA Self-Petition:</strong> For abused spouses, children, and parents of U.S. citizens and permanent residents.</span>
              </li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-12">Our Court Relief Services</h2>
            <p className="text-lg text-gray-700 mb-4">
              We provide comprehensive representation for all forms of relief from removal:
            </p>
            <ul className="space-y-3 text-lg text-gray-700">
              <li>• Thorough case evaluation to identify all available relief options</li>
              <li>• Preparation and filing of applications for relief</li>
              <li>• Gathering and presenting compelling evidence and documentation</li>
              <li>• Expert witness testimony when needed</li>
              <li>• Aggressive representation at individual hearings</li>
              <li>• Appeals to the Board of Immigration Appeals (BIA) and federal courts</li>
            </ul>

            <div className="bg-primary/10 border-l-4 border-primary p-6 my-8">
              <p className="text-lg font-semibold text-primary mb-2">Complex Cases Welcome</p>
              <p className="text-gray-700">
                We handle even the most complex immigration court cases, including those involving criminal convictions, prior deportations, and multiple grounds of inadmissibility. No case is too difficult for our experienced team.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">The Immigration Court Process</h2>
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                <strong>1. Notice to Appear (NTA):</strong> The government initiates removal proceedings by serving you with a Notice to Appear, which lists the charges against you.
              </p>
              <p>
                <strong>2. Master Calendar Hearing:</strong> Initial court appearance where you admit or deny the charges and indicate whether you will seek relief from removal.
              </p>
              <p>
                <strong>3. Individual Hearing:</strong> Full hearing where you present evidence and testimony supporting your application for relief. The immigration judge will make a decision on your case.
              </p>
              <p>
                <strong>4. Decision and Appeals:</strong> If the judge denies relief, we can appeal to the Board of Immigration Appeals and, if necessary, to federal circuit courts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Facing Removal Proceedings?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't give up hope. Contact us to explore all available relief options and fight for your right to remain in the United States.
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
