import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

export default function ClientPortal() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Client Portal
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Access your case information, documents, and communicate securely with our team.
          </p>
        </div>
      </section>

      {/* Login Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle>Secure Client Login</CardTitle>
              <CardDescription>
                Enter your credentials to access your case portal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Sign In
                </Button>

                <div className="text-center space-y-2">
                  <a href="#" className="text-sm text-primary hover:underline block">
                    Forgot Password?
                  </a>
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <a href="/contact" className="text-primary hover:underline">
                      Contact us
                    </a>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              For security purposes, please contact our office if you need assistance accessing your portal.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
