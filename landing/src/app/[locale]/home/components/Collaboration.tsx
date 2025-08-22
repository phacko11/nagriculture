import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SectionTitle from "./SectionTitle";
import { fonts, colors, neumorphism } from "../../../components/MuiProvider";

const LOGOS = [
    { src: "/assets/OAlogo.svg", alt: "OpenAIlogo" },
    { src: "/assets/TVlogo.svg", alt: "TradingViewlogo" },
    { src: "/assets/GClogo.svg", alt: "GoogleCloudlogo" },
];

const REPETITIONS = 10; // Increase if you want a longer scroll

export default function Collaboration() {
    // Repeat logos to make the scroll visually infinite
    const allLogos = Array.from({ length: REPETITIONS }, () => LOGOS).flat();

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
        }}>
            {/* <SectionTitle text="Đơn vị đồng hành" /> */}
            {/* <Typography sx={{
                fontWeight: fonts.weights.bold,
                fontSize: fonts.sizes.body,
                textAlign: 'center',
            }}>
                Đơn vị đồng hành
            </Typography> */}
            <Box
                className="logos"
                sx={{
                    overflow: "hidden",
                    position: "relative",
                    backgroundColor: "transparent",
                    whiteSpace: "nowrap",
                    "&:before, &:after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        width: "250px",
                        height: "100%",
                        zIndex: 2,
                    },
                    "&:before": {
                        left: 0,
                        background: `linear-gradient(to left, rgba(245,245,245,0), ${neumorphism.background})`,
                    },
                    "&:after": {
                        right: 0,
                        background: `linear-gradient(to right, rgba(245,245,245,0), ${neumorphism.background})`,
                    },
                }}
            >

                <Box
                    className="logos-slide"
                    sx={{
                        display: "inline-block",
                        animation: "slide 35s linear infinite",
                        whiteSpace: "nowrap",
                        "&:hover": {
                            animationPlayState: "paused",
                        },
                    }}
                >

                    {allLogos.map((logo, i) => (
                        <img
                            key={i}
                            loading="lazy"
                            src={logo.src}
                            alt={logo.alt}
                            style={{ height: 50, margin: "0 40px" }}
                        />
                    ))}
                </Box>

                <style>{`
        @keyframes slide {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
        }
        `}</style>
            </Box>
        </Box>

    );
}
