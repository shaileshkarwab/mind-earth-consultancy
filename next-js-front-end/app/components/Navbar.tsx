"use client";

import { useState, useRef, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Toolbar,
  Link as MuiLink,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { BRAND_GREEN, TEXT_DARK, BTN_RADIUS } from "../theme/tokens";
import {
  TopBar,
  StyledNavBar,
  MegaMenuWrapper,
  CategoryHeading,
  MenuItemLink,
  NavButton,
  DropdownMenu,
  DropdownItem,
} from "../page.styles";
import { categories as reportCategories } from "../data/reports";
import apis from "../lib/axiosInstance";

// ========================
// Mega Menu Data
// ========================
const servicesMegaMenu = [
  {
    heading: "Audit",
    items: [
      { label: "ESG Baseline Assessment", href: "#" },
      { label: "ESG Gap Analysis", href: "#" },
      { label: "Sustainability Performance Audit", href: "#" },
      { label: "Energy & Resource Efficiency Audit", href: "#" },
      { label: "Supply Chain ESG Audit", href: "#" },
    ],
  },
  {
    heading: "Reporting",
    items: [
      { label: "BRSR Reporting", href: "#" },
      { label: "Sustainability Reporting", href: "#" },
      { label: "ESG Data Management", href: "#" },
      { label: "GRI / Global Standards Reporting", href: "#" },
      { label: "Integrated Reporting", href: "#" },
    ],
  },
  {
    heading: "Advisory",
    items: [
      { label: "ESG Policy Development", href: "#" },
      { label: "ESG Risk Assessment", href: "#" },
      { label: "Governance Framework Advisory", href: "#" },
      { label: "Sustainable Supply Chain Advisory", href: "#" },
      { label: "Stakeholder Engagement", href: "#" },
    ],
  },
  {
    heading: "Strategy",
    items: [
      { label: "ESG Roadmap Development", href: "#" },
      { label: "Net Zero Strategy", href: "#" },
      { label: "Climate Transition Planning", href: "#" },
      { label: "Sustainability Integration Strategy", href: "#" },
      { label: "Long-Term ESG Value Creation", href: "#" },
    ],
  },
  {
    heading: "Implementation",
    items: [
      { label: "ESG Program Deployment", href: "#" },
      { label: "Carbon Footprint Measurement", href: "#" },
      { label: "Energy Transition Projects", href: "#" },
      { label: "Supply Chain ESG Integration", href: "#" },
      { label: "Monitoring & KPI Systems", href: "#" },
    ],
  },
  {
    heading: "Training",
    items: [
      { label: "ESG Awareness Workshops", href: "#" },
      { label: "BRSR Training Programs", href: "#" },
      { label: "Corporate Sustainability Training", href: "#" },
      { label: "Leadership ESG Programs", href: "#" },
      { label: "Employee Capacity Building", href: "#" },
    ],
  },
  {
    heading: "Assurance",
    items: [
      { label: "ESG Data Verification", href: "#" },
      { label: "Sustainability Report Assurance", href: "#" },
      { label: "BRSR Assurance", href: "#" },
      { label: "Third-Party ESG Validation", href: "#" },
      { label: "Compliance Certification Support", href: "#" },
    ],
  },
];

const insightsDropdown = [
  { label: "Blog/Press Room", href: "#" },
  { label: "Case Studies", href: "#" },
  { label: "White Paper", href: "#" },
];

// ========================
// Navbar Component
// ========================
export default function Navbar() {
  const [reportsMegaOpen, setReportsMegaOpen] = useState(false);
  const [servicesMegaOpen, setServicesMegaOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const reportsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const servicesTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const insightsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = () => {
    const categories = apis.get("/Category/v2")
      .then((res) => {
        console.log("API Response for Categories:", res.data);
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  };

  const handleEnter = (
    setter: (v: boolean) => void,
    timeout: React.MutableRefObject<ReturnType<typeof setTimeout> | null>,
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
    timeout: React.MutableRefObject<ReturnType<typeof setTimeout> | null>,
  ) => {
    timeout.current = setTimeout(() => {
      setter(false);
    }, 200);
  };
  // console.log("Fetched Categories:", categories);
  return (
    <>
      {/* Top Bar */}
      <TopBar>
        <Container maxWidth={false}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              minHeight: "50px",
              py: { xs: 0.75, sm: 0 },
            }}
          >
            <Typography
              sx={{
                fontSize: "0.8125rem",
                color: TEXT_DARK,
                fontWeight: 500,
                lineHeight: 1.4,
              }}
            >
              👋 Trusted by Fortune 500 companies across 44 countries | 10,000+
              reports published
            </Typography>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 2.5,
                alignItems: "center",
              }}
            >
              <MuiLink
                href="mailto:sales@mindearth.com"
                sx={{
                  color: TEXT_DARK,
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  "&:hover": { color: BRAND_GREEN },
                }}
              >
                <MailOutlineIcon
                  sx={{ fontSize: "1rem", color: BRAND_GREEN }}
                />
                sales@mindearth.com
              </MuiLink>
              <Typography
                sx={{
                  color: TEXT_DARK,
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  display: { xs: "none", lg: "flex" },
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <PhoneOutlinedIcon
                  sx={{ fontSize: "1rem", color: BRAND_GREEN }}
                />
                +1-415-349-0058
              </Typography>
              <Box
                sx={{
                  bgcolor: BRAND_GREEN,
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.4px",
                  borderRadius: BTN_RADIUS,
                  px: "20px",
                  py: "6px",
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#2d7a3f" },
                }}
              >
                LOGIN
              </Box>
            </Box>
          </Box>
        </Container>
      </TopBar>

      {/* Navbar */}
      <StyledNavBar position="sticky" sx={{ bgcolor: "#fff", marginTop: 1 }}>
        <Container maxWidth={false}>
          <Toolbar
            sx={{
              justifyContent: "space-between",
              px: 0,
              minHeight: "70px !important",
            }}
          >
            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none" }}>
              <Image
                src="/logo.jpg"
                alt="MindEarth Market Intelligence"
                width={140}
                height={35}
                style={{ objectFit: "contain" }}
                priority
              />
            </Link>

            {/* Nav Links */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
                mr: 3,
              }}
            >
              <Link href="/" style={{ textDecoration: "none" }}>
                {/* <NavButton>Home</NavButton> */}
              </Link>

              {/* Reports mega menu trigger */}
              <Box
                onMouseEnter={() =>
                  handleEnter(setReportsMegaOpen, reportsTimeout)
                }
                onMouseLeave={() =>
                  handleLeave(setReportsMegaOpen, reportsTimeout)
                }
                sx={{ position: "relative" }}
              >
                <NavButton
                  className={reportsMegaOpen ? "active" : ""}
                  endIcon={
                    <KeyboardArrowDownIcon
                      sx={{
                        fontSize: "18px !important",
                        transition: "transform 0.3s",
                        transform: reportsMegaOpen
                          ? "rotate(180deg)"
                          : "rotate(0)",
                      }}
                    />
                  }
                >
                  Reports
                </NavButton>
              </Box>

              {/* Services mega menu trigger */}
              <Box
                onMouseEnter={() =>
                  handleEnter(setServicesMegaOpen, servicesTimeout)
                }
                onMouseLeave={() =>
                  handleLeave(setServicesMegaOpen, servicesTimeout)
                }
                sx={{ position: "relative" }}
              >
                <NavButton
                  className={servicesMegaOpen ? "active" : ""}
                  endIcon={
                    <KeyboardArrowDownIcon
                      sx={{
                        fontSize: "18px !important",
                        transition: "transform 0.3s",
                        transform: servicesMegaOpen
                          ? "rotate(180deg)"
                          : "rotate(0)",
                      }}
                    />
                  }
                >
                  Services
                </NavButton>
              </Box>

              {/* Insights dropdown trigger */}
              <Box
                onMouseEnter={() =>
                  handleEnter(setInsightsOpen, insightsTimeout)
                }
                onMouseLeave={() =>
                  handleLeave(setInsightsOpen, insightsTimeout)
                }
                sx={{ position: "relative" }}
              >
                <NavButton
                  className={insightsOpen ? "active" : ""}
                  endIcon={
                    <KeyboardArrowDownIcon
                      sx={{
                        fontSize: "18px !important",
                        transition: "transform 0.3s",
                        transform: insightsOpen
                          ? "rotate(180deg)"
                          : "rotate(0)",
                      }}
                    />
                  }
                >
                  Insights
                </NavButton>
                {insightsOpen && (
                  <DropdownMenu elevation={0}>
                    {insightsDropdown.map((item) => (
                      <DropdownItem
                        key={item.label}
                        href={item.href}
                        onClick={() => setInsightsOpen(false)}
                      >
                        {item.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                )}
              </Box>

              <Link href="#" style={{ textDecoration: "none" }}>
                <NavButton>About Us</NavButton>
              </Link>
            </Box>
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
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                        md: "repeat(4, 1fr)",
                      },
                      gap: 3,
                    }}
                  >
                    {categories.length > 0 && categories.map((category, index) => (
                      <Box key={index}>
                        <CategoryHeading>
                          {category.categoryName}
                        </CategoryHeading>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.25,
                          }}
                        >
                          {category.subCategories.map((item: any) => (
                            <MenuItemLink
                              key={item.subCategoryLink}
                              href={`/reports/subcategory/${item.subCategoryLink}`}
                              onClick={() => setReportsMegaOpen(false)}
                            >
                              {item.subCategoryName}
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
            onMouseEnter={() =>
              handleEnter(setServicesMegaOpen, servicesTimeout)
            }
            onMouseLeave={() =>
              handleLeave(setServicesMegaOpen, servicesTimeout)
            }
          >
            <MegaMenuWrapper elevation={0}>
              <Container maxWidth={false}>
                <Box sx={{ py: 3 }}>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr 1fr",
                        md: "repeat(4, 1fr)",
                      },
                      gap: 3,
                    }}
                  >
                    {servicesMegaMenu.map((category) => (
                      <Box key={category.heading}>
                        <CategoryHeading>{category.heading}</CategoryHeading>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.25,
                          }}
                        >
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
