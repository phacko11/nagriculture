import { colors, HoverBackground, neumorphism } from "@/app/components/MuiProvider";
import { Box, Button, Grid, Typography, Container } from "@mui/material";
import SectionTitle from "./SectionTitle";
import { useTranslations } from 'next-intl';
import React from "react";

const cardData = [
    {
        title: 'Title1',
        subtitle: 'Phát hiện cơ hội và rủi ro',
        description: "Card1",
        imgSrc: '/assets/black-and-white-architecture.jpg'
    },
    {
        title: 'Title2',
        subtitle: 'Tự động hoá và nâng cao hiệu suất',
        description: "Card2",
        imgSrc: 'https://images.unsplash.com/photo-1551161440-88a5c5b09ba0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        title: 'Title3',
        subtitle: 'Xây dựng và tích hợp dữ liệu',
        description: "Card3",
        imgSrc: 'https://images.unsplash.com/photo-1612128961739-2551681a0575?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }   
];

export default function AimedCustomer() {
    const t = useTranslations('HomePage.WhoItsFor');
    return (
        <Box
            // maxWidth={false}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 2,
                px: neumorphism.layoutX
            }}
        >
            <SectionTitle text={t('Headline')} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 2,
                    width: '100%',
                }}
            >
                {cardData.map((card, index) => (
                    <Box
                        className="neumorphic"
                        key={index}
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            p: 1,
                            height: { xs: '350px', lg: '450px' },
                            width: { xs: '100%', md: '33.33%' },
                            bgcolor: neumorphism.card,
                            ...HoverBackground,
                            borderRadius: '16px',
                            overflow: 'hidden',
                            transition: 'width 400ms ease-in-out, all 400ms ease-in-out',
                            // This is the equivalent of Tailwind's group-hover
                            '&:hover': {
                                width: { md: '66.67%' },
                            },
                            // Target child elements on hover
                            '&:hover .hover-content': {
                                opacity: 1,
                                transform: 'translateY(0)',
                            },
                        }}
                    >

                        {/* Title section at the TOP */}
                        <Box
                            sx={{
                                p: 2,
                                position: 'relative', // Use relative to be part of the flex flow
                                zIndex: 10,
                                height: '4rem'
                            }}
                        >
                            <Typography
                                variant="h5"
                                component="h2"
                                fontWeight="bold"
                                color={colors.neutral._9}
                                align="center"
                            >
                                {t(card.title).split("&").map((part, index, arr) => (
                                    <React.Fragment key={index}>
                                        {part}
                                        {index < arr.length - 1 && (
                                            <>
                                                &amp;
                                                <br />
                                            </>
                                        )}
                                    </React.Fragment>
                                ))}
                            </Typography>
                            {/* <Typography variant="body2" color={colors.neutral._9} align="center">
                                        {card.subtitle}
                                    </Typography> */}
                        </Box>
                        <Box
                            sx={{
                                position: 'relative',
                                flex: 1,
                                p: 3,
                                borderRadius: '12px', // inner radius smaller than outer
                                overflow: 'hidden',
                                // --- MODIFICATIONS START ---
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between', // Pushes content to top and bottom
                                alignItems: 'center',          // Horizontally centers the content
                                // --- MODIFICATIONS END ---
                            }}
                        >
                            <Box
                                component="img"
                                src={card.imgSrc}
                                alt={card.title}
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                }}
                            />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                                }}
                            />
                            <Box
                                className="hover-content"
                                sx={{
                                    position: 'relative', // Use relative to be part of the flex flow
                                    zIndex: 10,
                                    opacity: 0,
                                    transform: 'translateY(24px)', // 'translate-y-6'
                                    transition: 'opacity 200ms ease, transform 200ms ease',
                                }}
                            >
                                <Typography variant="body1" color="white" align="center">
                                    {t(card.description)}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>

    );
}
