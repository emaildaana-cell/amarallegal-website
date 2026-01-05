import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Phone, ArrowRight, Shield, Clock, FileText, Calendar, 
  Gavel, CheckCircle, Scale, Lock, Unlock, AlertTriangle,
  Users, DollarSign, HelpCircle, Home, Heart
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
    title: "Immigration Bond Hearings",
    subtitle: "Fighting for Your Freedom from ICE Detention",
    intro: "When a loved one is detained by Immigration and Customs Enforcement (ICE), securing their release through an immigration bond hearing is often the first critical step. Our experienced bond attorneys have successfully represented thousands of detainees in bond hearings across immigration courts nationwide, fighting aggressively to reunite families while their immigration cases proceed.",
    
    whatIsTitle: "What Is an Immigration Bond?",
    whatIsDesc: "An immigration bond is a financial guarantee that allows a detained immigrant to be released from ICE custody while their removal (deportation) case is pending. Similar to bail in criminal cases, the bond ensures that the person will appear at all future immigration court hearings. There are two main types of immigration bonds:",
    
    deliveryBondTitle: "Delivery Bond",
    deliveryBondDesc: "Allows the detainee to be released from custody to spend time with family and consult with an attorney while their case proceeds. The detainee must appear at all scheduled hearings.",
    
    voluntaryDepartureTitle: "Voluntary Departure Bond",
    voluntaryDepartureDesc: "Allows the detainee to leave the country voluntarily at their own expense within a specified time period. If they fail to depart, the bond is forfeited.",
    
    eligibilityTitle: "Who Is Eligible for Bond?",
    eligibilityDesc: "Not everyone in immigration detention is eligible for bond. Eligibility depends on several factors:",
    
    eligibleTitle: "Generally Eligible for Bond:",
    eligible1: "Individuals with no serious criminal history",
    eligible2: "Asylum seekers who pass credible fear interviews",
    eligible3: "Those with strong ties to the community",
    eligible4: "Individuals with U.S. citizen or LPR family members",
    eligible5: "Those with stable employment history",
    eligible6: "Individuals with no prior deportation orders",
    
    ineligibleTitle: "Generally NOT Eligible for Bond (Mandatory Detention):",
    ineligible1: "Individuals with certain aggravated felony convictions",
    ineligible2: "Those with terrorism-related charges",
    ineligible3: "Individuals who arrived without inspection and were apprehended within 14 days",
    ineligible4: "Those with prior removal orders who re-entered illegally",
    ineligible5: "Individuals with certain drug trafficking convictions",
    ineligible6: "Those deemed a danger to national security",
    
    guerraTitle: "Matter of Guerra: What Judges Consider",
    guerraDesc: "In Matter of Guerra (1990), the Board of Immigration Appeals established the factors immigration judges must consider when deciding whether to grant bond and at what amount. These factors include:",
    
    guerra1Title: "1. Flight Risk",
    guerra1Desc: "Whether the person is likely to appear at future hearings. Judges consider ties to the community, family in the U.S., length of residence, and immigration history.",
    
    guerra2Title: "2. Danger to Community",
    guerra2Desc: "Whether the person poses a threat to public safety. Criminal history, nature of offenses, and rehabilitation evidence are considered.",
    
    guerra3Title: "3. Criminal History",
    guerra3Desc: "The nature and severity of any criminal convictions, including whether they are recent or remote, violent or non-violent.",
    
    guerra4Title: "4. Immigration History",
    guerra4Desc: "Prior immigration violations, deportations, or failures to appear at hearings can negatively impact bond decisions.",
    
    guerra5Title: "5. Manner of Entry",
    guerra5Desc: "How the person entered the U.S. (with inspection, without inspection, overstayed visa) is considered.",
    
    guerra6Title: "6. Potential Relief",
    guerra6Desc: "Whether the person has a viable path to legal status (asylum, cancellation of removal, etc.) affects the likelihood of appearing.",
    
    guerra7Title: "7. Family Ties",
    guerra7Desc: "Having U.S. citizen or LPR family members, especially children, demonstrates community ties and reduces flight risk.",
    
    guerra8Title: "8. Employment History",
    guerra8Desc: "Stable employment shows community ties and the ability to support oneself without becoming a public charge.",
    
    processTitle: "The Bond Hearing Process",
    processDesc: "Understanding the bond hearing process helps families prepare for what to expect:",
    
    step1Title: "Step 1: Request a Bond Hearing",
    step1Desc: "Your attorney files a motion requesting a bond hearing with the immigration court. This can be done immediately after detention.",
    
    step2Title: "Step 2: Hearing Scheduled",
    step2Desc: "The court schedules the bond hearing, typically within 7-14 days of the request, though timing varies by court.",
    
    step3Title: "Step 3: Prepare Evidence",
    step3Desc: "Gather supporting documents: sponsor letters, proof of family ties, employment records, character references, and evidence of rehabilitation.",
    
    step4Title: "Step 4: Bond Hearing",
    step4Desc: "The attorney presents arguments and evidence to the immigration judge. The detainee may testify, and sponsors may appear.",
    
    step5Title: "Step 5: Judge's Decision",
    step5Desc: "The judge grants bond (setting an amount), denies bond, or continues the hearing for more evidence. Decisions are often made the same day.",
    
    step6Title: "Step 6: Post Bond",
    step6Desc: "If bond is granted, it must be paid to ICE before release. Bond can be paid by cash, cashier's check, or through a bond company.",
    
    bondAmountsTitle: "Typical Bond Amounts",
    bondAmountsDesc: "Immigration bond amounts vary widely based on the individual's circumstances:",
    bondMin: "Minimum Bond: $1,500 (set by law)",
    bondTypical: "Typical Range: $5,000 - $25,000",
    bondHigh: "High-Risk Cases: $25,000 - $100,000+",
    bondFactors: "Factors affecting bond amount include criminal history, flight risk, family ties, and the strength of the immigration case.",
    
    sponsorTitle: "The Role of the Sponsor",
    sponsorDesc: "A strong sponsor is crucial to a successful bond hearing. The sponsor commits to:",
    sponsor1: "Providing housing for the detainee upon release",
    sponsor2: "Ensuring the detainee attends all court hearings",
    sponsor3: "Helping the detainee comply with all conditions of release",
    sponsor4: "Maintaining regular contact with the detainee",
    sponsor5: "Reporting any changes in address or circumstances",
    
    sponsorQualTitle: "Who Can Be a Sponsor?",
    sponsorQual1: "U.S. citizens (preferred)",
    sponsorQual2: "Lawful permanent residents (green card holders)",
    sponsorQual3: "Individuals with valid immigration status",
    sponsorQual4: "Family members, friends, or community members",
    sponsorQual5: "Must have stable housing and income",
    
    documentsTitle: "Documents Needed for Bond Hearing",
    documentsDesc: "Comprehensive documentation strengthens your bond case:",
    
    doc1Title: "Sponsor Documents",
    doc1Items: "ID, proof of status, lease/mortgage, pay stubs, tax returns, utility bills",
    
    doc2Title: "Family Ties",
    doc2Items: "Birth certificates, marriage certificates, photos, school records of children",
    
    doc3Title: "Character References",
    doc3Items: "Letters from employers, community members, religious leaders, teachers",
    
    doc4Title: "Employment/Education",
    doc4Items: "Pay stubs, W-2s, employment letters, diplomas, certificates",
    
    doc5Title: "Rehabilitation Evidence",
    doc5Items: "Completion certificates, counseling records, community service documentation",
    
    appealTitle: "If Bond Is Denied",
    appealDesc: "If the immigration judge denies bond or sets it too high, you have options:",
    appeal1: "Appeal to the Board of Immigration Appeals (BIA) within 30 days",
    appeal2: "Request a new bond hearing if circumstances change",
    appeal3: "File a habeas corpus petition in federal court",
    appeal4: "Seek bond redetermination if initially set by ICE",
    
    timelineTitle: "Bond Hearing Timeline",
    timeline1: "Day 1: Detention by ICE",
    timeline2: "Day 1-3: Attorney files bond motion",
    timeline3: "Day 7-14: Bond hearing scheduled",
    timeline4: "Day 14-21: Bond hearing held",
    timeline5: "Same Day: Judge issues decision",
    timeline6: "Day 1-3 after: Bond posted, release processed",
    
    whyTitle: "Why Choose Amaral Law for Bond Hearings?",
    whyDesc: "Our bond hearing attorneys bring experience, preparation, and aggressive advocacy to every case.",
    why1Title: "Thousands of Bond Hearings",
    why1Desc: "We've represented detainees in bond hearings across immigration courts nationwide with a high success rate.",
    why2Title: "Same-Day Response",
    why2Desc: "We understand the urgency. We respond to bond cases immediately and file motions as quickly as possible.",
    why3Title: "Comprehensive Preparation",
    why3Desc: "We thoroughly prepare every case with strong evidence packages and compelling legal arguments.",
    why4Title: "Bilingual Representation",
    why4Desc: "Our attorneys speak English, Spanish, and Portuguese, ensuring clear communication with detainees and families.",
    
    faqTitle: "Frequently Asked Questions",
    faq1Q: "How long does it take to get a bond hearing?",
    faq1A: "Bond hearings are typically scheduled within 7-14 days of filing the motion, though this varies by court. Some courts have significant backlogs that may cause delays.",
    faq2Q: "Can I get my bond money back?",
    faq2A: "Yes, if the detainee appears at all hearings and complies with all conditions, the bond is returned at the conclusion of the case, regardless of the outcome. If they fail to appear, the bond is forfeited.",
    faq3Q: "What if I can't afford the bond?",
    faq3A: "You can use a bond company (similar to a bail bondsman) that charges a non-refundable fee (typically 15-20% of the bond amount). Some community organizations also provide bond assistance.",
    faq4Q: "Can bond be lowered after it's set?",
    faq4A: "Yes, you can request a bond redetermination hearing if circumstances change or if you have new evidence that wasn't available at the original hearing.",
    faq5Q: "What happens if the person is denied bond?",
    faq5A: "If bond is denied, the person remains in detention while their case proceeds. You can appeal to the BIA or request a new hearing if circumstances change significantly.",
    faq6Q: "How long after bond is paid will the person be released?",
    faq6A: "Release typically occurs within 24-72 hours after bond is posted, though it can take longer depending on the facility and processing times.",
    
    ctaTitle: "Get Help With Your Bond Hearing",
    ctaDesc: "Every day in detention is a day away from family. Contact us immediately for aggressive bond hearing representation.",
    ctaButton: "Start Bond Questionnaire",
    callNow: "Call Now",
    
    stat1: "Bond Hearings",
    stat2: "Success Rate",
    stat3: "Average Bond Reduction",
    stat4: "Response Time",
  },
  es: {
    title: "Audiencias de Fianza de Inmigración",
    subtitle: "Luchando por Su Libertad de la Detención de ICE",
    intro: "Cuando un ser querido es detenido por el Servicio de Inmigración y Control de Aduanas (ICE), asegurar su liberación a través de una audiencia de fianza de inmigración es a menudo el primer paso crítico. Nuestros abogados de fianza experimentados han representado exitosamente a miles de detenidos en audiencias de fianza en tribunales de inmigración en todo el país.",
    
    whatIsTitle: "¿Qué Es una Fianza de Inmigración?",
    whatIsDesc: "Una fianza de inmigración es una garantía financiera que permite que un inmigrante detenido sea liberado de la custodia de ICE mientras su caso de deportación está pendiente. Similar a la fianza en casos criminales, la fianza asegura que la persona comparecerá en todas las audiencias futuras.",
    
    deliveryBondTitle: "Fianza de Entrega",
    deliveryBondDesc: "Permite que el detenido sea liberado de la custodia para pasar tiempo con su familia y consultar con un abogado mientras su caso procede.",
    
    voluntaryDepartureTitle: "Fianza de Salida Voluntaria",
    voluntaryDepartureDesc: "Permite que el detenido salga del país voluntariamente a su propio costo dentro de un período de tiempo especificado.",
    
    eligibilityTitle: "¿Quién Es Elegible para Fianza?",
    eligibilityDesc: "No todos en detención de inmigración son elegibles para fianza. La elegibilidad depende de varios factores:",
    
    eligibleTitle: "Generalmente Elegibles para Fianza:",
    eligible1: "Individuos sin historial criminal serio",
    eligible2: "Solicitantes de asilo que pasan entrevistas de miedo creíble",
    eligible3: "Aquellos con fuertes lazos con la comunidad",
    eligible4: "Individuos con familiares ciudadanos o LPR",
    eligible5: "Aquellos con historial de empleo estable",
    eligible6: "Individuos sin órdenes de deportación previas",
    
    ineligibleTitle: "Generalmente NO Elegibles (Detención Obligatoria):",
    ineligible1: "Individuos con ciertas condenas de delitos graves agravados",
    ineligible2: "Aquellos con cargos relacionados con terrorismo",
    ineligible3: "Individuos que llegaron sin inspección y fueron aprehendidos dentro de 14 días",
    ineligible4: "Aquellos con órdenes de deportación previas que reingresaron ilegalmente",
    ineligible5: "Individuos con ciertas condenas de tráfico de drogas",
    ineligible6: "Aquellos considerados un peligro para la seguridad nacional",
    
    guerraTitle: "Matter of Guerra: Lo Que Consideran los Jueces",
    guerraDesc: "En Matter of Guerra (1990), la Junta de Apelaciones de Inmigración estableció los factores que los jueces deben considerar al decidir sobre la fianza:",
    
    guerra1Title: "1. Riesgo de Fuga",
    guerra1Desc: "Si la persona es probable que comparezca en audiencias futuras. Los jueces consideran lazos con la comunidad, familia en EE.UU., tiempo de residencia e historial de inmigración.",
    
    guerra2Title: "2. Peligro para la Comunidad",
    guerra2Desc: "Si la persona representa una amenaza para la seguridad pública. Se considera el historial criminal, naturaleza de los delitos y evidencia de rehabilitación.",
    
    guerra3Title: "3. Historial Criminal",
    guerra3Desc: "La naturaleza y severidad de cualquier condena criminal, incluyendo si son recientes o remotas, violentas o no violentas.",
    
    guerra4Title: "4. Historial de Inmigración",
    guerra4Desc: "Violaciones de inmigración previas, deportaciones o faltas de comparecencia pueden impactar negativamente las decisiones de fianza.",
    
    guerra5Title: "5. Manera de Entrada",
    guerra5Desc: "Cómo la persona entró a EE.UU. (con inspección, sin inspección, visa vencida) se considera.",
    
    guerra6Title: "6. Alivio Potencial",
    guerra6Desc: "Si la persona tiene un camino viable hacia el estatus legal afecta la probabilidad de comparecer.",
    
    guerra7Title: "7. Lazos Familiares",
    guerra7Desc: "Tener familiares ciudadanos o LPR, especialmente hijos, demuestra lazos comunitarios y reduce el riesgo de fuga.",
    
    guerra8Title: "8. Historial de Empleo",
    guerra8Desc: "El empleo estable muestra lazos comunitarios y la capacidad de mantenerse sin convertirse en carga pública.",
    
    processTitle: "El Proceso de Audiencia de Fianza",
    processDesc: "Entender el proceso de audiencia de fianza ayuda a las familias a prepararse:",
    
    step1Title: "Paso 1: Solicitar Audiencia de Fianza",
    step1Desc: "Su abogado presenta una moción solicitando una audiencia de fianza ante el tribunal de inmigración.",
    
    step2Title: "Paso 2: Audiencia Programada",
    step2Desc: "El tribunal programa la audiencia de fianza, típicamente dentro de 7-14 días de la solicitud.",
    
    step3Title: "Paso 3: Preparar Evidencia",
    step3Desc: "Reunir documentos de apoyo: cartas de patrocinador, prueba de lazos familiares, registros de empleo, referencias de carácter.",
    
    step4Title: "Paso 4: Audiencia de Fianza",
    step4Desc: "El abogado presenta argumentos y evidencia al juez de inmigración. El detenido puede testificar.",
    
    step5Title: "Paso 5: Decisión del Juez",
    step5Desc: "El juez otorga fianza (estableciendo un monto), niega fianza, o continúa la audiencia para más evidencia.",
    
    step6Title: "Paso 6: Pagar Fianza",
    step6Desc: "Si se otorga fianza, debe pagarse a ICE antes de la liberación. Puede pagarse en efectivo, cheque de caja o a través de una compañía de fianzas.",
    
    bondAmountsTitle: "Montos Típicos de Fianza",
    bondAmountsDesc: "Los montos de fianza de inmigración varían ampliamente:",
    bondMin: "Fianza Mínima: $1,500 (establecida por ley)",
    bondTypical: "Rango Típico: $5,000 - $25,000",
    bondHigh: "Casos de Alto Riesgo: $25,000 - $100,000+",
    bondFactors: "Los factores que afectan el monto incluyen historial criminal, riesgo de fuga, lazos familiares y la fortaleza del caso.",
    
    sponsorTitle: "El Rol del Patrocinador",
    sponsorDesc: "Un patrocinador fuerte es crucial para una audiencia de fianza exitosa. El patrocinador se compromete a:",
    sponsor1: "Proporcionar vivienda para el detenido al ser liberado",
    sponsor2: "Asegurar que el detenido asista a todas las audiencias",
    sponsor3: "Ayudar al detenido a cumplir con todas las condiciones de liberación",
    sponsor4: "Mantener contacto regular con el detenido",
    sponsor5: "Reportar cualquier cambio de dirección o circunstancias",
    
    sponsorQualTitle: "¿Quién Puede Ser Patrocinador?",
    sponsorQual1: "Ciudadanos estadounidenses (preferido)",
    sponsorQual2: "Residentes permanentes legales",
    sponsorQual3: "Individuos con estatus de inmigración válido",
    sponsorQual4: "Familiares, amigos o miembros de la comunidad",
    sponsorQual5: "Debe tener vivienda e ingresos estables",
    
    documentsTitle: "Documentos Necesarios para Audiencia de Fianza",
    documentsDesc: "La documentación completa fortalece su caso de fianza:",
    
    doc1Title: "Documentos del Patrocinador",
    doc1Items: "ID, prueba de estatus, contrato de arrendamiento/hipoteca, talones de pago, declaraciones de impuestos",
    
    doc2Title: "Lazos Familiares",
    doc2Items: "Certificados de nacimiento, certificados de matrimonio, fotos, registros escolares de hijos",
    
    doc3Title: "Referencias de Carácter",
    doc3Items: "Cartas de empleadores, miembros de la comunidad, líderes religiosos, maestros",
    
    doc4Title: "Empleo/Educación",
    doc4Items: "Talones de pago, W-2s, cartas de empleo, diplomas, certificados",
    
    doc5Title: "Evidencia de Rehabilitación",
    doc5Items: "Certificados de finalización, registros de consejería, documentación de servicio comunitario",
    
    appealTitle: "Si Se Niega la Fianza",
    appealDesc: "Si el juez niega la fianza o la establece muy alta, tiene opciones:",
    appeal1: "Apelar a la Junta de Apelaciones de Inmigración (BIA) dentro de 30 días",
    appeal2: "Solicitar una nueva audiencia si las circunstancias cambian",
    appeal3: "Presentar una petición de habeas corpus en tribunal federal",
    appeal4: "Buscar redeterminación de fianza si fue establecida inicialmente por ICE",
    
    timelineTitle: "Cronograma de Audiencia de Fianza",
    timeline1: "Día 1: Detención por ICE",
    timeline2: "Día 1-3: Abogado presenta moción de fianza",
    timeline3: "Día 7-14: Audiencia de fianza programada",
    timeline4: "Día 14-21: Audiencia de fianza celebrada",
    timeline5: "Mismo Día: Juez emite decisión",
    timeline6: "Día 1-3 después: Fianza pagada, liberación procesada",
    
    whyTitle: "¿Por Qué Elegir Amaral Law para Audiencias de Fianza?",
    whyDesc: "Nuestros abogados de audiencias de fianza traen experiencia, preparación y defensa agresiva a cada caso.",
    why1Title: "Miles de Audiencias de Fianza",
    why1Desc: "Hemos representado detenidos en audiencias de fianza en todo el país con alta tasa de éxito.",
    why2Title: "Respuesta el Mismo Día",
    why2Desc: "Entendemos la urgencia. Respondemos a casos de fianza inmediatamente.",
    why3Title: "Preparación Integral",
    why3Desc: "Preparamos exhaustivamente cada caso con paquetes de evidencia sólidos.",
    why4Title: "Representación Bilingüe",
    why4Desc: "Nuestros abogados hablan inglés, español y portugués.",
    
    faqTitle: "Preguntas Frecuentes",
    faq1Q: "¿Cuánto tiempo toma obtener una audiencia de fianza?",
    faq1A: "Las audiencias de fianza típicamente se programan dentro de 7-14 días de presentar la moción, aunque esto varía por tribunal.",
    faq2Q: "¿Puedo recuperar el dinero de la fianza?",
    faq2A: "Sí, si el detenido comparece a todas las audiencias y cumple con todas las condiciones, la fianza se devuelve al concluir el caso.",
    faq3Q: "¿Qué pasa si no puedo pagar la fianza?",
    faq3A: "Puede usar una compañía de fianzas que cobra una tarifa no reembolsable (típicamente 15-20% del monto de la fianza).",
    faq4Q: "¿Se puede reducir la fianza después de establecerse?",
    faq4A: "Sí, puede solicitar una audiencia de redeterminación de fianza si las circunstancias cambian.",
    faq5Q: "¿Qué pasa si se niega la fianza?",
    faq5A: "Si se niega la fianza, la persona permanece en detención mientras su caso procede. Puede apelar a la BIA.",
    faq6Q: "¿Cuánto tiempo después de pagar la fianza será liberada la persona?",
    faq6A: "La liberación típicamente ocurre dentro de 24-72 horas después de pagar la fianza.",
    
    ctaTitle: "Obtenga Ayuda Con Su Audiencia de Fianza",
    ctaDesc: "Cada día en detención es un día lejos de la familia. Contáctenos inmediatamente para representación agresiva.",
    ctaButton: "Iniciar Cuestionario de Fianza",
    callNow: "Llamar Ahora",
    
    stat1: "Audiencias de Fianza",
    stat2: "Tasa de Éxito",
    stat3: "Reducción Promedio",
    stat4: "Tiempo de Respuesta",
  },
  pt: {
    title: "Audiências de Fiança de Imigração",
    subtitle: "Lutando Pela Sua Liberdade da Detenção do ICE",
    intro: "Quando um ente querido é detido pelo Serviço de Imigração e Controle de Alfândega (ICE), garantir sua liberação através de uma audiência de fiança de imigração é frequentemente o primeiro passo crítico. Nossos advogados de fiança experientes representaram com sucesso milhares de detidos em audiências de fiança em tribunais de imigração em todo o país.",
    
    whatIsTitle: "O Que É uma Fiança de Imigração?",
    whatIsDesc: "Uma fiança de imigração é uma garantia financeira que permite que um imigrante detido seja liberado da custódia do ICE enquanto seu caso de deportação está pendente. Semelhante à fiança em casos criminais, a fiança garante que a pessoa comparecerá a todas as audiências futuras.",
    
    deliveryBondTitle: "Fiança de Entrega",
    deliveryBondDesc: "Permite que o detido seja liberado da custódia para passar tempo com a família e consultar um advogado enquanto seu caso prossegue.",
    
    voluntaryDepartureTitle: "Fiança de Saída Voluntária",
    voluntaryDepartureDesc: "Permite que o detido deixe o país voluntariamente às suas próprias custas dentro de um período de tempo especificado.",
    
    eligibilityTitle: "Quem É Elegível para Fiança?",
    eligibilityDesc: "Nem todos em detenção de imigração são elegíveis para fiança. A elegibilidade depende de vários fatores:",
    
    eligibleTitle: "Geralmente Elegíveis para Fiança:",
    eligible1: "Indivíduos sem histórico criminal sério",
    eligible2: "Solicitantes de asilo que passam em entrevistas de medo crível",
    eligible3: "Aqueles com fortes laços com a comunidade",
    eligible4: "Indivíduos com familiares cidadãos ou LPR",
    eligible5: "Aqueles com histórico de emprego estável",
    eligible6: "Indivíduos sem ordens de deportação anteriores",
    
    ineligibleTitle: "Geralmente NÃO Elegíveis (Detenção Obrigatória):",
    ineligible1: "Indivíduos com certas condenações de crimes graves agravados",
    ineligible2: "Aqueles com acusações relacionadas a terrorismo",
    ineligible3: "Indivíduos que chegaram sem inspeção e foram apreendidos dentro de 14 dias",
    ineligible4: "Aqueles com ordens de deportação anteriores que reentraram ilegalmente",
    ineligible5: "Indivíduos com certas condenações de tráfico de drogas",
    ineligible6: "Aqueles considerados um perigo para a segurança nacional",
    
    guerraTitle: "Matter of Guerra: O Que os Juízes Consideram",
    guerraDesc: "Em Matter of Guerra (1990), a Junta de Apelações de Imigração estabeleceu os fatores que os juízes devem considerar ao decidir sobre a fiança:",
    
    guerra1Title: "1. Risco de Fuga",
    guerra1Desc: "Se a pessoa provavelmente comparecerá a audiências futuras. Os juízes consideram laços com a comunidade, família nos EUA, tempo de residência e histórico de imigração.",
    
    guerra2Title: "2. Perigo para a Comunidade",
    guerra2Desc: "Se a pessoa representa uma ameaça à segurança pública. Histórico criminal, natureza dos crimes e evidência de reabilitação são considerados.",
    
    guerra3Title: "3. Histórico Criminal",
    guerra3Desc: "A natureza e severidade de quaisquer condenações criminais, incluindo se são recentes ou remotas, violentas ou não violentas.",
    
    guerra4Title: "4. Histórico de Imigração",
    guerra4Desc: "Violações de imigração anteriores, deportações ou faltas de comparecimento podem impactar negativamente as decisões de fiança.",
    
    guerra5Title: "5. Forma de Entrada",
    guerra5Desc: "Como a pessoa entrou nos EUA (com inspeção, sem inspeção, visto vencido) é considerado.",
    
    guerra6Title: "6. Alívio Potencial",
    guerra6Desc: "Se a pessoa tem um caminho viável para status legal afeta a probabilidade de comparecer.",
    
    guerra7Title: "7. Laços Familiares",
    guerra7Desc: "Ter familiares cidadãos ou LPR, especialmente filhos, demonstra laços comunitários e reduz o risco de fuga.",
    
    guerra8Title: "8. Histórico de Emprego",
    guerra8Desc: "Emprego estável mostra laços comunitários e a capacidade de se sustentar.",
    
    processTitle: "O Processo de Audiência de Fiança",
    processDesc: "Entender o processo de audiência de fiança ajuda as famílias a se prepararem:",
    
    step1Title: "Passo 1: Solicitar Audiência de Fiança",
    step1Desc: "Seu advogado apresenta uma moção solicitando uma audiência de fiança ao tribunal de imigração.",
    
    step2Title: "Passo 2: Audiência Agendada",
    step2Desc: "O tribunal agenda a audiência de fiança, tipicamente dentro de 7-14 dias da solicitação.",
    
    step3Title: "Passo 3: Preparar Evidências",
    step3Desc: "Reunir documentos de apoio: cartas de patrocinador, prova de laços familiares, registros de emprego.",
    
    step4Title: "Passo 4: Audiência de Fiança",
    step4Desc: "O advogado apresenta argumentos e evidências ao juiz de imigração.",
    
    step5Title: "Passo 5: Decisão do Juiz",
    step5Desc: "O juiz concede fiança (estabelecendo um valor), nega fiança, ou continua a audiência.",
    
    step6Title: "Passo 6: Pagar Fiança",
    step6Desc: "Se a fiança for concedida, deve ser paga ao ICE antes da liberação.",
    
    bondAmountsTitle: "Valores Típicos de Fiança",
    bondAmountsDesc: "Os valores de fiança de imigração variam amplamente:",
    bondMin: "Fiança Mínima: $1,500 (estabelecida por lei)",
    bondTypical: "Faixa Típica: $5,000 - $25,000",
    bondHigh: "Casos de Alto Risco: $25,000 - $100,000+",
    bondFactors: "Fatores que afetam o valor incluem histórico criminal, risco de fuga, laços familiares e a força do caso.",
    
    sponsorTitle: "O Papel do Patrocinador",
    sponsorDesc: "Um patrocinador forte é crucial para uma audiência de fiança bem-sucedida. O patrocinador se compromete a:",
    sponsor1: "Fornecer moradia para o detido após a liberação",
    sponsor2: "Garantir que o detido compareça a todas as audiências",
    sponsor3: "Ajudar o detido a cumprir todas as condições de liberação",
    sponsor4: "Manter contato regular com o detido",
    sponsor5: "Reportar quaisquer mudanças de endereço ou circunstâncias",
    
    sponsorQualTitle: "Quem Pode Ser Patrocinador?",
    sponsorQual1: "Cidadãos americanos (preferido)",
    sponsorQual2: "Residentes permanentes legais",
    sponsorQual3: "Indivíduos com status de imigração válido",
    sponsorQual4: "Familiares, amigos ou membros da comunidade",
    sponsorQual5: "Deve ter moradia e renda estáveis",
    
    documentsTitle: "Documentos Necessários para Audiência de Fiança",
    documentsDesc: "Documentação abrangente fortalece seu caso de fiança:",
    
    doc1Title: "Documentos do Patrocinador",
    doc1Items: "ID, prova de status, contrato de aluguel/hipoteca, contracheques, declarações de imposto",
    
    doc2Title: "Laços Familiares",
    doc2Items: "Certidões de nascimento, certidões de casamento, fotos, registros escolares dos filhos",
    
    doc3Title: "Referências de Caráter",
    doc3Items: "Cartas de empregadores, membros da comunidade, líderes religiosos, professores",
    
    doc4Title: "Emprego/Educação",
    doc4Items: "Contracheques, W-2s, cartas de emprego, diplomas, certificados",
    
    doc5Title: "Evidência de Reabilitação",
    doc5Items: "Certificados de conclusão, registros de aconselhamento, documentação de serviço comunitário",
    
    appealTitle: "Se a Fiança For Negada",
    appealDesc: "Se o juiz negar a fiança ou estabelecê-la muito alta, você tem opções:",
    appeal1: "Apelar à Junta de Apelações de Imigração (BIA) dentro de 30 dias",
    appeal2: "Solicitar uma nova audiência se as circunstâncias mudarem",
    appeal3: "Apresentar uma petição de habeas corpus em tribunal federal",
    appeal4: "Buscar redeterminação de fiança se foi estabelecida inicialmente pelo ICE",
    
    timelineTitle: "Cronograma de Audiência de Fiança",
    timeline1: "Dia 1: Detenção pelo ICE",
    timeline2: "Dia 1-3: Advogado apresenta moção de fiança",
    timeline3: "Dia 7-14: Audiência de fiança agendada",
    timeline4: "Dia 14-21: Audiência de fiança realizada",
    timeline5: "Mesmo Dia: Juiz emite decisão",
    timeline6: "Dia 1-3 depois: Fiança paga, liberação processada",
    
    whyTitle: "Por Que Escolher Amaral Law para Audiências de Fiança?",
    whyDesc: "Nossos advogados de audiências de fiança trazem experiência, preparação e advocacia agressiva.",
    why1Title: "Milhares de Audiências de Fiança",
    why1Desc: "Representamos detidos em audiências de fiança em todo o país com alta taxa de sucesso.",
    why2Title: "Resposta no Mesmo Dia",
    why2Desc: "Entendemos a urgência. Respondemos a casos de fiança imediatamente.",
    why3Title: "Preparação Abrangente",
    why3Desc: "Preparamos exaustivamente cada caso com pacotes de evidências sólidos.",
    why4Title: "Representação Bilíngue",
    why4Desc: "Nossos advogados falam inglês, espanhol e português.",
    
    faqTitle: "Perguntas Frequentes",
    faq1Q: "Quanto tempo leva para obter uma audiência de fiança?",
    faq1A: "Audiências de fiança são tipicamente agendadas dentro de 7-14 dias de apresentar a moção.",
    faq2Q: "Posso recuperar o dinheiro da fiança?",
    faq2A: "Sim, se o detido comparecer a todas as audiências e cumprir todas as condições, a fiança é devolvida.",
    faq3Q: "E se eu não puder pagar a fiança?",
    faq3A: "Você pode usar uma empresa de fiança que cobra uma taxa não reembolsável (tipicamente 15-20%).",
    faq4Q: "A fiança pode ser reduzida depois de estabelecida?",
    faq4A: "Sim, você pode solicitar uma audiência de redeterminação de fiança se as circunstâncias mudarem.",
    faq5Q: "O que acontece se a fiança for negada?",
    faq5A: "Se a fiança for negada, a pessoa permanece em detenção. Você pode apelar à BIA.",
    faq6Q: "Quanto tempo depois de pagar a fiança a pessoa será liberada?",
    faq6A: "A liberação tipicamente ocorre dentro de 24-72 horas após pagar a fiança.",
    
    ctaTitle: "Obtenha Ajuda Com Sua Audiência de Fiança",
    ctaDesc: "Cada dia em detenção é um dia longe da família. Contate-nos imediatamente.",
    ctaButton: "Iniciar Questionário de Fiança",
    callNow: "Ligar Agora",
    
    stat1: "Audiências de Fiança",
    stat2: "Taxa de Sucesso",
    stat3: "Redução Média",
    stat4: "Tempo de Resposta",
  },
};

export default function BondHearings() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${t.title} | Amaral Law`}
        description={t.intro.substring(0, 160)}
        keywords="immigration bond, bond hearing, ICE bond, detention release, Matter of Guerra"
        canonicalUrl="/services/bond-hearings"
      />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1453945619913-79ec89a82c51?auto=format&fit=crop&w=1920&q=80)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Unlock className="h-4 w-4" />
              Practice Area
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light mb-8">
              {t.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/bond-questionnaire">
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
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">10,000+</div>
              <div className="text-sm text-muted-foreground">{t.stat1}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">85%</div>
              <div className="text-sm text-muted-foreground">{t.stat2}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">40%</div>
              <div className="text-sm text-muted-foreground">{t.stat3}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">24hr</div>
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

      {/* What Is Bond */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.whatIsTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t.whatIsDesc}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-8">
                  <div className="p-3 bg-green-100 rounded-lg w-fit mb-4">
                    <Unlock className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-4">{t.deliveryBondTitle}</h3>
                  <p className="text-muted-foreground">{t.deliveryBondDesc}</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-8">
                  <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
                    <ArrowRight className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-4">{t.voluntaryDepartureTitle}</h3>
                  <p className="text-muted-foreground">{t.voluntaryDepartureDesc}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.eligibilityTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t.eligibilityDesc}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-green-200 bg-green-50/50">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <h3 className="text-xl font-serif font-bold text-foreground">{t.eligibleTitle}</h3>
                  </div>
                  <ul className="space-y-3">
                    {[t.eligible1, t.eligible2, t.eligible3, t.eligible4, t.eligible5, t.eligible6].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200 bg-red-50/50">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Lock className="h-8 w-8 text-red-600" />
                    <h3 className="text-xl font-serif font-bold text-foreground">{t.ineligibleTitle}</h3>
                  </div>
                  <ul className="space-y-3">
                    {[t.ineligible1, t.ineligible2, t.ineligible3, t.ineligible4, t.ineligible5, t.ineligible6].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Matter of Guerra */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Scale className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                {t.guerraTitle}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t.guerraDesc}
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: t.guerra1Title, desc: t.guerra1Desc, icon: Users },
                { title: t.guerra2Title, desc: t.guerra2Desc, icon: Shield },
                { title: t.guerra3Title, desc: t.guerra3Desc, icon: FileText },
                { title: t.guerra4Title, desc: t.guerra4Desc, icon: Clock },
                { title: t.guerra5Title, desc: t.guerra5Desc, icon: ArrowRight },
                { title: t.guerra6Title, desc: t.guerra6Desc, icon: Scale },
                { title: t.guerra7Title, desc: t.guerra7Desc, icon: Heart },
                { title: t.guerra8Title, desc: t.guerra8Desc, icon: DollarSign },
              ].map((factor, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                        <factor.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-2">{factor.title}</h3>
                        <p className="text-muted-foreground text-sm">{factor.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.processTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t.processDesc}
            </p>
            
            <div className="space-y-6">
              {[
                { title: t.step1Title, desc: t.step1Desc, icon: FileText },
                { title: t.step2Title, desc: t.step2Desc, icon: Calendar },
                { title: t.step3Title, desc: t.step3Desc, icon: FileText },
                { title: t.step4Title, desc: t.step4Desc, icon: Gavel },
                { title: t.step5Title, desc: t.step5Desc, icon: Scale },
                { title: t.step6Title, desc: t.step6Desc, icon: DollarSign },
              ].map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    {index < 5 && <div className="w-0.5 h-full bg-primary/20 mt-2" />}
                  </div>
                  <div className="pb-8">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bond Amounts */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.bondAmountsTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t.bondAmountsDesc}
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-muted-foreground">{t.bondMin}</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-amber-500">
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                  <p className="text-muted-foreground">{t.bondTypical}</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-red-500">
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="text-muted-foreground">{t.bondHigh}</p>
                </CardContent>
              </Card>
            </div>
            <p className="text-muted-foreground italic">{t.bondFactors}</p>
          </div>
        </div>
      </section>

      {/* Sponsor Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.sponsorTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t.sponsorDesc}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-serif font-bold text-foreground mb-4">Sponsor Responsibilities</h3>
                  <ul className="space-y-3">
                    {[t.sponsor1, t.sponsor2, t.sponsor3, t.sponsor4, t.sponsor5].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-serif font-bold text-foreground mb-4">{t.sponsorQualTitle}</h3>
                  <ul className="space-y-3">
                    {[t.sponsorQual1, t.sponsorQual2, t.sponsorQual3, t.sponsorQual4, t.sponsorQual5].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Users className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8 text-center">
              <Link href="/sponsor-guide">
                <Button variant="outline" size="lg">
                  View Complete Sponsor Guide
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.documentsTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t.documentsDesc}
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: t.doc1Title, items: t.doc1Items },
                { title: t.doc2Title, items: t.doc2Items },
                { title: t.doc3Title, items: t.doc3Items },
                { title: t.doc4Title, items: t.doc4Items },
                { title: t.doc5Title, items: t.doc5Items },
              ].map((doc, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <h3 className="font-bold text-foreground">{doc.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm">{doc.items}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Link href="/bond-document-checklist">
                <Button variant="outline" size="lg">
                  View Complete Document Checklist
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* If Bond Denied */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-amber-100 rounded-lg">
                <AlertTriangle className="h-8 w-8 text-amber-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                {t.appealTitle}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t.appealDesc}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[t.appeal1, t.appeal2, t.appeal3, t.appeal4].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[t.timeline1, t.timeline2, t.timeline3, t.timeline4, t.timeline5, t.timeline6].map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">{item}</p>
                  </CardContent>
                </Card>
              ))}
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
              {[
                { title: t.why1Title, desc: t.why1Desc },
                { title: t.why2Title, desc: t.why2Desc },
                { title: t.why3Title, desc: t.why3Desc },
                { title: t.why4Title, desc: t.why4Desc },
              ].map((item, index) => (
                <Card key={index} className="border-l-4 border-l-secondary">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
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
              <Link href="/bond-questionnaire">
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
