import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Link as LinkIcon, Video } from "lucide-react";
import { Link } from "wouter";

export default function Resources() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Immigration Resources
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Helpful information and resources for immigrants and their families
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-secondary-foreground" />
                </div>
                <CardTitle>ICE Detention Process</CardTitle>
                <CardDescription>
                  Understanding the detention and removal process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn about what happens during ICE detention, your rights, and the steps in the removal process.
                </p>
                <Link href="/faq">
                  <Button variant="link" className="p-0">
                    Learn More →
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <LinkIcon className="w-6 h-6 text-secondary-foreground" />
                </div>
                <CardTitle>Helpful Links</CardTitle>
                <CardDescription>
                  Official government resources and forms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Access USCIS forms, immigration court information, and other official resources.
                </p>
                <Button variant="link" className="p-0">
                  View Links →
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Video className="w-6 h-6 text-secondary-foreground" />
                </div>
                <CardTitle>Blog & News</CardTitle>
                <CardDescription>
                  Latest immigration news and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Stay informed about changes in immigration law and policy that may affect your case.
                </p>
                <Button variant="link" className="p-0">
                  Read Blog →
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Legal Assistance?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't navigate the immigration system alone. Our experienced attorneys are here to help.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Schedule Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
