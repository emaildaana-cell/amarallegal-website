import { useState, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { 
  Printer, 
  Download, 
  Shield, 
  Home, 
  Phone, 
  FileText, 
  XCircle, 
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Scissors,
  CreditCard
} from "lucide-react";

const translations = {
  en: {
    title: "Know Your Rights",
    subtitle: "Printable Card for ICE Encounters",
    description: "Print this wallet-sized card and keep it with you at all times. It contains essential information about your constitutional rights during encounters with immigration officers.",
    
    printCard: "Print Card",
    downloadPDF: "Download PDF",
    printInstructions: "Print Instructions",
    printStep1: "Click 'Print Card' button above",
    printStep2: "Select 'Actual Size' or '100%' in print settings",
    printStep3: "Print on cardstock for durability",
    printStep4: "Cut along the dotted lines",
    printStep5: "Fold in half to create wallet card",
    
    cardFront: "Card Front",
    cardBack: "Card Back",
    
    // Card Front Content
    knowYourRightsTitle: "KNOW YOUR RIGHTS",
    withIce: "WITH ICE",
    rightsSummary: "You have constitutional rights regardless of immigration status",
    
    right1Title: "RIGHT TO REMAIN SILENT",
    right1Text: "You do not have to answer questions about where you were born, your immigration status, or how you entered the U.S.",
    
    right2Title: "RIGHT TO REFUSE ENTRY",
    right2Text: "ICE cannot enter your home without a judicial warrant signed by a judge. An ICE administrative warrant is NOT enough.",
    
    right3Title: "RIGHT TO AN ATTORNEY",
    right3Text: "You have the right to speak with a lawyer before answering any questions or signing any documents.",
    
    right4Title: "RIGHT TO NOT SIGN",
    right4Text: "Do not sign any documents without first speaking to an attorney. Signing could waive your rights.",
    
    // Card Back Content
    whatToSay: "WHAT TO SAY",
    sayThis: "Say This:",
    phrase1: "\"I am exercising my right to remain silent.\"",
    phrase2: "\"I do not consent to a search.\"",
    phrase3: "\"I want to speak with a lawyer.\"",
    phrase4: "\"Am I free to leave?\"",
    
    doNotTitle: "DO NOT",
    doNot1: "Run or resist",
    doNot2: "Lie or provide false documents",
    doNot3: "Sign anything without a lawyer",
    doNot4: "Open the door without a judicial warrant",
    
    emergencyContact: "EMERGENCY CONTACT",
    attorney: "Attorney:",
    hotline: "Immigration Hotline:",
    
    // Additional Info
    additionalInfo: "Additional Information",
    judicialVsAdmin: "Judicial Warrant vs. ICE Warrant",
    judicialWarrant: "Judicial Warrant",
    judicialWarrantDesc: "Signed by a JUDGE, allows entry into home",
    iceWarrant: "ICE Administrative Warrant",
    iceWarrantDesc: "Signed by ICE officer, does NOT allow home entry",
    
    ifArrested: "If You Are Arrested",
    ifArrestedStep1: "Stay calm and do not resist",
    ifArrestedStep2: "State clearly: 'I am exercising my right to remain silent'",
    ifArrestedStep3: "Ask for a lawyer immediately",
    ifArrestedStep4: "Do not sign any documents",
    ifArrestedStep5: "Memorize your A-Number when assigned",
    ifArrestedStep6: "Contact family as soon as possible",
    
    forFamilies: "For Family Members",
    forFamiliesText: "If a loved one is detained, get their A-Number and use the ICE Detainee Locator at locator.ice.gov to find them. Contact an immigration attorney immediately.",
    
    disclaimer: "This card provides general information only and is not legal advice. Every situation is different. Consult with an immigration attorney for advice specific to your case.",
    
    backToResources: "Back to Resources",
    relatedResources: "Related Resources",
    detentionProcess: "ICE Detention Process",
    detentionGuide: "Detention Centers",
    emergencyPlan: "Family Emergency Plan"
  },
  es: {
    title: "Conozca Sus Derechos",
    subtitle: "Tarjeta Imprimible para Encuentros con ICE",
    description: "Imprima esta tarjeta de tamaño billetera y llévela consigo en todo momento. Contiene información esencial sobre sus derechos constitucionales durante encuentros con oficiales de inmigración.",
    
    printCard: "Imprimir Tarjeta",
    downloadPDF: "Descargar PDF",
    printInstructions: "Instrucciones de Impresión",
    printStep1: "Haga clic en el botón 'Imprimir Tarjeta' arriba",
    printStep2: "Seleccione 'Tamaño Real' o '100%' en la configuración de impresión",
    printStep3: "Imprima en cartulina para mayor durabilidad",
    printStep4: "Corte a lo largo de las líneas punteadas",
    printStep5: "Doble por la mitad para crear la tarjeta de billetera",
    
    cardFront: "Frente de la Tarjeta",
    cardBack: "Reverso de la Tarjeta",
    
    knowYourRightsTitle: "CONOZCA SUS DERECHOS",
    withIce: "CON ICE",
    rightsSummary: "Usted tiene derechos constitucionales sin importar su estatus migratorio",
    
    right1Title: "DERECHO A GUARDAR SILENCIO",
    right1Text: "No tiene que responder preguntas sobre dónde nació, su estatus migratorio, o cómo entró a EE.UU.",
    
    right2Title: "DERECHO A NEGAR ENTRADA",
    right2Text: "ICE no puede entrar a su casa sin una orden judicial firmada por un juez. Una orden administrativa de ICE NO es suficiente.",
    
    right3Title: "DERECHO A UN ABOGADO",
    right3Text: "Tiene derecho a hablar con un abogado antes de responder preguntas o firmar documentos.",
    
    right4Title: "DERECHO A NO FIRMAR",
    right4Text: "No firme ningún documento sin hablar primero con un abogado. Firmar podría renunciar a sus derechos.",
    
    whatToSay: "QUÉ DECIR",
    sayThis: "Diga Esto:",
    phrase1: "\"Estoy ejerciendo mi derecho a guardar silencio.\"",
    phrase2: "\"No doy consentimiento para un registro.\"",
    phrase3: "\"Quiero hablar con un abogado.\"",
    phrase4: "\"¿Soy libre de irme?\"",
    
    doNotTitle: "NO HAGA",
    doNot1: "Correr o resistirse",
    doNot2: "Mentir o dar documentos falsos",
    doNot3: "Firmar nada sin un abogado",
    doNot4: "Abrir la puerta sin orden judicial",
    
    emergencyContact: "CONTACTO DE EMERGENCIA",
    attorney: "Abogado:",
    hotline: "Línea de Inmigración:",
    
    additionalInfo: "Información Adicional",
    judicialVsAdmin: "Orden Judicial vs. Orden de ICE",
    judicialWarrant: "Orden Judicial",
    judicialWarrantDesc: "Firmada por un JUEZ, permite entrada al hogar",
    iceWarrant: "Orden Administrativa de ICE",
    iceWarrantDesc: "Firmada por oficial de ICE, NO permite entrada al hogar",
    
    ifArrested: "Si Es Arrestado",
    ifArrestedStep1: "Mantenga la calma y no se resista",
    ifArrestedStep2: "Diga claramente: 'Estoy ejerciendo mi derecho a guardar silencio'",
    ifArrestedStep3: "Pida un abogado inmediatamente",
    ifArrestedStep4: "No firme ningún documento",
    ifArrestedStep5: "Memorice su A-Number cuando se lo asignen",
    ifArrestedStep6: "Contacte a su familia lo antes posible",
    
    forFamilies: "Para Familiares",
    forFamiliesText: "Si un ser querido es detenido, obtenga su A-Number y use el Localizador de Detenidos de ICE en locator.ice.gov para encontrarlo. Contacte a un abogado de inmigración inmediatamente.",
    
    disclaimer: "Esta tarjeta proporciona información general solamente y no es asesoramiento legal. Cada situación es diferente. Consulte con un abogado de inmigración para consejos específicos a su caso.",
    
    backToResources: "Volver a Recursos",
    relatedResources: "Recursos Relacionados",
    detentionProcess: "Proceso de Detención de ICE",
    detentionGuide: "Centros de Detención",
    emergencyPlan: "Plan de Emergencia Familiar"
  },
  pt: {
    title: "Conheça Seus Direitos",
    subtitle: "Cartão Imprimível para Encontros com ICE",
    description: "Imprima este cartão de tamanho carteira e leve-o consigo sempre. Ele contém informações essenciais sobre seus direitos constitucionais durante encontros com oficiais de imigração.",
    
    printCard: "Imprimir Cartão",
    downloadPDF: "Baixar PDF",
    printInstructions: "Instruções de Impressão",
    printStep1: "Clique no botão 'Imprimir Cartão' acima",
    printStep2: "Selecione 'Tamanho Real' ou '100%' nas configurações de impressão",
    printStep3: "Imprima em papel cartão para maior durabilidade",
    printStep4: "Corte ao longo das linhas pontilhadas",
    printStep5: "Dobre ao meio para criar o cartão de carteira",
    
    cardFront: "Frente do Cartão",
    cardBack: "Verso do Cartão",
    
    knowYourRightsTitle: "CONHEÇA SEUS DIREITOS",
    withIce: "COM ICE",
    rightsSummary: "Você tem direitos constitucionais independentemente do status imigratório",
    
    right1Title: "DIREITO DE PERMANECER EM SILÊNCIO",
    right1Text: "Você não precisa responder perguntas sobre onde nasceu, seu status imigratório, ou como entrou nos EUA.",
    
    right2Title: "DIREITO DE RECUSAR ENTRADA",
    right2Text: "O ICE não pode entrar em sua casa sem um mandado judicial assinado por um juiz. Um mandado administrativo do ICE NÃO é suficiente.",
    
    right3Title: "DIREITO A UM ADVOGADO",
    right3Text: "Você tem o direito de falar com um advogado antes de responder perguntas ou assinar documentos.",
    
    right4Title: "DIREITO DE NÃO ASSINAR",
    right4Text: "Não assine nenhum documento sem falar primeiro com um advogado. Assinar pode renunciar seus direitos.",
    
    whatToSay: "O QUE DIZER",
    sayThis: "Diga Isso:",
    phrase1: "\"Estou exercendo meu direito de permanecer em silêncio.\"",
    phrase2: "\"Não consinto com uma busca.\"",
    phrase3: "\"Quero falar com um advogado.\"",
    phrase4: "\"Estou livre para ir?\"",
    
    doNotTitle: "NÃO FAÇA",
    doNot1: "Correr ou resistir",
    doNot2: "Mentir ou fornecer documentos falsos",
    doNot3: "Assinar nada sem um advogado",
    doNot4: "Abrir a porta sem mandado judicial",
    
    emergencyContact: "CONTATO DE EMERGÊNCIA",
    attorney: "Advogado:",
    hotline: "Linha de Imigração:",
    
    additionalInfo: "Informações Adicionais",
    judicialVsAdmin: "Mandado Judicial vs. Mandado do ICE",
    judicialWarrant: "Mandado Judicial",
    judicialWarrantDesc: "Assinado por um JUIZ, permite entrada na casa",
    iceWarrant: "Mandado Administrativo do ICE",
    iceWarrantDesc: "Assinado por oficial do ICE, NÃO permite entrada na casa",
    
    ifArrested: "Se Você For Preso",
    ifArrestedStep1: "Mantenha a calma e não resista",
    ifArrestedStep2: "Diga claramente: 'Estou exercendo meu direito de permanecer em silêncio'",
    ifArrestedStep3: "Peça um advogado imediatamente",
    ifArrestedStep4: "Não assine nenhum documento",
    ifArrestedStep5: "Memorize seu A-Number quando for atribuído",
    ifArrestedStep6: "Entre em contato com a família o mais rápido possível",
    
    forFamilies: "Para Familiares",
    forFamiliesText: "Se um ente querido for detido, obtenha o A-Number dele e use o Localizador de Detidos do ICE em locator.ice.gov para encontrá-lo. Entre em contato com um advogado de imigração imediatamente.",
    
    disclaimer: "Este cartão fornece apenas informações gerais e não é aconselhamento jurídico. Cada situação é diferente. Consulte um advogado de imigração para conselhos específicos ao seu caso.",
    
    backToResources: "Voltar aos Recursos",
    relatedResources: "Recursos Relacionados",
    detentionProcess: "Processo de Detenção do ICE",
    detentionGuide: "Centros de Detenção",
    emergencyPlan: "Plano de Emergência Familiar"
  }
};

export default function KnowYourRights() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;
  const printRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("front");

  const handlePrint = () => {
    const printContent = document.getElementById('printable-cards');
    if (printContent) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Know Your Rights Card</title>
            <style>
              @page {
                size: letter;
                margin: 0.5in;
              }
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
              }
              .print-container {
                display: flex;
                flex-direction: column;
                gap: 20px;
              }
              .card {
                width: 3.5in;
                height: 2in;
                border: 2px dashed #ccc;
                border-radius: 8px;
                padding: 12px;
                box-sizing: border-box;
                page-break-inside: avoid;
              }
              .card-front {
                background: linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%);
                color: white;
              }
              .card-back {
                background: white;
                color: #1e3a5f;
                border: 2px solid #1e3a5f;
              }
              .card-title {
                font-size: 14px;
                font-weight: bold;
                text-align: center;
                margin-bottom: 8px;
                text-transform: uppercase;
              }
              .card-subtitle {
                font-size: 10px;
                text-align: center;
                margin-bottom: 8px;
                opacity: 0.9;
              }
              .rights-list {
                font-size: 8px;
                line-height: 1.3;
              }
              .right-item {
                margin-bottom: 4px;
              }
              .right-title {
                font-weight: bold;
                font-size: 7px;
              }
              .phrases {
                font-size: 8px;
                font-style: italic;
              }
              .donot-list {
                font-size: 7px;
                color: #dc2626;
              }
              .contact-info {
                font-size: 8px;
                margin-top: 8px;
                padding-top: 8px;
                border-top: 1px solid currentColor;
              }
              .cut-line {
                text-align: center;
                font-size: 10px;
                color: #999;
                margin: 10px 0;
              }
              .instructions {
                margin-top: 20px;
                font-size: 12px;
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="print-container">
              <div class="card card-front">
                <div class="card-title">${t.knowYourRightsTitle}</div>
                <div class="card-subtitle">${t.withIce}</div>
                <div class="rights-list">
                  <div class="right-item">
                    <span class="right-title">✓ ${t.right1Title}:</span> ${t.right1Text}
                  </div>
                  <div class="right-item">
                    <span class="right-title">✓ ${t.right2Title}:</span> ${t.right2Text}
                  </div>
                  <div class="right-item">
                    <span class="right-title">✓ ${t.right3Title}:</span> ${t.right3Text}
                  </div>
                  <div class="right-item">
                    <span class="right-title">✓ ${t.right4Title}:</span> ${t.right4Text}
                  </div>
                </div>
              </div>
              
              <p class="cut-line">✂ - - - - - - - - - - - - - - - - - - - - - - - - - - - ✂</p>
              
              <div class="card card-back">
                <div class="card-title" style="color: #1e3a5f;">${t.whatToSay}</div>
                <div class="phrases">
                  <div>${t.phrase1}</div>
                  <div>${t.phrase2}</div>
                  <div>${t.phrase3}</div>
                  <div>${t.phrase4}</div>
                </div>
                <div style="margin-top: 8px;">
                  <strong style="color: #dc2626; font-size: 8px;">${t.doNotTitle}:</strong>
                  <div class="donot-list">
                    ✗ ${t.doNot1} | ✗ ${t.doNot2} | ✗ ${t.doNot3} | ✗ ${t.doNot4}
                  </div>
                </div>
                <div class="contact-info">
                  <strong>${t.emergencyContact}</strong><br>
                  ${t.attorney} Amaral & Associates: 1-844-423-3733<br>
                  ${t.hotline} 1-844-423-3733
                </div>
              </div>
              
              <div class="instructions">
                <strong>${t.printInstructions}:</strong><br>
                1. ${t.printStep3}<br>
                2. ${t.printStep4}<br>
                3. ${t.printStep5}
              </div>
            </div>
          </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <SEO
        title={t.title}
        description="Printable Know Your Rights card for ICE encounters. Learn your constitutional rights including the right to remain silent, refuse home entry, and speak with an attorney."
        keywords="know your rights, ICE encounter, immigration rights, constitutional rights, remain silent, refuse entry, immigration attorney"
        canonicalUrl="/know-your-rights"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] opacity-5"></div>
        <div className="container relative z-10">
          <Link href="/resources" className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-6 transition-colors">
            <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
            {t.backToResources}
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-amber-400" />
            </div>
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
              <CreditCard className="w-3 h-3 mr-1" />
              Wallet Card
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl text-slate-300 mb-2">{t.subtitle}</p>
          <p className="text-lg text-slate-400 max-w-3xl">{t.description}</p>
        </div>
      </section>

      <div className="container py-12">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button size="lg" onClick={handlePrint} className="gap-2">
            <Printer className="w-5 h-5" />
            {t.printCard}
          </Button>
          <Button size="lg" variant="outline" asChild className="gap-2">
            <a href="/downloads/know-your-rights-card.pdf" download>
              <Download className="w-5 h-5" />
              {t.downloadPDF}
            </a>
          </Button>
        </div>

        {/* Card Preview */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Card Front */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              {t.cardFront}
            </h3>
            <div className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-xl p-6 shadow-xl aspect-[1.75/1] flex flex-col">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold tracking-wide">{t.knowYourRightsTitle}</h2>
                <p className="text-sm opacity-90">{t.withIce}</p>
              </div>
              <div className="flex-1 space-y-2 text-sm">
                <div className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
                  <div>
                    <span className="font-bold">{t.right1Title}:</span> {t.right1Text}
                  </div>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
                  <div>
                    <span className="font-bold">{t.right2Title}:</span> {t.right2Text}
                  </div>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
                  <div>
                    <span className="font-bold">{t.right3Title}:</span> {t.right3Text}
                  </div>
                </div>
                <div className="flex gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
                  <div>
                    <span className="font-bold">{t.right4Title}:</span> {t.right4Text}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Back */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              {t.cardBack}
            </h3>
            <div className="bg-white border-2 border-primary rounded-xl p-6 shadow-xl aspect-[1.75/1] flex flex-col">
              <div className="text-center mb-3">
                <h2 className="text-xl font-bold text-primary">{t.whatToSay}</h2>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700 mb-2">{t.sayThis}</p>
                <div className="space-y-1 text-sm italic text-slate-600 mb-4">
                  <p>{t.phrase1}</p>
                  <p>{t.phrase2}</p>
                  <p>{t.phrase3}</p>
                  <p>{t.phrase4}</p>
                </div>
                <div className="mb-3">
                  <p className="text-sm font-bold text-red-600 mb-1">{t.doNotTitle}:</p>
                  <div className="flex flex-wrap gap-2 text-xs text-red-600">
                    <span className="flex items-center gap-1"><XCircle className="w-3 h-3" />{t.doNot1}</span>
                    <span className="flex items-center gap-1"><XCircle className="w-3 h-3" />{t.doNot2}</span>
                    <span className="flex items-center gap-1"><XCircle className="w-3 h-3" />{t.doNot3}</span>
                    <span className="flex items-center gap-1"><XCircle className="w-3 h-3" />{t.doNot4}</span>
                  </div>
                </div>
                <div className="border-t pt-2 text-xs text-slate-600">
                  <p className="font-bold">{t.emergencyContact}</p>
                  <p>{t.attorney} Amaral & Associates: 1-844-423-3733</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Print Instructions */}
        <Card className="mb-12 border-amber-200 bg-amber-50/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Scissors className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-900 mb-3">{t.printInstructions}</h3>
                <ol className="space-y-2 text-amber-800">
                  <li className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0 text-sm font-bold text-amber-800">1</span>
                    {t.printStep1}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0 text-sm font-bold text-amber-800">2</span>
                    {t.printStep2}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0 text-sm font-bold text-amber-800">3</span>
                    {t.printStep3}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0 text-sm font-bold text-amber-800">4</span>
                    {t.printStep4}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0 text-sm font-bold text-amber-800">5</span>
                    {t.printStep5}
                  </li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{t.additionalInfo}</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Judicial vs Admin Warrant */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  {t.judicialVsAdmin}
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="font-bold text-green-900">{t.judicialWarrant}</span>
                    </div>
                    <p className="text-sm text-green-800">{t.judicialWarrantDesc}</p>
                  </div>
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="font-bold text-red-900">{t.iceWarrant}</span>
                    </div>
                    <p className="text-sm text-red-800">{t.iceWarrantDesc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* If Arrested */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  {t.ifArrested}
                </h3>
                <ol className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">1</span>
                    <span className="text-slate-700">{t.ifArrestedStep1}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">2</span>
                    <span className="text-slate-700">{t.ifArrestedStep2}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">3</span>
                    <span className="text-slate-700">{t.ifArrestedStep3}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">4</span>
                    <span className="text-slate-700">{t.ifArrestedStep4}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">5</span>
                    <span className="text-slate-700">{t.ifArrestedStep5}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">6</span>
                    <span className="text-slate-700">{t.ifArrestedStep6}</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* For Families */}
        <Card className="mb-12 border-blue-200 bg-blue-50/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">{t.forFamilies}</h3>
                <p className="text-blue-800">{t.forFamiliesText}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="p-4 bg-slate-100 rounded-lg text-sm text-slate-600 mb-12">
          <p>{t.disclaimer}</p>
        </div>

        {/* Related Resources */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{t.relatedResources}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/ice-detention-process">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <FileText className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-slate-900 mb-2">{t.detentionProcess}</h3>
                  <p className="text-sm text-slate-600">Complete guide from arrest to court</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/detention-guide">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <Phone className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-slate-900 mb-2">{t.detentionGuide}</h3>
                  <p className="text-sm text-slate-600">Find ICE facilities and contact info</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/family-emergency-plan">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <Home className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-slate-900 mb-2">{t.emergencyPlan}</h3>
                  <p className="text-sm text-slate-600">Prepare your family for emergencies</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </div>

      {/* Hidden printable content */}
      <div id="printable-cards" className="hidden"></div>
    </div>
  );
}
