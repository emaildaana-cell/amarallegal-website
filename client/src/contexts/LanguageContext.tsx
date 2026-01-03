import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.attorneys": "Attorneys",
    "nav.practice_areas": "Practice Areas",
    "nav.knowledge_center": "Knowledge Center",
    "nav.contact": "Contact",
    "nav.request_consultation": "Request Consultation",
    
    // Hero
    "hero.call_now": "Call Now",
    "hero.title_prefix": "Immigration Removal",
    "hero.title_suffix": "Experts",
    "hero.description": "When you or a loved one faces immigration detention, time is critical. Our experienced attorneys provide compassionate, aggressive representation to protect your rights and secure your freedom.",
    "hero.meet_attorneys": "Bond Questionnaire",
    
    // Footer
    "footer.tagline": "Providing authoritative legal representation with a commitment to justice and integrity since 1985.",
    "footer.practice_areas": "Practice Areas",
    "footer.contact": "Contact",
    "footer.newsletter": "Newsletter",
    "footer.subscribe_text": "Subscribe for legal insights and firm updates.",
    "footer.email_placeholder": "Email address",
    "footer.join": "Join",
    "footer.rights": "Amaral Law Firm. All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.disclaimer": "Disclaimer",
    "footer.accessibility": "Accessibility",
    "footer.admin": "Admin Portal",

    // Home Content
    "home.excellence_title": "Decades of Excellence in Legal Practice",
    "home.excellence_p1": "At Amaral Law, we specialize exclusively in defending immigrants facing deportation. We understand that your life in the United States is on the line, and we fight tirelessly to keep families together.",
    "home.excellence_p2": "With a proven track record in immigration court, our attorneys have successfully defended the rights of countless individuals against removal proceedings.",
    "home.learn_more": "Learn More About Our Firm",
    "home.practice_areas_title": "Our Practice Areas",
    "home.practice_areas_desc": "We focus 100% on immigration removal defense. Our specialized expertise ensures you have the strongest possible advocate in immigration court.",
    "home.latest_insights": "Latest Legal Insights",
    "home.view_all_articles": "View All Articles",

    // Practice Areas
    "practice.removal_defense": "Removal Defense",
    "practice.removal_defense_desc": "Aggressive representation in immigration court to stop deportation proceedings.",
    "practice.asylum": "Asylum & Appeals",
    "practice.asylum_desc": "Expert handling of asylum claims and BIA appeals for complex cases.",
    "practice.family": "Family Petitions",
    "practice.family_desc": "Reuniting families through adjustment of status and consular processing.",
    "practice.bond": "Bond Hearings",
    "practice.bond_desc": "Fighting for your release from immigration detention centers.",
    "practice.crimmigration": "Crimmigration",
    "practice.crimmigration_desc": "Defending non-citizens facing criminal charges that impact immigration status.",
    "practice.federal": "Federal Litigation",
    "practice.federal_desc": "Challenging delayed or denied applications in federal court.",

    // Contact Page
    "contact.title": "Contact Us",
    "contact.subtitle": "Get in touch with our legal team for a consultation.",
    "contact.form_title": "Send us a message",
    "contact.name": "Full Name",
    "contact.email": "Email Address",
    "contact.phone": "Phone Number",
    "contact.message": "Message",
    "contact.submit": "Send Message",
    "contact.info_title": "Contact Information",
    "contact.address": "Address",
    "contact.hours": "Office Hours",
    "contact.hours_val": "Mon-Fri: 9:00 AM - 6:00 PM",

    // Bond Questionnaire
    "bond.title": "Bond Questionnaire",
    "bond.subtitle": "Please complete this form to help us evaluate your eligibility for an immigration bond.",
    "bond.detainee_info": "Detainee Information",
    "bond.full_name": "Full Name of Detainee",
    "bond.a_number": "Alien Registration Number (A-Number)",
    "bond.dob": "Date of Birth",
    "bond.country_birth": "Country of Birth",
    "bond.date_entry": "Date of Entry into U.S.",
    "bond.manner_entry": "Manner of Entry (e.g., Visa, Border)",
    "bond.detention_info": "Detention Information",
    "bond.detention_center": "Current Detention Center",
    "bond.date_detained": "Date Detained",
    "bond.criminal_history": "Criminal History (if any)",
    "bond.family_ties": "Family Ties in the U.S.",
    "bond.sponsor_info": "Sponsor Information",
    "bond.sponsor_name": "Sponsor Name",
    "bond.sponsor_relation": "Relationship to Detainee",
    "bond.sponsor_status": "Sponsor Immigration Status",
    "bond.sponsor_income": "Annual Income",
    "bond.submit": "Submit Questionnaire",

    // Vanity Number Section
    "vanity.title": "Memorize This Number: 1-844-ICE-FREE",
    "vanity.subtitle": "Immediate Legal Assistance When You Need It Most",
    "vanity.description": "In the event of an unexpected detention by ICE, every second counts. Memorizing 1-844-ICE-FREE (1-844-262-5442) ensures you or your loved ones can instantly connect with our dedicated removal defense team. We are available to provide urgent guidance and representation to fight for your release.",
    "vanity.cta": "Save Contact Now",

    // Attorneys Page
    "attorneys.title": "Our Legal Team",
    "attorneys.subtitle": "Experienced attorneys dedicated to your case",
    "attorneys.ana.role": "Lead Immigration Attorney",
    "attorneys.ana.bio": "An immigrant from Brazil with over 40 years in the U.S., Ana Paola specializes in detention defense and removal proceedings, bringing personal experience and deep empathy to every case.",
    "attorneys.reggie.role": "Complex Immigration Litigation Attorney",
    "attorneys.reggie.bio": "Specialized in complex immigration litigation with extensive experience in appellate proceedings, federal court litigation, and challenging immigration cases requiring advanced legal strategies.",
    "attorneys.balaiz.role": "Of Counsel - Civil Litigation",
    "attorneys.balaiz.bio": "Experienced in civil litigation matters including contract disputes, property claims, and complex civil cases. Provides expert legal representation for clients needing specialized civil law counsel.",
    "attorneys.values.title": "Our Values",
    "attorneys.values.justice": "Justice for All",
    "attorneys.values.justice_desc": "We believe every person deserves quality legal representation, regardless of their circumstances.",
    "attorneys.values.compassion": "Compassionate Advocacy",
    "attorneys.values.compassion_desc": "We treat each client with dignity, respect, and genuine understanding of their situation.",
    "attorneys.values.excellence": "Legal Excellence",
    "attorneys.values.excellence_desc": "We maintain the highest standards of legal practice and tirelessly pursue the best outcomes.",
    "attorneys.values.community": "Community Commitment",
    "attorneys.values.community_desc": "We actively serve immigrant communities and advocate for fair immigration reform.",
    "attorneys.cta.title": "Don't Face Immigration Detention Alone",
    "attorneys.cta.desc": "Every day in detention matters. Contact us today for a free consultation and learn how we can help secure your release and fight for your rights.",
    "attorneys.cta.button": "Request Free Consultation",

    // Knowledge Center
    "knowledge.title": "Knowledge Center",
    "knowledge.subtitle": "Expert legal insights, in-depth guides, and practical resources to help you navigate complex legal landscapes.",
    "knowledge.tab.guides": "Legal Guides",
    "knowledge.tab.resources": "Downloadable Resources",
    "knowledge.search": "Search topics...",
    "knowledge.read_article": "Read Article",
    "knowledge.no_results": "No guides found matching your search.",
    "knowledge.newsletter.title": "Stay Informed",
    "knowledge.newsletter.desc": "Subscribe to our monthly newsletter for the latest legal insights, firm news, and regulatory updates delivered directly to your inbox.",
    "knowledge.newsletter.placeholder": "Enter your email address",
    "knowledge.newsletter.button": "Subscribe",
    "knowledge.newsletter.disclaimer": "By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.",
    
    // Guides
    "guide.1.title": "Corporate Liability in the Digital Age",
    "guide.1.desc": "A comprehensive guide to understanding new liability risks for digital-first companies.",
    "guide.2.title": "Estate Planning for Business Owners",
    "guide.2.desc": "Strategies to protect your business assets and ensure a smooth succession.",
    "guide.3.title": "Intellectual Property: Patent vs. Trade Secret",
    "guide.3.desc": "Deciding which protection mechanism is right for your innovation.",
    "guide.4.title": "Navigating Commercial Lease Disputes",
    "guide.4.desc": "Key steps to take when facing a dispute with your commercial landlord or tenant.",
    "guide.5.title": "The 2026 Tax Reform: What You Need to Know",
    "guide.5.desc": "An early look at proposed changes to the tax code and how to prepare.",
    "guide.6.title": "Family Law: Prenuptial Agreements Explained",
    "guide.6.desc": "Dispelling common myths about prenups and understanding their benefits.",
    
    // Resources
    "resource.1.title": "2025 Corporate Compliance Checklist",
    "resource.2.title": "Estate Planning Questionnaire",
    "resource.3.title": "Intellectual Property Audit Template",
    "resource.4.title": "Commercial Lease Terminology Glossary",
  },
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.attorneys": "Abogados",
    "nav.practice_areas": "Áreas de Práctica",
    "nav.knowledge_center": "Centro de Conocimiento",
    "nav.contact": "Contacto",
    "nav.request_consultation": "Solicitar Consulta",
    
    // Hero
    "hero.call_now": "Llama Ahora",
    "hero.title_prefix": "Expertos en Defensa de",
    "hero.title_suffix": "Deportación",
    "hero.description": "Cuando usted o un ser querido enfrenta la detención migratoria, el tiempo es crítico. Nuestros abogados experimentados brindan una representación compasiva y agresiva para proteger sus derechos y asegurar su libertad.",
    "hero.meet_attorneys": "Cuestionario de Fianza",
    
    // Footer
    "footer.tagline": "Proporcionando representación legal autorizada con un compromiso con la justicia y la integridad desde 1985.",
    "footer.practice_areas": "Áreas de Práctica",
    "footer.contact": "Contacto",
    "footer.newsletter": "Boletín",
    "footer.subscribe_text": "Suscríbase para recibir información legal y actualizaciones de la firma.",
    "footer.email_placeholder": "Dirección de correo electrónico",
    "footer.join": "Unirse",
    "footer.rights": "Amaral Law Firm. Todos los derechos reservados.",
    "footer.privacy": "Política de Privacidad",
    "footer.terms": "Términos de Servicio",
    "footer.disclaimer": "Aviso Legal",
    "footer.accessibility": "Accesibilidad",
    "footer.admin": "Portal de Administración",

    // Home Content
    "home.excellence_title": "Décadas de Excelencia en Práctica Legal",
    "home.excellence_p1": "En Amaral Law, nos especializamos exclusivamente en defender a inmigrantes que enfrentan la deportación. Entendemos que su vida en los Estados Unidos está en juego y luchamos incansablemente para mantener a las familias unidas.",
    "home.excellence_p2": "Con un historial comprobado en la corte de inmigración, nuestros abogados han defendido con éxito los derechos de innumerables personas contra los procedimientos de deportación.",
    "home.learn_more": "Conozca Más Sobre Nuestra Firma",
    "home.practice_areas_title": "Nuestras Áreas de Práctica",
    "home.practice_areas_desc": "Nos enfocamos 100% en la defensa contra la deportación. Nuestra experiencia especializada asegura que tenga el defensor más fuerte posible en la corte de inmigración.",
    "home.latest_insights": "Últimas Perspectivas Legales",
    "home.view_all_articles": "Ver Todos los Artículos",

    // Practice Areas
    "practice.removal_defense": "Defensa de Deportación",
    "practice.removal_defense_desc": "Representación agresiva en la corte de inmigración para detener los procedimientos de deportación.",
    "practice.asylum": "Asilo y Apelaciones",
    "practice.asylum_desc": "Manejo experto de reclamos de asilo y apelaciones ante la BIA para casos complejos.",
    "practice.family": "Peticiones Familiares",
    "practice.family_desc": "Reuniendo familias a través del ajuste de estatus y procesamiento consular.",
    "practice.bond": "Audiencias de Fianza",
    "practice.bond_desc": "Luchando por su liberación de los centros de detención de inmigración.",
    "practice.crimmigration": "Crimigración",
    "practice.crimmigration_desc": "Defendendo a no ciudadanos que enfrentan cargos criminales que afectan su estatus migratorio.",
    "practice.federal": "Litigio Federal",
    "practice.federal_desc": "Desafiando solicitudes retrasadas o denegadas en la corte federal.",

    // Contact Page
    "contact.title": "Contáctenos",
    "contact.subtitle": "Póngase en contacto con nuestro equipo legal para una consulta.",
    "contact.form_title": "Envíenos un mensaje",
    "contact.name": "Nombre Completo",
    "contact.email": "Dirección de Correo",
    "contact.phone": "Número de Teléfono",
    "contact.message": "Mensaje",
    "contact.submit": "Enviar Mensaje",
    "contact.info_title": "Información de Contacto",
    "contact.address": "Dirección",
    "contact.hours": "Horario de Oficina",
    "contact.hours_val": "Lun-Vie: 9:00 AM - 6:00 PM",

    // Bond Questionnaire
    "bond.title": "Cuestionario de Fianza",
    "bond.subtitle": "Por favor complete este formulario para ayudarnos a evaluar su elegibilidad para una fianza de inmigración.",
    "bond.detainee_info": "Información del Detenido",
    "bond.full_name": "Nombre Completo del Detenido",
    "bond.a_number": "Número de Registro de Extranjero (Número A)",
    "bond.dob": "Fecha de Nacimiento",
    "bond.country_birth": "País de Nacimiento",
    "bond.date_entry": "Fecha de Entrada a EE.UU.",
    "bond.manner_entry": "Manera de Entrada (ej. Visa, Frontera)",
    "bond.detention_info": "Información de Detención",
    "bond.detention_center": "Centro de Detención Actual",
    "bond.date_detained": "Fecha de Detención",
    "bond.criminal_history": "Historial Criminal (si hay)",
    "bond.family_ties": "Lazos Familiares en EE.UU.",
    "bond.sponsor_info": "Información del Patrocinador",
    "bond.sponsor_name": "Nombre del Patrocinador",
    "bond.sponsor_relation": "Relación con el Detenido",
    "bond.sponsor_status": "Estatus Migratorio del Patrocinador",
    "bond.sponsor_income": "Ingreso Anual",
    "bond.submit": "Enviar Cuestionario",

    // Vanity Number Section
    "vanity.title": "Memorice Este Número: 1-844-ICE-FREE",
    "vanity.subtitle": "Asistencia Legal Inmediata Cuando Más la Necesita",
    "vanity.description": "En caso de una detención inesperada por ICE, cada segundo cuenta. Memorizar 1-844-ICE-FREE (1-844-262-5442) asegura que usted o sus seres queridos puedan conectarse instantáneamente con nuestro equipo de defensa contra la deportación. Estamos disponibles para brindar orientación urgente y representación para luchar por su liberación.",
    "vanity.cta": "Guardar Contacto Ahora",

    // Attorneys Page
    "attorneys.title": "Nuestro Equipo Legal",
    "attorneys.subtitle": "Abogados experimentados dedicados a su caso",
    "attorneys.ana.role": "Abogada Principal de Inmigración",
    "attorneys.ana.bio": "Inmigrante de Brasil con más de 40 años en los EE.UU., Ana Paola se especializa en defensa de detención y procedimientos de deportación, aportando experiencia personal y profunda empatía a cada caso.",
    "attorneys.reggie.role": "Abogado de Litigios de Inmigración Complejos",
    "attorneys.reggie.bio": "Especializado en litigios de inmigración complejos con amplia experiencia en procedimientos de apelación, litigios en tribunales federales y casos de inmigración desafiantes que requieren estrategias legales avanzadas.",
    "attorneys.balaiz.role": "Of Counsel - Litigio Civil",
    "attorneys.balaiz.bio": "Experimentado en asuntos de litigio civil, incluyendo disputas contractuales, reclamos de propiedad y casos civiles complejos. Proporciona representación legal experta para clientes que necesitan asesoramiento especializado en derecho civil.",
    "attorneys.values.title": "Nuestros Valores",
    "attorneys.values.justice": "Justicia para Todos",
    "attorneys.values.justice_desc": "Creemos que cada persona merece una representación legal de calidad, independientemente de sus circunstancias.",
    "attorneys.values.compassion": "Defensa Compasiva",
    "attorneys.values.compassion_desc": "Tratamos a cada cliente con dignidad, respeto y una comprensión genuina de su situación.",
    "attorneys.values.excellence": "Excelencia Legal",
    "attorneys.values.excellence_desc": "Mantenemos los más altos estándares de práctica legal y perseguimos incansablemente los mejores resultados.",
    "attorneys.values.community": "Compromiso Comunitario",
    "attorneys.values.community_desc": "Servimos activamente a las comunidades de inmigrantes y abogamos por una reforma migratoria justa.",
    "attorneys.cta.title": "No Enfrente la Detención Migratoria Solo",
    "attorneys.cta.desc": "Cada día en detención cuenta. Contáctenos hoy para una consulta gratuita y sepa cómo podemos ayudar a asegurar su liberación y luchar por sus derechos.",
    "attorneys.cta.button": "Solicitar Consulta Gratuita",

    // Knowledge Center
    "knowledge.title": "Centro de Conocimiento",
    "knowledge.subtitle": "Perspectivas legales expertas, guías detalladas y recursos prácticos para ayudarle a navegar paisajes legales complejos.",
    "knowledge.tab.guides": "Guías Legales",
    "knowledge.tab.resources": "Recursos Descargables",
    "knowledge.search": "Buscar temas...",
    "knowledge.read_article": "Leer Artículo",
    "knowledge.no_results": "No se encontraron guías que coincidan con su búsqueda.",
    "knowledge.newsletter.title": "Manténgase Informado",
    "knowledge.newsletter.desc": "Suscríbase a nuestro boletín mensual para recibir las últimas perspectivas legales, noticias de la firma y actualizaciones regulatorias directamente en su bandeja de entrada.",
    "knowledge.newsletter.placeholder": "Ingrese su dirección de correo electrónico",
    "knowledge.newsletter.button": "Suscribirse",
    "knowledge.newsletter.disclaimer": "Al suscribirse, acepta nuestra Política de Privacidad. Puede darse de baja en cualquier momento.",
    
    // Guides
    "guide.1.title": "Responsabilidad Corporativa en la Era Digital",
    "guide.1.desc": "Una guía completa para entender los nuevos riesgos de responsabilidad para empresas digitales.",
    "guide.2.title": "Planificación Patrimonial para Dueños de Negocios",
    "guide.2.desc": "Estrategias para proteger los activos de su negocio y asegurar una sucesión fluida.",
    "guide.3.title": "Propiedad Intelectual: Patente vs. Secreto Comercial",
    "guide.3.desc": "Decidiendo qué mecanismo de protección es el adecuado para su innovación.",
    "guide.4.title": "Navegando Disputas de Arrendamiento Comercial",
    "guide.4.desc": "Pasos clave a seguir cuando enfrenta una disputa con su arrendador o inquilino comercial.",
    "guide.5.title": "La Reforma Fiscal de 2026: Lo Que Necesita Saber",
    "guide.5.desc": "Un vistazo temprano a los cambios propuestos al código fiscal y cómo prepararse.",
    "guide.6.title": "Derecho de Familia: Acuerdos Prenupciales Explicados",
    "guide.6.desc": "Disipando mitos comunes sobre los acuerdos prenupciales y entendiendo sus beneficios.",
    
    // Resources
    "resource.1.title": "Lista de Verificación de Cumplimiento Corporativo 2025",
    "resource.2.title": "Cuestionario de Planificación Patrimonial",
    "resource.3.title": "Plantilla de Auditoría de Propiedad Intelectual",
    "resource.4.title": "Glosario de Terminología de Arrendamiento Comercial",
  },
  pt: {
    // Navigation
    "nav.home": "Início",
    "nav.attorneys": "Advogados",
    "nav.practice_areas": "Áreas de Atuação",
    "nav.knowledge_center": "Centro de Conhecimento",
    "nav.contact": "Contato",
    "nav.request_consultation": "Solicitar Consulta",
    
    // Hero
    "hero.call_now": "Ligue Agora",
    "hero.title_prefix": "Especialistas em",
    "hero.title_suffix": "Defesa de Deportação",
    "hero.description": "Quando você ou um ente querido enfrenta a detenção imigratória, o tempo é crítico. Nossos advogados experientes oferecem representação compassiva e agressiva para proteger seus direitos e garantir sua liberdade.",
    "hero.meet_attorneys": "Questionário de Fiança",
    
    // Footer
    "footer.tagline": "Fornecendo representação legal autorizada com compromisso com a justiça e integridade desde 1985.",
    "footer.practice_areas": "Áreas de Atuação",
    "footer.contact": "Contato",
    "footer.newsletter": "Boletim Informativo",
    "footer.subscribe_text": "Inscreva-se para receber informações jurídicas e atualizações do escritório.",
    "footer.email_placeholder": "Endereço de e-mail",
    "footer.join": "Juntar-se",
    "footer.rights": "Amaral Law Firm. Todos os direitos reservados.",
    "footer.privacy": "Política de Privacidade",
    "footer.terms": "Termos de Serviço",
    "footer.disclaimer": "Aviso Legal",
    "footer.accessibility": "Acessibilidade",
    "footer.admin": "Portal Administrativo",

    // Home Content
    "home.excellence_title": "Décadas de Excelência na Prática Jurídica",
    "home.excellence_p1": "Na Amaral Law, nos especializamos exclusivamente na defesa de imigrantes que enfrentam a deportação. Entendemos que sua vida nos Estados Unidos está em jogo e lutamos incansavelmente para manter as famílias unidas.",
    "home.excellence_p2": "Com um histórico comprovado no tribunal de imigração, nossos advogados defenderam com sucesso os direitos de inúmeras pessoas contra processos de remoção.",
    "home.learn_more": "Saiba Mais Sobre Nosso Escritório",
    "home.practice_areas_title": "Nossas Áreas de Atuação",
    "home.practice_areas_desc": "Focamos 100% na defesa contra deportação. Nossa experiência especializada garante que você tenha o defensor mais forte possível no tribunal de imigração.",
    "home.latest_insights": "Últimas Perspectivas Jurídicas",
    "home.view_all_articles": "Ver Todos os Artigos",

    // Practice Areas
    "practice.removal_defense": "Defesa de Deportação",
    "practice.removal_defense_desc": "Representação agressiva no tribunal de imigração para interromper processos de deportação.",
    "practice.asylum": "Asilo e Apelações",
    "practice.asylum_desc": "Tratamento especializado de pedidos de asilo e apelações no BIA para casos complexos.",
    "practice.family": "Petições Familiares",
    "practice.family_desc": "Reunindo famílias através de ajuste de status e processamento consular.",
    "practice.bond": "Audiências de Fiança",
    "practice.bond_desc": "Lutando por sua libertação dos centros de detenção de imigração.",
    "practice.crimmigration": "Crimigração",
    "practice.crimmigration_desc": "Defendendo não-cidadãos que enfrentam acusações criminais que impactam o status migratório.",
    "practice.federal": "Litígio Federal",
    "practice.federal_desc": "Desafiando pedidos atrasados ou negados no tribunal federal.",

    // Contact Page
    "contact.title": "Contate-nos",
    "contact.subtitle": "Entre em contato com nossa equipe jurídica para uma consulta.",
    "contact.form_title": "Envie-nos uma mensagem",
    "contact.name": "Nome Completo",
    "contact.email": "Endereço de E-mail",
    "contact.phone": "Número de Telefone",
    "contact.message": "Mensagem",
    "contact.submit": "Enviar Mensagem",
    "contact.info_title": "Informações de Contato",
    "contact.address": "Endereço",
    "contact.hours": "Horário de Funcionamento",
    "contact.hours_val": "Seg-Sex: 9:00 AM - 6:00 PM",

    // Bond Questionnaire
    "bond.title": "Questionário de Fiança",
    "bond.subtitle": "Por favor, preencha este formulário para nos ajudar a avaliar sua elegibilidade para uma fiança de imigração.",
    "bond.detainee_info": "Informações do Detido",
    "bond.full_name": "Nome Completo do Detido",
    "bond.a_number": "Número de Registro de Estrangeiro (Número A)",
    "bond.dob": "Data de Nascimento",
    "bond.country_birth": "País de Nascimento",
    "bond.date_entry": "Data de Entrada nos EUA",
    "bond.manner_entry": "Forma de Entrada (ex: Visto, Fronteira)",
    "bond.detention_info": "Informações de Detenção",
    "bond.detention_center": "Centro de Detenção Atual",
    "bond.date_detained": "Data de Detenção",
    "bond.criminal_history": "Histórico Criminal (se houver)",
    "bond.family_ties": "Laços Familiares nos EUA",
    "bond.sponsor_info": "Informações do Patrocinador",
    "bond.sponsor_name": "Nome do Patrocinador",
    "bond.sponsor_relation": "Relação com o Detido",
    "bond.sponsor_status": "Status Migratório do Patrocinador",
    "bond.sponsor_income": "Renda Anual",
    "bond.submit": "Enviar Questionário",

    // Vanity Number Section
    "vanity.title": "Memorize Este Número: 1-844-ICE-FREE",
    "vanity.subtitle": "Assistência Jurídica Imediata Quando Você Mais Precisa",
    "vanity.description": "No caso de uma detenção inesperada pelo ICE, cada segundo conta. Memorizar 1-844-ICE-FREE (1-844-262-5442) garante que você ou seus entes queridos possam se conectar instantaneamente com nossa equipe de defesa contra deportação. Estamos disponíveis para fornecer orientação urgente e representação para lutar por sua libertação.",
    "vanity.cta": "Salvar Contato Agora",

    // Attorneys Page
    "attorneys.title": "Nossa Equipe Jurídica",
    "attorneys.subtitle": "Advogados experientes dedicados ao seu caso",
    "attorneys.ana.role": "Advogada Principal de Imigração",
    "attorneys.ana.bio": "Imigrante do Brasil com mais de 40 anos nos EUA, Ana Paola é especialista em defesa de detenção e processos de remoção, trazendo experiência pessoal e profunda empatia para cada caso.",
    "attorneys.reggie.role": "Advogado de Litígios Complexos de Imigração",
    "attorneys.reggie.bio": "Especializado em litígios complexos de imigração com vasta experiência em processos de apelação, litígios em tribunais federais e casos de imigração desafiadores que exigem estratégias jurídicas avançadas.",
    "attorneys.balaiz.role": "Of Counsel - Litígio Civil",
    "attorneys.balaiz.bio": "Experiente em questões de litígio civil, incluindo disputas contratuais, reivindicações de propriedade e casos civis complexos. Fornece representação legal especializada para clientes que necessitam de aconselhamento especializado em direito civil.",
    "attorneys.values.title": "Nossos Valores",
    "attorneys.values.justice": "Justiça para Todos",
    "attorneys.values.justice_desc": "Acreditamos que toda pessoa merece representação legal de qualidade, independentemente de suas circunstâncias.",
    "attorneys.values.compassion": "Advocacia Compassiva",
    "attorneys.values.compassion_desc": "Tratamos cada cliente com dignidade, respeito e compreensão genuína de sua situação.",
    "attorneys.values.excellence": "Excelência Jurídica",
    "attorneys.values.excellence_desc": "Mantemos os mais altos padrões de prática jurídica e buscamos incansavelmente os melhores resultados.",
    "attorneys.values.community": "Compromisso Comunitário",
    "attorneys.values.community_desc": "Servimos ativamente as comunidades de imigrantes e defendemos uma reforma imigratória justa.",
    "attorneys.cta.title": "Não Enfrente a Detenção Imigratória Sozinho",
    "attorneys.cta.desc": "Cada dia na detenção conta. Contate-nos hoje para uma consulta gratuita e saiba como podemos ajudar a garantir sua libertação e lutar por seus direitos.",
    "attorneys.cta.button": "Solicitar Consulta Gratuita",

    // Knowledge Center
    "knowledge.title": "Centro de Conhecimento",
    "knowledge.subtitle": "Insights jurídicos especializados, guias detalhados e recursos práticos para ajudá-lo a navegar em cenários jurídicos complexos.",
    "knowledge.tab.guides": "Guias Jurídicos",
    "knowledge.tab.resources": "Recursos para Download",
    "knowledge.search": "Pesquisar tópicos...",
    "knowledge.read_article": "Ler Artigo",
    "knowledge.no_results": "Nenhum guia encontrado correspondente à sua pesquisa.",
    "knowledge.newsletter.title": "Mantenha-se Informado",
    "knowledge.newsletter.desc": "Inscreva-se em nosso boletim informativo mensal para receber os últimos insights jurídicos, notícias do escritório e atualizações regulatórias diretamente em sua caixa de entrada.",
    "knowledge.newsletter.placeholder": "Digite seu endereço de e-mail",
    "knowledge.newsletter.button": "Inscrever-se",
    "knowledge.newsletter.disclaimer": "Ao se inscrever, você concorda com nossa Política de Privacidade. Você pode cancelar a inscrição a qualquer momento.",
    
    // Guides
    "guide.1.title": "Responsabilidade Corporativa na Era Digital",
    "guide.1.desc": "Um guia abrangente para entender os novos riscos de responsabilidade para empresas digitais.",
    "guide.2.title": "Planejamento Sucessório para Proprietários de Empresas",
    "guide.2.desc": "Estratégias para proteger os ativos de sua empresa e garantir uma sucessão tranquila.",
    "guide.3.title": "Propriedade Intelectual: Patente vs. Segredo Comercial",
    "guide.3.desc": "Decidindo qual mecanismo de proteção é o certo para sua inovação.",
    "guide.4.title": "Navegando em Disputas de Locação Comercial",
    "guide.4.desc": "Passos principais a serem tomados ao enfrentar uma disputa com seu locador ou inquilino comercial.",
    "guide.5.title": "A Reforma Tributária de 2026: O Que Você Precisa Saber",
    "guide.5.desc": "Uma visão antecipada das mudanças propostas no código tributário e como se preparar.",
    "guide.6.title": "Direito de Família: Acordos Pré-nupciais Explicados",
    "guide.6.desc": "Dissipando mitos comuns sobre acordos pré-nupciais e entendendo seus benefícios.",
    
    // Resources
    "resource.1.title": "Lista de Verificação de Conformidade Corporativa 2025",
    "resource.2.title": "Questionário de Planejamento Sucessório",
    "resource.3.title": "Modelo de Auditoria de Propriedade Intelectual",
    "resource.4.title": "Glossário de Terminologia de Locação Comercial",
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
