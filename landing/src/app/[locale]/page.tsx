'use client'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Mail } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import HomePage from "./home/HomePage"
// import {useTranslations} from 'next-intl';

// export default function Page() {
//     const t = useTranslations('HomePage');
//     const theme = useTheme()
//     return (
//         <HomePage />
//     )
// }
import { useTranslations } from 'next-intl';

export default function Page() {
    const t = useTranslations('HomePage');
    return (
        <Box sx={{ overflowX: 'hidden', width: '100%', p:0, boxSizing: 'border-box' }}>
            <HomePage />
        </Box>

    );
}