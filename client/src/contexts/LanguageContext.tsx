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
    "practice.crimmigration_desc": "Defendiendo a no ciudadanos que enfrentan cargos criminales que afectan su estatus migratorio.",
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
