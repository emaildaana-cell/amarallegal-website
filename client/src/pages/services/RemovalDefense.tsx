import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Phone, ArrowRight, Shield, Scale, FileCheck, Plane, Clock, 
  AlertTriangle, CheckCircle, Users, Gavel, FileText, HelpCircle,
  ChevronDown, ChevronUp, Calendar, MapPin, Building
} from "lucide-react";
import SEO from "@/components/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const translations = {
  en: {
    title: "Removal Defense",
    subtitle: "Protecting Your Right to Remain in the United States",
    intro: "When you or a loved one faces deportation, having experienced legal representation can make the difference between staying with your family in the United States or being forced to leave everything behind. Our removal defense attorneys have successfully defended thousands of clients in immigration court, fighting for their right to remain in this country.",
    
    // What is Removal
    whatIsTitle: "What is Removal (Deportation)?",
    whatIsDesc: "Removal, commonly known as deportation, is the formal process by which the U.S. government expels a non-citizen from the country. This can happen to anyone who is not a U.S. citizen, including lawful permanent residents (green card holders), visa holders, and undocumented individuals. The removal process begins when the Department of Homeland Security (DHS) issues a Notice to Appear (NTA), which is a charging document that initiates proceedings in immigration court.",
    
    // Grounds for Removal
    groundsTitle: "Common Grounds for Removal",
    groundsDesc: "Understanding why someone may face removal is the first step in building a strong defense. The Immigration and Nationality Act (INA) specifies numerous grounds for removal, including:",
    ground1Title: "Immigration Violations",
    ground1Desc: "Entering without inspection, overstaying a visa, violating visa terms, or immigration fraud can all trigger removal proceedings.",
    ground2Title: "Criminal Convictions",
    ground2Desc: "Certain crimes make non-citizens deportable, including aggravated felonies, crimes involving moral turpitude, drug offenses, firearms offenses, and domestic violence.",
    ground3Title: "Security Concerns",
    ground3Desc: "Terrorism-related activities, espionage, or other national security concerns can result in removal proceedings.",
    ground4Title: "Public Charge",
    ground4Desc: "Becoming a public charge within 5 years of entry (if the factors existed before entry) may be grounds for removal in certain circumstances.",
    
    // Forms of Relief
    reliefTitle: "Forms of Relief from Removal",
    reliefDesc: "Even if you are in removal proceedings, there are many forms of relief that may allow you to remain in the United States legally. Our attorneys will evaluate your case to determine which options may be available to you:",
    
    cancellationTitle: "Cancellation of Removal",
    cancellationDesc: "Available to both lawful permanent residents and certain non-permanent residents who meet specific requirements.",
    cancellationLPRTitle: "For Lawful Permanent Residents (LPRs)",
    cancellationLPRReq1: "Been a lawful permanent resident for at least 5 years",
    cancellationLPRReq2: "Resided continuously in the U.S. for 7 years after admission",
    cancellationLPRReq3: "Not been convicted of an aggravated felony",
    cancellationNonLPRTitle: "For Non-Permanent Residents",
    cancellationNonLPRReq1: "10 years of continuous physical presence in the U.S.",
    cancellationNonLPRReq2: "Good moral character during that period",
    cancellationNonLPRReq3: "No disqualifying criminal convictions",
    cancellationNonLPRReq4: "Removal would cause exceptional and extremely unusual hardship to a U.S. citizen or LPR spouse, parent, or child",
    
    asylumTitle: "Asylum & Withholding of Removal",
    asylumDesc: "Protection for those who fear persecution in their home country based on race, religion, nationality, political opinion, or membership in a particular social group.",
    asylumReq1: "Must demonstrate past persecution or well-founded fear of future persecution",
    asylumReq2: "Persecution must be based on a protected ground",
    asylumReq3: "Government must be the persecutor or unable/unwilling to control the persecutor",
    
    adjustmentTitle: "Adjustment of Status",
    adjustmentDesc: "If you have an approved immigrant petition and are eligible, you may be able to adjust your status to lawful permanent resident even while in removal proceedings.",
    adjustmentReq1: "Immediate relative of U.S. citizen (spouse, parent, unmarried child under 21)",
    adjustmentReq2: "Family-sponsored or employment-based petition beneficiary",
    adjustmentReq3: "Diversity visa lottery winner",
    adjustmentReq4: "Special immigrant categories (religious workers, certain juveniles, etc.)",
    
    voluntaryTitle: "Voluntary Departure",
    voluntaryDesc: "In some cases, leaving the country voluntarily may be preferable to a removal order, as it may preserve future immigration options.",
    voluntaryBenefit1: "Avoid a formal removal order on your record",
    voluntaryBenefit2: "May be eligible to return to the U.S. sooner",
    voluntaryBenefit3: "Avoid bars to future admission that apply to removal orders",
    
    waiverTitle: "Waivers of Inadmissibility",
    waiverDesc: "Various waivers may be available to overcome grounds of inadmissibility, including:",
    waiver1: "I-601 Waiver for extreme hardship to U.S. citizen or LPR family members",
    waiver2: "I-212 Permission to reapply after deportation",
    waiver3: "Criminal waivers for certain offenses",
    
    // Process Section
    processTitle: "The Removal Process: What to Expect",
    processDesc: "Understanding the removal process helps you prepare for what lies ahead. Here is a general overview of how removal proceedings work:",
    
    step1Title: "Notice to Appear (NTA)",
    step1Desc: "The process begins when DHS issues an NTA, which lists the charges against you and notifies you of your obligation to appear in immigration court. You must carefully review this document with an attorney.",
    
    step2Title: "Master Calendar Hearing",
    step2Desc: "Your first court appearance is typically a short hearing where you confirm your identity, receive the charges, and indicate whether you will apply for any relief. This is also when you should have an attorney represent you.",
    
    step3Title: "Individual Hearing (Merits Hearing)",
    step3Desc: "If you are seeking relief, you will have a full hearing where you present evidence, testimony, and legal arguments. The government may also present evidence. This is the most critical stage of your case.",
    
    step4Title: "Decision",
    step4Desc: "The immigration judge will issue a decision either at the end of your hearing or in writing at a later date. If you win, you may receive the relief you sought. If you lose, you may have the right to appeal.",
    
    step5Title: "Appeal to BIA",
    step5Desc: "If the judge denies your case, you have 30 days to file an appeal with the Board of Immigration Appeals (BIA). The BIA reviews the judge's decision for legal errors.",
    
    step6Title: "Federal Court Review",
    step6Desc: "If the BIA denies your appeal, you may be able to seek review in federal court through a petition for review filed within 30 days of the BIA decision.",
    
    // Timeline
    timelineTitle: "How Long Does the Process Take?",
    timelineDesc: "The length of removal proceedings varies significantly depending on the court location, complexity of your case, and whether you are detained:",
    timelineDetained: "Detained Cases: 2-6 months typically, as detained cases are prioritized",
    timelineNonDetained: "Non-Detained Cases: 2-5 years depending on court backlog",
    timelineAppeal: "BIA Appeals: 6-18 months for a decision",
    timelineFederal: "Federal Court: 1-2 years for petition for review",
    
    // Why Choose Us
    whyTitle: "Why Choose Amaral Law for Your Defense?",
    whyDesc: "Our removal defense team brings decades of combined experience to every case. We understand that your future and your family's future depend on the outcome of your case.",
    why1Title: "Proven Track Record",
    why1Desc: "We have successfully defended thousands of clients facing removal, winning cases that other attorneys said were impossible.",
    why2Title: "Comprehensive Case Evaluation",
    why2Desc: "We thoroughly analyze every aspect of your case to identify all possible forms of relief and build the strongest possible defense.",
    why3Title: "Aggressive Representation",
    why3Desc: "We fight vigorously for our clients in court, challenging government evidence and presenting compelling arguments for relief.",
    why4Title: "Compassionate Support",
    why4Desc: "We understand the stress and fear that comes with facing deportation. Our team provides support and guidance throughout the entire process.",
    
    // FAQs
    faqTitle: "Frequently Asked Questions",
    faq1Q: "Can I be deported if I have a green card?",
    faq1A: "Yes, lawful permanent residents can be deported if they commit certain crimes or violate immigration law. However, LPRs have more options for relief than non-permanent residents. If you are an LPR facing removal, it is critical to consult with an attorney immediately.",
    faq2Q: "What happens if I miss my court date?",
    faq2A: "Missing a court date can result in an in absentia removal order, meaning the judge orders your deportation without you being present. If this happens, you may be able to reopen your case if you can show exceptional circumstances for missing the hearing, such as not receiving notice or a serious medical emergency.",
    faq3Q: "Can I work while in removal proceedings?",
    faq3A: "It depends on your current immigration status. If you had work authorization before proceedings began, it may continue. If you apply for certain forms of relief like asylum, you may become eligible for work authorization after your application has been pending for a certain period.",
    faq4Q: "What if I was convicted of a crime?",
    faq4A: "Criminal convictions complicate removal cases but do not necessarily mean you will be deported. Many forms of relief are available even to those with criminal records, depending on the specific offense and your individual circumstances. Our attorneys specialize in defending clients with criminal histories.",
    faq5Q: "Can I travel while in removal proceedings?",
    faq5A: "Generally, you should not travel outside the United States while in removal proceedings without first obtaining advance parole. Leaving without permission can result in your case being terminated and may trigger bars to returning to the U.S.",
    faq6Q: "How much does removal defense cost?",
    faq6A: "The cost varies depending on the complexity of your case, the forms of relief you are seeking, and whether your case goes to trial. We offer free consultations to evaluate your case and provide a fee estimate. We also offer payment plans to make legal representation accessible.",
    
    // CTA
    ctaTitle: "Don't Face Deportation Alone",
    ctaDesc: "Time is critical in removal cases. The sooner you have an experienced attorney on your side, the better your chances of success. Contact us today for a confidential consultation.",
    ctaButton: "Request Consultation",
    callNow: "Call Now",
    
    // Stats
    stat1: "Cases Defended",
    stat2: "Success Rate",
    stat3: "Years Experience",
    stat4: "Languages Spoken",
  },
  es: {
    title: "Defensa de Deportación",
    subtitle: "Protegiendo Su Derecho a Permanecer en los Estados Unidos",
    intro: "Cuando usted o un ser querido enfrenta la deportación, tener representación legal experimentada puede marcar la diferencia entre quedarse con su familia en los Estados Unidos o verse obligado a dejarlo todo atrás. Nuestros abogados de defensa de deportación han defendido exitosamente a miles de clientes en la corte de inmigración, luchando por su derecho a permanecer en este país.",
    
    whatIsTitle: "¿Qué es la Deportación?",
    whatIsDesc: "La deportación, también conocida como remoción, es el proceso formal por el cual el gobierno de EE.UU. expulsa a un no ciudadano del país. Esto puede sucederle a cualquier persona que no sea ciudadano estadounidense, incluyendo residentes permanentes legales (titulares de green card), titulares de visa e individuos indocumentados. El proceso de deportación comienza cuando el Departamento de Seguridad Nacional (DHS) emite un Aviso de Comparecencia (NTA), que es un documento de cargos que inicia los procedimientos en la corte de inmigración.",
    
    groundsTitle: "Causas Comunes de Deportación",
    groundsDesc: "Entender por qué alguien puede enfrentar la deportación es el primer paso para construir una defensa sólida. La Ley de Inmigración y Nacionalidad (INA) especifica numerosas causas de deportación, incluyendo:",
    ground1Title: "Violaciones de Inmigración",
    ground1Desc: "Entrar sin inspección, exceder el tiempo de visa, violar los términos de la visa o fraude de inmigración pueden desencadenar procedimientos de deportación.",
    ground2Title: "Condenas Penales",
    ground2Desc: "Ciertos delitos hacen deportables a los no ciudadanos, incluyendo delitos graves agravados, delitos que involucran bajeza moral, delitos de drogas, delitos con armas de fuego y violencia doméstica.",
    ground3Title: "Preocupaciones de Seguridad",
    ground3Desc: "Actividades relacionadas con el terrorismo, espionaje u otras preocupaciones de seguridad nacional pueden resultar en procedimientos de deportación.",
    ground4Title: "Carga Pública",
    ground4Desc: "Convertirse en carga pública dentro de los 5 años de entrada (si los factores existían antes de la entrada) puede ser causa de deportación en ciertas circunstancias.",
    
    reliefTitle: "Formas de Alivio de la Deportación",
    reliefDesc: "Incluso si está en procedimientos de deportación, hay muchas formas de alivio que pueden permitirle permanecer legalmente en los Estados Unidos. Nuestros abogados evaluarán su caso para determinar qué opciones pueden estar disponibles para usted:",
    
    cancellationTitle: "Cancelación de Deportación",
    cancellationDesc: "Disponible tanto para residentes permanentes legales como para ciertos residentes no permanentes que cumplan requisitos específicos.",
    cancellationLPRTitle: "Para Residentes Permanentes Legales (LPRs)",
    cancellationLPRReq1: "Haber sido residente permanente legal por al menos 5 años",
    cancellationLPRReq2: "Haber residido continuamente en EE.UU. por 7 años después de la admisión",
    cancellationLPRReq3: "No haber sido condenado por un delito grave agravado",
    cancellationNonLPRTitle: "Para Residentes No Permanentes",
    cancellationNonLPRReq1: "10 años de presencia física continua en EE.UU.",
    cancellationNonLPRReq2: "Buen carácter moral durante ese período",
    cancellationNonLPRReq3: "Sin condenas penales descalificadoras",
    cancellationNonLPRReq4: "La deportación causaría dificultades excepcionales y extremadamente inusuales a un cónyuge, padre o hijo ciudadano estadounidense o LPR",
    
    asylumTitle: "Asilo y Suspensión de Deportación",
    asylumDesc: "Protección para quienes temen persecución en su país de origen por motivos de raza, religión, nacionalidad, opinión política o pertenencia a un grupo social particular.",
    asylumReq1: "Debe demostrar persecución pasada o temor fundado de persecución futura",
    asylumReq2: "La persecución debe basarse en un motivo protegido",
    asylumReq3: "El gobierno debe ser el perseguidor o ser incapaz/no estar dispuesto a controlar al perseguidor",
    
    adjustmentTitle: "Ajuste de Estatus",
    adjustmentDesc: "Si tiene una petición de inmigrante aprobada y es elegible, puede ajustar su estatus a residente permanente legal incluso mientras está en procedimientos de deportación.",
    adjustmentReq1: "Familiar inmediato de ciudadano estadounidense (cónyuge, padre, hijo soltero menor de 21)",
    adjustmentReq2: "Beneficiario de petición familiar o basada en empleo",
    adjustmentReq3: "Ganador de la lotería de visas de diversidad",
    adjustmentReq4: "Categorías especiales de inmigrantes (trabajadores religiosos, ciertos menores, etc.)",
    
    voluntaryTitle: "Salida Voluntaria",
    voluntaryDesc: "En algunos casos, salir del país voluntariamente puede ser preferible a una orden de deportación, ya que puede preservar opciones de inmigración futuras.",
    voluntaryBenefit1: "Evitar una orden formal de deportación en su registro",
    voluntaryBenefit2: "Puede ser elegible para regresar a EE.UU. antes",
    voluntaryBenefit3: "Evitar prohibiciones de admisión futura que aplican a órdenes de deportación",
    
    waiverTitle: "Perdones de Inadmisibilidad",
    waiverDesc: "Varios perdones pueden estar disponibles para superar causas de inadmisibilidad, incluyendo:",
    waiver1: "Perdón I-601 por dificultades extremas a familiares ciudadanos estadounidenses o LPR",
    waiver2: "Permiso I-212 para volver a solicitar después de la deportación",
    waiver3: "Perdones penales para ciertos delitos",
    
    processTitle: "El Proceso de Deportación: Qué Esperar",
    processDesc: "Entender el proceso de deportación le ayuda a prepararse para lo que viene. Aquí hay una descripción general de cómo funcionan los procedimientos de deportación:",
    
    step1Title: "Aviso de Comparecencia (NTA)",
    step1Desc: "El proceso comienza cuando DHS emite un NTA, que enumera los cargos en su contra y le notifica su obligación de comparecer en la corte de inmigración. Debe revisar cuidadosamente este documento con un abogado.",
    
    step2Title: "Audiencia de Calendario Maestro",
    step2Desc: "Su primera comparecencia en la corte es típicamente una audiencia corta donde confirma su identidad, recibe los cargos e indica si solicitará algún alivio. Este es también el momento en que debe tener un abogado que lo represente.",
    
    step3Title: "Audiencia Individual (Audiencia de Méritos)",
    step3Desc: "Si está buscando alivio, tendrá una audiencia completa donde presenta evidencia, testimonio y argumentos legales. El gobierno también puede presentar evidencia. Esta es la etapa más crítica de su caso.",
    
    step4Title: "Decisión",
    step4Desc: "El juez de inmigración emitirá una decisión al final de su audiencia o por escrito en una fecha posterior. Si gana, puede recibir el alivio que buscaba. Si pierde, puede tener derecho a apelar.",
    
    step5Title: "Apelación al BIA",
    step5Desc: "Si el juez niega su caso, tiene 30 días para presentar una apelación ante la Junta de Apelaciones de Inmigración (BIA). El BIA revisa la decisión del juez por errores legales.",
    
    step6Title: "Revisión en Corte Federal",
    step6Desc: "Si el BIA niega su apelación, puede buscar revisión en la corte federal a través de una petición de revisión presentada dentro de los 30 días de la decisión del BIA.",
    
    timelineTitle: "¿Cuánto Tiempo Toma el Proceso?",
    timelineDesc: "La duración de los procedimientos de deportación varía significativamente dependiendo de la ubicación de la corte, la complejidad de su caso y si está detenido:",
    timelineDetained: "Casos Detenidos: 2-6 meses típicamente, ya que los casos detenidos tienen prioridad",
    timelineNonDetained: "Casos No Detenidos: 2-5 años dependiendo del atraso de la corte",
    timelineAppeal: "Apelaciones BIA: 6-18 meses para una decisión",
    timelineFederal: "Corte Federal: 1-2 años para petición de revisión",
    
    whyTitle: "¿Por Qué Elegir Amaral Law para Su Defensa?",
    whyDesc: "Nuestro equipo de defensa de deportación aporta décadas de experiencia combinada a cada caso. Entendemos que su futuro y el futuro de su familia dependen del resultado de su caso.",
    why1Title: "Historial Comprobado",
    why1Desc: "Hemos defendido exitosamente a miles de clientes que enfrentan deportación, ganando casos que otros abogados dijeron que eran imposibles.",
    why2Title: "Evaluación Integral del Caso",
    why2Desc: "Analizamos exhaustivamente cada aspecto de su caso para identificar todas las formas posibles de alivio y construir la defensa más sólida posible.",
    why3Title: "Representación Agresiva",
    why3Desc: "Luchamos vigorosamente por nuestros clientes en la corte, desafiando la evidencia del gobierno y presentando argumentos convincentes para el alivio.",
    why4Title: "Apoyo Compasivo",
    why4Desc: "Entendemos el estrés y el miedo que viene con enfrentar la deportación. Nuestro equipo brinda apoyo y orientación durante todo el proceso.",
    
    faqTitle: "Preguntas Frecuentes",
    faq1Q: "¿Puedo ser deportado si tengo green card?",
    faq1A: "Sí, los residentes permanentes legales pueden ser deportados si cometen ciertos delitos o violan la ley de inmigración. Sin embargo, los LPRs tienen más opciones de alivio que los residentes no permanentes. Si es un LPR que enfrenta deportación, es crítico consultar con un abogado inmediatamente.",
    faq2Q: "¿Qué pasa si pierdo mi fecha de corte?",
    faq2A: "Perder una fecha de corte puede resultar en una orden de deportación en ausencia, lo que significa que el juez ordena su deportación sin que usted esté presente. Si esto sucede, puede reabrir su caso si puede demostrar circunstancias excepcionales por perder la audiencia, como no recibir notificación o una emergencia médica grave.",
    faq3Q: "¿Puedo trabajar mientras estoy en procedimientos de deportación?",
    faq3A: "Depende de su estatus migratorio actual. Si tenía autorización de trabajo antes de que comenzaran los procedimientos, puede continuar. Si solicita ciertas formas de alivio como asilo, puede ser elegible para autorización de trabajo después de que su solicitud haya estado pendiente por un cierto período.",
    faq4Q: "¿Qué pasa si fui condenado por un delito?",
    faq4A: "Las condenas penales complican los casos de deportación pero no necesariamente significan que será deportado. Muchas formas de alivio están disponibles incluso para aquellos con antecedentes penales, dependiendo del delito específico y sus circunstancias individuales. Nuestros abogados se especializan en defender clientes con historiales penales.",
    faq5Q: "¿Puedo viajar mientras estoy en procedimientos de deportación?",
    faq5A: "Generalmente, no debe viajar fuera de los Estados Unidos mientras está en procedimientos de deportación sin obtener primero un permiso de viaje anticipado. Salir sin permiso puede resultar en la terminación de su caso y puede activar prohibiciones para regresar a EE.UU.",
    faq6Q: "¿Cuánto cuesta la defensa de deportación?",
    faq6A: "El costo varía dependiendo de la complejidad de su caso, las formas de alivio que está buscando y si su caso va a juicio. Ofrecemos consultas gratuitas para evaluar su caso y proporcionar una estimación de honorarios. También ofrecemos planes de pago para hacer accesible la representación legal.",
    
    ctaTitle: "No Enfrente la Deportación Solo",
    ctaDesc: "El tiempo es crítico en casos de deportación. Cuanto antes tenga un abogado experimentado de su lado, mejores serán sus posibilidades de éxito. Contáctenos hoy para una consulta confidencial.",
    ctaButton: "Solicitar Consulta",
    callNow: "Llamar Ahora",
    
    stat1: "Casos Defendidos",
    stat2: "Tasa de Éxito",
    stat3: "Años de Experiencia",
    stat4: "Idiomas Hablados",
  },
  pt: {
    title: "Defesa de Deportação",
    subtitle: "Protegendo Seu Direito de Permanecer nos Estados Unidos",
    intro: "Quando você ou um ente querido enfrenta a deportação, ter representação legal experiente pode fazer a diferença entre ficar com sua família nos Estados Unidos ou ser forçado a deixar tudo para trás. Nossos advogados de defesa de deportação defenderam com sucesso milhares de clientes no tribunal de imigração, lutando pelo direito deles de permanecer neste país.",
    
    whatIsTitle: "O Que é Deportação?",
    whatIsDesc: "A deportação, também conhecida como remoção, é o processo formal pelo qual o governo dos EUA expulsa um não-cidadão do país. Isso pode acontecer com qualquer pessoa que não seja cidadão americano, incluindo residentes permanentes legais (portadores de green card), portadores de visto e indivíduos indocumentados. O processo de deportação começa quando o Departamento de Segurança Interna (DHS) emite um Aviso de Comparecimento (NTA), que é um documento de acusação que inicia os procedimentos no tribunal de imigração.",
    
    groundsTitle: "Causas Comuns de Deportação",
    groundsDesc: "Entender por que alguém pode enfrentar a deportação é o primeiro passo para construir uma defesa forte. A Lei de Imigração e Nacionalidade (INA) especifica numerosas causas de deportação, incluindo:",
    ground1Title: "Violações de Imigração",
    ground1Desc: "Entrar sem inspeção, exceder o tempo do visto, violar os termos do visto ou fraude de imigração podem desencadear procedimentos de deportação.",
    ground2Title: "Condenações Criminais",
    ground2Desc: "Certos crimes tornam não-cidadãos deportáveis, incluindo crimes graves agravados, crimes envolvendo torpeza moral, crimes de drogas, crimes com armas de fogo e violência doméstica.",
    ground3Title: "Preocupações de Segurança",
    ground3Desc: "Atividades relacionadas ao terrorismo, espionagem ou outras preocupações de segurança nacional podem resultar em procedimentos de deportação.",
    ground4Title: "Encargo Público",
    ground4Desc: "Tornar-se encargo público dentro de 5 anos da entrada (se os fatores existiam antes da entrada) pode ser causa de deportação em certas circunstâncias.",
    
    reliefTitle: "Formas de Alívio da Deportação",
    reliefDesc: "Mesmo se você está em procedimentos de deportação, há muitas formas de alívio que podem permitir que você permaneça legalmente nos Estados Unidos. Nossos advogados avaliarão seu caso para determinar quais opções podem estar disponíveis para você:",
    
    cancellationTitle: "Cancelamento de Deportação",
    cancellationDesc: "Disponível tanto para residentes permanentes legais quanto para certos residentes não permanentes que atendam requisitos específicos.",
    cancellationLPRTitle: "Para Residentes Permanentes Legais (LPRs)",
    cancellationLPRReq1: "Ter sido residente permanente legal por pelo menos 5 anos",
    cancellationLPRReq2: "Ter residido continuamente nos EUA por 7 anos após a admissão",
    cancellationLPRReq3: "Não ter sido condenado por um crime grave agravado",
    cancellationNonLPRTitle: "Para Residentes Não Permanentes",
    cancellationNonLPRReq1: "10 anos de presença física contínua nos EUA",
    cancellationNonLPRReq2: "Bom caráter moral durante esse período",
    cancellationNonLPRReq3: "Sem condenações criminais desqualificadoras",
    cancellationNonLPRReq4: "A deportação causaria dificuldades excepcionais e extremamente incomuns a um cônjuge, pai ou filho cidadão americano ou LPR",
    
    asylumTitle: "Asilo e Suspensão de Deportação",
    asylumDesc: "Proteção para aqueles que temem perseguição em seu país de origem com base em raça, religião, nacionalidade, opinião política ou pertencimento a um grupo social particular.",
    asylumReq1: "Deve demonstrar perseguição passada ou medo bem fundamentado de perseguição futura",
    asylumReq2: "A perseguição deve ser baseada em um motivo protegido",
    asylumReq3: "O governo deve ser o perseguidor ou ser incapaz/não estar disposto a controlar o perseguidor",
    
    adjustmentTitle: "Ajuste de Status",
    adjustmentDesc: "Se você tem uma petição de imigrante aprovada e é elegível, pode ajustar seu status para residente permanente legal mesmo enquanto está em procedimentos de deportação.",
    adjustmentReq1: "Familiar imediato de cidadão americano (cônjuge, pai, filho solteiro menor de 21)",
    adjustmentReq2: "Beneficiário de petição familiar ou baseada em emprego",
    adjustmentReq3: "Vencedor da loteria de vistos de diversidade",
    adjustmentReq4: "Categorias especiais de imigrantes (trabalhadores religiosos, certos menores, etc.)",
    
    voluntaryTitle: "Saída Voluntária",
    voluntaryDesc: "Em alguns casos, sair do país voluntariamente pode ser preferível a uma ordem de deportação, pois pode preservar opções de imigração futuras.",
    voluntaryBenefit1: "Evitar uma ordem formal de deportação em seu registro",
    voluntaryBenefit2: "Pode ser elegível para retornar aos EUA mais cedo",
    voluntaryBenefit3: "Evitar proibições de admissão futura que se aplicam a ordens de deportação",
    
    waiverTitle: "Perdões de Inadmissibilidade",
    waiverDesc: "Vários perdões podem estar disponíveis para superar causas de inadmissibilidade, incluindo:",
    waiver1: "Perdão I-601 por dificuldades extremas a familiares cidadãos americanos ou LPR",
    waiver2: "Permissão I-212 para reaplicar após deportação",
    waiver3: "Perdões criminais para certos crimes",
    
    processTitle: "O Processo de Deportação: O Que Esperar",
    processDesc: "Entender o processo de deportação ajuda você a se preparar para o que está por vir. Aqui está uma visão geral de como os procedimentos de deportação funcionam:",
    
    step1Title: "Aviso de Comparecimento (NTA)",
    step1Desc: "O processo começa quando o DHS emite um NTA, que lista as acusações contra você e notifica sua obrigação de comparecer ao tribunal de imigração. Você deve revisar cuidadosamente este documento com um advogado.",
    
    step2Title: "Audiência de Calendário Mestre",
    step2Desc: "Sua primeira comparecimento no tribunal é tipicamente uma audiência curta onde você confirma sua identidade, recebe as acusações e indica se solicitará algum alívio. Este também é o momento em que você deve ter um advogado para representá-lo.",
    
    step3Title: "Audiência Individual (Audiência de Mérito)",
    step3Desc: "Se você está buscando alívio, terá uma audiência completa onde apresenta evidências, testemunho e argumentos legais. O governo também pode apresentar evidências. Esta é a etapa mais crítica do seu caso.",
    
    step4Title: "Decisão",
    step4Desc: "O juiz de imigração emitirá uma decisão no final da sua audiência ou por escrito em uma data posterior. Se você ganhar, pode receber o alívio que buscou. Se perder, pode ter direito de apelar.",
    
    step5Title: "Apelação ao BIA",
    step5Desc: "Se o juiz negar seu caso, você tem 30 dias para apresentar uma apelação à Junta de Apelações de Imigração (BIA). O BIA revisa a decisão do juiz por erros legais.",
    
    step6Title: "Revisão em Tribunal Federal",
    step6Desc: "Se o BIA negar sua apelação, você pode buscar revisão no tribunal federal através de uma petição de revisão apresentada dentro de 30 dias da decisão do BIA.",
    
    timelineTitle: "Quanto Tempo Leva o Processo?",
    timelineDesc: "A duração dos procedimentos de deportação varia significativamente dependendo da localização do tribunal, complexidade do seu caso e se você está detido:",
    timelineDetained: "Casos Detidos: 2-6 meses tipicamente, pois casos detidos têm prioridade",
    timelineNonDetained: "Casos Não Detidos: 2-5 anos dependendo do acúmulo do tribunal",
    timelineAppeal: "Apelações BIA: 6-18 meses para uma decisão",
    timelineFederal: "Tribunal Federal: 1-2 anos para petição de revisão",
    
    whyTitle: "Por Que Escolher Amaral Law para Sua Defesa?",
    whyDesc: "Nossa equipe de defesa de deportação traz décadas de experiência combinada para cada caso. Entendemos que seu futuro e o futuro da sua família dependem do resultado do seu caso.",
    why1Title: "Histórico Comprovado",
    why1Desc: "Defendemos com sucesso milhares de clientes enfrentando deportação, ganhando casos que outros advogados disseram ser impossíveis.",
    why2Title: "Avaliação Abrangente do Caso",
    why2Desc: "Analisamos minuciosamente cada aspecto do seu caso para identificar todas as formas possíveis de alívio e construir a defesa mais forte possível.",
    why3Title: "Representação Agressiva",
    why3Desc: "Lutamos vigorosamente por nossos clientes no tribunal, desafiando as evidências do governo e apresentando argumentos convincentes para alívio.",
    why4Title: "Apoio Compassivo",
    why4Desc: "Entendemos o estresse e o medo que vem com enfrentar a deportação. Nossa equipe fornece apoio e orientação durante todo o processo.",
    
    faqTitle: "Perguntas Frequentes",
    faq1Q: "Posso ser deportado se tenho green card?",
    faq1A: "Sim, residentes permanentes legais podem ser deportados se cometerem certos crimes ou violarem a lei de imigração. No entanto, LPRs têm mais opções de alívio do que residentes não permanentes. Se você é um LPR enfrentando deportação, é crítico consultar um advogado imediatamente.",
    faq2Q: "O que acontece se eu perder minha data no tribunal?",
    faq2A: "Perder uma data no tribunal pode resultar em uma ordem de deportação à revelia, o que significa que o juiz ordena sua deportação sem você estar presente. Se isso acontecer, você pode reabrir seu caso se puder mostrar circunstâncias excepcionais por perder a audiência, como não receber notificação ou uma emergência médica grave.",
    faq3Q: "Posso trabalhar enquanto estou em procedimentos de deportação?",
    faq3A: "Depende do seu status de imigração atual. Se você tinha autorização de trabalho antes dos procedimentos começarem, pode continuar. Se você solicitar certas formas de alívio como asilo, pode se tornar elegível para autorização de trabalho após sua solicitação estar pendente por um certo período.",
    faq4Q: "E se eu fui condenado por um crime?",
    faq4A: "Condenações criminais complicam casos de deportação, mas não necessariamente significam que você será deportado. Muitas formas de alívio estão disponíveis mesmo para aqueles com antecedentes criminais, dependendo do crime específico e suas circunstâncias individuais. Nossos advogados se especializam em defender clientes com históricos criminais.",
    faq5Q: "Posso viajar enquanto estou em procedimentos de deportação?",
    faq5A: "Geralmente, você não deve viajar para fora dos Estados Unidos enquanto está em procedimentos de deportação sem primeiro obter permissão de viagem antecipada. Sair sem permissão pode resultar no encerramento do seu caso e pode ativar proibições para retornar aos EUA.",
    faq6Q: "Quanto custa a defesa de deportação?",
    faq6A: "O custo varia dependendo da complexidade do seu caso, as formas de alívio que você está buscando e se seu caso vai a julgamento. Oferecemos consultas gratuitas para avaliar seu caso e fornecer uma estimativa de honorários. Também oferecemos planos de pagamento para tornar a representação legal acessível.",
    
    ctaTitle: "Não Enfrente a Deportação Sozinho",
    ctaDesc: "O tempo é crítico em casos de deportação. Quanto antes você tiver um advogado experiente ao seu lado, melhores serão suas chances de sucesso. Entre em contato conosco hoje para uma consulta confidencial.",
    ctaButton: "Solicitar Consulta",
    callNow: "Ligar Agora",
    
    stat1: "Casos Defendidos",
    stat2: "Taxa de Sucesso",
    stat3: "Anos de Experiência",
    stat4: "Idiomas Falados",
  },
};

export default function RemovalDefense() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${t.title} | Amaral Law`}
        description={t.intro.substring(0, 160)}
        keywords="removal defense, deportation defense, immigration court, stop deportation, cancellation of removal, asylum, immigration attorney"
        canonicalUrl="/services/removal-defense"
      />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=80)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              Practice Area
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light mb-8">
              {t.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/consultation">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold">
                  {t.ctaButton}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="tel:1-844-423-3733">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Phone className="mr-2 h-5 w-5" />
                  1-844-423-3733
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary-foreground border-y border-border">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">5,000+</div>
              <div className="text-sm text-muted-foreground">{t.stat1}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">95%</div>
              <div className="text-sm text-muted-foreground">{t.stat2}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">25+</div>
              <div className="text-sm text-muted-foreground">{t.stat3}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">3</div>
              <div className="text-sm text-muted-foreground">{t.stat4}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t.intro}
            </p>
          </div>
        </div>
      </section>

      {/* What is Removal */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.whatIsTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t.whatIsDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Grounds for Removal */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.groundsTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t.groundsDesc}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-l-4 border-l-destructive">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-destructive/10 rounded-lg shrink-0">
                      <AlertTriangle className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{t.ground1Title}</h3>
                      <p className="text-muted-foreground">{t.ground1Desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-destructive">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-destructive/10 rounded-lg shrink-0">
                      <Gavel className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{t.ground2Title}</h3>
                      <p className="text-muted-foreground">{t.ground2Desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-destructive">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-destructive/10 rounded-lg shrink-0">
                      <Shield className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{t.ground3Title}</h3>
                      <p className="text-muted-foreground">{t.ground3Desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-destructive">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-destructive/10 rounded-lg shrink-0">
                      <Users className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{t.ground4Title}</h3>
                      <p className="text-muted-foreground">{t.ground4Desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Forms of Relief */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.reliefTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t.reliefDesc}
            </p>

            {/* Cancellation of Removal */}
            <div className="mb-10">
              <Card className="border-l-4 border-l-primary overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-foreground mb-2">{t.cancellationTitle}</h3>
                      <p className="text-muted-foreground">{t.cancellationDesc}</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-muted/50 rounded-lg p-6">
                      <h4 className="font-semibold text-foreground mb-4">{t.cancellationLPRTitle}</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{t.cancellationLPRReq1}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{t.cancellationLPRReq2}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{t.cancellationLPRReq3}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-6">
                      <h4 className="font-semibold text-foreground mb-4">{t.cancellationNonLPRTitle}</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{t.cancellationNonLPRReq1}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{t.cancellationNonLPRReq2}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{t.cancellationNonLPRReq3}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{t.cancellationNonLPRReq4}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Asylum */}
            <div className="mb-10">
              <Card className="border-l-4 border-l-primary overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                      <Scale className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-foreground mb-2">{t.asylumTitle}</h3>
                      <p className="text-muted-foreground">{t.asylumDesc}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{t.asylumReq1}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{t.asylumReq2}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{t.asylumReq3}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Adjustment of Status */}
            <div className="mb-10">
              <Card className="border-l-4 border-l-primary overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                      <FileCheck className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-foreground mb-2">{t.adjustmentTitle}</h3>
                      <p className="text-muted-foreground">{t.adjustmentDesc}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{t.adjustmentReq1}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{t.adjustmentReq2}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{t.adjustmentReq3}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{t.adjustmentReq4}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Voluntary Departure */}
            <div className="mb-10">
              <Card className="border-l-4 border-l-primary overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                      <Plane className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-foreground mb-2">{t.voluntaryTitle}</h3>
                      <p className="text-muted-foreground">{t.voluntaryDesc}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{t.voluntaryBenefit1}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{t.voluntaryBenefit2}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{t.voluntaryBenefit3}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Waivers */}
            <div>
              <Card className="border-l-4 border-l-primary overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-foreground mb-2">{t.waiverTitle}</h3>
                      <p className="text-muted-foreground">{t.waiverDesc}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{t.waiver1}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{t.waiver2}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{t.waiver3}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.processTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t.processDesc}
            </p>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />
              
              <div className="space-y-8">
                {[
                  { num: 1, title: t.step1Title, desc: t.step1Desc, icon: FileText },
                  { num: 2, title: t.step2Title, desc: t.step2Desc, icon: Calendar },
                  { num: 3, title: t.step3Title, desc: t.step3Desc, icon: Gavel },
                  { num: 4, title: t.step4Title, desc: t.step4Desc, icon: Scale },
                  { num: 5, title: t.step5Title, desc: t.step5Desc, icon: ArrowRight },
                  { num: 6, title: t.step6Title, desc: t.step6Desc, icon: Building },
                ].map((step) => (
                  <div key={step.num} className="flex gap-6">
                    <div className="relative z-10 shrink-0">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                        {step.num}
                      </div>
                    </div>
                    <Card className="flex-1">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-primary/10 rounded-lg shrink-0 hidden sm:block">
                            <step.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                            <p className="text-muted-foreground">{step.desc}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.timelineTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t.timelineDesc}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="h-6 w-6 text-primary" />
                    <span className="font-semibold text-foreground">2-6 months</span>
                  </div>
                  <p className="text-muted-foreground">{t.timelineDetained}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="h-6 w-6 text-primary" />
                    <span className="font-semibold text-foreground">2-5 years</span>
                  </div>
                  <p className="text-muted-foreground">{t.timelineNonDetained}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="h-6 w-6 text-primary" />
                    <span className="font-semibold text-foreground">6-18 months</span>
                  </div>
                  <p className="text-muted-foreground">{t.timelineAppeal}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="h-6 w-6 text-primary" />
                    <span className="font-semibold text-foreground">1-2 years</span>
                  </div>
                  <p className="text-muted-foreground">{t.timelineFederal}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.whyTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t.whyDesc}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-l-4 border-l-secondary">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t.why1Title}</h3>
                  <p className="text-muted-foreground">{t.why1Desc}</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-secondary">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t.why2Title}</h3>
                  <p className="text-muted-foreground">{t.why2Desc}</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-secondary">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t.why3Title}</h3>
                  <p className="text-muted-foreground">{t.why3Desc}</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-secondary">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t.why4Title}</h3>
                  <p className="text-muted-foreground">{t.why4Desc}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <HelpCircle className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                {t.faqTitle}
              </h2>
            </div>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                { q: t.faq1Q, a: t.faq1A },
                { q: t.faq2Q, a: t.faq2A },
                { q: t.faq3Q, a: t.faq3A },
                { q: t.faq4Q, a: t.faq4A },
                { q: t.faq5Q, a: t.faq5A },
                { q: t.faq6Q, a: t.faq6A },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-background rounded-lg border px-6">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              {t.ctaTitle}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              {t.ctaDesc}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/consultation">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold">
                  {t.ctaButton}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="tel:1-844-423-3733">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Phone className="mr-2 h-5 w-5" />
                  {t.callNow}: 1-844-423-3733
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
