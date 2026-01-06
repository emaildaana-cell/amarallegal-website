import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Download, 
  FileText, 
  CheckSquare, 
  BookOpen,
  Scale,
  Users,
  Shield,
  Heart,
  ExternalLink,
  Search,
  Filter,
  X
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";

interface DownloadItem {
  title: string;
  titleEs: string;
  titlePt: string;
  description: string;
  descriptionEs: string;
  descriptionPt: string;
  icon: React.ElementType;
  category: string;
  categoryEs: string;
  categoryPt: string;
  fileType: string;
  comingSoon?: boolean;
  downloadUrl?: string;
  interactiveUrl?: string;
}

const downloads: DownloadItem[] = [
  {
    title: "Bond Hearing Preparation Checklist",
    titleEs: "Lista de Verificación para Audiencia de Fianza",
    titlePt: "Lista de Verificação para Audiência de Fiança",
    description: "A comprehensive checklist of documents and evidence to gather before your immigration bond hearing.",
    descriptionEs: "Una lista completa de documentos y evidencia para reunir antes de su audiencia de fianza de inmigración.",
    descriptionPt: "Uma lista abrangente de documentos e evidências para reunir antes da sua audiência de fiança de imigração.",
    icon: CheckSquare,
    category: "Immigration Bonds",
    categoryEs: "Fianzas de Inmigración",
    categoryPt: "Fianças de Imigração",
    fileType: "PDF",
    downloadUrl: "/downloads/bond-hearing-checklist.pdf"
  },
  {
    title: "Know Your Rights Card (English)",
    titleEs: "Tarjeta Conozca Sus Derechos (Inglés)",
    titlePt: "Cartão Conheça Seus Direitos (Inglês)",
    description: "A pocket-sized card outlining your constitutional rights during an encounter with immigration enforcement.",
    descriptionEs: "Una tarjeta de bolsillo que describe sus derechos constitucionales durante un encuentro con agentes de inmigración.",
    descriptionPt: "Um cartão de bolso descrevendo seus direitos constitucionais durante um encontro com agentes de imigração.",
    icon: Shield,
    category: "Know Your Rights",
    categoryEs: "Conozca Sus Derechos",
    categoryPt: "Conheça Seus Direitos",
    fileType: "PDF",
    downloadUrl: "/downloads/know-your-rights-en.pdf"
  },
  {
    title: "Know Your Rights Card (Spanish)",
    titleEs: "Tarjeta Conozca Sus Derechos (Español)",
    titlePt: "Cartão Conheça Seus Direitos (Espanhol)",
    description: "Spanish version of the Know Your Rights card for ICE encounters.",
    descriptionEs: "Versión en español de la tarjeta Conozca Sus Derechos para encuentros con ICE.",
    descriptionPt: "Versão em espanhol do cartão Conheça Seus Direitos para encontros com ICE.",
    icon: Shield,
    category: "Know Your Rights",
    categoryEs: "Conozca Sus Derechos",
    categoryPt: "Conheça Seus Direitos",
    fileType: "PDF",
    downloadUrl: "/downloads/know-your-rights-es.pdf"
  },
  {
    title: "Know Your Rights Card (Portuguese)",
    titleEs: "Tarjeta Conozca Sus Derechos (Portugués)",
    titlePt: "Cartão Conheça Seus Direitos (Português)",
    description: "Portuguese version of the Know Your Rights card for ICE encounters.",
    descriptionEs: "Versión en portugués de la tarjeta Conozca Sus Derechos para encuentros con ICE.",
    descriptionPt: "Versão em português do cartão Conheça Seus Direitos para encontros com ICE.",
    icon: Shield,
    category: "Know Your Rights",
    categoryEs: "Conozca Sus Derechos",
    categoryPt: "Conheça Seus Direitos",
    fileType: "PDF",
    downloadUrl: "/downloads/know-your-rights-pt.pdf"
  },
  {
    title: "Sponsor Responsibilities Guide",
    titleEs: "Guía de Responsabilidades del Patrocinador",
    titlePt: "Guia de Responsabilidades do Patrocinador",
    description: "Everything a potential court sponsor needs to know about their responsibilities, requirements, and what to expect.",
    descriptionEs: "Todo lo que un posible patrocinador judicial necesita saber sobre sus responsabilidades, requisitos y qué esperar.",
    descriptionPt: "Tudo o que um potencial patrocinador judicial precisa saber sobre suas responsabilidades, requisitos e o que esperar.",
    icon: Users,
    category: "Immigration Bonds",
    categoryEs: "Fianzas de Inmigración",
    categoryPt: "Fianças de Imigração",
    fileType: "PDF",
    downloadUrl: "/downloads/sponsor-responsibilities-guide.pdf"
  },
  {
    title: "Family Emergency Plan Template",
    titleEs: "Plantilla de Plan de Emergencia Familiar",
    titlePt: "Modelo de Plano de Emergência Familiar",
    description: "A fillable template to help families prepare for immigration enforcement, including emergency contacts, children's information, document locations, and know your rights information.",
    descriptionEs: "Una plantilla rellenable para ayudar a las familias a prepararse para la aplicación de inmigración, incluyendo contactos de emergencia, información de los niños, ubicación de documentos e información sobre sus derechos.",
    descriptionPt: "Um modelo preenchível para ajudar as famílias a se prepararem para a aplicação de imigração, incluindo contatos de emergência, informações das crianças, localização de documentos e informações sobre seus direitos.",
    icon: Heart,
    category: "Family Preparedness",
    categoryEs: "Preparación Familiar",
    categoryPt: "Preparação Familiar",
    fileType: "PDF (Fillable)",
    downloadUrl: "/downloads/family-emergency-plan.pdf",
    interactiveUrl: "/family-emergency-plan"
  },
  {
    title: "Immigration Court Process Overview",
    titleEs: "Resumen del Proceso de Corte de Inmigración",
    titlePt: "Visão Geral do Processo do Tribunal de Imigração",
    description: "A visual guide explaining the immigration court process from start to finish.",
    descriptionEs: "Una guía visual que explica el proceso del tribunal de inmigración de principio a fin.",
    descriptionPt: "Um guia visual explicando o processo do tribunal de imigração do início ao fim.",
    icon: Scale,
    category: "Court Process",
    categoryEs: "Proceso Judicial",
    categoryPt: "Processo Judicial",
    fileType: "PDF",
    comingSoon: true
  },
  {
    title: "Document Gathering Guide",
    titleEs: "Guía de Recopilación de Documentos",
    titlePt: "Guia de Coleta de Documentos",
    description: "A guide to help you identify and organize the documents needed for various immigration applications.",
    descriptionEs: "Una guía para ayudarle a identificar y organizar los documentos necesarios para varias solicitudes de inmigración.",
    descriptionPt: "Um guia para ajudá-lo a identificar e organizar os documentos necessários para várias solicitações de imigração.",
    icon: FileText,
    category: "General Immigration",
    categoryEs: "Inmigración General",
    categoryPt: "Imigração Geral",
    fileType: "PDF",
    comingSoon: true
  },
  {
    title: "Asylum Application Checklist",
    titleEs: "Lista de Verificación de Solicitud de Asilo",
    titlePt: "Lista de Verificação de Pedido de Asilo",
    description: "Step-by-step checklist for preparing your asylum application and supporting documentation.",
    descriptionEs: "Lista de verificación paso a paso para preparar su solicitud de asilo y documentación de apoyo.",
    descriptionPt: "Lista de verificação passo a passo para preparar seu pedido de asilo e documentação de apoio.",
    icon: BookOpen,
    category: "Asylum",
    categoryEs: "Asilo",
    categoryPt: "Asilo",
    fileType: "PDF",
    comingSoon: true
  },
  {
    title: "Naturalization Study Guide",
    titleEs: "Guía de Estudio para Naturalización",
    titlePt: "Guia de Estudo para Naturalização",
    description: "Study materials for the U.S. citizenship test, including civics questions and English practice.",
    descriptionEs: "Materiales de estudio para el examen de ciudadanía de EE.UU., incluyendo preguntas de civismo y práctica de inglés.",
    descriptionPt: "Materiais de estudo para o teste de cidadania dos EUA, incluindo questões de civismo e prática de inglês.",
    icon: BookOpen,
    category: "Citizenship",
    categoryEs: "Ciudadanía",
    categoryPt: "Cidadania",
    fileType: "PDF",
    comingSoon: true
  }
];

const translations = {
  en: {
    pageTitle: "Downloadable Resources",
    pageSubtitle: "Free guides, checklists, and informational documents to help you navigate the immigration process.",
    searchPlaceholder: "Search documents...",
    allCategories: "All Categories",
    filterBy: "Filter by category",
    noResults: "No documents found",
    noResultsDesc: "Try adjusting your search terms or clearing the filters.",
    clearFilters: "Clear Filters",
    comingSoon: "Coming Soon",
    createOnline: "Create Online",
    download: "Download",
    needResource: "Need a Specific Resource?",
    needResourceDesc: "If you need information on a topic not covered by our current resources, let us know. We're constantly expanding our library based on client needs.",
    requestResource: "Request a Resource",
    govForms: "Official Government Forms",
    govFormsDesc: "Links to official USCIS and EOIR forms and instructions.",
    disclaimer: "These resources are provided for informational purposes only and do not constitute legal advice. Immigration law is complex and constantly changing. For advice specific to your situation, please consult with a qualified immigration attorney.",
    needHelp: "Need Legal Assistance?",
    needHelpDesc: "While these resources can help you understand the process, nothing replaces personalized legal advice. Schedule a consultation to discuss your case.",
    consultation: "Schedule Consultation",
    callUs: "Call Us Now"
  },
  es: {
    pageTitle: "Recursos Descargables",
    pageSubtitle: "Guías gratuitas, listas de verificación y documentos informativos para ayudarle a navegar el proceso de inmigración.",
    searchPlaceholder: "Buscar documentos...",
    allCategories: "Todas las Categorías",
    filterBy: "Filtrar por categoría",
    noResults: "No se encontraron documentos",
    noResultsDesc: "Intente ajustar sus términos de búsqueda o limpiar los filtros.",
    clearFilters: "Limpiar Filtros",
    comingSoon: "Próximamente",
    createOnline: "Crear en Línea",
    download: "Descargar",
    needResource: "¿Necesita un Recurso Específico?",
    needResourceDesc: "Si necesita información sobre un tema no cubierto por nuestros recursos actuales, háganoslo saber. Estamos constantemente expandiendo nuestra biblioteca según las necesidades de los clientes.",
    requestResource: "Solicitar un Recurso",
    govForms: "Formularios Oficiales del Gobierno",
    govFormsDesc: "Enlaces a formularios e instrucciones oficiales de USCIS y EOIR.",
    disclaimer: "Estos recursos se proporcionan solo con fines informativos y no constituyen asesoramiento legal. La ley de inmigración es compleja y cambia constantemente. Para obtener asesoramiento específico para su situación, consulte con un abogado de inmigración calificado.",
    needHelp: "¿Necesita Asistencia Legal?",
    needHelpDesc: "Si bien estos recursos pueden ayudarle a comprender el proceso, nada reemplaza el asesoramiento legal personalizado. Programe una consulta para discutir su caso.",
    consultation: "Programar Consulta",
    callUs: "Llámenos Ahora"
  },
  pt: {
    pageTitle: "Recursos para Download",
    pageSubtitle: "Guias gratuitos, listas de verificação e documentos informativos para ajudá-lo a navegar pelo processo de imigração.",
    searchPlaceholder: "Pesquisar documentos...",
    allCategories: "Todas as Categorias",
    filterBy: "Filtrar por categoria",
    noResults: "Nenhum documento encontrado",
    noResultsDesc: "Tente ajustar seus termos de pesquisa ou limpar os filtros.",
    clearFilters: "Limpar Filtros",
    comingSoon: "Em Breve",
    createOnline: "Criar Online",
    download: "Baixar",
    needResource: "Precisa de um Recurso Específico?",
    needResourceDesc: "Se você precisa de informações sobre um tópico não coberto por nossos recursos atuais, nos avise. Estamos constantemente expandindo nossa biblioteca com base nas necessidades dos clientes.",
    requestResource: "Solicitar um Recurso",
    govForms: "Formulários Oficiais do Governo",
    govFormsDesc: "Links para formulários e instruções oficiais do USCIS e EOIR.",
    disclaimer: "Estes recursos são fornecidos apenas para fins informativos e não constituem aconselhamento jurídico. A lei de imigração é complexa e está em constante mudança. Para aconselhamento específico para sua situação, consulte um advogado de imigração qualificado.",
    needHelp: "Precisa de Assistência Jurídica?",
    needHelpDesc: "Embora esses recursos possam ajudá-lo a entender o processo, nada substitui o aconselhamento jurídico personalizado. Agende uma consulta para discutir seu caso.",
    consultation: "Agendar Consulta",
    callUs: "Ligue Agora"
  }
};

export default function Downloads() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Get unique categories based on language
  const categories = useMemo(() => {
    const cats = downloads.map(d => {
      if (language === 'es') return d.categoryEs;
      if (language === 'pt') return d.categoryPt;
      return d.category;
    });
    return Array.from(new Set(cats));
  }, [language]);

  // Filter downloads based on search and category
  const filteredDownloads = useMemo(() => {
    return downloads.filter(download => {
      const title = language === 'es' ? download.titleEs : language === 'pt' ? download.titlePt : download.title;
      const description = language === 'es' ? download.descriptionEs : language === 'pt' ? download.descriptionPt : download.description;
      const category = language === 'es' ? download.categoryEs : language === 'pt' ? download.categoryPt : download.category;
      
      const matchesSearch = searchQuery === "" || 
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, language]);

  // Group filtered downloads by category
  const groupedDownloads = useMemo(() => {
    const groups: { [key: string]: DownloadItem[] } = {};
    filteredDownloads.forEach(download => {
      const category = language === 'es' ? download.categoryEs : language === 'pt' ? download.categoryPt : download.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(download);
    });
    return groups;
  }, [filteredDownloads, language]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "all";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <SEO 
        title={t.pageTitle}
        description="Download free immigration guides, checklists, and resources. Prepare for bond hearings, understand your rights, and gather required documents."
        keywords="immigration downloads, legal guides, bond checklist, immigration forms"
        canonicalUrl="/downloads"
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
              <Download className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t.pageTitle}
            </h1>
            <p className="text-xl text-white/80">
              {t.pageSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 border-b bg-white sticky top-0 z-20 shadow-sm">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {/* Category Filter */}
              <div className="w-full md:w-64">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="h-12">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder={t.filterBy} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.allCategories}</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="h-12 gap-2"
                >
                  <X className="w-4 h-4" />
                  {t.clearFilters}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Downloads Grid */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            {filteredDownloads.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-6">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t.noResults}</h3>
                <p className="text-muted-foreground mb-6">{t.noResultsDesc}</p>
                <Button variant="outline" onClick={clearFilters}>
                  {t.clearFilters}
                </Button>
              </motion.div>
            ) : (
              Object.entries(groupedDownloads).map(([category, items], categoryIndex) => (
                <div key={category} className="mb-12">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                    className="text-2xl font-bold mb-6 pb-2 border-b"
                  >
                    {category}
                  </motion.h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {items.map((download, index) => {
                      const Icon = download.icon;
                      const title = language === 'es' ? download.titleEs : language === 'pt' ? download.titlePt : download.title;
                      const description = language === 'es' ? download.descriptionEs : language === 'pt' ? download.descriptionPt : download.description;
                      
                      return (
                        <motion.div
                          key={download.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                          className={`bg-white rounded-xl border-2 p-6 ${
                            download.comingSoon 
                              ? "border-slate-100 opacity-60" 
                              : "border-slate-100 hover:border-primary/20 hover:shadow-md transition-all"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                              download.comingSoon ? "bg-slate-100" : "bg-primary/10"
                            }`}>
                              <Icon className={`w-6 h-6 ${download.comingSoon ? "text-slate-400" : "text-primary"}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-slate-900">
                                  {title}
                                </h3>
                                {download.comingSoon && (
                                  <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                                    {t.comingSoon}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-slate-600 mb-4">
                                {description}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                  {download.fileType}
                                </span>
                                {!download.comingSoon && (
                                  <div className="flex gap-2">
                                    {download.interactiveUrl && (
                                      <Link href={download.interactiveUrl}>
                                        <Button 
                                          size="sm" 
                                          className="gap-2"
                                        >
                                          <ExternalLink className="w-4 h-4" />
                                          {t.createOnline}
                                        </Button>
                                      </Link>
                                    )}
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      className="gap-2"
                                      asChild
                                    >
                                      {download.downloadUrl ? (
                                        <a href={download.downloadUrl} download>
                                          <Download className="w-4 h-4" />
                                          PDF
                                        </a>
                                      ) : (
                                        <span onClick={() => alert("This resource is coming soon. Please contact us for more information.")}>
                                          <Download className="w-4 h-4" />
                                          {t.download}
                                        </span>
                                      )}
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Request Custom Resources */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">{t.needResource}</h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t.needResourceDesc}
              </p>
              <Link href="/contact">
                <Button size="lg">
                  {t.requestResource}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              {t.govForms}
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              {t.govFormsDesc}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "USCIS Forms", href: "https://www.uscis.gov/forms", description: language === 'es' ? "Todos los formularios de USCIS" : language === 'pt' ? "Todos os formulários do USCIS" : "All USCIS immigration forms" },
                { title: "EOIR Forms", href: "https://www.justice.gov/eoir/forms", description: language === 'es' ? "Formularios de corte de inmigración" : language === 'pt' ? "Formulários do tribunal de imigração" : "Immigration court forms" },
                { title: language === 'es' ? "Tarifas" : language === 'pt' ? "Taxas" : "Fee Schedule", href: "https://www.uscis.gov/fees", description: language === 'es' ? "Tarifas actuales de USCIS" : language === 'pt' ? "Taxas atuais do USCIS" : "Current USCIS filing fees" },
                { title: language === 'es' ? "Tiempos de Procesamiento" : language === 'pt' ? "Tempos de Processamento" : "Processing Times", href: "https://egov.uscis.gov/processing-times/", description: language === 'es' ? "Verificar tiempos de procesamiento" : language === 'pt' ? "Verificar tempos de processamento" : "Check processing times" },
                { title: language === 'es' ? "Estado del Caso" : language === 'pt' ? "Status do Caso" : "Case Status", href: "https://egov.uscis.gov/casestatus/landing.do", description: language === 'es' ? "Rastrear su caso" : language === 'pt' ? "Rastrear seu caso" : "Track your case" },
                { title: language === 'es' ? "Localizador de Cortes" : language === 'pt' ? "Localizador de Tribunais" : "Court Locator", href: "https://www.justice.gov/eoir/eoir-immigration-court-listing", description: language === 'es' ? "Encontrar cortes de inmigración" : language === 'pt' ? "Encontrar tribunais de imigração" : "Find immigration courts" }
              ].map((link, index) => (
                <motion.a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group bg-white rounded-lg border p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors">
                      {link.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm text-slate-600">{link.description}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-100 rounded-xl p-6 text-center">
              <p className="text-sm text-slate-600">
                <strong>{language === 'es' ? 'Aviso Legal:' : language === 'pt' ? 'Aviso Legal:' : 'Disclaimer:'}</strong> {t.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{t.needHelp}</h2>
            <p className="text-xl text-white/80 mb-8">
              {t.needHelpDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultation">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  {t.consultation}
                </Button>
              </Link>
              <a href="tel:1-844-423-3733">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary">
                  {t.callUs}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
