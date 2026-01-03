import { useState } from "react";
import { attorneys, practiceAreas, locations } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Search, MapPin, Briefcase, Mail, Phone } from "lucide-react";

export default function Attorneys() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const filteredAttorneys = attorneys.filter((attorney) => {
    const matchesSearch = attorney.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          attorney.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = selectedArea === "all" || attorney.practiceAreas.includes(selectedArea);
    const matchesLocation = selectedLocation === "all" || attorney.location === selectedLocation;
    
    return matchesSearch && matchesArea && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-library.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="container relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Attorneys</h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl font-light">
            Distinguished legal minds dedicated to your success. Browse our directory to find the right advocate for your case.
          </p>
        </div>
      </div>

      <div className="container py-12">
        {/* Filters */}
        <div className="bg-card border border-border p-6 rounded-sm shadow-sm mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name..." 
                className="pl-9 bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={selectedArea} onValueChange={setSelectedArea}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Practice Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Practice Areas</SelectItem>
                {practiceAreas.map((area) => (
                  <SelectItem key={area} value={area}>{area}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedArea("all");
                setSelectedLocation("all");
              }}
              className="w-full"
            >
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAttorneys.length > 0 ? (
            filteredAttorneys.map((attorney) => (
              <Card key={attorney.id} className="law-card overflow-hidden group flex flex-col h-full">
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img 
                    src={attorney.image} 
                    alt={attorney.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <Link href={`/attorneys/${attorney.id}`}>
                      <Button className="w-full bg-white text-primary hover:bg-white/90">View Profile</Button>
                    </Link>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-primary">{attorney.name}</h3>
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{attorney.role}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 flex-grow">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    {attorney.location}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {attorney.practiceAreas.slice(0, 2).map((area) => (
                      <span key={area} className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-sm border border-secondary/20">
                        {area}
                      </span>
                    ))}
                    {attorney.practiceAreas.length > 2 && (
                      <span className="text-xs text-muted-foreground py-1">+{attorney.practiceAreas.length - 2} more</span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-0 border-t border-border/50 mt-auto p-4 bg-muted/30">
                  <div className="flex justify-between w-full text-sm">
                    <a href={`mailto:${attorney.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="h-3 w-3" /> Email
                    </a>
                    <a href={`tel:${attorney.phone}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <Phone className="h-3 w-3" /> Call
                    </a>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-serif text-muted-foreground">No attorneys found matching your criteria.</h3>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedArea("all");
                  setSelectedLocation("all");
                }}
                className="mt-2"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
