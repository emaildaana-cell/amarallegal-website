import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";

interface SEOProps {
  titleKey?: string;
  descriptionKey?: string;
  keywordsKey?: string;
  title?: string;
  description?: string;
  keywords?: string;
}

export default function SEO({ titleKey, descriptionKey, keywordsKey, title, description, keywords }: SEOProps) {
  const { t, language } = useLanguage();

  const siteTitle = "Amaral Law";
  const pageTitle = titleKey ? t(titleKey) : title;
  const metaDescription = descriptionKey ? t(descriptionKey) : description;
  const metaKeywords = keywordsKey ? t(keywordsKey) : keywords;

  const fullTitle = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle;

  return (
    <Helmet>
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription || "Amaral Law - Experts in Removal Defense and Immigration Law"} />
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription || "Amaral Law - Experts in Removal Defense and Immigration Law"} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription || "Amaral Law - Experts in Removal Defense and Immigration Law"} />
    </Helmet>
  );
}
