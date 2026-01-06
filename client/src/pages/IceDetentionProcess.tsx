import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";
import { 
  AlertTriangle, 
  Shield, 
  FileText, 
  Clock, 
  Building2, 
  Scale, 
  Users, 
  Phone,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Fingerprint,
  MapPin,
  Gavel,
  AlertCircle,
  Home,
  Briefcase,
  HandMetal,
  ChevronRight
} from "lucide-react";

const translations = {
  en: {
    title: "ICE Detention Process",
    subtitle: "Complete Guide: From Arrest to Court",
    description: "Understanding what happens when someone is detained by ICE is crucial for families and individuals navigating the immigration system. This comprehensive guide explains each phase of the detention process.",
    callNow: "Need Immediate Help? Call",
    
    // Phase 1
    phase1Title: "Phase 1: The Arrest",
    phase1Time: "Day 0",
    howArrestsOccur: "How ICE Arrests Occur",
    targetedEnforcement: "Targeted Enforcement",
    targetedEnforcementDesc: "ICE has a specific warrant for an individual based on prior deportation orders, criminal history, or immigration violations.",
    collateralArrests: "Collateral Arrests",
    collateralArrestsDesc: "Person encountered during an operation targeting someone else who is also found to be in violation of immigration law.",
    jailTransfers: "Jail Transfers",
    jailTransfersDesc: "Local law enforcement notifies ICE of a non-citizen in custody through 287(g) agreements or ICE detainers.",
    workplaceRaids: "Workplace Raids",
    workplaceRaidsDesc: "ICE conducts enforcement at businesses suspected of employing undocumented workers.",
    homeVisits: "Home Visits",
    homeVisitsDesc: "ICE officers arrive at a residence. They cannot enter without consent or a judicial warrant signed by a judge.",
    
    yourRights: "Your Rights During Arrest",
    rightSilent: "Right to remain silent",
    rightSilentDesc: "You don't have to answer questions about your immigration status",
    rightRefuse: "Right to refuse home entry",
    rightRefuseDesc: "ICE administrative warrants do NOT authorize home entry without consent",
    rightAttorney: "Right to contact an attorney",
    rightAttorneyDesc: "Ask for a lawyer before answering any questions",
    rightConsulate: "Right to contact your consulate",
    rightConsulateDesc: "Foreign nationals can contact their country's consulate",
    
    // Phase 2
    phase2Title: "Phase 2: Initial Processing",
    phase2Time: "0-48 Hours",
    bookingTitle: "Booking and Documentation",
    biometrics: "Biometric Collection",
    biometricsDesc: "Fingerprints, photographs, and biographical information are collected and entered into federal databases.",
    backgroundCheck: "Criminal Background Check",
    backgroundCheckDesc: "FBI database search for any criminal history in the United States.",
    immigrationReview: "Immigration History Review",
    immigrationReviewDesc: "Check for prior deportations, visa overstays, or pending immigration cases.",
    medicalScreening: "Medical Screening",
    medicalScreeningDesc: "Basic health assessment to identify immediate medical needs.",
    propertyInventory: "Property Inventory",
    propertyInventoryDesc: "Personal belongings are catalogued and stored until release or deportation.",
    
    aNumberTitle: "Assignment of Alien Number (A-Number)",
    aNumberDesc: "Every person in immigration proceedings receives a unique 9-digit A-Number (e.g., A123-456-789). This number is essential for tracking the case and locating the detained person. Family members need this number to find their loved one using the ICE detainee locator.",
    aNumberImportant: "The A-Number is the most important piece of information for families",
    
    // Phase 3
    phase3Title: "Phase 3: Custody Determination",
    phase3Time: "24-72 Hours",
    custodyDecision: "ICE Makes a Custody Decision",
    releaseOR: "Release on Own Recognizance (OR)",
    releaseORDesc: "Rare, typically for low-risk individuals with very strong community ties and no criminal history.",
    releaseBond: "Release on Bond",
    releaseBondDesc: "ICE sets a bond amount. Minimum is $1,500, but typical bonds range from $5,000 to $25,000 or higher.",
    releaseATD: "Alternatives to Detention (ATD)",
    releaseATDDesc: "Release with GPS ankle monitor, regular check-ins at ICE office, or phone app monitoring.",
    continuedDetention: "Continued Detention",
    continuedDetentionDesc: "Person remains in ICE custody pending resolution of their immigration case.",
    
    factorsConsidered: "Factors ICE Considers",
    flightRisk: "Flight Risk",
    flightRiskDesc: "Ties to community, family, employment, property ownership",
    dangerCommunity: "Danger to Community",
    dangerCommunityDesc: "Criminal history, nature and severity of offenses",
    immigrationHistory: "Immigration History",
    immigrationHistoryDesc: "Prior deportations, visa violations, failure to appear",
    mannerEntry: "Manner of Entry",
    mannerEntryDesc: "Legal entry vs. entry without inspection",
    timeInUS: "Time in U.S.",
    timeInUSDesc: "Length of continuous presence in the United States",
    
    mandatoryDetention: "Mandatory Detention Categories",
    mandatoryDetentionDesc: "Some individuals are NOT eligible for bond and must remain detained:",
    mandatoryCriminal: "Certain criminal convictions (aggravated felonies, controlled substances, firearms, crimes of moral turpitude)",
    mandatoryArriving: "Arriving aliens (caught at port of entry without valid documents)",
    mandatoryTerrorism: "Certain terrorism-related grounds",
    mandatoryPrior: "Prior deportation orders (reinstatement of removal)",
    
    // Phase 4
    phase4Title: "Phase 4: Notice to Appear (NTA)",
    phase4Time: "1-10 Days",
    whatIsNTA: "What is a Notice to Appear?",
    ntaDescription: "The Notice to Appear (Form I-862) is the charging document that initiates removal proceedings in Immigration Court. It is NOT a court date—it's the formal accusation that the government believes you are removable from the United States.",
    
    ntaContents: "Contents of the NTA",
    ntaPersonalInfo: "Personal Information",
    ntaPersonalInfoDesc: "Name, A-Number, date of birth, country of citizenship",
    ntaAllegations: "Factual Allegations",
    ntaAllegationsDesc: "Numbered statements about the person's immigration history (e.g., 'You entered the United States on or about [date]')",
    ntaCharges: "Charges of Removability",
    ntaChargesDesc: "The specific sections of the Immigration and Nationality Act (INA) that ICE alleges make the person deportable",
    ntaHearing: "Notice of Hearing",
    ntaHearingDesc: "States that proceedings will be held before an Immigration Judge (date/time may initially say 'TBD')",
    
    commonCharges: "Common Charges on NTAs",
    charge212a6: "INA § 212(a)(6)(A)(i)",
    charge212a6Desc: "Present without admission or parole (entered without inspection)",
    charge212a7: "INA § 212(a)(7)(A)(i)(I)",
    charge212a7Desc: "No valid immigrant visa or entry document",
    charge237a1b: "INA § 237(a)(1)(B)",
    charge237a1bDesc: "Overstayed visa (remained longer than authorized)",
    charge237a1c: "INA § 237(a)(1)(C)(i)",
    charge237a1cDesc: "Violated conditions of nonimmigrant status",
    charge237a2: "INA § 237(a)(2)",
    charge237a2Desc: "Criminal grounds of deportability",
    
    ntaService: "Service of the NTA",
    ntaServiceDesc: "ICE must personally serve the NTA on the individual. The person signs acknowledging receipt (or ICE notes refusal to sign). A copy is filed with the Immigration Court, which officially begins proceedings. The court then sends a hearing notice with the actual date, time, and location.",
    
    // Phase 5
    phase5Title: "Phase 5: Transfer to Detention Facility",
    phase5Time: "1-7 Days",
    facilityTypes: "Types of Detention Facilities",
    processingCenters: "ICE Processing Centers",
    processingCentersDesc: "Short-term holding facilities, usually 24-72 hours maximum",
    serviceCenters: "Service Processing Centers (SPCs)",
    serviceCentersDesc: "ICE-owned and operated facilities for longer-term detention",
    contractFacilities: "Contract Detention Facilities (CDFs)",
    contractFacilitiesDesc: "Privately operated by companies like GEO Group and CoreCivic",
    igsaFacilities: "IGSA Facilities",
    igsaFacilitiesDesc: "County jails with Intergovernmental Service Agreements with ICE",
    
    atFacility: "What Happens at the Facility",
    facilityMedical: "Full medical examination and health assessment",
    facilityClassification: "Classification assessment to determine security level",
    facilityHousing: "Housing assignment based on classification",
    facilityOrientation: "Orientation on facility rules and procedures",
    facilityLegal: "Access to legal resources (law library, legal aid organization lists)",
    facilityPhone: "Phone access to call family members and attorneys",
    
    // Phase 6
    phase6Title: "Phase 6: First Court Appearance",
    phase6Time: "2-6 Weeks After NTA Filed",
    masterCalendar: "Master Calendar Hearing",
    masterCalendarDesc: "The first court appearance is called a Master Calendar Hearing. This is a short hearing, typically lasting only 10-15 minutes, where multiple cases are scheduled at the same time.",
    
    hearingPurpose: "Purpose of the Master Calendar Hearing",
    purposeIdentity: "Verify identity and confirm receipt of NTA",
    purposeRights: "Advise of rights (right to attorney at own expense, right to present evidence, right to appeal)",
    purposePleadings: "Take pleadings (admit or deny factual allegations, concede or contest charges of removability)",
    purposeRelief: "Identify potential forms of relief from removal",
    purposeSchedule: "Set future hearing dates",
    
    possibleOutcomes: "Possible Outcomes",
    outcomeContinuance: "Request for Continuance",
    outcomeContinuanceDesc: "To find an attorney or gather evidence",
    outcomeBond: "Bond Hearing Request",
    outcomeBondDesc: "If eligible, ask the judge to set or lower bond",
    outcomeRelief: "Designation of Relief",
    outcomeReliefDesc: "Identify what forms of relief you'll pursue (asylum, cancellation of removal, etc.)",
    outcomeIndividual: "Individual Hearing Scheduled",
    outcomeIndividualDesc: "The full merits hearing where your case will be decided",
    
    // Phase 7
    phase7Title: "Phase 7: Bond Hearing",
    phase7Time: "1-3 Weeks After Request",
    bondHearingTitle: "Immigration Bond Hearing",
    bondHearingDesc: "A bond hearing is a separate proceeding where an Immigration Judge determines whether you should be released from detention and, if so, what bond amount is appropriate.",
    
    whoCanRequest: "Who Can Request a Bond Hearing",
    whoCanRequestDesc: "Anyone NOT subject to mandatory detention can request a bond hearing. It must be requested—it is not automatic. Your attorney can file a motion for bond hearing, or you can request one at your master calendar hearing.",
    
    guerraFactors: "Matter of Guerra Factors",
    guerraFactorsDesc: "The Immigration Judge will consider these factors when deciding whether to grant bond:",
    guerraAddress: "Fixed Address",
    guerraAddressDesc: "Whether the person has a stable place to live",
    guerraResidence: "Length of Residence",
    guerraResidenceDesc: "How long they have lived in the community",
    guerraFamily: "Family Ties",
    guerraFamilyDesc: "Spouse, children, parents, or other relatives in the U.S.",
    guerraEmployment: "Employment History",
    guerraEmploymentDesc: "Stable job history and current employment prospects",
    guerraCourt: "Court Appearance Record",
    guerraCourtDesc: "History of appearing for court dates and immigration appointments",
    guerraCriminal: "Criminal Record",
    guerraCriminalDesc: "Nature and severity of any criminal history",
    guerraImmigration: "Immigration Violations",
    guerraImmigrationDesc: "History of immigration law violations",
    guerraFlee: "Attempts to Flee",
    guerraFleeDesc: "Any history of evading immigration officers",
    
    bondOutcomes: "Bond Hearing Outcomes",
    bondGranted: "Bond Granted",
    bondGrantedDesc: "Judge sets a bond amount that must be paid in full for release",
    bondDenied: "Bond Denied",
    bondDeniedDesc: "Person remains detained pending case resolution",
    bondOR: "Release on Recognizance",
    bondORDesc: "Rare—release without payment required",
    
    // Timeline
    timelineTitle: "Timeline Summary",
    stage: "Stage",
    typicalTimeframe: "Typical Timeframe",
    arrestBooking: "Arrest to booking",
    initialProcessing: "Initial processing",
    custodyDetermination: "Custody determination",
    ntaIssued: "NTA issued and served",
    transferFacility: "Transfer to detention facility",
    ntaFiled: "NTA filed with court",
    firstHearing: "First master calendar hearing",
    bondHearing: "Bond hearing (if requested)",
    
    // Family Section
    familyTitle: "What Family Members Should Do Immediately",
    familyStep1: "Get the A-Number",
    familyStep1Desc: "This 9-digit number is essential for everything. Ask the detained person or check any paperwork they received.",
    familyStep2: "Use ICE Detainee Locator",
    familyStep2Desc: "Visit locator.ice.gov to find where your loved one is being held.",
    familyStep3: "Contact an Immigration Attorney",
    familyStep3Desc: "Time-sensitive deadlines apply. Many forms of relief have strict filing requirements.",
    familyStep4: "Gather Documents",
    familyStep4Desc: "ID, proof of relationship, financial documents for bond, evidence of community ties.",
    familyStep5: "Do NOT Sign Anything",
    familyStep5Desc: "Never sign documents on behalf of the detained person without attorney advice.",
    familyStep6: "Deposit Money for Calls",
    familyStep6Desc: "Put money into the commissary account so they can make phone calls.",
    
    // CTA
    ctaTitle: "Need Help with a Detention Case?",
    ctaDescription: "Our experienced immigration attorneys are available 24/7 to help families navigate the detention process. We can file bond motions, represent your loved one in court, and fight for their release.",
    ctaButton: "Get Immediate Help",
    ctaPhone: "Call 24/7:",
    
    // Navigation
    backToResources: "Back to Resources",
    relatedGuides: "Related Guides",
    detentionGuide: "ICE Detention Centers",
    sponsorGuide: "Sponsor Guide",
    bondChecklist: "Bond Document Checklist"
  },
  es: {
    title: "Proceso de Detención de ICE",
    subtitle: "Guía Completa: Desde el Arresto hasta la Corte",
    description: "Entender lo que sucede cuando alguien es detenido por ICE es crucial para las familias y personas que navegan el sistema de inmigración. Esta guía completa explica cada fase del proceso de detención.",
    callNow: "¿Necesita Ayuda Inmediata? Llame",
    
    phase1Title: "Fase 1: El Arresto",
    phase1Time: "Día 0",
    howArrestsOccur: "Cómo Ocurren los Arrestos de ICE",
    targetedEnforcement: "Operativo Dirigido",
    targetedEnforcementDesc: "ICE tiene una orden específica para un individuo basada en órdenes de deportación previas, historial criminal o violaciones de inmigración.",
    collateralArrests: "Arrestos Colaterales",
    collateralArrestsDesc: "Persona encontrada durante una operación dirigida a otra persona que también se encuentra en violación de la ley de inmigración.",
    jailTransfers: "Transferencias de Cárcel",
    jailTransfersDesc: "Las autoridades locales notifican a ICE de un no ciudadano bajo custodia a través de acuerdos 287(g) o detenciones de ICE.",
    workplaceRaids: "Redadas en Lugares de Trabajo",
    workplaceRaidsDesc: "ICE realiza operativos en negocios sospechosos de emplear trabajadores indocumentados.",
    homeVisits: "Visitas al Hogar",
    homeVisitsDesc: "Oficiales de ICE llegan a una residencia. No pueden entrar sin consentimiento o una orden judicial firmada por un juez.",
    
    yourRights: "Sus Derechos Durante el Arresto",
    rightSilent: "Derecho a permanecer en silencio",
    rightSilentDesc: "No tiene que responder preguntas sobre su estatus migratorio",
    rightRefuse: "Derecho a negar entrada al hogar",
    rightRefuseDesc: "Las órdenes administrativas de ICE NO autorizan entrada al hogar sin consentimiento",
    rightAttorney: "Derecho a contactar un abogado",
    rightAttorneyDesc: "Pida un abogado antes de responder cualquier pregunta",
    rightConsulate: "Derecho a contactar su consulado",
    rightConsulateDesc: "Los ciudadanos extranjeros pueden contactar el consulado de su país",
    
    phase2Title: "Fase 2: Procesamiento Inicial",
    phase2Time: "0-48 Horas",
    bookingTitle: "Registro y Documentación",
    biometrics: "Recolección Biométrica",
    biometricsDesc: "Se recolectan huellas digitales, fotografías e información biográfica y se ingresan a bases de datos federales.",
    backgroundCheck: "Verificación de Antecedentes Criminales",
    backgroundCheckDesc: "Búsqueda en la base de datos del FBI para cualquier historial criminal en Estados Unidos.",
    immigrationReview: "Revisión del Historial Migratorio",
    immigrationReviewDesc: "Verificación de deportaciones previas, exceso de estadía de visa o casos de inmigración pendientes.",
    medicalScreening: "Evaluación Médica",
    medicalScreeningDesc: "Evaluación básica de salud para identificar necesidades médicas inmediatas.",
    propertyInventory: "Inventario de Pertenencias",
    propertyInventoryDesc: "Las pertenencias personales se catalogan y almacenan hasta la liberación o deportación.",
    
    aNumberTitle: "Asignación del Número de Extranjero (A-Number)",
    aNumberDesc: "Cada persona en procedimientos de inmigración recibe un número único de 9 dígitos (ej., A123-456-789). Este número es esencial para rastrear el caso y localizar a la persona detenida. Los familiares necesitan este número para encontrar a su ser querido usando el localizador de detenidos de ICE.",
    aNumberImportant: "El A-Number es la información más importante para las familias",
    
    phase3Title: "Fase 3: Determinación de Custodia",
    phase3Time: "24-72 Horas",
    custodyDecision: "ICE Toma una Decisión de Custodia",
    releaseOR: "Liberación Bajo Palabra (OR)",
    releaseORDesc: "Raro, típicamente para individuos de bajo riesgo con lazos comunitarios muy fuertes y sin historial criminal.",
    releaseBond: "Liberación Bajo Fianza",
    releaseBondDesc: "ICE establece un monto de fianza. El mínimo es $1,500, pero las fianzas típicas van de $5,000 a $25,000 o más.",
    releaseATD: "Alternativas a la Detención (ATD)",
    releaseATDDesc: "Liberación con monitor de tobillo GPS, presentaciones regulares en la oficina de ICE, o monitoreo por aplicación telefónica.",
    continuedDetention: "Detención Continuada",
    continuedDetentionDesc: "La persona permanece bajo custodia de ICE pendiente la resolución de su caso de inmigración.",
    
    factorsConsidered: "Factores que ICE Considera",
    flightRisk: "Riesgo de Fuga",
    flightRiskDesc: "Lazos con la comunidad, familia, empleo, propiedad",
    dangerCommunity: "Peligro para la Comunidad",
    dangerCommunityDesc: "Historial criminal, naturaleza y severidad de los delitos",
    immigrationHistory: "Historial Migratorio",
    immigrationHistoryDesc: "Deportaciones previas, violaciones de visa, falta de comparecencia",
    mannerEntry: "Forma de Entrada",
    mannerEntryDesc: "Entrada legal vs. entrada sin inspección",
    timeInUS: "Tiempo en EE.UU.",
    timeInUSDesc: "Duración de presencia continua en Estados Unidos",
    
    mandatoryDetention: "Categorías de Detención Obligatoria",
    mandatoryDetentionDesc: "Algunas personas NO son elegibles para fianza y deben permanecer detenidas:",
    mandatoryCriminal: "Ciertas condenas criminales (delitos graves agravados, sustancias controladas, armas de fuego, delitos de bajeza moral)",
    mandatoryArriving: "Extranjeros llegando (capturados en puerto de entrada sin documentos válidos)",
    mandatoryTerrorism: "Ciertos motivos relacionados con terrorismo",
    mandatoryPrior: "Órdenes de deportación previas (restablecimiento de remoción)",
    
    phase4Title: "Fase 4: Notificación de Comparecencia (NTA)",
    phase4Time: "1-10 Días",
    whatIsNTA: "¿Qué es una Notificación de Comparecencia?",
    ntaDescription: "La Notificación de Comparecencia (Formulario I-862) es el documento de cargos que inicia los procedimientos de remoción en la Corte de Inmigración. NO es una fecha de corte—es la acusación formal de que el gobierno cree que usted es removible de Estados Unidos.",
    
    ntaContents: "Contenido del NTA",
    ntaPersonalInfo: "Información Personal",
    ntaPersonalInfoDesc: "Nombre, A-Number, fecha de nacimiento, país de ciudadanía",
    ntaAllegations: "Alegaciones de Hechos",
    ntaAllegationsDesc: "Declaraciones numeradas sobre el historial migratorio de la persona (ej., 'Usted entró a Estados Unidos en o alrededor de [fecha]')",
    ntaCharges: "Cargos de Removibilidad",
    ntaChargesDesc: "Las secciones específicas de la Ley de Inmigración y Nacionalidad (INA) que ICE alega hacen a la persona deportable",
    ntaHearing: "Aviso de Audiencia",
    ntaHearingDesc: "Indica que los procedimientos se llevarán a cabo ante un Juez de Inmigración (fecha/hora puede decir inicialmente 'Por Determinar')",
    
    commonCharges: "Cargos Comunes en NTAs",
    charge212a6: "INA § 212(a)(6)(A)(i)",
    charge212a6Desc: "Presente sin admisión o libertad condicional (entró sin inspección)",
    charge212a7: "INA § 212(a)(7)(A)(i)(I)",
    charge212a7Desc: "Sin visa de inmigrante válida o documento de entrada",
    charge237a1b: "INA § 237(a)(1)(B)",
    charge237a1bDesc: "Excedió estadía de visa (permaneció más tiempo del autorizado)",
    charge237a1c: "INA § 237(a)(1)(C)(i)",
    charge237a1cDesc: "Violó condiciones del estatus de no inmigrante",
    charge237a2: "INA § 237(a)(2)",
    charge237a2Desc: "Motivos criminales de deportabilidad",
    
    ntaService: "Entrega del NTA",
    ntaServiceDesc: "ICE debe entregar personalmente el NTA al individuo. La persona firma acusando recibo (o ICE nota la negativa a firmar). Una copia se presenta ante la Corte de Inmigración, lo cual oficialmente inicia los procedimientos. La corte luego envía un aviso de audiencia con la fecha, hora y ubicación reales.",
    
    phase5Title: "Fase 5: Transferencia al Centro de Detención",
    phase5Time: "1-7 Días",
    facilityTypes: "Tipos de Centros de Detención",
    processingCenters: "Centros de Procesamiento de ICE",
    processingCentersDesc: "Instalaciones de retención a corto plazo, usualmente máximo 24-72 horas",
    serviceCenters: "Centros de Procesamiento de Servicio (SPCs)",
    serviceCentersDesc: "Instalaciones propiedad de ICE y operadas por ICE para detención a largo plazo",
    contractFacilities: "Centros de Detención por Contrato (CDFs)",
    contractFacilitiesDesc: "Operados privadamente por compañías como GEO Group y CoreCivic",
    igsaFacilities: "Instalaciones IGSA",
    igsaFacilitiesDesc: "Cárceles del condado con Acuerdos de Servicio Intergubernamental con ICE",
    
    atFacility: "Qué Sucede en el Centro",
    facilityMedical: "Examen médico completo y evaluación de salud",
    facilityClassification: "Evaluación de clasificación para determinar nivel de seguridad",
    facilityHousing: "Asignación de vivienda basada en clasificación",
    facilityOrientation: "Orientación sobre reglas y procedimientos del centro",
    facilityLegal: "Acceso a recursos legales (biblioteca legal, listas de organizaciones de ayuda legal)",
    facilityPhone: "Acceso telefónico para llamar a familiares y abogados",
    
    phase6Title: "Fase 6: Primera Comparecencia en Corte",
    phase6Time: "2-6 Semanas Después de Presentar NTA",
    masterCalendar: "Audiencia de Calendario Maestro",
    masterCalendarDesc: "La primera comparecencia en corte se llama Audiencia de Calendario Maestro. Es una audiencia corta, típicamente de solo 10-15 minutos, donde múltiples casos se programan al mismo tiempo.",
    
    hearingPurpose: "Propósito de la Audiencia de Calendario Maestro",
    purposeIdentity: "Verificar identidad y confirmar recibo del NTA",
    purposeRights: "Informar sobre derechos (derecho a abogado a su propio costo, derecho a presentar evidencia, derecho a apelar)",
    purposePleadings: "Tomar declaraciones (admitir o negar alegaciones de hechos, conceder o contestar cargos de removibilidad)",
    purposeRelief: "Identificar formas potenciales de alivio de remoción",
    purposeSchedule: "Establecer fechas de audiencias futuras",
    
    possibleOutcomes: "Resultados Posibles",
    outcomeContinuance: "Solicitud de Continuación",
    outcomeContinuanceDesc: "Para encontrar un abogado o reunir evidencia",
    outcomeBond: "Solicitud de Audiencia de Fianza",
    outcomeBondDesc: "Si es elegible, pedir al juez que establezca o reduzca la fianza",
    outcomeRelief: "Designación de Alivio",
    outcomeReliefDesc: "Identificar qué formas de alivio buscará (asilo, cancelación de remoción, etc.)",
    outcomeIndividual: "Audiencia Individual Programada",
    outcomeIndividualDesc: "La audiencia completa de méritos donde se decidirá su caso",
    
    phase7Title: "Fase 7: Audiencia de Fianza",
    phase7Time: "1-3 Semanas Después de la Solicitud",
    bondHearingTitle: "Audiencia de Fianza de Inmigración",
    bondHearingDesc: "Una audiencia de fianza es un procedimiento separado donde un Juez de Inmigración determina si usted debe ser liberado de detención y, de ser así, qué monto de fianza es apropiado.",
    
    whoCanRequest: "Quién Puede Solicitar una Audiencia de Fianza",
    whoCanRequestDesc: "Cualquier persona que NO esté sujeta a detención obligatoria puede solicitar una audiencia de fianza. Debe solicitarse—no es automática. Su abogado puede presentar una moción para audiencia de fianza, o puede solicitarla en su audiencia de calendario maestro.",
    
    guerraFactors: "Factores de Matter of Guerra",
    guerraFactorsDesc: "El Juez de Inmigración considerará estos factores al decidir si otorgar fianza:",
    guerraAddress: "Dirección Fija",
    guerraAddressDesc: "Si la persona tiene un lugar estable donde vivir",
    guerraResidence: "Duración de Residencia",
    guerraResidenceDesc: "Cuánto tiempo ha vivido en la comunidad",
    guerraFamily: "Lazos Familiares",
    guerraFamilyDesc: "Cónyuge, hijos, padres u otros familiares en EE.UU.",
    guerraEmployment: "Historial de Empleo",
    guerraEmploymentDesc: "Historial laboral estable y prospectos de empleo actuales",
    guerraCourt: "Registro de Comparecencia en Corte",
    guerraCourtDesc: "Historial de presentarse a citas de corte e inmigración",
    guerraCriminal: "Antecedentes Penales",
    guerraCriminalDesc: "Naturaleza y severidad de cualquier historial criminal",
    guerraImmigration: "Violaciones de Inmigración",
    guerraImmigrationDesc: "Historial de violaciones a la ley de inmigración",
    guerraFlee: "Intentos de Huir",
    guerraFleeDesc: "Cualquier historial de evadir oficiales de inmigración",
    
    bondOutcomes: "Resultados de la Audiencia de Fianza",
    bondGranted: "Fianza Otorgada",
    bondGrantedDesc: "El juez establece un monto de fianza que debe pagarse en su totalidad para la liberación",
    bondDenied: "Fianza Denegada",
    bondDeniedDesc: "La persona permanece detenida pendiente la resolución del caso",
    bondOR: "Liberación Bajo Palabra",
    bondORDesc: "Raro—liberación sin pago requerido",
    
    timelineTitle: "Resumen de Cronología",
    stage: "Etapa",
    typicalTimeframe: "Plazo Típico",
    arrestBooking: "Arresto a registro",
    initialProcessing: "Procesamiento inicial",
    custodyDetermination: "Determinación de custodia",
    ntaIssued: "NTA emitido y entregado",
    transferFacility: "Transferencia a centro de detención",
    ntaFiled: "NTA presentado ante la corte",
    firstHearing: "Primera audiencia de calendario maestro",
    bondHearing: "Audiencia de fianza (si se solicita)",
    
    familyTitle: "Qué Deben Hacer los Familiares Inmediatamente",
    familyStep1: "Obtener el A-Number",
    familyStep1Desc: "Este número de 9 dígitos es esencial para todo. Pregunte a la persona detenida o revise cualquier documentación que haya recibido.",
    familyStep2: "Usar el Localizador de Detenidos de ICE",
    familyStep2Desc: "Visite locator.ice.gov para encontrar dónde está detenido su ser querido.",
    familyStep3: "Contactar un Abogado de Inmigración",
    familyStep3Desc: "Aplican plazos sensibles al tiempo. Muchas formas de alivio tienen requisitos estrictos de presentación.",
    familyStep4: "Reunir Documentos",
    familyStep4Desc: "Identificación, prueba de relación, documentos financieros para fianza, evidencia de lazos comunitarios.",
    familyStep5: "NO Firme Nada",
    familyStep5Desc: "Nunca firme documentos en nombre de la persona detenida sin consejo de un abogado.",
    familyStep6: "Depositar Dinero para Llamadas",
    familyStep6Desc: "Ponga dinero en la cuenta de comisariato para que puedan hacer llamadas telefónicas.",
    
    ctaTitle: "¿Necesita Ayuda con un Caso de Detención?",
    ctaDescription: "Nuestros experimentados abogados de inmigración están disponibles 24/7 para ayudar a las familias a navegar el proceso de detención. Podemos presentar mociones de fianza, representar a su ser querido en corte y luchar por su liberación.",
    ctaButton: "Obtener Ayuda Inmediata",
    ctaPhone: "Llame 24/7:",
    
    backToResources: "Volver a Recursos",
    relatedGuides: "Guías Relacionadas",
    detentionGuide: "Centros de Detención de ICE",
    sponsorGuide: "Guía del Patrocinador",
    bondChecklist: "Lista de Documentos para Fianza"
  },
  pt: {
    title: "Processo de Detenção do ICE",
    subtitle: "Guia Completo: Da Prisão ao Tribunal",
    description: "Entender o que acontece quando alguém é detido pelo ICE é crucial para famílias e indivíduos navegando o sistema de imigração. Este guia abrangente explica cada fase do processo de detenção.",
    callNow: "Precisa de Ajuda Imediata? Ligue",
    
    phase1Title: "Fase 1: A Prisão",
    phase1Time: "Dia 0",
    howArrestsOccur: "Como Ocorrem as Prisões do ICE",
    targetedEnforcement: "Operação Direcionada",
    targetedEnforcementDesc: "O ICE tem um mandado específico para um indivíduo baseado em ordens de deportação anteriores, histórico criminal ou violações de imigração.",
    collateralArrests: "Prisões Colaterais",
    collateralArrestsDesc: "Pessoa encontrada durante uma operação direcionada a outra pessoa que também está em violação da lei de imigração.",
    jailTransfers: "Transferências de Prisão",
    jailTransfersDesc: "As autoridades locais notificam o ICE de um não-cidadão sob custódia através de acordos 287(g) ou detenções do ICE.",
    workplaceRaids: "Operações em Locais de Trabalho",
    workplaceRaidsDesc: "O ICE realiza operações em empresas suspeitas de empregar trabalhadores indocumentados.",
    homeVisits: "Visitas Domiciliares",
    homeVisitsDesc: "Oficiais do ICE chegam a uma residência. Eles não podem entrar sem consentimento ou um mandado judicial assinado por um juiz.",
    
    yourRights: "Seus Direitos Durante a Prisão",
    rightSilent: "Direito de permanecer em silêncio",
    rightSilentDesc: "Você não precisa responder perguntas sobre seu status imigratório",
    rightRefuse: "Direito de recusar entrada em casa",
    rightRefuseDesc: "Mandados administrativos do ICE NÃO autorizam entrada em casa sem consentimento",
    rightAttorney: "Direito de contatar um advogado",
    rightAttorneyDesc: "Peça um advogado antes de responder qualquer pergunta",
    rightConsulate: "Direito de contatar seu consulado",
    rightConsulateDesc: "Cidadãos estrangeiros podem contatar o consulado de seu país",
    
    phase2Title: "Fase 2: Processamento Inicial",
    phase2Time: "0-48 Horas",
    bookingTitle: "Registro e Documentação",
    biometrics: "Coleta Biométrica",
    biometricsDesc: "Impressões digitais, fotografias e informações biográficas são coletadas e inseridas em bancos de dados federais.",
    backgroundCheck: "Verificação de Antecedentes Criminais",
    backgroundCheckDesc: "Busca no banco de dados do FBI para qualquer histórico criminal nos Estados Unidos.",
    immigrationReview: "Revisão do Histórico Imigratório",
    immigrationReviewDesc: "Verificação de deportações anteriores, permanência além do visto ou casos de imigração pendentes.",
    medicalScreening: "Triagem Médica",
    medicalScreeningDesc: "Avaliação básica de saúde para identificar necessidades médicas imediatas.",
    propertyInventory: "Inventário de Pertences",
    propertyInventoryDesc: "Pertences pessoais são catalogados e armazenados até a liberação ou deportação.",
    
    aNumberTitle: "Atribuição do Número de Estrangeiro (A-Number)",
    aNumberDesc: "Cada pessoa em processos de imigração recebe um número único de 9 dígitos (ex., A123-456-789). Este número é essencial para rastrear o caso e localizar a pessoa detida. Familiares precisam deste número para encontrar seu ente querido usando o localizador de detidos do ICE.",
    aNumberImportant: "O A-Number é a informação mais importante para as famílias",
    
    phase3Title: "Fase 3: Determinação de Custódia",
    phase3Time: "24-72 Horas",
    custodyDecision: "O ICE Toma uma Decisão de Custódia",
    releaseOR: "Liberação por Reconhecimento Próprio (OR)",
    releaseORDesc: "Raro, tipicamente para indivíduos de baixo risco com laços comunitários muito fortes e sem histórico criminal.",
    releaseBond: "Liberação Sob Fiança",
    releaseBondDesc: "O ICE estabelece um valor de fiança. O mínimo é $1.500, mas fianças típicas variam de $5.000 a $25.000 ou mais.",
    releaseATD: "Alternativas à Detenção (ATD)",
    releaseATDDesc: "Liberação com monitor de tornozelo GPS, apresentações regulares no escritório do ICE, ou monitoramento por aplicativo de telefone.",
    continuedDetention: "Detenção Continuada",
    continuedDetentionDesc: "A pessoa permanece sob custódia do ICE pendente a resolução de seu caso de imigração.",
    
    factorsConsidered: "Fatores que o ICE Considera",
    flightRisk: "Risco de Fuga",
    flightRiskDesc: "Laços com a comunidade, família, emprego, propriedade",
    dangerCommunity: "Perigo para a Comunidade",
    dangerCommunityDesc: "Histórico criminal, natureza e gravidade dos delitos",
    immigrationHistory: "Histórico Imigratório",
    immigrationHistoryDesc: "Deportações anteriores, violações de visto, não comparecimento",
    mannerEntry: "Forma de Entrada",
    mannerEntryDesc: "Entrada legal vs. entrada sem inspeção",
    timeInUS: "Tempo nos EUA",
    timeInUSDesc: "Duração da presença contínua nos Estados Unidos",
    
    mandatoryDetention: "Categorias de Detenção Obrigatória",
    mandatoryDetentionDesc: "Algumas pessoas NÃO são elegíveis para fiança e devem permanecer detidas:",
    mandatoryCriminal: "Certas condenações criminais (crimes graves agravados, substâncias controladas, armas de fogo, crimes de torpeza moral)",
    mandatoryArriving: "Estrangeiros chegando (capturados em porto de entrada sem documentos válidos)",
    mandatoryTerrorism: "Certos motivos relacionados a terrorismo",
    mandatoryPrior: "Ordens de deportação anteriores (restabelecimento de remoção)",
    
    phase4Title: "Fase 4: Notificação de Comparecimento (NTA)",
    phase4Time: "1-10 Dias",
    whatIsNTA: "O que é uma Notificação de Comparecimento?",
    ntaDescription: "A Notificação de Comparecimento (Formulário I-862) é o documento de acusação que inicia os processos de remoção no Tribunal de Imigração. NÃO é uma data de tribunal—é a acusação formal de que o governo acredita que você é removível dos Estados Unidos.",
    
    ntaContents: "Conteúdo do NTA",
    ntaPersonalInfo: "Informações Pessoais",
    ntaPersonalInfoDesc: "Nome, A-Number, data de nascimento, país de cidadania",
    ntaAllegations: "Alegações Factuais",
    ntaAllegationsDesc: "Declarações numeradas sobre o histórico imigratório da pessoa (ex., 'Você entrou nos Estados Unidos em ou por volta de [data]')",
    ntaCharges: "Acusações de Removibilidade",
    ntaChargesDesc: "As seções específicas da Lei de Imigração e Nacionalidade (INA) que o ICE alega tornam a pessoa deportável",
    ntaHearing: "Aviso de Audiência",
    ntaHearingDesc: "Indica que os processos serão realizados perante um Juiz de Imigração (data/hora pode inicialmente dizer 'A Determinar')",
    
    commonCharges: "Acusações Comuns em NTAs",
    charge212a6: "INA § 212(a)(6)(A)(i)",
    charge212a6Desc: "Presente sem admissão ou liberdade condicional (entrou sem inspeção)",
    charge212a7: "INA § 212(a)(7)(A)(i)(I)",
    charge212a7Desc: "Sem visto de imigrante válido ou documento de entrada",
    charge237a1b: "INA § 237(a)(1)(B)",
    charge237a1bDesc: "Excedeu permanência do visto (permaneceu mais tempo do que autorizado)",
    charge237a1c: "INA § 237(a)(1)(C)(i)",
    charge237a1cDesc: "Violou condições do status de não-imigrante",
    charge237a2: "INA § 237(a)(2)",
    charge237a2Desc: "Motivos criminais de deportabilidade",
    
    ntaService: "Entrega do NTA",
    ntaServiceDesc: "O ICE deve entregar pessoalmente o NTA ao indivíduo. A pessoa assina confirmando recebimento (ou o ICE anota a recusa em assinar). Uma cópia é protocolada no Tribunal de Imigração, o que oficialmente inicia os processos. O tribunal então envia um aviso de audiência com a data, hora e local reais.",
    
    phase5Title: "Fase 5: Transferência para Centro de Detenção",
    phase5Time: "1-7 Dias",
    facilityTypes: "Tipos de Centros de Detenção",
    processingCenters: "Centros de Processamento do ICE",
    processingCentersDesc: "Instalações de retenção de curto prazo, geralmente máximo de 24-72 horas",
    serviceCenters: "Centros de Processamento de Serviço (SPCs)",
    serviceCentersDesc: "Instalações de propriedade do ICE e operadas pelo ICE para detenção de longo prazo",
    contractFacilities: "Centros de Detenção por Contrato (CDFs)",
    contractFacilitiesDesc: "Operados privadamente por empresas como GEO Group e CoreCivic",
    igsaFacilities: "Instalações IGSA",
    igsaFacilitiesDesc: "Prisões do condado com Acordos de Serviço Intergovernamental com o ICE",
    
    atFacility: "O que Acontece no Centro",
    facilityMedical: "Exame médico completo e avaliação de saúde",
    facilityClassification: "Avaliação de classificação para determinar nível de segurança",
    facilityHousing: "Atribuição de alojamento baseada na classificação",
    facilityOrientation: "Orientação sobre regras e procedimentos do centro",
    facilityLegal: "Acesso a recursos legais (biblioteca jurídica, listas de organizações de assistência jurídica)",
    facilityPhone: "Acesso telefônico para ligar para familiares e advogados",
    
    phase6Title: "Fase 6: Primeira Comparecimento no Tribunal",
    phase6Time: "2-6 Semanas Após Protocolar NTA",
    masterCalendar: "Audiência de Calendário Mestre",
    masterCalendarDesc: "O primeiro comparecimento no tribunal é chamado de Audiência de Calendário Mestre. É uma audiência curta, tipicamente de apenas 10-15 minutos, onde múltiplos casos são agendados ao mesmo tempo.",
    
    hearingPurpose: "Propósito da Audiência de Calendário Mestre",
    purposeIdentity: "Verificar identidade e confirmar recebimento do NTA",
    purposeRights: "Informar sobre direitos (direito a advogado às próprias custas, direito de apresentar evidências, direito de apelar)",
    purposePleadings: "Tomar declarações (admitir ou negar alegações factuais, conceder ou contestar acusações de removibilidade)",
    purposeRelief: "Identificar formas potenciais de alívio de remoção",
    purposeSchedule: "Estabelecer datas de audiências futuras",
    
    possibleOutcomes: "Resultados Possíveis",
    outcomeContinuance: "Pedido de Adiamento",
    outcomeContinuanceDesc: "Para encontrar um advogado ou reunir evidências",
    outcomeBond: "Pedido de Audiência de Fiança",
    outcomeBondDesc: "Se elegível, pedir ao juiz para estabelecer ou reduzir a fiança",
    outcomeRelief: "Designação de Alívio",
    outcomeReliefDesc: "Identificar quais formas de alívio buscará (asilo, cancelamento de remoção, etc.)",
    outcomeIndividual: "Audiência Individual Agendada",
    outcomeIndividualDesc: "A audiência completa de mérito onde seu caso será decidido",
    
    phase7Title: "Fase 7: Audiência de Fiança",
    phase7Time: "1-3 Semanas Após o Pedido",
    bondHearingTitle: "Audiência de Fiança de Imigração",
    bondHearingDesc: "Uma audiência de fiança é um procedimento separado onde um Juiz de Imigração determina se você deve ser liberado da detenção e, em caso afirmativo, qual valor de fiança é apropriado.",
    
    whoCanRequest: "Quem Pode Solicitar uma Audiência de Fiança",
    whoCanRequestDesc: "Qualquer pessoa que NÃO esteja sujeita a detenção obrigatória pode solicitar uma audiência de fiança. Deve ser solicitada—não é automática. Seu advogado pode protocolar uma moção para audiência de fiança, ou você pode solicitá-la em sua audiência de calendário mestre.",
    
    guerraFactors: "Fatores de Matter of Guerra",
    guerraFactorsDesc: "O Juiz de Imigração considerará estes fatores ao decidir se concede fiança:",
    guerraAddress: "Endereço Fixo",
    guerraAddressDesc: "Se a pessoa tem um lugar estável para morar",
    guerraResidence: "Duração de Residência",
    guerraResidenceDesc: "Quanto tempo viveu na comunidade",
    guerraFamily: "Laços Familiares",
    guerraFamilyDesc: "Cônjuge, filhos, pais ou outros parentes nos EUA",
    guerraEmployment: "Histórico de Emprego",
    guerraEmploymentDesc: "Histórico de trabalho estável e perspectivas de emprego atuais",
    guerraCourt: "Registro de Comparecimento no Tribunal",
    guerraCourtDesc: "Histórico de comparecer a datas de tribunal e compromissos de imigração",
    guerraCriminal: "Antecedentes Criminais",
    guerraCriminalDesc: "Natureza e gravidade de qualquer histórico criminal",
    guerraImmigration: "Violações de Imigração",
    guerraImmigrationDesc: "Histórico de violações da lei de imigração",
    guerraFlee: "Tentativas de Fugir",
    guerraFleeDesc: "Qualquer histórico de evadir oficiais de imigração",
    
    bondOutcomes: "Resultados da Audiência de Fiança",
    bondGranted: "Fiança Concedida",
    bondGrantedDesc: "O juiz estabelece um valor de fiança que deve ser pago integralmente para liberação",
    bondDenied: "Fiança Negada",
    bondDeniedDesc: "A pessoa permanece detida pendente a resolução do caso",
    bondOR: "Liberação por Reconhecimento Próprio",
    bondORDesc: "Raro—liberação sem pagamento necessário",
    
    timelineTitle: "Resumo da Cronologia",
    stage: "Etapa",
    typicalTimeframe: "Prazo Típico",
    arrestBooking: "Prisão ao registro",
    initialProcessing: "Processamento inicial",
    custodyDetermination: "Determinação de custódia",
    ntaIssued: "NTA emitido e entregue",
    transferFacility: "Transferência para centro de detenção",
    ntaFiled: "NTA protocolado no tribunal",
    firstHearing: "Primeira audiência de calendário mestre",
    bondHearing: "Audiência de fiança (se solicitada)",
    
    familyTitle: "O que os Familiares Devem Fazer Imediatamente",
    familyStep1: "Obter o A-Number",
    familyStep1Desc: "Este número de 9 dígitos é essencial para tudo. Pergunte à pessoa detida ou verifique qualquer documentação que ela tenha recebido.",
    familyStep2: "Usar o Localizador de Detidos do ICE",
    familyStep2Desc: "Visite locator.ice.gov para encontrar onde seu ente querido está detido.",
    familyStep3: "Contatar um Advogado de Imigração",
    familyStep3Desc: "Prazos sensíveis ao tempo se aplicam. Muitas formas de alívio têm requisitos rigorosos de protocolo.",
    familyStep4: "Reunir Documentos",
    familyStep4Desc: "Identificação, prova de relacionamento, documentos financeiros para fiança, evidência de laços comunitários.",
    familyStep5: "NÃO Assine Nada",
    familyStep5Desc: "Nunca assine documentos em nome da pessoa detida sem conselho de um advogado.",
    familyStep6: "Depositar Dinheiro para Ligações",
    familyStep6Desc: "Coloque dinheiro na conta de comissariado para que possam fazer ligações telefônicas.",
    
    ctaTitle: "Precisa de Ajuda com um Caso de Detenção?",
    ctaDescription: "Nossos experientes advogados de imigração estão disponíveis 24/7 para ajudar famílias a navegar o processo de detenção. Podemos protocolar moções de fiança, representar seu ente querido no tribunal e lutar pela sua liberação.",
    ctaButton: "Obter Ajuda Imediata",
    ctaPhone: "Ligue 24/7:",
    
    backToResources: "Voltar aos Recursos",
    relatedGuides: "Guias Relacionados",
    detentionGuide: "Centros de Detenção do ICE",
    sponsorGuide: "Guia do Patrocinador",
    bondChecklist: "Lista de Documentos para Fiança"
  }
};

export default function IceDetentionProcess() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.en;
  const [activePhase, setActivePhase] = useState<string>("phase1");

  const phases = [
    { id: "phase1", title: t.phase1Title, time: t.phase1Time, icon: AlertTriangle },
    { id: "phase2", title: t.phase2Title, time: t.phase2Time, icon: Fingerprint },
    { id: "phase3", title: t.phase3Title, time: t.phase3Time, icon: Scale },
    { id: "phase4", title: t.phase4Title, time: t.phase4Time, icon: FileText },
    { id: "phase5", title: t.phase5Title, time: t.phase5Time, icon: Building2 },
    { id: "phase6", title: t.phase6Title, time: t.phase6Time, icon: Gavel },
    { id: "phase7", title: t.phase7Title, time: t.phase7Time, icon: Users },
  ];

  const timelineData = [
    { stage: t.arrestBooking, time: "0-24 hours" },
    { stage: t.initialProcessing, time: "24-48 hours" },
    { stage: t.custodyDetermination, time: "24-72 hours" },
    { stage: t.ntaIssued, time: "1-10 days" },
    { stage: t.transferFacility, time: "1-7 days" },
    { stage: t.ntaFiled, time: "1-14 days after service" },
    { stage: t.firstHearing, time: "2-6 weeks after filing" },
    { stage: t.bondHearing, time: "1-3 weeks after request" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <SEO
        title={t.title}
        description="Complete guide to the ICE detention process from arrest to court. Learn about your rights, NTA, bond hearings, and what families should do."
        keywords="ICE detention process, NTA notice to appear, immigration bond hearing, ICE arrest rights, detention timeline"
        canonicalUrl="/ice-detention-process"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] opacity-5"></div>
        <div className="container relative z-10">
          <Link href="/resources" className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-6 transition-colors">
            <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
            {t.backToResources}
          </Link>
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-4">
            {t.callNow} 1-844-423-3733
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl text-slate-300 mb-6">{t.subtitle}</p>
          <p className="text-lg text-slate-400 max-w-3xl">{t.description}</p>
        </div>
      </section>

      {/* Phase Navigation */}
      <section className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="container py-4">
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
            {phases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => {
                  setActivePhase(phase.id);
                  document.getElementById(phase.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  activePhase === phase.id
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <phase.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{phase.time}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container py-12">
        {/* Phase 1: The Arrest */}
        <section id="phase1" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <Badge variant="outline" className="mb-2">{t.phase1Time}</Badge>
              <h2 className="text-3xl font-bold text-slate-900">{t.phase1Title}</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  {t.howArrestsOccur}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-1">{t.targetedEnforcement}</h4>
                  <p className="text-sm text-slate-600">{t.targetedEnforcementDesc}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-1">{t.collateralArrests}</h4>
                  <p className="text-sm text-slate-600">{t.collateralArrestsDesc}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-1">{t.jailTransfers}</h4>
                  <p className="text-sm text-slate-600">{t.jailTransfersDesc}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-1">{t.workplaceRaids}</h4>
                  <p className="text-sm text-slate-600">{t.workplaceRaidsDesc}</p>
                </div>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <h4 className="font-semibold text-amber-900 mb-1">{t.homeVisits}</h4>
                  <p className="text-sm text-amber-800">{t.homeVisitsDesc}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Shield className="w-5 h-5" />
                  {t.yourRights}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-900">{t.rightSilent}</h4>
                    <p className="text-sm text-green-700">{t.rightSilentDesc}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-900">{t.rightRefuse}</h4>
                    <p className="text-sm text-green-700">{t.rightRefuseDesc}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-900">{t.rightAttorney}</h4>
                    <p className="text-sm text-green-700">{t.rightAttorneyDesc}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-900">{t.rightConsulate}</h4>
                    <p className="text-sm text-green-700">{t.rightConsulateDesc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Phase 2: Initial Processing */}
        <section id="phase2" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
              <Fingerprint className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <Badge variant="outline" className="mb-2">{t.phase2Time}</Badge>
              <h2 className="text-3xl font-bold text-slate-900">{t.phase2Title}</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{t.bookingTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{t.biometrics}</h4>
                    <p className="text-sm text-slate-600">{t.biometricsDesc}</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{t.backgroundCheck}</h4>
                    <p className="text-sm text-slate-600">{t.backgroundCheckDesc}</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{t.immigrationReview}</h4>
                    <p className="text-sm text-slate-600">{t.immigrationReviewDesc}</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{t.medicalScreening}</h4>
                    <p className="text-sm text-slate-600">{t.medicalScreeningDesc}</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">5</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{t.propertyInventory}</h4>
                    <p className="text-sm text-slate-600">{t.propertyInventoryDesc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-amber-50/50">
              <CardHeader>
                <CardTitle className="text-amber-900">{t.aNumberTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-800 mb-4">{t.aNumberDesc}</p>
                <div className="p-4 bg-amber-100 rounded-lg border border-amber-300">
                  <div className="flex items-center gap-2 text-amber-900 font-bold">
                    <AlertCircle className="w-5 h-5" />
                    {t.aNumberImportant}
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white rounded-lg border-2 border-dashed border-amber-300">
                  <p className="text-center text-slate-500 text-sm mb-2">Example A-Number Format:</p>
                  <p className="text-center text-2xl font-mono font-bold text-slate-900">A123-456-789</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Phase 3: Custody Determination */}
        <section id="phase3" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center">
              <Scale className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <Badge variant="outline" className="mb-2">{t.phase3Time}</Badge>
              <h2 className="text-3xl font-bold text-slate-900">{t.phase3Title}</h2>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{t.custodyDecision}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">{t.releaseOR}</h4>
                  <p className="text-sm text-green-700">{t.releaseORDesc}</p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">{t.releaseBond}</h4>
                  <p className="text-sm text-blue-700">{t.releaseBondDesc}</p>
                </div>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <h4 className="font-semibold text-amber-900 mb-2">{t.releaseATD}</h4>
                  <p className="text-sm text-amber-700">{t.releaseATDDesc}</p>
                </div>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">{t.continuedDetention}</h4>
                  <p className="text-sm text-red-700">{t.continuedDetentionDesc}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{t.factorsConsidered}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-start p-3 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-slate-900">{t.flightRisk}</h4>
                    <p className="text-sm text-slate-600">{t.flightRiskDesc}</p>
                  </div>
                </div>
                <div className="flex justify-between items-start p-3 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-slate-900">{t.dangerCommunity}</h4>
                    <p className="text-sm text-slate-600">{t.dangerCommunityDesc}</p>
                  </div>
                </div>
                <div className="flex justify-between items-start p-3 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-slate-900">{t.immigrationHistory}</h4>
                    <p className="text-sm text-slate-600">{t.immigrationHistoryDesc}</p>
                  </div>
                </div>
                <div className="flex justify-between items-start p-3 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-slate-900">{t.mannerEntry}</h4>
                    <p className="text-sm text-slate-600">{t.mannerEntryDesc}</p>
                  </div>
                </div>
                <div className="flex justify-between items-start p-3 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-slate-900">{t.timeInUS}</h4>
                    <p className="text-sm text-slate-600">{t.timeInUSDesc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-900">
                  <XCircle className="w-5 h-5" />
                  {t.mandatoryDetention}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-800 mb-4">{t.mandatoryDetentionDesc}</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{t.mandatoryCriminal}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{t.mandatoryArriving}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{t.mandatoryTerrorism}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{t.mandatoryPrior}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Phase 4: Notice to Appear */}
        <section id="phase4" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">
              <FileText className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <Badge variant="outline" className="mb-2">{t.phase4Time}</Badge>
              <h2 className="text-3xl font-bold text-slate-900">{t.phase4Title}</h2>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{t.whatIsNTA}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 text-lg">{t.ntaDescription}</p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>{t.ntaContents}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-1">{t.ntaPersonalInfo}</h4>
                  <p className="text-sm text-slate-600">{t.ntaPersonalInfoDesc}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-1">{t.ntaAllegations}</h4>
                  <p className="text-sm text-slate-600">{t.ntaAllegationsDesc}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-1">{t.ntaCharges}</h4>
                  <p className="text-sm text-slate-600">{t.ntaChargesDesc}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-1">{t.ntaHearing}</h4>
                  <p className="text-sm text-slate-600">{t.ntaHearingDesc}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.commonCharges}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <code className="text-sm font-mono text-primary">{t.charge212a6}</code>
                  <p className="text-sm text-slate-600 mt-1">{t.charge212a6Desc}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <code className="text-sm font-mono text-primary">{t.charge212a7}</code>
                  <p className="text-sm text-slate-600 mt-1">{t.charge212a7Desc}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <code className="text-sm font-mono text-primary">{t.charge237a1b}</code>
                  <p className="text-sm text-slate-600 mt-1">{t.charge237a1bDesc}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <code className="text-sm font-mono text-primary">{t.charge237a1c}</code>
                  <p className="text-sm text-slate-600 mt-1">{t.charge237a1cDesc}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <code className="text-sm font-mono text-primary">{t.charge237a2}</code>
                  <p className="text-sm text-slate-600 mt-1">{t.charge237a2Desc}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">{t.ntaService}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-800">{t.ntaServiceDesc}</p>
            </CardContent>
          </Card>
        </section>

        {/* Phase 5: Transfer to Facility */}
        <section id="phase5" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-slate-200 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-slate-600" />
            </div>
            <div>
              <Badge variant="outline" className="mb-2">{t.phase5Time}</Badge>
              <h2 className="text-3xl font-bold text-slate-900">{t.phase5Title}</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{t.facilityTypes}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-1">{t.processingCenters}</h4>
                  <p className="text-sm text-slate-600">{t.processingCentersDesc}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-1">{t.serviceCenters}</h4>
                  <p className="text-sm text-slate-600">{t.serviceCentersDesc}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-1">{t.contractFacilities}</h4>
                  <p className="text-sm text-slate-600">{t.contractFacilitiesDesc}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-1">{t.igsaFacilities}</h4>
                  <p className="text-sm text-slate-600">{t.igsaFacilitiesDesc}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.atFacility}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700">{t.facilityMedical}</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700">{t.facilityClassification}</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700">{t.facilityHousing}</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700">{t.facilityOrientation}</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700">{t.facilityLegal}</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700">{t.facilityPhone}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Phase 6: First Court Appearance */}
        <section id="phase6" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">
              <Gavel className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <Badge variant="outline" className="mb-2">{t.phase6Time}</Badge>
              <h2 className="text-3xl font-bold text-slate-900">{t.phase6Title}</h2>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{t.masterCalendar}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 text-lg">{t.masterCalendarDesc}</p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>{t.hearingPurpose}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-600 font-bold text-xs">1</span>
                  </div>
                  <p className="text-slate-700">{t.purposeIdentity}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-600 font-bold text-xs">2</span>
                  </div>
                  <p className="text-slate-700">{t.purposeRights}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-600 font-bold text-xs">3</span>
                  </div>
                  <p className="text-slate-700">{t.purposePleadings}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-600 font-bold text-xs">4</span>
                  </div>
                  <p className="text-slate-700">{t.purposeRelief}</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-600 font-bold text-xs">5</span>
                  </div>
                  <p className="text-slate-700">{t.purposeSchedule}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.possibleOutcomes}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-1">{t.outcomeContinuance}</h4>
                  <p className="text-sm text-slate-600">{t.outcomeContinuanceDesc}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-1">{t.outcomeBond}</h4>
                  <p className="text-sm text-slate-600">{t.outcomeBondDesc}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-1">{t.outcomeRelief}</h4>
                  <p className="text-sm text-slate-600">{t.outcomeReliefDesc}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold text-slate-900 mb-1">{t.outcomeIndividual}</h4>
                  <p className="text-sm text-slate-600">{t.outcomeIndividualDesc}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Phase 7: Bond Hearing */}
        <section id="phase7" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <Badge variant="outline" className="mb-2">{t.phase7Time}</Badge>
              <h2 className="text-3xl font-bold text-slate-900">{t.phase7Title}</h2>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{t.bondHearingTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 text-lg mb-4">{t.bondHearingDesc}</p>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">{t.whoCanRequest}</h4>
                <p className="text-blue-800">{t.whoCanRequestDesc}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8 border-primary">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-primary">{t.guerraFactors}</CardTitle>
              <p className="text-slate-600">{t.guerraFactorsDesc}</p>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex gap-3 p-4 bg-slate-50 rounded-lg">
                  <Home className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900">{t.guerraAddress}</h4>
                    <p className="text-sm text-slate-600">{t.guerraAddressDesc}</p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 bg-slate-50 rounded-lg">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900">{t.guerraResidence}</h4>
                    <p className="text-sm text-slate-600">{t.guerraResidenceDesc}</p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 bg-slate-50 rounded-lg">
                  <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900">{t.guerraFamily}</h4>
                    <p className="text-sm text-slate-600">{t.guerraFamilyDesc}</p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 bg-slate-50 rounded-lg">
                  <Briefcase className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900">{t.guerraEmployment}</h4>
                    <p className="text-sm text-slate-600">{t.guerraEmploymentDesc}</p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 bg-slate-50 rounded-lg">
                  <Gavel className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900">{t.guerraCourt}</h4>
                    <p className="text-sm text-slate-600">{t.guerraCourtDesc}</p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 bg-slate-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900">{t.guerraCriminal}</h4>
                    <p className="text-sm text-slate-600">{t.guerraCriminalDesc}</p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 bg-slate-50 rounded-lg">
                  <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900">{t.guerraImmigration}</h4>
                    <p className="text-sm text-slate-600">{t.guerraImmigrationDesc}</p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 bg-slate-50 rounded-lg">
                  <HandMetal className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900">{t.guerraFlee}</h4>
                    <p className="text-sm text-slate-600">{t.guerraFleeDesc}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.bondOutcomes}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                  <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-green-900 mb-1">{t.bondGranted}</h4>
                  <p className="text-sm text-green-700">{t.bondGrantedDesc}</p>
                </div>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                  <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-red-900 mb-1">{t.bondDenied}</h4>
                  <p className="text-sm text-red-700">{t.bondDeniedDesc}</p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                  <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-blue-900 mb-1">{t.bondOR}</h4>
                  <p className="text-sm text-blue-700">{t.bondORDesc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Timeline Summary */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">{t.timelineTitle}</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-slate-900">{t.stage}</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-900">{t.typicalTimeframe}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timelineData.map((row, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-3 px-4 text-slate-700">{row.stage}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{row.time}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Family Action Steps */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">{t.familyTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-t-4 border-t-primary">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-xl">1</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{t.familyStep1}</h3>
                <p className="text-slate-600">{t.familyStep1Desc}</p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-primary">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-xl">2</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{t.familyStep2}</h3>
                <p className="text-slate-600">{t.familyStep2Desc}</p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-primary">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-xl">3</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{t.familyStep3}</h3>
                <p className="text-slate-600">{t.familyStep3Desc}</p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-primary">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-xl">4</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{t.familyStep4}</h3>
                <p className="text-slate-600">{t.familyStep4Desc}</p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-red-500">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <span className="text-red-600 font-bold text-xl">5</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{t.familyStep5}</h3>
                <p className="text-slate-600">{t.familyStep5Desc}</p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-primary">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-xl">6</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{t.familyStep6}</h3>
                <p className="text-slate-600">{t.familyStep6Desc}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{t.ctaTitle}</h2>
            <p className="text-lg text-white/90 mb-8">{t.ctaDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-primary" asChild>
                <Link href="/consultation">
                  {t.ctaButton}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <a href="tel:1-844-423-3733">
                  <Phone className="w-5 h-5 mr-2" />
                  {t.ctaPhone} 1-844-423-3733
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{t.relatedGuides}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/detention-guide">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <Building2 className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-slate-900 mb-2">{t.detentionGuide}</h3>
                  <p className="text-sm text-slate-600">Find ICE detention centers and contact information</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/sponsor-guide">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <Users className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-slate-900 mb-2">{t.sponsorGuide}</h3>
                  <p className="text-sm text-slate-600">Learn about sponsor requirements and responsibilities</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/bond-document-checklist">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="pt-6">
                  <FileText className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-slate-900 mb-2">{t.bondChecklist}</h3>
                  <p className="text-sm text-slate-600">Documents needed for bond hearings</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
