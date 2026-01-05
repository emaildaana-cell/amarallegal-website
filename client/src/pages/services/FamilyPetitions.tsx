import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Phone, ArrowRight, Heart, Users, FileText, Clock, 
  CheckCircle, AlertTriangle, HelpCircle, Globe, Shield
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
    title: "Family-Based Immigration",
    subtitle: "Reuniting Families Through Legal Immigration",
    intro: "Family reunification is a cornerstone of U.S. immigration law. Whether you're a U.S. citizen or lawful permanent resident seeking to bring family members to the United States, or a family member seeking to join loved ones already here, our experienced attorneys can guide you through the complex family-based immigration process.",
    
    overviewTitle: "Understanding Family-Based Immigration",
    overviewDesc: "The U.S. immigration system prioritizes family unity, allowing U.S. citizens and lawful permanent residents (green card holders) to sponsor certain family members for immigration to the United States. The process varies depending on the relationship between the sponsor and the beneficiary, and can range from relatively quick to taking many years due to visa backlogs.",
    
    whoCanTitle: "Who Can File a Family Petition?",
    whoCanDesc: "Your ability to sponsor family members depends on your immigration status:",
    
    citizenTitle: "U.S. Citizens Can Petition For:",
    citizen1: "Spouse (husband or wife)",
    citizen2: "Unmarried children under 21 (immediate relatives)",
    citizen3: "Unmarried adult children (21 and older)",
    citizen4: "Married adult children (any age)",
    citizen5: "Parents (if petitioner is 21 or older)",
    citizen6: "Siblings (brothers and sisters, if petitioner is 21 or older)",
    
    lprTitle: "Lawful Permanent Residents Can Petition For:",
    lpr1: "Spouse (husband or wife)",
    lpr2: "Unmarried children under 21",
    lpr3: "Unmarried adult children (21 and older)",
    
    categoriesTitle: "Family Preference Categories",
    categoriesDesc: "Family-based immigration is divided into two main groups: Immediate Relatives (no waiting time) and Family Preference Categories (subject to annual limits and waiting times):",
    
    immediateTitle: "Immediate Relatives (No Visa Limits)",
    immediateDesc: "Immediate relatives of U.S. citizens are not subject to annual visa limits and can immigrate without waiting in a visa queue:",
    immediate1: "Spouses of U.S. citizens",
    immediate2: "Unmarried children under 21 of U.S. citizens",
    immediate3: "Parents of U.S. citizens (if the citizen is 21 or older)",
    
    f1Title: "F1: Unmarried Adult Children of U.S. Citizens",
    f1Desc: "Unmarried sons and daughters (21 years or older) of U.S. citizens. Current wait times vary by country but can exceed 7 years.",
    
    f2aTitle: "F2A: Spouses and Children of LPRs",
    f2aDesc: "Spouses and unmarried children under 21 of lawful permanent residents. Wait times typically range from 2-5 years.",
    
    f2bTitle: "F2B: Unmarried Adult Children of LPRs",
    f2bDesc: "Unmarried sons and daughters (21 years or older) of lawful permanent residents. Wait times can exceed 10 years.",
    
    f3Title: "F3: Married Adult Children of U.S. Citizens",
    f3Desc: "Married sons and daughters (any age) of U.S. citizens. Wait times can exceed 15 years for some countries.",
    
    f4Title: "F4: Siblings of U.S. Citizens",
    f4Desc: "Brothers and sisters of U.S. citizens (if the citizen is 21 or older). This category has the longest wait times, often exceeding 20 years for some countries.",
    
    processTitle: "The Family Petition Process",
    processDesc: "The family-based immigration process typically involves these steps:",
    
    step1Title: "Step 1: File Form I-130",
    step1Desc: "The U.S. citizen or LPR sponsor files Form I-130 (Petition for Alien Relative) with USCIS to establish the qualifying family relationship.",
    
    step2Title: "Step 2: Wait for Priority Date",
    step2Desc: "For preference categories, you must wait until your priority date (the date USCIS received the I-130) becomes current based on the monthly Visa Bulletin.",
    
    step3Title: "Step 3: Apply for Immigrant Visa or Adjustment",
    step3Desc: "Once the priority date is current, the beneficiary applies for an immigrant visa at a U.S. consulate abroad (consular processing) or, if already in the U.S., may be able to file Form I-485 to adjust status.",
    
    step4Title: "Step 4: Interview and Approval",
    step4Desc: "Attend an interview at the consulate or USCIS office. If approved, the beneficiary receives an immigrant visa or green card.",
    
    requirementsTitle: "Petition Requirements",
    requirementsDesc: "To successfully petition for a family member, you must meet certain requirements:",
    
    sponsorReqTitle: "Sponsor Requirements",
    sponsorReq1: "Be a U.S. citizen or lawful permanent resident",
    sponsorReq2: "Be at least 21 years old (for certain categories)",
    sponsorReq3: "Have domicile in the United States",
    sponsorReq4: "Meet income requirements (125% of federal poverty guidelines)",
    sponsorReq5: "Sign an Affidavit of Support (Form I-864)",
    
    beneficiaryReqTitle: "Beneficiary Requirements",
    beneficiaryReq1: "Have a qualifying family relationship with the sponsor",
    beneficiaryReq2: "Be admissible to the United States (no disqualifying criminal history, health issues, etc.)",
    beneficiaryReq3: "Not have violated immigration laws (or qualify for a waiver)",
    beneficiaryReq4: "Pass required medical examinations",
    beneficiaryReq5: "Provide required documentation (birth certificates, marriage certificates, etc.)",
    
    affidavitTitle: "Affidavit of Support (Form I-864)",
    affidavitDesc: "The sponsor must demonstrate the ability to financially support the immigrant at 125% of the federal poverty guidelines. This is a legally binding contract that lasts until the immigrant becomes a U.S. citizen, works 40 qualifying quarters, dies, or permanently leaves the U.S.",
    affidavit1: "Submit tax returns for the past 3 years",
    affidavit2: "Provide proof of current employment and income",
    affidavit3: "Include assets if income is insufficient",
    affidavit4: "May need a joint sponsor if income requirements aren't met",
    
    specialTitle: "Special Situations",
    specialDesc: "Some family immigration cases involve additional complexities:",
    
    special1Title: "Conditional Residence",
    special1Desc: "If you've been married less than 2 years when you receive your green card, you'll receive conditional residence valid for 2 years. You must file Form I-751 to remove conditions within 90 days before it expires.",
    
    special2Title: "K-1 Fiancé Visa",
    special2Desc: "U.S. citizens can petition for their fiancé(e) to come to the U.S. to get married. The couple must marry within 90 days of the fiancé(e)'s arrival, after which the spouse can apply for adjustment of status.",
    
    special3Title: "Widows and Widowers",
    special3Desc: "If your U.S. citizen spouse passed away, you may still be eligible to self-petition for a green card if you were married at least 2 years and file within 2 years of the death.",
    
    special4Title: "Battered Spouses (VAWA)",
    special4Desc: "Victims of domestic violence by a U.S. citizen or LPR spouse may self-petition under the Violence Against Women Act (VAWA) without the abuser's knowledge or cooperation.",
    
    waiversTitle: "Common Waivers",
    waiversDesc: "If you have immigration violations or other issues that make you inadmissible, you may need to apply for a waiver:",
    
    waiver1Title: "I-601 Waiver",
    waiver1Desc: "Waiver of grounds of inadmissibility for applicants outside the U.S. or applying through consular processing.",
    
    waiver2Title: "I-601A Provisional Waiver",
    waiver2Desc: "Allows certain immediate relatives of U.S. citizens to apply for an unlawful presence waiver before leaving the U.S. for their consular interview.",
    
    waiver3Title: "I-212 Permission to Reapply",
    waiver3Desc: "Required if you were previously deported or removed and want to return to the U.S. before the bar period has ended.",
    
    timelineTitle: "Processing Times",
    timelineDesc: "Processing times vary significantly based on the category and country of origin:",
    timelineImmediate: "Immediate Relatives: 12-24 months total processing",
    timelineF1: "F1 Category: 7-12+ years depending on country",
    timelineF2A: "F2A Category: 2-5 years depending on country",
    timelineF2B: "F2B Category: 10-15+ years depending on country",
    timelineF3: "F3 Category: 15-25+ years depending on country",
    timelineF4: "F4 Category: 20-25+ years depending on country",
    
    whyTitle: "Why Choose Amaral Law?",
    whyDesc: "Family immigration cases require careful attention to detail and strategic planning.",
    why1Title: "Comprehensive Case Evaluation",
    why1Desc: "We thoroughly analyze your situation to identify the best path forward and any potential obstacles.",
    why2Title: "Document Preparation",
    why2Desc: "We help gather and organize all required documentation to build the strongest possible case.",
    why3Title: "Interview Preparation",
    why3Desc: "We prepare you and your family members for consular and USCIS interviews.",
    why4Title: "Waiver Expertise",
    why4Desc: "If you have inadmissibility issues, we have extensive experience with waiver applications.",
    
    faqTitle: "Frequently Asked Questions",
    faq1Q: "How long does the family petition process take?",
    faq1A: "Processing times vary dramatically. Immediate relatives of U.S. citizens can complete the process in 12-24 months. Preference categories can take anywhere from 2 years to over 20 years, depending on the category and the beneficiary's country of birth.",
    faq2Q: "Can I work while waiting for my green card?",
    faq2A: "If you're adjusting status in the U.S. (Form I-485), you can apply for work authorization (EAD) while your case is pending. If you're abroad waiting for a visa, you cannot work in the U.S. until you receive your immigrant visa and enter.",
    faq3Q: "What if my sponsor doesn't meet the income requirements?",
    faq3A: "If the sponsor's income is below 125% of the poverty guidelines, they can use assets (valued at 3x or 5x the shortfall) or find a joint sponsor who meets the income requirements.",
    faq4Q: "Can I travel while my adjustment of status is pending?",
    faq4A: "You should not travel outside the U.S. without Advance Parole (travel document). Leaving without it can result in abandonment of your application. Apply for Advance Parole using Form I-131.",
    faq5Q: "What happens if my marriage ends during the process?",
    faq5A: "If you divorce before the I-130 is approved, the petition will be denied. If you divorce after approval but before getting your green card, you may lose eligibility. Consult an attorney immediately if your marriage is in trouble.",
    faq6Q: "Can same-sex couples file family petitions?",
    faq6A: "Yes. Since the Supreme Court's 2013 decision in United States v. Windsor and the 2015 Obergefell decision, same-sex marriages are recognized for all federal immigration purposes.",
    
    ctaTitle: "Start Your Family Petition Today",
    ctaDesc: "Don't let complex immigration laws keep your family apart. Contact us for a consultation to discuss your family immigration options.",
    ctaButton: "Request Consultation",
    callNow: "Call Now",
    
    stat1: "Families Reunited",
    stat2: "Success Rate",
    stat3: "Years Experience",
    stat4: "Languages Spoken",
  },
  es: {
    title: "Inmigración Basada en Familia",
    subtitle: "Reuniendo Familias a Través de la Inmigración Legal",
    intro: "La reunificación familiar es una piedra angular de la ley de inmigración de EE.UU. Ya sea que usted sea un ciudadano estadounidense o residente permanente legal que busca traer familiares a Estados Unidos, o un familiar que busca unirse a sus seres queridos que ya están aquí, nuestros abogados experimentados pueden guiarlo a través del complejo proceso de inmigración basada en familia.",
    
    overviewTitle: "Entendiendo la Inmigración Basada en Familia",
    overviewDesc: "El sistema de inmigración de EE.UU. prioriza la unidad familiar, permitiendo a ciudadanos estadounidenses y residentes permanentes legales (titulares de green card) patrocinar a ciertos familiares para inmigrar a Estados Unidos. El proceso varía según la relación entre el patrocinador y el beneficiario, y puede variar desde relativamente rápido hasta tomar muchos años debido a los atrasos de visas.",
    
    whoCanTitle: "¿Quién Puede Presentar una Petición Familiar?",
    whoCanDesc: "Su capacidad para patrocinar familiares depende de su estatus migratorio:",
    
    citizenTitle: "Ciudadanos de EE.UU. Pueden Peticionar Por:",
    citizen1: "Cónyuge (esposo o esposa)",
    citizen2: "Hijos solteros menores de 21 años (familiares inmediatos)",
    citizen3: "Hijos adultos solteros (21 años o más)",
    citizen4: "Hijos adultos casados (cualquier edad)",
    citizen5: "Padres (si el peticionario tiene 21 años o más)",
    citizen6: "Hermanos (si el peticionario tiene 21 años o más)",
    
    lprTitle: "Residentes Permanentes Legales Pueden Peticionar Por:",
    lpr1: "Cónyuge (esposo o esposa)",
    lpr2: "Hijos solteros menores de 21 años",
    lpr3: "Hijos adultos solteros (21 años o más)",
    
    categoriesTitle: "Categorías de Preferencia Familiar",
    categoriesDesc: "La inmigración basada en familia se divide en dos grupos principales: Familiares Inmediatos (sin tiempo de espera) y Categorías de Preferencia Familiar (sujetas a límites anuales y tiempos de espera):",
    
    immediateTitle: "Familiares Inmediatos (Sin Límites de Visa)",
    immediateDesc: "Los familiares inmediatos de ciudadanos estadounidenses no están sujetos a límites anuales de visa y pueden inmigrar sin esperar en una cola de visas:",
    immediate1: "Cónyuges de ciudadanos estadounidenses",
    immediate2: "Hijos solteros menores de 21 años de ciudadanos estadounidenses",
    immediate3: "Padres de ciudadanos estadounidenses (si el ciudadano tiene 21 años o más)",
    
    f1Title: "F1: Hijos Adultos Solteros de Ciudadanos de EE.UU.",
    f1Desc: "Hijos e hijas solteros (21 años o más) de ciudadanos estadounidenses. Los tiempos de espera actuales varían por país pero pueden exceder 7 años.",
    
    f2aTitle: "F2A: Cónyuges e Hijos de LPRs",
    f2aDesc: "Cónyuges e hijos solteros menores de 21 años de residentes permanentes legales. Los tiempos de espera típicamente van de 2-5 años.",
    
    f2bTitle: "F2B: Hijos Adultos Solteros de LPRs",
    f2bDesc: "Hijos e hijas solteros (21 años o más) de residentes permanentes legales. Los tiempos de espera pueden exceder 10 años.",
    
    f3Title: "F3: Hijos Adultos Casados de Ciudadanos de EE.UU.",
    f3Desc: "Hijos e hijas casados (cualquier edad) de ciudadanos estadounidenses. Los tiempos de espera pueden exceder 15 años para algunos países.",
    
    f4Title: "F4: Hermanos de Ciudadanos de EE.UU.",
    f4Desc: "Hermanos y hermanas de ciudadanos estadounidenses (si el ciudadano tiene 21 años o más). Esta categoría tiene los tiempos de espera más largos, a menudo excediendo 20 años para algunos países.",
    
    processTitle: "El Proceso de Petición Familiar",
    processDesc: "El proceso de inmigración basada en familia típicamente involucra estos pasos:",
    
    step1Title: "Paso 1: Presentar Formulario I-130",
    step1Desc: "El patrocinador ciudadano estadounidense o LPR presenta el Formulario I-130 ante USCIS para establecer la relación familiar calificante.",
    
    step2Title: "Paso 2: Esperar la Fecha de Prioridad",
    step2Desc: "Para categorías de preferencia, debe esperar hasta que su fecha de prioridad esté vigente según el Boletín de Visas mensual.",
    
    step3Title: "Paso 3: Solicitar Visa de Inmigrante o Ajuste",
    step3Desc: "Una vez que la fecha de prioridad está vigente, el beneficiario solicita una visa de inmigrante o presenta el Formulario I-485 para ajustar estatus.",
    
    step4Title: "Paso 4: Entrevista y Aprobación",
    step4Desc: "Asistir a una entrevista en el consulado u oficina de USCIS. Si se aprueba, el beneficiario recibe una visa de inmigrante o green card.",
    
    requirementsTitle: "Requisitos de la Petición",
    requirementsDesc: "Para peticionar exitosamente por un familiar, debe cumplir ciertos requisitos:",
    
    sponsorReqTitle: "Requisitos del Patrocinador",
    sponsorReq1: "Ser ciudadano estadounidense o residente permanente legal",
    sponsorReq2: "Tener al menos 21 años (para ciertas categorías)",
    sponsorReq3: "Tener domicilio en Estados Unidos",
    sponsorReq4: "Cumplir requisitos de ingresos (125% de las guías federales de pobreza)",
    sponsorReq5: "Firmar una Declaración Jurada de Apoyo (Formulario I-864)",
    
    beneficiaryReqTitle: "Requisitos del Beneficiario",
    beneficiaryReq1: "Tener una relación familiar calificante con el patrocinador",
    beneficiaryReq2: "Ser admisible a Estados Unidos",
    beneficiaryReq3: "No haber violado leyes de inmigración (o calificar para un perdón)",
    beneficiaryReq4: "Pasar exámenes médicos requeridos",
    beneficiaryReq5: "Proporcionar documentación requerida",
    
    affidavitTitle: "Declaración Jurada de Apoyo (Formulario I-864)",
    affidavitDesc: "El patrocinador debe demostrar la capacidad de apoyar financieramente al inmigrante al 125% de las guías federales de pobreza.",
    affidavit1: "Presentar declaraciones de impuestos de los últimos 3 años",
    affidavit2: "Proporcionar prueba de empleo e ingresos actuales",
    affidavit3: "Incluir activos si los ingresos son insuficientes",
    affidavit4: "Puede necesitar un co-patrocinador si no cumple los requisitos de ingresos",
    
    specialTitle: "Situaciones Especiales",
    specialDesc: "Algunos casos de inmigración familiar involucran complejidades adicionales:",
    
    special1Title: "Residencia Condicional",
    special1Desc: "Si ha estado casado menos de 2 años cuando recibe su green card, recibirá residencia condicional válida por 2 años.",
    
    special2Title: "Visa K-1 de Prometido",
    special2Desc: "Los ciudadanos estadounidenses pueden peticionar para que su prometido(a) venga a EE.UU. para casarse.",
    
    special3Title: "Viudos y Viudas",
    special3Desc: "Si su cónyuge ciudadano estadounidense falleció, aún puede ser elegible para auto-peticionar por una green card.",
    
    special4Title: "Cónyuges Maltratados (VAWA)",
    special4Desc: "Las víctimas de violencia doméstica pueden auto-peticionar bajo VAWA sin el conocimiento del abusador.",
    
    waiversTitle: "Perdones Comunes",
    waiversDesc: "Si tiene violaciones de inmigración, puede necesitar solicitar un perdón:",
    
    waiver1Title: "Perdón I-601",
    waiver1Desc: "Perdón de causales de inadmisibilidad para solicitantes fuera de EE.UU.",
    
    waiver2Title: "Perdón Provisional I-601A",
    waiver2Desc: "Permite solicitar un perdón de presencia ilegal antes de salir de EE.UU.",
    
    waiver3Title: "Permiso I-212 para Volver a Solicitar",
    waiver3Desc: "Requerido si fue previamente deportado y quiere regresar a EE.UU.",
    
    timelineTitle: "Tiempos de Procesamiento",
    timelineDesc: "Los tiempos de procesamiento varían significativamente:",
    timelineImmediate: "Familiares Inmediatos: 12-24 meses",
    timelineF1: "Categoría F1: 7-12+ años",
    timelineF2A: "Categoría F2A: 2-5 años",
    timelineF2B: "Categoría F2B: 10-15+ años",
    timelineF3: "Categoría F3: 15-25+ años",
    timelineF4: "Categoría F4: 20-25+ años",
    
    whyTitle: "¿Por Qué Elegir Amaral Law?",
    whyDesc: "Los casos de inmigración familiar requieren atención cuidadosa al detalle.",
    why1Title: "Evaluación Integral del Caso",
    why1Desc: "Analizamos exhaustivamente su situación para identificar el mejor camino a seguir.",
    why2Title: "Preparación de Documentos",
    why2Desc: "Le ayudamos a reunir y organizar toda la documentación requerida.",
    why3Title: "Preparación para Entrevistas",
    why3Desc: "Lo preparamos a usted y a sus familiares para entrevistas.",
    why4Title: "Experiencia en Perdones",
    why4Desc: "Tenemos amplia experiencia con solicitudes de perdón.",
    
    faqTitle: "Preguntas Frecuentes",
    faq1Q: "¿Cuánto tiempo toma el proceso de petición familiar?",
    faq1A: "Los tiempos varían. Familiares inmediatos: 12-24 meses. Categorías de preferencia: 2-20+ años.",
    faq2Q: "¿Puedo trabajar mientras espero mi green card?",
    faq2A: "Si está ajustando estatus en EE.UU., puede solicitar autorización de trabajo (EAD).",
    faq3Q: "¿Qué pasa si mi patrocinador no cumple los requisitos de ingresos?",
    faq3A: "Pueden usar activos o encontrar un co-patrocinador que cumpla los requisitos.",
    faq4Q: "¿Puedo viajar mientras mi ajuste de estatus está pendiente?",
    faq4A: "No debe viajar sin Permiso Anticipado (Advance Parole).",
    faq5Q: "¿Qué pasa si mi matrimonio termina durante el proceso?",
    faq5A: "Si se divorcia antes de la aprobación del I-130, la petición será denegada.",
    faq6Q: "¿Pueden las parejas del mismo sexo presentar peticiones familiares?",
    faq6A: "Sí, los matrimonios del mismo sexo son reconocidos para inmigración.",
    
    ctaTitle: "Comience Su Petición Familiar Hoy",
    ctaDesc: "No deje que las leyes de inmigración mantengan a su familia separada.",
    ctaButton: "Solicitar Consulta",
    callNow: "Llamar Ahora",
    
    stat1: "Familias Reunidas",
    stat2: "Tasa de Éxito",
    stat3: "Años de Experiencia",
    stat4: "Idiomas Hablados",
  },
  pt: {
    title: "Imigração Baseada em Família",
    subtitle: "Reunindo Famílias Através da Imigração Legal",
    intro: "A reunificação familiar é uma pedra angular da lei de imigração dos EUA. Seja você um cidadão americano ou residente permanente legal buscando trazer familiares para os Estados Unidos, ou um familiar buscando se juntar a entes queridos que já estão aqui, nossos advogados experientes podem guiá-lo através do complexo processo de imigração baseada em família.",
    
    overviewTitle: "Entendendo a Imigração Baseada em Família",
    overviewDesc: "O sistema de imigração dos EUA prioriza a unidade familiar, permitindo que cidadãos americanos e residentes permanentes legais patrocinem certos familiares para imigrar para os Estados Unidos.",
    
    whoCanTitle: "Quem Pode Apresentar uma Petição Familiar?",
    whoCanDesc: "Sua capacidade de patrocinar familiares depende do seu status de imigração:",
    
    citizenTitle: "Cidadãos dos EUA Podem Peticionar Por:",
    citizen1: "Cônjuge (marido ou esposa)",
    citizen2: "Filhos solteiros menores de 21 anos",
    citizen3: "Filhos adultos solteiros (21 anos ou mais)",
    citizen4: "Filhos adultos casados (qualquer idade)",
    citizen5: "Pais (se o peticionário tiver 21 anos ou mais)",
    citizen6: "Irmãos (se o peticionário tiver 21 anos ou mais)",
    
    lprTitle: "Residentes Permanentes Legais Podem Peticionar Por:",
    lpr1: "Cônjuge (marido ou esposa)",
    lpr2: "Filhos solteiros menores de 21 anos",
    lpr3: "Filhos adultos solteiros (21 anos ou mais)",
    
    categoriesTitle: "Categorias de Preferência Familiar",
    categoriesDesc: "A imigração baseada em família é dividida em dois grupos principais:",
    
    immediateTitle: "Parentes Imediatos (Sem Limites de Visto)",
    immediateDesc: "Parentes imediatos de cidadãos americanos não estão sujeitos a limites anuais de visto:",
    immediate1: "Cônjuges de cidadãos americanos",
    immediate2: "Filhos solteiros menores de 21 anos de cidadãos americanos",
    immediate3: "Pais de cidadãos americanos (se o cidadão tiver 21 anos ou mais)",
    
    f1Title: "F1: Filhos Adultos Solteiros de Cidadãos dos EUA",
    f1Desc: "Filhos e filhas solteiros (21 anos ou mais) de cidadãos americanos.",
    
    f2aTitle: "F2A: Cônjuges e Filhos de LPRs",
    f2aDesc: "Cônjuges e filhos solteiros menores de 21 anos de residentes permanentes legais.",
    
    f2bTitle: "F2B: Filhos Adultos Solteiros de LPRs",
    f2bDesc: "Filhos e filhas solteiros (21 anos ou mais) de residentes permanentes legais.",
    
    f3Title: "F3: Filhos Adultos Casados de Cidadãos dos EUA",
    f3Desc: "Filhos e filhas casados (qualquer idade) de cidadãos americanos.",
    
    f4Title: "F4: Irmãos de Cidadãos dos EUA",
    f4Desc: "Irmãos e irmãs de cidadãos americanos.",
    
    processTitle: "O Processo de Petição Familiar",
    processDesc: "O processo de imigração baseada em família tipicamente envolve estes passos:",
    
    step1Title: "Passo 1: Apresentar Formulário I-130",
    step1Desc: "O patrocinador apresenta o Formulário I-130 ao USCIS para estabelecer a relação familiar.",
    
    step2Title: "Passo 2: Aguardar a Data de Prioridade",
    step2Desc: "Para categorias de preferência, você deve aguardar até que sua data de prioridade esteja vigente.",
    
    step3Title: "Passo 3: Solicitar Visto de Imigrante ou Ajuste",
    step3Desc: "Uma vez que a data de prioridade esteja vigente, o beneficiário solicita um visto de imigrante ou ajuste de status.",
    
    step4Title: "Passo 4: Entrevista e Aprovação",
    step4Desc: "Comparecer a uma entrevista. Se aprovado, o beneficiário recebe um visto de imigrante ou green card.",
    
    requirementsTitle: "Requisitos da Petição",
    requirementsDesc: "Para peticionar com sucesso por um familiar, você deve atender a certos requisitos:",
    
    sponsorReqTitle: "Requisitos do Patrocinador",
    sponsorReq1: "Ser cidadão americano ou residente permanente legal",
    sponsorReq2: "Ter pelo menos 21 anos (para certas categorias)",
    sponsorReq3: "Ter domicílio nos Estados Unidos",
    sponsorReq4: "Atender aos requisitos de renda (125% das diretrizes de pobreza)",
    sponsorReq5: "Assinar uma Declaração de Apoio (Formulário I-864)",
    
    beneficiaryReqTitle: "Requisitos do Beneficiário",
    beneficiaryReq1: "Ter uma relação familiar qualificante com o patrocinador",
    beneficiaryReq2: "Ser admissível nos Estados Unidos",
    beneficiaryReq3: "Não ter violado leis de imigração",
    beneficiaryReq4: "Passar nos exames médicos exigidos",
    beneficiaryReq5: "Fornecer documentação exigida",
    
    affidavitTitle: "Declaração de Apoio (Formulário I-864)",
    affidavitDesc: "O patrocinador deve demonstrar a capacidade de apoiar financeiramente o imigrante.",
    affidavit1: "Apresentar declarações de imposto dos últimos 3 anos",
    affidavit2: "Fornecer prova de emprego e renda atuais",
    affidavit3: "Incluir ativos se a renda for insuficiente",
    affidavit4: "Pode precisar de um co-patrocinador",
    
    specialTitle: "Situações Especiais",
    specialDesc: "Alguns casos de imigração familiar envolvem complexidades adicionais:",
    
    special1Title: "Residência Condicional",
    special1Desc: "Se você estiver casado há menos de 2 anos quando receber seu green card, receberá residência condicional.",
    
    special2Title: "Visto K-1 de Noivo",
    special2Desc: "Cidadãos americanos podem peticionar para que seu(sua) noivo(a) venha aos EUA para se casar.",
    
    special3Title: "Viúvos e Viúvas",
    special3Desc: "Se seu cônjuge cidadão americano faleceu, você ainda pode ser elegível para auto-peticionar.",
    
    special4Title: "Cônjuges Maltratados (VAWA)",
    special4Desc: "Vítimas de violência doméstica podem auto-peticionar sob VAWA.",
    
    waiversTitle: "Perdões Comuns",
    waiversDesc: "Se você tem violações de imigração, pode precisar solicitar um perdão:",
    
    waiver1Title: "Perdão I-601",
    waiver1Desc: "Perdão de causas de inadmissibilidade para solicitantes fora dos EUA.",
    
    waiver2Title: "Perdão Provisório I-601A",
    waiver2Desc: "Permite solicitar um perdão de presença ilegal antes de deixar os EUA.",
    
    waiver3Title: "Permissão I-212 para Reaplicar",
    waiver3Desc: "Exigido se você foi previamente deportado.",
    
    timelineTitle: "Tempos de Processamento",
    timelineDesc: "Os tempos de processamento variam significativamente:",
    timelineImmediate: "Parentes Imediatos: 12-24 meses",
    timelineF1: "Categoria F1: 7-12+ anos",
    timelineF2A: "Categoria F2A: 2-5 anos",
    timelineF2B: "Categoria F2B: 10-15+ anos",
    timelineF3: "Categoria F3: 15-25+ anos",
    timelineF4: "Categoria F4: 20-25+ anos",
    
    whyTitle: "Por Que Escolher Amaral Law?",
    whyDesc: "Casos de imigração familiar requerem atenção cuidadosa aos detalhes.",
    why1Title: "Avaliação Abrangente do Caso",
    why1Desc: "Analisamos minuciosamente sua situação para identificar o melhor caminho.",
    why2Title: "Preparação de Documentos",
    why2Desc: "Ajudamos a reunir e organizar toda a documentação necessária.",
    why3Title: "Preparação para Entrevistas",
    why3Desc: "Preparamos você e seus familiares para entrevistas.",
    why4Title: "Experiência em Perdões",
    why4Desc: "Temos ampla experiência com pedidos de perdão.",
    
    faqTitle: "Perguntas Frequentes",
    faq1Q: "Quanto tempo leva o processo de petição familiar?",
    faq1A: "Os tempos variam. Parentes imediatos: 12-24 meses. Categorias de preferência: 2-20+ anos.",
    faq2Q: "Posso trabalhar enquanto espero meu green card?",
    faq2A: "Se você está ajustando status nos EUA, pode solicitar autorização de trabalho (EAD).",
    faq3Q: "E se meu patrocinador não atender aos requisitos de renda?",
    faq3A: "Eles podem usar ativos ou encontrar um co-patrocinador.",
    faq4Q: "Posso viajar enquanto meu ajuste de status está pendente?",
    faq4A: "Você não deve viajar sem Permissão Antecipada (Advance Parole).",
    faq5Q: "O que acontece se meu casamento terminar durante o processo?",
    faq5A: "Se você se divorciar antes do I-130 ser aprovado, a petição será negada.",
    faq6Q: "Casais do mesmo sexo podem apresentar petições familiares?",
    faq6A: "Sim, casamentos do mesmo sexo são reconhecidos para imigração.",
    
    ctaTitle: "Comece Sua Petição Familiar Hoje",
    ctaDesc: "Não deixe que leis de imigração mantenham sua família separada.",
    ctaButton: "Solicitar Consulta",
    callNow: "Ligar Agora",
    
    stat1: "Famílias Reunidas",
    stat2: "Taxa de Sucesso",
    stat3: "Anos de Experiência",
    stat4: "Idiomas Falados",
  },
};

export default function FamilyPetitions() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${t.title} | Amaral Law`}
        description={t.intro.substring(0, 160)}
        keywords="family immigration, family petition, I-130, green card, spouse visa, family reunification"
        canonicalUrl="/services/family-petitions"
      />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1920&q=80)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="h-4 w-4" />
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

      {/* Overview */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.overviewTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.overviewDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Who Can Petition */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.whoCanTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t.whoCanDesc}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-primary/20">
                <CardContent className="p-8">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-4">{t.citizenTitle}</h3>
                  <ul className="space-y-2">
                    {[t.citizen1, t.citizen2, t.citizen3, t.citizen4, t.citizen5, t.citizen6].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20">
                <CardContent className="p-8">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-4">{t.lprTitle}</h3>
                  <ul className="space-y-2">
                    {[t.lpr1, t.lpr2, t.lpr3].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
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

      {/* Preference Categories */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.categoriesTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t.categoriesDesc}
            </p>
            
            <Card className="border-l-4 border-l-green-500 mb-8">
              <CardContent className="p-8">
                <h3 className="text-xl font-serif font-bold text-foreground mb-4">{t.immediateTitle}</h3>
                <p className="text-muted-foreground mb-4">{t.immediateDesc}</p>
                <ul className="space-y-2">
                  {[t.immediate1, t.immediate2, t.immediate3].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: t.f1Title, desc: t.f1Desc },
                { title: t.f2aTitle, desc: t.f2aDesc },
                { title: t.f2bTitle, desc: t.f2bDesc },
                { title: t.f3Title, desc: t.f3Desc },
                { title: t.f4Title, desc: t.f4Desc },
              ].map((cat, index) => (
                <Card key={index} className="border-l-4 border-l-amber-500">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-foreground mb-2">{cat.title}</h4>
                    <p className="text-muted-foreground text-sm">{cat.desc}</p>
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
                { title: t.step2Title, desc: t.step2Desc, icon: Clock },
                { title: t.step3Title, desc: t.step3Desc, icon: Globe },
                { title: t.step4Title, desc: t.step4Desc, icon: CheckCircle },
              ].map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    {index < 3 && <div className="w-0.5 h-full bg-primary/20 mt-2" />}
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

      {/* Requirements */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.requirementsTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t.requirementsDesc}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-serif font-bold text-foreground mb-4">{t.sponsorReqTitle}</h3>
                  <ul className="space-y-3">
                    {[t.sponsorReq1, t.sponsorReq2, t.sponsorReq3, t.sponsorReq4, t.sponsorReq5].map((item, i) => (
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
                  <h3 className="text-xl font-serif font-bold text-foreground mb-4">{t.beneficiaryReqTitle}</h3>
                  <ul className="space-y-3">
                    {[t.beneficiaryReq1, t.beneficiaryReq2, t.beneficiaryReq3, t.beneficiaryReq4, t.beneficiaryReq5].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
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

      {/* Affidavit of Support */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.affidavitTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t.affidavitDesc}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[t.affidavit1, t.affidavit2, t.affidavit3, t.affidavit4].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Special Situations */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.specialTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t.specialDesc}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: t.special1Title, desc: t.special1Desc },
                { title: t.special2Title, desc: t.special2Desc },
                { title: t.special3Title, desc: t.special3Desc },
                { title: t.special4Title, desc: t.special4Desc },
              ].map((item, index) => (
                <Card key={index} className="border-l-4 border-l-secondary">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Waivers */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-amber-100 rounded-lg">
                <AlertTriangle className="h-8 w-8 text-amber-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                {t.waiversTitle}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t.waiversDesc}
            </p>
            <div className="space-y-4">
              {[
                { title: t.waiver1Title, desc: t.waiver1Desc },
                { title: t.waiver2Title, desc: t.waiver2Desc },
                { title: t.waiver3Title, desc: t.waiver3Desc },
              ].map((waiver, index) => (
                <Card key={index} className="border-amber-200">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-foreground mb-2">{waiver.title}</h3>
                    <p className="text-muted-foreground">{waiver.desc}</p>
                  </CardContent>
                </Card>
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
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t.timelineDesc}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[t.timelineImmediate, t.timelineF1, t.timelineF2A, t.timelineF2B, t.timelineF3, t.timelineF4].map((item, index) => (
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
