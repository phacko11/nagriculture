import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme } from "@mui/material/styles";
import { colors, fonts } from '../../../components/MuiProvider'
import { color } from 'motion-dom';

export default function AboutHero() {
    return (
<Box
    sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2, sm: 3 },
        py: { xs: 6, sm: 8, md: 10 },
        paddingBottom: { xs: 2, sm: 4, md: 6 },
        px: { xs: 2, sm: 6, md: 12, lg: 20 },
        alignItems: 'center',
        boxSizing: 'border-box',
    }}
>
    <Typography
        sx={{
                            fontWeight: fonts.weights.bold,
                            fontSize: {
                                xs: fonts.sizes.lg, // 24px for extra small screens
                                sm: fonts.sizes.body, // 32px for small screens
                                md: fonts.sizes.xl, // 43px for medium screens
                                lg: fonts.sizes.h3, // 57px for large screens
                            },
            textAlign: 'center',
        }}
    >
        Kể câu chuyện đầu tư với những con số
    </Typography>

    <Typography
        color="textSecondary"
        sx={{
            fontWeight: fonts.weights.regular,
            fontSize: {
                xs: '0.95rem',
                sm: fonts.sizes.md,
                md: fonts.sizes.lg,
            },
            color: colors.neutral._8,
            textAlign: 'center',
            maxWidth: '900px', // prevents very long lines on large screens
        }}
    >
        Miquant là nền tảng đầu tư ứng dụng AI, được xây dựng để biến sự phức tạp
        của thị trường tài chính thành những quyết định rõ ràng và hiệu quả.
        Chúng tôi cung cấp công cụ và dữ liệu định lượng đã được kiểm chứng, giúp
        bạn đầu tư nhanh hơn, chính xác hơn và tự tin hơn.
    </Typography>
</Box>
    )
}