export interface ReportMetric {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  progress?: number;
  status?: "success" | "warning" | "error" | "info";
}

export interface ReportSection {
  title: string;
  metrics: ReportMetric[];
}

export interface ReportData {
  slug: string;
  category: string;
  title: string;
  description: string;
  sections: ReportSection[];
}

export interface ReportSubCategory {
  subCategoryName: string;
  subCategoryLink: string;
}

export interface ReportCategoryGroup {
  categoryName: string;
  subCategories: ReportSubCategory[];
}

export interface ListedReport {
  reportUrlLink: string;
  reportTitle: string;
  reportDesc: string;
  reportWebImage: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export const categories: ReportCategoryGroup[] = [
  {
    categoryName: "Industries",
    subCategories: [
      {
        subCategoryName: "Aerospace & Defnce",
        subCategoryLink: "aerospace-and-defence",
      },
      {
        subCategoryName: "Automotive & Transportation",
        subCategoryLink: "automotive-and0transportation",
      },
      {
        subCategoryName: "Chemicals & Materails",
        subCategoryLink: "chemicals-and-materails",
      },
    ],
  },
  {
    categoryName: "Health Care",
    subCategories: [
      {
        subCategoryName: "Ayurveda",
        subCategoryLink: "ayurveda",
      },
      {
        subCategoryName: "Allopathy",
        subCategoryLink: "allopathy",
      },
    ],
  },
  {
    categoryName: "Speciality & Fine Chemicals",
    subCategories: [
      {
        subCategoryName: "Catalyst & Enzymes",
        subCategoryLink: "catalyst-end-enzymes",
      },
    ],
  },
];

export const reportsList: ListedReport[] = [
  {
    reportUrlLink:
      "military-aircraft-modernization-market-size-share-trends-growth-forecast-and-competitive-analysis-2025-2030",
    reportTitle:
      "MILITARY AIRCRAFT MODERNIZATION MARKET – SIZE, SHARE, TRENDS, GROWTH FORECAST, AND COMPETITIVE ANALYSIS (2025-2030) Report Heading",
    reportDesc:
      "The Military Aircraft Modernization Market is segmented by Aircraft Type (Fighter jets, Transport Aircraft, Attack Helicopters, Transport/Utility Helicopters, Bombers, Special Mission Aircraft), by Customer Type (U.S Air force, Navy/Marine Corps, Army Aviation, Europe (NATO Allies), Asia Pacific Allies, Middle East FMS, Latin America & ROW, Government Depots In-House, Commercial Contractors), by Contract Value Band (Mega Programs, Large Medium , Small), by Supply Chain Tier (Tier 1,Tier 2,Tier 3,Tier 4), by Platform Age (50+ Years Old, 30-49 Years Old, 20-29 Years Old, 10-19 Years Old, <10 Years Old), by Geography (North America, Europe, Asia-Pacific, Middle East, Africa and Latin America).",
    reportWebImage: `${API_BASE}/uploaddata/reports/b1f3b63b-5477-40f1-89ed-75952c0dd9da.png`,
  },
  {
    reportUrlLink:
      "global-electric-vehicle-market-size-share-trends-growth-forecast-and-competitive-analysis-2025-2030",
    reportTitle:
      "GLOBAL ELECTRIC VEHICLE MARKET – SIZE, SHARE, TRENDS, GROWTH FORECAST, AND COMPETITIVE ANALYSIS (2025-2030)",
    reportDesc:
      "The Global Electric Vehicle Market is segmented by Vehicle Type (Battery Electric Vehicles, Plug-in Hybrid Electric Vehicles, Fuel Cell Electric Vehicles), by Component (Battery, Motor, Charging Infrastructure, Power Electronics), by Vehicle Class (Economy, Mid-Range, Luxury), by End User (Private, Commercial, Government), by Charging Type (AC Charging, DC Fast Charging), by Geography (North America, Europe, Asia-Pacific, Middle East, Africa and Latin America).",
    reportWebImage: `${API_BASE}/uploaddata/reports/a2c4d75e-6388-41g2-90fe-86063d1ee8eb.png`,
  },
  {
    reportUrlLink:
      "global-cybersecurity-market-size-share-trends-growth-forecast-and-competitive-analysis-2025-2030",
    reportTitle:
      "GLOBAL CYBERSECURITY MARKET – SIZE, SHARE, TRENDS, GROWTH FORECAST, AND COMPETITIVE ANALYSIS (2025-2030)",
    reportDesc:
      "The Global Cybersecurity Market is segmented by Component (Solutions, Services), by Deployment (Cloud, On-Premise), by Organization Size (SMEs, Large Enterprises), by Security Type (Network Security, Endpoint Security, Application Security, Cloud Security, Identity & Access Management), by Industry Vertical (BFSI, Healthcare, IT & Telecom, Retail, Government, Defense), by Geography (North America, Europe, Asia-Pacific, Middle East, Africa and Latin America).",
    reportWebImage: `${API_BASE}/uploaddata/reports/c3e5f86f-7499-42h3-91gf-97174e2ff9fc.png`,
  },
  {
    reportUrlLink:
      "pharmaceutical-drug-delivery-market-size-share-trends-growth-forecast-and-competitive-analysis-2025-2030",
    reportTitle:
      "PHARMACEUTICAL DRUG DELIVERY MARKET – SIZE, SHARE, TRENDS, GROWTH FORECAST, AND COMPETITIVE ANALYSIS (2025-2030)",
    reportDesc:
      "The Pharmaceutical Drug Delivery Market is segmented by Route of Administration (Oral, Injectable, Topical, Pulmonary, Transdermal, Nasal), by Device Type (Prefilled Syringes, Auto-Injectors, Inhalers, Infusion Pumps, Transdermal Patches), by Therapeutic Area (Oncology, Diabetes, Cardiovascular, CNS, Infectious Diseases), by End User (Hospitals, Clinics, Home Care), by Geography (North America, Europe, Asia-Pacific, Middle East, Africa and Latin America).",
    reportWebImage: `${API_BASE}/uploaddata/reports/d4f6g97g-8500-43i4-92hg-08285f3gg0gd.png`,
  },
  {
    reportUrlLink:
      "renewable-energy-storage-market-size-share-trends-growth-forecast-and-competitive-analysis-2025-2030",
    reportTitle:
      "RENEWABLE ENERGY STORAGE MARKET – SIZE, SHARE, TRENDS, GROWTH FORECAST, AND COMPETITIVE ANALYSIS (2025-2030)",
    reportDesc:
      "The Renewable Energy Storage Market is segmented by Technology (Lithium-Ion Batteries, Flow Batteries, Compressed Air Energy Storage, Pumped Hydro Storage, Flywheel Energy Storage), by Application (Grid-Scale, Residential, Commercial & Industrial), by Energy Source (Solar, Wind, Hydro), by Ownership (Utility-Owned, Customer-Owned, Third-Party Owned), by Geography (North America, Europe, Asia-Pacific, Middle East, Africa and Latin America).",
    reportWebImage: `${API_BASE}/uploaddata/reports/e5g7h08h-9611-44j5-93ih-19396g4hh1he.png`,
  },
  {
    reportUrlLink:
      "global-artificial-intelligence-healthcare-market-size-share-trends-growth-forecast-and-competitive-analysis-2025-2030",
    reportTitle:
      "GLOBAL ARTIFICIAL INTELLIGENCE IN HEALTHCARE MARKET – SIZE, SHARE, TRENDS, GROWTH FORECAST, AND COMPETITIVE ANALYSIS (2025-2030)",
    reportDesc:
      "The Global AI in Healthcare Market is segmented by Component (Hardware, Software, Services), by Technology (Machine Learning, Natural Language Processing, Computer Vision, Robotics), by Application (Medical Imaging, Drug Discovery, Clinical Trials, Virtual Assistants, Wearables), by End User (Hospitals, Pharmaceutical Companies, Research Institutes, Insurance Providers), by Geography (North America, Europe, Asia-Pacific, Middle East, Africa and Latin America).",
    reportWebImage: `${API_BASE}/uploaddata/reports/f6h8i19i-0722-45k6-94ji-20407h5ii2if.png`,
  },
  {
    reportUrlLink:
      "global-semiconductor-market-size-share-trends-growth-forecast-and-competitive-analysis-2025-2030",
    reportTitle:
      "GLOBAL SEMICONDUCTOR MARKET – SIZE, SHARE, TRENDS, GROWTH FORECAST, AND COMPETITIVE ANALYSIS (2025-2030)",
    reportDesc:
      "The Global Semiconductor Market is segmented by Component (Memory Chips, Logic Chips, Analog ICs, Microprocessors, Discrete Semiconductors), by Application (Consumer Electronics, Automotive, Industrial, Telecommunications, Healthcare, Aerospace & Defense), by Technology Node (Below 7nm, 7-14nm, 15-28nm, Above 28nm), by End User (OEMs, ODMs, EMS Providers), by Geography (North America, Europe, Asia-Pacific, Middle East, Africa and Latin America).",
    reportWebImage: `${API_BASE}/uploaddata/reports/g7i9j20j-1833-46l7-95kj-31518i6jj3jg.png`,
  },
  {
    reportUrlLink:
      "global-5g-infrastructure-market-size-share-trends-growth-forecast-and-competitive-analysis-2025-2030",
    reportTitle:
      "GLOBAL 5G INFRASTRUCTURE MARKET – SIZE, SHARE, TRENDS, GROWTH FORECAST, AND COMPETITIVE ANALYSIS (2025-2030)",
    reportDesc:
      "The Global 5G Infrastructure Market is segmented by Component (Small Cells, Macro Cells, Radio Access Network, Core Network), by Spectrum (Sub-6 GHz, mmWave), by Network Architecture (Standalone, Non-Standalone), by Deployment (Indoor, Outdoor), by End User (Telecom Operators, Enterprises, Government), by Vertical (Healthcare, Manufacturing, Automotive, BFSI, Media & Entertainment), by Geography (North America, Europe, Asia-Pacific, Middle East, Africa and Latin America).",
    reportWebImage: `${API_BASE}/uploaddata/reports/h8j0k31k-2944-47m8-96lk-42629j7kk4kh.png`,
  },
  {
    reportUrlLink:
      "global-autonomous-vehicle-market-size-share-trends-growth-forecast-and-competitive-analysis-2025-2030",
    reportTitle:
      "GLOBAL AUTONOMOUS VEHICLE MARKET – SIZE, SHARE, TRENDS, GROWTH FORECAST, AND COMPETITIVE ANALYSIS (2025-2030)",
    reportDesc:
      "The Global Autonomous Vehicle Market is segmented by Automation Level (Level 1, Level 2, Level 3, Level 4, Level 5), by Vehicle Type (Passenger Cars, Commercial Vehicles, Shuttles & Pods), by Component (LiDAR, Radar, Camera, AI & Compute Platform, HD Mapping), by Application (Personal Mobility, Ride-Hailing, Logistics & Delivery, Public Transit), by Propulsion (Electric, Hybrid, ICE), by Geography (North America, Europe, Asia-Pacific, Middle East, Africa and Latin America).",
    reportWebImage: `${API_BASE}/uploaddata/reports/i9k1l42l-3055-48n9-97ml-53730k8ll5li.png`,
  },
  {
    reportUrlLink:
      "global-space-economy-market-size-share-trends-growth-forecast-and-competitive-analysis-2025-2030",
    reportTitle:
      "GLOBAL SPACE ECONOMY MARKET – SIZE, SHARE, TRENDS, GROWTH FORECAST, AND COMPETITIVE ANALYSIS (2025-2030)",
    reportDesc:
      "The Global Space Economy Market is segmented by Segment (Satellite Manufacturing, Launch Services, Ground Equipment, Satellite Services), by Orbit (LEO, MEO, GEO, HEO), by Application (Communication, Earth Observation, Navigation, Space Exploration, ISR), by End User (Government & Defense, Commercial, Civil), by Satellite Size (Large, Medium, Small, Nano & Pico), by Geography (North America, Europe, Asia-Pacific, Middle East, Africa and Latin America).",
    reportWebImage: `${API_BASE}/uploaddata/reports/j0l2m53m-4166-49o0-98nm-64841l9mm6mj.png`,
  },
];

const reportsData: Record<string, ReportData> = {
  // ── Consumer Goods ─────────────────────────────────
  "beauty-personal-care": {
    slug: "beauty-personal-care",
    category: "Consumer Goods",
    title: "Beauty & Personal Care",
    description:
      "Comprehensive analysis of the beauty and personal care market including skincare, haircare, cosmetics, and fragrances.",
    sections: [
      {
        title: "Market Overview",
        metrics: [
          {
            label: "Market Size (2025)",
            value: "$625.7B",
            trend: "up",
            trendValue: "5.3%",
          },
          { label: "CAGR (2025-2030)", value: "6.1%", status: "success" },
          { label: "Key Players", value: 48, status: "info" },
          {
            label: "Emerging Brands",
            value: 215,
            trend: "up",
            trendValue: "12%",
          },
        ],
      },
      {
        title: "Segment Performance",
        metrics: [
          {
            label: "Skincare",
            value: "$189.2B",
            progress: 78,
            status: "success",
          },
          {
            label: "Haircare",
            value: "$99.5B",
            progress: 62,
            status: "success",
          },
          {
            label: "Cosmetics",
            value: "$145.8B",
            progress: 71,
            status: "info",
          },
          {
            label: "Fragrances",
            value: "$72.3B",
            progress: 45,
            status: "warning",
          },
        ],
      },
      {
        title: "Regional Trends",
        metrics: [
          {
            label: "North America",
            value: "$198.4B",
            trend: "up",
            trendValue: "3.8%",
          },
          {
            label: "Europe",
            value: "$175.2B",
            trend: "up",
            trendValue: "2.9%",
          },
          {
            label: "Asia Pacific",
            value: "$201.6B",
            trend: "up",
            trendValue: "8.7%",
          },
          {
            label: "Rest of World",
            value: "$50.5B",
            trend: "up",
            trendValue: "4.2%",
          },
        ],
      },
    ],
  },
  "clothing-footwear-accessories": {
    slug: "clothing-footwear-accessories",
    category: "Consumer Goods",
    title: "Clothing, Footwear & Accessories",
    description:
      "In-depth market research on apparel, footwear, and fashion accessories industry trends and forecasts.",
    sections: [
      {
        title: "Market Overview",
        metrics: [
          {
            label: "Market Size (2025)",
            value: "$1.78T",
            trend: "up",
            trendValue: "4.1%",
          },
          { label: "CAGR (2025-2030)", value: "5.5%", status: "success" },
          {
            label: "E-commerce Share",
            value: "32%",
            trend: "up",
            trendValue: "6.5%",
          },
          { label: "Sustainability Index", value: "67/100", status: "warning" },
        ],
      },
      {
        title: "Category Breakdown",
        metrics: [
          {
            label: "Apparel",
            value: "$1.12T",
            progress: 85,
            status: "success",
          },
          {
            label: "Footwear",
            value: "$420B",
            progress: 68,
            status: "success",
          },
          {
            label: "Accessories",
            value: "$240B",
            progress: 52,
            status: "info",
          },
          {
            label: "Luxury Segment",
            value: "$118B",
            progress: 40,
            status: "info",
          },
        ],
      },
    ],
  },
  "consumer-fb": {
    slug: "consumer-fb",
    category: "Consumer Goods",
    title: "Consumer F&B",
    description:
      "Analysis of the food and beverage consumer market including packaged foods, beverages, and emerging health trends.",
    sections: [
      {
        title: "Market Overview",
        metrics: [
          {
            label: "Market Size (2025)",
            value: "$8.9T",
            trend: "up",
            trendValue: "3.7%",
          },
          { label: "CAGR (2025-2030)", value: "4.8%", status: "success" },
          {
            label: "Organic Segment Growth",
            value: "11.2%",
            trend: "up",
            trendValue: "2.1%",
          },
          {
            label: "Plant-Based Growth",
            value: "14.5%",
            trend: "up",
            trendValue: "5.3%",
          },
        ],
      },
      {
        title: "Segments",
        metrics: [
          {
            label: "Packaged Foods",
            value: "$3.2T",
            progress: 72,
            status: "success",
          },
          {
            label: "Beverages",
            value: "$2.1T",
            progress: 65,
            status: "success",
          },
          {
            label: "Dairy & Alternatives",
            value: "$1.8T",
            progress: 58,
            status: "info",
          },
          {
            label: "Snacks & Confectionery",
            value: "$1.8T",
            progress: 55,
            status: "info",
          },
        ],
      },
    ],
  },
  "electronic-electrical": {
    slug: "electronic-electrical",
    category: "Consumer Goods",
    title: "Electronic & Electrical",
    description:
      "Consumer electronics and electrical appliances market overview with adoption trends and innovation insights.",
    sections: [
      {
        title: "Market Overview",
        metrics: [
          {
            label: "Market Size (2025)",
            value: "$1.15T",
            trend: "up",
            trendValue: "6.2%",
          },
          { label: "CAGR (2025-2030)", value: "7.3%", status: "success" },
          {
            label: "Smart Home Penetration",
            value: "41%",
            trend: "up",
            trendValue: "8.9%",
          },
          {
            label: "IoT Devices",
            value: "18.2B",
            trend: "up",
            trendValue: "15.3%",
          },
        ],
      },
      {
        title: "Category Performance",
        metrics: [
          {
            label: "Smartphones",
            value: "$520B",
            progress: 82,
            status: "success",
          },
          {
            label: "Home Appliances",
            value: "$310B",
            progress: 70,
            status: "success",
          },
          { label: "Wearables", value: "$115B", progress: 55, status: "info" },
          {
            label: "Audio & Video",
            value: "$205B",
            progress: 64,
            status: "info",
          },
        ],
      },
    ],
  },
  "homecare-decor": {
    slug: "homecare-decor",
    category: "Consumer Goods",
    title: "Homecare & Decor",
    description:
      "Market intelligence on home care products, interior decoration, and home improvement industry trends.",
    sections: [
      {
        title: "Market Overview",
        metrics: [
          {
            label: "Market Size (2025)",
            value: "$295B",
            trend: "up",
            trendValue: "4.5%",
          },
          { label: "CAGR (2025-2030)", value: "5.2%", status: "success" },
          {
            label: "Eco-Friendly Share",
            value: "28%",
            trend: "up",
            trendValue: "7.1%",
          },
          {
            label: "Online Sales Growth",
            value: "19.3%",
            trend: "up",
            trendValue: "3.8%",
          },
        ],
      },
      {
        title: "Segments",
        metrics: [
          {
            label: "Cleaning Products",
            value: "$98B",
            progress: 75,
            status: "success",
          },
          {
            label: "Furniture & Decor",
            value: "$112B",
            progress: 68,
            status: "success",
          },
          {
            label: "Home Textiles",
            value: "$52B",
            progress: 48,
            status: "info",
          },
          { label: "Lighting", value: "$33B", progress: 38, status: "warning" },
        ],
      },
    ],
  },

  // ── Semiconductors & Electronics ───────────────────
  "display-technologies": {
    slug: "display-technologies",
    category: "Semiconductors & Electronics",
    title: "Display Technologies",
    description:
      "Research on display technology advancements including OLED, MicroLED, MiniLED, and flexible displays.",
    sections: [
      {
        title: "Market Overview",
        metrics: [
          {
            label: "Market Size (2025)",
            value: "$178B",
            trend: "up",
            trendValue: "7.8%",
          },
          { label: "CAGR (2025-2030)", value: "8.2%", status: "success" },
          {
            label: "OLED Market Share",
            value: "38%",
            trend: "up",
            trendValue: "5.4%",
          },
          {
            label: "MicroLED Adoption",
            value: "4.2%",
            trend: "up",
            trendValue: "42%",
          },
        ],
      },
      {
        title: "Technology Segments",
        metrics: [
          { label: "OLED", value: "$67.6B", progress: 80, status: "success" },
          {
            label: "LCD",
            value: "$72.4B",
            progress: 65,
            trend: "down",
            trendValue: "3.2%",
          },
          { label: "MicroLED", value: "$7.5B", progress: 25, status: "info" },
          { label: "E-Paper", value: "$30.5B", progress: 42, status: "info" },
        ],
      },
    ],
  },
  "electronic-security-systems": {
    slug: "electronic-security-systems",
    category: "Semiconductors & Electronics",
    title: "Electronic Security Systems",
    description:
      "Analysis of video surveillance, access control, intrusion detection, and cybersecurity hardware markets.",
    sections: [
      {
        title: "Market Overview",
        metrics: [
          {
            label: "Market Size (2025)",
            value: "$112B",
            trend: "up",
            trendValue: "9.1%",
          },
          { label: "CAGR (2025-2030)", value: "10.5%", status: "success" },
          {
            label: "AI-Enabled Systems",
            value: "52%",
            trend: "up",
            trendValue: "18%",
          },
          {
            label: "Cloud-Based Share",
            value: "44%",
            trend: "up",
            trendValue: "12%",
          },
        ],
      },
      {
        title: "Segments",
        metrics: [
          {
            label: "Video Surveillance",
            value: "$48B",
            progress: 78,
            status: "success",
          },
          {
            label: "Access Control",
            value: "$28B",
            progress: 62,
            status: "success",
          },
          {
            label: "Intrusion Detection",
            value: "$19B",
            progress: 50,
            status: "info",
          },
          {
            label: "Fire Safety",
            value: "$17B",
            progress: 45,
            status: "warning",
          },
        ],
      },
    ],
  },
  "electronic-devices": {
    slug: "electronic-devices",
    category: "Semiconductors & Electronics",
    title: "Electronic Devices",
    description:
      "Market research on electronic components, PCBs, passive devices, and connectors.",
    sections: [
      {
        title: "Market Overview",
        metrics: [
          {
            label: "Market Size (2025)",
            value: "$465B",
            trend: "up",
            trendValue: "5.9%",
          },
          { label: "CAGR (2025-2030)", value: "6.7%", status: "success" },
          {
            label: "5G Component Growth",
            value: "22%",
            trend: "up",
            trendValue: "8%",
          },
          {
            label: "Miniaturization Index",
            value: "82/100",
            status: "success",
          },
        ],
      },
      {
        title: "Component Categories",
        metrics: [
          { label: "PCBs", value: "$95B", progress: 72, status: "success" },
          {
            label: "Passive Components",
            value: "$145B",
            progress: 80,
            status: "success",
          },
          { label: "Connectors", value: "$88B", progress: 60, status: "info" },
          {
            label: "Power Devices",
            value: "$137B",
            progress: 75,
            status: "success",
          },
        ],
      },
    ],
  },
  semiconductors: {
    slug: "semiconductors",
    category: "Semiconductors & Electronics",
    title: "Semiconductors",
    description:
      "Comprehensive semiconductor industry analysis covering foundries, fabless, IDMs, and emerging chip technologies.",
    sections: [
      {
        title: "Market Overview",
        metrics: [
          {
            label: "Market Size (2025)",
            value: "$680B",
            trend: "up",
            trendValue: "12.4%",
          },
          { label: "CAGR (2025-2030)", value: "11.8%", status: "success" },
          {
            label: "AI Chip Revenue",
            value: "$95B",
            trend: "up",
            trendValue: "35%",
          },
          {
            label: "Advanced Nodes (<7nm)",
            value: "28%",
            trend: "up",
            trendValue: "6%",
          },
        ],
      },
      {
        title: "Segments",
        metrics: [
          {
            label: "Logic ICs",
            value: "$215B",
            progress: 85,
            status: "success",
          },
          { label: "Memory", value: "$178B", progress: 72, status: "success" },
          { label: "Analog", value: "$92B", progress: 58, status: "info" },
          {
            label: "Discrete & Others",
            value: "$195B",
            progress: 65,
            status: "info",
          },
        ],
      },
    ],
  },
  "sensors-controls": {
    slug: "sensors-controls",
    category: "Semiconductors & Electronics",
    title: "Sensors & Controls",
    description:
      "Market analysis of industrial and consumer sensors, MEMS, and control systems across applications.",
    sections: [
      {
        title: "Market Overview",
        metrics: [
          {
            label: "Market Size (2025)",
            value: "$245B",
            trend: "up",
            trendValue: "8.6%",
          },
          { label: "CAGR (2025-2030)", value: "9.4%", status: "success" },
          {
            label: "MEMS Sensor Growth",
            value: "14.2%",
            trend: "up",
            trendValue: "3%",
          },
          {
            label: "Automotive Sensors",
            value: "$38B",
            trend: "up",
            trendValue: "11%",
          },
        ],
      },
      {
        title: "Sensor Types",
        metrics: [
          {
            label: "Image Sensors",
            value: "$28B",
            progress: 75,
            status: "success",
          },
          {
            label: "Temperature Sensors",
            value: "$9.2B",
            progress: 60,
            status: "success",
          },
          {
            label: "Pressure Sensors",
            value: "$12.5B",
            progress: 65,
            status: "info",
          },
          {
            label: "Motion & Position",
            value: "$18.8B",
            progress: 70,
            status: "success",
          },
        ],
      },
    ],
  },

  // ── Healthcare & Life Sciences ─────────────────────
  biotechnology: {
    slug: "biotechnology",
    category: "Healthcare & Life Sciences",
    title: "Biotechnology",
    description:
      "Insights into the global biotechnology market including gene therapy, biosimilars, and bioinformatics.",
    sections: [
      {
        title: "Market Overview",
        metrics: [
          {
            label: "Market Size (2025)",
            value: "$1.55T",
            trend: "up",
            trendValue: "11.2%",
          },
          { label: "CAGR (2025-2030)", value: "13.9%", status: "success" },
          {
            label: "Gene Therapy Pipeline",
            value: "2,800+",
            trend: "up",
            trendValue: "22%",
          },
          { label: "Biosimilar Approvals", value: 134, status: "info" },
        ],
      },
      {
        title: "Segments",
        metrics: [
          {
            label: "Biopharmaceuticals",
            value: "$520B",
            progress: 82,
            status: "success",
          },
          {
            label: "Bioservices",
            value: "$380B",
            progress: 70,
            status: "success",
          },
          {
            label: "Bioagriculture",
            value: "$310B",
            progress: 55,
            status: "info",
          },
          {
            label: "Bioindustrial",
            value: "$340B",
            progress: 58,
            status: "info",
          },
        ],
      },
    ],
  },
  pharmaceuticals: {
    slug: "pharmaceuticals",
    category: "Healthcare & Life Sciences",
    title: "Pharmaceuticals",
    description:
      "Global pharmaceutical market analysis including drug pipelines, pricing trends, and regulatory landscape.",
    sections: [
      {
        title: "Market Overview",
        metrics: [
          {
            label: "Market Size (2025)",
            value: "$1.62T",
            trend: "up",
            trendValue: "6.8%",
          },
          { label: "CAGR (2025-2030)", value: "7.5%", status: "success" },
          {
            label: "R&D Spending",
            value: "$265B",
            trend: "up",
            trendValue: "5.1%",
          },
          { label: "Pipeline Drugs", value: "18,500+", status: "info" },
        ],
      },
      {
        title: "Therapeutic Areas",
        metrics: [
          {
            label: "Oncology",
            value: "$320B",
            progress: 88,
            status: "success",
          },
          {
            label: "Immunology",
            value: "$185B",
            progress: 72,
            status: "success",
          },
          { label: "Neurology", value: "$110B", progress: 58, status: "info" },
          {
            label: "Cardiology",
            value: "$95B",
            progress: 52,
            status: "warning",
          },
        ],
      },
    ],
  },
  "medical-devices": {
    slug: "medical-devices",
    category: "Healthcare & Life Sciences",
    title: "Medical Devices",
    description:
      "Market intelligence on medical devices including diagnostics, surgical instruments, and wearable health tech.",
    sections: [
      {
        title: "Market Overview",
        metrics: [
          {
            label: "Market Size (2025)",
            value: "$612B",
            trend: "up",
            trendValue: "7.2%",
          },
          { label: "CAGR (2025-2030)", value: "8.1%", status: "success" },
          {
            label: "AI-Enabled Devices",
            value: "18%",
            trend: "up",
            trendValue: "25%",
          },
          {
            label: "Wearable Health Tech",
            value: "$85B",
            trend: "up",
            trendValue: "16%",
          },
        ],
      },
      {
        title: "Device Categories",
        metrics: [
          {
            label: "In Vitro Diagnostics",
            value: "$142B",
            progress: 78,
            status: "success",
          },
          {
            label: "Cardiovascular",
            value: "$88B",
            progress: 65,
            status: "success",
          },
          { label: "Orthopedic", value: "$62B", progress: 52, status: "info" },
          {
            label: "Surgical Instruments",
            value: "$78B",
            progress: 58,
            status: "info",
          },
        ],
      },
    ],
  },
  "healthcare-it": {
    slug: "healthcare-it",
    category: "Healthcare & Life Sciences",
    title: "Healthcare IT",
    description:
      "Analysis of healthcare IT solutions including EHR, telemedicine, health analytics, and interoperability platforms.",
    sections: [
      {
        title: "Market Overview",
        metrics: [
          {
            label: "Market Size (2025)",
            value: "$394B",
            trend: "up",
            trendValue: "13.5%",
          },
          { label: "CAGR (2025-2030)", value: "15.2%", status: "success" },
          {
            label: "Telemedicine Growth",
            value: "28%",
            trend: "up",
            trendValue: "9%",
          },
          {
            label: "Cloud Adoption",
            value: "62%",
            trend: "up",
            trendValue: "11%",
          },
        ],
      },
      {
        title: "Solution Segments",
        metrics: [
          {
            label: "EHR Systems",
            value: "$45B",
            progress: 80,
            status: "success",
          },
          {
            label: "Telemedicine",
            value: "$112B",
            progress: 72,
            status: "success",
          },
          {
            label: "Health Analytics",
            value: "$78B",
            progress: 60,
            status: "info",
          },
          {
            label: "RCM Solutions",
            value: "$55B",
            progress: 55,
            status: "info",
          },
        ],
      },
    ],
  },
  "clinical-diagnostics": {
    slug: "clinical-diagnostics",
    category: "Healthcare & Life Sciences",
    title: "Clinical Diagnostics",
    description:
      "Report on clinical diagnostics market covering molecular diagnostics, point-of-care testing, and lab automation.",
    sections: [
      {
        title: "Market Overview",
        metrics: [
          {
            label: "Market Size (2025)",
            value: "$285B",
            trend: "up",
            trendValue: "8.3%",
          },
          { label: "CAGR (2025-2030)", value: "9.1%", status: "success" },
          {
            label: "POC Testing Growth",
            value: "15.7%",
            trend: "up",
            trendValue: "4%",
          },
          {
            label: "Molecular Dx Share",
            value: "34%",
            trend: "up",
            trendValue: "6%",
          },
        ],
      },
      {
        title: "Diagnostic Segments",
        metrics: [
          {
            label: "Molecular Diagnostics",
            value: "$97B",
            progress: 82,
            status: "success",
          },
          {
            label: "Immunoassays",
            value: "$68B",
            progress: 65,
            status: "success",
          },
          {
            label: "Clinical Chemistry",
            value: "$52B",
            progress: 55,
            status: "info",
          },
          {
            label: "Hematology",
            value: "$38B",
            progress: 45,
            status: "warning",
          },
        ],
      },
    ],
  },

  // ── Energy & Environment ───────────────────────────
  "renewable-energy": {
    slug: "renewable-energy",
    category: "Energy & Environment",
    title: "Renewable Energy",
    description:
      "Comprehensive analysis of solar, wind, hydro, and emerging renewable energy technologies and investments.",
    sections: [
      {
        title: "Market Overview",
        metrics: [
          {
            label: "Market Size (2025)",
            value: "$1.21T",
            trend: "up",
            trendValue: "14.2%",
          },
          { label: "CAGR (2025-2030)", value: "16.5%", status: "success" },
          {
            label: "Solar Capacity Added",
            value: "420 GW",
            trend: "up",
            trendValue: "25%",
          },
          {
            label: "Green Investment",
            value: "$580B",
            trend: "up",
            trendValue: "18%",
          },
        ],
      },
      {
        title: "Energy Sources",
        metrics: [
          {
            label: "Solar PV",
            value: "$480B",
            progress: 85,
            status: "success",
          },
          {
            label: "Wind Energy",
            value: "$320B",
            progress: 75,
            status: "success",
          },
          { label: "Hydropower", value: "$255B", progress: 60, status: "info" },
          {
            label: "Hydrogen",
            value: "$155B",
            progress: 40,
            status: "warning",
          },
        ],
      },
    ],
  },
  "carbon-markets": {
    slug: "carbon-markets",
    category: "Energy & Environment",
    title: "Carbon Markets",
    description:
      "Carbon trading, carbon credits, and emission reduction market analysis with regulatory insights.",
    sections: [
      {
        title: "Market Overview",
        metrics: [
          {
            label: "Market Size (2025)",
            value: "$978B",
            trend: "up",
            trendValue: "21%",
          },
          { label: "CAGR (2025-2030)", value: "18.3%", status: "success" },
          {
            label: "Carbon Price (EU ETS)",
            value: "$85/ton",
            trend: "up",
            trendValue: "12%",
          },
          {
            label: "Voluntary Credits",
            value: "$12.5B",
            trend: "up",
            trendValue: "35%",
          },
        ],
      },
      {
        title: "Market Segments",
        metrics: [
          {
            label: "Compliance Markets",
            value: "$850B",
            progress: 88,
            status: "success",
          },
          {
            label: "Voluntary Markets",
            value: "$12.5B",
            progress: 35,
            status: "info",
          },
          {
            label: "Carbon Offsets",
            value: "$78B",
            progress: 52,
            status: "info",
          },
          {
            label: "Carbon Capture",
            value: "$37.5B",
            progress: 28,
            status: "warning",
          },
        ],
      },
    ],
  },
  "oil-gas": {
    slug: "oil-gas",
    category: "Energy & Environment",
    title: "Oil & Gas",
    description:
      "Oil and gas industry market trends, upstream-downstream analysis, and energy transition impacts.",
    sections: [
      {
        title: "Market Overview",
        metrics: [
          {
            label: "Market Size (2025)",
            value: "$4.2T",
            trend: "down",
            trendValue: "1.8%",
          },
          { label: "CAGR (2025-2030)", value: "1.2%", status: "warning" },
          {
            label: "Brent Crude Price",
            value: "$78/bbl",
            trend: "down",
            trendValue: "5%",
          },
          {
            label: "LNG Trade Volume",
            value: "580 MT",
            trend: "up",
            trendValue: "4.2%",
          },
        ],
      },
      {
        title: "Segments",
        metrics: [
          {
            label: "Upstream",
            value: "$1.85T",
            progress: 72,
            status: "warning",
          },
          { label: "Midstream", value: "$680B", progress: 55, status: "info" },
          {
            label: "Downstream",
            value: "$1.42T",
            progress: 65,
            status: "info",
          },
          { label: "LNG", value: "$245B", progress: 48, status: "success" },
        ],
      },
    ],
  },
  "energy-storage": {
    slug: "energy-storage",
    category: "Energy & Environment",
    title: "Energy Storage",
    description:
      "Battery technology, grid storage, and energy storage systems market research and forecasts.",
    sections: [
      {
        title: "Market Overview",
        metrics: [
          {
            label: "Market Size (2025)",
            value: "$125B",
            trend: "up",
            trendValue: "22.5%",
          },
          { label: "CAGR (2025-2030)", value: "25.8%", status: "success" },
          {
            label: "Li-Ion Cost Decline",
            value: "$92/kWh",
            trend: "down",
            trendValue: "15%",
          },
          {
            label: "Grid Storage Deployed",
            value: "85 GWh",
            trend: "up",
            trendValue: "45%",
          },
        ],
      },
      {
        title: "Technology Segments",
        metrics: [
          {
            label: "Lithium-Ion",
            value: "$88B",
            progress: 85,
            status: "success",
          },
          {
            label: "Solid State",
            value: "$8.5B",
            progress: 22,
            status: "info",
          },
          {
            label: "Flow Batteries",
            value: "$4.2B",
            progress: 15,
            status: "warning",
          },
          {
            label: "Other Technologies",
            value: "$24.3B",
            progress: 35,
            status: "info",
          },
        ],
      },
    ],
  },
  "smart-grid": {
    slug: "smart-grid",
    category: "Energy & Environment",
    title: "Smart Grid",
    description:
      "Smart grid infrastructure, advanced metering, grid modernization, and DER management analysis.",
    sections: [
      {
        title: "Market Overview",
        metrics: [
          {
            label: "Market Size (2025)",
            value: "$72B",
            trend: "up",
            trendValue: "11.8%",
          },
          { label: "CAGR (2025-2030)", value: "13.2%", status: "success" },
          {
            label: "Smart Meter Penetration",
            value: "58%",
            trend: "up",
            trendValue: "7%",
          },
          {
            label: "Grid Investment",
            value: "$340B",
            trend: "up",
            trendValue: "9%",
          },
        ],
      },
      {
        title: "Solution Segments",
        metrics: [
          {
            label: "AMI Systems",
            value: "$22B",
            progress: 72,
            status: "success",
          },
          {
            label: "Distribution Automation",
            value: "$18.5B",
            progress: 65,
            status: "success",
          },
          {
            label: "Grid Analytics",
            value: "$12B",
            progress: 50,
            status: "info",
          },
          {
            label: "DER Management",
            value: "$19.5B",
            progress: 55,
            status: "info",
          },
        ],
      },
    ],
  },
};

export function getReportBySlug(slug: string): ReportData | undefined {
  return reportsData[slug];
}

export function getAllReports(): ReportData[] {
  return Object.values(reportsData);
}

export function getReportsByCategory(category: string): ReportData[] {
  return Object.values(reportsData).filter((r) => r.category === category);
}

function normalizeReportLookupValue(value: string): string {
  return value
    .toLowerCase()
    .replace(/0/g, "o")
    .replace(/&/g, " and ")
    .replace(/[^a-z]+/g, " ")
    .trim();
}

function tokenizeReportLookupValue(value: string): string[] {
  const stopWords = new Set(["and", "the", "of"]);

  return normalizeReportLookupValue(value)
    .split(/\s+/)
    .map((token) => token.replace(/s$/, ""))
    .filter((token) => token && !stopWords.has(token));
}

function isSubCategoryMatch(
  report: ReportData,
  subCategory: ReportSubCategory,
): boolean {
  const reportTokens = new Set([
    ...tokenizeReportLookupValue(report.slug),
    ...tokenizeReportLookupValue(report.title),
    ...tokenizeReportLookupValue(report.category),
  ]);
  const subCategoryTokens = [
    ...tokenizeReportLookupValue(subCategory.subCategoryName),
    ...tokenizeReportLookupValue(subCategory.subCategoryLink),
  ];

  const matchedTokens = subCategoryTokens.filter((token) =>
    reportTokens.has(token),
  );

  if (matchedTokens.length === 0) {
    return false;
  }

  if (subCategoryTokens.length === 1) {
    return true;
  }

  const normalizedReportValues = [
    report.slug,
    report.title,
    report.category,
  ].map((value) => normalizeReportLookupValue(value).replace(/\s+/g, ""));
  const normalizedSubCategoryValues = [
    subCategory.subCategoryName,
    subCategory.subCategoryLink,
  ].map((value) => normalizeReportLookupValue(value).replace(/\s+/g, ""));

  if (
    normalizedSubCategoryValues.some((subCategoryValue) =>
      normalizedReportValues.some(
        (reportValue) =>
          reportValue.includes(subCategoryValue) ||
          subCategoryValue.includes(reportValue),
      ),
    )
  ) {
    return true;
  }

  return matchedTokens.length >= 2;
}

export function getAllCategories(): ReportCategoryGroup[] {
  return categories;
}

export function getSubCategoryByLink(
  subCategoryLink: string,
):
  | { category: ReportCategoryGroup; subCategory: ReportSubCategory }
  | undefined {
  for (const category of categories) {
    const subCategory = category.subCategories.find(
      (item) => item.subCategoryLink === subCategoryLink,
    );

    if (subCategory) {
      return { category, subCategory };
    }
  }

  return undefined;
}

export function getReportsBySubCategoryLink(
  subCategoryLink: string,
): ReportData[] {
  const categoryMatch = getSubCategoryByLink(subCategoryLink);

  if (!categoryMatch) {
    return [];
  }

  return getAllReports().filter((report) =>
    isSubCategoryMatch(report, categoryMatch.subCategory),
  );
}

export function getListedReportsBySubCategoryLink(
  subCategoryLink: string,
): ListedReport[] {
  return getSubCategoryByLink(subCategoryLink) ? reportsList : [];
}

export function getAllSubCategoryLinks(): string[] {
  return categories.flatMap((category) =>
    category.subCategories.map((subCategory) => subCategory.subCategoryLink),
  );
}

export function getAllSlugs(): string[] {
  return Object.keys(reportsData);
}

// ========================
// Data
// ========================
export const esgAccordionItems = [
  { tag: 'India Market', title: 'BRSR Compliance Market 2025\u20132033', desc: "Sizing of India's sustainability reporting ecosystem and SEBI mandate impact." },
  { tag: 'Global', title: 'Carbon Credit Markets \u2014 Deep Dive', desc: 'Voluntary and compliance carbon market dynamics, pricing, and regional opportunity maps.' },
  { tag: 'Finance Sector', title: 'Green Finance & ESG Bonds Report', desc: 'Issuance trends, investor appetite, regulatory landscape, and 10-year forecasts.' },
  { tag: 'Enterprise', title: 'Net Zero Strategy Intelligence', desc: 'Sector-by-sector decarbonisation pathways aligned to SBTi and Paris Agreement targets.' },
];

export const serviceTabs = [
  {
    label: 'White Papers',
    title: 'Market Intelligence Platform',
    desc: "Horizon is MindEarth's subscription-based intelligence portal \u2014 delivering continuous, real-time market data, competitive benchmarking, and trend analysis across all major industries.",
    bullets: ['ESG Research Papers', 'Industry-Specific ESG Studies', 'Sustainability Framework Analysis', 'Climate & Net-Zero Research'],
    cta: 'Explore Horizon',
    img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80&auto=format&fit=crop',
  },
  {
    label: 'Case Studies',
    title: 'Brainshare Consulting Services',
    desc: 'Our consulting and advisory arm provides comprehensive, research-based strategic guidance. Our analysts are united in their commitment to client outcomes and passionate about delivering quick, effective decision-making support.',
    bullets: ['ESG Transformation Projects', 'BRSR Implementation Case Studies', 'Net-Zero Transition Case Studies', 'ESG Audit Success Stories'],
    cta: 'Explore Brainshare',
    img: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80&auto=format&fit=crop',
  },
  {
    label: 'Blogs',
    title: 'Syndicated Industry Reports',
    desc: 'MindEarth publishes over 240 syndicated reports annually, covering 45+ industries on a global and regional basis. Each report is built on rigorous primary and secondary research methodologies.',
    bullets: ['ESG Trends & Updates', 'Sustainability Best Practices', 'Climate & Energy Insights', 'Governance & Compliance'],
    cta: 'Browse Reports',
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80&auto=format&fit=crop',
  },
  {
    label: 'Press Releases',
    title: 'Full-Time Research Engagement',
    desc: 'Companies requiring ongoing day-to-day research support benefit from our dedicated Research Partnership model \u2014 a one-stop solution for all information needs with a dedicated team.',
    bullets: ['Company Announcements', 'New Partnerships & Collaborations', 'Project Milestones', 'Media Coverage'],
    cta: 'Schedule a Discussion',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80&auto=format&fit=crop',
  },
  {
    label: 'ESG Updates / Regulatory Updates',
    title: 'Custom Research Services',
    desc: "When off-the-shelf doesn't cover your unique strategic questions, our custom research practice designs bespoke studies built precisely around your organisation's needs.",
    bullets: ['Policy & Regulatory Changes', 'ESG Reporting Updates', 'Government Sustainability Initiatives'],
    cta: 'Request Custom Research',
    img: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&q=80&auto=format&fit=crop',
  },
];

export const industries = [
  { name: 'Healthcare & Life Sciences', count: '7 sub-sectors \u00b7 1,200+ reports', subs: 'Biotechnology | Pharmaceuticals | Medical Devices', icon: '\u{1F3E5}' },
  { name: 'Technology & Digital',       count: '7 sub-sectors \u00b7 980+ reports',   subs: 'Next Gen Technologies | Network Security | Digital Media', icon: '\u{1F4BB}' },
  { name: 'Specialty & Fine Chemicals', count: '4 sub-sectors \u00b7 640+ reports',   subs: 'Renewable Chemicals | Catalysts & Enzymes', icon: '\u{1F9EA}' },
  { name: 'Advanced Materials',         count: '6 sub-sectors \u00b7 520+ reports',   subs: 'Smart Textiles | Green Building Materials', icon: '\u2697\uFE0F' },
  { name: 'Consumer Goods',             count: '5 sub-sectors \u00b7 750+ reports',   subs: 'Beauty & Personal Care | Consumer F&B', icon: '\u{1F6CD}\uFE0F' },
  { name: 'Food & Beverages',           count: '4 sub-sectors \u00b7 600+ reports',   subs: 'Nutraceuticals | Food Safety & Processing', icon: '\u{1F33E}' },
];

export const stats = [
  { num: '10', suffix: 'K+', label: 'Reports Published' },
  { num: '50', suffix: '+',  label: 'Industries Covered' },
  { num: '500', suffix: '+', label: 'Expert Analysts' },
  { num: '44', suffix: '',   label: 'Countries Served' },
];

export const reports = [
  { tag: 'Healthcare',     title: 'Dental Membrane Market Size & Share Report 2025\u20132033', desc: 'The global dental membrane market was valued at USD 682.46 million in 2025 and is projected to reach USD 1,186.38 million by 2033, driven by rising dental implant...', cagr: '7.27%', img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&q=80&auto=format&fit=crop' },
  { tag: 'Food & Bev',     title: 'Middle East Digestive Health Supplements Market 2025\u20132033', desc: 'Valued at USD 435.7 million in 2025, this market is expected to reach USD 951.1 million by 2033 on the back of growing health awareness and premium...', cagr: '10.1%', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80&auto=format&fit=crop' },
  { tag: 'Biotechnology',  title: 'Gene Editing Market Size, Share & Trends Report 2025\u20132033', desc: 'The global gene editing market size was estimated at USD 5.87 billion in 2025 and is projected to reach USD 18.55 billion by 2033, fuelled by CRISPR...', cagr: '15.71%', img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=500&q=80&auto=format&fit=crop' },
  { tag: 'Semiconductors', title: 'LED Driver Market Size & Forecast 2025\u20132033', desc: 'The global LED driver market size was estimated at USD 57.87 billion in 2025, projected to reach USD 123.54 billion by 2033, driven by smart lighting and IoT...', cagr: '10.1%', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80&auto=format&fit=crop' },
  { tag: 'Healthcare',     title: 'Anti-aging Supplements Market Size & Trends 2025\u20132033', desc: 'The global anti-aging supplements market size is expected to reach USD 9.06 billion by 2033, registering strong CAGR from rising longevity awareness and...', cagr: '8.49%', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80&auto=format&fit=crop' },
  { tag: 'Automotive',     title: 'Automotive Fuel Cell Market Size & Share 2025\u20132033', desc: 'The global automotive fuel cell market was estimated at USD 6.89 billion in 2025, projected to reach USD 10.06 billion by 2033 amid growing zero-emission...', cagr: '4.9%', img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=500&q=80&auto=format&fit=crop' },
];

export const pressReleases = [
  { title: 'Gene Editing Market Size To Reach $18.55 Billion By 2033', desc: 'The global gene editing market is projected to reach USD 18.55 billion by 2033, growing at a CAGR of 15.71%.', date: 'Feb 2026' },
  { title: 'Anti-aging Supplements Market To Reach $9.06 Billion By 2033', desc: 'The anti-aging supplements market is expected to reach USD 9.06 billion by 2033, registering a CAGR of 8.49%.', date: 'Feb 2026' },
  { title: 'LED Driver Market To Surpass $123 Billion By 2033', desc: 'Technological advancements in smart lighting components driving strong growth in the global LED driver ecosystem.', date: 'Jan 2026' },
];

export const whyPoints = [
  { title: 'Global Perspective', desc: 'We have worked with clients in 44 countries. Our perspective means we know what is happening in your regional market and what is working elsewhere in the world.', img: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?w=80&q=80&auto=format&fit=crop' },
  { title: 'Deep Industry Experience', desc: 'We have completed numerous consulting projects across industries. Whatever you do, chances are we already have experience with something very similar.', img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=80&q=80&auto=format&fit=crop' },
  { title: 'Dedicated Support', desc: 'Personalised attention from start to finish with a single point of contact who understands your business objectives and strategic context.', img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=80&q=80&auto=format&fit=crop' },
  { title: 'Proven Process', desc: 'Reliable, time-tested research methodology combining quantitative modelling, expert interviews, and rigorous data validation.', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&q=80&auto=format&fit=crop' },
];