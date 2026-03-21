'use client';

import { Box, Container, Grid, Typography, Link as MuiLink } from '@mui/material';
import { GREEN, FOOTER_SECTION, FooterSection } from '../page.styles';

export default function Footer() {
  return (
    <FooterSection sx={{ ...FOOTER_SECTION, mt: 1.5 }}>
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
  );
}