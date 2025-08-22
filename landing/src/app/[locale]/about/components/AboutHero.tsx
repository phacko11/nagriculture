import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from "@mui/material/styles";
import { colors, fonts } from '../../../components/MuiProvider'
import { useTranslations } from 'next-intl';

export default function AboutHero() {
    const t = useTranslations('AboutPage');
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 2, sm: 3 },
                py: { xs: 6, sm: 8, md: 10 },
                paddingBottom: { xs: 2, sm: 4, md: 6 },
                px: { xs: 2, sm: 6, md: 12, lg: 20 },
                alignItems: 'center',
                boxSizing: 'border-box',
            }}
        >
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
                }}
            >
                {t('Headline')}
            </Typography>

            <Typography
                color="textSecondary"
                sx={{
                    fontWeight: fonts.weights.regular,
                    fontSize: {
                        xs: '0.95rem',
                        sm: fonts.sizes.md,
                        md: fonts.sizes.lg,
                    },
                    color: colors.neutral._8,
                    textAlign: 'center',
                    maxWidth: '900px', // prevents very long lines on large screens
                }}
            >
                {t('Body')}
            </Typography>
        </Box>
    )
}