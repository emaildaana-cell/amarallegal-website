import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BookOpen, FileText, Video, ArrowRight } from "lucide-react";

export default function KnowledgeCenter() {
  const { t } = useLanguage();

  const articles = [
    {
      title: "Understanding the Notice to Appear (NTA)",
      category: "Removal Defense",
      date: "October 15, 2023",
      excerpt: "The Notice to Appear is the document that initiates removal proceedings. Learn what it means and what to check for errors.",
      type: "article"
    },
    {
      title: "How to Prepare for a Bond Hearing",
      category: "Bond Hearings",
      date: "September 28, 2023",
      excerpt: "A guide for sponsors and family members on gathering the necessary evidence to prove flight risk and danger to the community are not issues.",
      type: "guide"
    },
    {
      title: "Asylum Eligibility Requirements Explained",
      category: "Asylum",
      date: "August 10, 2023",
      excerpt: "To qualify for asylum, you must meet the definition of a refugee. We break down the five protected grounds.",
      type: "article"
    },
    {
      title: "Cancellation of Removal for Non-Permanent Residents",
      category: "Relief from Removal",
      date: "July 22, 2023",
      excerpt: "Often called the '10-year law', this form of relief is difficult to win but provides a path to a Green Card.",
      type: "article"
    },
    {
      title: "What to Do If ICE Comes to Your Door",
      category: "Know Your Rights",
      date: "June 05, 2023",
      excerpt: "Essential information on your rights during an encounter with Immigration and Customs Enforcement.",
      type: "guide"
    },
    {
      title: "Recent Changes to Immigration Court Procedures",
      category: "Legal Updates",
      date: "May 18, 2023",
      excerpt: "An overview of the latest policy memorandums and how they affect active removal cases.",
      type: "news"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
              {t("nav.knowledge_center")}
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Legal insights, guides, and news to help you understand the immigration system.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="bg-muted/30 rounded-lg overflow-hidden border border-border/50 flex flex-col md:flex-row">
            <div className="md:w-1/2 relative min-h-[300px]">
              <img 
                src="/images/court-gavel.jpg" 
                alt="Immigration Court" 
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1000";
                }}
              />
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-2 text-sm font-bold text-secondary uppercase tracking-wide">
                <span className="bg-secondary/10 px-2 py-1 rounded">Featured Guide</span>
                <span>•</span>
                <span>Nov 12, 2023</span>
              </div>
              <h2 className="text-3xl font-serif font-bold text-primary">
                Navigating the Immigration Court System: A Step-by-Step Guide
              </h2>
              <p className="text-muted-foreground text-lg">
                From the Master Calendar Hearing to the Individual Hearing, understanding the process is the first step in your defense. This comprehensive guide walks you through what to expect at each stage.
              </p>
              <Button className="self-start">Read Full Guide</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary">Latest Articles</h2>
            <div className="hidden md:flex gap-2">
              <Button variant="outline" size="sm" className="active:bg-primary active:text-primary-foreground">All</Button>
              <Button variant="ghost" size="sm">Removal Defense</Button>
              <Button variant="ghost" size="sm">Asylum</Button>
              <Button variant="ghost" size="sm">Family</Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, i) => (
              <div key={i} className="group flex flex-col h-full border border-border/50 rounded-lg overflow-hidden hover:shadow-md transition-all">
                <div className="h-48 bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded text-xs font-bold uppercase tracking-wide text-primary">
                    {article.category}
                  </div>
                </div>
                <div className="flex-1 p-6 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    {article.type === 'video' ? <Video className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
                    <span>{article.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-1">
                    {article.excerpt}
                  </p>
                  <Button variant="link" className="self-start p-0 h-auto font-bold text-primary group-hover:text-secondary transition-colors">
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
            <div className="relative z-10 space-y-6">
              <BookOpen className="h-12 w-12 mx-auto text-secondary" />
              <h2 className="text-3xl md:text-4xl font-serif font-bold">
                Stay Informed
              </h2>
              <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                Subscribe to our newsletter to receive the latest immigration news, legal updates, and firm announcements directly to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-4">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="flex-1 bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <Button variant="secondary" className="font-bold">Subscribe</Button>
              </div>
              <p className="text-xs text-primary-foreground/50 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
