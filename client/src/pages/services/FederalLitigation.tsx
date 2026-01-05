import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Phone, ArrowRight, Gavel, FileText, Scale, 
  Building2, Clock, CheckCircle, AlertTriangle, HelpCircle,
  Shield, FileWarning, Users, Award
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
    title: "Federal Litigation",
    subtitle: "Taking Your Immigration Case to Federal Court",
    intro: "When administrative remedies fail, federal court litigation may be your only option. Our attorneys have extensive experience challenging USCIS denials, unreasonable delays, and unlawful government actions in federal district courts and courts of appeals. We fight for your rights when the immigration system fails you.",
    
    whenTitle: "When Federal Litigation Is Necessary",
    whenDesc: "Federal court is often the last resort when the immigration system fails. You may need federal litigation when:",
    when1: "USCIS has unreasonably delayed your application for months or years",
    when2: "Your petition or application was wrongly denied",
    when3: "You're being unlawfully detained by ICE",
    when4: "An immigration judge or the BIA made legal errors",
    when5: "USCIS is applying the law incorrectly",
    when6: "You've exhausted all administrative remedies without success",
    
    typesTitle: "Types of Federal Immigration Litigation",
    typesDesc: "We handle various types of federal court cases to protect your immigration rights:",
    
    mandamusTitle: "Writ of Mandamus",
    mandamusSubtitle: "Compelling USCIS to Act on Delayed Cases",
    mandamusDesc: "A mandamus lawsuit compels a government agency to perform a non-discretionary duty. In immigration, this typically means forcing USCIS to adjudicate an application that has been pending for an unreasonably long time.",
    mandamusWhen: "When to file mandamus:",
    mandamus1: "Your naturalization application has been pending over 120 days after the interview",
    mandamus2: "Your I-485 (green card) has been pending for years without explanation",
    mandamus3: "Your I-130 family petition has been stuck in 'administrative processing'",
    mandamus4: "USCIS keeps requesting the same documents repeatedly",
    mandamus5: "Your case has been pending far longer than published processing times",
    mandamusProcess: "The mandamus process typically takes 6-12 months. Many cases settle quickly once the lawsuit is filed, as USCIS often adjudicates the underlying application to avoid litigation.",
    
    apaTitle: "Administrative Procedure Act (APA) Claims",
    apaSubtitle: "Challenging Unlawful Agency Actions",
    apaDesc: "The APA allows you to challenge agency actions that are arbitrary, capricious, an abuse of discretion, or contrary to law. This is the primary vehicle for challenging wrongful USCIS denials.",
    apaWhen: "Common APA claims include:",
    apa1: "USCIS misinterpreted the law in denying your application",
    apa2: "The denial was not supported by substantial evidence",
    apa3: "USCIS failed to follow its own regulations or policy guidance",
    apa4: "The agency acted arbitrarily or capriciously",
    apa5: "USCIS violated your constitutional rights",
    apaStandard: "Under APA review, the court examines whether the agency's decision was reasonable based on the administrative record. The court can remand the case back to USCIS with instructions or, in some cases, order USCIS to approve the application.",
    
    habeasTitle: "Habeas Corpus Petitions",
    habeasSubtitle: "Challenging Unlawful Detention",
    habeasDesc: "A habeas corpus petition challenges the legality of your detention. If ICE is holding you unlawfully, habeas corpus may be your path to freedom.",
    habeasWhen: "Habeas corpus is appropriate when:",
    habeas1: "You're being detained beyond the statutory removal period",
    habeas2: "ICE is detaining you without a proper custody determination",
    habeas3: "You're being held despite being granted relief from removal",
    habeas4: "Your detention violates due process",
    habeas5: "ICE is detaining you pending a case that has no reasonable likelihood of removal",
    habeasZadvydas: "Under Zadvydas v. Davis, the government generally cannot detain someone for more than 6 months if there's no significant likelihood of removal in the reasonably foreseeable future.",
    
    petitionTitle: "Petition for Review",
    petitionSubtitle: "Appealing BIA Decisions to Federal Court",
    petitionDesc: "A Petition for Review (PFR) is the mechanism to appeal a final order of removal from the Board of Immigration Appeals (BIA) to the federal circuit court of appeals.",
    petitionWhen: "Key aspects of Petitions for Review:",
    petition1: "Must be filed within 30 days of the BIA's final decision",
    petition2: "Filed directly with the circuit court of appeals (not district court)",
    petition3: "Reviews legal errors made by the immigration judge or BIA",
    petition4: "Can challenge constitutional violations",
    petition5: "May include a stay of removal to prevent deportation during appeal",
    petitionDeadline: "The 30-day deadline is jurisdictional and cannot be extended. Missing this deadline means losing your right to federal court review.",
    
    processTitle: "The Federal Litigation Process",
    processDesc: "Federal court litigation follows a structured process:",
    
    step1Title: "Step 1: Case Evaluation",
    step1Desc: "We thoroughly review your case to determine if federal litigation is appropriate and likely to succeed. We assess the strength of your claims, available evidence, and potential outcomes.",
    
    step2Title: "Step 2: Complaint Drafting",
    step2Desc: "We prepare a detailed complaint outlining the facts of your case, the legal basis for your claims, and the relief you're seeking. This document sets the framework for the entire case.",
    
    step3Title: "Step 3: Filing and Service",
    step3Desc: "We file the complaint with the appropriate federal court and serve it on the government defendants (USCIS, DHS, the Attorney General, etc.).",
    
    step4Title: "Step 4: Government Response",
    step4Desc: "The government has 60 days to respond to the complaint. They may file a motion to dismiss, an answer, or in some cases, simply adjudicate your underlying application.",
    
    step5Title: "Step 5: Discovery and Briefing",
    step5Desc: "Depending on the case type, there may be discovery (exchange of documents and information) and legal briefing on the merits of your claims.",
    
    step6Title: "Step 6: Resolution",
    step6Desc: "Cases may be resolved through settlement (often USCIS adjudicating your application), summary judgment, or trial. Most immigration cases settle before trial.",
    
    venueTitle: "Where to File: Federal Court Venue",
    venueDesc: "Federal immigration cases can typically be filed in:",
    venue1: "The district where you reside",
    venue2: "The district where the agency action occurred",
    venue3: "The District of Columbia (for many agency challenges)",
    venueNote: "Venue selection can be strategic. Some districts have faster processing times or more favorable case law.",
    
    costsTitle: "Costs and Timeline",
    costsDesc: "Federal litigation involves several costs and considerations:",
    cost1Title: "Filing Fees",
    cost1Desc: "Federal court filing fees are currently $405 for district court cases. Fee waivers may be available for those who qualify.",
    cost2Title: "Attorney Fees",
    cost2Desc: "Federal litigation is complex and requires significant attorney time. We offer transparent fee structures and payment plans.",
    cost3Title: "Timeline",
    cost3Desc: "Mandamus cases often resolve in 6-12 months. APA cases may take 1-2 years. Petitions for Review can take 1-3 years depending on the circuit.",
    cost4Title: "Potential Recovery",
    cost4Desc: "In some cases, you may be able to recover attorney fees under the Equal Access to Justice Act (EAJA) if you prevail.",
    
    successTitle: "Our Track Record",
    successDesc: "We have achieved successful outcomes in federal court including:",
    success1: "Forcing USCIS to adjudicate naturalization applications pending for years",
    success2: "Overturning wrongful visa petition denials",
    success3: "Securing release of clients from unlawful ICE detention",
    success4: "Winning appeals of BIA decisions in circuit courts",
    success5: "Obtaining favorable settlements that resulted in green card approvals",
    
    whyTitle: "Why Choose Amaral Law for Federal Litigation?",
    whyDesc: "Federal court requires specialized expertise that most immigration attorneys don't have.",
    why1Title: "Federal Court Experience",
    why1Desc: "Our attorneys are admitted to practice in multiple federal district courts and circuit courts of appeals.",
    why2Title: "Litigation Skills",
    why2Desc: "We have the courtroom experience and legal writing skills necessary for federal litigation.",
    why3Title: "Strategic Approach",
    why3Desc: "We carefully evaluate each case to determine the best litigation strategy and realistic outcomes.",
    why4Title: "Proven Results",
    why4Desc: "We have a track record of successful federal court outcomes for our immigration clients.",
    
    faqTitle: "Frequently Asked Questions",
    faq1Q: "How long does federal litigation take?",
    faq1A: "Timeline varies by case type. Mandamus cases often resolve in 6-12 months (sometimes faster if USCIS adjudicates your case after the lawsuit is filed). APA cases typically take 1-2 years. Petitions for Review can take 1-3 years depending on the circuit court's backlog.",
    faq2Q: "What are my chances of winning?",
    faq2A: "Success rates vary by case type and the specific facts. We only take cases we believe have merit and a reasonable chance of success. During your consultation, we'll give you an honest assessment of your case's strengths and weaknesses.",
    faq3Q: "Can I be deported while my federal case is pending?",
    faq3A: "For Petitions for Review, you can request a stay of removal to prevent deportation while your appeal is pending. For other case types, deportation is generally not an immediate concern, but we can seek emergency relief if needed.",
    faq4Q: "Do I need to exhaust administrative remedies first?",
    faq4A: "Generally, yes. You typically must exhaust administrative remedies before filing in federal court. However, there are exceptions, such as when exhaustion would be futile or when you're challenging unreasonable delay.",
    faq5Q: "What if I can't afford federal litigation?",
    faq5A: "We offer payment plans and, in some cases, may take cases on a reduced fee or contingency basis. Fee waivers are available for court filing fees if you qualify financially. If you prevail, you may be able to recover attorney fees under EAJA.",
    faq6Q: "Can I file a federal lawsuit myself (pro se)?",
    faq6A: "While you have the right to represent yourself, federal litigation is complex and technical. Pro se litigants face significant disadvantages. We strongly recommend having experienced counsel for federal court cases.",
    
    ctaTitle: "Ready to Take Your Case to Federal Court?",
    ctaDesc: "If the immigration system has failed you, federal court may be your answer. Contact us for a consultation to discuss whether federal litigation is right for your case.",
    ctaButton: "Request Consultation",
    callNow: "Call Now",
    
    stat1: "Federal Cases Filed",
    stat2: "Success Rate",
    stat3: "Years Experience",
    stat4: "Courts Admitted",
  },
  es: {
    title: "Litigio Federal",
    subtitle: "Llevando Su Caso de Inmigración a la Corte Federal",
    intro: "Cuando los recursos administrativos fallan, el litigio en corte federal puede ser su única opción. Nuestros abogados tienen amplia experiencia desafiando denegaciones de USCIS, demoras irrazonables y acciones gubernamentales ilegales en cortes federales de distrito y cortes de apelaciones. Luchamos por sus derechos cuando el sistema de inmigración le falla.",
    
    whenTitle: "Cuándo Es Necesario el Litigio Federal",
    whenDesc: "La corte federal es a menudo el último recurso cuando el sistema de inmigración falla. Puede necesitar litigio federal cuando:",
    when1: "USCIS ha demorado irrazonablemente su solicitud por meses o años",
    when2: "Su petición o solicitud fue denegada incorrectamente",
    when3: "Está siendo detenido ilegalmente por ICE",
    when4: "Un juez de inmigración o la BIA cometió errores legales",
    when5: "USCIS está aplicando la ley incorrectamente",
    when6: "Ha agotado todos los recursos administrativos sin éxito",
    
    typesTitle: "Tipos de Litigio Federal de Inmigración",
    typesDesc: "Manejamos varios tipos de casos en corte federal para proteger sus derechos de inmigración:",
    
    mandamusTitle: "Mandamus",
    mandamusSubtitle: "Obligando a USCIS a Actuar en Casos Demorados",
    mandamusDesc: "Una demanda de mandamus obliga a una agencia gubernamental a cumplir un deber no discrecional. En inmigración, esto típicamente significa forzar a USCIS a adjudicar una solicitud que ha estado pendiente por un tiempo irrazonablemente largo.",
    mandamusWhen: "Cuándo presentar mandamus:",
    mandamus1: "Su solicitud de naturalización ha estado pendiente más de 120 días después de la entrevista",
    mandamus2: "Su I-485 (green card) ha estado pendiente por años sin explicación",
    mandamus3: "Su petición familiar I-130 está atascada en 'procesamiento administrativo'",
    mandamus4: "USCIS sigue solicitando los mismos documentos repetidamente",
    mandamus5: "Su caso ha estado pendiente mucho más tiempo que los tiempos de procesamiento publicados",
    mandamusProcess: "El proceso de mandamus típicamente toma 6-12 meses. Muchos casos se resuelven rápidamente una vez que se presenta la demanda.",
    
    apaTitle: "Reclamos bajo la Ley de Procedimiento Administrativo (APA)",
    apaSubtitle: "Desafiando Acciones Ilegales de la Agencia",
    apaDesc: "La APA le permite desafiar acciones de agencias que son arbitrarias, caprichosas, abuso de discreción o contrarias a la ley.",
    apaWhen: "Reclamos comunes bajo APA incluyen:",
    apa1: "USCIS malinterpretó la ley al denegar su solicitud",
    apa2: "La denegación no estaba respaldada por evidencia sustancial",
    apa3: "USCIS no siguió sus propias regulaciones o guías de política",
    apa4: "La agencia actuó arbitraria o caprichosamente",
    apa5: "USCIS violó sus derechos constitucionales",
    apaStandard: "Bajo revisión APA, la corte examina si la decisión de la agencia fue razonable basada en el registro administrativo.",
    
    habeasTitle: "Peticiones de Habeas Corpus",
    habeasSubtitle: "Desafiando Detención Ilegal",
    habeasDesc: "Una petición de habeas corpus desafía la legalidad de su detención. Si ICE lo está deteniendo ilegalmente, habeas corpus puede ser su camino a la libertad.",
    habeasWhen: "Habeas corpus es apropiado cuando:",
    habeas1: "Está siendo detenido más allá del período de deportación estatutario",
    habeas2: "ICE lo está deteniendo sin una determinación de custodia apropiada",
    habeas3: "Está siendo detenido a pesar de haber recibido alivio de deportación",
    habeas4: "Su detención viola el debido proceso",
    habeas5: "ICE lo está deteniendo pendiente un caso sin probabilidad razonable de deportación",
    habeasZadvydas: "Bajo Zadvydas v. Davis, el gobierno generalmente no puede detener a alguien por más de 6 meses si no hay probabilidad significativa de deportación.",
    
    petitionTitle: "Petición de Revisión",
    petitionSubtitle: "Apelando Decisiones de la BIA a la Corte Federal",
    petitionDesc: "Una Petición de Revisión es el mecanismo para apelar una orden final de deportación de la BIA a la corte federal de apelaciones.",
    petitionWhen: "Aspectos clave de las Peticiones de Revisión:",
    petition1: "Debe presentarse dentro de 30 días de la decisión final de la BIA",
    petition2: "Se presenta directamente ante la corte de apelaciones del circuito",
    petition3: "Revisa errores legales cometidos por el juez de inmigración o la BIA",
    petition4: "Puede desafiar violaciones constitucionales",
    petition5: "Puede incluir una suspensión de deportación durante la apelación",
    petitionDeadline: "El plazo de 30 días es jurisdiccional y no puede extenderse. Perder este plazo significa perder su derecho a revisión en corte federal.",
    
    processTitle: "El Proceso de Litigio Federal",
    processDesc: "El litigio en corte federal sigue un proceso estructurado:",
    
    step1Title: "Paso 1: Evaluación del Caso",
    step1Desc: "Revisamos exhaustivamente su caso para determinar si el litigio federal es apropiado y tiene probabilidad de éxito.",
    
    step2Title: "Paso 2: Redacción de la Demanda",
    step2Desc: "Preparamos una demanda detallada describiendo los hechos de su caso, la base legal de sus reclamos y el alivio que busca.",
    
    step3Title: "Paso 3: Presentación y Notificación",
    step3Desc: "Presentamos la demanda ante la corte federal apropiada y la notificamos a los demandados gubernamentales.",
    
    step4Title: "Paso 4: Respuesta del Gobierno",
    step4Desc: "El gobierno tiene 60 días para responder a la demanda.",
    
    step5Title: "Paso 5: Descubrimiento y Escritos",
    step5Desc: "Dependiendo del tipo de caso, puede haber descubrimiento y escritos legales sobre los méritos de sus reclamos.",
    
    step6Title: "Paso 6: Resolución",
    step6Desc: "Los casos pueden resolverse mediante acuerdo, sentencia sumaria o juicio. La mayoría de los casos de inmigración se resuelven antes del juicio.",
    
    venueTitle: "Dónde Presentar: Jurisdicción de la Corte Federal",
    venueDesc: "Los casos federales de inmigración típicamente pueden presentarse en:",
    venue1: "El distrito donde usted reside",
    venue2: "El distrito donde ocurrió la acción de la agencia",
    venue3: "El Distrito de Columbia (para muchos desafíos de agencias)",
    venueNote: "La selección de jurisdicción puede ser estratégica.",
    
    costsTitle: "Costos y Cronograma",
    costsDesc: "El litigio federal involucra varios costos y consideraciones:",
    cost1Title: "Tarifas de Presentación",
    cost1Desc: "Las tarifas de presentación en corte federal son actualmente $405 para casos de corte de distrito.",
    cost2Title: "Honorarios de Abogado",
    cost2Desc: "El litigio federal es complejo y requiere tiempo significativo del abogado. Ofrecemos estructuras de tarifas transparentes.",
    cost3Title: "Cronograma",
    cost3Desc: "Los casos de mandamus a menudo se resuelven en 6-12 meses. Los casos APA pueden tomar 1-2 años.",
    cost4Title: "Recuperación Potencial",
    cost4Desc: "En algunos casos, puede recuperar honorarios de abogado bajo EAJA si prevalece.",
    
    successTitle: "Nuestro Historial",
    successDesc: "Hemos logrado resultados exitosos en corte federal incluyendo:",
    success1: "Forzar a USCIS a adjudicar solicitudes de naturalización pendientes por años",
    success2: "Revertir denegaciones incorrectas de peticiones de visa",
    success3: "Asegurar la liberación de clientes de detención ilegal de ICE",
    success4: "Ganar apelaciones de decisiones de la BIA en cortes de circuito",
    success5: "Obtener acuerdos favorables que resultaron en aprobaciones de green card",
    
    whyTitle: "¿Por Qué Elegir Amaral Law para Litigio Federal?",
    whyDesc: "La corte federal requiere experiencia especializada que la mayoría de abogados de inmigración no tienen.",
    why1Title: "Experiencia en Corte Federal",
    why1Desc: "Nuestros abogados están admitidos para practicar en múltiples cortes federales de distrito y cortes de apelaciones.",
    why2Title: "Habilidades de Litigio",
    why2Desc: "Tenemos la experiencia en tribunales y habilidades de escritura legal necesarias para litigio federal.",
    why3Title: "Enfoque Estratégico",
    why3Desc: "Evaluamos cuidadosamente cada caso para determinar la mejor estrategia de litigio.",
    why4Title: "Resultados Comprobados",
    why4Desc: "Tenemos un historial de resultados exitosos en corte federal para nuestros clientes de inmigración.",
    
    faqTitle: "Preguntas Frecuentes",
    faq1Q: "¿Cuánto tiempo toma el litigio federal?",
    faq1A: "El cronograma varía según el tipo de caso. Los casos de mandamus a menudo se resuelven en 6-12 meses. Los casos APA típicamente toman 1-2 años. Las Peticiones de Revisión pueden tomar 1-3 años.",
    faq2Q: "¿Cuáles son mis posibilidades de ganar?",
    faq2A: "Las tasas de éxito varían según el tipo de caso y los hechos específicos. Solo tomamos casos que creemos tienen mérito y una posibilidad razonable de éxito.",
    faq3Q: "¿Puedo ser deportado mientras mi caso federal está pendiente?",
    faq3A: "Para Peticiones de Revisión, puede solicitar una suspensión de deportación. Para otros tipos de casos, la deportación generalmente no es una preocupación inmediata.",
    faq4Q: "¿Necesito agotar los recursos administrativos primero?",
    faq4A: "Generalmente, sí. Típicamente debe agotar los recursos administrativos antes de presentar en corte federal. Sin embargo, hay excepciones.",
    faq5Q: "¿Qué pasa si no puedo pagar el litigio federal?",
    faq5A: "Ofrecemos planes de pago y, en algunos casos, podemos tomar casos con tarifas reducidas. Las exenciones de tarifas están disponibles si califica financieramente.",
    faq6Q: "¿Puedo presentar una demanda federal yo mismo (pro se)?",
    faq6A: "Aunque tiene el derecho de representarse a sí mismo, el litigio federal es complejo y técnico. Recomendamos encarecidamente tener un abogado experimentado.",
    
    ctaTitle: "¿Listo para Llevar Su Caso a la Corte Federal?",
    ctaDesc: "Si el sistema de inmigración le ha fallado, la corte federal puede ser su respuesta. Contáctenos para una consulta.",
    ctaButton: "Solicitar Consulta",
    callNow: "Llamar Ahora",
    
    stat1: "Casos Federales Presentados",
    stat2: "Tasa de Éxito",
    stat3: "Años de Experiencia",
    stat4: "Cortes Admitidos",
  },
  pt: {
    title: "Litígio Federal",
    subtitle: "Levando Seu Caso de Imigração ao Tribunal Federal",
    intro: "Quando os recursos administrativos falham, o litígio em tribunal federal pode ser sua única opção. Nossos advogados têm ampla experiência desafiando negações do USCIS, atrasos irrazoáveis e ações governamentais ilegais em tribunais federais de distrito e tribunais de apelação. Lutamos pelos seus direitos quando o sistema de imigração falha com você.",
    
    whenTitle: "Quando o Litígio Federal É Necessário",
    whenDesc: "O tribunal federal é frequentemente o último recurso quando o sistema de imigração falha. Você pode precisar de litígio federal quando:",
    when1: "O USCIS atrasou irrazoavelmente sua solicitação por meses ou anos",
    when2: "Sua petição ou solicitação foi negada incorretamente",
    when3: "Você está sendo detido ilegalmente pelo ICE",
    when4: "Um juiz de imigração ou a BIA cometeu erros legais",
    when5: "O USCIS está aplicando a lei incorretamente",
    when6: "Você esgotou todos os recursos administrativos sem sucesso",
    
    typesTitle: "Tipos de Litígio Federal de Imigração",
    typesDesc: "Lidamos com vários tipos de casos em tribunal federal para proteger seus direitos de imigração:",
    
    mandamusTitle: "Mandamus",
    mandamusSubtitle: "Obrigando o USCIS a Agir em Casos Atrasados",
    mandamusDesc: "Uma ação de mandamus obriga uma agência governamental a cumprir um dever não discricionário. Em imigração, isso tipicamente significa forçar o USCIS a adjudicar uma solicitação que está pendente por um tempo irrazoavelmente longo.",
    mandamusWhen: "Quando entrar com mandamus:",
    mandamus1: "Sua solicitação de naturalização está pendente há mais de 120 dias após a entrevista",
    mandamus2: "Seu I-485 (green card) está pendente há anos sem explicação",
    mandamus3: "Sua petição familiar I-130 está presa em 'processamento administrativo'",
    mandamus4: "O USCIS continua solicitando os mesmos documentos repetidamente",
    mandamus5: "Seu caso está pendente muito mais tempo que os tempos de processamento publicados",
    mandamusProcess: "O processo de mandamus tipicamente leva 6-12 meses. Muitos casos são resolvidos rapidamente após a ação ser movida.",
    
    apaTitle: "Reivindicações sob a Lei de Procedimento Administrativo (APA)",
    apaSubtitle: "Desafiando Ações Ilegais da Agência",
    apaDesc: "A APA permite que você desafie ações de agências que são arbitrárias, caprichosas, abuso de discrição ou contrárias à lei.",
    apaWhen: "Reivindicações comuns sob APA incluem:",
    apa1: "O USCIS interpretou mal a lei ao negar sua solicitação",
    apa2: "A negação não foi apoiada por evidência substancial",
    apa3: "O USCIS não seguiu suas próprias regulamentações ou orientações de política",
    apa4: "A agência agiu arbitrária ou caprichosamente",
    apa5: "O USCIS violou seus direitos constitucionais",
    apaStandard: "Sob revisão APA, o tribunal examina se a decisão da agência foi razoável com base no registro administrativo.",
    
    habeasTitle: "Petições de Habeas Corpus",
    habeasSubtitle: "Desafiando Detenção Ilegal",
    habeasDesc: "Uma petição de habeas corpus desafia a legalidade da sua detenção. Se o ICE está detendo você ilegalmente, habeas corpus pode ser seu caminho para a liberdade.",
    habeasWhen: "Habeas corpus é apropriado quando:",
    habeas1: "Você está sendo detido além do período de remoção estatutário",
    habeas2: "O ICE está detendo você sem uma determinação de custódia adequada",
    habeas3: "Você está sendo detido apesar de ter recebido alívio de remoção",
    habeas4: "Sua detenção viola o devido processo",
    habeas5: "O ICE está detendo você pendente um caso sem probabilidade razoável de remoção",
    habeasZadvydas: "Sob Zadvydas v. Davis, o governo geralmente não pode deter alguém por mais de 6 meses se não houver probabilidade significativa de remoção.",
    
    petitionTitle: "Petição de Revisão",
    petitionSubtitle: "Apelando Decisões da BIA ao Tribunal Federal",
    petitionDesc: "Uma Petição de Revisão é o mecanismo para apelar uma ordem final de remoção da BIA ao tribunal federal de apelações.",
    petitionWhen: "Aspectos chave das Petições de Revisão:",
    petition1: "Deve ser apresentada dentro de 30 dias da decisão final da BIA",
    petition2: "Apresentada diretamente ao tribunal de apelações do circuito",
    petition3: "Revisa erros legais cometidos pelo juiz de imigração ou BIA",
    petition4: "Pode desafiar violações constitucionais",
    petition5: "Pode incluir uma suspensão de remoção durante a apelação",
    petitionDeadline: "O prazo de 30 dias é jurisdicional e não pode ser estendido. Perder este prazo significa perder seu direito à revisão em tribunal federal.",
    
    processTitle: "O Processo de Litígio Federal",
    processDesc: "O litígio em tribunal federal segue um processo estruturado:",
    
    step1Title: "Passo 1: Avaliação do Caso",
    step1Desc: "Revisamos exaustivamente seu caso para determinar se o litígio federal é apropriado e tem probabilidade de sucesso.",
    
    step2Title: "Passo 2: Redação da Petição",
    step2Desc: "Preparamos uma petição detalhada descrevendo os fatos do seu caso, a base legal das suas reivindicações e o alívio que você busca.",
    
    step3Title: "Passo 3: Apresentação e Notificação",
    step3Desc: "Apresentamos a petição ao tribunal federal apropriado e notificamos os réus governamentais.",
    
    step4Title: "Passo 4: Resposta do Governo",
    step4Desc: "O governo tem 60 dias para responder à petição.",
    
    step5Title: "Passo 5: Descoberta e Memoriais",
    step5Desc: "Dependendo do tipo de caso, pode haver descoberta e memoriais legais sobre os méritos das suas reivindicações.",
    
    step6Title: "Passo 6: Resolução",
    step6Desc: "Os casos podem ser resolvidos por acordo, julgamento sumário ou julgamento. A maioria dos casos de imigração são resolvidos antes do julgamento.",
    
    venueTitle: "Onde Apresentar: Jurisdição do Tribunal Federal",
    venueDesc: "Casos federais de imigração tipicamente podem ser apresentados em:",
    venue1: "O distrito onde você reside",
    venue2: "O distrito onde a ação da agência ocorreu",
    venue3: "O Distrito de Columbia (para muitos desafios de agências)",
    venueNote: "A seleção de jurisdição pode ser estratégica.",
    
    costsTitle: "Custos e Cronograma",
    costsDesc: "O litígio federal envolve vários custos e considerações:",
    cost1Title: "Taxas de Apresentação",
    cost1Desc: "As taxas de apresentação em tribunal federal são atualmente $405 para casos de tribunal de distrito.",
    cost2Title: "Honorários Advocatícios",
    cost2Desc: "O litígio federal é complexo e requer tempo significativo do advogado. Oferecemos estruturas de honorários transparentes.",
    cost3Title: "Cronograma",
    cost3Desc: "Casos de mandamus frequentemente são resolvidos em 6-12 meses. Casos APA podem levar 1-2 anos.",
    cost4Title: "Recuperação Potencial",
    cost4Desc: "Em alguns casos, você pode recuperar honorários advocatícios sob EAJA se prevalecer.",
    
    successTitle: "Nosso Histórico",
    successDesc: "Alcançamos resultados bem-sucedidos em tribunal federal incluindo:",
    success1: "Forçar o USCIS a adjudicar solicitações de naturalização pendentes por anos",
    success2: "Reverter negações incorretas de petições de visto",
    success3: "Garantir a liberação de clientes de detenção ilegal do ICE",
    success4: "Ganhar apelações de decisões da BIA em tribunais de circuito",
    success5: "Obter acordos favoráveis que resultaram em aprovações de green card",
    
    whyTitle: "Por Que Escolher Amaral Law para Litígio Federal?",
    whyDesc: "O tribunal federal requer experiência especializada que a maioria dos advogados de imigração não tem.",
    why1Title: "Experiência em Tribunal Federal",
    why1Desc: "Nossos advogados estão admitidos para praticar em múltiplos tribunais federais de distrito e tribunais de apelação.",
    why2Title: "Habilidades de Litígio",
    why2Desc: "Temos a experiência em tribunais e habilidades de redação legal necessárias para litígio federal.",
    why3Title: "Abordagem Estratégica",
    why3Desc: "Avaliamos cuidadosamente cada caso para determinar a melhor estratégia de litígio.",
    why4Title: "Resultados Comprovados",
    why4Desc: "Temos um histórico de resultados bem-sucedidos em tribunal federal para nossos clientes de imigração.",
    
    faqTitle: "Perguntas Frequentes",
    faq1Q: "Quanto tempo leva o litígio federal?",
    faq1A: "O cronograma varia por tipo de caso. Casos de mandamus frequentemente são resolvidos em 6-12 meses. Casos APA tipicamente levam 1-2 anos. Petições de Revisão podem levar 1-3 anos.",
    faq2Q: "Quais são minhas chances de ganhar?",
    faq2A: "As taxas de sucesso variam por tipo de caso e fatos específicos. Só aceitamos casos que acreditamos ter mérito e uma chance razoável de sucesso.",
    faq3Q: "Posso ser deportado enquanto meu caso federal está pendente?",
    faq3A: "Para Petições de Revisão, você pode solicitar uma suspensão de remoção. Para outros tipos de casos, a deportação geralmente não é uma preocupação imediata.",
    faq4Q: "Preciso esgotar os recursos administrativos primeiro?",
    faq4A: "Geralmente, sim. Você tipicamente deve esgotar os recursos administrativos antes de apresentar em tribunal federal. No entanto, há exceções.",
    faq5Q: "E se eu não puder pagar o litígio federal?",
    faq5A: "Oferecemos planos de pagamento e, em alguns casos, podemos aceitar casos com honorários reduzidos. Isenções de taxas estão disponíveis se você se qualificar financeiramente.",
    faq6Q: "Posso entrar com uma ação federal eu mesmo (pro se)?",
    faq6A: "Embora você tenha o direito de se representar, o litígio federal é complexo e técnico. Recomendamos fortemente ter um advogado experiente.",
    
    ctaTitle: "Pronto para Levar Seu Caso ao Tribunal Federal?",
    ctaDesc: "Se o sistema de imigração falhou com você, o tribunal federal pode ser sua resposta. Contate-nos para uma consulta.",
    ctaButton: "Solicitar Consulta",
    callNow: "Ligar Agora",
    
    stat1: "Casos Federais Apresentados",
    stat2: "Taxa de Sucesso",
    stat3: "Anos de Experiência",
    stat4: "Tribunais Admitidos",
  },
};

export default function FederalLitigation() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${t.title} | Amaral Law`}
        description={t.intro.substring(0, 160)}
        keywords="federal litigation, immigration lawsuit, mandamus, USCIS lawsuit, habeas corpus, petition for review"
        canonicalUrl="/services/federal-litigation"
      />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1564596823821-79b97151055e?auto=format&fit=crop&w=1920&q=80)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Gavel className="h-4 w-4" />
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
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">500+</div>
              <div className="text-sm text-muted-foreground">{t.stat1}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">85%</div>
              <div className="text-sm text-muted-foreground">{t.stat2}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">25+</div>
              <div className="text-sm text-muted-foreground">{t.stat3}</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">12</div>
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

      {/* When Federal Litigation Is Necessary */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.whenTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t.whenDesc}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[t.when1, t.when2, t.when3, t.when4, t.when5, t.when6].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-background rounded-lg border">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Types of Federal Litigation */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.typesTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              {t.typesDesc}
            </p>

            {/* Mandamus */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Gavel className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-foreground">{t.mandamusTitle}</h3>
                  <p className="text-muted-foreground">{t.mandamusSubtitle}</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">{t.mandamusDesc}</p>
              <p className="font-semibold text-foreground mb-4">{t.mandamusWhen}</p>
              <div className="grid md:grid-cols-2 gap-3 mb-6">
                {[t.mandamus1, t.mandamus2, t.mandamus3, t.mandamus4, t.mandamus5].map((item, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
                    <Clock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-sm">{t.mandamusProcess}</p>
                </CardContent>
              </Card>
            </div>

            {/* APA */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <FileWarning className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-foreground">{t.apaTitle}</h3>
                  <p className="text-muted-foreground">{t.apaSubtitle}</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">{t.apaDesc}</p>
              <p className="font-semibold text-foreground mb-4">{t.apaWhen}</p>
              <div className="space-y-3 mb-6">
                {[t.apa1, t.apa2, t.apa3, t.apa4, t.apa5].map((item, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
                    <Scale className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-sm">{t.apaStandard}</p>
                </CardContent>
              </Card>
            </div>

            {/* Habeas Corpus */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-foreground">{t.habeasTitle}</h3>
                  <p className="text-muted-foreground">{t.habeasSubtitle}</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">{t.habeasDesc}</p>
              <p className="font-semibold text-foreground mb-4">{t.habeasWhen}</p>
              <div className="space-y-3 mb-6">
                {[t.habeas1, t.habeas2, t.habeas3, t.habeas4, t.habeas5].map((item, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
                    <Shield className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Card className="border-l-4 border-l-green-500 bg-green-50">
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-sm">{t.habeasZadvydas}</p>
                </CardContent>
              </Card>
            </div>

            {/* Petition for Review */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-foreground">{t.petitionTitle}</h3>
                  <p className="text-muted-foreground">{t.petitionSubtitle}</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">{t.petitionDesc}</p>
              <p className="font-semibold text-foreground mb-4">{t.petitionWhen}</p>
              <div className="space-y-3 mb-6">
                {[t.petition1, t.petition2, t.petition3, t.petition4, t.petition5].map((item, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
                    <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Card className="border-l-4 border-l-red-500 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-muted-foreground text-sm">{t.petitionDeadline}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20 bg-muted/30">
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
                { title: t.step1Title, desc: t.step1Desc },
                { title: t.step2Title, desc: t.step2Desc },
                { title: t.step3Title, desc: t.step3Desc },
                { title: t.step4Title, desc: t.step4Desc },
                { title: t.step5Title, desc: t.step5Desc },
                { title: t.step6Title, desc: t.step6Desc },
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

      {/* Venue */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.venueTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t.venueDesc}
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[t.venue1, t.venue2, t.venue3].map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <Building2 className="h-8 w-8 text-primary mx-auto mb-3" />
                    <p className="text-muted-foreground">{item}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-muted-foreground italic">{t.venueNote}</p>
          </div>
        </div>
      </section>

      {/* Costs and Timeline */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.costsTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t.costsDesc}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: t.cost1Title, desc: t.cost1Desc },
                { title: t.cost2Title, desc: t.cost2Desc },
                { title: t.cost3Title, desc: t.cost3Desc },
                { title: t.cost4Title, desc: t.cost4Desc },
              ].map((item, index) => (
                <Card key={index}>
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

      {/* Success Stories */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Award className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                {t.successTitle}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t.successDesc}
            </p>
            <div className="space-y-4">
              {[t.success1, t.success2, t.success3, t.success4, t.success5].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-muted/30">
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
      <section className="py-16 md:py-20">
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
                <AccordionItem key={index} value={`faq-${index}`} className="bg-muted/30 rounded-lg border px-6">
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
