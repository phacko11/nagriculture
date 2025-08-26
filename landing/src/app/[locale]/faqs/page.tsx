'use client'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { fonts, HoverBackground, neumorphism } from '../../components/MuiProvider'
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ParticleNetwork from '@/app/components/ParticleNetwork';

// Make sure your CSS file with the new classes is imported
// import './your-styles.css'; 
interface QnA {
    summary: string;
    details: string;
}

export default function FAQsPage() {
    const t = useTranslations();
    const theme = useTheme()
    const [expandedIndex, setExpandedIndex] = useState(0)
    const qnas = t.raw('faqs') as QnA[];

    // This function remains the same. It updates the CSS variables on the element.
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                py: { xs: 4, sm: 6, md: 20 },
                px: neumorphism.layoutX,
                gap: 2,
                // background: '#F0F0F0',
            }}>
            {
                qnas.map((item, index) => (
                    <Accordion
                        key={index}
                        // These two props create the expand-on-hover effect
                        expanded={expandedIndex === index}
                        onMouseEnter={() => setExpandedIndex(index)}
                        sx={{
                            ...HoverBackground,
                            // backgroundColor: neumorphism.card,
                            borderRadius: '8px !important',
                            py: 1,
                            boxShadow: neumorphism.outline,
                            width: '100%',

                            // Hide the default MUI divider line
                            '&:before': {
                                display: 'none',
                            },
                            '&.Mui-expanded': {
                                margin: '0',
                                borderRadius: '8px',
                                boxShadow: neumorphism.hover,
                                backdropFilter: '4px'
                            },
                        }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                        >
                            <Typography
                                sx={{
                                    fontWeight: fonts.weights.semiBold,
                                    fontSize: fonts.sizes.md,
                                    color: fonts.neutral._9
                                }}
                            >{item.summary}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ color: fonts.neutral._6 }}>
                            {index === qnas.length - 1 ? (
                                <Typography style={{ whiteSpace: 'pre-line' }}>
                                    {item.details}
                                    <a
                                        href="/pricing"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: theme.palette.primary.main, textDecoration: 'underline' }}
                                    >
                                        {t('navigate.Pricing')}
                                    </a>
                                </Typography>
                            ) : (
                                <Typography style={{ whiteSpace: 'pre-line' }}>{item.details}</Typography>
                            )}
                        </AccordionDetails>
                    </Accordion>
                ))
            }
            <ParticleNetwork />
        </Box>

    )
}
