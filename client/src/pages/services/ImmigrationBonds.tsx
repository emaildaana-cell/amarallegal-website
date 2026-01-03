import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { DollarSign, Clock, FileText, Phone } from "lucide-react";

export default function ImmigrationBonds() {
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
            backgroundImage: "url(/immigration-bonds.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2,
          }}
        />
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Immigration Bonds
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Secure release from detention quickly and affordably with our expert bond services
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6">What is an Immigration Bond?</h2>
            <p className="text-lg text-gray-700 mb-6">
              An immigration bond is a financial guarantee that allows a detained individual to be released from ICE custody while their immigration case proceeds. The bond ensures that the individual will attend all required court hearings and comply with immigration proceedings.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-12">Types of Immigration Bonds</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-2xl font-bold mb-3 flex items-center">
                <DollarSign className="mr-2 text-primary" />
                Delivery Bond
              </h3>
              <p className="text-gray-700">
                The most common type of bond, allowing release from detention with the requirement to appear at all immigration hearings. Minimum bond amount is typically $1,500, though amounts can be significantly higher depending on individual circumstances.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-2xl font-bold mb-3 flex items-center">
                <FileText className="mr-2 text-primary" />
                Voluntary Departure Bond
              </h3>
              <p className="text-gray-700">
                Posted when an individual agrees to leave the United States voluntarily by a specific date. The bond is refunded once proof of departure is provided. Amounts vary based on travel costs and individual circumstances.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Our Bond Services</h2>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start">
                <Clock className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>24/7 Emergency Bond Hearings:</strong> We work around the clock to secure bond hearings and release from detention as quickly as possible.</span>
              </li>
              <li className="flex items-start">
                <DollarSign className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Bond Reduction Motions:</strong> If ICE sets an unreasonably high bond, we file motions to reduce the amount to an affordable level.</span>
              </li>
              <li className="flex items-start">
                <FileText className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Bond Payment Assistance:</strong> We guide families through the bond payment process and connect you with reputable bond companies when needed.</span>
              </li>
              <li className="flex items-start">
                <Phone className="mr-3 mt-1 text-primary flex-shrink-0" />
                <span><strong>Comprehensive Case Evaluation:</strong> We assess your eligibility for bond and develop a strategy to maximize your chances of release.</span>
              </li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-12">Eligibility for Immigration Bonds</h2>
            <p className="text-lg text-gray-700 mb-4">
              Not everyone in ICE detention is eligible for bond. Factors affecting eligibility include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 mb-6">
              <li>Criminal history and nature of any convictions</li>
              <li>Immigration history and prior deportations</li>
              <li>Ties to the community (family, employment, property)</li>
              <li>Flight risk assessment</li>
              <li>Danger to the community assessment</li>
            </ul>

            <div className="bg-primary/10 border-l-4 border-primary p-6 my-8">
              <p className="text-lg font-semibold text-primary mb-2">Time is Critical</p>
              <p className="text-gray-700">
                The sooner you contact us after a loved one is detained, the faster we can work to secure their release. Every day in detention matters.
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6 mt-12">Bond Hearing Process</h2>
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                <strong>1. Request a Bond Hearing:</strong> We file a motion with the immigration court requesting a bond hearing before an immigration judge.
              </p>
              <p>
                <strong>2. Prepare Your Case:</strong> We gather evidence of community ties, employment history, family relationships, and other factors that demonstrate you are not a flight risk or danger to the community.
              </p>
              <p>
                <strong>3. Attend the Hearing:</strong> We represent you at the bond hearing, presenting evidence and arguing for the lowest possible bond amount or release on recognizance.
              </p>
              <p>
                <strong>4. Post Bond and Secure Release:</strong> Once the judge sets a bond amount, we help you navigate the payment process and secure release from detention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Help Securing an Immigration Bond?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us immediately for a free consultation. We're available 24/7 for emergency detention cases.
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
