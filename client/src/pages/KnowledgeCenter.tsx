import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Search, BookOpen, ChevronRight, Scale, Shield, Users, Gavel, FileCheck, AlertTriangle, Clock, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";

const translations = {
  en: {
    title: "Immigration Knowledge Center",
    subtitle: "Essential guides, legal resources, and expert insights to help you navigate the U.S. immigration system with confidence.",
    tabGuides: "Legal Guides",
    tabResources: "Downloadable Resources",
    tabUpdates: "Policy Updates",
    search: "Search guides and resources...",
    readArticle: "Read Guide",
    downloadBtn: "Download",
    noResults: "No guides found matching your search.",
    newsletter: {
      title: "Stay Informed on Immigration Law",
      desc: "Subscribe to receive updates on immigration policy changes, legal insights, and important deadlines that may affect your case.",
      placeholder: "Enter your email address",
      button: "Subscribe",
      disclaimer: "We respect your privacy. Unsubscribe at any time. No spam, only valuable legal updates."
    },
    guides: [
      {
        id: 1,
        title: "Understanding Immigration Bond Hearings",
        category: "Bond & Detention",
        description: "A comprehensive guide to immigration bond hearings, including the Matter of Guerra factors judges consider, how to prepare evidence, and what to expect at your hearing.",
        date: "Jan 2026",
        readTime: "15 min read",
        link: "/services/bond-hearings"
      },
      {
        id: 2,
        title: "Asylum in the United States: Complete Guide",
        category: "Asylum & Protection",
        description: "Learn about the asylum process, eligibility requirements, the one-year filing deadline and its exceptions, and how to build a strong asylum case.",
        date: "Jan 2026",
        readTime: "20 min read",
        link: "/services/asylum"
      },
      {
        id: 3,
        title: "Removal Defense Strategies",
        category: "Removal Defense",
        description: "Explore the various forms of relief from removal including cancellation of removal, voluntary departure, adjustment of status, and prosecutorial discretion.",
        date: "Jan 2026",
        readTime: "18 min read",
        link: "/services/removal-defense"
      },
      {
        id: 4,
        title: "Family-Based Immigration Petitions",
        category: "Family Petitions",
        description: "A detailed guide to sponsoring family members for green cards, including immediate relatives, preference categories, and current wait times.",
        date: "Jan 2026",
        readTime: "12 min read",
        link: "/services/family-petitions"
      },
      {
        id: 5,
        title: "Criminal Convictions & Immigration Consequences",
        category: "Crimmigration",
        description: "Understand how criminal convictions affect immigration status, deportable offenses, crimes involving moral turpitude, and post-conviction relief options.",
        date: "Jan 2026",
        readTime: "25 min read",
        link: "/services/crimmigration"
      },
      {
        id: 6,
        title: "Federal Court Immigration Appeals",
        category: "Federal Litigation",
        description: "Learn about federal court options when USCIS or immigration courts deny your case, including mandamus actions, APA claims, and petitions for review.",
        date: "Jan 2026",
        readTime: "15 min read",
        link: "/services/federal-litigation"
      },
      {
        id: 7,
        title: "What Happens When Someone is Detained by ICE",
        category: "Detention Process",
        description: "Step-by-step guide explaining the ICE detention process from arrest to bond hearing, how to locate a detained person, and family communication options.",
        date: "Jan 2026",
        readTime: "20 min read",
        link: "/ice-detention-process"
      },
      {
        id: 8,
        title: "Know Your Rights During ICE Encounters",
        category: "Know Your Rights",
        description: "Essential information about your constitutional rights during ICE encounters, including the right to remain silent, refuse entry, and request an attorney.",
        date: "Jan 2026",
        readTime: "10 min read",
        link: "/know-your-rights"
      },
      {
        id: 9,
        title: "How to Be an Effective Immigration Sponsor",
        category: "Sponsor Guide",
        description: "Complete guide for immigration sponsors covering qualifications, financial requirements, what judges look for, and how to prepare for bond hearings.",
        date: "Jan 2026",
        readTime: "15 min read",
        link: "/sponsor-guide"
      }
    ],
    resources: [
      {
        title: "Bond Hearing Document Checklist",
        type: "PDF Checklist",
        size: "Download",
        link: "/bond-document-checklist"
      },
      {
        title: "Know Your Rights Card (English)",
        type: "PDF Card",
        size: "Download",
        link: "/downloads/know-your-rights-en.pdf"
      },
      {
        title: "Know Your Rights Card (Spanish)",
        type: "PDF Card",
        size: "Download",
        link: "/downloads/know-your-rights-es.pdf"
      },
      {
        title: "Know Your Rights Card (Portuguese)",
        type: "PDF Card",
        size: "Download",
        link: "/downloads/know-your-rights-pt.pdf"
      },
      {
        title: "Character Reference Letter Generator",
        type: "Online Tool",
        size: "Use Now",
        link: "/character-letter"
      },
      {
        title: "Sponsor Letter Generator",
        type: "Online Tool",
        size: "Use Now",
        link: "/sponsor-letter"
      },
      {
        title: "Family Emergency Plan Creator",
        type: "Online Tool",
        size: "Use Now",
        link: "/family-emergency-plan"
      },
      {
        title: "Sponsor Document Upload Portal",
        type: "Online Tool",
        size: "Use Now",
        link: "/sponsor-documents"
      }
    ],
    updates: [
      {
        title: "USCIS Fee Increases Effective April 2024",
        date: "Updated for 2026",
        description: "Important changes to USCIS filing fees affecting most immigration applications. Learn about the new fee schedule and fee waiver options."
      },
      {
        title: "Asylum Processing Rule Changes",
        date: "Updated for 2026",
        description: "Recent changes to asylum processing procedures, including expedited timelines and new interview protocols at asylum offices."
      },
      {
        title: "Immigration Court Backlog Updates",
        date: "Updated for 2026",
        description: "Current immigration court backlog statistics and average wait times by court location. Understanding delays in your case."
      },
      {
        title: "Parole Programs and Humanitarian Relief",
        date: "Updated for 2026",
        description: "Overview of current parole programs, humanitarian relief options, and temporary protected status (TPS) designations."
      }
    ]
  },
  es: {
    title: "Centro de Conocimiento de Inmigración",
    subtitle: "Guías esenciales, recursos legales y conocimientos expertos para ayudarle a navegar el sistema de inmigración de EE.UU. con confianza.",
    tabGuides: "Guías Legales",
    tabResources: "Recursos Descargables",
    tabUpdates: "Actualizaciones de Políticas",
    search: "Buscar guías y recursos...",
    readArticle: "Leer Guía",
    downloadBtn: "Descargar",
    noResults: "No se encontraron guías que coincidan con su búsqueda.",
    newsletter: {
      title: "Manténgase Informado sobre la Ley de Inmigración",
      desc: "Suscríbase para recibir actualizaciones sobre cambios en las políticas de inmigración, información legal y fechas límite importantes que pueden afectar su caso.",
      placeholder: "Ingrese su correo electrónico",
      button: "Suscribirse",
      disclaimer: "Respetamos su privacidad. Cancele en cualquier momento. Sin spam, solo actualizaciones legales valiosas."
    },
    guides: [
      {
        id: 1,
        title: "Entendiendo las Audiencias de Fianza de Inmigración",
        category: "Fianza y Detención",
        description: "Una guía completa sobre audiencias de fianza de inmigración, incluyendo los factores de Matter of Guerra que consideran los jueces, cómo preparar evidencia y qué esperar.",
        date: "Ene 2026",
        readTime: "15 min de lectura",
        link: "/services/bond-hearings"
      },
      {
        id: 2,
        title: "Asilo en Estados Unidos: Guía Completa",
        category: "Asilo y Protección",
        description: "Aprenda sobre el proceso de asilo, requisitos de elegibilidad, el plazo de un año y sus excepciones, y cómo construir un caso de asilo sólido.",
        date: "Ene 2026",
        readTime: "20 min de lectura",
        link: "/services/asylum"
      },
      {
        id: 3,
        title: "Estrategias de Defensa contra la Deportación",
        category: "Defensa de Deportación",
        description: "Explore las diversas formas de alivio de la deportación incluyendo cancelación de deportación, salida voluntaria, ajuste de estatus y discreción fiscal.",
        date: "Ene 2026",
        readTime: "18 min de lectura",
        link: "/services/removal-defense"
      },
      {
        id: 4,
        title: "Peticiones de Inmigración Familiar",
        category: "Peticiones Familiares",
        description: "Una guía detallada para patrocinar a familiares para tarjetas verdes, incluyendo familiares inmediatos, categorías de preferencia y tiempos de espera actuales.",
        date: "Ene 2026",
        readTime: "12 min de lectura",
        link: "/services/family-petitions"
      },
      {
        id: 5,
        title: "Condenas Penales y Consecuencias Migratorias",
        category: "Crimmigración",
        description: "Entienda cómo las condenas penales afectan el estatus migratorio, delitos deportables, crímenes de vileza moral y opciones de alivio post-condena.",
        date: "Ene 2026",
        readTime: "25 min de lectura",
        link: "/services/crimmigration"
      },
      {
        id: 6,
        title: "Apelaciones de Inmigración en Corte Federal",
        category: "Litigio Federal",
        description: "Aprenda sobre opciones en corte federal cuando USCIS o las cortes de inmigración niegan su caso, incluyendo acciones de mandamus y peticiones de revisión.",
        date: "Ene 2026",
        readTime: "15 min de lectura",
        link: "/services/federal-litigation"
      },
      {
        id: 7,
        title: "Qué Sucede Cuando Alguien es Detenido por ICE",
        category: "Proceso de Detención",
        description: "Guía paso a paso explicando el proceso de detención de ICE desde el arresto hasta la audiencia de fianza, cómo localizar a una persona detenida y opciones de comunicación.",
        date: "Ene 2026",
        readTime: "20 min de lectura",
        link: "/ice-detention-process"
      },
      {
        id: 8,
        title: "Conozca Sus Derechos Durante Encuentros con ICE",
        category: "Conozca Sus Derechos",
        description: "Información esencial sobre sus derechos constitucionales durante encuentros con ICE, incluyendo el derecho a permanecer en silencio y solicitar un abogado.",
        date: "Ene 2026",
        readTime: "10 min de lectura",
        link: "/know-your-rights"
      },
      {
        id: 9,
        title: "Cómo Ser un Patrocinador de Inmigración Efectivo",
        category: "Guía del Patrocinador",
        description: "Guía completa para patrocinadores de inmigración cubriendo calificaciones, requisitos financieros, qué buscan los jueces y cómo prepararse para audiencias.",
        date: "Ene 2026",
        readTime: "15 min de lectura",
        link: "/sponsor-guide"
      }
    ],
    resources: [
      {
        title: "Lista de Documentos para Audiencia de Fianza",
        type: "Lista PDF",
        size: "Descargar",
        link: "/bond-document-checklist"
      },
      {
        title: "Tarjeta Conozca Sus Derechos (Inglés)",
        type: "Tarjeta PDF",
        size: "Descargar",
        link: "/downloads/know-your-rights-en.pdf"
      },
      {
        title: "Tarjeta Conozca Sus Derechos (Español)",
        type: "Tarjeta PDF",
        size: "Descargar",
        link: "/downloads/know-your-rights-es.pdf"
      },
      {
        title: "Tarjeta Conozca Sus Derechos (Portugués)",
        type: "Tarjeta PDF",
        size: "Descargar",
        link: "/downloads/know-your-rights-pt.pdf"
      },
      {
        title: "Generador de Cartas de Referencia",
        type: "Herramienta en Línea",
        size: "Usar Ahora",
        link: "/character-letter"
      },
      {
        title: "Generador de Cartas de Patrocinador",
        type: "Herramienta en Línea",
        size: "Usar Ahora",
        link: "/sponsor-letter"
      },
      {
        title: "Creador de Plan de Emergencia Familiar",
        type: "Herramienta en Línea",
        size: "Usar Ahora",
        link: "/family-emergency-plan"
      },
      {
        title: "Portal de Carga de Documentos del Patrocinador",
        type: "Herramienta en Línea",
        size: "Usar Ahora",
        link: "/sponsor-documents"
      }
    ],
    updates: [
      {
        title: "Aumentos de Tarifas de USCIS Vigentes desde Abril 2024",
        date: "Actualizado para 2026",
        description: "Cambios importantes en las tarifas de presentación de USCIS que afectan la mayoría de las solicitudes de inmigración. Conozca el nuevo programa de tarifas."
      },
      {
        title: "Cambios en las Reglas de Procesamiento de Asilo",
        date: "Actualizado para 2026",
        description: "Cambios recientes en los procedimientos de procesamiento de asilo, incluyendo plazos acelerados y nuevos protocolos de entrevista."
      },
      {
        title: "Actualizaciones del Atraso en Cortes de Inmigración",
        date: "Actualizado para 2026",
        description: "Estadísticas actuales del atraso en cortes de inmigración y tiempos de espera promedio por ubicación de la corte."
      },
      {
        title: "Programas de Parole y Alivio Humanitario",
        date: "Actualizado para 2026",
        description: "Resumen de programas de parole actuales, opciones de alivio humanitario y designaciones de estatus de protección temporal (TPS)."
      }
    ]
  },
  pt: {
    title: "Centro de Conhecimento de Imigração",
    subtitle: "Guias essenciais, recursos legais e insights especializados para ajudá-lo a navegar o sistema de imigração dos EUA com confiança.",
    tabGuides: "Guias Legais",
    tabResources: "Recursos para Download",
    tabUpdates: "Atualizações de Políticas",
    search: "Pesquisar guias e recursos...",
    readArticle: "Ler Guia",
    downloadBtn: "Baixar",
    noResults: "Nenhum guia encontrado correspondente à sua pesquisa.",
    newsletter: {
      title: "Mantenha-se Informado sobre a Lei de Imigração",
      desc: "Inscreva-se para receber atualizações sobre mudanças nas políticas de imigração, informações legais e prazos importantes que podem afetar seu caso.",
      placeholder: "Digite seu endereço de e-mail",
      button: "Inscrever-se",
      disclaimer: "Respeitamos sua privacidade. Cancele a qualquer momento. Sem spam, apenas atualizações legais valiosas."
    },
    guides: [
      {
        id: 1,
        title: "Entendendo Audiências de Fiança de Imigração",
        category: "Fiança e Detenção",
        description: "Um guia completo sobre audiências de fiança de imigração, incluindo os fatores de Matter of Guerra que os juízes consideram, como preparar evidências e o que esperar.",
        date: "Jan 2026",
        readTime: "15 min de leitura",
        link: "/services/bond-hearings"
      },
      {
        id: 2,
        title: "Asilo nos Estados Unidos: Guia Completo",
        category: "Asilo e Proteção",
        description: "Aprenda sobre o processo de asilo, requisitos de elegibilidade, o prazo de um ano e suas exceções, e como construir um caso de asilo forte.",
        date: "Jan 2026",
        readTime: "20 min de leitura",
        link: "/services/asylum"
      },
      {
        id: 3,
        title: "Estratégias de Defesa contra Deportação",
        category: "Defesa de Deportação",
        description: "Explore as várias formas de alívio da deportação incluindo cancelamento de deportação, partida voluntária, ajuste de status e discrição processual.",
        date: "Jan 2026",
        readTime: "18 min de leitura",
        link: "/services/removal-defense"
      },
      {
        id: 4,
        title: "Petições de Imigração Familiar",
        category: "Petições Familiares",
        description: "Um guia detalhado para patrocinar membros da família para green cards, incluindo parentes imediatos, categorias de preferência e tempos de espera atuais.",
        date: "Jan 2026",
        readTime: "12 min de leitura",
        link: "/services/family-petitions"
      },
      {
        id: 5,
        title: "Condenações Criminais e Consequências Imigratórias",
        category: "Crimigração",
        description: "Entenda como condenações criminais afetam o status imigratório, crimes deportáveis, crimes envolvendo torpeza moral e opções de alívio pós-condenação.",
        date: "Jan 2026",
        readTime: "25 min de leitura",
        link: "/services/crimmigration"
      },
      {
        id: 6,
        title: "Apelações de Imigração em Tribunal Federal",
        category: "Litígio Federal",
        description: "Aprenda sobre opções em tribunal federal quando USCIS ou tribunais de imigração negam seu caso, incluindo ações de mandamus e petições de revisão.",
        date: "Jan 2026",
        readTime: "15 min de leitura",
        link: "/services/federal-litigation"
      },
      {
        id: 7,
        title: "O Que Acontece Quando Alguém é Detido pelo ICE",
        category: "Processo de Detenção",
        description: "Guia passo a passo explicando o processo de detenção do ICE desde a prisão até a audiência de fiança, como localizar uma pessoa detida e opções de comunicação.",
        date: "Jan 2026",
        readTime: "20 min de leitura",
        link: "/ice-detention-process"
      },
      {
        id: 8,
        title: "Conheça Seus Direitos Durante Encontros com ICE",
        category: "Conheça Seus Direitos",
        description: "Informações essenciais sobre seus direitos constitucionais durante encontros com ICE, incluindo o direito de permanecer em silêncio e solicitar um advogado.",
        date: "Jan 2026",
        readTime: "10 min de leitura",
        link: "/know-your-rights"
      },
      {
        id: 9,
        title: "Como Ser um Patrocinador de Imigração Eficaz",
        category: "Guia do Patrocinador",
        description: "Guia completo para patrocinadores de imigração cobrindo qualificações, requisitos financeiros, o que os juízes procuram e como se preparar para audiências.",
        date: "Jan 2026",
        readTime: "15 min de leitura",
        link: "/sponsor-guide"
      }
    ],
    resources: [
      {
        title: "Lista de Documentos para Audiência de Fiança",
        type: "Lista PDF",
        size: "Baixar",
        link: "/bond-document-checklist"
      },
      {
        title: "Cartão Conheça Seus Direitos (Inglês)",
        type: "Cartão PDF",
        size: "Baixar",
        link: "/downloads/know-your-rights-en.pdf"
      },
      {
        title: "Cartão Conheça Seus Direitos (Espanhol)",
        type: "Cartão PDF",
        size: "Baixar",
        link: "/downloads/know-your-rights-es.pdf"
      },
      {
        title: "Cartão Conheça Seus Direitos (Português)",
        type: "Cartão PDF",
        size: "Baixar",
        link: "/downloads/know-your-rights-pt.pdf"
      },
      {
        title: "Gerador de Cartas de Referência",
        type: "Ferramenta Online",
        size: "Usar Agora",
        link: "/character-letter"
      },
      {
        title: "Gerador de Cartas de Patrocinador",
        type: "Ferramenta Online",
        size: "Usar Agora",
        link: "/sponsor-letter"
      },
      {
        title: "Criador de Plano de Emergência Familiar",
        type: "Ferramenta Online",
        size: "Usar Agora",
        link: "/family-emergency-plan"
      },
      {
        title: "Portal de Upload de Documentos do Patrocinador",
        type: "Ferramenta Online",
        size: "Usar Agora",
        link: "/sponsor-documents"
      }
    ],
    updates: [
      {
        title: "Aumentos de Taxas do USCIS em Vigor desde Abril 2024",
        date: "Atualizado para 2026",
        description: "Mudanças importantes nas taxas de apresentação do USCIS afetando a maioria das solicitações de imigração. Conheça o novo cronograma de taxas."
      },
      {
        title: "Mudanças nas Regras de Processamento de Asilo",
        date: "Atualizado para 2026",
        description: "Mudanças recentes nos procedimentos de processamento de asilo, incluindo prazos acelerados e novos protocolos de entrevista."
      },
      {
        title: "Atualizações do Atraso nos Tribunais de Imigração",
        date: "Atualizado para 2026",
        description: "Estatísticas atuais do atraso nos tribunais de imigração e tempos de espera médios por localização do tribunal."
      },
      {
        title: "Programas de Parole e Alívio Humanitário",
        date: "Atualizado para 2026",
        description: "Visão geral dos programas de parole atuais, opções de alívio humanitário e designações de status de proteção temporária (TPS)."
      }
    ]
  }
};

export default function KnowledgeCenter() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  
  const t = translations[language as keyof typeof translations] || translations.en;

  const filteredGuides = t.guides.filter(guide => 
    guide.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    guide.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categoryIcons: Record<string, React.ReactNode> = {
    "Bond & Detention": <Gavel className="h-5 w-5" />,
    "Fianza y Detención": <Gavel className="h-5 w-5" />,
    "Fiança e Detenção": <Gavel className="h-5 w-5" />,
    "Asylum & Protection": <Shield className="h-5 w-5" />,
    "Asilo y Protección": <Shield className="h-5 w-5" />,
    "Asilo e Proteção": <Shield className="h-5 w-5" />,
    "Removal Defense": <Scale className="h-5 w-5" />,
    "Defensa de Deportación": <Scale className="h-5 w-5" />,
    "Defesa de Deportação": <Scale className="h-5 w-5" />,
    "Family Petitions": <Users className="h-5 w-5" />,
    "Peticiones Familiares": <Users className="h-5 w-5" />,
    "Petições Familiares": <Users className="h-5 w-5" />,
    "Crimmigration": <AlertTriangle className="h-5 w-5" />,
    "Crimmigración": <AlertTriangle className="h-5 w-5" />,
    "Crimigração": <AlertTriangle className="h-5 w-5" />,
    "Federal Litigation": <FileCheck className="h-5 w-5" />,
    "Litigio Federal": <FileCheck className="h-5 w-5" />,
    "Litígio Federal": <FileCheck className="h-5 w-5" />,
    "Detention Process": <MapPin className="h-5 w-5" />,
    "Proceso de Detención": <MapPin className="h-5 w-5" />,
    "Processo de Detenção": <MapPin className="h-5 w-5" />,
    "Know Your Rights": <Shield className="h-5 w-5" />,
    "Conozca Sus Derechos": <Shield className="h-5 w-5" />,
    "Conheça Seus Direitos": <Shield className="h-5 w-5" />,
    "Sponsor Guide": <Users className="h-5 w-5" />,
    "Guía del Patrocinador": <Users className="h-5 w-5" />,
    "Guia do Patrocinador": <Users className="h-5 w-5" />,
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Immigration Knowledge Center"
        description="Immigration law guides, legal resources, and expert insights from Amaral Law. Learn about bond hearings, asylum, removal defense, and your rights."
        keywords="immigration guides, legal resources, bond hearings, asylum, removal defense, know your rights, ICE detention"
        canonicalUrl="/knowledge-center"
      />
      
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-library.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-secondary" />
            <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Legal Resources</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{t.title}</h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl font-light">
            {t.subtitle}
          </p>
        </div>
      </div>

      <div className="container py-12">
        <Tabs defaultValue="guides" className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="guides" className="font-serif">{t.tabGuides}</TabsTrigger>
              <TabsTrigger value="resources" className="font-serif">{t.tabResources}</TabsTrigger>
              <TabsTrigger value="updates" className="font-serif">{t.tabUpdates}</TabsTrigger>
            </TabsList>
            
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder={t.search}
                className="pl-9 bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Legal Guides Tab */}
          <TabsContent value="guides" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) => (
                <Link key={guide.id} href={guide.link}>
                  <Card className="law-card group cursor-pointer hover:border-primary/50 transition-colors h-full">
                    <CardHeader>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-1 rounded-sm flex items-center gap-1">
                          {categoryIcons[guide.category]}
                          {guide.category}
                        </span>
                        <span className="text-xs text-muted-foreground">{guide.readTime}</span>
                      </div>
                      <CardTitle className="font-serif text-xl group-hover:text-primary transition-colors">
                        {guide.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {guide.description}
                      </p>
                    </CardContent>
                    <CardFooter className="border-t border-border/50 pt-4 mt-auto">
                      <div className="flex justify-between items-center w-full">
                        <span className="text-xs text-muted-foreground">{guide.date}</span>
                        <span className="text-sm font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          {t.readArticle} <ChevronRight className="h-4 w-4" />
                        </span>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
            {filteredGuides.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t.noResults}</p>
              </div>
            )}
          </TabsContent>

          {/* Downloadable Resources Tab */}
          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.resources.map((resource, index) => (
                <Link key={index} href={resource.link}>
                  <Card className="law-card flex flex-row items-center p-6 gap-6 hover:bg-muted/10 transition-colors cursor-pointer">
                    <div className="bg-primary/10 p-4 rounded-sm shrink-0">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-serif text-lg font-bold mb-1">{resource.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{resource.type}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="shrink-0 hover:bg-primary hover:text-primary-foreground transition-colors">
                      {resource.size === "Download" || resource.size === "Descargar" || resource.size === "Baixar" ? (
                        <Download className="h-5 w-5 mr-2" />
                      ) : null}
                      {resource.size}
                    </Button>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* Policy Updates Tab */}
          <TabsContent value="updates">
            <div className="space-y-6">
              {t.updates.map((update, index) => (
                <Card key={index} className="law-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-secondary/20 p-3 rounded-sm shrink-0">
                      <Clock className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-serif text-xl font-bold">{update.title}</h3>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-sm font-semibold">
                          {update.date}
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {update.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Links Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/consultation">
            <Card className="law-card p-6 hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="bg-primary p-3 rounded-sm">
                  <Scale className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-serif font-bold group-hover:text-primary transition-colors">
                    {language === 'es' ? 'Solicitar Consulta' : language === 'pt' ? 'Solicitar Consulta' : 'Request Consultation'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'es' ? 'Hable con un abogado' : language === 'pt' ? 'Fale com um advogado' : 'Speak with an attorney'}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
          
          <Link href="/detention-guide">
            <Card className="law-card p-6 hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="bg-secondary p-3 rounded-sm">
                  <MapPin className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-serif font-bold group-hover:text-primary transition-colors">
                    {language === 'es' ? 'Encontrar Detenido' : language === 'pt' ? 'Encontrar Detido' : 'Find Detained Person'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'es' ? 'Centros de detención de ICE' : language === 'pt' ? 'Centros de detenção do ICE' : 'ICE detention centers'}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
          
          <Link href="/bond-questionnaire">
            <Card className="law-card p-6 hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="bg-primary p-3 rounded-sm">
                  <FileCheck className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-serif font-bold group-hover:text-primary transition-colors">
                    {language === 'es' ? 'Cuestionario de Fianza' : language === 'pt' ? 'Questionário de Fiança' : 'Bond Questionnaire'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'es' ? 'Comience su caso' : language === 'pt' ? 'Comece seu caso' : 'Start your case'}
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/downloads">
            <Card className="law-card p-6 hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="bg-primary p-3 rounded-sm">
                  <Download className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-serif font-bold group-hover:text-primary transition-colors">
                    {language === 'es' ? 'Recursos Descargables' : language === 'pt' ? 'Recursos para Download' : 'Downloadable Resources'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'es' ? 'PDFs y formularios' : language === 'pt' ? 'PDFs e formulários' : 'PDFs & forms'}
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/family-emergency-plan">
            <Card className="law-card p-6 hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="bg-secondary p-3 rounded-sm">
                  <Users className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-serif font-bold group-hover:text-primary transition-colors">
                    {language === 'es' ? 'Plan de Emergencia Familiar' : language === 'pt' ? 'Plano de Emergência Familiar' : 'Family Emergency Plan'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'es' ? 'Proteja a su familia' : language === 'pt' ? 'Proteja sua família' : 'Protect your family'}
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/know-your-rights">
            <Card className="law-card p-6 hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="bg-primary p-3 rounded-sm">
                  <Shield className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-serif font-bold group-hover:text-primary transition-colors">
                    {language === 'es' ? 'Conozca Sus Derechos' : language === 'pt' ? 'Conheça Seus Direitos' : 'Know Your Rights'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'es' ? 'Tarjeta imprimible' : language === 'pt' ? 'Cartão imprimível' : 'Printable card'}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-primary text-primary-foreground rounded-sm p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10">
            <BookOpen className="h-64 w-64" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-serif text-3xl font-bold mb-4">{t.newsletter.title}</h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              {t.newsletter.desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input 
                placeholder={t.newsletter.placeholder}
                className="bg-primary-foreground text-primary placeholder:text-primary/50 border-none h-12"
              />
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-serif h-12 px-8">
                {t.newsletter.button}
              </Button>
            </div>
            <p className="text-xs text-primary-foreground/60 mt-4">
              {t.newsletter.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
