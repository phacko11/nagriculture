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

const tiers = ['Free', 'Standard', 'Advanced']

// Data rows (grouped by tab/section)
const rows = [
    { tab: 'Cổ phiếu', feature: 'Tổng quan', values: ['(VN30)', '(HOSE)', '(Không giới hạn)'] },
    { tab: '', feature: 'Sentiment', values: ['(VN30)', '(HOSE)', '(Không giới hạn)'] },
    { tab: '', feature: 'Tài chính', values: ['✓', '✓', '✓'] },
    { tab: '', feature: 'Rủi ro', values: ['✓', '✓', '✓'] },
    { tab: 'Thị trường', feature: 'Tổng quan', values: ['✓', '✓', '✓'] },
    { tab: '', feature: 'Sentiment', values: ['', '✓', '✓'] },
    { tab: '', feature: 'Phân tích thị trường', values: ['', '✓', '✓'] },
    { tab: 'Vĩ mô', feature: 'Tổng quan', values: ['', '✓', '✓'] },
    { tab: '', feature: 'Tăng trưởng kinh tế', values: ['', '✓', '✓'] },
    { tab: '', feature: 'Tài chính - tiền tệ', values: ['', '✓', '✓'] },
    { tab: 'Nhiệt độ', feature: '', values: ['✓', '✓', '✓'] },
    { tab: 'Danh mục theo dõi', feature: '', values: ['5 danh mục (tối đa 10 stock / danh mục)', '50 danh mục (tối đa 50 stock / danh mục)', '500 danh mục (tối đa 100 stock / danh mục)'] },
    { tab: 'AI Ranking', feature: '', values: ['3 chiến lược / tháng (VN100 + VN30)', '15 chiến lược / tháng (VN100 + VN30)', 'Không giới hạn'] },
    { tab: 'Recommendation', feature: '', values: ['Factor + Filter thường', 'Miquant Port + Top AI Ranking Performance', 'Miquant Port + Top AI Ranking Performance'] },
    { tab: 'Chatbot', feature: '', values: ['5 lần / ngày (Không có Valuation tool)', '30 lần / ngày (Có Valuation tool 5 lần / ngày)', '100 lần / ngày (Có Valuation tool 30 lần / ngày)'] },
    { tab: 'Tin tức nổi bật', feature: '', values: ['3 tin đầu', 'Không giới hạn', 'Không giới hạn'] },
]

export default function ComparisonTable() {
    return (
        <Box sx={{ py: 8, px: 4}}>
            <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
                So sánh chi tiết các tính năng
            </Typography>
            <Typography align="center" sx={{ mb: 4, color: 'text.secondary' }}>
                Xem chi tiết đầy đủ các tính năng có sẵn trong từng gói dịch vụ
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
                            <TableRow key={idx} sx={{ height: 36 }}> {/* reduce row height */}
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
