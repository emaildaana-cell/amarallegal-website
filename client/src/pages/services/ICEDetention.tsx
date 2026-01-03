import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Shield, Clock, Phone, FileText } from "lucide-react";

export default function ICEDetention() {
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
            backgroundImage: "url(/detention-defense.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2,
          }}
        />
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            ICE Detention Representation
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Aggressive legal defense for individuals detained by Immigration and Customs Enforcement
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6">Expert Defense Against ICE Detention</h2>
            <p className="text-lg text-gray-700 mb-6">
              Being detained by ICE is a frightening and stressful experience. Time is of the essence when a loved one is in immigration detention. Our experienced attorneys provide immediate, aggressive representation to secure release and protect your rights throughout the detention process.
            </p>

            <div className="bg-red-50 border-l-4 border-red-600 p-6 my-8">
              <p className="text-lg font-semibold text-red-600 mb-2">24/7 Emergency Response</p>
              <p className="text-gray-700">
                We understand that ICE arrests can happen at any time. Our team is available around the clock to respond to detention emergencies and begin working on your case immediately.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Our ICE Detention Services</h2>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start">
                <Clock className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Immediate Detention Response:</strong> We locate your loved one in ICE custody, assess their situation, and begin developing a release strategy within hours of contact.</span>
              </li>
              <li className="flex items-start">
                <Shield className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Bond Hearings:</strong> We fight for the lowest possible bond amount or release on recognizance, presenting compelling evidence of community ties and lack of flight risk.</span>
              </li>
              <li className="flex items-start">
                <FileText className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Detention Reviews:</strong> We file motions for custody redetermination and challenge unlawful or prolonged detention.</span>
              </li>
              <li className="flex items-start">
                <Phone className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Family Communication:</strong> We facilitate communication between detained individuals and their families, ensuring you stay informed throughout the process.</span>
              </li>
              <li className="flex items-start">
                <Shield className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Comprehensive Legal Defense:</strong> We represent you in all immigration court proceedings while in detention, fighting deportation and pursuing relief options.</span>
              </li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-12">Understanding ICE Detention</h2>
            <p className="text-lg text-gray-700 mb-4">
              ICE (Immigration and Customs Enforcement) detains individuals for various immigration violations. Common reasons for detention include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 mb-6">
              <li>Unlawful presence in the United States</li>
              <li>Visa overstays or violations of visa terms</li>
              <li>Criminal convictions (even minor offenses can trigger detention)</li>
              <li>Final orders of removal</li>
              <li>Suspected immigration fraud</li>
              <li>Re-entry after deportation</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-12">The Detention Process</h2>
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                <strong>1. Arrest and Initial Processing:</strong> ICE arrests individuals and transports them to detention facilities. During processing, detainees are fingerprinted, photographed, and interviewed about their immigration status.
              </p>
              <p>
                <strong>2. Custody Determination:</strong> ICE decides whether to release the individual on bond, place them in alternative detention programs, or keep them in custody. Some individuals are subject to mandatory detention with no bond eligibility.
              </p>
              <p>
                <strong>3. Bond Hearing (if eligible):</strong> If ICE sets a bond or if we request a bond hearing, an immigration judge will determine whether the individual should be released and at what bond amount.
              </p>
              <p>
                <strong>4. Immigration Court Proceedings:</strong> While detained, individuals must attend master calendar hearings and individual hearings where they can fight deportation and seek relief.
              </p>
              <p>
                <strong>5. Release or Deportation:</strong> The case concludes with either release (through bond, relief granted, or case termination) or deportation.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Fighting for Your Release</h2>
            <p className="text-lg text-gray-700 mb-4">
              Our attorneys employ multiple strategies to secure your release from ICE detention:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <ul className="space-y-3 text-gray-700">
                <li><strong>Bond Motions:</strong> We request bond hearings and present evidence demonstrating you are not a flight risk or danger to the community.</li>
                <li><strong>Custody Redetermination:</strong> We challenge ICE's initial custody decision and argue for release or lower bond amounts.</li>
                <li><strong>Habeas Corpus Petitions:</strong> In cases of unlawful or prolonged detention, we file federal habeas corpus petitions challenging the legality of detention.</li>
                <li><strong>Alternatives to Detention:</strong> We advocate for release into alternative detention programs such as GPS monitoring or supervised release.</li>
                <li><strong>Prosecutorial Discretion:</strong> We communicate with ICE attorneys to request favorable exercise of prosecutorial discretion, including release from custody.</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Detention Facility Locations We Serve</h2>
            <p className="text-lg text-gray-700 mb-4">
              We represent clients detained at facilities throughout Florida and nationwide, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 mb-6">
              <li>Krome Detention Center (Miami)</li>
              <li>Broward Transitional Center (Pompano Beach)</li>
              <li>Glades County Detention Center</li>
              <li>Baker County Detention Center</li>
              <li>And detention facilities nationwide</li>
            </ul>

            <div className="bg-primary/10 border-l-4 border-primary p-6 my-8">
              <p className="text-lg font-semibold text-primary mb-2">Don't Wait - Act Now</p>
              <p className="text-gray-700">
                Every hour counts when someone is in ICE detention. The sooner we begin working on your case, the better your chances of securing release and fighting deportation successfully. Contact us immediately for emergency detention representation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Someone You Love is in ICE Detention?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Call us now for immediate assistance. We're available 24/7 for detention emergencies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+13055759631">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                📞 24/7 Emergency: (305) 575-9631
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white text-primary hover:bg-gray-100">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
