export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  status?: string;
}

// Default is empty until client connects their Google Sheet or posts openings
export const DEFAULT_OPENINGS: JobOpening[] = [];

// Sample reference records preserved for quick activation or local testing
export const SAMPLE_REFERENCE_OPENINGS: JobOpening[] = [
  {
    id: "kam-fmcg",
    title: "Key Account Manager – Modern Trade (FMCG)",
    department: "Commercial & Sales",
    location: "Dubai, UAE",
    type: "Full-time",
    experience: "4–6 Years UAE Experience",
    summary:
      "Drive commercial volume, listing agreements, and Joint Business Planning (JBP) with key national hypermarket and supermarket accounts including Carrefour, Lulu, Union Coop, and West Zone.",
    responsibilities: [
      "Manage tier-one modern trade accounts, planogram execution, and in-store promotional calendars.",
      "Analyze POS sell-through and SKU velocity to optimize replenishment cycles across store clusters.",
      "Lead commercial trading terms negotiations, promotional rebates, and new SKU listings.",
    ],
    requirements: [
      "Proven track record managing UAE modern trade accounts in FMCG, personal care, or food sectors.",
      "Valid UAE driving license and established commercial relationships with retail buying teams.",
      "Strong analytical skills, commercial numeracy, and presentation fluency.",
    ],
    status: "Active",
  },
  {
    id: "brand-marketing-exec",
    title: "Brand Marketing Executive – Beauty & Personal Care",
    department: "Marketing & Brand Development",
    location: "Dubai, UAE",
    type: "Full-time",
    experience: "3–5 Years Experience",
    summary:
      "Execute omnichannel brand activation, consumer campaigns, in-store merchandising guidelines, and digital brand presence for our international beauty and personal care portfolio.",
    responsibilities: [
      "Coordinate product launches, promotional displays, and retailer co-marketing campaigns.",
      "Manage influencer outreach, localized social media content calendars, and beauty press PR.",
      "Track marketing ROI, brand penetration metrics, and competitor benchmark analysis in the UAE market.",
    ],
    requirements: [
      "Demonstrated marketing experience within beauty, skincare, cosmetics, or FMCG brands in the GCC.",
      "Creative eye for visual merchandising and premium brand storytelling.",
      "Strong bilingual communication (English required; Arabic is an advantage).",
    ],
    status: "Active",
  },
  {
    id: "supply-chain-coord",
    title: "Supply Chain & Logistics Coordinator",
    department: "Supply Chain & Operations",
    location: "Dubai, UAE",
    type: "Full-time",
    experience: "3–5 Years Experience",
    summary:
      "Oversee inbound freight forwarding, customs clearance, warehouse receiving, inventory control, and multi-channel fulfillment across modern trade, general trade, and pharmacy networks in all 7 Emirates.",
    responsibilities: [
      "Coordinate with shipping lines, freight forwarders, and Dubai Customs / DP World for expedited clearance.",
      "Monitor stock holding levels, expiry tracking (FIFO/FEFO), and warehouse dispatch scheduling.",
      "Ensure regulatory compliance documentation for Dubai Municipality and MOHAP inbound shipments.",
    ],
    requirements: [
      "Extensive knowledge of UAE import/export documentation, Mirsal II, and customs protocols.",
      "Proficiency in ERP inventory modules and multi-warehouse stock management.",
      "Experience handling temperature-sensitive personal care, OTC, or FMCG goods.",
    ],
    status: "Active",
  },
  {
    id: "regulatory-specialist",
    title: "Regulatory Affairs Specialist – OTC & Healthcare",
    department: "Regulatory & Compliance",
    location: "Dubai, UAE",
    type: "Full-time",
    experience: "3–6 Years Experience",
    summary:
      "Spearhead product registration dossiers, label assessments, and regulatory approvals with the UAE Ministry of Health and Prevention (MOHAP) and Dubai Municipality (Montaji).",
    responsibilities: [
      "Compile, review, and submit technical dossiers for cosmetic, nutritional, and OTC healthcare products.",
      "Liaise directly with health authorities to expedite product classification and commercial clearance.",
      "Ensure ongoing compliance with regional GSO standards, ingredient bans, and mandatory Arabic labeling.",
    ],
    requirements: [
      "Bachelor's degree in Pharmacy, Biomedical Sciences, Chemistry, or relevant discipline.",
      "Proven direct experience with UAE MOHAP and Dubai Municipality Montaji portals.",
      "Deep understanding of GCC cosmetic regulations and dietary supplement frameworks.",
    ],
    status: "Active",
  },
  {
    id: "food-fmcg-sales",
    title: "Food & Beverage Category Sales Specialist",
    department: "Commercial & Sales",
    location: "Dubai, UAE",
    type: "Full-time",
    experience: "3–5 Years Experience",
    summary:
      "Spearhead distribution expansion for packaged food products, culinary staples, and pantry FMCG across regional cooperative societies, supermarkets, and specialty food retail channels.",
    responsibilities: [
      "Expand distribution footprint for ambient packaged foods and gourmet grocery lines across UAE retail.",
      "Coordinate shelf placement, promotional end-caps, and seasonal tasting activations.",
      "Monitor order fulfillment, credit cycles, and on-shelf availability.",
    ],
    requirements: [
      "Solid background in UAE food & beverage distribution or grocery modern/traditional trade.",
      "Knowledge of food safety norms, retail shelf dynamics, and consumer pantry purchasing behaviors.",
      "Self-driven with strong customer relationship management capability.",
    ],
    status: "Active",
  },
];
