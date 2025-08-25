'use client'
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material'
import { Check } from '@mui/icons-material'
import { neumorphism } from '@/app/components/MuiProvider'
import { useTranslations } from 'next-intl'

const tiers = ['Free', 'Standard', 'Advanced']



export default function ComparisonTable() {// Data rows (grouped by tab/section)
    const t = useTranslations('Pricing.Comparison');
    const rows: {
        tab: string
        feature: string
        values: string[]
    }[] = t.raw('table')
    return (
        <Box sx={{ py: 8, px: 4}}>
            <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
                {t('title')}
            </Typography>
            <Typography align="center" sx={{ mb: 4, color: 'text.secondary' }}>
                {t('subtitle')}
            </Typography>

            <TableContainer className='neumorphic' component={Paper} elevation={0} sx={{ borderRadius: 3, p:2, overflow: 'hidden', background: neumorphism.card, boxSizing: 'border-box' , width: '100%' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', width: '12%', py: 0.5, fontSize: '0.85rem' }}>Tab</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '12%', py: 0.5, fontSize: '0.85rem' }}>Feature</TableCell>
                            {tiers.map((tier) => (
                                <TableCell key={tier} align="center" sx={{ fontWeight: 'bold', py: 0.5, fontSize: '0.85rem'  }}>
                                    {tier}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, idx) => (
                            <TableRow key={idx} sx={{
                                height: 36,
                                transition: 'background-color 0.2s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)', // light gray hover
                                },
                            }}> {/* reduce row height */}
                                <TableCell sx={{ py: 0.5, fontSize: '0.85rem' }}>{row.tab}</TableCell>
                                <TableCell sx={{ py: 0.5, fontSize: '0.85rem' }}>{row.feature}</TableCell>
                                {row.values.map((val, i) => (
                                    <TableCell key={i} align="center" sx={{ py: 0.5, fontSize: '0.85rem' }}>
                                        {val === '✓' ? (
                                            <Check sx={{ color: '#00a63e', fontSize: '1rem' }} />
                                        ) : val ? (
                                            val
                                        ) : (
                                            ''
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
