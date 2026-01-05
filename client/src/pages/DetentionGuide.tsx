import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import {
  Phone,
  MapPin,
  Search,
  AlertTriangle,
  FileText,
  Users,
  Clock,
  Shield,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Building2,
  Mail,
  Video,
  DollarSign,
  Scale,
  CheckCircle,
  Info,
  ArrowRight
} from "lucide-react";

// ICE Field Offices data
const fieldOffices = [
  { name: "Atlanta Field Office", states: ["Georgia", "North Carolina", "South Carolina"] },
  { name: "Boston Field Office", states: ["Connecticut", "Maine", "Massachusetts", "New Hampshire", "Rhode Island", "Vermont"] },
  { name: "Buffalo Field Office", states: ["New York (upstate)"] },
  { name: "Chicago Field Office", states: ["Illinois", "Indiana", "Kansas", "Kentucky", "Missouri", "Wisconsin"] },
  { name: "Dallas Field Office", states: ["Oklahoma", "North Texas"] },
  { name: "Denver Field Office", states: ["Colorado", "Wyoming"] },
  { name: "Detroit Field Office", states: ["Michigan", "Ohio"] },
  { name: "El Paso Field Office", states: ["New Mexico", "West Texas"] },
  { name: "Harlingen Field Office", states: ["South Texas"] },
  { name: "Houston Field Office", states: ["Southeast Texas"] },
  { name: "Los Angeles Field Office", states: ["Southern California"] },
  { name: "Miami Field Office", states: ["Florida", "Puerto Rico", "U.S. Virgin Islands"] },
  { name: "New Orleans Field Office", states: ["Alabama", "Arkansas", "Louisiana", "Mississippi", "Tennessee"] },
  { name: "New York City Field Office", states: ["New York City metro area"] },
  { name: "Newark Field Office", states: ["New Jersey"] },
  { name: "Philadelphia Field Office", states: ["Delaware", "Pennsylvania", "West Virginia"] },
  { name: "Phoenix Field Office", states: ["Arizona"] },
  { name: "Salt Lake City Field Office", states: ["Idaho", "Montana", "Nevada", "Utah"] },
  { name: "San Antonio Field Office", states: ["Central Texas"] },
  { name: "San Diego Field Office", states: ["San Diego area"] },
  { name: "San Francisco Field Office", states: ["Northern California", "Hawaii", "Guam", "CNMI"] },
  { name: "Seattle Field Office", states: ["Alaska", "Oregon", "Washington"] },
  { name: "St. Paul Field Office", states: ["Iowa", "Minnesota", "Nebraska", "North Dakota", "South Dakota"] },
  { name: "Washington Field Office", states: ["District of Columbia", "Maryland", "Virginia"] },
];

// Major detention facilities by region
const detentionFacilities = [
  // Southwest
  { name: "Adelanto ICE Processing Center", city: "Adelanto", state: "CA", fieldOffice: "Los Angeles", region: "Southwest" },
  { name: "California City Detention Facility", city: "California City", state: "CA", fieldOffice: "San Francisco", region: "Southwest" },
  { name: "Central Arizona Florence Correctional Center", city: "Florence", state: "AZ", fieldOffice: "Phoenix", region: "Southwest" },
  { name: "Eloy Detention Center", city: "Eloy", state: "AZ", fieldOffice: "Phoenix", region: "Southwest" },
  { name: "Florence Service Processing Center", city: "Florence", state: "AZ", fieldOffice: "Phoenix", region: "Southwest" },
  { name: "Otay Mesa Detention Center", city: "San Diego", state: "CA", fieldOffice: "San Diego", region: "Southwest" },
  
  // Texas
  { name: "Bluebonnet Detention Facility", city: "Anson", state: "TX", fieldOffice: "Dallas", region: "Texas" },
  { name: "Coastal Bend Detention Center", city: "Robstown", state: "TX", fieldOffice: "Harlingen", region: "Texas" },
  { name: "CoreCivic Laredo Processing Center", city: "Laredo", state: "TX", fieldOffice: "Harlingen", region: "Texas" },
  { name: "Dilley Immigration Processing Center", city: "Dilley", state: "TX", fieldOffice: "San Antonio", region: "Texas" },
  { name: "El Paso Service Processing Center", city: "El Paso", state: "TX", fieldOffice: "El Paso", region: "Texas" },
  { name: "Houston Contract Detention Facility", city: "Houston", state: "TX", fieldOffice: "Houston", region: "Texas" },
  { name: "Karnes County Residential Center", city: "Karnes City", state: "TX", fieldOffice: "San Antonio", region: "Texas" },
  { name: "Port Isabel Service Processing Center", city: "Los Fresnos", state: "TX", fieldOffice: "Harlingen", region: "Texas" },
  { name: "South Texas ICE Processing Center", city: "Pearsall", state: "TX", fieldOffice: "San Antonio", region: "Texas" },
  
  // Southeast
  { name: "Baker County Detention Center", city: "MacClenny", state: "FL", fieldOffice: "Miami", region: "Southeast" },
  { name: "Broward Transitional Center", city: "Pompano Beach", state: "FL", fieldOffice: "Miami", region: "Southeast" },
  { name: "Glades County Detention Center", city: "Moore Haven", state: "FL", fieldOffice: "Miami", region: "Southeast" },
  { name: "Krome Service Processing Center", city: "Miami", state: "FL", fieldOffice: "Miami", region: "Southeast" },
  { name: "Stewart Detention Center", city: "Lumpkin", state: "GA", fieldOffice: "Atlanta", region: "Southeast" },
  { name: "Irwin County Detention Center", city: "Ocilla", state: "GA", fieldOffice: "Atlanta", region: "Southeast" },
  
  // Louisiana/Gulf
  { name: "Adams County Correctional Center", city: "Natchez", state: "MS", fieldOffice: "New Orleans", region: "Gulf" },
  { name: "Allen Parish Public Safety Complex", city: "Oberlin", state: "LA", fieldOffice: "New Orleans", region: "Gulf" },
  { name: "Central Louisiana ICE Processing Center", city: "Jena", state: "LA", fieldOffice: "New Orleans", region: "Gulf" },
  { name: "LaSalle ICE Processing Center", city: "Jena", state: "LA", fieldOffice: "New Orleans", region: "Gulf" },
  { name: "Richwood Correctional Center", city: "Monroe", state: "LA", fieldOffice: "New Orleans", region: "Gulf" },
  
  // Northeast
  { name: "Buffalo (Batavia) Service Processing Center", city: "Batavia", state: "NY", fieldOffice: "Buffalo", region: "Northeast" },
  { name: "Delaney Hall Detention Facility", city: "Newark", state: "NJ", fieldOffice: "Newark", region: "Northeast" },
  { name: "Elizabeth Contract Detention Facility", city: "Elizabeth", state: "NJ", fieldOffice: "Newark", region: "Northeast" },
  { name: "Essex County Correctional Facility", city: "Newark", state: "NJ", fieldOffice: "Newark", region: "Northeast" },
  { name: "Hudson County Correctional Facility", city: "Kearny", state: "NJ", fieldOffice: "Newark", region: "Northeast" },
  { name: "Orange County Correctional Facility", city: "Goshen", state: "NY", fieldOffice: "New York City", region: "Northeast" },
  
  // Midwest
  { name: "Boone County Jail", city: "Burlington", state: "KY", fieldOffice: "Chicago", region: "Midwest" },
  { name: "Butler County Sheriff's Office", city: "Hamilton", state: "OH", fieldOffice: "Detroit", region: "Midwest" },
  { name: "Calhoun County Correctional Center", city: "Battle Creek", state: "MI", fieldOffice: "Detroit", region: "Midwest" },
  { name: "Dodge Detention Facility", city: "Juneau", state: "WI", fieldOffice: "Chicago", region: "Midwest" },
  { name: "Pulaski County Detention Center", city: "Ullin", state: "IL", fieldOffice: "Chicago", region: "Midwest" },
  
  // Mountain West
  { name: "Denver Contract Detention Facility (Aurora)", city: "Aurora", state: "CO", fieldOffice: "Denver", region: "Mountain" },
  { name: "Nevada Southern Detention Center", city: "Pahrump", state: "NV", fieldOffice: "Salt Lake City", region: "Mountain" },
  
  // Mid-Atlantic
  { name: "Caroline Detention Facility", city: "Bowling Green", state: "VA", fieldOffice: "Washington", region: "Mid-Atlantic" },
  { name: "Farmville Detention Center", city: "Farmville", state: "VA", fieldOffice: "Washington", region: "Mid-Atlantic" },
  
  // Pacific Northwest
  { name: "Northwest ICE Processing Center", city: "Tacoma", state: "WA", fieldOffice: "Seattle", region: "Pacific Northwest" },
];

const translations = {
  en: {
    title: "ICE Detention Guide",
    subtitle: "What to Know When a Loved One is Detained",
    intro: "When someone you love is detained by Immigration and Customs Enforcement (ICE), time is critical. This comprehensive guide explains what happens during detention, how to locate and communicate with your loved one, and the legal process ahead.",
    
    // Section titles
    whatHappens: "What Happens When Someone is Detained",
    howToFind: "How to Find a Detained Person",
    howToCommunicate: "How to Communicate",
    whatIsNTA: "What is a Notice to Appear (NTA)?",
    detentionCenters: "ICE Detention Centers",
    fieldOffices: "ICE Field Offices",
    importantNumbers: "Important Phone Numbers",
    nextSteps: "Next Steps",
    
    // What happens content
    arrest: "Arrest & Processing",
    arrestDesc: "When ICE arrests someone, they are taken into custody and transported to a processing facility. During processing, the person is fingerprinted, photographed, and their background is checked. This typically takes several hours.",
    custody: "Custody Determination",
    custodyDesc: "ICE makes an initial custody determination: release on recognizance, release on bond, or continued detention. Those with criminal history or deemed flight risks may be held without bond.",
    nta: "Notice to Appear Issued",
    ntaDesc: "A Notice to Appear (NTA) is filed with the immigration court, officially starting removal proceedings. This document lists the charges against the person and schedules their first court hearing.",
    transfer: "Transfer to Detention Facility",
    transferDesc: "After processing, the person may be transferred to an ICE detention center or a county jail that contracts with ICE. They will remain there until released on bond, granted relief, or removed from the country.",
    
    // How to find content
    locatorTitle: "ICE Online Detainee Locator",
    locatorDesc: "The fastest way to find someone in ICE custody is through the online locator at locator.ice.gov. You will need either:",
    locatorOption1: "Country of birth AND A-Number (Alien Number), OR",
    locatorOption2: "Country of birth, first name, last name, and date of birth",
    aNumberTip: "The A-Number is an 8 or 9-digit identification number (e.g., A 123-456-789) found on immigration documents or the person's wristband in detention.",
    callICE: "Call ICE Directly",
    callICEDesc: "If you cannot find someone online, call the ICE Contact Center at 1-866-347-2423. Be prepared to provide as much identifying information as possible.",
    
    // Communication content
    phoneCalls: "Phone Calls",
    phoneCallsDesc: "Detained individuals can make collect calls or use prepaid phone accounts. Each facility uses different phone systems (Talton, GTL, etc.). Family members can set up prepaid accounts to receive calls. Note: calls are typically monitored and recorded.",
    mail: "Mail & Letters",
    mailDesc: "You can send letters, cards, and photos to the detention facility. Address mail to the person's full name and A-Number at the facility address. Some facilities have restrictions on what can be sent—contact the facility for specific rules.",
    visitation: "In-Person Visits",
    visitationDesc: "Each facility has its own visitation hours and rules. Contact the facility directly to confirm hours and any restrictions. Visitors typically need valid government-issued ID. Some facilities offer video visitation as an alternative.",
    
    // NTA content
    ntaExplain: "A Notice to Appear (NTA), Form I-862, is the official charging document that starts removal (deportation) proceedings. It is filed by the Department of Homeland Security (DHS) with the immigration court.",
    ntaContains: "The NTA Contains:",
    ntaItem1: "Factual allegations about the person's immigration status",
    ntaItem2: "Specific charges of removability (reasons for deportation)",
    ntaItem3: "Date, time, and location of the first court hearing",
    ntaItem4: "Notice of the right to an attorney (at no expense to the government)",
    afterNTA: "After Receiving an NTA",
    afterNTADesc: "Once an NTA is filed, the case is assigned to an immigration judge. The first hearing (Master Calendar Hearing) is scheduled, where the judge explains the charges and the person can respond. If seeking relief from removal, an individual merits hearing is scheduled where evidence is presented.",
    
    // Detention centers
    searchFacilities: "Search Facilities",
    searchPlaceholder: "Search by facility name, city, or state...",
    region: "Region",
    allRegions: "All Regions",
    facilityName: "Facility Name",
    location: "Location",
    
    // Important numbers
    iceContact: "ICE Contact Center",
    iceContactDesc: "General information and detainee locator assistance",
    eoirHotline: "EOIR Automated Hotline",
    eoirHotlineDesc: "Check immigration court hearing dates and case status",
    freedomHotline: "National Immigration Detention Hotline",
    freedomHotlineDesc: "Free support for detained individuals (dial 9233# from inside detention)",
    
    // CTA
    ctaTitle: "Need Legal Help?",
    ctaDesc: "If your loved one is detained, time is critical. Our experienced immigration attorneys can help fight for their release.",
    ctaButton: "Request Consultation",
    bondButton: "Learn About Bond Hearings",
  },
  es: {
    title: "Guía de Detención de ICE",
    subtitle: "Qué Saber Cuando un Ser Querido es Detenido",
    intro: "Cuando alguien que amas es detenido por Inmigración y Control de Aduanas (ICE), el tiempo es crítico. Esta guía completa explica qué sucede durante la detención, cómo localizar y comunicarse con su ser querido, y el proceso legal que viene.",
    
    whatHappens: "Qué Sucede Cuando Alguien es Detenido",
    howToFind: "Cómo Encontrar a una Persona Detenida",
    howToCommunicate: "Cómo Comunicarse",
    whatIsNTA: "¿Qué es una Notificación de Comparecencia (NTA)?",
    detentionCenters: "Centros de Detención de ICE",
    fieldOffices: "Oficinas de Campo de ICE",
    importantNumbers: "Números de Teléfono Importantes",
    nextSteps: "Próximos Pasos",
    
    arrest: "Arresto y Procesamiento",
    arrestDesc: "Cuando ICE arresta a alguien, es llevado bajo custodia y transportado a una instalación de procesamiento. Durante el procesamiento, se toman huellas digitales, fotografías y se verifica su historial. Esto típicamente toma varias horas.",
    custody: "Determinación de Custodia",
    custodyDesc: "ICE hace una determinación inicial de custodia: liberación bajo palabra, liberación bajo fianza, o detención continua. Aquellos con historial criminal o considerados riesgo de fuga pueden ser retenidos sin fianza.",
    nta: "Emisión de Notificación de Comparecencia",
    ntaDesc: "Se presenta una Notificación de Comparecencia (NTA) ante el tribunal de inmigración, iniciando oficialmente los procedimientos de deportación. Este documento lista los cargos contra la persona y programa su primera audiencia.",
    transfer: "Transferencia a Centro de Detención",
    transferDesc: "Después del procesamiento, la persona puede ser transferida a un centro de detención de ICE o una cárcel del condado que tiene contrato con ICE. Permanecerán allí hasta ser liberados bajo fianza, obtener alivio, o ser removidos del país.",
    
    locatorTitle: "Localizador de Detenidos de ICE en Línea",
    locatorDesc: "La forma más rápida de encontrar a alguien bajo custodia de ICE es a través del localizador en línea en locator.ice.gov. Necesitará:",
    locatorOption1: "País de nacimiento Y Número A (Número de Extranjero), O",
    locatorOption2: "País de nacimiento, nombre, apellido y fecha de nacimiento",
    aNumberTip: "El Número A es un número de identificación de 8 o 9 dígitos (ej., A 123-456-789) que se encuentra en documentos de inmigración o en la pulsera de la persona en detención.",
    callICE: "Llamar a ICE Directamente",
    callICEDesc: "Si no puede encontrar a alguien en línea, llame al Centro de Contacto de ICE al 1-866-347-2423. Esté preparado para proporcionar la mayor cantidad de información de identificación posible.",
    
    phoneCalls: "Llamadas Telefónicas",
    phoneCallsDesc: "Las personas detenidas pueden hacer llamadas por cobrar o usar cuentas telefónicas prepagadas. Cada instalación usa diferentes sistemas telefónicos. Los familiares pueden configurar cuentas prepagadas para recibir llamadas. Nota: las llamadas típicamente son monitoreadas y grabadas.",
    mail: "Correo y Cartas",
    mailDesc: "Puede enviar cartas, tarjetas y fotos al centro de detención. Dirija el correo al nombre completo de la persona y Número A en la dirección de la instalación. Algunas instalaciones tienen restricciones sobre lo que se puede enviar.",
    visitation: "Visitas en Persona",
    visitationDesc: "Cada instalación tiene sus propios horarios y reglas de visita. Contacte la instalación directamente para confirmar horarios y restricciones. Los visitantes típicamente necesitan identificación válida emitida por el gobierno.",
    
    ntaExplain: "Una Notificación de Comparecencia (NTA), Formulario I-862, es el documento oficial de cargos que inicia los procedimientos de deportación. Es presentado por el Departamento de Seguridad Nacional (DHS) ante el tribunal de inmigración.",
    ntaContains: "La NTA Contiene:",
    ntaItem1: "Alegaciones fácticas sobre el estatus migratorio de la persona",
    ntaItem2: "Cargos específicos de deportabilidad (razones para la deportación)",
    ntaItem3: "Fecha, hora y lugar de la primera audiencia",
    ntaItem4: "Aviso del derecho a un abogado (sin costo para el gobierno)",
    afterNTA: "Después de Recibir una NTA",
    afterNTADesc: "Una vez presentada la NTA, el caso es asignado a un juez de inmigración. Se programa la primera audiencia (Audiencia de Calendario Maestro), donde el juez explica los cargos y la persona puede responder.",
    
    searchFacilities: "Buscar Instalaciones",
    searchPlaceholder: "Buscar por nombre, ciudad o estado...",
    region: "Región",
    allRegions: "Todas las Regiones",
    facilityName: "Nombre de la Instalación",
    location: "Ubicación",
    
    iceContact: "Centro de Contacto de ICE",
    iceContactDesc: "Información general y asistencia para localizar detenidos",
    eoirHotline: "Línea Automatizada de EOIR",
    eoirHotlineDesc: "Verificar fechas de audiencias y estado de casos",
    freedomHotline: "Línea Nacional de Detención de Inmigración",
    freedomHotlineDesc: "Apoyo gratuito para personas detenidas (marque 9233# desde dentro de la detención)",
    
    ctaTitle: "¿Necesita Ayuda Legal?",
    ctaDesc: "Si su ser querido está detenido, el tiempo es crítico. Nuestros abogados de inmigración experimentados pueden ayudar a luchar por su liberación.",
    ctaButton: "Solicitar Consulta",
    bondButton: "Aprenda Sobre Audiencias de Fianza",
  },
  pt: {
    title: "Guia de Detenção do ICE",
    subtitle: "O Que Saber Quando um Ente Querido é Detido",
    intro: "Quando alguém que você ama é detido pela Imigração e Alfândega (ICE), o tempo é crítico. Este guia abrangente explica o que acontece durante a detenção, como localizar e se comunicar com seu ente querido, e o processo legal à frente.",
    
    whatHappens: "O Que Acontece Quando Alguém é Detido",
    howToFind: "Como Encontrar uma Pessoa Detida",
    howToCommunicate: "Como Se Comunicar",
    whatIsNTA: "O Que é uma Notificação de Comparecimento (NTA)?",
    detentionCenters: "Centros de Detenção do ICE",
    fieldOffices: "Escritórios de Campo do ICE",
    importantNumbers: "Números de Telefone Importantes",
    nextSteps: "Próximos Passos",
    
    arrest: "Prisão e Processamento",
    arrestDesc: "Quando o ICE prende alguém, a pessoa é levada sob custódia e transportada para uma instalação de processamento. Durante o processamento, são coletadas impressões digitais, fotos e verificado o histórico. Isso geralmente leva várias horas.",
    custody: "Determinação de Custódia",
    custodyDesc: "O ICE faz uma determinação inicial de custódia: liberação sob compromisso, liberação sob fiança, ou detenção contínua. Aqueles com histórico criminal ou considerados risco de fuga podem ser mantidos sem fiança.",
    nta: "Emissão da Notificação de Comparecimento",
    ntaDesc: "Uma Notificação de Comparecimento (NTA) é apresentada ao tribunal de imigração, iniciando oficialmente os procedimentos de deportação. Este documento lista as acusações contra a pessoa e agenda sua primeira audiência.",
    transfer: "Transferência para Centro de Detenção",
    transferDesc: "Após o processamento, a pessoa pode ser transferida para um centro de detenção do ICE ou uma prisão do condado que tem contrato com o ICE. Permanecerão lá até serem liberados sob fiança, obterem alívio, ou serem removidos do país.",
    
    locatorTitle: "Localizador de Detidos do ICE Online",
    locatorDesc: "A maneira mais rápida de encontrar alguém sob custódia do ICE é através do localizador online em locator.ice.gov. Você precisará de:",
    locatorOption1: "País de nascimento E Número A (Número de Estrangeiro), OU",
    locatorOption2: "País de nascimento, primeiro nome, sobrenome e data de nascimento",
    aNumberTip: "O Número A é um número de identificação de 8 ou 9 dígitos (ex., A 123-456-789) encontrado em documentos de imigração ou na pulseira da pessoa em detenção.",
    callICE: "Ligar para o ICE Diretamente",
    callICEDesc: "Se você não conseguir encontrar alguém online, ligue para o Centro de Contato do ICE em 1-866-347-2423. Esteja preparado para fornecer o máximo de informações de identificação possível.",
    
    phoneCalls: "Chamadas Telefônicas",
    phoneCallsDesc: "Pessoas detidas podem fazer chamadas a cobrar ou usar contas telefônicas pré-pagas. Cada instalação usa diferentes sistemas telefônicos. Familiares podem configurar contas pré-pagas para receber chamadas. Nota: as chamadas são tipicamente monitoradas e gravadas.",
    mail: "Correio e Cartas",
    mailDesc: "Você pode enviar cartas, cartões e fotos para o centro de detenção. Enderece o correio ao nome completo da pessoa e Número A no endereço da instalação. Algumas instalações têm restrições sobre o que pode ser enviado.",
    visitation: "Visitas Presenciais",
    visitationDesc: "Cada instalação tem seus próprios horários e regras de visita. Entre em contato com a instalação diretamente para confirmar horários e restrições. Visitantes geralmente precisam de identificação válida emitida pelo governo.",
    
    ntaExplain: "Uma Notificação de Comparecimento (NTA), Formulário I-862, é o documento oficial de acusação que inicia os procedimentos de deportação. É apresentado pelo Departamento de Segurança Interna (DHS) ao tribunal de imigração.",
    ntaContains: "A NTA Contém:",
    ntaItem1: "Alegações factuais sobre o status imigratório da pessoa",
    ntaItem2: "Acusações específicas de deportabilidade (razões para deportação)",
    ntaItem3: "Data, hora e local da primeira audiência",
    ntaItem4: "Aviso do direito a um advogado (sem custo para o governo)",
    afterNTA: "Após Receber uma NTA",
    afterNTADesc: "Uma vez apresentada a NTA, o caso é atribuído a um juiz de imigração. A primeira audiência (Audiência de Calendário Mestre) é agendada, onde o juiz explica as acusações e a pessoa pode responder.",
    
    searchFacilities: "Pesquisar Instalações",
    searchPlaceholder: "Pesquisar por nome, cidade ou estado...",
    region: "Região",
    allRegions: "Todas as Regiões",
    facilityName: "Nome da Instalação",
    location: "Localização",
    
    iceContact: "Centro de Contato do ICE",
    iceContactDesc: "Informações gerais e assistência para localizar detidos",
    eoirHotline: "Linha Automatizada do EOIR",
    eoirHotlineDesc: "Verificar datas de audiências e status de casos",
    freedomHotline: "Linha Nacional de Detenção de Imigração",
    freedomHotlineDesc: "Apoio gratuito para pessoas detidas (disque 9233# de dentro da detenção)",
    
    ctaTitle: "Precisa de Ajuda Legal?",
    ctaDesc: "Se seu ente querido está detido, o tempo é crítico. Nossos advogados de imigração experientes podem ajudar a lutar pela sua liberação.",
    ctaButton: "Solicitar Consulta",
    bondButton: "Saiba Sobre Audiências de Fiança",
  },
};

export default function DetentionGuide() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [expandedSections, setExpandedSections] = useState<string[]>(["whatHappens"]);
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };
  
  const regions = ["all", "Southwest", "Texas", "Southeast", "Gulf", "Northeast", "Midwest", "Mountain", "Mid-Atlantic", "Pacific Northwest"];
  
  const filteredFacilities = detentionFacilities.filter(facility => {
    const matchesSearch = 
      facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === "all" || facility.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <SEO 
        title="ICE Detention Guide"
        description="Comprehensive guide for families when a loved one is detained by ICE. Learn how to locate detained individuals, communicate with them, and understand the legal process including NTA and bond hearings."
        keywords="ICE detention, detained by ICE, find detained person, NTA notice to appear, immigration detention"
        canonicalUrl="/detention-guide"
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-6 w-6 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">Time-Sensitive Information</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.title}</h1>
            <p className="text-xl text-white/90 mb-4">{t.subtitle}</p>
            <p className="text-lg text-white/80">{t.intro}</p>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 bg-white border-b">
        <div className="container">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="outline" asChild>
              <a href="https://locator.ice.gov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                ICE Detainee Locator
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="tel:1-866-347-2423" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                1-866-347-2423
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/services/bond-hearings" className="flex items-center gap-2">
                <Scale className="h-4 w-4" />
                Bond Hearing Info
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* What Happens Section */}
            <Card className="overflow-hidden">
              <CardHeader 
                className="bg-primary/5 cursor-pointer"
                onClick={() => toggleSection("whatHappens")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{t.whatHappens}</CardTitle>
                  </div>
                  {expandedSections.includes("whatHappens") ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </CardHeader>
              {expandedSections.includes("whatHappens") && (
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">1</div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">{t.arrest}</h4>
                        <p className="text-muted-foreground">{t.arrestDesc}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">2</div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">{t.custody}</h4>
                        <p className="text-muted-foreground">{t.custodyDesc}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">3</div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">{t.nta}</h4>
                        <p className="text-muted-foreground">{t.ntaDesc}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">4</div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">{t.transfer}</h4>
                        <p className="text-muted-foreground">{t.transferDesc}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* How to Find Section */}
            <Card className="overflow-hidden">
              <CardHeader 
                className="bg-blue-50 cursor-pointer"
                onClick={() => toggleSection("howToFind")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Search className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{t.howToFind}</CardTitle>
                  </div>
                  {expandedSections.includes("howToFind") ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </CardHeader>
              {expandedSections.includes("howToFind") && (
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <ExternalLink className="h-5 w-5 text-blue-600" />
                      {t.locatorTitle}
                    </h4>
                    <p className="text-muted-foreground mb-4">{t.locatorDesc}</p>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{t.locatorOption1}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{t.locatorOption2}</span>
                      </li>
                    </ul>
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-yellow-800">{t.aNumberTip}</p>
                      </div>
                    </div>
                    <Button className="mt-4" asChild>
                      <a href="https://locator.ice.gov" target="_blank" rel="noopener noreferrer">
                        Go to ICE Locator <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Phone className="h-5 w-5 text-blue-600" />
                      {t.callICE}
                    </h4>
                    <p className="text-muted-foreground">{t.callICEDesc}</p>
                    <Button variant="outline" className="mt-4" asChild>
                      <a href="tel:1-866-347-2423">
                        <Phone className="mr-2 h-4 w-4" />
                        1-866-347-2423
                      </a>
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Communication Section */}
            <Card className="overflow-hidden">
              <CardHeader 
                className="bg-green-50 cursor-pointer"
                onClick={() => toggleSection("communicate")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">{t.howToCommunicate}</CardTitle>
                  </div>
                  {expandedSections.includes("communicate") ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </CardHeader>
              {expandedSections.includes("communicate") && (
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 border rounded-lg">
                      <Phone className="h-10 w-10 text-green-600 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">{t.phoneCalls}</h4>
                      <p className="text-sm text-muted-foreground">{t.phoneCallsDesc}</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Mail className="h-10 w-10 text-green-600 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">{t.mail}</h4>
                      <p className="text-sm text-muted-foreground">{t.mailDesc}</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Video className="h-10 w-10 text-green-600 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">{t.visitation}</h4>
                      <p className="text-sm text-muted-foreground">{t.visitationDesc}</p>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* NTA Section */}
            <Card className="overflow-hidden">
              <CardHeader 
                className="bg-purple-50 cursor-pointer"
                onClick={() => toggleSection("nta")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FileText className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl">{t.whatIsNTA}</CardTitle>
                  </div>
                  {expandedSections.includes("nta") ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </CardHeader>
              {expandedSections.includes("nta") && (
                <CardContent className="pt-6 space-y-6">
                  <p className="text-muted-foreground">{t.ntaExplain}</p>
                  
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">{t.ntaContains}</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>{t.ntaItem1}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>{t.ntaItem2}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>{t.ntaItem3}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>{t.ntaItem4}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{t.afterNTA}</h4>
                    <p className="text-muted-foreground">{t.afterNTADesc}</p>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Detention Centers Section */}
            <Card className="overflow-hidden">
              <CardHeader 
                className="bg-orange-50 cursor-pointer"
                onClick={() => toggleSection("facilities")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Building2 className="h-6 w-6 text-orange-600" />
                    </div>
                    <CardTitle className="text-xl">{t.detentionCenters}</CardTitle>
                  </div>
                  {expandedSections.includes("facilities") ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </CardHeader>
              {expandedSections.includes("facilities") && (
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <Input
                        placeholder={t.searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="px-4 py-2 border rounded-md bg-white"
                    >
                      <option value="all">{t.allRegions}</option>
                      {regions.filter(r => r !== "all").map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-slate-50">
                          <th className="text-left p-3 font-semibold">{t.facilityName}</th>
                          <th className="text-left p-3 font-semibold">{t.location}</th>
                          <th className="text-left p-3 font-semibold">{t.region}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredFacilities.slice(0, 20).map((facility, index) => (
                          <tr key={index} className="border-b hover:bg-slate-50">
                            <td className="p-3">{facility.name}</td>
                            <td className="p-3">{facility.city}, {facility.state}</td>
                            <td className="p-3">{facility.region}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {filteredFacilities.length > 20 && (
                    <p className="text-sm text-muted-foreground mt-4 text-center">
                      Showing 20 of {filteredFacilities.length} facilities. Use search to find specific locations.
                    </p>
                  )}
                  
                  <div className="mt-6 text-center">
                    <Button variant="outline" asChild>
                      <a href="https://www.ice.gov/detention-facilities" target="_blank" rel="noopener noreferrer">
                        View Full List on ICE.gov <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Important Numbers Section */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-red-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Phone className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle className="text-xl">{t.importantNumbers}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">{t.iceContact}</h4>
                    <p className="text-2xl font-bold text-primary mb-2">1-866-347-2423</p>
                    <p className="text-sm text-muted-foreground">{t.iceContactDesc}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">{t.eoirHotline}</h4>
                    <p className="text-2xl font-bold text-primary mb-2">1-800-898-7180</p>
                    <p className="text-sm text-muted-foreground">{t.eoirHotlineDesc}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">{t.freedomHotline}</h4>
                    <p className="text-2xl font-bold text-primary mb-2">9233#</p>
                    <p className="text-sm text-muted-foreground">{t.freedomHotlineDesc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl font-bold mb-4">{t.ctaTitle}</h2>
            <p className="text-lg text-white/80 mb-8">{t.ctaDesc}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/consultation">
                  {t.ctaButton}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/services/bond-hearings">
                  {t.bondButton}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
