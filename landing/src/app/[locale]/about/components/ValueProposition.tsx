import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { colors, fonts, HoverBackground, neumorphism } from '../../../components/MuiProvider';
import { useTheme } from '@mui/material/styles';
import { BarChartRounded, ChatRounded, Circle, HandshakeRounded, KeyRounded, LightbulbOutlineRounded, SecurityRounded } from '@mui/icons-material';
import SectionTitle from '../../home/components/SectionTitle';
import { useTranslations } from 'next-intl';

export default function ValueProposition() {
    const t = useTranslations('AboutPage.CoreValues');
    const gridData = [
        {
            title: t('Values.0.Title'),
            description: t('Values.0.Desc'),
        },
        {
            title: t('Values.1.Title'),
            description: t('Values.1.Desc'),
        },
        {
            title: t('Values.2.Title'),
            description: t('Values.2.Desc'),
        },
        {
            title: t('Values.3.Title'),
            description: t('Values.3.Desc'),
        },
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                px: neumorphism.layoutX,
                alignItems: 'center',
            }}
        >
            <SectionTitle text={t('Headline')} />

            <Grid   
                container
                rowSpacing={{ xs: 2, sm: 2 }}
                columnSpacing={{ xs: 2, sm: 2 }}
            >
                {gridData.map((card, index) => (
                    <Grid
                        className="neumorphic"
                        key={index}
                        size={{ xs: 12, sm: 6}} // 2 columns on small screens and up
                        sx={{
                            ...HoverBackground,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            px: 3,
                            py: 3,
                            borderRadius: '16px',
                            overflow: 'hidden',
                        }}
                    >
                        <Box
                            sx={{
                                p: 0.4,
                                display: 'flex',
                                width: 'fit-content',
                                height: 'auto',
                                boxShadow: neumorphism.hover,
                                borderRadius: '50%',
                            }}>

                            <Box
                                sx={{
                                    height: '40px',
                                    width: '40px',
                                    borderRadius: '50%',
                                    // background: `linear-gradient(45deg, ${colors.primary._5},  ${colors.primary._7})`,
                                    border: `1.6px solid ${colors.primary._9}`,
                                    color: colors.primary._5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {index === 0 ? <BarChartRounded /> : index === 1 ? <HandshakeRounded /> : index === 2 ? <KeyRounded /> : <SecurityRounded />}
                            </Box>
                        </Box>
                        <Typography
                            sx={{
                                fontWeight: fonts.weights.bold,
                                fontSize: { xs: fonts.sizes.md, sm: fonts.sizes.lg },
                                textAlign: 'left',
                                color: colors.neutral._8,
                            }}
                        >
                            {card.title}
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: fonts.weights.light,
                                fontSize: { xs: fonts.sizes.sm, sm: fonts.sizes.md },
                                textAlign: 'left',
                                color: colors.neutral._9,
                            }}
                        >
                            {card.description}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
