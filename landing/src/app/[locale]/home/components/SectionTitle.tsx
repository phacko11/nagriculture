import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { colors, fonts } from "../../../components/MuiProvider";
type SectionTitleProps = {
    text: string;
};

export default function SectionTitle({ text }: SectionTitleProps) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 3,
        }}>
            <Box sx={{
                height: '4px',
                width: '100px',
                my: 3,
                background: `linear-gradient(135deg, ${colors.primary._3}, ${colors.primary._4})`,
                borderRadius: '2px'
            }}>
                
            </Box>
            <Typography variant="h4" component="h2" align="center" fontWeight="bold" gutterBottom>
                {text}
            </Typography>

        </Box >

    )
}