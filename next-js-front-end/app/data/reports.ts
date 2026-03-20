export interface ReportMetric {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  progress?: number;
  status?: 'success' | 'warning' | 'error' | 'info';
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

const reportsData: Record<string, ReportData> = {
  // ── Consumer Goods ─────────────────────────────────
  'beauty-personal-care': {
    slug: 'beauty-personal-care',
    category: 'Consumer Goods',
    title: 'Beauty & Personal Care',
    description:
      'Comprehensive analysis of the beauty and personal care market including skincare, haircare, cosmetics, and fragrances.',
    sections: [
      {
        title: 'Market Overview',
        metrics: [
          { label: 'Market Size (2025)', value: '$625.7B', trend: 'up', trendValue: '5.3%' },
          { label: 'CAGR (2025-2030)', value: '6.1%', status: 'success' },
          { label: 'Key Players', value: 48, status: 'info' },
          { label: 'Emerging Brands', value: 215, trend: 'up', trendValue: '12%' },
        ],
      },
      {
        title: 'Segment Performance',
        metrics: [
          { label: 'Skincare', value: '$189.2B', progress: 78, status: 'success' },
          { label: 'Haircare', value: '$99.5B', progress: 62, status: 'success' },
          { label: 'Cosmetics', value: '$145.8B', progress: 71, status: 'info' },
          { label: 'Fragrances', value: '$72.3B', progress: 45, status: 'warning' },
        ],
      },
      {
        title: 'Regional Trends',
        metrics: [
          { label: 'North America', value: '$198.4B', trend: 'up', trendValue: '3.8%' },
          { label: 'Europe', value: '$175.2B', trend: 'up', trendValue: '2.9%' },
          { label: 'Asia Pacific', value: '$201.6B', trend: 'up', trendValue: '8.7%' },
          { label: 'Rest of World', value: '$50.5B', trend: 'up', trendValue: '4.2%' },
        ],
      },
    ],
  },
  'clothing-footwear-accessories': {
    slug: 'clothing-footwear-accessories',
    category: 'Consumer Goods',
    title: 'Clothing, Footwear & Accessories',
    description:
      'In-depth market research on apparel, footwear, and fashion accessories industry trends and forecasts.',
    sections: [
      {
        title: 'Market Overview',
        metrics: [
          { label: 'Market Size (2025)', value: '$1.78T', trend: 'up', trendValue: '4.1%' },
          { label: 'CAGR (2025-2030)', value: '5.5%', status: 'success' },
          { label: 'E-commerce Share', value: '32%', trend: 'up', trendValue: '6.5%' },
          { label: 'Sustainability Index', value: '67/100', status: 'warning' },
        ],
      },
      {
        title: 'Category Breakdown',
        metrics: [
          { label: 'Apparel', value: '$1.12T', progress: 85, status: 'success' },
          { label: 'Footwear', value: '$420B', progress: 68, status: 'success' },
          { label: 'Accessories', value: '$240B', progress: 52, status: 'info' },
          { label: 'Luxury Segment', value: '$118B', progress: 40, status: 'info' },
        ],
      },
    ],
  },
  'consumer-fb': {
    slug: 'consumer-fb',
    category: 'Consumer Goods',
    title: 'Consumer F&B',
    description:
      'Analysis of the food and beverage consumer market including packaged foods, beverages, and emerging health trends.',
    sections: [
      {
        title: 'Market Overview',
        metrics: [
          { label: 'Market Size (2025)', value: '$8.9T', trend: 'up', trendValue: '3.7%' },
          { label: 'CAGR (2025-2030)', value: '4.8%', status: 'success' },
          { label: 'Organic Segment Growth', value: '11.2%', trend: 'up', trendValue: '2.1%' },
          { label: 'Plant-Based Growth', value: '14.5%', trend: 'up', trendValue: '5.3%' },
        ],
      },
      {
        title: 'Segments',
        metrics: [
          { label: 'Packaged Foods', value: '$3.2T', progress: 72, status: 'success' },
          { label: 'Beverages', value: '$2.1T', progress: 65, status: 'success' },
          { label: 'Dairy & Alternatives', value: '$1.8T', progress: 58, status: 'info' },
          { label: 'Snacks & Confectionery', value: '$1.8T', progress: 55, status: 'info' },
        ],
      },
    ],
  },
  'electronic-electrical': {
    slug: 'electronic-electrical',
    category: 'Consumer Goods',
    title: 'Electronic & Electrical',
    description:
      'Consumer electronics and electrical appliances market overview with adoption trends and innovation insights.',
    sections: [
      {
        title: 'Market Overview',
        metrics: [
          { label: 'Market Size (2025)', value: '$1.15T', trend: 'up', trendValue: '6.2%' },
          { label: 'CAGR (2025-2030)', value: '7.3%', status: 'success' },
          { label: 'Smart Home Penetration', value: '41%', trend: 'up', trendValue: '8.9%' },
          { label: 'IoT Devices', value: '18.2B', trend: 'up', trendValue: '15.3%' },
        ],
      },
      {
        title: 'Category Performance',
        metrics: [
          { label: 'Smartphones', value: '$520B', progress: 82, status: 'success' },
          { label: 'Home Appliances', value: '$310B', progress: 70, status: 'success' },
          { label: 'Wearables', value: '$115B', progress: 55, status: 'info' },
          { label: 'Audio & Video', value: '$205B', progress: 64, status: 'info' },
        ],
      },
    ],
  },
  'homecare-decor': {
    slug: 'homecare-decor',
    category: 'Consumer Goods',
    title: 'Homecare & Decor',
    description:
      'Market intelligence on home care products, interior decoration, and home improvement industry trends.',
    sections: [
      {
        title: 'Market Overview',
        metrics: [
          { label: 'Market Size (2025)', value: '$295B', trend: 'up', trendValue: '4.5%' },
          { label: 'CAGR (2025-2030)', value: '5.2%', status: 'success' },
          { label: 'Eco-Friendly Share', value: '28%', trend: 'up', trendValue: '7.1%' },
          { label: 'Online Sales Growth', value: '19.3%', trend: 'up', trendValue: '3.8%' },
        ],
      },
      {
        title: 'Segments',
        metrics: [
          { label: 'Cleaning Products', value: '$98B', progress: 75, status: 'success' },
          { label: 'Furniture & Decor', value: '$112B', progress: 68, status: 'success' },
          { label: 'Home Textiles', value: '$52B', progress: 48, status: 'info' },
          { label: 'Lighting', value: '$33B', progress: 38, status: 'warning' },
        ],
      },
    ],
  },

  // ── Semiconductors & Electronics ───────────────────
  'display-technologies': {
    slug: 'display-technologies',
    category: 'Semiconductors & Electronics',
    title: 'Display Technologies',
    description:
      'Research on display technology advancements including OLED, MicroLED, MiniLED, and flexible displays.',
    sections: [
      {
        title: 'Market Overview',
        metrics: [
          { label: 'Market Size (2025)', value: '$178B', trend: 'up', trendValue: '7.8%' },
          { label: 'CAGR (2025-2030)', value: '8.2%', status: 'success' },
          { label: 'OLED Market Share', value: '38%', trend: 'up', trendValue: '5.4%' },
          { label: 'MicroLED Adoption', value: '4.2%', trend: 'up', trendValue: '42%' },
        ],
      },
      {
        title: 'Technology Segments',
        metrics: [
          { label: 'OLED', value: '$67.6B', progress: 80, status: 'success' },
          { label: 'LCD', value: '$72.4B', progress: 65, trend: 'down', trendValue: '3.2%' },
          { label: 'MicroLED', value: '$7.5B', progress: 25, status: 'info' },
          { label: 'E-Paper', value: '$30.5B', progress: 42, status: 'info' },
        ],
      },
    ],
  },
  'electronic-security-systems': {
    slug: 'electronic-security-systems',
    category: 'Semiconductors & Electronics',
    title: 'Electronic Security Systems',
    description:
      'Analysis of video surveillance, access control, intrusion detection, and cybersecurity hardware markets.',
    sections: [
      {
        title: 'Market Overview',
        metrics: [
          { label: 'Market Size (2025)', value: '$112B', trend: 'up', trendValue: '9.1%' },
          { label: 'CAGR (2025-2030)', value: '10.5%', status: 'success' },
          { label: 'AI-Enabled Systems', value: '52%', trend: 'up', trendValue: '18%' },
          { label: 'Cloud-Based Share', value: '44%', trend: 'up', trendValue: '12%' },
        ],
      },
      {
        title: 'Segments',
        metrics: [
          { label: 'Video Surveillance', value: '$48B', progress: 78, status: 'success' },
          { label: 'Access Control', value: '$28B', progress: 62, status: 'success' },
          { label: 'Intrusion Detection', value: '$19B', progress: 50, status: 'info' },
          { label: 'Fire Safety', value: '$17B', progress: 45, status: 'warning' },
        ],
      },
    ],
  },
  'electronic-devices': {
    slug: 'electronic-devices',
    category: 'Semiconductors & Electronics',
    title: 'Electronic Devices',
    description:
      'Market research on electronic components, PCBs, passive devices, and connectors.',
    sections: [
      {
        title: 'Market Overview',
        metrics: [
          { label: 'Market Size (2025)', value: '$465B', trend: 'up', trendValue: '5.9%' },
          { label: 'CAGR (2025-2030)', value: '6.7%', status: 'success' },
          { label: '5G Component Growth', value: '22%', trend: 'up', trendValue: '8%' },
          { label: 'Miniaturization Index', value: '82/100', status: 'success' },
        ],
      },
      {
        title: 'Component Categories',
        metrics: [
          { label: 'PCBs', value: '$95B', progress: 72, status: 'success' },
          { label: 'Passive Components', value: '$145B', progress: 80, status: 'success' },
          { label: 'Connectors', value: '$88B', progress: 60, status: 'info' },
          { label: 'Power Devices', value: '$137B', progress: 75, status: 'success' },
        ],
      },
    ],
  },
  semiconductors: {
    slug: 'semiconductors',
    category: 'Semiconductors & Electronics',
    title: 'Semiconductors',
    description:
      'Comprehensive semiconductor industry analysis covering foundries, fabless, IDMs, and emerging chip technologies.',
    sections: [
      {
        title: 'Market Overview',
        metrics: [
          { label: 'Market Size (2025)', value: '$680B', trend: 'up', trendValue: '12.4%' },
          { label: 'CAGR (2025-2030)', value: '11.8%', status: 'success' },
          { label: 'AI Chip Revenue', value: '$95B', trend: 'up', trendValue: '35%' },
          { label: 'Advanced Nodes (<7nm)', value: '28%', trend: 'up', trendValue: '6%' },
        ],
      },
      {
        title: 'Segments',
        metrics: [
          { label: 'Logic ICs', value: '$215B', progress: 85, status: 'success' },
          { label: 'Memory', value: '$178B', progress: 72, status: 'success' },
          { label: 'Analog', value: '$92B', progress: 58, status: 'info' },
          { label: 'Discrete & Others', value: '$195B', progress: 65, status: 'info' },
        ],
      },
    ],
  },
  'sensors-controls': {
    slug: 'sensors-controls',
    category: 'Semiconductors & Electronics',
    title: 'Sensors & Controls',
    description:
      'Market analysis of industrial and consumer sensors, MEMS, and control systems across applications.',
    sections: [
      {
        title: 'Market Overview',
        metrics: [
          { label: 'Market Size (2025)', value: '$245B', trend: 'up', trendValue: '8.6%' },
          { label: 'CAGR (2025-2030)', value: '9.4%', status: 'success' },
          { label: 'MEMS Sensor Growth', value: '14.2%', trend: 'up', trendValue: '3%' },
          { label: 'Automotive Sensors', value: '$38B', trend: 'up', trendValue: '11%' },
        ],
      },
      {
        title: 'Sensor Types',
        metrics: [
          { label: 'Image Sensors', value: '$28B', progress: 75, status: 'success' },
          { label: 'Temperature Sensors', value: '$9.2B', progress: 60, status: 'success' },
          { label: 'Pressure Sensors', value: '$12.5B', progress: 65, status: 'info' },
          { label: 'Motion & Position', value: '$18.8B', progress: 70, status: 'success' },
        ],
      },
    ],
  },

  // ── Healthcare & Life Sciences ─────────────────────
  biotechnology: {
    slug: 'biotechnology',
    category: 'Healthcare & Life Sciences',
    title: 'Biotechnology',
    description:
      'Insights into the global biotechnology market including gene therapy, biosimilars, and bioinformatics.',
    sections: [
      {
        title: 'Market Overview',
        metrics: [
          { label: 'Market Size (2025)', value: '$1.55T', trend: 'up', trendValue: '11.2%' },
          { label: 'CAGR (2025-2030)', value: '13.9%', status: 'success' },
          { label: 'Gene Therapy Pipeline', value: '2,800+', trend: 'up', trendValue: '22%' },
          { label: 'Biosimilar Approvals', value: 134, status: 'info' },
        ],
      },
      {
        title: 'Segments',
        metrics: [
          { label: 'Biopharmaceuticals', value: '$520B', progress: 82, status: 'success' },
          { label: 'Bioservices', value: '$380B', progress: 70, status: 'success' },
          { label: 'Bioagriculture', value: '$310B', progress: 55, status: 'info' },
          { label: 'Bioindustrial', value: '$340B', progress: 58, status: 'info' },
        ],
      },
    ],
  },
  pharmaceuticals: {
    slug: 'pharmaceuticals',
    category: 'Healthcare & Life Sciences',
    title: 'Pharmaceuticals',
    description:
      'Global pharmaceutical market analysis including drug pipelines, pricing trends, and regulatory landscape.',
    sections: [
      {
        title: 'Market Overview',
        metrics: [
          { label: 'Market Size (2025)', value: '$1.62T', trend: 'up', trendValue: '6.8%' },
          { label: 'CAGR (2025-2030)', value: '7.5%', status: 'success' },
          { label: 'R&D Spending', value: '$265B', trend: 'up', trendValue: '5.1%' },
          { label: 'Pipeline Drugs', value: '18,500+', status: 'info' },
        ],
      },
      {
        title: 'Therapeutic Areas',
        metrics: [
          { label: 'Oncology', value: '$320B', progress: 88, status: 'success' },
          { label: 'Immunology', value: '$185B', progress: 72, status: 'success' },
          { label: 'Neurology', value: '$110B', progress: 58, status: 'info' },
          { label: 'Cardiology', value: '$95B', progress: 52, status: 'warning' },
        ],
      },
    ],
  },
  'medical-devices': {
    slug: 'medical-devices',
    category: 'Healthcare & Life Sciences',
    title: 'Medical Devices',
    description:
      'Market intelligence on medical devices including diagnostics, surgical instruments, and wearable health tech.',
    sections: [
      {
        title: 'Market Overview',
        metrics: [
          { label: 'Market Size (2025)', value: '$612B', trend: 'up', trendValue: '7.2%' },
          { label: 'CAGR (2025-2030)', value: '8.1%', status: 'success' },
          { label: 'AI-Enabled Devices', value: '18%', trend: 'up', trendValue: '25%' },
          { label: 'Wearable Health Tech', value: '$85B', trend: 'up', trendValue: '16%' },
        ],
      },
      {
        title: 'Device Categories',
        metrics: [
          { label: 'In Vitro Diagnostics', value: '$142B', progress: 78, status: 'success' },
          { label: 'Cardiovascular', value: '$88B', progress: 65, status: 'success' },
          { label: 'Orthopedic', value: '$62B', progress: 52, status: 'info' },
          { label: 'Surgical Instruments', value: '$78B', progress: 58, status: 'info' },
        ],
      },
    ],
  },
  'healthcare-it': {
    slug: 'healthcare-it',
    category: 'Healthcare & Life Sciences',
    title: 'Healthcare IT',
    description:
      'Analysis of healthcare IT solutions including EHR, telemedicine, health analytics, and interoperability platforms.',
    sections: [
      {
        title: 'Market Overview',
        metrics: [
          { label: 'Market Size (2025)', value: '$394B', trend: 'up', trendValue: '13.5%' },
          { label: 'CAGR (2025-2030)', value: '15.2%', status: 'success' },
          { label: 'Telemedicine Growth', value: '28%', trend: 'up', trendValue: '9%' },
          { label: 'Cloud Adoption', value: '62%', trend: 'up', trendValue: '11%' },
        ],
      },
      {
        title: 'Solution Segments',
        metrics: [
          { label: 'EHR Systems', value: '$45B', progress: 80, status: 'success' },
          { label: 'Telemedicine', value: '$112B', progress: 72, status: 'success' },
          { label: 'Health Analytics', value: '$78B', progress: 60, status: 'info' },
          { label: 'RCM Solutions', value: '$55B', progress: 55, status: 'info' },
        ],
      },
    ],
  },
  'clinical-diagnostics': {
    slug: 'clinical-diagnostics',
    category: 'Healthcare & Life Sciences',
    title: 'Clinical Diagnostics',
    description:
      'Report on clinical diagnostics market covering molecular diagnostics, point-of-care testing, and lab automation.',
    sections: [
      {
        title: 'Market Overview',
        metrics: [
          { label: 'Market Size (2025)', value: '$285B', trend: 'up', trendValue: '8.3%' },
          { label: 'CAGR (2025-2030)', value: '9.1%', status: 'success' },
          { label: 'POC Testing Growth', value: '15.7%', trend: 'up', trendValue: '4%' },
          { label: 'Molecular Dx Share', value: '34%', trend: 'up', trendValue: '6%' },
        ],
      },
      {
        title: 'Diagnostic Segments',
        metrics: [
          { label: 'Molecular Diagnostics', value: '$97B', progress: 82, status: 'success' },
          { label: 'Immunoassays', value: '$68B', progress: 65, status: 'success' },
          { label: 'Clinical Chemistry', value: '$52B', progress: 55, status: 'info' },
          { label: 'Hematology', value: '$38B', progress: 45, status: 'warning' },
        ],
      },
    ],
  },

  // ── Energy & Environment ───────────────────────────
  'renewable-energy': {
    slug: 'renewable-energy',
    category: 'Energy & Environment',
    title: 'Renewable Energy',
    description:
      'Comprehensive analysis of solar, wind, hydro, and emerging renewable energy technologies and investments.',
    sections: [
      {
        title: 'Market Overview',
        metrics: [
          { label: 'Market Size (2025)', value: '$1.21T', trend: 'up', trendValue: '14.2%' },
          { label: 'CAGR (2025-2030)', value: '16.5%', status: 'success' },
          { label: 'Solar Capacity Added', value: '420 GW', trend: 'up', trendValue: '25%' },
          { label: 'Green Investment', value: '$580B', trend: 'up', trendValue: '18%' },
        ],
      },
      {
        title: 'Energy Sources',
        metrics: [
          { label: 'Solar PV', value: '$480B', progress: 85, status: 'success' },
          { label: 'Wind Energy', value: '$320B', progress: 75, status: 'success' },
          { label: 'Hydropower', value: '$255B', progress: 60, status: 'info' },
          { label: 'Hydrogen', value: '$155B', progress: 40, status: 'warning' },
        ],
      },
    ],
  },
  'carbon-markets': {
    slug: 'carbon-markets',
    category: 'Energy & Environment',
    title: 'Carbon Markets',
    description:
      'Carbon trading, carbon credits, and emission reduction market analysis with regulatory insights.',
    sections: [
      {
        title: 'Market Overview',
        metrics: [
          { label: 'Market Size (2025)', value: '$978B', trend: 'up', trendValue: '21%' },
          { label: 'CAGR (2025-2030)', value: '18.3%', status: 'success' },
          { label: 'Carbon Price (EU ETS)', value: '$85/ton', trend: 'up', trendValue: '12%' },
          { label: 'Voluntary Credits', value: '$12.5B', trend: 'up', trendValue: '35%' },
        ],
      },
      {
        title: 'Market Segments',
        metrics: [
          { label: 'Compliance Markets', value: '$850B', progress: 88, status: 'success' },
          { label: 'Voluntary Markets', value: '$12.5B', progress: 35, status: 'info' },
          { label: 'Carbon Offsets', value: '$78B', progress: 52, status: 'info' },
          { label: 'Carbon Capture', value: '$37.5B', progress: 28, status: 'warning' },
        ],
      },
    ],
  },
  'oil-gas': {
    slug: 'oil-gas',
    category: 'Energy & Environment',
    title: 'Oil & Gas',
    description:
      'Oil and gas industry market trends, upstream-downstream analysis, and energy transition impacts.',
    sections: [
      {
        title: 'Market Overview',
        metrics: [
          { label: 'Market Size (2025)', value: '$4.2T', trend: 'down', trendValue: '1.8%' },
          { label: 'CAGR (2025-2030)', value: '1.2%', status: 'warning' },
          { label: 'Brent Crude Price', value: '$78/bbl', trend: 'down', trendValue: '5%' },
          { label: 'LNG Trade Volume', value: '580 MT', trend: 'up', trendValue: '4.2%' },
        ],
      },
      {
        title: 'Segments',
        metrics: [
          { label: 'Upstream', value: '$1.85T', progress: 72, status: 'warning' },
          { label: 'Midstream', value: '$680B', progress: 55, status: 'info' },
          { label: 'Downstream', value: '$1.42T', progress: 65, status: 'info' },
          { label: 'LNG', value: '$245B', progress: 48, status: 'success' },
        ],
      },
    ],
  },
  'energy-storage': {
    slug: 'energy-storage',
    category: 'Energy & Environment',
    title: 'Energy Storage',
    description:
      'Battery technology, grid storage, and energy storage systems market research and forecasts.',
    sections: [
      {
        title: 'Market Overview',
        metrics: [
          { label: 'Market Size (2025)', value: '$125B', trend: 'up', trendValue: '22.5%' },
          { label: 'CAGR (2025-2030)', value: '25.8%', status: 'success' },
          { label: 'Li-Ion Cost Decline', value: '$92/kWh', trend: 'down', trendValue: '15%' },
          { label: 'Grid Storage Deployed', value: '85 GWh', trend: 'up', trendValue: '45%' },
        ],
      },
      {
        title: 'Technology Segments',
        metrics: [
          { label: 'Lithium-Ion', value: '$88B', progress: 85, status: 'success' },
          { label: 'Solid State', value: '$8.5B', progress: 22, status: 'info' },
          { label: 'Flow Batteries', value: '$4.2B', progress: 15, status: 'warning' },
          { label: 'Other Technologies', value: '$24.3B', progress: 35, status: 'info' },
        ],
      },
    ],
  },
  'smart-grid': {
    slug: 'smart-grid',
    category: 'Energy & Environment',
    title: 'Smart Grid',
    description:
      'Smart grid infrastructure, advanced metering, grid modernization, and DER management analysis.',
    sections: [
      {
        title: 'Market Overview',
        metrics: [
          { label: 'Market Size (2025)', value: '$72B', trend: 'up', trendValue: '11.8%' },
          { label: 'CAGR (2025-2030)', value: '13.2%', status: 'success' },
          { label: 'Smart Meter Penetration', value: '58%', trend: 'up', trendValue: '7%' },
          { label: 'Grid Investment', value: '$340B', trend: 'up', trendValue: '9%' },
        ],
      },
      {
        title: 'Solution Segments',
        metrics: [
          { label: 'AMI Systems', value: '$22B', progress: 72, status: 'success' },
          { label: 'Distribution Automation', value: '$18.5B', progress: 65, status: 'success' },
          { label: 'Grid Analytics', value: '$12B', progress: 50, status: 'info' },
          { label: 'DER Management', value: '$19.5B', progress: 55, status: 'info' },
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

export function getAllSlugs(): string[] {
  return Object.keys(reportsData);
}
