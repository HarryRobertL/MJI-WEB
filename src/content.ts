export const services = [
  {
    id: "intelligence",
    number: "01",
    title: "Intelligence and Risk Analysis",
    summary:
      "Every service is underpinned by intelligence and risk analysis, so decisions are made before people move.",
    detail:
      "MJI produces the assessments that shape protective plans, travel, and market entry in elevated threat environments.",
    scope: [
      "Threat and risk assessment (TARA) reports",
      "Country and regional risk assessments",
      "Security risk intelligence briefs",
      "Political and geopolitical analysis",
      "Event risk forecasting",
      "Travel risk advisory",
      "Crisis early-warning monitoring",
      "Protective intelligence",
    ],
  },
  {
    id: "protective-services",
    number: "02",
    title: "Protective Services",
    summary:
      "Discreet protection for executives, families, events, and high-value assets at home and abroad.",
    detail:
      "Close protection is paired with secure travel, logistics, and residential security for clients who need a low-visibility footprint.",
    scope: [
      "Executive protection, domestic and international",
      "Close protection teams",
      "Secure travel management",
      "Secure logistics and route planning",
      "High-value asset protection",
      "Event security management",
      "Maritime and aviation protective support",
      "Discreet residential security for UHNW clients",
    ],
  },
  {
    id: "consultancy",
    number: "03",
    title: "Consultation and Advisory",
    summary:
      "Security strategy, programme design, and duty-of-care frameworks for organisations with complex risk profiles.",
    detail:
      "Advice is bespoke. Plans are designed around the client, the site, and the operation, not a standing package.",
    scope: [
      "Security strategy development",
      "Security programme design",
      "Corporate duty-of-care frameworks",
      "Site security reviews",
      "Security governance and policy",
      "Vendor audits",
      "Red teaming and penetration testing",
      "Risk audits and gap analysis",
    ],
  },
  {
    id: "training",
    number: "04",
    title: "Training and Capability Development",
    summary:
      "Practical preparation for people who travel, lead, or live with elevated risk.",
    detail:
      "Courses are built for the environment the client actually faces, from hostile-environment awareness to trauma first response.",
    scope: [
      "Hostile Environment Awareness Training (HEAT)",
      "Travel safety courses",
      "Crisis management and leadership workshops",
      "Residential security for UHNW families",
      "Medical and trauma first response",
      "Protest management",
    ],
  },
  {
    id: "crisis-response",
    number: "05",
    title: "Crisis Response and Incident Management",
    summary:
      "Preparedness and response when an incident threatens people, assets, or the continuity of an operation.",
    detail:
      "Teams plan for evacuation, extraction, and family liaison, then review what happened so the next plan is tighter.",
    scope: [
      "Crisis risk management consultancy",
      "Kidnap and ransom preparedness",
      "Incident response teams",
      "Evacuation and extraction planning",
      "Hostile incident management",
      "Business continuity advisory",
      "Family liaison support",
      "Post-incident review",
    ],
  },
  {
    id: "specialised",
    number: "06",
    title: "Specialised Services",
    summary:
      "Support for remote sites, market entry, and technical security where the risk sits outside a standard programme.",
    detail:
      "This work covers energy and mining sites, secure compounds, and intelligence support for organisations entering frontier markets.",
    scope: [
      "High-risk site security design",
      "Remote site protection for energy and mining",
      "Secure compound establishment",
      "Intelligence support for market entry",
      "Counter-surveillance",
      "Technical security sweeps with TSCM partners",
    ],
  },
] as const;

export type Service = (typeof services)[number];

export const audiences = [
  {
    title: "Multinational corporations",
    text: "Defence, energy, mining, critical national infrastructure, and finance.",
  },
  {
    title: "UHNW and family offices",
    text: "Discreet protection for families, residences, and private travel.",
  },
  {
    title: "NGOs and humanitarian teams",
    text: "Duty of care for people working in unstable environments.",
  },
  {
    title: "Investors and media",
    text: "Private equity entering frontier markets, and crews in conflict zones.",
  },
  {
    title: "Government and executives",
    text: "Quasi-government entities, high-profile executives, and principals.",
  },
] as const;

export const values = [
  "Discretion",
  "Integrity",
  "Precision",
  "Professional mastery",
  "Duty of care",
  "Client-first mindset",
] as const;

export const personnel = [
  "Tier 1 and 2 military veterans",
  "Former government security and intelligence officers",
  "Specialist medics",
  "Analysts",
  "Personal and close protection officers",
  "Regional subject-matter experts",
] as const;

export const clients = [
  {
    id: "corporates",
    name: "Multinational corporations",
    note: "Defence, energy, mining, critical national infrastructure, and finance organisations exposed to elevated threat environments.",
    places: ["Defence", "Energy", "Mining", "Critical national infrastructure", "Finance"],
  },
  {
    id: "uhnw",
    name: "UHNW and family offices",
    note: "Discreet residential security, private travel, and close protection for families who require a low-visibility footprint.",
    places: ["Family offices", "Private residences", "Private travel"],
  },
  {
    id: "ngo",
    name: "NGOs and humanitarian workers",
    note: "Protection and travel risk support for people operating where instability is part of the work.",
    places: ["Humanitarian programmes", "Field teams"],
  },
  {
    id: "investors",
    name: "Private equity and investors",
    note: "Intelligence support for market entry and protective planning for organisations moving into frontier markets.",
    places: ["Frontier markets", "Market entry"],
  },
  {
    id: "media",
    name: "Media and film crews",
    note: "Journey planning, protective escorts, and crisis contingencies for crews working in conflict zones.",
    places: ["Conflict zones", "Productions"],
  },
  {
    id: "government",
    name: "Government and principals",
    note: "Security for government and quasi-government entities, government contractors, and high-profile executives.",
    places: ["Government contractors", "Executives", "Principals"],
  },
] as const;

export const contact = {
  address: ["45 Albemarle Street", "3rd Floor", "Mayfair", "London", "W1S 4JL", "United Kingdom"],
  phone: "+44 20 4615 6710",
  phoneHref: "tel:+442046156710",
  email: "info@mckenziejonesinternational.com",
  emailHref: "mailto:info@mckenziejonesinternational.com",
} as const;

/** Fill placeholders before launch. Search for `[COMPANY` to find them. */
export const company = {
  registeredName: "McKenzie Jones International Ltd",
  companyNumber: "[COMPANY NUMBER]",
  placeOfRegistration: "England and Wales",
  registeredOffice: [
    "45 Albemarle Street",
    "3rd Floor",
    "Mayfair",
    "London",
    "W1S 4JL",
    "United Kingdom",
  ],
} as const;

/** Empty until real accreditations or case outcomes are supplied. */
export const credentials: ReadonlyArray<{ title: string; detail?: string }> = [];

export const navItems = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#clients", label: "Clients" },
  { href: "#contact", label: "Contact" },
] as const;

export const siteUrl = "https://mji-web.vercel.app";
