import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { neumorphism } from "@/app/components/MuiProvider";
import { useTranslations } from "next-intl";

export default function BusinessSection() {
    const t = useTranslations('Pricing.BusinessSection');
    return (
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
                        {t('title')}
                    </Typography>
                </Box>

                <Typography variant="body2" gutterBottom>
                    {t('intro')}
                </Typography>

                <ul style={{ marginTop: 4, marginBottom: 8, paddingLeft: "20px" }}>
                    <li>
                        <Typography variant="body2">
                            {t('features.0')}
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body2">
                            {t('features.1')}
                        </Typography>
                    </li>
                </ul>

                <Typography variant="body2">
                    {t('contact.text1')}{' '}
                    <Link href="mailto:info@miquant.vn" underline="always">
                        {t('contact.linkText')}
                    </Link>{" "}
                    {t('contact.text2')}
                </Typography>
            </Box>
        </Box>
    )
}