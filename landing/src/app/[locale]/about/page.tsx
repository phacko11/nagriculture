import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import HeaderBar from '../../components/HeaderBar'
import { colors, fonts, neumorphism } from '../../components/MuiProvider'
import AboutHero from './components/AboutHero'
import StatsSection from './components/StatsSection'
import AboutSection1 from './components/AboutSection1'
import AboutSection2 from './components/AboutSection2'
import ValueProposition from './components/ValueProposition'
import { useTranslations } from 'next-intl'
import ParticleNetwork from '@/app/components/ParticleNetwork'
export default function AboutPage() {
    const t = useTranslations('AboutPage');

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                paddingTop: 15,

                gap: {
                    xs: 4,  // gap = 32px trên màn hình di động (extra-small)
                    sm: 6,  // gap = 48px trên màn hình máy tính bảng (small)
                    md: 10, // gap = 80px trên màn hình desktop (medium) và lớn hơn
                },
            }}>
            <Box>

                <AboutHero />
                <StatsSection />
            </Box>
            <AboutSection2 />
            <ValueProposition />    
            <Box
                sx={{
                    py: 2,
                    width: '100%',
                    boxSizing: 'border-box',
                    px: neumorphism.layoutX, // Responsive horizontal padding
                }}
            >
                <Box

                    className='neumorphic'
                    sx={{
                        background: neumorphism.card,
                        borderRadius: '32px',
                        // boxShadow: neumorphism.hover,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        p: 2,
                    }}>
                    <Box
                        component="img"
                        src="/assets/z6925668854535_0a130f93c60581a8212cb5698341770a.jpg"
                        alt="something"
                        sx={{
                            borderRadius: '16px',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                        }}
                    />

                    {/* Text content */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '100%',
                            gap: 2,
                            px: 3,
                            // minHeight: 300, // ensures enough space to separate
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: fonts.weights.regular,
                                fontSize: { md: fonts.sizes.sm, lg: fonts.sizes.md },
                                textAlign: 'left',
                                color: colors.neutral._8,
                            }}
                        >
                            {t('Mission')}
                        </Typography>
                        <Box>
                            <Typography
                                sx={{
                                    fontWeight: fonts.weights.bold,
                                    fontSize: fonts.sizes.sm,
                                    textAlign: 'left',
                                    color: colors.neutral._9,
                                }}
                            >
                                Hà Quốc Hùng
                            </Typography>
                            <Typography sx={{
                                color: colors.neutral._9,
                                fontSize: fonts.sizes.sm,
                                textAlign: 'left',
                            }}>
                                Miquant.vn Founder
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <ParticleNetwork />
        </Box>
    )
}
