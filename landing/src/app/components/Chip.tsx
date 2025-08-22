
import Chip from '@mui/material/Chip';
import { fonts } from './MuiProvider';
export default function CustomChip({ label, color }) {
    return (
        <Chip
            label={label}
            sx={{
                backgroundColor: `${color}20`,
                color: color,
                borderRadius: '16px',
                padding: '0px 0px',
                fontSize: fonts.sizes.xs,
                fontWeight: fonts.weights.medium,
                height: '24px',
                '&:hover': {
                    opacity: 0.8,
                },
                // '&::before': {
                //     content: '""', // Required for pseudo-elements to appear
                //     position: 'absolute',
                //     backgroundColor: `${color}ff`, // The bottom layer's color
                //     zIndex: -1,
                //     borderRadius: '15px', // You can even style it independently!
                // },
            }}
        />
    )
}