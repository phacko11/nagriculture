import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { fonts } from "../../../components/MuiProvider";
type SectionTitleProps = {
    text: string;
};

export default function SectionTitle({ text }: SectionTitleProps) {
    return (

        <Typography variant="h4" component="h2" align="center" fontWeight="bold" gutterBottom>
            {text}
        </Typography>
    )
}