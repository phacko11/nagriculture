import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import SectionTitle from './SectionTitle';
import { colors, fonts, HoverBackground, neumorphism } from '@/app/components/MuiProvider';
import MUIShinyText from './ShinyText';
import { useTranslations } from 'next-intl';

// Data for the feature sections. You can easily modify or add more items here.
const featuresData = [
    {
        title: 'TrendingTopics.Title',
        description: 'TrendingTopics.Desc',
        // Replace with your actual video or image source
        mediaSrc: '/assets/Source - chu de.mp4',
    },
    {
        title: 'AutomatedStockValuation.Title',
        description: 'AutomatedStockValuation.Desc',
        mediaSrc: '/assets/Source - DInh gia.mp4',
    },
    {
        title: 'AIChatbot.Title',
        description: 'AIChatbot.Desc',
        mediaSrc: '/assets/Source - hard question.mp4',
    },
     {
        title: 'AIRanking.Title',
        description: 'AIRanking.Desc',
       mediaSrc: '/assets/Source - stock.mp4',
    },
];

const FeatureItem = ({ feature, index }) => {
    const t = useTranslations('HomePage.Features');
    const isReversed = index % 2 !== 1;
    const textContent = (
        <Grid size={{ xs: 12, md: 6 }}
            className='neumorphic'
            sx={{
                ...HoverBackground,
                borderRadius: '12px',
                p: 6,
            }}
        >
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                    {t(feature.title)}
                </Typography>
                <Typography sx={{
                    color: colors.neutral._8,
                    fontSize: fonts.sizes.md,
                    lineHeight: 1.8
                }}>
                    {t(feature.description)}
                </Typography>
            </Box>
        </Grid>
    );

    const mediaContent = (
        <Grid size={{ xs: 12, md: 6 }}>
            <Box
                sx={{
                    position: 'relative',
                    height: '100%',
                    minHeight: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    component="video" // or 'img'
                    src={feature.mediaSrc}
                    autoPlay={true}
                    loop={true}
                    muted
                    className='neumorphic'
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

    );

    return (
        <Box sx={{ overflow: 'visible' }}>
            <Grid container alignItems="center" direction={isReversed ? 'row-reverse' : 'row'} spacing={10}
            >
                {textContent}
                {mediaContent}
            </Grid>
        </Box>
    );
};


// This is the main component that you will export and use.
export default function UniqueFeatures() {
    const t = useTranslations('HomePage.Features');
    return (
        <Box sx={{ py: { xs: 6, md: 10 } }}>
            {/* <Container> */}
            <SectionTitle text={t('Headline')} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 6, md: 10 }, px: neumorphism.layoutX, py: 2 }}>
                {featuresData.map((feature, index) => (
                    <FeatureItem key={index} feature={feature} index={index} />
                ))}
        
            </Box>
            {/* </Container> */}
        </Box>
    );
}