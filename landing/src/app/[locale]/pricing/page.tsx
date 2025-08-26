import { Card, CardContent, Typography, Grid, Box, List, ListItem, ListItemIcon, ListItemText, ToggleButtonGroup, ToggleButton, Divider, Link } from '@mui/material'; // Added Divider
import { colors, fonts, neumorphism } from '@/app/components/MuiProvider';
import { motion, AnimatePresence } from 'framer-motion';
import ComparisonTable from './components/ComparisonTable';
import PackagesAndPrices from './components/PackagesAndPrices';
import BusinessSection from './components/BusinessSection';
import ParticleNetworkAnimation from '@/app/components/ParticleNetwork';
import ParticleNetwork from '@/app/components/ParticleNetwork';

export default function PricingPage() {

    return (
        <Box sx={{ flexGrow: 1, py: { xs: 10, sm: 15 } }}>
            {/* <ParticleNetworkAnimation /> */}
            <ParticleNetwork />
            <PackagesAndPrices />
            <ComparisonTable />
            <BusinessSection />
        </Box>
    );
}
