import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { 
  Shield, 
  FileText, 
  Scale, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight,
  Calendar,
  Gavel,
  Building2,
  RefreshCw,
  XCircle,
  ChevronRight
} from "lucide-react";

export default function Asylum() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Asylum & Humanitarian Relief | Amaral Law</title>
        <meta name="description" content="Asylum application assistance and humanitarian relief representation. Protect your right to safety with experienced asylum attorneys." />
        <meta name="keywords" content="asylum lawyer, asylum application, humanitarian relief, refugee protection" />
        <link rel="canonical" href="https://amarallegal.com/services/asylum" />
        <meta property="og:title" content="Asylum & Humanitarian Relief | Amaral Law" />
        <meta property="og:description" content="Asylum application assistance and humanitarian relief representation. Protect your right to safety with experienced asylum attorneys." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1920&q=80')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
        </div>
        
        <div className="container relative z-10 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("service.asylum.title")}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4">
              {t("service.asylum.subtitle")}
            </p>
            <p className="text-lg text-white/80 mb-8">
              {t("service.asylum.intro")}
            </p>
            <Link href="/appointments">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                {t("service.asylum.cta")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {t("service.asylum.eligibility_title")}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {t("service.asylum.eligibility_desc")}
            </p>
            
            <div className="grid md:grid-cols-5 gap-4">
              {["Race", "Religion", "Nationality", "Political Opinion", "Social Group"].map((ground, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-4">
                    <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-semibold text-sm">{ground}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* One-Year Filing Deadline Section */}
      <section className="py-16 bg-red-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                {t("service.asylum.filing_deadline_title")}
              </h2>
            </div>
            
            <Card className="border-red-200 bg-white mb-8">
              <CardContent className="p-6">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {t("service.asylum.filing_deadline_desc")}
                </p>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    {t("service.asylum.deadline_importance")}
                  </h3>
                  <p className="text-red-700">
                    {t("service.asylum.deadline_importance_desc")}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Exceptions */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t("service.asylum.exceptions_title")}
            </h3>
            <p className="text-gray-600 mb-6">{t("service.asylum.exceptions_desc")}</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-amber-200">
                <CardContent className="p-6">
                  <div className="p-2 bg-amber-100 rounded-lg w-fit mb-4">
                    <RefreshCw className="h-6 w-6 text-amber-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    {t("service.asylum.exception_changed")}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {t("service.asylum.exception_changed_desc")}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-amber-200">
                <CardContent className="p-6">
                  <div className="p-2 bg-amber-100 rounded-lg w-fit mb-4">
                    <AlertTriangle className="h-6 w-6 text-amber-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    {t("service.asylum.exception_extraordinary")}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {t("service.asylum.exception_extraordinary_desc")}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-amber-200">
                <CardContent className="p-6">
                  <div className="p-2 bg-amber-100 rounded-lg w-fit mb-4">
                    <FileText className="h-6 w-6 text-amber-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    {t("service.asylum.exception_maintained")}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {t("service.asylum.exception_maintained_desc")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Asylum Process Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {t("service.asylum.process_title")}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="p-8">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {t("service.asylum.affirmative")}
                  </h3>
                  <p className="text-gray-600">
                    {t("service.asylum.affirmative_desc")}
                  </p>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-500">
                      <strong>Filed with:</strong> USCIS Asylum Office
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Timeline:</strong> Must file within 1 year of arrival
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="p-8">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {t("service.asylum.defensive")}
                  </h3>
                  <p className="text-gray-600">
                    {t("service.asylum.defensive_desc")}
                  </p>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-500">
                      <strong>Filed with:</strong> Immigration Court (EOIR)
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Context:</strong> During removal proceedings
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* BIA Appeals Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <Gavel className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                {t("service.asylum.bia_detailed_title")}
              </h2>
            </div>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {t("service.asylum.bia_detailed_desc")}
            </p>

            {/* Appeals Timeline */}
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t("service.asylum.appeal_timeline_title")}
            </h3>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30 hidden md:block" />
              
              <div className="space-y-6">
                {/* Step 1: Filing Deadline */}
                <div className="flex gap-6">
                  <div className="hidden md:flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl z-10">
                      30
                    </div>
                    <span className="text-xs text-gray-500 mt-1">days</span>
                  </div>
                  <Card className="flex-1">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-5 w-5 text-primary md:hidden" />
                        <h4 className="font-bold text-gray-900">
                          {t("service.asylum.appeal_deadline")}
                        </h4>
                      </div>
                      <p className="text-gray-600">
                        {t("service.asylum.appeal_deadline_desc")}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Step 2: Appeal Brief */}
                <div className="flex gap-6">
                  <div className="hidden md:flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl z-10">
                      21
                    </div>
                    <span className="text-xs text-gray-500 mt-1">days</span>
                  </div>
                  <Card className="flex-1">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-5 w-5 text-primary md:hidden" />
                        <h4 className="font-bold text-gray-900">
                          {t("service.asylum.appeal_brief")}
                        </h4>
                      </div>
                      <p className="text-gray-600">
                        {t("service.asylum.appeal_brief_desc")}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Step 3: BIA Decision */}
                <div className="flex gap-6">
                  <div className="hidden md:flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm z-10">
                      6-12<br/>mo
                    </div>
                  </div>
                  <Card className="flex-1">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Scale className="h-5 w-5 text-primary md:hidden" />
                        <h4 className="font-bold text-gray-900">
                          {t("service.asylum.appeal_decision")}
                        </h4>
                      </div>
                      <p className="text-gray-600">
                        {t("service.asylum.appeal_decision_desc")}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appeal Options Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {t("service.asylum.appeal_options_title")}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 border-green-200 bg-green-50/50">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {t("service.asylum.appeal_option_reverse")}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t("service.asylum.appeal_option_reverse_desc")}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-blue-200 bg-blue-50/50">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                    <RefreshCw className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {t("service.asylum.appeal_option_remand")}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t("service.asylum.appeal_option_remand_desc")}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-gray-200 bg-gray-50/50">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-gray-100 rounded-full w-fit mx-auto mb-4">
                    <XCircle className="h-8 w-8 text-gray-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {t("service.asylum.appeal_option_affirm")}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t("service.asylum.appeal_option_affirm_desc")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Federal Appeals Section */}
      <section className="py-16 bg-primary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                {t("service.asylum.federal_appeals_title")}
              </h2>
            </div>
            
            <Card>
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {t("service.asylum.federal_appeals_desc")}
                </p>
                
                <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                  <Clock className="h-10 w-10 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900">30-Day Deadline</p>
                    <p className="text-gray-600">You must file your Petition for Review within 30 days of the BIA's final decision.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t("service.asylum.cta")}
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Time is critical in asylum cases. Contact us today for a consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/appointments">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Schedule Consultation
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="tel:1-844-423-3733">
                <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary">
                  Call 1-844-423-3733
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
