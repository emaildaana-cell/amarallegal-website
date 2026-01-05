import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";

interface SEOProps {
  titleKey?: string;
  descriptionKey?: string;
  keywordsKey?: string;
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
}

const BASE_URL = "https://amarallegal.com";
const DEFAULT_OG_IMAGE = "/og-image.jpg";

export default function SEO({ 
  titleKey, 
  descriptionKey, 
  keywordsKey, 
  title, 
  description, 
  keywords,
  canonicalUrl,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noIndex = false,
}: SEOProps) {
  const { t, language } = useLanguage();

  const siteTitle = "Amaral Law";
  const pageTitle = titleKey ? t(titleKey) : title;
  const metaDescription = descriptionKey ? t(descriptionKey) : description;
  const metaKeywords = keywordsKey ? t(keywordsKey) : keywords;

  const fullTitle = pageTitle ? `${pageTitle} | ${siteTitle}` : `${siteTitle} | Immigration Attorneys & Removal Defense`;
  const fullCanonicalUrl = canonicalUrl ? `${BASE_URL}${canonicalUrl}` : undefined;
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`;

  return (
    <Helmet>
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription || "Amaral Law provides expert immigration defense and bond hearing representation. Available 24/7 for ICE detention emergencies. Call 1-844-423-3733."} />
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      
      {/* Canonical URL */}
      {fullCanonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription || "Amaral Law provides expert immigration defense and bond hearing representation. Available 24/7 for ICE detention emergencies."} />
      <meta property="og:image" content={fullOgImage} />
      {fullCanonicalUrl && <meta property="og:url" content={fullCanonicalUrl} />}
      <meta property="og:locale" content={language === "es" ? "es_ES" : language === "pt" ? "pt_BR" : "en_US"} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription || "Amaral Law provides expert immigration defense and bond hearing representation. Available 24/7 for ICE detention emergencies."} />
      <meta name="twitter:image" content={fullOgImage} />
      
      {/* Additional SEO Tags */}
      <meta name="author" content="Amaral Law" />
      <meta name="geo.region" content="US-FL" />
      <meta name="geo.placename" content="Fort Lauderdale" />
    </Helmet>
  );
}

// Pre-defined SEO configurations for each page
export const seoConfig = {
  home: {
    title: "Immigration Attorneys & Removal Defense",
    description: "Amaral Law provides expert immigration defense and bond hearing representation. Available 24/7 for ICE detention emergencies. Call 1-844-423-3733 for immediate legal help.",
    keywords: "immigration lawyer, removal defense, ICE detention, immigration bond, deportation defense, Fort Lauderdale immigration attorney",
    canonicalUrl: "/",
  },
  attorneys: {
    title: "Our Attorneys",
    description: "Meet our experienced immigration attorneys specializing in removal defense, asylum cases, and immigration bonds. Dedicated legal team serving clients nationwide.",
    keywords: "immigration attorneys, removal defense lawyers, asylum attorneys, immigration bond lawyers",
    canonicalUrl: "/attorneys",
  },
  contact: {
    title: "Contact Us",
    description: "Contact Amaral Law for immigration legal assistance. Located in Fort Lauderdale, FL. Available 24/7 for emergencies. Call 1-844-423-3733 or WhatsApp (619) 867-1707.",
    keywords: "contact immigration lawyer, immigration attorney Fort Lauderdale, immigration legal help",
    canonicalUrl: "/contact",
  },
  consultation: {
    title: "Request Consultation",
    description: "Schedule a consultation with our immigration attorneys. Get expert legal advice for removal defense, asylum, bond hearings, and family petitions.",
    keywords: "immigration consultation, legal consultation, immigration lawyer appointment",
    canonicalUrl: "/consultation",
  },
  bondQuestionnaire: {
    title: "Bond Questionnaire",
    description: "Complete our immigration bond questionnaire to help prepare your case. Gather essential information for your bond hearing representation.",
    keywords: "immigration bond questionnaire, bond hearing preparation, ICE bond",
    canonicalUrl: "/bond-questionnaire",
  },
  detention: {
    title: "ICE Detention Information",
    description: "Learn about ICE detention, your rights when detained, and how to get legal help. Immediate assistance available 24/7 for detained individuals and families.",
    keywords: "ICE detention, immigration detention, detained by ICE, detention rights",
    canonicalUrl: "/detention",
  },
  faq: {
    title: "Frequently Asked Questions",
    description: "Find answers to common immigration questions about bonds, asylum, deportation defense, and more. Expert guidance from Amaral Law attorneys.",
    keywords: "immigration FAQ, immigration questions, bond FAQ, asylum questions",
    canonicalUrl: "/faq",
  },
  detentionProcess: {
    title: "ICE Detention Process",
    description: "Understand the ICE detention process step-by-step. Learn what happens after arrest, bond hearings, and how to secure release from immigration detention.",
    keywords: "ICE detention process, immigration arrest, bond hearing process, detention timeline",
    canonicalUrl: "/detention-process",
  },
  resources: {
    title: "Immigration Resources",
    description: "Access essential immigration resources including ICE detainee locator, EOIR case status, bond payment systems, and detention facility information.",
    keywords: "immigration resources, ICE locator, EOIR case status, immigration tools",
    canonicalUrl: "/resources",
  },
  sponsorGuide: {
    title: "Court Sponsor Guide",
    description: "Complete guide for immigration bond sponsors. Learn sponsor qualifications, financial requirements, and what judges look for in bond hearings.",
    keywords: "immigration sponsor, bond sponsor guide, sponsor requirements, bond hearing sponsor",
    canonicalUrl: "/sponsor-guide",
  },
  downloads: {
    title: "Downloadable Guides",
    description: "Download free immigration guides, checklists, and resources. Prepare for bond hearings, understand your rights, and gather required documents.",
    keywords: "immigration downloads, legal guides, bond checklist, immigration forms",
    canonicalUrl: "/downloads",
  },
  familyEmergencyPlan: {
    title: "Family Emergency Plan",
    description: "Create a family emergency plan for potential ICE encounters. Protect your family with prepared contacts, documents, and action steps.",
    keywords: "ICE emergency plan, family protection, immigration emergency, ICE raid preparation",
    canonicalUrl: "/family-emergency-plan",
  },
  appointments: {
    title: "Schedule Appointment",
    description: "Book an appointment with Amaral Law immigration attorneys. In-person, phone, or video consultations available for your convenience.",
    keywords: "immigration appointment, lawyer appointment, legal consultation booking",
    canonicalUrl: "/appointments",
  },
  services: {
    title: "Practice Areas",
    description: "Explore our immigration law practice areas including removal defense, asylum, family petitions, bond hearings, crimmigration, and federal litigation.",
    keywords: "immigration services, practice areas, removal defense, asylum, family petitions",
    canonicalUrl: "/services",
  },
  bondDocumentChecklist: {
    title: "Bond Document Checklist",
    description: "Complete checklist of documents needed for immigration bond hearings. Prepare your case with our comprehensive document guide.",
    keywords: "bond documents, immigration bond checklist, bond hearing documents",
    canonicalUrl: "/bond-document-checklist",
  },
  sponsorLetterGenerator: {
    title: "Sponsor Letter Generator",
    description: "Generate professional sponsor support letters for immigration bond hearings. Easy-to-use tool for sponsors to create compelling letters.",
    keywords: "sponsor letter, immigration support letter, bond hearing letter",
    canonicalUrl: "/sponsor-letter-generator",
  },
  sponsorDocuments: {
    title: "Upload Sponsor Documents",
    description: "Securely upload sponsor financial documents for immigration bond hearings. Submit pay stubs, tax returns, and housing documents online.",
    keywords: "sponsor documents, upload documents, bond hearing documents, financial documents",
    canonicalUrl: "/sponsor-documents",
  },
  characterLetter: {
    title: "Character Reference Letter",
    description: "Write a character reference letter for immigration bond hearings. Help support your friend or family member's case with a compelling letter.",
    keywords: "character letter, reference letter, immigration support letter, bond hearing letter",
  },
  knowledgeCenter: {
    title: "Knowledge Center",
    description: "Immigration law articles, guides, and legal insights from Amaral Law. Stay informed about immigration policies and your legal rights.",
    keywords: "immigration articles, legal insights, immigration news, legal guides",
    canonicalUrl: "/knowledge-center",
  },
  // Service pages
  removalDefense: {
    title: "Removal Defense",
    description: "Expert removal defense representation in immigration court. Fight deportation with experienced attorneys who understand immigration law.",
    keywords: "removal defense, deportation defense, immigration court, stop deportation",
    canonicalUrl: "/services/removal-defense",
  },
  asylum: {
    title: "Asylum & Humanitarian Relief",
    description: "Asylum application assistance and humanitarian relief representation. Protect your right to safety with experienced asylum attorneys.",
    keywords: "asylum lawyer, asylum application, humanitarian relief, refugee protection",
    canonicalUrl: "/services/asylum",
  },
  familyPetitions: {
    title: "Family Petitions",
    description: "Family-based immigration petitions and green card applications. Reunite with your loved ones through proper immigration channels.",
    keywords: "family petition, green card, family immigration, spouse visa",
    canonicalUrl: "/services/family-petitions",
  },
  bondHearings: {
    title: "Immigration Bond Hearings",
    description: "Aggressive representation in immigration bond hearings. Fight for release from ICE detention with experienced bond attorneys.",
    keywords: "immigration bond, bond hearing, ICE bond, detention release",
    canonicalUrl: "/services/bond-hearings",
  },
  crimmigration: {
    title: "Crimmigration Defense",
    description: "Defense for non-citizens facing criminal charges. Protect your immigration status with attorneys who understand both criminal and immigration law.",
    keywords: "crimmigration, criminal immigration, deportation defense, criminal charges immigration",
    canonicalUrl: "/services/crimmigration",
  },
  federalLitigation: {
    title: "Federal Litigation",
    description: "Federal court litigation for immigration cases. Challenge USCIS denials, delays, and unlawful detention in federal court.",
    keywords: "federal litigation, immigration lawsuit, USCIS lawsuit, mandamus",
    canonicalUrl: "/services/federal-litigation",
  },
  // Admin pages (noIndex)
  adminDashboard: {
    title: "Admin Dashboard",
    description: "Administrative dashboard for Amaral Law case management.",
    noIndex: true,
  },
  adminCharacterLetters: {
    title: "Character Letters Admin",
    description: "Manage character reference letter submissions.",
    noIndex: true,
  },
  adminSponsorDocuments: {
    title: "Sponsor Documents Admin",
    description: "Manage sponsor document submissions.",
    noIndex: true,
  },
};
