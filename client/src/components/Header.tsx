import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { APP_TITLE } from "@/const";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const servicePages = [
    { name: "All Services", href: "/services" },
    { name: "Immigration Bonds", href: "/services/immigration-bonds" },
    { name: "Citizenship & Naturalization", href: "/services/citizenship" },
    { name: "ICE Detention Representation", href: "/services/ice-detention" },
    { name: "Court Relief Options", href: "/services/court-relief" },
    { name: "Removal Defense", href: "/services/removal-defense" },
    { name: "DACA", href: "/services/daca" },
    { name: "Asylum", href: "/services/asylum" },
  ];

  const resourcePages = [
    { name: "All Resources", href: "/resources" },
    { name: "ICE Detention Process", href: "/resources/ice-detention" },
    { name: "FAQ", href: "/faq" },
    { name: "Blog & News", href: "/resources/blog" },
  ];

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="text-xl md:text-2xl font-bold cursor-pointer">
              {APP_TITLE.split(" - ")[0]}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/">
              <a
                className={`text-sm font-medium hover:text-secondary transition-colors ${
                  location === "/" ? "text-secondary" : ""
                }`}
              >
                Home
              </a>
            </Link>

            <Link href="/about">
              <a
                className={`text-sm font-medium hover:text-secondary transition-colors ${
                  location === "/about" ? "text-secondary" : ""
                }`}
              >
                About
              </a>
            </Link>

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center text-sm font-medium hover:text-secondary transition-colors">
                  Services
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card text-card-foreground">
                {servicePages.map((page) => (
                  <DropdownMenuItem key={page.name} asChild>
                    <Link href={page.href}>
                      <a className="w-full cursor-pointer">{page.name}</a>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Resources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center text-sm font-medium hover:text-secondary transition-colors">
                  Resources
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card text-card-foreground">
                {resourcePages.map((page) => (
                  <DropdownMenuItem key={page.name} asChild>
                    <Link href={page.href}>
                      <a className="w-full cursor-pointer">{page.name}</a>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/contact">
              <a
                className={`text-sm font-medium hover:text-secondary transition-colors ${
                  location === "/contact" ? "text-secondary" : ""
                }`}
              >
                Contact Us
              </a>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/client-portal">
              <a className="text-xs font-medium hover:text-secondary transition-colors">
                Client Portal
              </a>
            </Link>
            <div className="flex items-center space-x-1">
              <button className="text-sm hover:text-secondary transition-colors" title="English">
                🇺🇸
              </button>
              <button className="text-sm hover:text-secondary transition-colors" title="Português">
                🇧🇷
              </button>
              <button className="text-sm hover:text-secondary transition-colors" title="Español">
                🇪🇸
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-3">
            <Link href="/">
              <a
                className={`block text-sm font-medium hover:text-secondary transition-colors ${
                  location === "/" ? "text-secondary" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
            </Link>

            <Link href="/about">
              <a
                className={`block text-sm font-medium hover:text-secondary transition-colors ${
                  location === "/about" ? "text-secondary" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
            </Link>

            {/* Mobile Services */}
            <div>
              <button
                className="flex items-center justify-between w-full text-sm font-medium hover:text-secondary transition-colors"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              {servicesOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  {servicePages.map((page) => (
                    <Link key={page.name} href={page.href}>
                      <a
                        className="block text-sm hover:text-secondary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {page.name}
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Resources */}
            <div>
              <button
                className="flex items-center justify-between w-full text-sm font-medium hover:text-secondary transition-colors"
                onClick={() => setResourcesOpen(!resourcesOpen)}
              >
                Resources
                <ChevronDown className={`w-4 h-4 transition-transform ${resourcesOpen ? "rotate-180" : ""}`} />
              </button>
              {resourcesOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  {resourcePages.map((page) => (
                    <Link key={page.name} href={page.href}>
                      <a
                        className="block text-sm hover:text-secondary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {page.name}
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/contact">
              <a
                className={`block text-sm font-medium hover:text-secondary transition-colors ${
                  location === "/contact" ? "text-secondary" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </a>
            </Link>

            <Link href="/client-portal">
              <a
                className="block text-sm font-medium hover:text-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Client Portal
              </a>
            </Link>

            <div className="flex items-center justify-center space-x-4 pt-2">
              <button className="text-lg hover:text-secondary transition-colors" title="English">
                🇺🇸
              </button>
              <button className="text-lg hover:text-secondary transition-colors" title="Português">
                🇧🇷
              </button>
              <button className="text-lg hover:text-secondary transition-colors" title="Español">
                🇪🇸
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
