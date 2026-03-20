'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  TextField,
  Card,
  CardContent,
  Link as MuiLink,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tab,
  Tabs,
} from '@mui/material';
import { styled, keyframes } from '@mui/system';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  BRAND_GREEN,
  TEXT_DARK,
  TEXT_BODY,
  SURFACE_GREEN_LIGHT,
  FOOTER_BG,
  SHADOW_SOFT,
  SHADOW_SOFT_HOVER,
  BTN_RADIUS,
} from './theme/tokens';

// ========================
// Keyframes
// ========================
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ========================
// Constants
// ========================
const GREEN = BRAND_GREEN;
const DARK  = TEXT_DARK;
const GRAY  = TEXT_BODY;

const SECTION_SHELL = {
  mx: { xs: 1.5, sm: 2.5, md: 3 },
  borderRadius: '10px',
  overflow: 'hidden',
} as const;

// ========================
// Styled Components
// ========================
const EyebrowPill = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '5px',
  padding: '5px 20px',
  borderRadius: '100px',
  background: 'rgba(0,0,0,0.04)',
  color: GREEN,
  fontSize: '0.72rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  lineHeight: '26px',
});

const IndustryCard = styled(Box)({
  borderRadius: '10px',
  paddingTop: '40px',
  padding: '40px 50px',
  background: 'linear-gradient(to bottom, #f7f8fa 0%, #fff 100%)',
  transition: 'box-shadow 0.3s',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
  },
  '&:hover .card-overlay': {
    opacity: 1,
  },
});

const ReportCard = styled(Card)({
  border: '1px solid #d8dde6',
  borderRadius: '4px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  transition: 'box-shadow 0.2s, border-color 0.2s, transform 0.2s',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
    borderColor: GREEN,
    transform: 'translateY(-3px)',
  },
});

const PressCard = styled(Box)({
  borderRadius: '10px',
  padding: '40px',
  background: SURFACE_GREEN_LIGHT,
  transition: 'box-shadow 0.3s',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
  },
  '&:hover .card-overlay': {
    opacity: 1,
  },
});

const WhyRow = styled(Box)({
  display: 'flex',
  gap: '16px',
  paddingBottom: '20px',
  marginBottom: '20px',
  borderBottom: '1px solid #d8dde6',
  '&:last-child': { borderBottom: 'none', marginBottom: 0, paddingBottom: 0 },
});

const CertBadge = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '6px',
  padding: '14px 8px',
});

const FooterSection = styled(Box)({
  background: FOOTER_BG,
  color: '#a8bdd1',
  paddingTop: '56px',
});

const GreenBtn = {
  bgcolor: GREEN,
  color: '#fff',
  borderRadius: BTN_RADIUS,
  textTransform: 'none',
  letterSpacing: '0.3px',
  px: '20px',
  py: '10px',
  fontSize: '0.82rem',
  fontWeight: 600,
  border: `2px solid ${GREEN}`,
  boxShadow: SHADOW_SOFT,
  transition: 'all 0.3s ease',
  '&:hover': {
    bgcolor: 'transparent',
    color: GREEN,
    borderColor: GREEN,
    boxShadow: SHADOW_SOFT_HOVER,
    transform: 'translateY(-2px)',
  },
} as const;

const DarkBtn = {
  bgcolor: '#333',
  color: '#fff',
  borderRadius: BTN_RADIUS,
  textTransform: 'none',
  letterSpacing: '0.3px',
  px: '20px',
  py: '10px',
  fontSize: '0.82rem',
  fontWeight: 600,
  border: '2px solid #333',
  boxShadow: SHADOW_SOFT,
  transition: 'all 0.3s ease',
  '&:hover': {
    bgcolor: 'transparent',
    color: '#333',
    borderColor: '#333',
    boxShadow: SHADOW_SOFT_HOVER,
    transform: 'translateY(-2px)',
  },
} as const;

// ========================
// Section Header Component
// ========================
function SectionHeader({
  badge,
  badgeIcon,
  title,
  desc,
}: {
  badge: string;
  badgeIcon?: string;
  title: string;
  desc?: string;
}) {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          rowGap: 1,
          mb: desc ? 1 : 3,
        }}
      >
        <Box
          sx={{
            pr: '25px',
            borderRight: '2px solid #1a1a2e',
            mr: '25px',
            flexShrink: 0,
            '@media (max-width:600px)': { borderRight: 'none', mr: 0, pr: '15px' },
          }}
        >
          <EyebrowPill>
            {badgeIcon && <span style={{ fontSize: '0.9rem' }}>{badgeIcon}</span>}
            {badge}
          </EyebrowPill>
        </Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 600,
            color: DARK,
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            letterSpacing: '-0.03em',
            mb: 0,
          }}
        >
          {title}
        </Typography>
      </Box>
      {desc && (
        <Typography sx={{ textAlign: 'center', color: GRAY, mb: 4, fontSize: '0.95rem', lineHeight: 1.7 }}>
          {desc}
        </Typography>
      )}
    </Box>
  );
}

// ========================
// Data
// ========================
const esgAccordionItems = [
  { tag: 'India Market', title: 'BRSR Compliance Market 2025\u20132033', desc: "Sizing of India's sustainability reporting ecosystem and SEBI mandate impact." },
  { tag: 'Global', title: 'Carbon Credit Markets \u2014 Deep Dive', desc: 'Voluntary and compliance carbon market dynamics, pricing, and regional opportunity maps.' },
  { tag: 'Finance Sector', title: 'Green Finance & ESG Bonds Report', desc: 'Issuance trends, investor appetite, regulatory landscape, and 10-year forecasts.' },
  { tag: 'Enterprise', title: 'Net Zero Strategy Intelligence', desc: 'Sector-by-sector decarbonisation pathways aligned to SBTi and Paris Agreement targets.' },
];

const serviceTabs = [
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

const industries = [
  { name: 'Healthcare & Life Sciences', count: '7 sub-sectors \u00b7 1,200+ reports', subs: 'Biotechnology | Pharmaceuticals | Medical Devices', icon: '\u{1F3E5}' },
  { name: 'Technology & Digital',       count: '7 sub-sectors \u00b7 980+ reports',   subs: 'Next Gen Technologies | Network Security | Digital Media', icon: '\u{1F4BB}' },
  { name: 'Specialty & Fine Chemicals', count: '4 sub-sectors \u00b7 640+ reports',   subs: 'Renewable Chemicals | Catalysts & Enzymes', icon: '\u{1F9EA}' },
  { name: 'Advanced Materials',         count: '6 sub-sectors \u00b7 520+ reports',   subs: 'Smart Textiles | Green Building Materials', icon: '\u2697\uFE0F' },
  { name: 'Consumer Goods',             count: '5 sub-sectors \u00b7 750+ reports',   subs: 'Beauty & Personal Care | Consumer F&B', icon: '\u{1F6CD}\uFE0F' },
  { name: 'Food & Beverages',           count: '4 sub-sectors \u00b7 600+ reports',   subs: 'Nutraceuticals | Food Safety & Processing', icon: '\u{1F33E}' },
];

const stats = [
  { num: '10', suffix: 'K+', label: 'Reports Published' },
  { num: '50', suffix: '+',  label: 'Industries Covered' },
  { num: '500', suffix: '+', label: 'Expert Analysts' },
  { num: '44', suffix: '',   label: 'Countries Served' },
];

const reports = [
  { tag: 'Healthcare',     title: 'Dental Membrane Market Size & Share Report 2025\u20132033', desc: 'The global dental membrane market was valued at USD 682.46 million in 2025 and is projected to reach USD 1,186.38 million by 2033, driven by rising dental implant...', cagr: '7.27%', img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&q=80&auto=format&fit=crop' },
  { tag: 'Food & Bev',     title: 'Middle East Digestive Health Supplements Market 2025\u20132033', desc: 'Valued at USD 435.7 million in 2025, this market is expected to reach USD 951.1 million by 2033 on the back of growing health awareness and premium...', cagr: '10.1%', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80&auto=format&fit=crop' },
  { tag: 'Biotechnology',  title: 'Gene Editing Market Size, Share & Trends Report 2025\u20132033', desc: 'The global gene editing market size was estimated at USD 5.87 billion in 2025 and is projected to reach USD 18.55 billion by 2033, fuelled by CRISPR...', cagr: '15.71%', img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=500&q=80&auto=format&fit=crop' },
  { tag: 'Semiconductors', title: 'LED Driver Market Size & Forecast 2025\u20132033', desc: 'The global LED driver market size was estimated at USD 57.87 billion in 2025, projected to reach USD 123.54 billion by 2033, driven by smart lighting and IoT...', cagr: '10.1%', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80&auto=format&fit=crop' },
  { tag: 'Healthcare',     title: 'Anti-aging Supplements Market Size & Trends 2025\u20132033', desc: 'The global anti-aging supplements market size is expected to reach USD 9.06 billion by 2033, registering strong CAGR from rising longevity awareness and...', cagr: '8.49%', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80&auto=format&fit=crop' },
  { tag: 'Automotive',     title: 'Automotive Fuel Cell Market Size & Share 2025\u20132033', desc: 'The global automotive fuel cell market was estimated at USD 6.89 billion in 2025, projected to reach USD 10.06 billion by 2033 amid growing zero-emission...', cagr: '4.9%', img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=500&q=80&auto=format&fit=crop' },
];

const pressReleases = [
  { title: 'Gene Editing Market Size To Reach $18.55 Billion By 2033', desc: 'The global gene editing market is projected to reach USD 18.55 billion by 2033, growing at a CAGR of 15.71%.', date: 'Feb 2026' },
  { title: 'Anti-aging Supplements Market To Reach $9.06 Billion By 2033', desc: 'The anti-aging supplements market is expected to reach USD 9.06 billion by 2033, registering a CAGR of 8.49%.', date: 'Feb 2026' },
  { title: 'LED Driver Market To Surpass $123 Billion By 2033', desc: 'Technological advancements in smart lighting components driving strong growth in the global LED driver ecosystem.', date: 'Jan 2026' },
];

const whyPoints = [
  { title: 'Global Perspective', desc: 'We have worked with clients in 44 countries. Our perspective means we know what is happening in your regional market and what is working elsewhere in the world.', img: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?w=80&q=80&auto=format&fit=crop' },
  { title: 'Deep Industry Experience', desc: 'We have completed numerous consulting projects across industries. Whatever you do, chances are we already have experience with something very similar.', img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=80&q=80&auto=format&fit=crop' },
  { title: 'Dedicated Support', desc: 'Personalised attention from start to finish with a single point of contact who understands your business objectives and strategic context.', img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=80&q=80&auto=format&fit=crop' },
  { title: 'Proven Process', desc: 'Reliable, time-tested research methodology combining quantitative modelling, expert interviews, and rigorous data validation.', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&q=80&auto=format&fit=crop' },
];

// ========================
// Main Component
// ========================
export default function Page() {
  const [esgExpanded, setEsgExpanded] = useState<string | false>('esg-0');
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ======= ESG Section ======= */}
      <Box sx={{ ...SECTION_SHELL, bgcolor: SURFACE_GREEN_LIGHT, pt: 3, pb: 3, mt: 2, border: '1px solid #e9ecef' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="flex-start">
            <Grid size={{ xs: 12, lg: 5 }}>
              <EyebrowPill sx={{ mb: 2.5 }}>
                <span style={{ fontSize: '1rem' }}>🎧</span>
                New: MindEarth ESG Insights
              </EyebrowPill>
              <Typography variant="h2" sx={{ fontWeight: 600, color: DARK, mb: 1, fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', lineHeight: 1.3, letterSpacing: '-0.03em' }}>
                Dedicated ESG Research for the Sustainable Economy
              </Typography>
              <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#333', mb: 2, lineHeight: 1.7 }}>
                Our ESG practice delivers investor-grade intelligence on sustainability markets, BRSR compliance, carbon credits, green finance, and climate risk &mdash; built for India and global markets.
              </Typography>
              <Box sx={{ borderTop: '1px solid #ccc', pt: 1.5, mt: 1 }}>
                <Box sx={{ display: 'flex', gap: 1.5, mt: 1.5, mb: 2.5, alignItems: 'center' }}>
                  <Button variant="contained" sx={GreenBtn}>
                    ✏️&nbsp; Enter ESG Insights Hub
                  </Button>
                  <Button variant="contained" sx={DarkBtn}>
                    📄&nbsp; Download ESG Sample
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, lg: 7 }}>
              {esgAccordionItems.map((item, i) => (
                <Accordion
                  key={i}
                  expanded={esgExpanded === `esg-${i}`}
                  onChange={(_, isExpanded) => setEsgExpanded(isExpanded ? `esg-${i}` : false)}
                  sx={{ boxShadow: 'none', bgcolor: 'transparent', '&:before': { display: 'none' } }}
                >
                  <AccordionSummary
                    expandIcon={esgExpanded === `esg-${i}` ? <RemoveIcon /> : <AddIcon />}
                    sx={{ borderBottom: '1px solid #ccc', px: 0 }}
                  >
                    <Box>
                      <Typography sx={{ color: GREEN, fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.tag}</Typography>
                      <Typography sx={{ fontWeight: 500, fontSize: '1.05rem', color: DARK }}>{item.title}</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ borderBottom: '1px solid #ccc', px: 0 }}>
                    <Typography sx={{ fontSize: '0.9rem', color: GRAY }}>{item.desc}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ======= Banner / Hero Section ======= */}
      <Box sx={{ ...SECTION_SHELL, mt: 4, animation: `${fadeInUp} 0.6s ease both` }}>
        <Container maxWidth={false} disableGutters>
          <Grid container alignItems="center">
            <Grid size={{ xs: 12, lg: 6 }} sx={{ px: { xs: 3, md: 5, lg: 8 }, py: { xs: 4, lg: 5 } }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: '6px', mb: 2, bgcolor: 'rgba(58,149,79,0.08)', border: '1px solid rgba(58,149,79,0.25)', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, color: DARK, letterSpacing: '-0.02em' }}>
                🌐&nbsp;<span>Global Market Intelligence</span>
              </Box>
              <Typography variant="h1" sx={{ color: DARK, mb: 2, fontWeight: 600, fontSize: 'clamp(1.6rem, 3vw, 2rem)', lineHeight: 1.35, letterSpacing: '-0.03em' }}>
                Trusted Market Research for Smarter Business Decisions.
              </Typography>
              <Typography sx={{ color: GRAY, fontSize: '0.95rem', mb: 3, lineHeight: 1.75 }}>
                Comprehensive syndicated and custom research across 50+ industries. Relied upon by Fortune 500 companies and leading academic institutions worldwide.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 3 }}>
                <Button variant="contained" sx={GreenBtn}>
                  ✏️&nbsp; View All Reports
                </Button>
                <Button variant="contained" sx={DarkBtn}>
                  📄&nbsp; Request Custom Research
                </Button>
              </Box>
              <Box sx={{ position: 'relative' }}>
                <TextField
                  fullWidth
                  placeholder="Search Reports by Industry or Keyword"
                  variant="outlined"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#fff',
                      borderRadius: '10px',
                      pr: '110px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                      '& fieldset': { borderColor: '#d8dde6' },
                      '&:hover fieldset': { borderColor: GREEN },
                      '&.Mui-focused fieldset': { borderColor: GREEN },
                    },
                    '& .MuiInputBase-input': { py: '11px', fontSize: '0.9rem' },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)',
                    bgcolor: GREEN, borderRadius: '8px', textTransform: 'none', px: 2.5,
                    minHeight: '36px', fontSize: '0.85rem', fontWeight: 600,
                    '&:hover': { bgcolor: '#2d7a3f' },
                  }}
                >
                  Search
                </Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }} sx={{ display: { xs: 'none', lg: 'block' } }}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&auto=format&fit=crop"
                alt="Market Research Banner"
                sx={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ======= Tab / Services Section ======= */}
      <Box sx={{ ...SECTION_SHELL, py: 6 }}>
        <Container maxWidth="lg">
          <SectionHeader
            badge="Our Services"
            badgeIcon="📦"
            title="Discover How MindEarth Can Help Your Business"
            desc="From off-the-shelf syndicated research to bespoke consulting engagements, we deliver the intelligence your organisation needs to make confident decisions."
          />
          <Box sx={{ borderBottom: 1, borderColor: '#d8dde6', mb: 4 }}>
            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': { textTransform: 'none', fontWeight: 500, fontSize: '0.88rem', color: '#555' },
                '& .Mui-selected': { color: GREEN, fontWeight: 600 },
                '& .MuiTabs-indicator': { bgcolor: GREEN },
              }}
            >
              {serviceTabs.map((tab, i) => (
                <Tab key={i} label={tab.label} />
              ))}
            </Tabs>
          </Box>
          {serviceTabs.map((tab, i) => (
            <Box key={i} role="tabpanel" hidden={activeTab !== i}>
              {activeTab === i && (
                <Grid container spacing={5} alignItems="center">
                  <Grid size={{ xs: 12, lg: 6 }}>
                    <Box component="img" src={tab.img} alt={tab.title} sx={{ width: '100%', borderRadius: '8px', height: '360px', objectFit: 'cover' }} />
                  </Grid>
                  <Grid size={{ xs: 12, lg: 6 }}>
                    <Typography variant="h4" sx={{ fontWeight: 600, color: DARK, mb: 1.5, fontSize: '1.5rem', letterSpacing: '-0.02em' }}>
                      {tab.title}
                    </Typography>
                    <Typography sx={{ color: GRAY, mb: 2.5, fontSize: '0.875rem', lineHeight: 1.75 }}>
                      {tab.desc}
                    </Typography>
                    {tab.bullets.map((bullet, j) => (
                      <Box key={j} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                        <CheckCircleOutlineIcon sx={{ color: GREEN, fontSize: '1.15rem', flexShrink: 0 }} />
                        <Typography sx={{ fontWeight: 500, fontSize: '0.88rem', color: DARK }}>{bullet}</Typography>
                      </Box>
                    ))}
                    <Button
                      variant="outlined"
                      sx={{
                        mt: 3,
                        color: GREEN,
                        borderColor: GREEN,
                        borderRadius: '30px',
                        textTransform: 'none',
                        letterSpacing: '0.3px',
                        fontWeight: 600,
                        px: '20px',
                        py: '10px',
                        transition: 'all 0.3s ease',
                        '&:hover': { bgcolor: GREEN, color: '#fff', borderColor: GREEN },
                      }}
                    >
                      {tab.cta}
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Box>
          ))}
        </Container>
      </Box>

      {/* ======= Stats Section ======= */}
      <Box sx={{ ...SECTION_SHELL, bgcolor: SURFACE_GREEN_LIGHT, py: 6 }}>
        <Container maxWidth="lg">
          <SectionHeader badge="Facts that matter" badgeIcon="❤️" title="The numbers tell the story" />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, mt: 2 }}>
            {stats.map((stat, i) => (
              <Box
                key={i}
                sx={{
                  py: '25px', px: '35px', textAlign: 'center',
                  borderLeft: i > 0 ? `1px solid ${GREEN}` : 'none',
                  '@media (max-width:900px)': {
                    borderLeft: i % 2 === 0 ? 'none' : `1px solid ${GREEN}`,
                    borderTop: i >= 2 ? `1px solid ${GREEN}` : 'none',
                  },
                }}
              >
                <Typography sx={{ color: GREEN, fontWeight: 600, fontSize: '1rem', mb: 1 }}>{stat.label}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '2px' }}>
                  <ArrowUpwardIcon sx={{ color: DARK, fontSize: '1.4rem', mt: '4px' }} />
                  <Box component="span" sx={{ fontSize: '3rem', fontWeight: 700, color: DARK, lineHeight: 1, fontFamily: "'Libre Baskerville', serif" }}>
                    {stat.num}
                  </Box>
                  <Box component="span" sx={{ fontSize: '1.2rem', fontWeight: 700, color: DARK, mt: '4px' }}>
                    {stat.suffix}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ======= Markets We Cover Section ======= */}
      <Box sx={{ ...SECTION_SHELL, py: 6, borderTop: '1px solid #d8dde6', borderBottom: '1px solid #d8dde6' }}>
        <Container maxWidth="lg">
          <SectionHeader
            badge="Markets We Cover"
            badgeIcon="📦"
            title="50+ Industries. Every Geography."
            desc="Explore MindEarth's comprehensive industry coverage — from legacy sectors to next-generation technology markets."
          />
          <Grid container spacing={3}>
            {industries.map((ind, i) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={i}>
                <IndustryCard>
                  <Box className="card-overlay" sx={{ position: 'absolute', inset: 0, borderRadius: '10px', bgcolor: 'rgba(255,255,255,0.5)', opacity: 0, transition: 'opacity 0.3s', pointerEvents: 'none' }} />
                  <Box sx={{ width: 50, height: 50, mb: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                    {ind.icon}
                  </Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '1.15rem', color: DARK, mb: 0.5, letterSpacing: '-0.02em' }}>
                    {ind.name}
                  </Typography>
                  <Typography sx={{ color: GREEN, fontWeight: 600, fontSize: '0.85rem', mb: 0.75, display: 'block' }}>
                    {ind.count}
                  </Typography>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.82rem', color: '#555' }}>
                    {ind.subs}
                  </Typography>
                </IndustryCard>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button variant="contained" sx={GreenBtn}>
              ✏️&nbsp; View All Industries &amp; Reports
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ======= Latest Publications Section ======= */}
      <Box sx={{ ...SECTION_SHELL, py: 6, borderBottom: '1px solid #d8dde6' }}>
        <Container maxWidth="lg">
          <SectionHeader
            badge="Latest Publications"
            badgeIcon="❤️"
            title="Recently Published Market Research"
            desc="Stay updated with expert perspectives, industry analysis, and forward-looking trends from our global analyst team."
          />
          <Grid container spacing={3}>
            {reports.map((r, i) => (
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={i}>
                <ReportCard>
                  <Box sx={{ height: 190, overflow: 'hidden', position: 'relative', bgcolor: '#eef1f6' }}>
                    <Box component="img" src={r.img} alt={r.title} sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', '&:hover': { transform: 'scale(1.04)' } }} />
                    <Chip label={r.tag} size="small" sx={{ position: 'absolute', top: 12, left: 12, bgcolor: '#fff', color: DARK, fontWeight: 700, textTransform: 'uppercase', fontSize: '0.65rem', borderRadius: '4px' }} />
                  </Box>
                  <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', mb: 1.25, lineHeight: 1.55, color: DARK }}>
                      {r.title}
                    </Typography>
                    <Typography sx={{ fontSize: '0.8rem', color: '#6b7a8d', flex: 1, mb: 2, lineHeight: 1.6 }}>{r.desc}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1.5, borderTop: '1px solid #d8dde6' }}>
                      <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: DARK }}>CAGR {r.cagr}</Typography>
                      <MuiLink href="#" underline="none" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, fontSize: '0.78rem', fontWeight: 700, color: GREEN, '&:hover': { textDecoration: 'underline' } }}>
                        Read More <ArrowForwardIcon sx={{ fontSize: '0.85rem' }} />
                      </MuiLink>
                    </Box>
                  </CardContent>
                </ReportCard>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Button variant="contained" sx={GreenBtn}>
              ✏️&nbsp; View All Publications
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ======= Press Releases Section ======= */}
      <Box sx={{ ...SECTION_SHELL, py: 6 }}>
        <Container maxWidth="lg">
          <SectionHeader badge="Press Releases" badgeIcon="❤️" title="Latest Market Research Headlines" />
          <Grid container spacing={3} justifyContent="center">
            {pressReleases.map((pr, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <PressCard>
                  <Box className="card-overlay" sx={{ position: 'absolute', inset: 0, borderRadius: '10px', bgcolor: 'rgba(255,255,255,0.55)', opacity: 0, transition: 'opacity 0.3s', pointerEvents: 'none' }} />
                  <Typography sx={{ fontWeight: 600, fontSize: '1.1rem', color: DARK, mb: 1.5, lineHeight: 1.5, flex: 1 }}>
                    {pr.title}
                  </Typography>
                  <Typography sx={{ fontSize: '0.9rem', color: GRAY, mb: 2.5, lineHeight: 1.7 }}>
                    {pr.desc}
                  </Typography>
                  <Typography sx={{ fontWeight: 600, color: DARK, fontSize: '0.85rem', borderTop: '1px solid #ccc', pt: 1.5 }}>
                    {pr.date}
                  </Typography>
                </PressCard>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button variant="contained" sx={GreenBtn}>
              ✏️&nbsp; View All Press Releases
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ======= Why MindEarth Section ======= */}
      <Box sx={{ ...SECTION_SHELL, py: 6, borderTop: '1px solid #d8dde6' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="flex-start">
            <Grid size={{ xs: 12, lg: 5 }}>
              <EyebrowPill sx={{ mb: 2.5 }}>
                <span style={{ fontSize: '1rem' }}>🎧</span>
                Why MindEarth
              </EyebrowPill>
              <Typography variant="h2" sx={{ fontWeight: 600, color: DARK, mb: 1, fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', letterSpacing: '-0.03em', lineHeight: 1.3 }}>
                Your Trusted Research Partner
              </Typography>
              <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#333', mb: 1.5, lineHeight: 1.7 }}>
                Selecting a trusted partner to provide market research and advice requires balancing rigor, service quality, and resourcing constraints &mdash; all while ensuring accurate, clear, and actionable data.
              </Typography>
              <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#333', mb: 3, lineHeight: 1.7 }}>
                MindEarth brings together deep domain expertise, proven research methodologies, and an unwavering commitment to client outcomes.
              </Typography>
              <Grid container spacing={1}>
                {[{ icon: '🔒', label: 'GDPR & CCPA' }, { icon: '✅', label: 'ISO 9001' }, { icon: '🛡️', label: 'ISO 27001' }, { icon: '📊', label: 'ESOMAR' }].map((cert, i) => (
                  <Grid size={{ xs: 3 }} key={i}>
                    <CertBadge>
                      <Typography sx={{ fontSize: '1.8rem' }}>{cert.icon}</Typography>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.72rem', color: DARK, textAlign: 'center', lineHeight: 1.2 }}>{cert.label}</Typography>
                    </CertBadge>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid size={{ xs: 12, lg: 7 }}>
              {whyPoints.map((point, i) => (
                <WhyRow key={i}>
                  <Box sx={{ width: 50, height: 50, flexShrink: 0, borderRadius: '6px', overflow: 'hidden' }}>
                    <Box component="img" src={point.img} alt={point.title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  <Box>
                    <Typography sx={{ color: GREEN, fontWeight: 600, fontSize: '1.1rem', mb: 0.5, letterSpacing: '-0.01em' }}>
                      {point.title}
                    </Typography>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.82rem', color: DARK, lineHeight: 1.65 }}>
                      {point.desc}
                    </Typography>
                  </Box>
                </WhyRow>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ======= CTA Section ======= */}
      <Box sx={{ ...SECTION_SHELL, borderTop: '1px solid #d8dde6', py: 6, textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 600, color: DARK, mb: 1, fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.03em' }}>
            Trusted Market Insights &mdash; Try a Free Sample
          </Typography>
          <Typography sx={{ color: GRAY, maxWidth: 600, mx: 'auto', mb: 3.5, fontSize: '0.95rem', lineHeight: 1.7 }}>
            See how our reports are structured and why industry leaders rely on MindEarth. Get a free sample or ask us to tailor a report to your specific needs.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" sx={GreenBtn}>
              ✏️&nbsp; Download Free Sample
            </Button>
            <Button variant="contained" sx={DarkBtn}>
              📄&nbsp; Request Custom Research
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ======= Footer ======= */}
      <FooterSection sx={{ ...SECTION_SHELL, mt: 1.5 }}>
        <Container maxWidth="lg">
          <Grid container spacing={5} sx={{ pb: 6, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>MindEarth</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>Market Intelligence</Typography>
              <Typography sx={{ fontSize: '0.82rem', color: '#a8bdd1', mt: 1.5, lineHeight: 1.7 }}>
                MindEarth is a market research and strategic intelligence firm delivering syndicated reports, custom research, and consulting services to Fortune 2000 companies, investors, and leading academic institutions worldwide.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 2.5 }}>
                {['f', 'in', '𝕏', '📷'].map((icon, i) => (
                  <Box key={i} sx={{ width: 34, height: 34, bgcolor: 'rgba(255,255,255,0.08)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: '#a8bdd1', cursor: 'pointer', transition: 'background 0.2s', '&:hover': { bgcolor: GREEN, color: '#fff' } }}>
                    {icon}
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid size={{ xs: 6, md: 2 }}>
              <Typography sx={{ color: '#fff', fontSize: '1rem', fontWeight: 500, mb: 1.5 }}>Company</Typography>
              {['Customer FAQ', 'How To Order', 'Privacy Policy', 'Terms of Use', 'Sitemap', 'Careers'].map((link) => (
                <MuiLink key={link} href="#" underline="none" sx={{ display: 'block', fontSize: '0.82rem', color: '#a8bdd1', py: 0.5, '&:hover': { color: '#fff' } }}>{link}</MuiLink>
              ))}
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <Typography sx={{ color: '#fff', fontSize: '1rem', fontWeight: 500, mb: 1.5 }}>Our Services</Typography>
              {['Brainshare (Consulting)', 'Custom Research', 'Pipeline (Procurement)', 'Signal (Pricing DB)', 'Horizon (Subscriptions)', 'ESG Insights'].map((link) => (
                <MuiLink key={link} href="#" underline="none" sx={{ display: 'block', fontSize: '0.82rem', color: '#a8bdd1', py: 0.5, '&:hover': { color: '#fff' } }}>{link}</MuiLink>
              ))}
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography sx={{ color: '#fff', fontSize: '1rem', fontWeight: 500, mb: 1.5 }}>Contact</Typography>
              <MuiLink href="tel:+1-415-349-0058" underline="none" sx={{ display: 'block', fontSize: '0.82rem', color: '#fff', mb: 0.5 }}>+1-415-349-0058</MuiLink>
              <MuiLink href="tel:+1-415-349-0058" underline="none" sx={{ display: 'block', fontSize: '0.82rem', color: '#fff', mb: 0.5 }}>+1-415-349-0058</MuiLink>
              <MuiLink href="mailto:sales@mindearth.com" sx={{ display: 'block', fontSize: '0.82rem', color: '#fff', mb: 2, textDecoration: 'underline' }}>sales@mindearth.com</MuiLink>
              <Typography sx={{ fontSize: '0.8rem', color: '#fff', fontWeight: 500, mb: 0.5 }}>Business Hours</Typography>
              <Typography sx={{ fontSize: '0.78rem', color: '#a8bdd1', lineHeight: 1.6 }}>
                Mon&ndash;Fri: 9am to 5pm (support 24hrs, 5 days a week)
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ py: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
            <Typography sx={{ fontSize: '0.78rem', color: '#a8bdd1' }}>
              &copy; 2026 MindEarth Research, Inc. All rights reserved.
            </Typography>
            <Typography sx={{ fontSize: '0.78rem', color: '#a8bdd1' }}>
              Design and Developed by N M Design Studio.
            </Typography>
          </Box>
        </Container>
      </FooterSection>
    </Box>
  );
}
