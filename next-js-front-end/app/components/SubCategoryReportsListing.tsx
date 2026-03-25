import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Paper,
  Breadcrumbs,
  Link as MuiLink,
  Chip,
} from "@mui/material";
import Link from "next/link";
import type { ListedReport } from "../data/reports";

interface SubCategoryReportsListingProps {
  categoryName: string;
  subCategoryName: string;
  reports: ListedReport[];
}

export default function SubCategoryReportsListing({
  categoryName,
  subCategoryName,
  reports,
}: SubCategoryReportsListingProps) {
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", py: 4, px: { xs: 2, md: 4 } }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link href="/" passHref legacyBehavior>
          <MuiLink underline="hover" color="inherit" sx={{ fontSize: 14 }}>
            Home
          </MuiLink>
        </Link>
        <Link href="/reports" passHref legacyBehavior>
          <MuiLink underline="hover" color="inherit" sx={{ fontSize: 14 }}>
            Reports
          </MuiLink>
        </Link>
        <Typography color="text.secondary" sx={{ fontSize: 14 }}>
          {categoryName}
        </Typography>
        <Typography color="text.primary" sx={{ fontSize: 14, fontWeight: 600 }}>
          {subCategoryName}
        </Typography>
      </Breadcrumbs>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 5,
          borderRadius: 3,
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          color: "#fff",
        }}
      >
        <Typography
          variant="overline"
          sx={{ opacity: 0.8, letterSpacing: 1.2 }}
        >
          {categoryName}
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: 1,
            fontSize: { xs: "1.8rem", md: "2.5rem" },
          }}
        >
          {subCategoryName}
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.85, maxWidth: 720 }}>
          Browse all reports currently listed under this subcategory.
        </Typography>
        <Chip
          label={`${reports.length} Reports Available`}
          sx={{
            mt: 2,
            backgroundColor: "rgba(255,255,255,0.15)",
            color: "#fff",
            fontWeight: 600,
          }}
        />
      </Paper>

      <Grid container spacing={3}>
        {reports.map((report) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={report.reportUrlLink}>
            <Card
              variant="outlined"
              sx={{
                height: "100%",
                overflow: "hidden",
                transition: "all 0.3s ease",
                borderColor: "rgba(0,0,0,0.08)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  borderColor: "#1976d2",
                },
              }}
            >
              <Link
                href={`/reports/${report.reportUrlLink}`}
                passHref
                legacyBehavior
              >
                <CardActionArea
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                  }}
                >
                  <Box
                    component="img"
                    src={`https://picsum.photos/seed/${encodeURIComponent(report.reportUrlLink)}/600/220`}
                    alt={report.reportTitle}
                    sx={{
                      width: "100%",
                      height: 220,
                      objectFit: "cover",
                      backgroundColor: "#f4f6f8",
                    }}
                  />
                  <CardContent sx={{ width: "100%" }}>
                    <Chip
                      label={subCategoryName}
                      size="small"
                      sx={{
                        mb: 1.5,
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        backgroundColor: "rgba(25, 118, 210, 0.12)",
                        color: "#1976d2",
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: "#1a1a2e",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {report.reportTitle}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        lineHeight: 1.6,
                      }}
                    >
                      {report.reportDesc}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="primary"
                      sx={{ fontWeight: 600 }}
                    >
                      View Report →
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
