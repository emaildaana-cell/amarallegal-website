import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Phone, ArrowRight, AlertTriangle, Shield, Scale, 
  FileText, CheckCircle, AlertOctagon, Gavel, HelpCircle,
  Users, Clock, Lock, Unlock
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
    title: "Crimmigration Defense",
    subtitle: "Protecting Your Immigration Status When Facing Criminal Charges",
    intro: "The intersection of criminal and immigration law—known as 'crimmigration'—is one of the most complex and high-stakes areas of legal practice. For non-citizens, even minor criminal charges can have devastating immigration consequences, including deportation, denial of naturalization, and permanent bars to re-entry. Our attorneys understand both systems and work to protect your immigration future while defending your criminal case.",
    
    whatIsTitle: "What Is Crimmigration?",
    whatIsDesc: "Crimmigration refers to the overlap between criminal law and immigration law. For non-citizens—including lawful permanent residents (green card holders), visa holders, DACA recipients, and undocumented individuals—a criminal conviction can trigger severe immigration consequences that may be far worse than the criminal penalties themselves. Understanding these consequences before accepting any plea deal is critical.",
    
    consequencesTitle: "Immigration Consequences of Criminal Convictions",
    consequencesDesc: "Criminal convictions can trigger various immigration consequences depending on the type of offense:",
    
    deportableTitle: "Deportable Offenses",
    deportableDesc: "Certain crimes make a non-citizen deportable (removable) from the United States, even if they have been here legally for decades:",
    deportable1: "Aggravated felonies (as defined by immigration law)",
    deportable2: "Crimes involving moral turpitude (CIMT) committed within 5 years of admission",
    deportable3: "Two or more CIMTs at any time",
    deportable4: "Controlled substance offenses (except simple possession of 30g or less of marijuana)",
    deportable5: "Firearms offenses",
    deportable6: "Domestic violence, stalking, child abuse, or violation of protection orders",
    deportable7: "Certain fraud offenses",
    
    inadmissibleTitle: "Inadmissibility Grounds",
    inadmissibleDesc: "Certain crimes make a non-citizen inadmissible, preventing them from obtaining visas, adjusting status, or re-entering the U.S.:",
    inadmissible1: "Any crime involving moral turpitude (with limited exceptions)",
    inadmissible2: "Any controlled substance violation",
    inadmissible3: "Multiple criminal convictions with aggregate sentences of 5+ years",
    inadmissible4: "Prostitution and commercialized vice",
    inadmissible5: "Human trafficking",
    inadmissible6: "Money laundering",
    
    aggravatedTitle: "Aggravated Felonies",
    aggravatedDesc: "Aggravated felonies carry the most severe immigration consequences. Despite the name, many 'aggravated felonies' under immigration law are neither aggravated nor felonies under state law. Examples include:",
    aggravated1: "Murder, rape, or sexual abuse of a minor",
    aggravated2: "Drug trafficking (including some possession with intent)",
    aggravated3: "Firearms trafficking",
    aggravated4: "Theft or burglary with a sentence of 1 year or more",
    aggravated5: "Fraud or tax evasion involving more than $10,000",
    aggravated6: "Money laundering over $10,000",
    aggravated7: "Certain crimes of violence with a sentence of 1 year or more",
    aggravated8: "Perjury or obstruction of justice with a sentence of 1 year or more",
    
    aggravatedConsequences: "Consequences of an aggravated felony conviction include: mandatory detention, ineligibility for most forms of relief from deportation, permanent bar to re-entry, and ineligibility for naturalization.",
    
    cimtTitle: "Crimes Involving Moral Turpitude (CIMT)",
    cimtDesc: "A CIMT is a crime that involves conduct that is inherently base, vile, or depraved, contrary to accepted rules of morality. Common examples include:",
    cimt1: "Theft and fraud offenses",
    cimt2: "Crimes involving intent to harm persons or property",
    cimt3: "Crimes with an element of dishonesty or deceit",
    cimt4: "Certain sex offenses",
    cimt5: "Spousal abuse",
    
    cimtException: "The 'petty offense exception' may apply if: (1) the maximum possible sentence is 1 year or less, AND (2) the actual sentence imposed was 6 months or less, AND (3) the person has only one CIMT conviction.",
    
    drugTitle: "Drug Offenses",
    drugDesc: "Drug offenses have particularly harsh immigration consequences:",
    drug1: "Any controlled substance conviction (except simple possession of 30g or less of marijuana) makes a person deportable",
    drug2: "Any drug conviction makes a person inadmissible",
    drug3: "Drug trafficking is an aggravated felony",
    drug4: "Even drug paraphernalia convictions can have immigration consequences",
    drug5: "Admission of drug use (without a conviction) can trigger inadmissibility",
    
    domesticTitle: "Domestic Violence Offenses",
    domesticDesc: "Domestic violence crimes have specific immigration consequences:",
    domestic1: "Conviction for domestic violence, stalking, child abuse, child neglect, or child abandonment makes a person deportable",
    domestic2: "Violation of a protection order makes a person deportable",
    domestic3: "These offenses may also constitute CIMTs or aggravated felonies",
    domestic4: "Victims of domestic violence may be eligible for VAWA relief",
    
    strategiesTitle: "Defense Strategies in Crimmigration Cases",
    strategiesDesc: "Our attorneys work to achieve outcomes that protect both your criminal record and your immigration status:",
    
    strategy1Title: "Immigration-Safe Plea Agreements",
    strategy1Desc: "We negotiate plea agreements that avoid or minimize immigration consequences, sometimes accepting a longer sentence in exchange for a charge that doesn't trigger deportation.",
    
    strategy2Title: "Categorical Approach Analysis",
    strategy2Desc: "We analyze whether your conviction actually meets the federal definition of a deportable offense, as many state crimes don't match federal definitions.",
    
    strategy3Title: "Post-Conviction Relief",
    strategy3Desc: "If you've already been convicted, we explore options like vacating convictions, sentence modifications, or expungements that may eliminate immigration consequences.",
    
    strategy4Title: "Waivers and Relief",
    strategy4Desc: "We identify and pursue available waivers and forms of relief from deportation, such as cancellation of removal or asylum.",
    
    strategy5Title: "Padilla Compliance",
    strategy5Desc: "Under Padilla v. Kentucky, criminal defense attorneys must advise non-citizen clients about immigration consequences. If you weren't properly advised, you may be able to withdraw your plea.",
    
    padillaTitle: "Padilla v. Kentucky: Your Right to Immigration Advice",
    padillaDesc: "In the landmark 2010 case Padilla v. Kentucky, the Supreme Court held that criminal defense attorneys have a constitutional duty to advise non-citizen clients about the immigration consequences of guilty pleas. If your attorney failed to advise you—or gave you incorrect advice—about immigration consequences, you may be able to:",
    padilla1: "Withdraw your guilty plea",
    padilla2: "Vacate your conviction",
    padilla3: "Negotiate a new plea agreement",
    padilla4: "Pursue post-conviction relief",
    
    postConvictionTitle: "Post-Conviction Relief Options",
    postConvictionDesc: "If you've already been convicted, several options may be available to eliminate or reduce immigration consequences:",
    
    postConviction1Title: "Motion to Vacate (Coram Nobis)",
    postConviction1Desc: "If your conviction was obtained through constitutional violations (like ineffective assistance of counsel), you may be able to vacate it entirely.",
    
    postConviction2Title: "Sentence Modification",
    postConviction2Desc: "Reducing a sentence to under 365 days can sometimes change an aggravated felony to a non-deportable offense.",
    
    postConviction3Title: "Expungement",
    postConviction3Desc: "While expungements generally don't eliminate immigration consequences, they may help in some circumstances.",
    
    postConviction4Title: "Governor's Pardon",
    postConviction4Desc: "A full and unconditional pardon can eliminate the immigration consequences of some convictions.",
    
    reliefTitle: "Relief from Deportation",
    reliefDesc: "Even if you're in removal proceedings due to a criminal conviction, you may be eligible for relief:",
    relief1: "Cancellation of Removal for LPRs (requires 7 years continuous residence and 5 years as LPR)",
    relief2: "Asylum or Withholding of Removal (if you fear persecution)",
    relief3: "Convention Against Torture (CAT) protection",
    relief4: "212(c) Waiver (for pre-1996 convictions)",
    relief5: "212(h) Waiver (for certain inadmissibility grounds)",
    
    processTitle: "Our Crimmigration Process",
    processDesc: "We take a comprehensive approach to crimmigration cases:",
    
    step1Title: "Step 1: Comprehensive Case Review",
    step1Desc: "We review your criminal case, immigration history, and family situation to understand all potential consequences and options.",
    
    step2Title: "Step 2: Immigration Consequence Analysis",
    step2Desc: "We analyze the specific immigration consequences of each potential charge and disposition using the categorical approach.",
    
    step3Title: "Step 3: Coordinate with Criminal Defense",
    step3Desc: "We work with your criminal defense attorney (or serve as your criminal attorney) to develop a strategy that protects your immigration status.",
    
    step4Title: "Step 4: Negotiate Immigration-Safe Resolution",
    step4Desc: "We negotiate plea agreements or trial strategies that minimize or avoid immigration consequences.",
    
    step5Title: "Step 5: Immigration Defense",
    step5Desc: "If removal proceedings are initiated, we provide aggressive defense in immigration court.",
    
    whyTitle: "Why Choose Amaral Law for Crimmigration?",
    whyDesc: "Crimmigration cases require attorneys who understand both criminal and immigration law.",
    why1Title: "Dual Expertise",
    why1Desc: "Our attorneys are experienced in both criminal defense and immigration law, understanding how they interact.",
    why2Title: "Pre-Plea Analysis",
    why2Desc: "We analyze immigration consequences before you accept any plea deal, not after it's too late.",
    why3Title: "Coordination with Criminal Counsel",
    why3Desc: "We work seamlessly with your criminal defense attorney to achieve the best overall outcome.",
    why4Title: "Post-Conviction Experience",
    why4Desc: "If you've already been convicted, we have extensive experience with post-conviction relief strategies.",
    
    faqTitle: "Frequently Asked Questions",
    faq1Q: "Will a misdemeanor affect my immigration status?",
    faq1A: "Yes, misdemeanors can have serious immigration consequences. Many crimes that are misdemeanors under state law can still be aggravated felonies or CIMTs under immigration law. Always consult an immigration attorney before accepting any plea.",
    faq2Q: "I'm a green card holder. Can I be deported for a criminal conviction?",
    faq2A: "Yes, lawful permanent residents can be deported for certain criminal convictions, including aggravated felonies, CIMTs, drug offenses, and domestic violence crimes. Even long-term residents with U.S. citizen children can be deported.",
    faq3Q: "My criminal case was dismissed. Will it affect my immigration?",
    faq3A: "A dismissed case generally won't have immigration consequences, but it depends on how it was dismissed. Some diversionary programs that result in dismissal may still be considered convictions for immigration purposes.",
    faq4Q: "Can I get my conviction expunged to avoid deportation?",
    faq4A: "Unfortunately, expungements generally don't eliminate immigration consequences. However, other forms of post-conviction relief (like vacating a conviction due to ineffective assistance) may help.",
    faq5Q: "I wasn't advised about immigration consequences when I pled guilty. What can I do?",
    faq5A: "Under Padilla v. Kentucky, you may be able to withdraw your plea or vacate your conviction if your attorney failed to advise you about immigration consequences. Contact us immediately to evaluate your options.",
    faq6Q: "Should I hire a criminal lawyer or an immigration lawyer?",
    faq6A: "Ideally, you need both—or an attorney experienced in both areas. A criminal lawyer may get a good criminal outcome that destroys your immigration status. An immigration lawyer alone can't defend your criminal case. We provide both.",
    
    ctaTitle: "Protect Your Immigration Future",
    ctaDesc: "Don't let a criminal charge destroy your life in America. Contact us immediately for a consultation to understand your options and protect your immigration status.",
    ctaButton: "Request Consultation",
    callNow: "Call Now",
    
    stat1: "Crimmigration Cases",
    stat2: "Deportations Prevented",
    stat3: "Years Experience",
    stat4: "Languages Spoken",
  },
  es: {
    title: "Defensa de Crimmigración",
    subtitle: "Protegiendo Su Estatus Migratorio Ante Cargos Criminales",
    intro: "La intersección del derecho penal y migratorio—conocida como 'crimmigración'—es una de las áreas legales más complejas y de alto riesgo. Para los no ciudadanos, incluso cargos criminales menores pueden tener consecuencias migratorias devastadoras, incluyendo deportación, denegación de naturalización y prohibiciones permanentes de reingreso. Nuestros abogados entienden ambos sistemas y trabajan para proteger su futuro migratorio mientras defienden su caso criminal.",
    
    whatIsTitle: "¿Qué Es Crimmigración?",
    whatIsDesc: "Crimmigración se refiere a la superposición entre el derecho penal y el derecho migratorio. Para los no ciudadanos—incluyendo residentes permanentes legales, titulares de visa, beneficiarios de DACA e individuos indocumentados—una condena criminal puede desencadenar consecuencias migratorias severas que pueden ser mucho peores que las penalidades criminales mismas.",
    
    consequencesTitle: "Consecuencias Migratorias de Condenas Criminales",
    consequencesDesc: "Las condenas criminales pueden desencadenar varias consecuencias migratorias según el tipo de delito:",
    
    deportableTitle: "Delitos Deportables",
    deportableDesc: "Ciertos crímenes hacen a un no ciudadano deportable de Estados Unidos, incluso si ha estado aquí legalmente por décadas:",
    deportable1: "Delitos graves agravados (según la ley de inmigración)",
    deportable2: "Crímenes que involucran bajeza moral (CIMT) cometidos dentro de 5 años de admisión",
    deportable3: "Dos o más CIMTs en cualquier momento",
    deportable4: "Delitos de sustancias controladas (excepto posesión simple de 30g o menos de marihuana)",
    deportable5: "Delitos de armas de fuego",
    deportable6: "Violencia doméstica, acoso, abuso infantil o violación de órdenes de protección",
    deportable7: "Ciertos delitos de fraude",
    
    inadmissibleTitle: "Causales de Inadmisibilidad",
    inadmissibleDesc: "Ciertos crímenes hacen a un no ciudadano inadmisible, impidiéndole obtener visas, ajustar estatus o reingresar a EE.UU.:",
    inadmissible1: "Cualquier crimen que involucre bajeza moral (con excepciones limitadas)",
    inadmissible2: "Cualquier violación de sustancias controladas",
    inadmissible3: "Múltiples condenas criminales con sentencias agregadas de 5+ años",
    inadmissible4: "Prostitución y vicio comercializado",
    inadmissible5: "Tráfico de personas",
    inadmissible6: "Lavado de dinero",
    
    aggravatedTitle: "Delitos Graves Agravados",
    aggravatedDesc: "Los delitos graves agravados conllevan las consecuencias migratorias más severas. A pesar del nombre, muchos 'delitos graves agravados' bajo la ley de inmigración no son ni agravados ni delitos graves bajo la ley estatal. Ejemplos incluyen:",
    aggravated1: "Asesinato, violación o abuso sexual de un menor",
    aggravated2: "Tráfico de drogas (incluyendo posesión con intención)",
    aggravated3: "Tráfico de armas de fuego",
    aggravated4: "Robo o allanamiento con sentencia de 1 año o más",
    aggravated5: "Fraude o evasión fiscal que involucre más de $10,000",
    aggravated6: "Lavado de dinero sobre $10,000",
    aggravated7: "Ciertos crímenes de violencia con sentencia de 1 año o más",
    aggravated8: "Perjurio u obstrucción de justicia con sentencia de 1 año o más",
    
    aggravatedConsequences: "Las consecuencias de una condena por delito grave agravado incluyen: detención obligatoria, inelegibilidad para la mayoría de formas de alivio de deportación, prohibición permanente de reingreso e inelegibilidad para naturalización.",
    
    cimtTitle: "Crímenes que Involucran Bajeza Moral (CIMT)",
    cimtDesc: "Un CIMT es un crimen que involucra conducta inherentemente vil o depravada, contraria a las reglas aceptadas de moralidad. Ejemplos comunes incluyen:",
    cimt1: "Delitos de robo y fraude",
    cimt2: "Crímenes con intención de dañar personas o propiedad",
    cimt3: "Crímenes con elemento de deshonestidad o engaño",
    cimt4: "Ciertos delitos sexuales",
    cimt5: "Abuso conyugal",
    
    cimtException: "La 'excepción de delito menor' puede aplicar si: (1) la sentencia máxima posible es 1 año o menos, Y (2) la sentencia real impuesta fue 6 meses o menos, Y (3) la persona tiene solo una condena por CIMT.",
    
    drugTitle: "Delitos de Drogas",
    drugDesc: "Los delitos de drogas tienen consecuencias migratorias particularmente severas:",
    drug1: "Cualquier condena por sustancias controladas (excepto posesión simple de 30g o menos de marihuana) hace a una persona deportable",
    drug2: "Cualquier condena por drogas hace a una persona inadmisible",
    drug3: "El tráfico de drogas es un delito grave agravado",
    drug4: "Incluso condenas por parafernalia de drogas pueden tener consecuencias migratorias",
    drug5: "La admisión de uso de drogas (sin condena) puede desencadenar inadmisibilidad",
    
    domesticTitle: "Delitos de Violencia Doméstica",
    domesticDesc: "Los crímenes de violencia doméstica tienen consecuencias migratorias específicas:",
    domestic1: "La condena por violencia doméstica, acoso, abuso infantil, negligencia infantil o abandono infantil hace a una persona deportable",
    domestic2: "La violación de una orden de protección hace a una persona deportable",
    domestic3: "Estos delitos también pueden constituir CIMTs o delitos graves agravados",
    domestic4: "Las víctimas de violencia doméstica pueden ser elegibles para alivio bajo VAWA",
    
    strategiesTitle: "Estrategias de Defensa en Casos de Crimmigración",
    strategiesDesc: "Nuestros abogados trabajan para lograr resultados que protejan tanto su récord criminal como su estatus migratorio:",
    
    strategy1Title: "Acuerdos de Culpabilidad Seguros para Inmigración",
    strategy1Desc: "Negociamos acuerdos que evitan o minimizan consecuencias migratorias, a veces aceptando una sentencia más larga a cambio de un cargo que no desencadena deportación.",
    
    strategy2Title: "Análisis de Enfoque Categórico",
    strategy2Desc: "Analizamos si su condena realmente cumple con la definición federal de un delito deportable, ya que muchos crímenes estatales no coinciden con las definiciones federales.",
    
    strategy3Title: "Alivio Post-Condena",
    strategy3Desc: "Si ya ha sido condenado, exploramos opciones como anular condenas, modificaciones de sentencia o expungements que pueden eliminar consecuencias migratorias.",
    
    strategy4Title: "Perdones y Alivio",
    strategy4Desc: "Identificamos y perseguimos perdones disponibles y formas de alivio de deportación.",
    
    strategy5Title: "Cumplimiento de Padilla",
    strategy5Desc: "Bajo Padilla v. Kentucky, los abogados defensores criminales deben asesorar a clientes no ciudadanos sobre consecuencias migratorias. Si no fue debidamente asesorado, puede retirar su declaración.",
    
    padillaTitle: "Padilla v. Kentucky: Su Derecho a Asesoría Migratoria",
    padillaDesc: "En el caso histórico de 2010 Padilla v. Kentucky, la Corte Suprema sostuvo que los abogados defensores criminales tienen el deber constitucional de asesorar a clientes no ciudadanos sobre las consecuencias migratorias de declaraciones de culpabilidad. Si su abogado no le asesoró—o le dio asesoría incorrecta—sobre consecuencias migratorias, puede:",
    padilla1: "Retirar su declaración de culpabilidad",
    padilla2: "Anular su condena",
    padilla3: "Negociar un nuevo acuerdo de culpabilidad",
    padilla4: "Buscar alivio post-condena",
    
    postConvictionTitle: "Opciones de Alivio Post-Condena",
    postConvictionDesc: "Si ya ha sido condenado, varias opciones pueden estar disponibles para eliminar o reducir consecuencias migratorias:",
    
    postConviction1Title: "Moción para Anular (Coram Nobis)",
    postConviction1Desc: "Si su condena fue obtenida a través de violaciones constitucionales, puede anularla completamente.",
    
    postConviction2Title: "Modificación de Sentencia",
    postConviction2Desc: "Reducir una sentencia a menos de 365 días a veces puede cambiar un delito grave agravado a un delito no deportable.",
    
    postConviction3Title: "Expungement",
    postConviction3Desc: "Aunque los expungements generalmente no eliminan consecuencias migratorias, pueden ayudar en algunas circunstancias.",
    
    postConviction4Title: "Perdón del Gobernador",
    postConviction4Desc: "Un perdón completo e incondicional puede eliminar las consecuencias migratorias de algunas condenas.",
    
    reliefTitle: "Alivio de Deportación",
    reliefDesc: "Incluso si está en procedimientos de deportación debido a una condena criminal, puede ser elegible para alivio:",
    relief1: "Cancelación de Deportación para LPRs (requiere 7 años de residencia continua y 5 años como LPR)",
    relief2: "Asilo o Retención de Deportación (si teme persecución)",
    relief3: "Protección bajo la Convención Contra la Tortura (CAT)",
    relief4: "Perdón 212(c) (para condenas pre-1996)",
    relief5: "Perdón 212(h) (para ciertas causales de inadmisibilidad)",
    
    processTitle: "Nuestro Proceso de Crimmigración",
    processDesc: "Tomamos un enfoque integral para casos de crimmigración:",
    
    step1Title: "Paso 1: Revisión Integral del Caso",
    step1Desc: "Revisamos su caso criminal, historial migratorio y situación familiar para entender todas las consecuencias y opciones potenciales.",
    
    step2Title: "Paso 2: Análisis de Consecuencias Migratorias",
    step2Desc: "Analizamos las consecuencias migratorias específicas de cada cargo y disposición potencial usando el enfoque categórico.",
    
    step3Title: "Paso 3: Coordinar con Defensa Criminal",
    step3Desc: "Trabajamos con su abogado defensor criminal para desarrollar una estrategia que proteja su estatus migratorio.",
    
    step4Title: "Paso 4: Negociar Resolución Segura para Inmigración",
    step4Desc: "Negociamos acuerdos de culpabilidad o estrategias de juicio que minimicen o eviten consecuencias migratorias.",
    
    step5Title: "Paso 5: Defensa Migratoria",
    step5Desc: "Si se inician procedimientos de deportación, proporcionamos defensa agresiva en el tribunal de inmigración.",
    
    whyTitle: "¿Por Qué Elegir Amaral Law para Crimmigración?",
    whyDesc: "Los casos de crimmigración requieren abogados que entiendan tanto el derecho penal como el migratorio.",
    why1Title: "Experiencia Dual",
    why1Desc: "Nuestros abogados tienen experiencia en defensa criminal y derecho migratorio.",
    why2Title: "Análisis Pre-Declaración",
    why2Desc: "Analizamos consecuencias migratorias antes de que acepte cualquier acuerdo.",
    why3Title: "Coordinación con Abogado Criminal",
    why3Desc: "Trabajamos sin problemas con su abogado defensor criminal.",
    why4Title: "Experiencia Post-Condena",
    why4Desc: "Tenemos amplia experiencia con estrategias de alivio post-condena.",
    
    faqTitle: "Preguntas Frecuentes",
    faq1Q: "¿Afectará un delito menor mi estatus migratorio?",
    faq1A: "Sí, los delitos menores pueden tener consecuencias migratorias serias. Muchos crímenes que son delitos menores bajo la ley estatal aún pueden ser delitos graves agravados o CIMTs bajo la ley de inmigración.",
    faq2Q: "Soy titular de green card. ¿Puedo ser deportado por una condena criminal?",
    faq2A: "Sí, los residentes permanentes legales pueden ser deportados por ciertas condenas criminales, incluyendo delitos graves agravados, CIMTs, delitos de drogas y crímenes de violencia doméstica.",
    faq3Q: "Mi caso criminal fue desestimado. ¿Afectará mi inmigración?",
    faq3A: "Un caso desestimado generalmente no tendrá consecuencias migratorias, pero depende de cómo fue desestimado. Algunos programas de diversión que resultan en desestimación aún pueden considerarse condenas para propósitos de inmigración.",
    faq4Q: "¿Puedo obtener un expungement de mi condena para evitar deportación?",
    faq4A: "Desafortunadamente, los expungements generalmente no eliminan consecuencias migratorias. Sin embargo, otras formas de alivio post-condena pueden ayudar.",
    faq5Q: "No fui asesorado sobre consecuencias migratorias cuando me declaré culpable. ¿Qué puedo hacer?",
    faq5A: "Bajo Padilla v. Kentucky, puede retirar su declaración o anular su condena si su abogado no le asesoró sobre consecuencias migratorias.",
    faq6Q: "¿Debo contratar un abogado criminal o un abogado de inmigración?",
    faq6A: "Idealmente, necesita ambos—o un abogado con experiencia en ambas áreas. Nosotros proporcionamos ambos.",
    
    ctaTitle: "Proteja Su Futuro Migratorio",
    ctaDesc: "No deje que un cargo criminal destruya su vida en América. Contáctenos inmediatamente para una consulta.",
    ctaButton: "Solicitar Consulta",
    callNow: "Llamar Ahora",
    
    stat1: "Casos de Crimmigración",
    stat2: "Deportaciones Prevenidas",
    stat3: "Años de Experiencia",
    stat4: "Idiomas Hablados",
  },
  pt: {
    title: "Defesa de Crimmigração",
    subtitle: "Protegendo Seu Status de Imigração Diante de Acusações Criminais",
    intro: "A interseção do direito penal e de imigração—conhecida como 'crimmigração'—é uma das áreas jurídicas mais complexas e de alto risco. Para não cidadãos, mesmo acusações criminais menores podem ter consequências de imigração devastadoras, incluindo deportação, negação de naturalização e proibições permanentes de reentrada. Nossos advogados entendem ambos os sistemas e trabalham para proteger seu futuro de imigração enquanto defendem seu caso criminal.",
    
    whatIsTitle: "O Que É Crimmigração?",
    whatIsDesc: "Crimmigração refere-se à sobreposição entre o direito penal e o direito de imigração. Para não cidadãos—incluindo residentes permanentes legais, titulares de visto, beneficiários de DACA e indivíduos indocumentados—uma condenação criminal pode desencadear consequências de imigração severas que podem ser muito piores que as penalidades criminais em si.",
    
    consequencesTitle: "Consequências de Imigração de Condenações Criminais",
    consequencesDesc: "Condenações criminais podem desencadear várias consequências de imigração dependendo do tipo de crime:",
    
    deportableTitle: "Crimes Deportáveis",
    deportableDesc: "Certos crimes tornam um não cidadão deportável dos Estados Unidos, mesmo que tenha estado aqui legalmente por décadas:",
    deportable1: "Crimes graves agravados (conforme definido pela lei de imigração)",
    deportable2: "Crimes envolvendo torpeza moral (CIMT) cometidos dentro de 5 anos da admissão",
    deportable3: "Dois ou mais CIMTs a qualquer momento",
    deportable4: "Crimes de substâncias controladas (exceto posse simples de 30g ou menos de maconha)",
    deportable5: "Crimes de armas de fogo",
    deportable6: "Violência doméstica, perseguição, abuso infantil ou violação de ordens de proteção",
    deportable7: "Certos crimes de fraude",
    
    inadmissibleTitle: "Causas de Inadmissibilidade",
    inadmissibleDesc: "Certos crimes tornam um não cidadão inadmissível, impedindo-o de obter vistos, ajustar status ou reentrar nos EUA:",
    inadmissible1: "Qualquer crime envolvendo torpeza moral (com exceções limitadas)",
    inadmissible2: "Qualquer violação de substâncias controladas",
    inadmissible3: "Múltiplas condenações criminais com sentenças agregadas de 5+ anos",
    inadmissible4: "Prostituição e vício comercializado",
    inadmissible5: "Tráfico de pessoas",
    inadmissible6: "Lavagem de dinheiro",
    
    aggravatedTitle: "Crimes Graves Agravados",
    aggravatedDesc: "Crimes graves agravados carregam as consequências de imigração mais severas. Apesar do nome, muitos 'crimes graves agravados' sob a lei de imigração não são nem agravados nem crimes graves sob a lei estadual. Exemplos incluem:",
    aggravated1: "Assassinato, estupro ou abuso sexual de menor",
    aggravated2: "Tráfico de drogas (incluindo posse com intenção)",
    aggravated3: "Tráfico de armas de fogo",
    aggravated4: "Roubo ou arrombamento com sentença de 1 ano ou mais",
    aggravated5: "Fraude ou evasão fiscal envolvendo mais de $10,000",
    aggravated6: "Lavagem de dinheiro acima de $10,000",
    aggravated7: "Certos crimes de violência com sentença de 1 ano ou mais",
    aggravated8: "Perjúrio ou obstrução de justiça com sentença de 1 ano ou mais",
    
    aggravatedConsequences: "Consequências de uma condenação por crime grave agravado incluem: detenção obrigatória, inelegibilidade para a maioria das formas de alívio de deportação, proibição permanente de reentrada e inelegibilidade para naturalização.",
    
    cimtTitle: "Crimes Envolvendo Torpeza Moral (CIMT)",
    cimtDesc: "Um CIMT é um crime que envolve conduta inerentemente vil ou depravada, contrária às regras aceitas de moralidade. Exemplos comuns incluem:",
    cimt1: "Crimes de roubo e fraude",
    cimt2: "Crimes com intenção de prejudicar pessoas ou propriedade",
    cimt3: "Crimes com elemento de desonestidade ou engano",
    cimt4: "Certos crimes sexuais",
    cimt5: "Abuso conjugal",
    
    cimtException: "A 'exceção de crime menor' pode aplicar se: (1) a sentença máxima possível é 1 ano ou menos, E (2) a sentença real imposta foi 6 meses ou menos, E (3) a pessoa tem apenas uma condenação por CIMT.",
    
    drugTitle: "Crimes de Drogas",
    drugDesc: "Crimes de drogas têm consequências de imigração particularmente severas:",
    drug1: "Qualquer condenação por substâncias controladas torna uma pessoa deportável",
    drug2: "Qualquer condenação por drogas torna uma pessoa inadmissível",
    drug3: "Tráfico de drogas é um crime grave agravado",
    drug4: "Mesmo condenações por parafernália de drogas podem ter consequências de imigração",
    drug5: "Admissão de uso de drogas (sem condenação) pode desencadear inadmissibilidade",
    
    domesticTitle: "Crimes de Violência Doméstica",
    domesticDesc: "Crimes de violência doméstica têm consequências de imigração específicas:",
    domestic1: "Condenação por violência doméstica, perseguição, abuso infantil torna uma pessoa deportável",
    domestic2: "Violação de ordem de proteção torna uma pessoa deportável",
    domestic3: "Esses crimes também podem constituir CIMTs ou crimes graves agravados",
    domestic4: "Vítimas de violência doméstica podem ser elegíveis para alívio sob VAWA",
    
    strategiesTitle: "Estratégias de Defesa em Casos de Crimmigração",
    strategiesDesc: "Nossos advogados trabalham para alcançar resultados que protejam tanto seu registro criminal quanto seu status de imigração:",
    
    strategy1Title: "Acordos de Culpa Seguros para Imigração",
    strategy1Desc: "Negociamos acordos que evitam ou minimizam consequências de imigração.",
    
    strategy2Title: "Análise de Abordagem Categórica",
    strategy2Desc: "Analisamos se sua condenação realmente atende à definição federal de um crime deportável.",
    
    strategy3Title: "Alívio Pós-Condenação",
    strategy3Desc: "Se você já foi condenado, exploramos opções como anular condenações ou modificações de sentença.",
    
    strategy4Title: "Perdões e Alívio",
    strategy4Desc: "Identificamos e buscamos perdões disponíveis e formas de alívio de deportação.",
    
    strategy5Title: "Conformidade com Padilla",
    strategy5Desc: "Sob Padilla v. Kentucky, advogados de defesa criminal devem aconselhar clientes não cidadãos sobre consequências de imigração.",
    
    padillaTitle: "Padilla v. Kentucky: Seu Direito a Aconselhamento de Imigração",
    padillaDesc: "No caso histórico de 2010 Padilla v. Kentucky, a Suprema Corte decidiu que advogados de defesa criminal têm o dever constitucional de aconselhar clientes não cidadãos sobre consequências de imigração. Se seu advogado não o aconselhou, você pode:",
    padilla1: "Retirar sua declaração de culpa",
    padilla2: "Anular sua condenação",
    padilla3: "Negociar um novo acordo de culpa",
    padilla4: "Buscar alívio pós-condenação",
    
    postConvictionTitle: "Opções de Alívio Pós-Condenação",
    postConvictionDesc: "Se você já foi condenado, várias opções podem estar disponíveis:",
    
    postConviction1Title: "Moção para Anular (Coram Nobis)",
    postConviction1Desc: "Se sua condenação foi obtida através de violações constitucionais, você pode anulá-la.",
    
    postConviction2Title: "Modificação de Sentença",
    postConviction2Desc: "Reduzir uma sentença para menos de 365 dias às vezes pode mudar um crime grave agravado.",
    
    postConviction3Title: "Expungement",
    postConviction3Desc: "Embora expungements geralmente não eliminem consequências de imigração, podem ajudar em algumas circunstâncias.",
    
    postConviction4Title: "Perdão do Governador",
    postConviction4Desc: "Um perdão completo e incondicional pode eliminar consequências de imigração de algumas condenações.",
    
    reliefTitle: "Alívio de Deportação",
    reliefDesc: "Mesmo se você está em procedimentos de deportação, pode ser elegível para alívio:",
    relief1: "Cancelamento de Deportação para LPRs",
    relief2: "Asilo ou Retenção de Deportação",
    relief3: "Proteção sob a Convenção Contra a Tortura (CAT)",
    relief4: "Perdão 212(c) (para condenações pré-1996)",
    relief5: "Perdão 212(h) (para certas causas de inadmissibilidade)",
    
    processTitle: "Nosso Processo de Crimmigração",
    processDesc: "Tomamos uma abordagem abrangente para casos de crimmigração:",
    
    step1Title: "Passo 1: Revisão Abrangente do Caso",
    step1Desc: "Revisamos seu caso criminal, histórico de imigração e situação familiar.",
    
    step2Title: "Passo 2: Análise de Consequências de Imigração",
    step2Desc: "Analisamos as consequências de imigração específicas de cada acusação potencial.",
    
    step3Title: "Passo 3: Coordenar com Defesa Criminal",
    step3Desc: "Trabalhamos com seu advogado de defesa criminal para desenvolver uma estratégia.",
    
    step4Title: "Passo 4: Negociar Resolução Segura para Imigração",
    step4Desc: "Negociamos acordos de culpa que minimizem consequências de imigração.",
    
    step5Title: "Passo 5: Defesa de Imigração",
    step5Desc: "Se procedimentos de deportação forem iniciados, fornecemos defesa agressiva.",
    
    whyTitle: "Por Que Escolher Amaral Law para Crimmigração?",
    whyDesc: "Casos de crimmigração requerem advogados que entendam tanto direito penal quanto de imigração.",
    why1Title: "Experiência Dual",
    why1Desc: "Nossos advogados têm experiência em defesa criminal e direito de imigração.",
    why2Title: "Análise Pré-Declaração",
    why2Desc: "Analisamos consequências de imigração antes de você aceitar qualquer acordo.",
    why3Title: "Coordenação com Advogado Criminal",
    why3Desc: "Trabalhamos perfeitamente com seu advogado de defesa criminal.",
    why4Title: "Experiência Pós-Condenação",
    why4Desc: "Temos ampla experiência com estratégias de alívio pós-condenação.",
    
    faqTitle: "Perguntas Frequentes",
    faq1Q: "Um crime menor afetará meu status de imigração?",
    faq1A: "Sim, crimes menores podem ter consequências de imigração sérias. Muitos crimes que são crimes menores sob a lei estadual ainda podem ser crimes graves agravados ou CIMTs sob a lei de imigração.",
    faq2Q: "Sou titular de green card. Posso ser deportado por uma condenação criminal?",
    faq2A: "Sim, residentes permanentes legais podem ser deportados por certas condenações criminais.",
    faq3Q: "Meu caso criminal foi arquivado. Afetará minha imigração?",
    faq3A: "Um caso arquivado geralmente não terá consequências de imigração, mas depende de como foi arquivado.",
    faq4Q: "Posso obter um expungement da minha condenação para evitar deportação?",
    faq4A: "Infelizmente, expungements geralmente não eliminam consequências de imigração.",
    faq5Q: "Não fui aconselhado sobre consequências de imigração quando me declarei culpado. O que posso fazer?",
    faq5A: "Sob Padilla v. Kentucky, você pode retirar sua declaração ou anular sua condenação.",
    faq6Q: "Devo contratar um advogado criminal ou um advogado de imigração?",
    faq6A: "Idealmente, você precisa de ambos—ou um advogado com experiência em ambas as áreas. Nós fornecemos ambos.",
    
    ctaTitle: "Proteja Seu Futuro de Imigração",
    ctaDesc: "Não deixe uma acusação criminal destruir sua vida na América. Contate-nos imediatamente.",
    ctaButton: "Solicitar Consulta",
    callNow: "Ligar Agora",
    
    stat1: "Casos de Crimmigração",
    stat2: "Deportações Prevenidas",
    stat3: "Anos de Experiência",
    stat4: "Idiomas Falados",
  },
};

export default function Crimmigration() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${t.title} | Amaral Law`}
        description={t.intro.substring(0, 160)}
        keywords="crimmigration, criminal immigration, deportation defense, aggravated felony, CIMT, Padilla"
        canonicalUrl="/services/crimmigration"
      />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1920&q=80)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Scale className="h-4 w-4" />
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
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">90%</div>
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

      {/* What Is Crimmigration */}
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

      {/* Deportable Offenses */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.consequencesTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t.consequencesDesc}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-red-200 bg-red-50/50">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <AlertOctagon className="h-8 w-8 text-red-600" />
                    <h3 className="text-xl font-serif font-bold text-foreground">{t.deportableTitle}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{t.deportableDesc}</p>
                  <ul className="space-y-2">
                    {[t.deportable1, t.deportable2, t.deportable3, t.deportable4, t.deportable5, t.deportable6, t.deportable7].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-amber-200 bg-amber-50/50">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Lock className="h-8 w-8 text-amber-600" />
                    <h3 className="text-xl font-serif font-bold text-foreground">{t.inadmissibleTitle}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{t.inadmissibleDesc}</p>
                  <ul className="space-y-2">
                    {[t.inadmissible1, t.inadmissible2, t.inadmissible3, t.inadmissible4, t.inadmissible5, t.inadmissible6].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Lock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Aggravated Felonies */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertOctagon className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                {t.aggravatedTitle}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t.aggravatedDesc}
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[t.aggravated1, t.aggravated2, t.aggravated3, t.aggravated4, t.aggravated5, t.aggravated6, t.aggravated7, t.aggravated8].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-background rounded-lg border">
                  <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>
            <Card className="border-l-4 border-l-red-500 bg-red-50">
              <CardContent className="p-6">
                <p className="text-muted-foreground font-medium">{t.aggravatedConsequences}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CIMT */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.cimtTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t.cimtDesc}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {[t.cimt1, t.cimt2, t.cimt3, t.cimt4, t.cimt5].map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-2">
                      <Scale className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{item}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="border-l-4 border-l-green-500 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">{t.cimtException}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Drug Offenses */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.drugTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t.drugDesc}
            </p>
            <div className="space-y-4">
              {[t.drug1, t.drug2, t.drug3, t.drug4, t.drug5].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-background rounded-lg border">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Domestic Violence */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.domesticTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t.domesticDesc}
            </p>
            <div className="space-y-4">
              {[t.domestic1, t.domestic2, t.domestic3, t.domestic4].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <Users className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Defense Strategies */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.strategiesTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t.strategiesDesc}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: t.strategy1Title, desc: t.strategy1Desc },
                { title: t.strategy2Title, desc: t.strategy2Desc },
                { title: t.strategy3Title, desc: t.strategy3Desc },
                { title: t.strategy4Title, desc: t.strategy4Desc },
                { title: t.strategy5Title, desc: t.strategy5Desc },
              ].map((item, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
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

      {/* Padilla v. Kentucky */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Gavel className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                {t.padillaTitle}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t.padillaDesc}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[t.padilla1, t.padilla2, t.padilla3, t.padilla4].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Post-Conviction Relief */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.postConvictionTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {t.postConvictionDesc}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: t.postConviction1Title, desc: t.postConviction1Desc },
                { title: t.postConviction2Title, desc: t.postConviction2Desc },
                { title: t.postConviction3Title, desc: t.postConviction3Desc },
                { title: t.postConviction4Title, desc: t.postConviction4Desc },
              ].map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                        <Unlock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Relief from Deportation */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              {t.reliefTitle}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t.reliefDesc}
            </p>
            <div className="space-y-4">
              {[t.relief1, t.relief2, t.relief3, t.relief4, t.relief5].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <Shield className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
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
                { title: t.step1Title, desc: t.step1Desc, icon: FileText },
                { title: t.step2Title, desc: t.step2Desc, icon: Scale },
                { title: t.step3Title, desc: t.step3Desc, icon: Users },
                { title: t.step4Title, desc: t.step4Desc, icon: Gavel },
                { title: t.step5Title, desc: t.step5Desc, icon: Shield },
              ].map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    {index < 4 && <div className="w-0.5 h-full bg-primary/20 mt-2" />}
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
