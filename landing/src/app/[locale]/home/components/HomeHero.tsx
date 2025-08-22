import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { fonts, colors } from "../../../components/MuiProvider";
import { AutoGraphRounded } from "@mui/icons-material";
import AnimatedBackground from "./AnimatedBackground";
import { useTranslations } from "next-intl";
import { useTheme } from '@mui/material/styles';
import GlobalStyles from "@mui/material/GlobalStyles";
import ParticleNetworkAnimation from "./AnimatedBackground2";


export default function HomeHero() {
    const t = useTranslations('HomePage');
    const theme = useTheme();
    const animationStyles = `
  @property --angle {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
  }

  @keyframes spin {
    to {
      --angle: 360deg;
    }
  }
`;


    return (
        <Box sx={{
            // This is the main parent container
            width: '100%',
            minHeight: '100vh', // Ensure it takes full viewport height
            position: 'relative', // Creates positioning context for children
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden', // Hides the parts of orbits that go off-screen
            backgroundColor: 'white', // Fallback background color
            boxShadow: '0px 4px 6px rgba(131, 131, 131, 0.15)',
        }}>
            <ParticleNetworkAnimation />
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 6, md: 15 },
                px: { xs: 2, sm: 4, md: 10, lg: 15 },
                py: { xs: 15, md: 20, lg: 30 },
                alignItems: 'center',
                position: 'relative', // Sits in the normal flow
                zIndex: 1, // Ensures content is above the background
                backgroundColor: 'rgba(255, 255, 255, 0.3)', // Adjust transparency as needed
                backdropFilter: 'blur(2px)', // This creates the blur effect
            }}>
                <Box
                    sx={{
                        width: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        alignItems: 'center',
                        perspective: '1000px',
                    }}>
                    <Typography
                        sx={{
                            fontWeight: fonts.weights.bold,
                            fontSize: {
                                xs: fonts.sizes.lg, // 24px for extra small screens
                                sm: fonts.sizes.body, // 32px for small screens
                                md: fonts.sizes.xl, // 43px for medium screens
                                lg: fonts.sizes.h3, // 57px for large screens
                            },
                            textAlign: 'center',
                            color: colors.neutral._8,
                            lineHeight: 1.4,
                            letterSpacing: '-0.5px',
                            minHeight: { xs: '80px', md: '100px' },
                            position: 'relative',
                        }}
                    >
                        {t('Headline1')}
                        <br />
                        {t('Headline2')}{' '}
                        <Box
                            component="span"
                            sx={{
                                position: 'relative', // Parent container for positioning
                                display: 'inline-block',
                                fontWeight: fonts.weights.bold,
                            }}
                        >
                            {/* Shadow Layer */}
                            <Box
                                component="span"
                                aria-hidden="true" // Hide from screen readers
                                sx={{
                                    position: 'absolute',
                                    top: '4px', // Vertical offset for the shadow
                                    left: '0px', // Horizontal offset for the shadow
                                    width: '100%',
                                    height: '100%',
                                    zIndex: 0, // Ensure it's behind the main text
                                    color: 'rgba(0, 0, 0, 0.25)', // Shadow color
                                    filter: 'blur(2px)', // Soften the shadow
                                }}
                            >
                                {t('Headline3')}
                            </Box>

                            {/* Main Text Layer (with gradient) */}
                            <Box
                                component="span"
                                sx={{
                                    position: 'relative', // Keep it in the layout flow
                                    zIndex: 1, // Ensure it's on top of the shadow
                                    // background: '#1478DC',
                                    background: `linear-gradient(135deg, ${colors.primary._3}, ${colors.primary._4})`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    // No textShadow needed here anymore
                                }}
                            >
                                {t('Headline3')}
                            </Box>
                        </Box>
                    </Typography>


                    <Typography
                        sx={{
                            fontWeight: fonts.weights.regular,
                            textAlign: 'center',
                            fontSize: {
                                xs: fonts.sizes.sm, // 14px for extra small screens
                                md: fonts.sizes.md, // 18px for medium screens
                                lg: fonts.sizes.lg, // 24px for large screens
                            },
                            color: colors.neutral._8,
                            maxWidth: '800px', // Constrain line length for readability
                            px: { xs: 2, sm: 0 }
                        }}>
                        {t('SubHeadline')}
                    </Typography>
                    <>
                        <GlobalStyles styles={animationStyles} />
                        <Box
                            sx={{
                                position: "relative",
                                p: "2px", // The padding creates space for the border. This is the border thickness.
                                borderRadius: "16px",
                                cursor: "pointer",

                                // The background is now the conic gradient itself
                                background: `conic-gradient(from var(--angle), ${colors.primary._8},  ${colors.primary._4}, ${colors.primary._8},  ${colors.primary._4}, ${colors.primary._8})`,

                                // The animation is applied directly to the container
                                animation: "spin 2s linear infinite",

                                // The glow effect is now created with a filter on the container itself
                                "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    zIndex: -1,
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: `inherit`, // Inherits the gradient from parent
                                    borderRadius: "inherit", // Inherits the border-radius
                                    filter: "blur(0.25rem)",
                                    opacity: 0.6,
                                },
                            }}
                        >
                            {/* Inner Box: This sits on top and provides the solid background color.
                  It makes the outer box look like a border.
                */}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: 1.5,
                                    px: { xs: 2, sm: 3 },
                                    py: 1,
                                    background: colors.neutral._0, // The inner background color
                                    borderRadius: "14px", // Slightly smaller to reveal the border
                                    color: colors.neutral._9,
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: { xs: fonts.sizes.md, sm: fonts.sizes.lg },
                                    }}
                                >
                                    {t('CTA')}
                                </Typography>
                            </Box>
                        </Box>
                    </>

                </Box>


                <Box
                    sx={{
                        display: 'flex',
                        width: { xs: '100%', md: '90%', lg: '80%' },
                        maxWidth: '1200px', // Set a max-width for very large screens
                        aspectRatio: '16 / 9',
                        // border: '3px solid',
                        borderColor: colors.neutral._0,
                        borderRadius: { xs: '16px', md: '32px' },
                        overflow: 'hidden',
                        boxShadow: '0 0 16px rgba(0, 0, 0, 0.4)',
                        // background: `${colors.primary._4}80`,
                        // p: { xs: 1, md: 2 },
                        zIndex: 1,
                    }}
                >
                    <Box
                        component="video"
                        src="/assets/April linkedin 2.mp4"
                        title="fàwe"
                        autoPlay={true}
                        loop={true}
                        muted
                        controls
                        playsInline // Important for iOS autoplay
                        sx={{
                            width: '100%',
                            height: '100%',
                            boxSizing: 'border-box',
                            objectFit: 'cover',
                            borderRadius: { xs: '8px', md: '16px' },
                            // border: '3px solid',
                            // borderColor: colors.neutral._0,
                        }}
                    />
                </Box>
            </Box>
        </Box>
    )
}

