import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Link,
  IconButton,
  Stack,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { fonts } from "./MuiProvider";

const Footer = () => {
  const t = useTranslations("navigate");
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1C1C1C",
        color: "white",
        py: { xs: 4, md: 8 },
        px: { xs: 2, sm: 4 },
      }}
    >
      {/* Bottom Section */}
      <Grid container spacing={{ xs: 5, md: 4 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Container>
            {/* Top CTA Section */}
            <Box
              sx={{
                mb: { xs: 1, md: 2 },
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  fontSize: { xs: fonts.sizes.md, md: fonts.sizes.lg },
                }}
              >
                Nâng cao hiệu suất đầu tư của bạn
              </Typography>
              <Button
                variant="contained"
                href="https://app.miquant.vn/"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  borderRadius: "16px",
                  py: 1,
                  px: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                Trải nghiệm miễn phí
              </Button>
            </Box>
            <Stack direction="column" spacing={2.5} sx={{ height: "100%" }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  component="img"
                  src="/assets/Logo-dark.svg"
                  alt="logo dark"
                  sx={{
                    width: "100%",
                    maxWidth: 200,
                  }}
                />
              </Stack>
              <Typography variant="body2" sx={{ color: "grey.400" }}>
                CÔNG TY CỔ PHẦN MIQUANT | MST: 0318906170
              </Typography>
              {/* Spacer to push copyright to the bottom */}
              <Box sx={{ flexGrow: 1 }} />
              <Typography variant="body2" sx={{ color: "grey.400" }}>
                © 2025 Miquant | 5A/2 Trần Phú, P. Chợ Quán, TP. Hồ Chí Minh |
                (+84) 769 810 247
              </Typography>
            </Stack>
          </Container>
        </Grid>

        {/* Company Links */}
        <Grid size={{ xs: 6, md: 3 }}>
          <Stack spacing={1.5}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              {t("Company")}
            </Typography>
            <Link href="/" color="grey.400" underline="hover">
              {t("Home")}
            </Link>
            <Link href="/about" color="grey.400" underline="hover">
              {t("About")}
            </Link>
            <Link href="/research" color="grey.400" underline="hover">
              {t("Research")}
            </Link>
            <Link href="/blog" color="grey.400" underline="hover">
              {t("Blog")}
            </Link>
            <Link href="/news" color="grey.400" underline="hover">
              {t("News")}
            </Link>
            <Link href="/faqs" color="grey.400" underline="hover">
              {t("FAQs")}
            </Link>
            <Link href="/pricing" color="grey.400" underline="hover">
              {t("Pricing")}
            </Link>
          </Stack>
        </Grid>

        {/* Social Links */}
        <Grid size={{ xs: 6, md: 3 }}>
          <Stack spacing={1.5}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              {t("Social")}
            </Typography>
            <Stack direction="row" spacing={0}>
              <IconButton
                href="mailto:info@miquant.vn"
                aria-label="email"
                sx={{ color: "white" }}
              >
                <EmailIcon fontSize="large" />
              </IconButton>
              <IconButton
                href="https://www.linkedin.com/company/miquant"
                aria-label="linkedin"
                sx={{ color: "white" }}
              >
                <LinkedInIcon fontSize="large" />
              </IconButton>
              <IconButton
                href="https://www.facebook.com/profile.php?id=61577764534124"
                aria-label="facebook"
                sx={{ color: "white" }}
              >
                <FacebookIcon fontSize="large" />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
