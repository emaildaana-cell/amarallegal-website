export interface Attorney {
  id: string;
  name: string;
  role: string;
  practiceAreas: string[];
  location: string;
  image: string;
  email: string;
  phone: string;
  bio: string;
  education: string[];
  admissions: string[];
  publications: string[];
}

export const practiceAreas = [
  "Corporate Litigation",
  "Intellectual Property",
  "Real Estate Law",
  "Estate Planning",
  "Criminal Defense",
  "Family Law",
  "Tax Law"
];

export const locations = [
  "Fort Lauderdale, FL",
  "Miami, FL",
  "West Palm Beach, FL"
];

export const attorneys: Attorney[] = [
  {
    id: "james-sterling",
    name: "James Sterling",
    role: "Senior Partner",
    practiceAreas: ["Corporate Litigation", "Tax Law"],
    location: "Fort Lauderdale, FL",
    image: "/images/attorney-1.jpg",
    email: "j.sterling@amarallaw.com",
    phone: "1-844-262-5442",
    bio: "James Sterling has over 35 years of experience in high-stakes corporate litigation. He has successfully represented Fortune 500 companies in complex commercial disputes.",
    education: ["Harvard Law School, J.D.", "Yale University, B.A."],
    admissions: ["Florida State Bar", "U.S. Supreme Court"],
    publications: ["The Future of Corporate Liability (2023)", "Tax Shelters and the Law (2019)"]
  },
  {
    id: "elena-rodriguez",
    name: "Elena Rodriguez",
    role: "Partner",
    practiceAreas: ["Intellectual Property", "Corporate Litigation"],
    location: "Miami, FL",
    image: "/images/attorney-2.jpg",
    email: "e.rodriguez@amarallaw.com",
    phone: "1-844-262-5442",
    bio: "Elena Rodriguez specializes in patent law and trademark disputes. She brings a unique background in engineering to her legal practice.",
    education: ["Stanford Law School, J.D.", "MIT, B.S. Engineering"],
    admissions: ["Florida State Bar", "USPTO Registered Patent Attorney"],
    publications: ["Protecting AI Innovations (2024)", "Global Trademark Strategies (2021)"]
  },
  {
    id: "michael-chang",
    name: "Michael Chang",
    role: "Associate",
    practiceAreas: ["Real Estate Law", "Estate Planning"],
    location: "Fort Lauderdale, FL",
    image: "/images/attorney-3.jpg",
    email: "m.chang@amarallaw.com",
    phone: "1-844-262-5442",
    bio: "Michael Chang focuses on commercial real estate transactions and high-net-worth estate planning. He is known for his meticulous attention to detail.",
    education: ["Columbia Law School, J.D.", "NYU, B.A."],
    admissions: ["Florida State Bar", "New York State Bar"],
    publications: ["Commercial Leasing Trends (2023)"]
  },
  {
    id: "sarah-jenkins",
    name: "Sarah Jenkins",
    role: "Senior Counsel",
    practiceAreas: ["Family Law", "Estate Planning"],
    location: "West Palm Beach, FL",
    image: "/images/attorney-4.jpg",
    email: "s.jenkins@amarallaw.com",
    phone: "1-844-262-5442",
    bio: "Sarah Jenkins is a compassionate advocate with decades of experience in family law and estate administration. She guides families through their most challenging times.",
    education: ["Georgetown Law, J.D.", "University of Virginia, B.A."],
    admissions: ["Florida State Bar", "Virginia Bar", "Maryland Bar"],
    publications: ["Modern Family Structures and the Law (2022)"]
  }
];
