'use client'
import { useState } from 'react';
import { colors, fonts, HoverBackground, neumorphism } from '@/app/components/MuiProvider';
import { Card, CardContent, Typography, Grid, Box, List, ListItem, ListItemIcon, ListItemText, ToggleButtonGroup, ToggleButton, Divider, Link } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CheckCircle, Star } from '@mui/icons-material';
import { Variants } from "framer-motion";
import { useTranslations } from 'next-intl';

// --- DATA --- (No changes here)


// --- HELPER FUNCTIONS --- (No changes here)
const parseFeatureText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return (
        <>
            {parts.map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                        <Box component="span" sx={{ fontWeight: 'bold' }} key={index}>
                            {part.slice(2, -2)}
                        </Box>
                    );
                }
                return part;
            })}
        </>
    );
};

const parsePrice = (priceStr) => parseInt(String(priceStr).replace(/\./g, ''));
const formatPrice = (priceNum) => priceNum.toLocaleString('vi-VN');

// --- COMPONENTS --- (No changes here)
const FeatureListItem = ({ text }) => (
    <ListItem disableGutters>
        <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5 }}>
            <Check sx={{ color: '#00a63e', fontSize: '1.2rem' }} />
        </ListItemIcon>
        <ListItemText primary={text} primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} />
    </ListItem>
);

const priceVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: "easeOut" }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.2, ease: "easeIn" }
    }
};

const discountVariants: Variants = {
    initial: { opacity: 0, y: 10, scale: 0.9 },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: {
        opacity: 0,
        y: -10,
        scale: 0.9,
        transition: { duration: 0.2, ease: "easeIn" }
    }
};

export default function PackagesAndPrices() {
    const t = useTranslations('Pricing.PackagesAndPrices');
    const [billingPeriod, setBillingPeriod] = useState('monthly');

    const handleBillingPeriodChange = (event, newPeriod) => {
        if (newPeriod !== null) {
            setBillingPeriod(newPeriod);
        }
    };

const pricingTiers = ['Free', 'Standard', 'Premium', 'Enterprise'].map(key => ({
    title: key,
    price: {
        monthly: t(`tiers.${key}.price.monthly`),
        quarterly: t(`tiers.${key}.price.quarterly`),
        yearly: t(`tiers.${key}.price.yearly`)
    },
    featureTitle: t(`tiers.${key}.featureTitle`),
    features: t.raw(`tiers.${key}.features`) as string[],
}));


    return (
        <Box>
            <Typography sx={{ fontWeight: fonts.weights.bold, fontSize: fonts.sizes.h3, mb: 2, textAlign: 'center' }}>
                {t('title')}
            </Typography>
            <Typography sx={{ mb: 4, fontSize: fonts.sizes.md, color: colors.neutral._7, textAlign: 'center' }}>
                {t('subtitle')}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
                <ToggleButtonGroup
                    color="primary"
                    value={billingPeriod}
                    exclusive
                    onChange={handleBillingPeriodChange}
                    aria-label="Billing Period"
                    className="neumorphic"
                    sx={{
                        background: neumorphism.card,
                        borderRadius: '50px',
                        p: { xs: 0.3, sm: 0.5 },
                        gap: { xs: 0.5, sm: 1 },
                        border: '1px solid #d0d0d0',
                        "& .MuiToggleButtonGroup-grouped": {
                            border: 'none',
                            mx: { xs: 0.5, sm: 1 },
                            borderRadius: '50px !important',
                            textTransform: 'none',
                            fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                            px: { xs: 1.5, sm: 2, md: 3 },
                            py: { xs: 0.5, sm: 0.7, md: 1 },
                            transition: 'all 0.8s ease',
                            boxShadow: neumorphism.outline,
                            background: 'white',
                            "&:hover": {
                                background: 'linear-gradient(145deg, #e7e7e7, #ffffff)',
                                boxShadow: neumorphism.outline,
                                color: colors.neutral._9,
                                WebkitTextFillColor: colors.neutral._9,
                            },
                            "&.Mui-selected": {
                                boxShadow: neumorphism.hover,
                                background: `linear-gradient(45deg, ${colors.primary._3}, ${colors.primary._5})`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            },
                        },
                    }}
                >
                    <ToggleButton value="monthly" sx={{ background: neumorphism.card, margin: '0 0 !important' }}>{t('billing.monthly')}</ToggleButton>
                    <ToggleButton value="quarterly" sx={{ background: neumorphism.card, margin: '0 0 !important' }}>{t('billing.quarterly')}</ToggleButton>
                    <ToggleButton value="yearly" sx={{ background: neumorphism.card, margin: '0 0 !important' }}>{t('billing.yearly')}</ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <Grid container spacing={3} justifyContent="center" alignItems="stretch" px={neumorphism.layoutX}>
                {pricingTiers.map((tier, index) => {
                    const isCalculable = tier.title !== 'Free' && tier.title !== 'Enterprise';
                    let originalPriceNum = 0;
                    let discount = 0;

                    if (isCalculable && billingPeriod !== 'monthly') {
                        const monthlyPriceNum = parsePrice(tier.price.monthly);
                        const currentPriceNum = parsePrice(tier.price[billingPeriod]);
                        const months = billingPeriod === 'quarterly' ? 3 : 12;
                        originalPriceNum = monthlyPriceNum * months;
                        discount = Math.round(((originalPriceNum - currentPriceNum) / originalPriceNum) * 100);
                    }

                    // --- NEW ---: Check if the current tier is Premium
                    const isPremium = tier.title === 'Premium';

                    return (
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} key={tier.title + index} sx={{ display: 'flex' }}>
                            <Box
                                className="neumorphic"
                                sx={{
                                    p: 3,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    borderRadius: '16px',
                                    textAlign: 'center',
                                    flexGrow: 1,
                                    // background: neumorphism.card,
                                    ...HoverBackground,
                                    position: 'relative', // MODIFIED: Added for badge positioning
                                    overflow: 'hidden',   // MODIFIED: Added to contain the badge
                                    // --- NEW ---: Conditional styling for the premium card
                                    border: isPremium ? `2px solid ${colors.primary._4}` : '2px solid transparent',
                                    transform: isPremium ? 'scale(1.03)' : 'scale(1)',
                                    zIndex: isPremium ? 2 : 1,
                                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                    boxShadow: isPremium ? `0px 10px 25px -5px rgba(0, 0, 0, 0.1), ${neumorphism.hover}` : neumorphism.outline,
                                }}
                            >
                                {/* --- NEW ---: Badge for the Premium tier */}
                                {isPremium && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: '20px',
                                            right: '-45px',
                                            transform: 'rotate(45deg)',
                                            backgroundColor: colors.primary._4,
                                            color: 'white',
                                            py: 0.5,
                                            px: 6,
                                            fontSize: '0.8rem',
                                            fontWeight: fonts.weights.bold,
                                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 0.5
                                        }}
                                    >
                                        <Star sx={{ fontSize: '1rem' }} />
                                        {t('badge')}
                                    </Box>
                                )}
                                
                                <Box>
                                    <Typography sx={{ fontSize: fonts.sizes.lg, fontWeight: fonts.weights.bold, mb: 2 }}>
                                        {tier.title}
                                    </Typography>

                                    {/* Animated Old Price */}
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={billingPeriod + '-old-' + tier.title}
                                            variants={priceVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                        >
                                            <Typography sx={{ textDecoration: 'line-through', fontSize: fonts.sizes.lg, fontWeight: fonts.weights.bold, color: colors.primary._5 }}>
                                                {(isCalculable && billingPeriod !== 'monthly' && originalPriceNum > 0) ? (`₫ ${formatPrice(originalPriceNum)}`) : (<span>‎</span>)}
                                            </Typography>
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Animated Current Price */}
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={billingPeriod + '-price-' + tier.title}
                                            variants={priceVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                        >
                                            <Typography component="h2" variant="h4" sx={{
                                                fontWeight: fonts.weights.bold, my: -1,
                                                color: 'transparent',
                                                background: `linear-gradient(45deg, ${colors.primary._3}, ${colors.primary._5})`,
                                                backgroundBlendMode: 'overlay',
                                                WebkitBackgroundClip: 'text',
                                                backgroundClip: 'text'
                                            }}>
                                                {isCalculable && 'đ'}{tier.price[billingPeriod]}
                                            </Typography>
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Animated Discount */}
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={billingPeriod + '-discount-' + tier.title}
                                            variants={discountVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                        >
                                            <Typography variant="body2" sx={{ color: '#00a63e', fontWeight: fonts.weights.medium }}>
                                                {(isCalculable && billingPeriod !== 'monthly' && originalPriceNum > 0) ? (`${t('discount')} ${discount}%`) : (<span>‎</span>)}
                                            </Typography>
                                        </motion.div>
                                    </AnimatePresence>
                                </Box>

                                <Divider sx={{ my: 2.5 }} />
                                {/* --- Bottom Section (Features) --- */}
                                <Box sx={{ textAlign: 'left', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                                        {tier.featureTitle}
                                    </Typography>
                                    <List dense sx={{ flexGrow: 1 }}>
                                        {tier.features.map((feature, idx) => (
                                            <FeatureListItem
                                                key={idx}
                                                text={parseFeatureText(feature)}
                                            />))}
                                    </List>
                                </Box>
                            </Box>
                            {/* --- END: Combined Card Box --- */}
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}