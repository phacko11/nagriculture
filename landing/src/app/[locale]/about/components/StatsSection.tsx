'use client'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import React, { useEffect, useState } from 'react'
import { colors, fonts, HoverBackground, neumorphism } from '../../../components/MuiProvider'
import { CountUp } from "@/components/lightswind/count-up"
import { useTranslations } from 'next-intl'

export default function StatsSection() {
    const t = useTranslations('AboutPage');
    const theme = useTheme()
    const stats = [
        {
            number: '400+',
            text: t('Highlights.0'),
        },
        {
            number: '1600+',
            text: t('Highlights.1'),
        },
        {
            number: '1000000+',
            text: t('Highlights.2'),
        },
    ]
    return (
        <Box
            sx={{
                gap: { xs: 1, md: 3 },
                px: neumorphism.layoutX,
                borderRadius: '16px',
            }}  
        >
            <Box
            className = 'neumorphic'
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'row', // Row until md, then column
                justifyContent: { xs: 'center', md: 'space-between' },
                alignItems: 'center',
                borderRadius: '16px',
                ...HoverBackground
            }}>

            {stats.map((item, index) => (
                <React.Fragment key={index}>
                    <Box
                        sx={{
                            flex: 1,
                            minWidth: { xs: 'auto', md: 0 },
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: { xs: 'center', md: 'space-between' },
                            gap: 1,
                            py: { xs: 2, md: 3 },
                            px: { xs: 0, md: 5 },
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <Typography
                            component="div"
                            sx={{
                                fontWeight: theme.typography.fontWeightBold,
                                fontSize: { xs: fonts.sizes.lg, md: fonts.sizes.xl },
                                lineHeight: 1.2,
                                // color: colors.primary._0,
                                color: 'transparent',
                                background: `linear-gradient(45deg, #007FC5, #0066BA)`,
                                backgroundBlendMode: 'overlay',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                            }}
                        >
                            <CountUp duration={0.8} value={parseInt(item.number)} className={undefined} numberClassName={undefined} customColor={undefined} onAnimationComplete={undefined} suffix='+' />

                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: theme.typography.fontWeightRegular,
                                fontSize: { xs: fonts.sizes.sm, md: fonts.sizes.md },
                                lineHeight: 1.4,
                                maxWidth: 280,
                                color: colors.neutral._9,
                            }}
                        >
                            {item.text}
                        </Typography>
                    </Box>

                    {index < stats.length - 1 && (
                        <Box
                            sx={{
                                display: 'flex', // Always show on all sizes
                                alignItems: 'center',
                                mx: 1,
                                height: { xs: '100px', md: '150px' }, // Shorter on mobile
                                // background: neumorphism.card,
                                width: '10px',
                                borderRadius: '5px',
                                boxShadow:'inset 4px 4px 6px rgba(225, 225, 225, 1), inset -4px -4px 6px rgba(255, 255, 255, 1), 0 0 2px rgba(0,0,0,.25)'
                                ,
                            }}
                        />
                    )}
                </React.Fragment>
            ))}
            </Box>
        </Box>

    )
}
