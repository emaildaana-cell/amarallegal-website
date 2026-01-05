import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Phone, ArrowRight, Shield, Scale, FileText, Clock, 
  AlertTriangle, CheckCircle, Users, Gavel, HelpCircle,
  Calendar, Building, Globe, Heart, RefreshCw, XCircle
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
    title: "Asylum & Humanitarian Relief",
    subtitle: "Protection for Those Fleeing Persecution",
    intro: "Asylum is a form of protection that allows individuals who have fled their home country due to persecution or a well-founded fear of persecution to remain in the United States. Our experienced asylum attorneys have helped thousands of individuals from around the world find safety and build new lives in America.",
    
    // What is Asylum
    whatIsTitle: "What is Asylum?",
    whatIsDesc: "Asylum is a legal protection available to individuals who are unable or unwilling to return to their home country because they have been persecuted or have a well-founded fear of persecution based on one of five protected grounds: race, religion, nationality, political opinion, or membership in a particular social group. The United States has a long tradition of providing refuge to those fleeing persecution, and asylum is one of the primary ways this protection is granted.",
    
    // Protected Grounds
    groundsTitle: "The Five Protected Grounds",
    groundsDesc: "To qualify for asylum, you must demonstrate that your persecution is based on at least one of these five protected grounds recognized under U.S. and international law:",
    ground1Title: "Race",
    ground1Desc: "Persecution based on your racial or ethnic background, including discrimination, violence, or threats targeting you because of your race.",
    ground2Title: "Religion",
    ground2Desc: "Persecution for your religious beliefs, practices, or affiliation with a religious group, including forced conversion, religious violence, or restrictions on worship.",
    ground3Title: "Nationality",
    ground3Desc: "Persecution based on your citizenship, country of origin, or ethnic/linguistic group, including statelessness or targeting of specific nationalities.",
    ground4Title: "Political Opinion",
    ground4Desc: "Persecution for your actual or imputed political beliefs, including opposition to government policies, activism, or association with political groups.",
    ground5Title: "Particular Social Group",
    ground5Desc: "Persecution based on membership in a group that shares a common immutable characteristic, such as gender, sexual orientation, family membership, or former occupation.",
    
    // Types of Asylum
    typesTitle: "Types of Asylum Applications",
    typesDesc: "There are two main ways to apply for asylum in the United States, depending on your immigration status and whether you are in removal proceedings:",
    
    affirmativeTitle: "Affirmative Asylum",
    affirmativeDesc: "If you are not in removal proceedings, you can affirmatively apply for asylum by filing Form I-589 with U.S. Citizenship and Immigration Services (USCIS). After filing, you will be scheduled for an interview with an asylum officer who will evaluate your claim.",
    affirmativeStep1: "File Form I-589 within one year of arrival",
    affirmativeStep2: "Receive biometrics appointment for fingerprinting",
    affirmativeStep3: "Attend asylum interview with USCIS officer",
    affirmativeStep4: "Receive decision (approved, referred to court, or denied)",
    
    defensiveTitle: "Defensive Asylum",
    defensiveDesc: "If you are in removal proceedings before an immigration judge, you can apply for asylum as a defense against deportation. The immigration judge will hear your case and make a decision on your asylum claim.",
    defensiveStep1: "File Form I-589 with the immigration court",
    defensiveStep2: "Attend master calendar hearings",
    defensiveStep3: "Present your case at individual/merits hearing",
    defensiveStep4: "Judge issues decision (grant, deny, or other relief)",
    
    // One-Year Deadline
    deadlineTitle: "Critical: One-Year Filing Deadline",
    deadlineDesc: "You must file your asylum application within one year of your last arrival in the United States. This is one of the most important deadlines in immigration law, and missing it can bar you from asylum eligibility.",
    deadlineWarning: "Missing this deadline can permanently bar you from asylum. Contact an attorney immediately if you are approaching or have passed the one-year mark.",
    
    exceptionsTitle: "Exceptions to the One-Year Deadline",
    exceptionsDesc: "In limited circumstances, you may still be eligible for asylum even if you file after one year:",
    exception1Title: "Changed Circumstances",
    exception1Desc: "Material changes in your country of origin or your personal circumstances that affect your eligibility for asylum, such as a change in government, new persecution, or changes in your personal situation.",
    exception2Title: "Extraordinary Circumstances",
    exception2Desc: "Events beyond your control that prevented timely filing, such as serious illness, mental or physical disability, legal disability (e.g., being a minor), or ineffective assistance of counsel.",
    exception3Title: "Maintained Lawful Status",
    exception3Desc: "If you maintained lawful immigration status until a reasonable period before filing, you may qualify for an exception.",
    
    // Withholding & CAT
    otherReliefTitle: "Other Forms of Protection",
    otherReliefDesc: "Even if you don't qualify for asylum, other forms of protection may be available:",
    
    withholdingTitle: "Withholding of Removal",
    withholdingDesc: "Similar to asylum but with a higher burden of proof. You must show it is more likely than not (over 50% probability) that you would be persecuted if returned to your country. Unlike asylum, there is no one-year deadline, but withholding does not provide a path to permanent residence.",
    
    catTitle: "Convention Against Torture (CAT)",
    catDesc: "Protection for those who would more likely than not be tortured by or with the acquiescence of the government if returned to their country. CAT protection does not require persecution based on a protected ground.",
    
    // Evidence
    evidenceTitle: "Building Your Asylum Case",
    evidenceDesc: "A strong asylum case requires compelling evidence to support your claim. Our attorneys help you gather and present:",
    evidence1: "Your detailed personal declaration describing the persecution you experienced or fear",
    evidence2: "Country condition reports and expert testimony about conditions in your home country",
    evidence3: "Medical and psychological evaluations documenting harm you suffered",
    evidence4: "Affidavits from witnesses who can corroborate your story",
    evidence5: "News articles, human rights reports, and other documentation",
    evidence6: "Photographs, documents, and other physical evidence",
    
    // Process Timeline
    timelineTitle: "Asylum Process Timeline",
    timelineDesc: "The asylum process can take varying amounts of time depending on your case type and location:",
    timelineAffirmative: "Affirmative cases: 6 months to 5+ years for interview, depending on USCIS backlog",
    timelineDefensive: "Defensive cases: 1-4 years for a final decision, depending on court backlog",
    timelineWorkAuth: "Work authorization: Available 180 days after filing a complete application",
    timelineGreenCard: "Green card: Eligible to apply 1 year after asylum is granted",
    
    // Appeals
    appealsTitle: "Appeals Process",
    appealsDesc: "If your asylum case is denied, you have options to appeal:",
    appealBIA: "Board of Immigration Appeals (BIA): Appeal within 30 days of the judge's decision",
    appealFederal: "Federal Circuit Court: Petition for review within 30 days of BIA decision",
    appealMotion: "Motion to Reopen/Reconsider: May be filed based on new evidence or legal errors",
    
    // Why Choose Us
    whyTitle: "Why Choose Amaral Law for Your Asylum Case?",
    whyDesc: "Asylum cases are complex and the stakes are incredibly high. Our team provides the expertise and compassion you need.",
    why1Title: "Experienced Asylum Attorneys",
    why1Desc: "Our attorneys have handled thousands of asylum cases from countries around the world, with expertise in complex claims.",
    why2Title: "Thorough Case Preparation",
    why2Desc: "We meticulously prepare every aspect of your case, from your declaration to country condition evidence to witness preparation.",
    why3Title: "Multilingual Support",
    why3Desc: "We serve clients in English, Spanish, and Portuguese, and work with interpreters for other languages.",
    why4Title: "Compassionate Representation",
    why4Desc: "We understand the trauma our clients have experienced and provide sensitive, supportive representation throughout the process.",
    
    // FAQs
    faqTitle: "Frequently Asked Questions",
    faq1Q: "Can I work while my asylum case is pending?",
    faq1A: "You can apply for work authorization (Form I-765) 150 days after filing a complete asylum application, and USCIS may grant it after 180 days. However, any delays caused by you may reset this clock.",
    faq2Q: "Can my family members be included in my asylum application?",
    faq2A: "Yes, your spouse and unmarried children under 21 who are in the U.S. can be included as derivative beneficiaries on your asylum application. They will receive asylum status if your case is approved.",
    faq3Q: "What happens if my asylum case is denied?",
    faq3A: "If your affirmative asylum case is denied, it will typically be referred to immigration court where you can present your case to a judge. If denied in court, you can appeal to the Board of Immigration Appeals and potentially to federal court.",
    faq4Q: "Can I travel outside the U.S. while my asylum case is pending?",
    faq4A: "Generally, you should not travel outside the U.S. while your asylum case is pending without advance parole. Returning to your home country may be seen as abandoning your claim that you fear persecution there.",
    faq5Q: "How long does it take to get asylum?",
    faq5A: "Processing times vary significantly. Affirmative cases can take 6 months to several years for an interview. Defensive cases depend on court backlogs and can take 1-4 years or more. After approval, you can apply for a green card after one year.",
    faq6Q: "What if I entered the U.S. illegally?",
    faq6A: "You can still apply for asylum even if you entered without inspection. Asylum is one of the few forms of relief available regardless of how you entered the country, as long as you meet the eligibility requirements.",
    
    // CTA
    ctaTitle: "Seek Protection Today",
    ctaDesc: "If you are fleeing persecution, time is critical. Contact us for a confidential consultation to discuss your asylum options.",
    ctaButton: "Request Consultation",
    callNow: "Call Now",
    
    // Stats
    stat1: "Asylum Cases Won",
    stat2: "Countries Represented",
    stat3: "Years Experience",
    stat4: "Languages Spoken",
  },
  es: {
    title: "Asilo y Alivio Humanitario",
    subtitle: "Protección para Quienes Huyen de la Persecución",
    intro: "El asilo es una forma de protección que permite a las personas que han huido de su país de origen debido a persecución o un temor fundado de persecución permanecer en los Estados Unidos. Nuestros experimentados abogados de asilo han ayudado a miles de personas de todo el mundo a encontrar seguridad y construir nuevas vidas en Estados Unidos.",
    
    whatIsTitle: "¿Qué es el Asilo?",
    whatIsDesc: "El asilo es una protección legal disponible para personas que no pueden o no quieren regresar a su país de origen porque han sido perseguidas o tienen un temor fundado de persecución basado en uno de cinco motivos protegidos: raza, religión, nacionalidad, opinión política o pertenencia a un grupo social particular. Estados Unidos tiene una larga tradición de proporcionar refugio a quienes huyen de la persecución, y el asilo es una de las principales formas en que se otorga esta protección.",
    
    groundsTitle: "Los Cinco Motivos Protegidos",
    groundsDesc: "Para calificar para asilo, debe demostrar que su persecución se basa en al menos uno de estos cinco motivos protegidos reconocidos bajo la ley estadounidense e internacional:",
    ground1Title: "Raza",
    ground1Desc: "Persecución basada en su origen racial o étnico, incluyendo discriminación, violencia o amenazas dirigidas a usted por su raza.",
    ground2Title: "Religión",
    ground2Desc: "Persecución por sus creencias religiosas, prácticas o afiliación con un grupo religioso, incluyendo conversión forzada, violencia religiosa o restricciones al culto.",
    ground3Title: "Nacionalidad",
    ground3Desc: "Persecución basada en su ciudadanía, país de origen o grupo étnico/lingüístico, incluyendo apatridia o persecución de nacionalidades específicas.",
    ground4Title: "Opinión Política",
    ground4Desc: "Persecución por sus creencias políticas reales o imputadas, incluyendo oposición a políticas gubernamentales, activismo o asociación con grupos políticos.",
    ground5Title: "Grupo Social Particular",
    ground5Desc: "Persecución basada en la pertenencia a un grupo que comparte una característica inmutable común, como género, orientación sexual, membresía familiar u ocupación anterior.",
    
    typesTitle: "Tipos de Solicitudes de Asilo",
    typesDesc: "Hay dos formas principales de solicitar asilo en Estados Unidos, dependiendo de su estatus migratorio y si está en procedimientos de deportación:",
    
    affirmativeTitle: "Asilo Afirmativo",
    affirmativeDesc: "Si no está en procedimientos de deportación, puede solicitar asilo afirmativamente presentando el Formulario I-589 ante el Servicio de Ciudadanía e Inmigración de EE.UU. (USCIS). Después de presentar, se le programará una entrevista con un oficial de asilo que evaluará su caso.",
    affirmativeStep1: "Presentar Formulario I-589 dentro de un año de llegada",
    affirmativeStep2: "Recibir cita de biometría para huellas digitales",
    affirmativeStep3: "Asistir a entrevista de asilo con oficial de USCIS",
    affirmativeStep4: "Recibir decisión (aprobado, referido a corte, o denegado)",
    
    defensiveTitle: "Asilo Defensivo",
    defensiveDesc: "Si está en procedimientos de deportación ante un juez de inmigración, puede solicitar asilo como defensa contra la deportación. El juez de inmigración escuchará su caso y tomará una decisión sobre su solicitud de asilo.",
    defensiveStep1: "Presentar Formulario I-589 ante la corte de inmigración",
    defensiveStep2: "Asistir a audiencias de calendario maestro",
    defensiveStep3: "Presentar su caso en audiencia individual/de méritos",
    defensiveStep4: "El juez emite decisión (otorgar, denegar, u otro alivio)",
    
    deadlineTitle: "Crítico: Plazo de Un Año para Presentar",
    deadlineDesc: "Debe presentar su solicitud de asilo dentro de un año de su última llegada a Estados Unidos. Este es uno de los plazos más importantes en la ley de inmigración, y perderlo puede impedirle ser elegible para asilo.",
    deadlineWarning: "Perder este plazo puede impedirle permanentemente obtener asilo. Contacte a un abogado inmediatamente si se acerca o ha pasado la marca de un año.",
    
    exceptionsTitle: "Excepciones al Plazo de Un Año",
    exceptionsDesc: "En circunstancias limitadas, aún puede ser elegible para asilo incluso si presenta después de un año:",
    exception1Title: "Circunstancias Cambiadas",
    exception1Desc: "Cambios materiales en su país de origen o sus circunstancias personales que afectan su elegibilidad para asilo, como un cambio de gobierno, nueva persecución o cambios en su situación personal.",
    exception2Title: "Circunstancias Extraordinarias",
    exception2Desc: "Eventos fuera de su control que impidieron la presentación oportuna, como enfermedad grave, discapacidad mental o física, discapacidad legal (ej., ser menor), o asistencia ineficaz de abogado.",
    exception3Title: "Mantuvo Estatus Legal",
    exception3Desc: "Si mantuvo estatus migratorio legal hasta un período razonable antes de presentar, puede calificar para una excepción.",
    
    otherReliefTitle: "Otras Formas de Protección",
    otherReliefDesc: "Incluso si no califica para asilo, otras formas de protección pueden estar disponibles:",
    
    withholdingTitle: "Suspensión de Deportación",
    withholdingDesc: "Similar al asilo pero con una carga de prueba más alta. Debe demostrar que es más probable que no (más del 50% de probabilidad) que sería perseguido si regresa a su país. A diferencia del asilo, no hay plazo de un año, pero la suspensión no proporciona un camino a la residencia permanente.",
    
    catTitle: "Convención Contra la Tortura (CAT)",
    catDesc: "Protección para quienes más probablemente que no serían torturados por o con la aquiescencia del gobierno si regresan a su país. La protección CAT no requiere persecución basada en un motivo protegido.",
    
    evidenceTitle: "Construyendo Su Caso de Asilo",
    evidenceDesc: "Un caso de asilo sólido requiere evidencia convincente para respaldar su reclamo. Nuestros abogados le ayudan a reunir y presentar:",
    evidence1: "Su declaración personal detallada describiendo la persecución que experimentó o teme",
    evidence2: "Informes de condiciones del país y testimonio de expertos sobre las condiciones en su país de origen",
    evidence3: "Evaluaciones médicas y psicológicas documentando el daño que sufrió",
    evidence4: "Declaraciones juradas de testigos que pueden corroborar su historia",
    evidence5: "Artículos de noticias, informes de derechos humanos y otra documentación",
    evidence6: "Fotografías, documentos y otra evidencia física",
    
    timelineTitle: "Cronograma del Proceso de Asilo",
    timelineDesc: "El proceso de asilo puede tomar diferentes cantidades de tiempo dependiendo del tipo de caso y ubicación:",
    timelineAffirmative: "Casos afirmativos: 6 meses a 5+ años para entrevista, dependiendo del atraso de USCIS",
    timelineDefensive: "Casos defensivos: 1-4 años para una decisión final, dependiendo del atraso de la corte",
    timelineWorkAuth: "Autorización de trabajo: Disponible 180 días después de presentar una solicitud completa",
    timelineGreenCard: "Green card: Elegible para solicitar 1 año después de que se otorgue el asilo",
    
    appealsTitle: "Proceso de Apelaciones",
    appealsDesc: "Si su caso de asilo es denegado, tiene opciones para apelar:",
    appealBIA: "Junta de Apelaciones de Inmigración (BIA): Apelar dentro de 30 días de la decisión del juez",
    appealFederal: "Corte de Circuito Federal: Petición de revisión dentro de 30 días de la decisión del BIA",
    appealMotion: "Moción para Reabrir/Reconsiderar: Puede presentarse basada en nueva evidencia o errores legales",
    
    whyTitle: "¿Por Qué Elegir Amaral Law para Su Caso de Asilo?",
    whyDesc: "Los casos de asilo son complejos y las apuestas son increíblemente altas. Nuestro equipo proporciona la experiencia y compasión que necesita.",
    why1Title: "Abogados de Asilo Experimentados",
    why1Desc: "Nuestros abogados han manejado miles de casos de asilo de países de todo el mundo, con experiencia en reclamos complejos.",
    why2Title: "Preparación Exhaustiva del Caso",
    why2Desc: "Preparamos meticulosamente cada aspecto de su caso, desde su declaración hasta la evidencia de condiciones del país y la preparación de testigos.",
    why3Title: "Apoyo Multilingüe",
    why3Desc: "Atendemos clientes en inglés, español y portugués, y trabajamos con intérpretes para otros idiomas.",
    why4Title: "Representación Compasiva",
    why4Desc: "Entendemos el trauma que nuestros clientes han experimentado y proporcionamos representación sensible y de apoyo durante todo el proceso.",
    
    faqTitle: "Preguntas Frecuentes",
    faq1Q: "¿Puedo trabajar mientras mi caso de asilo está pendiente?",
    faq1A: "Puede solicitar autorización de trabajo (Formulario I-765) 150 días después de presentar una solicitud de asilo completa, y USCIS puede otorgarla después de 180 días. Sin embargo, cualquier retraso causado por usted puede reiniciar este reloj.",
    faq2Q: "¿Pueden mis familiares ser incluidos en mi solicitud de asilo?",
    faq2A: "Sí, su cónyuge e hijos solteros menores de 21 años que están en EE.UU. pueden ser incluidos como beneficiarios derivados en su solicitud de asilo. Recibirán estatus de asilo si su caso es aprobado.",
    faq3Q: "¿Qué pasa si mi caso de asilo es denegado?",
    faq3A: "Si su caso de asilo afirmativo es denegado, típicamente será referido a la corte de inmigración donde puede presentar su caso ante un juez. Si es denegado en corte, puede apelar a la Junta de Apelaciones de Inmigración y potencialmente a la corte federal.",
    faq4Q: "¿Puedo viajar fuera de EE.UU. mientras mi caso de asilo está pendiente?",
    faq4A: "Generalmente, no debe viajar fuera de EE.UU. mientras su caso de asilo está pendiente sin permiso anticipado. Regresar a su país de origen puede verse como abandonar su reclamo de que teme persecución allí.",
    faq5Q: "¿Cuánto tiempo toma obtener asilo?",
    faq5A: "Los tiempos de procesamiento varían significativamente. Los casos afirmativos pueden tomar 6 meses a varios años para una entrevista. Los casos defensivos dependen de los atrasos de la corte y pueden tomar 1-4 años o más. Después de la aprobación, puede solicitar una green card después de un año.",
    faq6Q: "¿Qué pasa si entré a EE.UU. ilegalmente?",
    faq6A: "Aún puede solicitar asilo incluso si entró sin inspección. El asilo es una de las pocas formas de alivio disponibles independientemente de cómo entró al país, siempre que cumpla con los requisitos de elegibilidad.",
    
    ctaTitle: "Busque Protección Hoy",
    ctaDesc: "Si está huyendo de la persecución, el tiempo es crítico. Contáctenos para una consulta confidencial para discutir sus opciones de asilo.",
    ctaButton: "Solicitar Consulta",
    callNow: "Llamar Ahora",
    
    stat1: "Casos de Asilo Ganados",
    stat2: "Países Representados",
    stat3: "Años de Experiencia",
    stat4: "Idiomas Hablados",
  },
  pt: {
    title: "Asilo e Alívio Humanitário",
    subtitle: "Proteção para Quem Foge da Perseguição",
    intro: "O asilo é uma forma de proteção que permite que indivíduos que fugiram de seu país de origem devido a perseguição ou medo bem fundamentado de perseguição permaneçam nos Estados Unidos. Nossos experientes advogados de asilo ajudaram milhares de indivíduos de todo o mundo a encontrar segurança e construir novas vidas na América.",
    
    whatIsTitle: "O Que é Asilo?",
    whatIsDesc: "O asilo é uma proteção legal disponível para indivíduos que não podem ou não querem retornar ao seu país de origem porque foram perseguidos ou têm um medo bem fundamentado de perseguição com base em um dos cinco motivos protegidos: raça, religião, nacionalidade, opinião política ou pertencimento a um grupo social particular. Os Estados Unidos têm uma longa tradição de fornecer refúgio àqueles que fogem da perseguição, e o asilo é uma das principais formas pelas quais essa proteção é concedida.",
    
    groundsTitle: "Os Cinco Motivos Protegidos",
    groundsDesc: "Para se qualificar para asilo, você deve demonstrar que sua perseguição é baseada em pelo menos um destes cinco motivos protegidos reconhecidos pela lei americana e internacional:",
    ground1Title: "Raça",
    ground1Desc: "Perseguição baseada em sua origem racial ou étnica, incluindo discriminação, violência ou ameaças direcionadas a você por causa de sua raça.",
    ground2Title: "Religião",
    ground2Desc: "Perseguição por suas crenças religiosas, práticas ou afiliação com um grupo religioso, incluindo conversão forçada, violência religiosa ou restrições ao culto.",
    ground3Title: "Nacionalidade",
    ground3Desc: "Perseguição baseada em sua cidadania, país de origem ou grupo étnico/linguístico, incluindo apatridia ou perseguição de nacionalidades específicas.",
    ground4Title: "Opinião Política",
    ground4Desc: "Perseguição por suas crenças políticas reais ou imputadas, incluindo oposição a políticas governamentais, ativismo ou associação com grupos políticos.",
    ground5Title: "Grupo Social Particular",
    ground5Desc: "Perseguição baseada em pertencimento a um grupo que compartilha uma característica imutável comum, como gênero, orientação sexual, pertencimento familiar ou ocupação anterior.",
    
    typesTitle: "Tipos de Pedidos de Asilo",
    typesDesc: "Existem duas formas principais de solicitar asilo nos Estados Unidos, dependendo do seu status de imigração e se você está em procedimentos de deportação:",
    
    affirmativeTitle: "Asilo Afirmativo",
    affirmativeDesc: "Se você não está em procedimentos de deportação, pode solicitar asilo afirmativamente apresentando o Formulário I-589 ao Serviço de Cidadania e Imigração dos EUA (USCIS). Após a apresentação, você será agendado para uma entrevista com um oficial de asilo que avaliará seu caso.",
    affirmativeStep1: "Apresentar Formulário I-589 dentro de um ano da chegada",
    affirmativeStep2: "Receber agendamento de biometria para impressões digitais",
    affirmativeStep3: "Comparecer à entrevista de asilo com oficial do USCIS",
    affirmativeStep4: "Receber decisão (aprovado, encaminhado ao tribunal, ou negado)",
    
    defensiveTitle: "Asilo Defensivo",
    defensiveDesc: "Se você está em procedimentos de deportação perante um juiz de imigração, pode solicitar asilo como defesa contra a deportação. O juiz de imigração ouvirá seu caso e tomará uma decisão sobre seu pedido de asilo.",
    defensiveStep1: "Apresentar Formulário I-589 ao tribunal de imigração",
    defensiveStep2: "Comparecer às audiências de calendário mestre",
    defensiveStep3: "Apresentar seu caso na audiência individual/de mérito",
    defensiveStep4: "Juiz emite decisão (conceder, negar, ou outro alívio)",
    
    deadlineTitle: "Crítico: Prazo de Um Ano para Apresentação",
    deadlineDesc: "Você deve apresentar seu pedido de asilo dentro de um ano de sua última chegada aos Estados Unidos. Este é um dos prazos mais importantes na lei de imigração, e perdê-lo pode impedi-lo de ser elegível para asilo.",
    deadlineWarning: "Perder este prazo pode impedi-lo permanentemente de obter asilo. Entre em contato com um advogado imediatamente se você está se aproximando ou passou da marca de um ano.",
    
    exceptionsTitle: "Exceções ao Prazo de Um Ano",
    exceptionsDesc: "Em circunstâncias limitadas, você ainda pode ser elegível para asilo mesmo se apresentar após um ano:",
    exception1Title: "Circunstâncias Alteradas",
    exception1Desc: "Mudanças materiais em seu país de origem ou suas circunstâncias pessoais que afetam sua elegibilidade para asilo, como mudança de governo, nova perseguição ou mudanças em sua situação pessoal.",
    exception2Title: "Circunstâncias Extraordinárias",
    exception2Desc: "Eventos fora de seu controle que impediram a apresentação oportuna, como doença grave, deficiência mental ou física, deficiência legal (ex., ser menor), ou assistência ineficaz de advogado.",
    exception3Title: "Manteve Status Legal",
    exception3Desc: "Se você manteve status de imigração legal até um período razoável antes da apresentação, pode se qualificar para uma exceção.",
    
    otherReliefTitle: "Outras Formas de Proteção",
    otherReliefDesc: "Mesmo se você não se qualifica para asilo, outras formas de proteção podem estar disponíveis:",
    
    withholdingTitle: "Suspensão de Deportação",
    withholdingDesc: "Similar ao asilo, mas com um ônus de prova mais alto. Você deve mostrar que é mais provável do que não (mais de 50% de probabilidade) que você seria perseguido se retornasse ao seu país. Diferente do asilo, não há prazo de um ano, mas a suspensão não fornece um caminho para a residência permanente.",
    
    catTitle: "Convenção Contra a Tortura (CAT)",
    catDesc: "Proteção para aqueles que mais provavelmente do que não seriam torturados pelo ou com a aquiescência do governo se retornassem ao seu país. A proteção CAT não requer perseguição baseada em um motivo protegido.",
    
    evidenceTitle: "Construindo Seu Caso de Asilo",
    evidenceDesc: "Um caso de asilo forte requer evidências convincentes para apoiar sua reivindicação. Nossos advogados ajudam você a reunir e apresentar:",
    evidence1: "Sua declaração pessoal detalhada descrevendo a perseguição que você experimentou ou teme",
    evidence2: "Relatórios de condições do país e testemunho de especialistas sobre as condições em seu país de origem",
    evidence3: "Avaliações médicas e psicológicas documentando o dano que você sofreu",
    evidence4: "Declarações juramentadas de testemunhas que podem corroborar sua história",
    evidence5: "Artigos de notícias, relatórios de direitos humanos e outra documentação",
    evidence6: "Fotografias, documentos e outras evidências físicas",
    
    timelineTitle: "Cronograma do Processo de Asilo",
    timelineDesc: "O processo de asilo pode levar diferentes quantidades de tempo dependendo do tipo de caso e localização:",
    timelineAffirmative: "Casos afirmativos: 6 meses a 5+ anos para entrevista, dependendo do acúmulo do USCIS",
    timelineDefensive: "Casos defensivos: 1-4 anos para uma decisão final, dependendo do acúmulo do tribunal",
    timelineWorkAuth: "Autorização de trabalho: Disponível 180 dias após apresentar um pedido completo",
    timelineGreenCard: "Green card: Elegível para solicitar 1 ano após o asilo ser concedido",
    
    appealsTitle: "Processo de Apelações",
    appealsDesc: "Se seu caso de asilo for negado, você tem opções para apelar:",
    appealBIA: "Junta de Apelações de Imigração (BIA): Apelar dentro de 30 dias da decisão do juiz",
    appealFederal: "Tribunal de Circuito Federal: Petição de revisão dentro de 30 dias da decisão do BIA",
    appealMotion: "Moção para Reabrir/Reconsiderar: Pode ser apresentada com base em novas evidências ou erros legais",
    
    whyTitle: "Por Que Escolher Amaral Law para Seu Caso de Asilo?",
    whyDesc: "Casos de asilo são complexos e as apostas são incrivelmente altas. Nossa equipe fornece a experiência e compaixão que você precisa.",
    why1Title: "Advogados de Asilo Experientes",
    why1Desc: "Nossos advogados lidaram com milhares de casos de asilo de países ao redor do mundo, com experiência em reivindicações complexas.",
    why2Title: "Preparação Completa do Caso",
    why2Desc: "Preparamos meticulosamente cada aspecto do seu caso, desde sua declaração até evidências de condições do país e preparação de testemunhas.",
    why3Title: "Suporte Multilíngue",
    why3Desc: "Atendemos clientes em inglês, espanhol e português, e trabalhamos com intérpretes para outros idiomas.",
    why4Title: "Representação Compassiva",
    why4Desc: "Entendemos o trauma que nossos clientes experimentaram e fornecemos representação sensível e de apoio durante todo o processo.",
    
    faqTitle: "Perguntas Frequentes",
    faq1Q: "Posso trabalhar enquanto meu caso de asilo está pendente?",
    faq1A: "Você pode solicitar autorização de trabalho (Formulário I-765) 150 dias após apresentar um pedido de asilo completo, e o USCIS pode concedê-la após 180 dias. No entanto, quaisquer atrasos causados por você podem reiniciar este relógio.",
    faq2Q: "Meus familiares podem ser incluídos no meu pedido de asilo?",
    faq2A: "Sim, seu cônjuge e filhos solteiros menores de 21 anos que estão nos EUA podem ser incluídos como beneficiários derivados no seu pedido de asilo. Eles receberão status de asilo se seu caso for aprovado.",
    faq3Q: "O que acontece se meu caso de asilo for negado?",
    faq3A: "Se seu caso de asilo afirmativo for negado, normalmente será encaminhado ao tribunal de imigração onde você pode apresentar seu caso a um juiz. Se negado no tribunal, você pode apelar à Junta de Apelações de Imigração e potencialmente ao tribunal federal.",
    faq4Q: "Posso viajar para fora dos EUA enquanto meu caso de asilo está pendente?",
    faq4A: "Geralmente, você não deve viajar para fora dos EUA enquanto seu caso de asilo está pendente sem permissão antecipada. Retornar ao seu país de origem pode ser visto como abandonar sua reivindicação de que você teme perseguição lá.",
    faq5Q: "Quanto tempo leva para obter asilo?",
    faq5A: "Os tempos de processamento variam significativamente. Casos afirmativos podem levar 6 meses a vários anos para uma entrevista. Casos defensivos dependem dos acúmulos do tribunal e podem levar 1-4 anos ou mais. Após a aprovação, você pode solicitar um green card após um ano.",
    faq6Q: "E se eu entrei nos EUA ilegalmente?",
    faq6A: "Você ainda pode solicitar asilo mesmo se entrou sem inspeção. O asilo é uma das poucas formas de alívio disponíveis independentemente de como você entrou no país, desde que você atenda aos requisitos de elegibilidade.",
    
    ctaTitle: "Busque Proteção Hoje",
    ctaDesc: "Se você está fugindo da perseguição, o tempo é crítico. Entre em contato conosco para uma consulta confidencial para discutir suas opções de asilo.",
    ctaButton: "Solicitar Consulta",
    callNow: "Ligar Agora",
    
    stat1: "Casos de Asilo Ganhos",
    stat2: "Países Representados",
    stat3: "Anos de Experiência",
    stat4: "Idiomas Falados",
  },
};

export default function Asylum() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${t.title} | Amaral Law`}
        description={t.intro.substring(0, 160)}
        keywords="asylum lawyer, asylum application, humanitarian relief, refugee protection, withholding of removal, CAT protection"
        canonicalUrl="/services/asylum"
      />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1920&q=80)` }}
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
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">3,000+</div>
              <div className="text-sm text-muted-foreground">{t.stat1}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">50+</div>
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

      {/* What is Asylum */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.whatIsTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.whatIsDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Protected Grounds */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.groundsTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t.groundsDesc}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: t.ground1Title, desc: t.ground1Desc, icon: Users },
                { title: t.ground2Title, desc: t.ground2Desc, icon: Heart },
                { title: t.ground3Title, desc: t.ground3Desc, icon: Globe },
                { title: t.ground4Title, desc: t.ground4Desc, icon: Scale },
                { title: t.ground5Title, desc: t.ground5Desc, icon: Shield },
              ].map((ground, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                        <ground.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{ground.title}</h3>
                        <p className="text-muted-foreground text-sm">{ground.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Types of Asylum */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.typesTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t.typesDesc}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Affirmative */}
              <Card className="border-2 border-primary/20">
                <CardContent className="p-8">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-4">{t.affirmativeTitle}</h3>
                  <p className="text-muted-foreground mb-6">{t.affirmativeDesc}</p>
                  <div className="space-y-3">
                    {[t.affirmativeStep1, t.affirmativeStep2, t.affirmativeStep3, t.affirmativeStep4].map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">{i + 1}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{step}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Defensive */}
              <Card className="border-2 border-primary/20">
                <CardContent className="p-8">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-4">{t.defensiveTitle}</h3>
                  <p className="text-muted-foreground mb-6">{t.defensiveDesc}</p>
                  <div className="space-y-3">
                    {[t.defensiveStep1, t.defensiveStep2, t.defensiveStep3, t.defensiveStep4].map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">{i + 1}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{step}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* One-Year Deadline */}
      <section className="py-16 md:py-20 bg-destructive/5">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-destructive/10 rounded-lg">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                {t.deadlineTitle}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {t.deadlineDesc}
            </p>
            <Card className="border-destructive/30 bg-destructive/5 mb-10">
              <CardContent className="p-6">
                <p className="text-destructive font-medium">{t.deadlineWarning}</p>
              </CardContent>
            </Card>

            <h3 className="text-2xl font-serif font-bold text-foreground mb-4">{t.exceptionsTitle}</h3>
            <p className="text-muted-foreground mb-6">{t.exceptionsDesc}</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: t.exception1Title, desc: t.exception1Desc, icon: RefreshCw },
                { title: t.exception2Title, desc: t.exception2Desc, icon: AlertTriangle },
                { title: t.exception3Title, desc: t.exception3Desc, icon: FileText },
              ].map((exc, index) => (
                <Card key={index} className="border-amber-200">
                  <CardContent className="p-6">
                    <div className="p-2 bg-amber-100 rounded-lg w-fit mb-4">
                      <exc.icon className="h-6 w-6 text-amber-600" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2">{exc.title}</h4>
                    <p className="text-muted-foreground text-sm">{exc.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other Forms of Protection */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.otherReliefTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t.otherReliefDesc}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-8">
                  <h3 className="text-xl font-serif font-bold text-foreground mb-4">{t.withholdingTitle}</h3>
                  <p className="text-muted-foreground">{t.withholdingDesc}</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-8">
                  <h3 className="text-xl font-serif font-bold text-foreground mb-4">{t.catTitle}</h3>
                  <p className="text-muted-foreground">{t.catDesc}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Building Your Case */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.evidenceTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t.evidenceDesc}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[t.evidence1, t.evidence2, t.evidence3, t.evidence4, t.evidence5, t.evidence6].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-background rounded-lg">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.timelineTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t.timelineDesc}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[t.timelineAffirmative, t.timelineDefensive, t.timelineWorkAuth, t.timelineGreenCard].map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-muted-foreground">{item}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Appeals */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.appealsTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t.appealsDesc}
            </p>
            <div className="space-y-4">
              {[t.appealBIA, t.appealFederal, t.appealMotion].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-background rounded-lg border">
                  <Gavel className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
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
