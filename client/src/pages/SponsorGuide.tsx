import { motion } from "framer-motion";
import { 
  Users, 
  Scale, 
  FileCheck, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Phone,
  ClipboardList,
  Home,
  Briefcase,
  DollarSign,
  Shield,
  Heart,
  FileText,
  Gavel,
  Building,
  GraduationCap,
  Clock,
  MapPin,
  UserCheck,
  AlertCircle,
  Info
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";

const translations = {
  en: {
    pageTitle: "Sponsor Guide",
    pageDesc: "Complete guide to being a court sponsor for immigration bond hearings",
    heroTitle: "Immigration Bond Sponsor Guide",
    heroSubtitle: "A comprehensive guide to understanding sponsor qualifications, financial requirements, and what immigration judges look for when evaluating sponsors for bond hearings.",
    
    // What is a Court Sponsor
    whatIsTitle: "What is a Court Sponsor?",
    whatIsDesc: "A court sponsor is a person who agrees to take responsibility for ensuring that someone released on immigration bond attends all required court hearings and complies with the conditions of their release. Unlike a financial sponsor for a visa petition, a court sponsor's role is primarily about supervision and support.",
    
    // Court Sponsor vs USCIS Sponsor
    courtSponsorTitle: "Court Sponsor (Immigration Bond)",
    courtSponsorPoints: [
      "Helps ensure the person attends all immigration court hearings",
      "Provides a place for the person to live after release",
      "Demonstrates community ties to the immigration judge",
      "May need to testify at bond hearing about their relationship",
      "Not financially responsible for the bond amount"
    ],
    uscisSponsorTitle: "USCIS Sponsor (Affidavit of Support)",
    uscisSponsorPoints: [
      "Financially supports the immigrant to prevent public charge",
      "Signs a legally binding contract (Form I-864)",
      "Must meet income requirements (125% of poverty guidelines)",
      "Obligation continues until immigrant becomes citizen or works 40 quarters",
      "Can be sued by government to reimburse public benefits"
    ],
    
    // Who Can Be a Sponsor
    whoCanTitle: "Who Can Be a Sponsor",
    whoCanPoints: [
      "U.S. citizens or lawful permanent residents (strongest)",
      "Asylees, refugees, or TPS holders with valid status",
      "Family members (spouse, parent, sibling, adult child)",
      "Close friends with established, documented relationship",
      "Employers or coworkers who can verify employment history",
      "Community or religious organization leaders"
    ],
    
    // Who Cannot Be a Sponsor
    whoCannotTitle: "Who Cannot Be a Sponsor",
    whoCannotPoints: [
      "Undocumented immigrants without legal status",
      "Individuals with pending immigration cases",
      "People with serious criminal records",
      "Those who cannot provide stable housing",
      "Strangers with no established relationship",
      "People who cannot attend the bond hearing if needed"
    ],
    
    // What Judges Look For
    judgesTitle: "What Immigration Judges Look For in a Sponsor",
    judgesSubtitle: "Immigration judges evaluate sponsors based on several key factors that help determine whether the detained person is a flight risk. A strong sponsor can significantly improve the chances of bond being granted.",
    
    // Judge Factors
    legalStatusTitle: "Immigration Status",
    legalStatusDesc: "Judges strongly prefer sponsors who are U.S. citizens or lawful permanent residents. This demonstrates stability and reduces concerns that the sponsor might also face immigration issues. If you have a green card or citizenship, bring proof to the hearing.",
    
    relationshipTitle: "Relationship Quality",
    relationshipDesc: "The judge will assess how well you know the detained person and the nature of your relationship. Long-standing relationships (family, longtime friends, employers) carry more weight than recent acquaintances. Be prepared to explain how you met, how long you've known each other, and the depth of your connection.",
    
    housingTitle: "Housing Stability",
    housingDesc: "You must be able to provide stable housing for the person after release. Judges look favorably on sponsors who own their home or have a long-term lease. You should be able to describe the living arrangements, including the address, number of bedrooms, and who else lives there.",
    
    financialTitle: "Financial Stability",
    financialDesc: "While you're not financially responsible for the bond amount, judges want to see that you can support the person's basic needs if necessary. Stable employment, verifiable income, and the ability to help with transportation to court hearings are important factors.",
    
    commitmentTitle: "Commitment to Compliance",
    commitmentDesc: "Judges need to believe you will actively help ensure the person attends all court hearings and ICE check-ins. Be prepared to explain how you will remind them of court dates, provide transportation, and maintain regular contact.",
    
    characterTitle: "Your Own Character",
    characterDesc: "Your credibility matters. Judges may consider your own background, including any criminal history. A sponsor with a clean record and stable community ties strengthens the case for bond.",
    
    // Financial Requirements
    financialReqTitle: "Financial Requirements for Sponsors",
    financialReqDesc: "While court sponsors are not required to meet specific income thresholds like USCIS sponsors, demonstrating financial stability strengthens your credibility. Here's what judges typically consider:",
    
    incomeTitle: "Income Documentation",
    incomePoints: [
      "Recent pay stubs (last 2-3 months)",
      "Tax returns from the past 1-2 years",
      "Employment verification letter",
      "Bank statements showing stable account balance"
    ],
    
    housingDocsTitle: "Housing Documentation",
    housingDocsPoints: [
      "Mortgage statement or property deed (if homeowner)",
      "Lease agreement (if renting)",
      "Utility bills showing your address",
      "Letter from landlord confirming permission for additional occupant"
    ],
    
    noMinimumTitle: "No Minimum Income Requirement",
    noMinimumDesc: "Unlike USCIS sponsorship (Form I-864), there is no minimum income requirement for court sponsors. However, showing that you can provide basic support (housing, food, transportation to court) without financial hardship strengthens your case.",
    
    // Matter of Guerra Factors
    guerraTitle: "Matter of Guerra: Key Bond Factors",
    guerraDesc: "Immigration judges use factors from the Matter of Guerra case to evaluate bond eligibility. A strong sponsor helps address the \"flight risk\" concern. Here's how sponsors relate to each factor:",
    
    guerraFactors: [
      {
        factor: "Fixed Address",
        description: "The sponsor provides a stable address where the person will reside, demonstrating they won't disappear.",
        sponsorRole: "Provide proof of your address, housing type, and confirmation the person can live with you."
      },
      {
        factor: "Length of Residence",
        description: "How long the detained person has lived in the U.S. and their community ties.",
        sponsorRole: "Testify about how long you've known them and their involvement in the community."
      },
      {
        factor: "Family Ties",
        description: "Family members in the U.S. create strong incentives to remain and attend court.",
        sponsorRole: "If you're a family member, emphasize your relationship and mutual support."
      },
      {
        factor: "Employment History",
        description: "Stable employment shows community integration and responsibility.",
        sponsorRole: "If you're an employer, provide verification of their work history and character."
      },
      {
        factor: "Immigration History",
        description: "Prior compliance with immigration requirements and court orders.",
        sponsorRole: "Attest to their character and commitment to following the law."
      },
      {
        factor: "Attempts to Flee",
        description: "Any prior attempts to evade immigration authorities.",
        sponsorRole: "Explain how you will ensure they attend all hearings and don't flee."
      },
      {
        factor: "Manner of Entry",
        description: "How the person entered the U.S. (with inspection or without).",
        sponsorRole: "Focus on their current ties and your commitment to supervision."
      },
      {
        factor: "Criminal Record",
        description: "Any criminal history that might indicate danger or flight risk.",
        sponsorRole: "Speak to their rehabilitation and current character if applicable."
      }
    ],
    
    // Sponsor Responsibilities
    responsibilitiesTitle: "Sponsor Responsibilities",
    responsibilitiesDesc: "As a court sponsor, you're making a moral commitment to help ensure the person complies with all immigration requirements. Here are your key responsibilities:",
    
    responsibilities: [
      {
        icon: "Home",
        title: "Provide Housing",
        description: "Offer a stable place for the person to live after release from detention. Ensure they have a fixed address for court records."
      },
      {
        icon: "Phone",
        title: "Maintain Contact",
        description: "Stay in regular communication and know the person's whereabouts at all times. Be reachable if ICE or the court needs to contact them."
      },
      {
        icon: "ClipboardList",
        title: "Ensure Court Compliance",
        description: "Help ensure attendance at all court hearings, ICE check-ins, and appointments. Remind them of dates and provide transportation if needed."
      },
      {
        icon: "Briefcase",
        title: "Support Integration",
        description: "Help the person find employment, access legal services, and integrate into the community while their case proceeds."
      }
    ],
    
    // Bond Hearing Testimony
    testimonyTitle: "What to Expect at the Bond Hearing",
    testimonyDesc: "As a sponsor, you may be asked to testify at the bond hearing. The judge and government attorney may ask you questions. Here's what to prepare for:",
    
    testimonyQuestions: [
      {
        question: "Relationship Questions",
        description: "How do you know the detained person? How long have you known them? How often do you see or communicate with them?"
      },
      {
        question: "Housing Arrangements",
        description: "Where will the person live? What is the address? How many bedrooms? Who else lives there? Do you own or rent?"
      },
      {
        question: "Your Immigration Status",
        description: "Are you a U.S. citizen or permanent resident? When did you obtain your status? Do you have documentation?"
      },
      {
        question: "Commitment to Compliance",
        description: "How will you ensure they attend court hearings? Will you provide transportation? How will you remind them of court dates?"
      },
      {
        question: "Character Testimony",
        description: "What can you tell us about their character? Are they hardworking? Honest? Do they have ties to the community?"
      },
      {
        question: "Financial Ability",
        description: "Can you support them financially if needed? Do you have stable employment? Can you help with transportation costs?"
      }
    ],
    
    // Tips for Strong Sponsorship
    tipsTitle: "Tips for Being a Strong Sponsor",
    tips: [
      {
        title: "Bring Documentation",
        description: "Bring copies of your ID, proof of status, proof of address, and employment verification to the hearing."
      },
      {
        title: "Dress Professionally",
        description: "Dress as you would for a job interview. First impressions matter in court."
      },
      {
        title: "Be Honest",
        description: "Always tell the truth. If you don't know something, say so. Credibility is crucial."
      },
      {
        title: "Speak Clearly",
        description: "Answer questions directly and clearly. Don't volunteer unnecessary information."
      },
      {
        title: "Show Commitment",
        description: "Demonstrate that you understand the responsibilities and are committed to fulfilling them."
      },
      {
        title: "Prepare with Attorney",
        description: "If possible, meet with the detained person's attorney before the hearing to prepare your testimony."
      }
    ],
    
    // Important Notice
    noticeTitle: "Important Notice",
    noticeText1: "Being a court sponsor is a serious commitment. While you are not financially responsible for the bond amount, you are making a moral commitment to help ensure the person complies with all immigration court requirements.",
    noticeText2: "If the person fails to appear at hearings, it can affect future bond requests and the outcome of their case. Before agreeing to be a sponsor, make sure you understand the responsibilities and are confident in your ability to fulfill them.",
    
    // CTA
    ctaTitle: "Ready to Help as a Sponsor?",
    ctaDesc: "If you're considering being a court sponsor for someone in immigration detention, our attorneys can help you understand the process and prepare for the bond hearing.",
    ctaConsultation: "Schedule Consultation",
    ctaSponsorLetter: "Create Sponsor Letter",
    ctaBondQuestionnaire: "Bond Questionnaire"
  },
  es: {
    pageTitle: "Guía del Patrocinador",
    pageDesc: "Guía completa para ser patrocinador en audiencias de fianza de inmigración",
    heroTitle: "Guía del Patrocinador de Fianza de Inmigración",
    heroSubtitle: "Una guía completa para entender las calificaciones del patrocinador, los requisitos financieros y lo que los jueces de inmigración buscan al evaluar patrocinadores para audiencias de fianza.",
    
    whatIsTitle: "¿Qué es un Patrocinador de la Corte?",
    whatIsDesc: "Un patrocinador de la corte es una persona que acepta la responsabilidad de asegurar que alguien liberado bajo fianza de inmigración asista a todas las audiencias requeridas y cumpla con las condiciones de su liberación. A diferencia de un patrocinador financiero para una petición de visa, el rol del patrocinador de la corte es principalmente de supervisión y apoyo.",
    
    courtSponsorTitle: "Patrocinador de la Corte (Fianza de Inmigración)",
    courtSponsorPoints: [
      "Ayuda a asegurar que la persona asista a todas las audiencias de inmigración",
      "Proporciona un lugar para que la persona viva después de su liberación",
      "Demuestra lazos comunitarios al juez de inmigración",
      "Puede necesitar testificar en la audiencia de fianza sobre su relación",
      "No es financieramente responsable por el monto de la fianza"
    ],
    uscisSponsorTitle: "Patrocinador de USCIS (Declaración Jurada de Apoyo)",
    uscisSponsorPoints: [
      "Apoya financieramente al inmigrante para prevenir carga pública",
      "Firma un contrato legalmente vinculante (Formulario I-864)",
      "Debe cumplir requisitos de ingresos (125% de las guías de pobreza)",
      "La obligación continúa hasta que el inmigrante se convierta en ciudadano o trabaje 40 trimestres",
      "Puede ser demandado por el gobierno para reembolsar beneficios públicos"
    ],
    
    whoCanTitle: "Quién Puede Ser Patrocinador",
    whoCanPoints: [
      "Ciudadanos estadounidenses o residentes permanentes legales (más fuerte)",
      "Asilados, refugiados o titulares de TPS con estatus válido",
      "Familiares (cónyuge, padre, hermano, hijo adulto)",
      "Amigos cercanos con relación establecida y documentada",
      "Empleadores o compañeros de trabajo que pueden verificar historial laboral",
      "Líderes de organizaciones comunitarias o religiosas"
    ],
    
    whoCannotTitle: "Quién No Puede Ser Patrocinador",
    whoCannotPoints: [
      "Inmigrantes indocumentados sin estatus legal",
      "Personas con casos de inmigración pendientes",
      "Personas con antecedentes penales graves",
      "Aquellos que no pueden proporcionar vivienda estable",
      "Extraños sin relación establecida",
      "Personas que no pueden asistir a la audiencia de fianza si es necesario"
    ],
    
    judgesTitle: "Lo Que los Jueces de Inmigración Buscan en un Patrocinador",
    judgesSubtitle: "Los jueces de inmigración evalúan a los patrocinadores basándose en varios factores clave que ayudan a determinar si la persona detenida es un riesgo de fuga. Un patrocinador fuerte puede mejorar significativamente las posibilidades de que se otorgue la fianza.",
    
    legalStatusTitle: "Estatus Migratorio",
    legalStatusDesc: "Los jueces prefieren fuertemente patrocinadores que sean ciudadanos estadounidenses o residentes permanentes legales. Esto demuestra estabilidad y reduce preocupaciones de que el patrocinador también pueda enfrentar problemas de inmigración. Si tiene tarjeta verde o ciudadanía, traiga prueba a la audiencia.",
    
    relationshipTitle: "Calidad de la Relación",
    relationshipDesc: "El juez evaluará qué tan bien conoce a la persona detenida y la naturaleza de su relación. Las relaciones de larga data (familia, amigos de mucho tiempo, empleadores) tienen más peso que los conocidos recientes. Esté preparado para explicar cómo se conocieron, cuánto tiempo se conocen y la profundidad de su conexión.",
    
    housingTitle: "Estabilidad de Vivienda",
    housingDesc: "Debe poder proporcionar vivienda estable para la persona después de su liberación. Los jueces ven favorablemente a los patrocinadores que son propietarios de su casa o tienen un contrato de arrendamiento a largo plazo. Debe poder describir los arreglos de vivienda, incluyendo la dirección, número de habitaciones y quién más vive allí.",
    
    financialTitle: "Estabilidad Financiera",
    financialDesc: "Aunque no es financieramente responsable por el monto de la fianza, los jueces quieren ver que puede apoyar las necesidades básicas de la persona si es necesario. El empleo estable, los ingresos verificables y la capacidad de ayudar con el transporte a las audiencias son factores importantes.",
    
    commitmentTitle: "Compromiso con el Cumplimiento",
    commitmentDesc: "Los jueces necesitan creer que ayudará activamente a asegurar que la persona asista a todas las audiencias y citas con ICE. Esté preparado para explicar cómo les recordará las fechas de la corte, proporcionará transporte y mantendrá contacto regular.",
    
    characterTitle: "Su Propio Carácter",
    characterDesc: "Su credibilidad importa. Los jueces pueden considerar su propio historial, incluyendo cualquier antecedente penal. Un patrocinador con un historial limpio y lazos comunitarios estables fortalece el caso para la fianza.",
    
    financialReqTitle: "Requisitos Financieros para Patrocinadores",
    financialReqDesc: "Aunque los patrocinadores de la corte no están obligados a cumplir umbrales de ingresos específicos como los patrocinadores de USCIS, demostrar estabilidad financiera fortalece su credibilidad. Esto es lo que los jueces típicamente consideran:",
    
    incomeTitle: "Documentación de Ingresos",
    incomePoints: [
      "Talones de pago recientes (últimos 2-3 meses)",
      "Declaraciones de impuestos de los últimos 1-2 años",
      "Carta de verificación de empleo",
      "Estados de cuenta bancarios mostrando balance estable"
    ],
    
    housingDocsTitle: "Documentación de Vivienda",
    housingDocsPoints: [
      "Estado de hipoteca o escritura de propiedad (si es propietario)",
      "Contrato de arrendamiento (si alquila)",
      "Facturas de servicios mostrando su dirección",
      "Carta del propietario confirmando permiso para ocupante adicional"
    ],
    
    noMinimumTitle: "Sin Requisito Mínimo de Ingresos",
    noMinimumDesc: "A diferencia del patrocinio de USCIS (Formulario I-864), no hay requisito mínimo de ingresos para patrocinadores de la corte. Sin embargo, mostrar que puede proporcionar apoyo básico (vivienda, comida, transporte a la corte) sin dificultades financieras fortalece su caso.",
    
    guerraTitle: "Matter of Guerra: Factores Clave de Fianza",
    guerraDesc: "Los jueces de inmigración usan factores del caso Matter of Guerra para evaluar la elegibilidad de fianza. Un patrocinador fuerte ayuda a abordar la preocupación de \"riesgo de fuga\". Así es como los patrocinadores se relacionan con cada factor:",
    
    guerraFactors: [
      {
        factor: "Dirección Fija",
        description: "El patrocinador proporciona una dirección estable donde la persona residirá, demostrando que no desaparecerá.",
        sponsorRole: "Proporcione prueba de su dirección, tipo de vivienda y confirmación de que la persona puede vivir con usted."
      },
      {
        factor: "Duración de Residencia",
        description: "Cuánto tiempo ha vivido la persona detenida en EE.UU. y sus lazos comunitarios.",
        sponsorRole: "Testifique sobre cuánto tiempo los conoce y su participación en la comunidad."
      },
      {
        factor: "Lazos Familiares",
        description: "Los familiares en EE.UU. crean fuertes incentivos para permanecer y asistir a la corte.",
        sponsorRole: "Si es familiar, enfatice su relación y apoyo mutuo."
      },
      {
        factor: "Historial de Empleo",
        description: "El empleo estable muestra integración comunitaria y responsabilidad.",
        sponsorRole: "Si es empleador, proporcione verificación de su historial laboral y carácter."
      },
      {
        factor: "Historial de Inmigración",
        description: "Cumplimiento previo con requisitos de inmigración y órdenes judiciales.",
        sponsorRole: "Atestigüe sobre su carácter y compromiso de seguir la ley."
      },
      {
        factor: "Intentos de Huir",
        description: "Cualquier intento previo de evadir autoridades de inmigración.",
        sponsorRole: "Explique cómo asegurará que asistan a todas las audiencias y no huyan."
      },
      {
        factor: "Manera de Entrada",
        description: "Cómo la persona entró a EE.UU. (con inspección o sin ella).",
        sponsorRole: "Enfóquese en sus lazos actuales y su compromiso de supervisión."
      },
      {
        factor: "Antecedentes Penales",
        description: "Cualquier historial criminal que pueda indicar peligro o riesgo de fuga.",
        sponsorRole: "Hable sobre su rehabilitación y carácter actual si aplica."
      }
    ],
    
    responsibilitiesTitle: "Responsabilidades del Patrocinador",
    responsibilitiesDesc: "Como patrocinador de la corte, está haciendo un compromiso moral de ayudar a asegurar que la persona cumpla con todos los requisitos de inmigración. Estas son sus responsabilidades clave:",
    
    responsibilities: [
      {
        icon: "Home",
        title: "Proporcionar Vivienda",
        description: "Ofrecer un lugar estable para que la persona viva después de su liberación de detención. Asegurar que tengan una dirección fija para los registros de la corte."
      },
      {
        icon: "Phone",
        title: "Mantener Contacto",
        description: "Mantenerse en comunicación regular y saber el paradero de la persona en todo momento. Estar disponible si ICE o la corte necesitan contactarlos."
      },
      {
        icon: "ClipboardList",
        title: "Asegurar Cumplimiento",
        description: "Ayudar a asegurar la asistencia a todas las audiencias, citas con ICE y citas. Recordarles las fechas y proporcionar transporte si es necesario."
      },
      {
        icon: "Briefcase",
        title: "Apoyar Integración",
        description: "Ayudar a la persona a encontrar empleo, acceder a servicios legales e integrarse en la comunidad mientras su caso procede."
      }
    ],
    
    testimonyTitle: "Qué Esperar en la Audiencia de Fianza",
    testimonyDesc: "Como patrocinador, puede que le pidan testificar en la audiencia de fianza. El juez y el abogado del gobierno pueden hacerle preguntas. Esto es para lo que debe prepararse:",
    
    testimonyQuestions: [
      {
        question: "Preguntas sobre la Relación",
        description: "¿Cómo conoce a la persona detenida? ¿Cuánto tiempo la conoce? ¿Con qué frecuencia se ven o comunican?"
      },
      {
        question: "Arreglos de Vivienda",
        description: "¿Dónde vivirá la persona? ¿Cuál es la dirección? ¿Cuántas habitaciones? ¿Quién más vive allí? ¿Es propietario o alquila?"
      },
      {
        question: "Su Estatus Migratorio",
        description: "¿Es ciudadano estadounidense o residente permanente? ¿Cuándo obtuvo su estatus? ¿Tiene documentación?"
      },
      {
        question: "Compromiso con el Cumplimiento",
        description: "¿Cómo asegurará que asistan a las audiencias? ¿Proporcionará transporte? ¿Cómo les recordará las fechas de la corte?"
      },
      {
        question: "Testimonio de Carácter",
        description: "¿Qué puede decirnos sobre su carácter? ¿Son trabajadores? ¿Honestos? ¿Tienen lazos con la comunidad?"
      },
      {
        question: "Capacidad Financiera",
        description: "¿Puede apoyarlos financieramente si es necesario? ¿Tiene empleo estable? ¿Puede ayudar con costos de transporte?"
      }
    ],
    
    tipsTitle: "Consejos para Ser un Patrocinador Fuerte",
    tips: [
      {
        title: "Traiga Documentación",
        description: "Traiga copias de su identificación, prueba de estatus, prueba de dirección y verificación de empleo a la audiencia."
      },
      {
        title: "Vístase Profesionalmente",
        description: "Vístase como lo haría para una entrevista de trabajo. Las primeras impresiones importan en la corte."
      },
      {
        title: "Sea Honesto",
        description: "Siempre diga la verdad. Si no sabe algo, dígalo. La credibilidad es crucial."
      },
      {
        title: "Hable Claramente",
        description: "Responda preguntas directa y claramente. No ofrezca información innecesaria."
      },
      {
        title: "Muestre Compromiso",
        description: "Demuestre que entiende las responsabilidades y está comprometido a cumplirlas."
      },
      {
        title: "Prepárese con el Abogado",
        description: "Si es posible, reúnase con el abogado de la persona detenida antes de la audiencia para preparar su testimonio."
      }
    ],
    
    noticeTitle: "Aviso Importante",
    noticeText1: "Ser patrocinador de la corte es un compromiso serio. Aunque no es financieramente responsable por el monto de la fianza, está haciendo un compromiso moral de ayudar a asegurar que la persona cumpla con todos los requisitos de la corte de inmigración.",
    noticeText2: "Si la persona no se presenta a las audiencias, puede afectar futuras solicitudes de fianza y el resultado de su caso. Antes de aceptar ser patrocinador, asegúrese de entender las responsabilidades y estar seguro de su capacidad para cumplirlas.",
    
    ctaTitle: "¿Listo para Ayudar como Patrocinador?",
    ctaDesc: "Si está considerando ser patrocinador de la corte para alguien en detención de inmigración, nuestros abogados pueden ayudarle a entender el proceso y prepararse para la audiencia de fianza.",
    ctaConsultation: "Programar Consulta",
    ctaSponsorLetter: "Crear Carta de Patrocinador",
    ctaBondQuestionnaire: "Cuestionario de Fianza"
  },
  pt: {
    pageTitle: "Guia do Patrocinador",
    pageDesc: "Guia completo para ser patrocinador em audiências de fiança de imigração",
    heroTitle: "Guia do Patrocinador de Fiança de Imigração",
    heroSubtitle: "Um guia completo para entender as qualificações do patrocinador, requisitos financeiros e o que os juízes de imigração procuram ao avaliar patrocinadores para audiências de fiança.",
    
    whatIsTitle: "O Que é um Patrocinador do Tribunal?",
    whatIsDesc: "Um patrocinador do tribunal é uma pessoa que aceita a responsabilidade de garantir que alguém liberado sob fiança de imigração compareça a todas as audiências necessárias e cumpra as condições de sua liberação. Diferente de um patrocinador financeiro para uma petição de visto, o papel do patrocinador do tribunal é principalmente de supervisão e apoio.",
    
    courtSponsorTitle: "Patrocinador do Tribunal (Fiança de Imigração)",
    courtSponsorPoints: [
      "Ajuda a garantir que a pessoa compareça a todas as audiências de imigração",
      "Fornece um lugar para a pessoa morar após a liberação",
      "Demonstra laços comunitários ao juiz de imigração",
      "Pode precisar testemunhar na audiência de fiança sobre seu relacionamento",
      "Não é financeiramente responsável pelo valor da fiança"
    ],
    uscisSponsorTitle: "Patrocinador do USCIS (Declaração de Apoio)",
    uscisSponsorPoints: [
      "Apoia financeiramente o imigrante para prevenir encargo público",
      "Assina um contrato legalmente vinculante (Formulário I-864)",
      "Deve atender requisitos de renda (125% das diretrizes de pobreza)",
      "A obrigação continua até o imigrante se tornar cidadão ou trabalhar 40 trimestres",
      "Pode ser processado pelo governo para reembolsar benefícios públicos"
    ],
    
    whoCanTitle: "Quem Pode Ser Patrocinador",
    whoCanPoints: [
      "Cidadãos americanos ou residentes permanentes legais (mais forte)",
      "Asilados, refugiados ou portadores de TPS com status válido",
      "Familiares (cônjuge, pai, irmão, filho adulto)",
      "Amigos próximos com relacionamento estabelecido e documentado",
      "Empregadores ou colegas de trabalho que podem verificar histórico de emprego",
      "Líderes de organizações comunitárias ou religiosas"
    ],
    
    whoCannotTitle: "Quem Não Pode Ser Patrocinador",
    whoCannotPoints: [
      "Imigrantes indocumentados sem status legal",
      "Indivíduos com casos de imigração pendentes",
      "Pessoas com antecedentes criminais graves",
      "Aqueles que não podem fornecer moradia estável",
      "Estranhos sem relacionamento estabelecido",
      "Pessoas que não podem comparecer à audiência de fiança se necessário"
    ],
    
    judgesTitle: "O Que os Juízes de Imigração Procuram em um Patrocinador",
    judgesSubtitle: "Os juízes de imigração avaliam os patrocinadores com base em vários fatores-chave que ajudam a determinar se a pessoa detida é um risco de fuga. Um patrocinador forte pode melhorar significativamente as chances de a fiança ser concedida.",
    
    legalStatusTitle: "Status Imigratório",
    legalStatusDesc: "Os juízes preferem fortemente patrocinadores que sejam cidadãos americanos ou residentes permanentes legais. Isso demonstra estabilidade e reduz preocupações de que o patrocinador também possa enfrentar problemas de imigração. Se você tem green card ou cidadania, traga prova para a audiência.",
    
    relationshipTitle: "Qualidade do Relacionamento",
    relationshipDesc: "O juiz avaliará quão bem você conhece a pessoa detida e a natureza do seu relacionamento. Relacionamentos de longa data (família, amigos de longa data, empregadores) têm mais peso do que conhecidos recentes. Esteja preparado para explicar como se conheceram, há quanto tempo se conhecem e a profundidade da sua conexão.",
    
    housingTitle: "Estabilidade de Moradia",
    housingDesc: "Você deve ser capaz de fornecer moradia estável para a pessoa após a liberação. Os juízes veem favoravelmente patrocinadores que são proprietários de sua casa ou têm um contrato de aluguel de longo prazo. Você deve ser capaz de descrever os arranjos de moradia, incluindo o endereço, número de quartos e quem mais mora lá.",
    
    financialTitle: "Estabilidade Financeira",
    financialDesc: "Embora você não seja financeiramente responsável pelo valor da fiança, os juízes querem ver que você pode apoiar as necessidades básicas da pessoa se necessário. Emprego estável, renda verificável e capacidade de ajudar com transporte para audiências são fatores importantes.",
    
    commitmentTitle: "Compromisso com o Cumprimento",
    commitmentDesc: "Os juízes precisam acreditar que você ajudará ativamente a garantir que a pessoa compareça a todas as audiências e compromissos com o ICE. Esteja preparado para explicar como você os lembrará das datas do tribunal, fornecerá transporte e manterá contato regular.",
    
    characterTitle: "Seu Próprio Caráter",
    characterDesc: "Sua credibilidade importa. Os juízes podem considerar seu próprio histórico, incluindo qualquer antecedente criminal. Um patrocinador com histórico limpo e laços comunitários estáveis fortalece o caso para a fiança.",
    
    financialReqTitle: "Requisitos Financeiros para Patrocinadores",
    financialReqDesc: "Embora os patrocinadores do tribunal não sejam obrigados a atender limites de renda específicos como os patrocinadores do USCIS, demonstrar estabilidade financeira fortalece sua credibilidade. Aqui está o que os juízes tipicamente consideram:",
    
    incomeTitle: "Documentação de Renda",
    incomePoints: [
      "Contracheques recentes (últimos 2-3 meses)",
      "Declarações de imposto dos últimos 1-2 anos",
      "Carta de verificação de emprego",
      "Extratos bancários mostrando saldo estável"
    ],
    
    housingDocsTitle: "Documentação de Moradia",
    housingDocsPoints: [
      "Extrato de hipoteca ou escritura de propriedade (se proprietário)",
      "Contrato de aluguel (se aluga)",
      "Contas de serviços mostrando seu endereço",
      "Carta do proprietário confirmando permissão para ocupante adicional"
    ],
    
    noMinimumTitle: "Sem Requisito Mínimo de Renda",
    noMinimumDesc: "Diferente do patrocínio do USCIS (Formulário I-864), não há requisito mínimo de renda para patrocinadores do tribunal. No entanto, mostrar que você pode fornecer apoio básico (moradia, comida, transporte para o tribunal) sem dificuldades financeiras fortalece seu caso.",
    
    guerraTitle: "Matter of Guerra: Fatores-Chave de Fiança",
    guerraDesc: "Os juízes de imigração usam fatores do caso Matter of Guerra para avaliar a elegibilidade de fiança. Um patrocinador forte ajuda a abordar a preocupação de \"risco de fuga\". Veja como os patrocinadores se relacionam com cada fator:",
    
    guerraFactors: [
      {
        factor: "Endereço Fixo",
        description: "O patrocinador fornece um endereço estável onde a pessoa residirá, demonstrando que não desaparecerá.",
        sponsorRole: "Forneça prova do seu endereço, tipo de moradia e confirmação de que a pessoa pode morar com você."
      },
      {
        factor: "Tempo de Residência",
        description: "Quanto tempo a pessoa detida viveu nos EUA e seus laços comunitários.",
        sponsorRole: "Testemunhe sobre há quanto tempo os conhece e seu envolvimento na comunidade."
      },
      {
        factor: "Laços Familiares",
        description: "Familiares nos EUA criam fortes incentivos para permanecer e comparecer ao tribunal.",
        sponsorRole: "Se você é familiar, enfatize seu relacionamento e apoio mútuo."
      },
      {
        factor: "Histórico de Emprego",
        description: "Emprego estável mostra integração comunitária e responsabilidade.",
        sponsorRole: "Se você é empregador, forneça verificação do histórico de trabalho e caráter deles."
      },
      {
        factor: "Histórico de Imigração",
        description: "Cumprimento prévio com requisitos de imigração e ordens judiciais.",
        sponsorRole: "Ateste sobre o caráter deles e compromisso de seguir a lei."
      },
      {
        factor: "Tentativas de Fugir",
        description: "Qualquer tentativa prévia de evadir autoridades de imigração.",
        sponsorRole: "Explique como você garantirá que compareçam a todas as audiências e não fujam."
      },
      {
        factor: "Forma de Entrada",
        description: "Como a pessoa entrou nos EUA (com inspeção ou sem).",
        sponsorRole: "Foque nos laços atuais deles e seu compromisso de supervisão."
      },
      {
        factor: "Antecedentes Criminais",
        description: "Qualquer histórico criminal que possa indicar perigo ou risco de fuga.",
        sponsorRole: "Fale sobre a reabilitação e caráter atual deles se aplicável."
      }
    ],
    
    responsibilitiesTitle: "Responsabilidades do Patrocinador",
    responsibilitiesDesc: "Como patrocinador do tribunal, você está fazendo um compromisso moral de ajudar a garantir que a pessoa cumpra todos os requisitos de imigração. Aqui estão suas responsabilidades principais:",
    
    responsibilities: [
      {
        icon: "Home",
        title: "Fornecer Moradia",
        description: "Oferecer um lugar estável para a pessoa morar após a liberação da detenção. Garantir que tenham um endereço fixo para os registros do tribunal."
      },
      {
        icon: "Phone",
        title: "Manter Contato",
        description: "Manter comunicação regular e saber o paradeiro da pessoa o tempo todo. Estar disponível se o ICE ou o tribunal precisarem contatá-los."
      },
      {
        icon: "ClipboardList",
        title: "Garantir Cumprimento",
        description: "Ajudar a garantir comparecimento a todas as audiências, compromissos com o ICE e consultas. Lembrá-los das datas e fornecer transporte se necessário."
      },
      {
        icon: "Briefcase",
        title: "Apoiar Integração",
        description: "Ajudar a pessoa a encontrar emprego, acessar serviços legais e se integrar na comunidade enquanto seu caso prossegue."
      }
    ],
    
    testimonyTitle: "O Que Esperar na Audiência de Fiança",
    testimonyDesc: "Como patrocinador, você pode ser solicitado a testemunhar na audiência de fiança. O juiz e o advogado do governo podem fazer perguntas. Aqui está o que preparar:",
    
    testimonyQuestions: [
      {
        question: "Perguntas sobre o Relacionamento",
        description: "Como você conhece a pessoa detida? Há quanto tempo a conhece? Com que frequência vocês se veem ou se comunicam?"
      },
      {
        question: "Arranjos de Moradia",
        description: "Onde a pessoa vai morar? Qual é o endereço? Quantos quartos? Quem mais mora lá? Você é proprietário ou aluga?"
      },
      {
        question: "Seu Status Imigratório",
        description: "Você é cidadão americano ou residente permanente? Quando obteve seu status? Você tem documentação?"
      },
      {
        question: "Compromisso com o Cumprimento",
        description: "Como você garantirá que compareçam às audiências? Você fornecerá transporte? Como os lembrará das datas do tribunal?"
      },
      {
        question: "Testemunho de Caráter",
        description: "O que você pode nos dizer sobre o caráter deles? São trabalhadores? Honestos? Têm laços com a comunidade?"
      },
      {
        question: "Capacidade Financeira",
        description: "Você pode apoiá-los financeiramente se necessário? Você tem emprego estável? Pode ajudar com custos de transporte?"
      }
    ],
    
    tipsTitle: "Dicas para Ser um Patrocinador Forte",
    tips: [
      {
        title: "Traga Documentação",
        description: "Traga cópias da sua identificação, prova de status, prova de endereço e verificação de emprego para a audiência."
      },
      {
        title: "Vista-se Profissionalmente",
        description: "Vista-se como faria para uma entrevista de emprego. Primeiras impressões importam no tribunal."
      },
      {
        title: "Seja Honesto",
        description: "Sempre diga a verdade. Se não sabe algo, diga. Credibilidade é crucial."
      },
      {
        title: "Fale Claramente",
        description: "Responda perguntas direta e claramente. Não ofereça informações desnecessárias."
      },
      {
        title: "Mostre Compromisso",
        description: "Demonstre que entende as responsabilidades e está comprometido a cumpri-las."
      },
      {
        title: "Prepare-se com o Advogado",
        description: "Se possível, reúna-se com o advogado da pessoa detida antes da audiência para preparar seu testemunho."
      }
    ],
    
    noticeTitle: "Aviso Importante",
    noticeText1: "Ser patrocinador do tribunal é um compromisso sério. Embora você não seja financeiramente responsável pelo valor da fiança, está fazendo um compromisso moral de ajudar a garantir que a pessoa cumpra todos os requisitos do tribunal de imigração.",
    noticeText2: "Se a pessoa não comparecer às audiências, pode afetar futuras solicitações de fiança e o resultado do caso. Antes de concordar em ser patrocinador, certifique-se de entender as responsabilidades e estar confiante na sua capacidade de cumpri-las.",
    
    ctaTitle: "Pronto para Ajudar como Patrocinador?",
    ctaDesc: "Se você está considerando ser patrocinador do tribunal para alguém em detenção de imigração, nossos advogados podem ajudá-lo a entender o processo e se preparar para a audiência de fiança.",
    ctaConsultation: "Agendar Consulta",
    ctaSponsorLetter: "Criar Carta de Patrocinador",
    ctaBondQuestionnaire: "Questionário de Fiança"
  }
};

export default function SponsorGuide() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;

  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      Home, Phone, ClipboardList, Briefcase, DollarSign, Shield, Heart, FileText, Gavel, Building, GraduationCap, Clock, MapPin, UserCheck
    };
    return icons[iconName] || Home;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <SEO 
        titleKey="seo.sponsorGuide.title"
        descriptionKey="seo.sponsorGuide.desc"
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t.heroTitle}
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              {t.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* What is a Court Sponsor */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">{t.whatIsTitle}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t.whatIsDesc}
              </p>
            </motion.div>

            {/* Comparison: Court Sponsor vs USCIS Sponsor */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-2xl border-2 border-primary/20 p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Scale className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{t.courtSponsorTitle}</h3>
                </div>
                <ul className="space-y-3">
                  {t.courtSponsorPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-2xl border-2 border-secondary/20 p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <FileCheck className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold">{t.uscisSponsorTitle}</h3>
                </div>
                <ul className="space-y-3">
                  {t.uscisSponsorPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can / Cannot Be a Sponsor */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-sm border"
              >
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-green-800">{t.whoCanTitle}</h3>
                <ul className="space-y-3">
                  {t.whoCanPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border"
              >
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mb-4">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-red-800">{t.whoCannotTitle}</h3>
                <ul className="space-y-3">
                  {t.whoCannotPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* What Judges Look For */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">{t.judgesTitle}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t.judgesSubtitle}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: t.legalStatusTitle, desc: t.legalStatusDesc },
                { icon: Heart, title: t.relationshipTitle, desc: t.relationshipDesc },
                { icon: Home, title: t.housingTitle, desc: t.housingDesc },
                { icon: DollarSign, title: t.financialTitle, desc: t.financialDesc },
                { icon: ClipboardList, title: t.commitmentTitle, desc: t.commitmentDesc },
                { icon: UserCheck, title: t.characterTitle, desc: t.characterDesc },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl border p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Financial Requirements */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">{t.financialReqTitle}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t.financialReqDesc}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl border p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-6 h-6 text-primary" />
                  <h3 className="font-bold text-lg">{t.incomeTitle}</h3>
                </div>
                <ul className="space-y-2">
                  {t.incomePoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl border p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Home className="w-6 h-6 text-primary" />
                  <h3 className="font-bold text-lg">{t.housingDocsTitle}</h3>
                </div>
                <ul className="space-y-2">
                  {t.housingDocsPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-blue-50 border border-blue-200 rounded-xl p-6"
            >
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-blue-900 mb-2">{t.noMinimumTitle}</h4>
                  <p className="text-blue-800">{t.noMinimumDesc}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Matter of Guerra Factors */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Gavel className="w-4 h-4" />
                Legal Framework
              </div>
              <h2 className="text-3xl font-bold mb-4">{t.guerraTitle}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t.guerraDesc}
              </p>
            </motion.div>

            <div className="grid gap-4">
              {t.guerraFactors.map((item, index) => (
                <motion.div
                  key={item.factor}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white rounded-xl border p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{item.factor}</h3>
                      <p className="text-muted-foreground mb-3">{item.description}</p>
                      <div className="bg-primary/5 rounded-lg p-3">
                        <p className="text-sm">
                          <span className="font-semibold text-primary">Sponsor's Role:</span>{" "}
                          <span className="text-slate-600">{item.sponsorRole}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sponsor Responsibilities */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">{t.responsibilitiesTitle}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.responsibilitiesDesc}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.responsibilities.map((item, index) => {
                const Icon = getIcon(item.icon);
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl border p-6 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Bond Hearing Testimony */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">{t.testimonyTitle}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.testimonyDesc}
              </p>
            </motion.div>

            <div className="bg-white rounded-2xl border-2 border-slate-100 p-8">
              <div className="space-y-6">
                {t.testimonyQuestions.map((item, index) => (
                  <div key={item.question} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.question}</h4>
                      <p className="text-slate-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips for Strong Sponsorship */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">{t.tipsTitle}</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.tips.map((tip, index) => (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl border p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                    </div>
                    <h3 className="font-bold">{tip.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-amber-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-amber-900 mb-2">{t.noticeTitle}</h3>
                  <p className="text-amber-800 mb-4">{t.noticeText1}</p>
                  <p className="text-amber-800">{t.noticeText2}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{t.ctaTitle}</h2>
            <p className="text-xl text-white/80 mb-8">{t.ctaDesc}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/appointments">
                <Button size="lg" variant="secondary" className="text-primary font-semibold">
                  {t.ctaConsultation}
                </Button>
              </Link>
              <Link href="/sponsor-letter-generator">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  {t.ctaSponsorLetter}
                </Button>
              </Link>
              <Link href="/bond-questionnaire">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  {t.ctaBondQuestionnaire}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
