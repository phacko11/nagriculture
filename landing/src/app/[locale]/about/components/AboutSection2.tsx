import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { fonts, HoverBackground, neumorphism } from '../../../components/MuiProvider';
import { colors } from '../../../components/MuiProvider';
import { useTranslations } from 'next-intl';
import Grid from '@mui/material/Grid';
import { GridOnSharp } from '@mui/icons-material';


export default function AboutSection2() {
    const t = useTranslations('AboutPage');
    const aboutSections = [
        {
            title: t('Vision.Headline1'),
            text: t('Vision.Body1'),
            image: '/assets/pexels-pixabay-373543.jpg',
            reverse: true, // image right
        },
        {
            title: t('Vision.Headline2'),
            text: t('Vision.Body2'),
            image: '/assets/pexels-photo-30572289.jpeg',
            reverse: false, // image right
        },
        {
            title: t('Vision.Headline3'),
            text: t('Vision.Body3'),
            image: '/assets/pexels-photo-3184639.jpeg',
            reverse: true, // image left
        },
    ];
    return (
        <Box sx={{
            boxSizing: 'border-box',
            px: neumorphism.layoutX, p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap:10,

        }}>
            {/* <Box
                className='neumorphic'
                sx={{
                    background: neumorphism.card,
                    borderRadius: '32px',
                    p: 1
                }}
            >
                <Box sx={{
                    p: 2,
                    border: '2px solid',
                    borderRadius: '24px',
                    borderColor: colors.neutral._2
                }}> */}
            {aboutSections.map((section, index) => (
                <Grid
                    container
                    spacing={10}
                    key={index}

                    alignItems="center"
                    sx={{ mb: index < aboutSections.length - 1 ? 3 : 0 }}
                >
                    {/* Image */}
                    <Grid size={{ xs: 12, md: 6 }}
                        order={{ xs: section.reverse ? 2 : 1, md: section.reverse ? 2 : 1 }} // flip desktop if reverse
                    >
                        <Box>
                            <Box
                                component="img"
                                className='neumorphic'
                                src={section.image}
                                alt={section.title}
                                sx={{
                                    background: neumorphism.card,
                                    p: 0.5,
                                    aspectRatio: '1 / 1',       // ✅ Force 1:1 aspect ratio
                                    width: '100%',
                                    borderRadius: '12px',
                                    position: 'relative',
                                    zIndex: 1,
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>
                    </Grid>

                    {/* Text */}
                    <Grid
                        className='neumorphic'
                        size={{ xs: 12, md: 6 }}
                        order={{ xs: section.reverse ? 1 : 2, md: section.reverse ? 1 : 2 }} // flip desktop if reverse
                        sx={{
                            ...HoverBackground,
                            borderRadius: '12px',
                            p: 6,
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            px: { xs: 2, md: 4 },
                            alignItems: {
                                xs: "center",
                                md: "flex-start",
                            },
                            textAlign: {
                                xs: "center",
                                md: "left",
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: fonts.weights.bold,
                                fontSize: { xs: fonts.sizes.lg, md: fonts.sizes.lg },
                                color: colors.neutral._8,
                            }}
                        >
                            {section.title}
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: fonts.weights.light,
                                fontSize: { xs: fonts.sizes.sm, md: fonts.sizes.md },
                                color: colors.neutral._9,
                            }}
                        >
                            {section.text}
                        </Typography>
                    </Grid>
                </Grid>
            ))}

        </Box>
    )
}