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

// Active openings requested by client
export const DEFAULT_OPENINGS: JobOpening[] = [
  {
    id: "sales-supervisor",
    title: "Sales Supervisor",
    department: "Commercial & Sales",
    location: "Dubai, UAE",
    type: "Full-time",
    experience: "3–5 Years UAE Experience",
    summary:
      "Supervise and lead our FMCG field sales operations across modern trade, cooperative societies, and key retail accounts. Drive daily territory coverage, shelf replenishment, planogram compliance, and achieve monthly volume and distribution targets.",
    responsibilities: [
      "Lead, train, and manage field sales executives and merchandisers across assigned UAE retail sectors.",
      "Ensure 100% on-shelf availability, proper stock rotation (FIFO/FEFO), and prominent promotional displays.",
      "Conduct daily market visits to monitor retailer compliance, stock levels, competitor pricing, and shelf share.",
      "Build and maintain strong commercial relationships with store managers and department supervisors.",
      "Track sales metrics, strike rates, order fulfillment, and prepare weekly territory performance reports.",
    ],
    requirements: [
      "3 to 5 years of proven sales supervisory experience in UAE FMCG (food, personal care, or household goods).",
      "Valid UAE driving license is mandatory.",
      "Strong leadership, territory planning, route-to-market knowledge, and retail negotiation skills.",
      "Fluency in English (Arabic or Hindi/Urdu is an added advantage).",
    ],
    status: "Active",
  },
  {
    id: "assistant-brand-manager",
    title: "Assistant Brand Manager",
    department: "Marketing & Brand Development",
    location: "Dubai, UAE",
    type: "Full-time",
    experience: "2–4 Years Experience",
    summary:
      "Support brand strategy, omnichannel trade activations, and commercial brand growth across assigned international FMCG, personal care, cosmetics, and food portfolios in the UAE and GCC.",
    responsibilities: [
      "Collaborate with brand principals to develop annual marketing calendars, product launches, and seasonal trade activations.",
      "Coordinate with creative agencies and POSM suppliers to produce high-impact in-store promotional displays and end-caps.",
      "Manage influencer campaigns, brand ambassador partnerships, and localized digital media initiatives.",
      "Analyze consumer trends, brand sell-out data, advertising ROI, and competitive market intelligence.",
      "Assist in organizing company participation in major trade exhibitions such as Beautyworld Middle East and Gulfood.",
    ],
    requirements: [
      "Bachelor's degree in Marketing, Business Administration, or a related commercial discipline.",
      "2 to 4 years of hands-on brand marketing or trade marketing experience within the FMCG / beauty / retail sector in the UAE.",
      "Strong creative judgment, visual merchandising acumen, and project management skills.",
      "Excellent written and verbal communication skills in English (Arabic is a strong advantage).",
    ],
    status: "Active",
  },
];

// Additional reference records preserved for future activation
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
];
