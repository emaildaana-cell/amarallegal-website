import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Flag, FileCheck, Users, Award } from "lucide-react";

export default function Citizenship() {
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
            backgroundImage: "url(/citizenship.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2,
          }}
        />
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Citizenship & Naturalization
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Achieve your American dream with expert guidance through the naturalization process
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6">Become a U.S. Citizen</h2>
            <p className="text-lg text-gray-700 mb-6">
              U.S. citizenship offers numerous benefits including the right to vote, eligibility for federal jobs, protection from deportation, and the ability to sponsor family members for immigration. Our experienced attorneys guide you through every step of the naturalization process.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Eligibility Requirements</h2>
            <p className="text-lg text-gray-700 mb-4">
              To qualify for U.S. citizenship through naturalization, you typically must meet the following requirements:
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-2xl font-bold mb-3 flex items-center">
                <FileCheck className="mr-2 text-primary" />
                Permanent Residence
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Be a lawful permanent resident (green card holder) for at least 5 years</li>
                <li>Or 3 years if married to a U.S. citizen</li>
                <li>Or qualify through military service</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-2xl font-bold mb-3 flex items-center">
                <Users className="mr-2 text-primary" />
                Physical Presence & Residence
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Have been physically present in the U.S. for at least 30 months out of the last 5 years (or 18 months out of 3 years if married to a U.S. citizen)</li>
                <li>Have continuous residence in the U.S. from the time of application until naturalization</li>
                <li>Have lived in the state or USCIS district where you apply for at least 3 months</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-2xl font-bold mb-3 flex items-center">
                <Award className="mr-2 text-primary" />
                Additional Requirements
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Be at least 18 years old at the time of filing</li>
                <li>Demonstrate good moral character</li>
                <li>Pass English and civics tests (with some exceptions)</li>
                <li>Take the Oath of Allegiance to the United States</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Our Naturalization Services</h2>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start">
                <FileCheck className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Eligibility Assessment:</strong> We review your immigration history and determine your eligibility for citizenship, identifying any potential issues.</span>
              </li>
              <li className="flex items-start">
                <FileCheck className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Form N-400 Preparation:</strong> We complete and file your Application for Naturalization with meticulous attention to detail.</span>
              </li>
              <li className="flex items-start">
                <Flag className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Interview Preparation:</strong> We prepare you for the USCIS interview, including practice with civics and English test questions.</span>
              </li>
              <li className="flex items-start">
                <Users className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Representation at Interview:</strong> We accompany you to your naturalization interview and advocate on your behalf.</span>
              </li>
              <li className="flex items-start">
                <Award className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Oath Ceremony Assistance:</strong> We guide you through the final step of taking the Oath of Allegiance and receiving your Certificate of Naturalization.</span>
              </li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-12">The Naturalization Process</h2>
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                <strong>1. Determine Eligibility:</strong> We assess whether you meet all requirements for naturalization and address any concerns.
              </p>
              <p>
                <strong>2. Complete Form N-400:</strong> We prepare and submit your Application for Naturalization along with supporting documents and fees.
              </p>
              <p>
                <strong>3. Biometrics Appointment:</strong> You'll attend a biometrics appointment where USCIS will take your fingerprints, photo, and signature.
              </p>
              <p>
                <strong>4. Naturalization Interview:</strong> You'll attend an interview with a USCIS officer who will test your English and civics knowledge and review your application.
              </p>
              <p>
                <strong>5. Receive Decision:</strong> USCIS will grant or deny your application. If approved, you'll receive a notice for your oath ceremony.
              </p>
              <p>
                <strong>6. Take the Oath:</strong> At the naturalization ceremony, you'll take the Oath of Allegiance and receive your Certificate of Naturalization, officially becoming a U.S. citizen.
              </p>
            </div>

            <div className="bg-primary/10 border-l-4 border-primary p-6 my-8">
              <p className="text-lg font-semibold text-primary mb-2">Special Circumstances</p>
              <p className="text-gray-700">
                We handle complex naturalization cases including those with criminal history, extended absences from the U.S., disability accommodations, and military service qualifications. Contact us for a personalized assessment.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Benefits of U.S. Citizenship</h2>
            <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 mb-6">
              <li>Right to vote in federal elections</li>
              <li>Eligibility for federal jobs and elected office</li>
              <li>Protection from deportation</li>
              <li>Ability to sponsor family members for green cards</li>
              <li>Eligibility for federal grants and scholarships</li>
              <li>Easier international travel with a U.S. passport</li>
              <li>Ability to pass citizenship to children born abroad</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Become a U.S. Citizen?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Schedule a consultation to discuss your path to citizenship and get started on your naturalization application.
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
