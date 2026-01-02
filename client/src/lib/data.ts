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
  "Removal Defense",
  "Deportation Appeals",
  "Asylum & Refugee Status",
  "Bond Hearings",
  "Family-Based Petitions",
  "Crimmigration",
  "Federal Litigation"
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
    practiceAreas: ["Removal Defense", "Federal Litigation"],
    location: "Fort Lauderdale, FL",
    image: "/images/attorney-1.jpg",
    email: "j.sterling@amarallegal.com",
    phone: "1-844-262-5442",
    bio: "James Sterling is a fierce advocate for immigrants facing deportation. With over 35 years of experience, he specializes in complex removal defense and federal litigation, fighting to keep families together in the United States.",
    education: ["Harvard Law School, J.D.", "Yale University, B.A."],
    admissions: ["Florida State Bar", "U.S. Supreme Court", "11th Circuit Court of Appeals"],
    publications: ["Strategies for Cancellation of Removal (2023)", "Challenging Notices to Appear (2019)"]
  },
  {
    id: "elena-rodriguez",
    name: "Elena Rodriguez",
    role: "Partner",
    practiceAreas: ["Asylum & Refugee Status", "Deportation Appeals"],
    location: "Miami, FL",
    image: "/images/attorney-2.jpg",
    email: "e.rodriguez@amarallegal.com",
    phone: "1-844-262-5442",
    bio: "Elena Rodriguez is dedicated to protecting those fleeing persecution. She has successfully argued numerous asylum cases and appeals before the Board of Immigration Appeals (BIA).",
    education: ["Stanford Law School, J.D.", "Georgetown University, B.A."],
    admissions: ["Florida State Bar", "Board of Immigration Appeals"],
    publications: ["Asylum Law in the 21st Century (2024)", "Navigating the BIA (2021)"]
  },
  {
    id: "michael-chang",
    name: "Michael Chang",
    role: "Associate",
    practiceAreas: ["Crimmigration", "Bond Hearings"],
    location: "Fort Lauderdale, FL",
    image: "/images/attorney-3.jpg",
    email: "m.chang@amarallegal.com",
    phone: "1-844-262-5442",
    bio: "Michael Chang specializes in the intersection of criminal and immigration law. He fights aggressively for clients in bond hearings to secure their release from detention.",
    education: ["Columbia Law School, J.D.", "NYU, B.A."],
    admissions: ["Florida State Bar", "New York State Bar"],
    publications: ["The Crimmigration Crisis (2023)"]
  },
  {
    id: "sarah-jenkins",
    name: "Sarah Jenkins",
    role: "Senior Counsel",
    practiceAreas: ["Family-Based Petitions", "Removal Defense"],
    location: "West Palm Beach, FL",
    image: "/images/attorney-4.jpg",
    email: "s.jenkins@amarallegal.com",
    phone: "1-844-262-5442",
    bio: "Sarah Jenkins helps families navigate the complex immigration system. She handles family-based petitions, waivers, and defense against removal for non-citizens.",
    education: ["Georgetown Law, J.D.", "University of Virginia, B.A."],
    admissions: ["Florida State Bar", "Virginia Bar"],
    publications: ["Family Unity in Immigration Law (2022)"]
  }
];
