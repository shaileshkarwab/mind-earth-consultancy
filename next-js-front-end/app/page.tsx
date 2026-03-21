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
  CardContent,
  Link as MuiLink,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tab,
  Tabs,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { SURFACE_GREEN_LIGHT } from './theme/tokens';
import {
  fadeInUp,
  GREEN,
  DARK,
  GRAY,
  SECTION_SHELL,
  EyebrowPill,
  IndustryCard,
  ReportCard,
  PressCard,
  WhyRow,
  CertBadge,
  GreenBtn,
  DarkBtn,
} from './page.styles';

import { esgAccordionItems, serviceTabs, stats, industries, reports, pressReleases, whyPoints } from './data/reports';
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
          <Grid container spacing={6} alignItems="flex-start">
            <Grid size={{ xs: 12, lg: 5 }}>
              <EyebrowPill sx={{ mb: 2.5 }}>
                <span style={{ fontSize: '1rem' }}>🎧</span>
                New: MindEarth ESG Insights
              </EyebrowPill>
              <Typography variant="h2" sx={{ fontWeight: 600, color: DARK, mb: 1, fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', lineHeight: 1.3, letterSpacing: '-0.03em' }}>
                Dedicated ESG Research for the Sustainable Economy
              </Typography>
              <Typography sx={{ fontWeight: 200, fontSize: '0.9rem', color: '#333', mb: 2, lineHeight: 1.7 }}>
                Our ESG practice delivers investor-grade intelligence on sustainability markets, BRSR compliance, carbon credits, green finance, and climate risk &mdash; built for India and global markets.
              </Typography>
              <Box sx={{ borderTop: '1px solid #ccc', pt: 1.5, mt: 1 }}>
                <Box sx={{ display: 'flex', gap: 1.5, mt: 1, mb: 1.5, alignItems: 'center' }}>
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
    </Box>
  );
}
