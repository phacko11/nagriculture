import { Card, CardContent, Typography, Grid, Box, List, ListItem, ListItemIcon, ListItemText, ToggleButtonGroup, ToggleButton, Divider, Link } from '@mui/material'; // Added Divider
import { colors, fonts, neumorphism } from '@/app/components/MuiProvider';
import { motion, AnimatePresence } from 'framer-motion';
import ComparisonTable from './components/ComparisonTable';
import PackagesAndPrices from './components/PackagesAndPrices';

export default function PricingPage() {

    return (
        <Box sx={{ flexGrow: 1, backgroundColor: neumorphism.background, py: { xs: 10, sm: 15 } }}>
            <PackagesAndPrices />
            <ComparisonTable />
            <Box
                sx={{
                    px: 4,
                }}>

                <Box
                    className="neumorphic"
                    sx={{
                        borderRadius: 2,
                        p: 3,
                        px: { xs: 2, sm: 4, md: 6, lg: 8 },
                        background: neumorphism.card,
                    }}
                >
                    <Box display="flex" alignItems="center" mb={1}>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Gói Business – Tính năng đặc biệt
                        </Typography>
                    </Box>

                    <Typography variant="body2" gutterBottom>
                        Bao gồm tất cả tính năng của gói Advanced, cộng thêm:
                    </Typography>

                    <ul style={{ marginTop: 4, marginBottom: 8, paddingLeft: "20px" }}>
                        <li>
                            <Typography variant="body2">
                                Kết nối API để nhận tín hiệu định lượng real time
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2">
                                Xây dựng chiến lược định lượng riêng cho doanh nghiệp
                            </Typography>
                        </li>
                    </ul>

                    <Typography variant="body2">
                        Vui lòng{" "}
                        <Link href="mailto:info@miquant.vn" underline="always">
                            liên hệ đội ngũ Miquant
                        </Link>{" "}
                        để nhận thông tin chi tiết và hỗ trợ tư vấn thêm
                    </Typography>
                </Box>
            </Box>

        </Box>
    );
}
