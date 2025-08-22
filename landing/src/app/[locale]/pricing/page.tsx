import { Card, CardContent, Typography, Grid, Box, List, ListItem, ListItemIcon, ListItemText, ToggleButtonGroup, ToggleButton, Divider, Link } from '@mui/material'; // Added Divider
import { colors, fonts, neumorphism } from '@/app/components/MuiProvider';
import { motion, AnimatePresence } from 'framer-motion';
import ComparisonTable from './components/ComparisonTable';
import PackagesAndPrices from './components/PackagesAndPrices';
import BusinessSection from './components/BusinessSection';

export default function PricingPage() {

    return (
        <Box sx={{ flexGrow: 1, backgroundColor: neumorphism.background, py: { xs: 10, sm: 15 } }}>
            <PackagesAndPrices />
            <ComparisonTable />
            <BusinessSection />
        </Box>
    );
}
