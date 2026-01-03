import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Shield, Gavel, FileText, AlertTriangle } from "lucide-react";

export default function RemovalDefense() {
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
            backgroundImage: "url(/removal-defense.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2,
          }}
        />
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Removal Defense
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Aggressive defense against deportation in immigration court
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6">Fight Deportation with Expert Legal Defense</h2>
            <p className="text-lg text-gray-700 mb-6">
              Facing deportation is one of the most stressful experiences you and your family can endure. The consequences of removal from the United States are severe and life-altering. Our experienced immigration attorneys provide aggressive, strategic defense in removal proceedings, fighting to keep you and your family together in the United States.
            </p>

            <div className="bg-red-50 border-l-4 border-red-600 p-6 my-8">
              <p className="text-lg font-semibold text-red-600 mb-2 flex items-center">
                <AlertTriangle className="mr-2" />
                Don't Face Deportation Alone
              </p>
              <p className="text-gray-700">
                Representing yourself in immigration court significantly reduces your chances of success. Studies show that individuals with legal representation are far more likely to win their cases. Contact us immediately if you've received a Notice to Appear or are in removal proceedings.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Our Removal Defense Services</h2>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start">
                <Shield className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Comprehensive Case Analysis:</strong> We thoroughly review your immigration history, criminal record, and personal circumstances to identify all available defenses and relief options.</span>
              </li>
              <li className="flex items-start">
                <Gavel className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Strategic Defense Planning:</strong> We develop a customized defense strategy tailored to your specific situation, maximizing your chances of success.</span>
              </li>
              <li className="flex items-start">
                <FileText className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Evidence Gathering:</strong> We collect and present compelling evidence including affidavits, expert testimony, country condition reports, and documentation of hardship.</span>
              </li>
              <li className="flex items-start">
                <Gavel className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Court Representation:</strong> We represent you at all master calendar hearings and individual hearings, presenting your case persuasively to the immigration judge.</span>
              </li>
              <li className="flex items-start">
                <FileText className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Appeals:</strong> If your case is denied, we file appeals to the Board of Immigration Appeals (BIA) and federal circuit courts.</span>
              </li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-12">Common Grounds for Deportation</h2>
            <p className="text-lg text-gray-700 mb-4">
              The government can initiate removal proceedings for various reasons, including:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <ul className="space-y-2 text-gray-700">
                <li><strong>Unlawful Entry or Presence:</strong> Entering without inspection or overstaying a visa</li>
                <li><strong>Criminal Convictions:</strong> Certain crimes can make you deportable, including crimes of moral turpitude, aggravated felonies, drug offenses, and domestic violence</li>
                <li><strong>Visa Violations:</strong> Violating the terms of your nonimmigrant visa</li>
                <li><strong>Immigration Fraud:</strong> Misrepresentation or fraud in obtaining immigration benefits</li>
                <li><strong>Public Charge:</strong> Becoming primarily dependent on government assistance</li>
                <li><strong>Security Violations:</strong> Terrorism, espionage, or threats to national security</li>
                <li><strong>Document Fraud:</strong> Using false documents or claiming to be a U.S. citizen when you're not</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Defense Strategies</h2>
            <p className="text-lg text-gray-700 mb-4">
              We employ various defense strategies depending on your circumstances:
            </p>
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                <strong>Challenging Removability:</strong> We may argue that the government has not proven you are removable, challenging the evidence and legal basis for deportation.
              </p>
              <p>
                <strong>Seeking Relief from Removal:</strong> Even if you are removable, we pursue all available forms of relief including cancellation of removal, adjustment of status, asylum, waivers, and other options.
              </p>
              <p>
                <strong>Termination of Proceedings:</strong> In some cases, we can get your case terminated entirely due to procedural errors, lack of jurisdiction, or other legal defenses.
              </p>
              <p>
                <strong>Prosecutorial Discretion:</strong> We negotiate with ICE attorneys to request favorable exercise of prosecutorial discretion, potentially resulting in case closure or administrative closure.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">The Removal Process</h2>
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                <strong>1. Notice to Appear (NTA):</strong> You receive a charging document listing the allegations against you and the legal basis for removal.
              </p>
              <p>
                <strong>2. Master Calendar Hearing:</strong> Initial court appearance where you respond to the charges and indicate what relief you're seeking.
              </p>
              <p>
                <strong>3. Individual Hearing:</strong> Full evidentiary hearing where both sides present evidence and testimony. The judge will make a decision on removability and any relief applications.
              </p>
              <p>
                <strong>4. Decision:</strong> The judge issues an oral or written decision either granting relief, ordering removal, or continuing the case.
              </p>
              <p>
                <strong>5. Appeals:</strong> Either party can appeal the decision to the Board of Immigration Appeals within 30 days.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Special Considerations</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Criminal Convictions</h3>
              <p className="text-gray-700 mb-4">
                Criminal convictions significantly complicate removal defense. We analyze your criminal history to determine:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Whether the conviction makes you removable or inadmissible</li>
                <li>Whether you're subject to mandatory detention</li>
                <li>What relief options remain available despite the conviction</li>
                <li>Whether post-conviction relief can help your immigration case</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Prior Deportation Orders</h3>
              <p className="text-gray-700">
                If you were previously deported and returned to the U.S., you face additional challenges. We can help with motions to reopen prior cases, challenging reinstatement of removal, and seeking consent to reapply for admission.
              </p>
            </div>

            <div className="bg-primary/10 border-l-4 border-primary p-6 my-8">
              <p className="text-lg font-semibold text-primary mb-2">Act Quickly</p>
              <p className="text-gray-700">
                Deadlines in immigration court are strict and unforgiving. Missing a deadline can result in an automatic deportation order. Contact us as soon as you receive a Notice to Appear or learn you're in removal proceedings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Facing Deportation? We Can Help.
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't wait until it's too late. Contact us today for aggressive removal defense representation.
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
