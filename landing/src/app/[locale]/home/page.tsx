import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { fonts, colors, neumorphism } from "../../components/MuiProvider";
import { Mail } from "@mui/icons-material";
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

export default function HomePage() {
    return (
        <Box sx={{
            background: neumorphism.background,
            display: 'flex',
            flexDirection: 'column',
            // --- BẮT ĐẦU THAY ĐỔI ---
            gap: {
                xs: 4,  // gap = 32px trên màn hình di động (extra-small)
                sm: 6,  // gap = 48px trên màn hình máy tính bảng (small)
                md: 10, // gap = 80px trên màn hình desktop (medium) và lớn hơn
            },
            // --- KẾT THÚC THAY ĐỔI ---
            width: '100%',
        }}>

            <HomeHero />
            <MemberOf />
            {/* <Collaboration /> */}
            <Chat />
            {/* <Card /> */}
            <AimedCustomer />
            <Box>
                <Insight />
                <UniqueFeatures />
            </Box>
        </Box>
    )
}
