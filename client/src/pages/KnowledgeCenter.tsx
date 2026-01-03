import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Search, BookOpen, ChevronRight } from "lucide-react";



import { useLanguage } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";

export default function KnowledgeCenter() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const guides = [
    {
      id: 1,
      title: t("guide.1.title"),
      category: "Corporate Law",
      description: t("guide.1.desc"),
      date: "Oct 12, 2025",
      readTime: "15 min read"
    },
    {
      id: 2,
      title: t("guide.2.title"),
      category: "Estate Planning",
      description: t("guide.2.desc"),
      date: "Sep 28, 2025",
      readTime: "10 min read"
    },
    {
      id: 3,
      title: t("guide.3.title"),
      category: "Intellectual Property",
      description: t("guide.3.desc"),
      date: "Sep 15, 2025",
      readTime: "12 min read"
    },
    {
      id: 4,
      title: t("guide.4.title"),
      category: "Real Estate",
      description: t("guide.4.desc"),
      date: "Aug 30, 2025",
      readTime: "8 min read"
    },
    {
      id: 5,
      title: t("guide.5.title"),
      category: "Tax Law",
      description: t("guide.5.desc"),
      date: "Aug 10, 2025",
      readTime: "20 min read"
    },
    {
      id: 6,
      title: t("guide.6.title"),
      category: "Family Law",
      description: t("guide.6.desc"),
      date: "Jul 22, 2025",
      readTime: "7 min read"
    }
  ];

  const resources = [
    {
      title: t("resource.1.title"),
      type: "PDF Guide",
      size: "2.4 MB"
    },
    {
      title: t("resource.2.title"),
      type: "PDF Form",
      size: "1.1 MB"
    },
    {
      title: t("resource.3.title"),
      type: "Excel Template",
      size: "0.8 MB"
    },
    {
      title: t("resource.4.title"),
      type: "PDF Reference",
      size: "1.5 MB"
    }
  ];

  const filteredGuides = guides.filter(guide => 
    guide.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    guide.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        titleKey="seo.knowledge.title"
        descriptionKey="seo.knowledge.desc"
      />
      {/* Hero Section */}
      <div className="bg-secondary text-secondary-foreground py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-library.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{t("knowledge.title")}</h1>
          <p className="text-lg md:text-xl text-secondary-foreground/80 max-w-2xl font-light">
            {t("knowledge.subtitle")}
          </p>
        </div>
      </div>

      <div className="container py-12">
        <Tabs defaultValue="guides" className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="guides" className="font-serif">{t("knowledge.tab.guides")}</TabsTrigger>
              <TabsTrigger value="resources" className="font-serif">{t("knowledge.tab.resources")}</TabsTrigger>
            </TabsList>
            
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder={t("knowledge.search")}
                className="pl-9 bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <TabsContent value="guides" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) => (
                <Card key={guide.id} className="law-card group cursor-pointer hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-1 rounded-sm">
                        {guide.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{guide.readTime}</span>
                    </div>
                    <CardTitle className="font-serif text-xl group-hover:text-primary transition-colors">
                      {guide.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {guide.description}
                    </p>
                  </CardContent>
                  <CardFooter className="border-t border-border/50 pt-4 mt-auto">
                    <div className="flex justify-between items-center w-full">
                      <span className="text-xs text-muted-foreground">{guide.date}</span>
                      <span className="text-sm font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        {t("knowledge.read_article")} <ChevronRight className="h-4 w-4" />
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            {filteredGuides.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t("knowledge.no_results")}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <Card key={index} className="law-card flex flex-row items-center p-6 gap-6 hover:bg-muted/10 transition-colors">
                  <div className="bg-primary/10 p-4 rounded-sm shrink-0">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-serif text-lg font-bold mb-1">{resource.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{resource.type}</span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/50"></span>
                      <span>{resource.size}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="icon" className="shrink-0 hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Download className="h-5 w-5" />
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Newsletter CTA */}
        <div className="mt-20 bg-primary text-primary-foreground rounded-sm p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10">
            <BookOpen className="h-64 w-64" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-serif text-3xl font-bold mb-4">{t("knowledge.newsletter.title")}</h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              {t("knowledge.newsletter.desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input 
                placeholder={t("knowledge.newsletter.placeholder")}
                className="bg-primary-foreground text-primary placeholder:text-primary/50 border-none h-12"
              />
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-serif h-12 px-8">
                {t("knowledge.newsletter.button")}
              </Button>
            </div>
            <p className="text-xs text-primary-foreground/60 mt-4">
              {t("knowledge.newsletter.disclaimer")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
