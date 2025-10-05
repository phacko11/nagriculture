import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import HomeHero from "./components/HomeHero";
import Collaboration from "./components/Collaboration";
import MemberOf from "./components/MemberOf";
import Chat from "./components/Chat";
import Card from "./components/Card";
import AnimatedBackground from "./components/AnimatedBackground";
import UniqueFeatures from "./components/UniqueFeatures";
import Insight from "./components/Insight";
import AimedCustomer from "./components/AimedCustomer";
import ParticleNetwork from "@/app/components/ParticleNetwork";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: 4, sm: 6, md: 10 },
        width: "100%",
      }}
    >
      <HomeHero />
      <Box>
        <Insight />
        <UniqueFeatures />
      </Box>

      {/* CTA cuối trang */}
      <Box
  sx={{
    textAlign: "center",
    py: 8,
    background: theme.palette.background.default,
  }}
>
  <Typography
    variant="h4"
    sx={{
      mb: 4,
      fontWeight: 700,
      color: theme.palette.text.primary,
    }}
  >
    Ready to build your own net-zero farm?
  </Typography>

  <Button
    variant="contained"
    onClick={() => router.push("/nextpage")} // đổi đường dẫn page tại đây
    sx={{
      backgroundColor: "white",
      color: "#007BFF",
      border: "3px solid #007BFF",
      fontSize: "1.25rem", // ~20px
      fontWeight: 700,
      textTransform: "none",
      px: 6,
      py: 2.5,
      borderRadius: "999px",
      "&:hover": {
        backgroundColor: "#E3F2FD",
        borderColor: "#0056b3",
      },
    }}
  >
    Play the game now!!
  </Button>
</Box>
    </Box>
  );
}
