"use client";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  LinearProgress,
  Paper,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import type { ReportData, ReportMetric } from "../data/reports";

interface ReportCardProps {
  report: ReportData;
}

const statusColors: Record<string, "success" | "warning" | "error" | "info"> = {
  success: "success",
  warning: "warning",
  error: "error",
  info: "info",
};

function TrendIcon({ trend }: { trend?: string }) {
  if (trend === "up")
    return <TrendingUpIcon sx={{ color: "#4caf50", fontSize: 20 }} />;
  if (trend === "down")
    return <TrendingDownIcon sx={{ color: "#f44336", fontSize: 20 }} />;
  if (trend === "neutral")
    return <TrendingFlatIcon sx={{ color: "#ff9800", fontSize: 20 }} />;
  return null;
}

function MetricCard({ metric }: { metric: ReportMetric }) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        transition: "all 0.3s ease",
        borderColor: "rgba(0,0,0,0.08)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          borderColor: "#1976d2",
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            {metric.label}
          </Typography>
          {metric.status && (
            <Chip
              label={metric.status}
              color={statusColors[metric.status]}
              size="small"
              sx={{
                fontSize: "0.65rem",
                height: 20,
                textTransform: "capitalize",
              }}
            />
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: metric.progress !== undefined ? 1.5 : 0,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#1a1a2e" }}>
            {metric.value}
          </Typography>
          {metric.trend && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <TrendIcon trend={metric.trend} />
              {metric.trendValue && (
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    color:
                      metric.trend === "up"
                        ? "#4caf50"
                        : metric.trend === "down"
                          ? "#f44336"
                          : "#ff9800",
                  }}
                >
                  {metric.trendValue}
                </Typography>
              )}
            </Box>
          )}
        </Box>

        {metric.progress !== undefined && (
          <Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
            >
              <Typography variant="caption" color="text.secondary">
                Market Share
              </Typography>
              <Typography variant="caption" fontWeight={600}>
                {metric.progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={metric.progress}
              color={metric.status ? statusColors[metric.status] : "primary"}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: "rgba(0,0,0,0.06)",
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default function ReportCard({ report }: ReportCardProps) {
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", py: 4, px: { xs: 2, md: 4 } }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <MuiLink
          component={Link}
          href="/"
          underline="hover"
          color="inherit"
          sx={{ fontSize: 14 }}
        >
          Home
        </MuiLink>
        <MuiLink
          component={Link}
          href="/reports"
          underline="hover"
          color="inherit"
          sx={{ fontSize: 14 }}
        >
          Reports
        </MuiLink>
        <Typography color="text.secondary" sx={{ fontSize: 14 }}>
          {report.category}
        </Typography>
        <Typography color="text.primary" sx={{ fontSize: 14, fontWeight: 600 }}>
          {report.title}
        </Typography>
      </Breadcrumbs>

      {/* Back Link */}
      <Box sx={{ mb: 3 }}>
        <MuiLink
          component={Link}
          href="/reports"
          underline="hover"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            fontSize: 14,
            color: "#1976d2",
            fontWeight: 500,
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          Back to Reports
        </MuiLink>
      </Box>

      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 3,
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          color: "#fff",
        }}
      >
        <Chip
          label={report.category}
          size="small"
          sx={{
            mb: 2,
            backgroundColor: "rgba(255,255,255,0.15)",
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.75rem",
          }}
        />
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: 1.5,
            fontSize: { xs: "1.8rem", md: "2.5rem" },
          }}
        >
          {report.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{ opacity: 0.85, maxWidth: 700, lineHeight: 1.7 }}
        >
          {report.description}
        </Typography>
        <Typography
          variant="caption"
          sx={{ display: "block", mt: 2, opacity: 0.6 }}
        >
          Last Updated: February 2026
        </Typography>
      </Paper>

      {/* Report Sections */}
      {report.sections.map((section, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 2.5,
              color: "#1a1a2e",
              pl: 2,
              borderLeft: "4px solid #1976d2",
            }}
          >
            {section.title}
          </Typography>
          <Grid container spacing={3}>
            {section.metrics.map((metric, mIndex) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={mIndex}>
                <MetricCard metric={metric} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      {/* Disclaimer */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mt: 4,
          borderRadius: 2,
          backgroundColor: "#f8f9fa",
          border: "1px solid #e9ecef",
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ lineHeight: 1.8 }}
        >
          <strong>Disclaimer:</strong> The data presented in this report is for
          demonstration purposes. Actual market data may vary. All figures are
          based on estimates and publicly available research from leading
          industry analysts. For detailed methodology and sourcing, please refer
          to the full report documentation.
        </Typography>
      </Paper>
    </Box>
  );
}
