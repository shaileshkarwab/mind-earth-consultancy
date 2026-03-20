'use client';

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Paper,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import Link from 'next/link';
import { getAllReports } from '../data/reports';

const categoryColors: Record<string, string> = {
  'Consumer Goods': '#e91e63',
  'Semiconductors & Electronics': '#2196f3',
  'Healthcare & Life Sciences': '#4caf50',
  'Energy & Environment': '#ff9800',
};

export default function ReportsPage() {
  const reports = getAllReports();

  // Group by category
  const grouped = reports.reduce(
    (acc, report) => {
      if (!acc[report.category]) acc[report.category] = [];
      acc[report.category].push(report);
      return acc;
    },
    {} as Record<string, typeof reports>,
  );

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', py: 4, px: { xs: 2, md: 4 } }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <MuiLink component={Link} href="/" underline="hover" color="inherit" sx={{ fontSize: 14 }}>
          Home
        </MuiLink>
        <Typography color="text.primary" sx={{ fontSize: 14, fontWeight: 600 }}>
          Reports
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 5,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          color: '#fff',
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
          Industry Reports
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.85, maxWidth: 600 }}>
          Explore comprehensive market research reports across leading industries.
          Click any report to view detailed metrics and analysis.
        </Typography>
        <Chip
          label={`${reports.length} Reports Available`}
          sx={{ mt: 2, backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', fontWeight: 600 }}
        />
      </Paper>

      {/* Report Categories */}
      {Object.entries(grouped).map(([category, categoryReports]) => (
        <Box key={category} sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
            <Box
              sx={{
                width: 6,
                height: 32,
                borderRadius: 3,
                backgroundColor: categoryColors[category] || '#1976d2',
              }}
            />
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a2e' }}>
              {category}
            </Typography>
            <Chip label={categoryReports.length} size="small" sx={{ fontWeight: 600 }} />
          </Box>

          <Grid container spacing={3}>
            {categoryReports.map((report) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={report.slug}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s ease',
                    borderColor: 'rgba(0,0,0,0.08)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                      borderColor: categoryColors[category] || '#1976d2',
                    },
                  }}
                >
                  <CardActionArea
                    component={Link}
                    href={`/reports/${report.slug}`}
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                  >
                    <CardContent sx={{ width: '100%' }}>
                      <Chip
                        label={category}
                        size="small"
                        sx={{
                          mb: 1.5,
                          fontSize: '0.65rem',
                          fontWeight: 600,
                          backgroundColor: `${categoryColors[category]}15`,
                          color: categoryColors[category],
                        }}
                      />
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1a1a2e' }}>
                        {report.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          lineHeight: 1.6,
                        }}
                      >
                        {report.description}
                      </Typography>
                      <Typography variant="caption" color="primary" sx={{ fontWeight: 600 }}>
                        View Report →
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
