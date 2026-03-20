'use client';

import { useState, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Link as MuiLink,
  Paper,
} from '@mui/material';
import { styled, keyframes } from '@mui/system';
import Image from 'next/image';
import Link from 'next/link';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import {
  BRAND_GREEN,
  TEXT_DARK,
  SHADOW_MENU,
  SHADOW_SOFT_HOVER,
  BTN_RADIUS,
} from '../theme/tokens';

// ========================
// Mega Menu Data
// ========================
const reportsMegaMenu = [
  {
    heading: 'Consumer Goods',
    items: [
      { label: 'Beauty & Personal Care', href: '/reports/beauty-personal-care' },
      { label: 'Clothing, Footwear & Accessories', href: '/reports/clothing-footwear-accessories' },
      { label: 'Consumer F&B', href: '/reports/consumer-fb' },
      { label: 'Electronic & Electrical', href: '/reports/electronic-electrical' },
      { label: 'Homecare & Decor', href: '/reports/homecare-decor' },
    ],
  },
  {
    heading: 'Semiconductors & Electronics',
    items: [
      { label: 'Display Technologies', href: '/reports/display-technologies' },
      { label: 'Electronic Security Systems', href: '/reports/electronic-security-systems' },
      { label: 'Electronic Devices', href: '/reports/electronic-devices' },
      { label: 'Semiconductors', href: '/reports/semiconductors' },
      { label: 'Sensors & Controls', href: '/reports/sensors-controls' },
    ],
  },
  {
    heading: 'Specialty & Fine Chemicals',
    items: [
      { label: 'Catalysts & Enzymes', href: '/reports/catalysts-enzymes' },
      { label: 'Food Additives & Nutricosmetics', href: '/reports/food-additives' },
      { label: 'Renewable Chemicals', href: '/reports/renewable-chemicals' },
      { label: 'Specialty & Bio-based Polymers', href: '/reports/specialty-polymers' },
    ],
  },
  {
    heading: 'Food & Beverages',
    items: [
      { label: 'Animal Feed & Feed Additives', href: '/reports/animal-feed' },
      { label: 'Food Safety & Processing', href: '/reports/food-safety' },
      { label: 'Nutraceuticals & Functional Foods', href: '/reports/nutraceuticals' },
      { label: 'Processed & Frozen Foods', href: '/reports/processed-foods' },
    ],
  },
  {
    heading: 'Advanced Materials',
    items: [
      { label: 'Advanced Interior Materials', href: '/reports/advanced-interior-materials' },
      { label: 'Green Building Materials', href: '/reports/green-building-materials' },
      { label: 'Nanoparticles', href: '/reports/nanoparticles' },
      { label: 'Smart Textiles', href: '/reports/smart-textiles' },
      { label: 'Glass, Ceramics & Fibers', href: '/reports/glass-ceramics-fibers' },
    ],
  },
  {
    heading: 'Healthcare',
    items: [
      { label: 'Biotechnology', href: '/reports/biotechnology' },
      { label: 'Clinical Diagnostics', href: '/reports/clinical-diagnostics' },
      { label: 'Healthcare IT', href: '/reports/healthcare-it' },
      { label: 'Medical Devices', href: '/reports/medical-devices' },
      { label: 'Pharmaceuticals', href: '/reports/pharmaceuticals' },
      { label: 'Animal Health', href: '/reports/animal-health' },
    ],
  },
  {
    heading: 'Technology',
    items: [
      { label: 'Automotive & Transportation', href: '/reports/automotive-transportation' },
      { label: 'Communications Infrastructure', href: '/reports/communications-infrastructure' },
      { label: 'Digital Media', href: '/reports/digital-media' },
      { label: 'Network Security', href: '/reports/network-security' },
      { label: 'Next Generation Technologies', href: '/reports/next-gen-technologies' },
    ],
  },
  {
    heading: 'Bulk Chemicals',
    items: [
      { label: 'Agrochemicals & Fertilizers', href: '/reports/agrochemicals-fertilizers' },
      { label: 'Organic Chemicals', href: '/reports/organic-chemicals' },
      { label: 'Paints, Coatings & Printing Inks', href: '/reports/paints-coatings' },
      { label: 'Plastics, Polymers & Resins', href: '/reports/plastics-polymers' },
      { label: 'Water & Sludge Treatment', href: '/reports/water-sludge-treatment' },
    ],
  },
];

const servicesMegaMenu = [
  {
    heading: 'Audit',
    items: [
      { label: 'ESG Baseline Assessment', href: '#' },
      { label: 'ESG Gap Analysis', href: '#' },
      { label: 'Sustainability Performance Audit', href: '#' },
      { label: 'Energy & Resource Efficiency Audit', href: '#' },
      { label: 'Supply Chain ESG Audit', href: '#' },
    ],
  },
  {
    heading: 'Reporting',
    items: [
      { label: 'BRSR Reporting', href: '#' },
      { label: 'Sustainability Reporting', href: '#' },
      { label: 'ESG Data Management', href: '#' },
      { label: 'GRI / Global Standards Reporting', href: '#' },
      { label: 'Integrated Reporting', href: '#' },
    ],
  },
  {
    heading: 'Advisory',
    items: [
      { label: 'ESG Policy Development', href: '#' },
      { label: 'ESG Risk Assessment', href: '#' },
      { label: 'Governance Framework Advisory', href: '#' },
      { label: 'Sustainable Supply Chain Advisory', href: '#' },
      { label: 'Stakeholder Engagement', href: '#' },
    ],
  },
  {
    heading: 'Strategy',
    items: [
      { label: 'ESG Roadmap Development', href: '#' },
      { label: 'Net Zero Strategy', href: '#' },
      { label: 'Climate Transition Planning', href: '#' },
      { label: 'Sustainability Integration Strategy', href: '#' },
      { label: 'Long-Term ESG Value Creation', href: '#' },
    ],
  },
  {
    heading: 'Implementation',
    items: [
      { label: 'ESG Program Deployment', href: '#' },
      { label: 'Carbon Footprint Measurement', href: '#' },
      { label: 'Energy Transition Projects', href: '#' },
      { label: 'Supply Chain ESG Integration', href: '#' },
      { label: 'Monitoring & KPI Systems', href: '#' },
    ],
  },
  {
    heading: 'Training',
    items: [
      { label: 'ESG Awareness Workshops', href: '#' },
      { label: 'BRSR Training Programs', href: '#' },
      { label: 'Corporate Sustainability Training', href: '#' },
      { label: 'Leadership ESG Programs', href: '#' },
      { label: 'Employee Capacity Building', href: '#' },
    ],
  },
  {
    heading: 'Assurance',
    items: [
      { label: 'ESG Data Verification', href: '#' },
      { label: 'Sustainability Report Assurance', href: '#' },
      { label: 'BRSR Assurance', href: '#' },
      { label: 'Third-Party ESG Validation', href: '#' },
      { label: 'Compliance Certification Support', href: '#' },
    ],
  },
];

const insightsDropdown = [
  { label: 'Blog/Press Room', href: '#' },
  { label: 'Case Studies', href: '#' },
  { label: 'White Paper', href: '#' },
];

// ========================
// Styled Components
// ========================
const TopBar = styled(Box)({
  background: '#fff',
  borderBottom: '1px solid #e0e0e0',
  padding: '0',
});

const StyledNavBar = styled(AppBar)({
  background: 'transparent',
  boxShadow: 'none',
  position: 'relative',
});



const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const MegaMenuWrapper = styled(Paper)({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  zIndex: 1200,
  background: '#fff',
  borderRadius: '0 0 12px 12px',
  boxShadow: SHADOW_MENU,
  animation: `${slideDown} 0.25s ease-out`,
  borderTop: `3px solid ${BRAND_GREEN}`,
});

const CategoryHeading = styled(Typography)({
  fontSize: '0.85rem',
  fontWeight: 700,
  color: BRAND_GREEN,
  marginBottom: '10px',
  paddingBottom: '8px',
  borderBottom: '1px solid #e0e0e0',
});

const MenuItemLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '5px 10px',
  borderRadius: '6px',
  fontSize: '0.825rem',
  fontWeight: 500,
  color: '#334155',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: '#f0f7f0',
    color: BRAND_GREEN,
    paddingLeft: '14px',
  },
});

const NavButton = styled(Button)({
  color: TEXT_DARK,
  fontWeight: 600,
  fontSize: '0.85rem',
  textTransform: 'none',
  letterSpacing: '0.3px',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 6,
    left: '50%',
    width: 0,
    height: '2px',
    background: BRAND_GREEN,
    transition: 'all 0.3s ease',
    transform: 'translateX(-50%)',
  },
  '&:hover::after, &.active::after': {
    width: '70%',
  },
  '&:hover': {
    background: 'transparent',
    color: BRAND_GREEN,
  },
});

const DropdownMenu = styled(Paper)({
  position: 'absolute',
  top: '100%',
  left: 0,
  zIndex: 1200,
  background: '#fff',
  borderRadius: '0 0 8px 8px',
  boxShadow: SHADOW_SOFT_HOVER,
  animation: `${slideDown} 0.2s ease-out`,
  borderTop: `2px solid ${BRAND_GREEN}`,
  minWidth: '220px',
  padding: '8px 0',
});

const DropdownItem = styled(Link)({
  display: 'block',
  padding: '10px 20px',
  fontSize: '0.85rem',
  fontWeight: 500,
  color: '#334155',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: '#f0f7f0',
    color: BRAND_GREEN,
  },
});

// ========================
// Navbar Component
// ========================
export default function Navbar() {
  const [reportsMegaOpen, setReportsMegaOpen] = useState(false);
  const [servicesMegaOpen, setServicesMegaOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const reportsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const servicesTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const insightsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = (
    setter: (v: boolean) => void,
    timeout: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
  ) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
    // Close others
    setReportsMegaOpen(false);
    setServicesMegaOpen(false);
    setInsightsOpen(false);
    setter(true);
  };

  const handleLeave = (
    setter: (v: boolean) => void,
    timeout: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
  ) => {
    timeout.current = setTimeout(() => {
      setter(false);
    }, 200);
  };

  return (
    <>
      {/* Top Bar */}
      <TopBar>
        <Container maxWidth={false}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '50px', py: { xs: 0.75, sm: 0 } }}>
            <Typography sx={{ fontSize: '0.8125rem', color: TEXT_DARK, fontWeight: 500, lineHeight: 1.4 }}>
              👋 Trusted by Fortune 500 companies across 44 countries | 10,000+ reports published
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2.5, alignItems: 'center' }}>
              <MuiLink href="mailto:sales@mindearth.com" sx={{ color: TEXT_DARK, fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 0.5, '&:hover': { color: BRAND_GREEN } }}>
                <MailOutlineIcon sx={{ fontSize: '1rem', color: BRAND_GREEN }} />
                sales@mindearth.com
              </MuiLink>
              <Typography sx={{ color: TEXT_DARK, fontSize: '0.85rem', fontWeight: 500, display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 0.5 }}>
                <PhoneOutlinedIcon sx={{ fontSize: '1rem', color: BRAND_GREEN }} />
                +1-415-349-0058
              </Typography>
              <Box
                sx={{
                  bgcolor: BRAND_GREEN,
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.4px',
                  borderRadius: BTN_RADIUS,
                  px: '20px',
                  py: '6px',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#2d7a3f' },
                }}
              >
                LOGIN
              </Box>
            </Box>
          </Box>
        </Container>
      </TopBar>

      {/* Navbar */}
      <StyledNavBar position="sticky" sx={{ bgcolor: '#fff', borderBottom: '1px solid #eee' }}>
        <Container maxWidth={false}>
          <Toolbar sx={{ justifyContent: 'space-between', px: 0, minHeight: '70px !important' }}>
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Image
                src="/logo.jpg"
                alt="MindEarth Market Intelligence"
                width={140}
                height={35}
                style={{ objectFit: 'contain' }}
                priority
              />
            </Link>

            {/* Nav Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center' }}>
              <Link href="/" style={{ textDecoration: 'none' }}>
                <NavButton>Home</NavButton>
              </Link>

              {/* Reports mega menu trigger */}
              <Box
                onMouseEnter={() => handleEnter(setReportsMegaOpen, reportsTimeout)}
                onMouseLeave={() => handleLeave(setReportsMegaOpen, reportsTimeout)}
                sx={{ position: 'relative' }}
              >
                <NavButton
                  className={reportsMegaOpen ? 'active' : ''}
                  endIcon={
                    <KeyboardArrowDownIcon
                      sx={{
                        fontSize: '18px !important',
                        transition: 'transform 0.3s',
                        transform: reportsMegaOpen ? 'rotate(180deg)' : 'rotate(0)',
                      }}
                    />
                  }
                >
                  Reports
                </NavButton>
              </Box>

              {/* Services mega menu trigger */}
              <Box
                onMouseEnter={() => handleEnter(setServicesMegaOpen, servicesTimeout)}
                onMouseLeave={() => handleLeave(setServicesMegaOpen, servicesTimeout)}
                sx={{ position: 'relative' }}
              >
                <NavButton
                  className={servicesMegaOpen ? 'active' : ''}
                  endIcon={
                    <KeyboardArrowDownIcon
                      sx={{
                        fontSize: '18px !important',
                        transition: 'transform 0.3s',
                        transform: servicesMegaOpen ? 'rotate(180deg)' : 'rotate(0)',
                      }}
                    />
                  }
                >
                  Services
                </NavButton>
              </Box>

              {/* Insights dropdown trigger */}
              <Box
                onMouseEnter={() => handleEnter(setInsightsOpen, insightsTimeout)}
                onMouseLeave={() => handleLeave(setInsightsOpen, insightsTimeout)}
                sx={{ position: 'relative' }}
              >
                <NavButton
                  className={insightsOpen ? 'active' : ''}
                  endIcon={
                    <KeyboardArrowDownIcon
                      sx={{
                        fontSize: '18px !important',
                        transition: 'transform 0.3s',
                        transform: insightsOpen ? 'rotate(180deg)' : 'rotate(0)',
                      }}
                    />
                  }
                >
                  Insights
                </NavButton>
                {insightsOpen && (
                  <DropdownMenu elevation={0}>
                    {insightsDropdown.map((item) => (
                      <DropdownItem key={item.label} href={item.href} onClick={() => setInsightsOpen(false)}>
                        {item.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                )}
              </Box>

              <Link href="#" style={{ textDecoration: 'none' }}>
                <NavButton>About Us</NavButton>
              </Link>
            </Box>

            {/* Right side — empty since LOGIN is in top bar */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }} />
          </Toolbar>
        </Container>

        {/* Reports Mega Menu Dropdown */}
        {reportsMegaOpen && (
          <Box
            onMouseEnter={() => handleEnter(setReportsMegaOpen, reportsTimeout)}
            onMouseLeave={() => handleLeave(setReportsMegaOpen, reportsTimeout)}
          >
            <MegaMenuWrapper elevation={0}>
              <Container maxWidth={false}>
                <Box sx={{ py: 3 }}>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
                      gap: 3,
                    }}
                  >
                    {reportsMegaMenu.map((category) => (
                      <Box key={category.heading}>
                        <CategoryHeading>{category.heading}</CategoryHeading>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                          {category.items.map((item) => (
                            <MenuItemLink
                              key={item.label}
                              href={item.href}
                              onClick={() => setReportsMegaOpen(false)}
                            >
                              {item.label}
                            </MenuItemLink>
                          ))}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Container>
            </MegaMenuWrapper>
          </Box>
        )}

        {/* Services Mega Menu Dropdown */}
        {servicesMegaOpen && (
          <Box
            onMouseEnter={() => handleEnter(setServicesMegaOpen, servicesTimeout)}
            onMouseLeave={() => handleLeave(setServicesMegaOpen, servicesTimeout)}
          >
            <MegaMenuWrapper elevation={0}>
              <Container maxWidth={false}>
                <Box sx={{ py: 3 }}>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
                      gap: 3,
                    }}
                  >
                    {servicesMegaMenu.map((category) => (
                      <Box key={category.heading}>
                        <CategoryHeading>{category.heading}</CategoryHeading>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                          {category.items.map((item) => (
                            <MenuItemLink
                              key={item.label}
                              href={item.href}
                              onClick={() => setServicesMegaOpen(false)}
                            >
                              {item.label}
                            </MenuItemLink>
                          ))}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Container>
            </MegaMenuWrapper>
          </Box>
        )}
      </StyledNavBar>
    </>
  );
}
