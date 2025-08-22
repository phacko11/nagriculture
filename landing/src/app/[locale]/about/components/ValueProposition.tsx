import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { colors, fonts, neumorphism } from '../../../components/MuiProvider';
import { useTheme } from '@mui/material/styles';
import { BarChartRounded, ChatRounded, Circle, HandshakeRounded, KeyRounded, LightbulbOutlineRounded, SecurityRounded } from '@mui/icons-material';
import SectionTitle from '../../home/components/SectionTitle';
import { useTranslations } from 'next-intl';

export default function ValueProposition() {
    const t = useTranslations('AboutPage');
    const gridData = [
        {
            title: 'Phân tích dựa trên nguồn dữ liệu minh bạch',
            description:
                'Mọi luận điểm đầu tư phải được xây dựng trên nền tảng dữ liệu đã được kiểm chứng và có thể truy xuất. Chúng tôi tin vào việc loại bỏ yếu tố cảm tính, thay thế mọi phỏng đoán bằng các phân tích có cơ sở, minh bạch và logic.',
        },
        {
            title: 'Xây dựng bởi người hiểu tài chính, dành cho người đầu tư thực chiến',
            description:
                'Mục tiêu của Miquant là thu hẹp khoảng cách giữa công cụ phân tích chuyên nghiệp và nhà đầu tư cá nhân. Chúng tôi làm điều đó bằng cách kết hợp chuyên môn tài chính và công nghệ, biến những phương pháp phức tạp thành một nền tảng trực quan và dễ tiếp cận.',
        },
        {
            title: 'Quyền làm chủ dữ liệu là của bạn',
            description:
                'Chúng tôi không bán dữ liệu. Chúng tôi cung cấp công cụ để bạn làm chủ nó. Nền tảng cho phép bạn khai thác và xây dựng góc nhìn đầu tư của riêng mình, từ đó ra quyết định một cách tự chủ—có kiểm soát, có cơ sở và có chiến lược.',
        },
        {
            title: 'Bảo mật, Minh bạch, và Không "BlackBox"',
            description:
                'Toàn bộ hệ thống được Miquant xây dựng với tiêu chuẩn bảo mật cao nhất và dữ liệu của bạn được tôn trọng tuyệt đối. Quan trọng hơn, mọi thuật toán và mô hình AI đều có thể được kiểm chứng và giải thích, đảm bảo bạn luôn hiểu được "tại sao" đằng sau mỗi kết quả.',
        },
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                px: { xs: 2, sm: 4, md: 6, lg: 8 }, // Responsive horizontal padding
                alignItems: 'center',
            }}
        >
            <SectionTitle text={t('Giá trị tạo nên sự khác biệt')} />

            <Grid
                container
                rowSpacing={{ xs: 2, sm: 2 }}
                columnSpacing={{ xs: 2, sm: 2 }}
            >
                {gridData.map((card, index) => (
                    <Grid
                        className="neumorphic"
                        key={index}
                        size={{ xs: 12, sm: 6}} // 2 columns on small screens and up
                        sx={{
                            background: neumorphism.card,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            px: 3,
                            py: 3,
                            borderRadius: '16px',
                            overflow: 'hidden',
                        }}
                    >
                        <Box
                            sx={{
                                p: 0.4,
                                display: 'flex',
                                width: 'fit-content',
                                height: 'auto',
                                boxShadow: neumorphism.hover,
                                borderRadius: '50%',
                            }}>

                            <Box
                                sx={{
                                    height: '40px',
                                    width: '40px',
                                    borderRadius: '50%',
                                    // background: `linear-gradient(45deg, ${colors.primary._5},  ${colors.primary._7})`,
                                    border: `1.6px solid ${colors.primary._9}`,
                                    color: colors.primary._5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {index === 0 ? <BarChartRounded /> : index === 1 ? <HandshakeRounded /> : index === 2 ? <KeyRounded /> : <SecurityRounded />}
                            </Box>
                        </Box>
                        <Typography
                            sx={{
                                fontWeight: fonts.weights.bold,
                                fontSize: { xs: fonts.sizes.md, sm: fonts.sizes.lg },
                                textAlign: 'left',
                                color: colors.neutral._8,
                            }}
                        >
                            {card.title}
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: fonts.weights.light,
                                fontSize: { xs: fonts.sizes.sm, sm: fonts.sizes.md },
                                textAlign: 'left',
                                color: colors.neutral._9,
                            }}
                        >
                            {card.description}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
