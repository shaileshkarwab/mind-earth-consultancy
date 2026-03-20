import { Box, Card, Paper, AppBar, Button, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import Link from 'next/link';
import {
  BRAND_GREEN,
  TEXT_DARK,
  TEXT_BODY,
  SURFACE_GREEN_LIGHT,
  FOOTER_BG,
  SHADOW_SOFT,
  SHADOW_SOFT_HOVER,
  BTN_RADIUS,
  SHADOW_MENU,
} from './theme/tokens';

// ========================
// Keyframes
// ========================
export const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// ========================
// Constants
// ========================
export const GREEN = BRAND_GREEN;
export const DARK = TEXT_DARK;
export const GRAY = TEXT_BODY;

export const SECTION_SHELL = {
  mx: { xs: 1.5, sm: 2.5, md: 3 },
  borderRadius: '10px',
  overflow: 'hidden',
} as const;

// ========================
// Styled Components
// ========================
export const EyebrowPill = styled(Box)({
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

export const IndustryCard = styled(Box)({
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

export const ReportCard = styled(Card)({
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

export const PressCard = styled(Box)({
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

export const WhyRow = styled(Box)({
  display: 'flex',
  gap: '16px',
  paddingBottom: '20px',
  marginBottom: '20px',
  borderBottom: '1px solid #d8dde6',
  '&:last-child': { borderBottom: 'none', marginBottom: 0, paddingBottom: 0 },
});

export const CertBadge = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '6px',
  padding: '14px 8px',
});

export const FooterSection = styled(Box)({
  background: FOOTER_BG,
  color: '#a8bdd1',
  paddingTop: '56px',
});

export const GreenBtn = {
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

export const DarkBtn = {
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
// Navbar Keyframes & Styled Components
// ========================
export const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const TopBar = styled(Box)({
  background: '#fff',
  borderBottom: '1px solid #e0e0e0',
  padding: '0',
});

export const StyledNavBar = styled(AppBar)({
  background: 'transparent',
  boxShadow: 'none',
  position: 'relative',
});

export const MegaMenuWrapper = styled(Paper)({
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

export const CategoryHeading = styled(Typography)({
  fontSize: '0.85rem',
  fontWeight: 700,
  color: BRAND_GREEN,
  marginBottom: '10px',
  paddingBottom: '8px',
  borderBottom: '1px solid #e0e0e0',
});

export const MenuItemLink = styled(Link)({
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

export const NavButton = styled(Button)({
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

export const DropdownMenu = styled(Paper)({
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

export const DropdownItem = styled(Link)({
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
