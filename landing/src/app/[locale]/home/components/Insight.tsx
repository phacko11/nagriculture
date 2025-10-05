import * as React from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { colors, fonts, HoverBackground, neumorphism } from '../../../components/MuiProvider';
import MUIShinyText from './ShinyText';
import { useTranslations } from 'next-intl';
import SectionTitle from './SectionTitle';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: { xs: 2, md: 4 }, px: neumorphism.layoutX }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

// Tab data array
const tabsData = [
    {
        label: "CorporateFinance.Title",
        description1: "CorporateFinance.SubTitle",
        description2: "CorporateFinance.Desc",
        img: '/assets/thap muoi.jpg'
    },
    {
        label: "MarketSentiment.Title",
        description1: "MarketSentiment.SubTitle",
        description2: "MarketSentiment.Desc",
        img: '/assets/gamerule.jpg'
    },
    {
        label: "EconomicEvents.Title",
        description1: "EconomicEvents.SubTitle",
        description2: "EconomicEvents.Desc",
        img: '/assets/note.jpg'
    }
];

export default function Insight() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => setValue(newValue);
    const t = useTranslations('HomePage.Insight');
    return (
        <Box sx={{ width: '100%', bgcolor: neumorphism.card, py: 6, boxShadow: neumorphism.upperbackground, 
                        ...HoverBackground }}>
            <SectionTitle text={t('Headline')} />

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="Headline"
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        maxWidth: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        border: '1px solid #d0d0d0',
                        borderRadius: '50px',
                        p: { xs: 0.3, sm: 0.5 },
                        my: 2,
                        "& .MuiTabs-flexContainer": {
                            gap: { xs: 1, sm: 2, md: 3 },
                        },
                        "& .MuiTabs-indicator": {
                            display: 'none',
                        },
                        "& .MuiTabs-scroller": {
                            overflow: "visible !important",
                        },
                    }}
                >
                    {tabsData.map((tab, index) => (
                        <Tab
                            key={index}
                            label={t(tab.label)}
                            {...a11yProps(index)}
                            disableRipple
                            sx={{
                                textTransform: 'none',
                                fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                                px: { xs: 1.5, sm: 2, md: 3 },
                                py: { xs: 0.5, sm: 0.7, md: 1 },
                                borderRadius: '50px',
                                transition: 'all 0.8s ease',
                                boxShadow: neumorphism.outline,
                                whiteSpace: 'nowrap',
                                "&:hover": {
                                    background: 'linear-gradient(145deg, #e7e7e7ff, #ffffff)',
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
                            }}
                        />
                    ))}
                </Tabs>
            </Box>

            {tabsData.map((tab, index) => (
                <CustomTabPanel key={index} value={value} index={index}>
                    <Grid container spacing={10} alignItems="center" justifyContent="center" width='100%' height={'auto'}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            {tab.label === "Sự kiện kinh tế" ?
                                (
                                    <Box
                                        className='neumorphic'
                                        sx={{
                                            // background: neumorphism.card,
                                            p: 0.5,
                                            aspectRatio: '16 / 9',       // ✅ Force 16:9 aspect ratio
                                            width: '100%',
                                            borderRadius: '12px',
                                            position: 'relative',
                                            zIndex: 1   ,
                                            objectFit: 'cover',
                                            display: 'flex',
                                            alignItems: 'center',      // ✅ vertical center
                                            justifyContent: 'center',
                                            ...HoverBackground,
                                        }}
                                    >
                                        <MUIShinyText>
                                            coming soon...
                                        </MUIShinyText>
                                    </Box>
                                ) : (

                                    <Box
                                        sx={{
                                            position: 'relative',
                                            height: 'auto',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Box
                                            component="img" // or 'img'
                                            src={tab.img}
                                            className='neumorphic'
                                            sx={{
                                                background: neumorphism.card,
                                                p: 0.5,
                                                aspectRatio: '16 / 9',       // ✅ Force 1:1 aspect ratio
                                                width: '100%',
                                                borderRadius: '12px',
                                                position: 'relative',
                                                zIndex: 1,
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </Box>
                                )}
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }} sx={{
                            display: 'flex',
                            height: '100%',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}>
                            <Typography sx={{ color: colors.neutral._9, fontSize: fonts.sizes.md, lineHeight: 1.8, fontWeight: fonts.weights.medium }}>
                                {t(tab.description1)}
                            </Typography>
                            <Typography sx={{ color: colors.neutral._8, fontSize: fonts.sizes.md, lineHeight: 1.8 }}>
                                {t(tab.description2)}
                            </Typography>
                        </Grid>
                    </Grid>
                </CustomTabPanel>
            ))}
        </Box>
    );
}