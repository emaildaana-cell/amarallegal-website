import { APP_TITLE } from "@/const";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              {APP_TITLE.split(" - ")[0]}
            </h3>
            <p className="text-sm text-primary-foreground/80">
              Dedicated to defending the rights of individuals in immigration
              detention proceedings.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">
                  <a className="hover:text-secondary transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="hover:text-secondary transition-colors">
                    About
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="hover:text-secondary transition-colors">
                    Services
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  <a className="hover:text-secondary transition-colors">FAQ</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="hover:text-secondary transition-colors">
                    Contact Us
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <a href="tel:+13055759531" className="block mb-4">
              <Button variant="destructive" size="lg" className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                24/7 Emergency: (305) 575-9531
              </Button>
            </a>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <Phone className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                <span>(305) 575-9531</span>
              </li>
              <li className="flex items-start">
                <Mail className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                <span>ap@amarallegal.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                <span>
                  6750 N. Andrews Avenue
                  <br />
                  Suite 208
                  <br />
                  Fort Lauderdale, FL 33309
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>
            © {new Date().getFullYear()} Amaral Law LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
