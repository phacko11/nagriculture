import Box from "@mui/material/Box";
import SectionTitle from "./SectionTitle";
import Typography from "@mui/material/Typography";
import { fonts } from "@/app/components/MuiProvider";
export default function MemberOf() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center", // Center the content block
        width: "100%",
        gap: 5,
        my: { xs: 0, md: -3 },
        marginTop: -5,
      }}
    >
      <Typography
        sx={{
          fontWeight: fonts.weights.semiBold,
          fontSize: fonts.sizes.lg,
        }}
      >
        Là thành viên của
      </Typography>
      <Box
        sx={{
          display: "flex",
          // 1. Stack vertically on mobile, horizontally on larger screens
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          // 2. Use alignItems for proper cross-axis centering
          alignItems: "center",
          // 3. Make the gap responsive
          gap: { xs: 4, sm: 8, md: 10 },
          width: "100%",
          // Let height be determined by content for flexibility
          height: "auto",
        }}
      >
        {/* It's better to wrap images in a Box for styling with sx */}
        <Box
          component="img"
          loading="lazy"
          src="/assets/googleCloudStartups.png"
          alt="Google Cloud for Startups"
          sx={{
            // 4. Responsive height for the logos
            height: { xs: "45px", sm: "50px", md: "60px" },
            width: "auto", // Maintain aspect ratio
            objectFit: "contain",
          }}
        />
        <Box
          component="img"
          loading="lazy"
          src="/assets/nvidiaInception.png"
          alt="Nvidia Inception Program"
          sx={{
            // Responsive height for the logos
            height: { xs: "45px", sm: "50px", md: "60px" },
            width: "auto", // Maintain aspect ratio
            objectFit: "contain",
          }}
        />
      </Box>
    </Box>
  );
}
