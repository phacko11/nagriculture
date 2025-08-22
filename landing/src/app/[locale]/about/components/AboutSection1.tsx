import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { fonts } from '../../../components/MuiProvider'
export default function AboutSection1() {
    const theme = useTheme()
    return (

        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' }, // stack mobile, row desktop
                py: { xs: 3, md: 1 },
                paddingRight: { xs: 2, md: 10 },
                alignItems: 'center',
                width: '100%',
                height: 'auto',
                boxSizing: 'border-box'
            }}>

            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    alignItems: { xs: 'center', md: 'center' },
                    mb: { xs: 2, md: 0 },
                }}>
                <Typography
                    sx={{
                        fontWeight: theme.typography.fontWeightBold,
                        fontSize: { xs: fonts.sizes.lg, md: fonts.sizes.body },
                        textAlign: { xs: 'center', md: 'right' },
                    }}
                >
                    Hành trình từ nền tảng phân tích định lượng đến hạ tầng đầu tư ứng dụng AI
                </Typography>
                <Typography
                    sx={{
                        fontWeight: theme.typography.fontWeightLight,
                        fontSize: { xs: fonts.sizes.sm, md: fonts.sizes.md },
                        textAlign: { xs: 'center', md: 'right' },
                    }}
                >
                    Tại Miquant, chúng tôi tin rằng lợi thế đầu tư vượt trội được kiến tạo từ việc phân tích dữ liệu một cách sắc bén và kịp thời. Xuất phát từ nền tảng phân tích định lượng vững chắc, chúng tôi tích hợp sức mạnh của Trí tuệ nhân tạo (AI) để giúp nhà đầu tư thực sự làm chủ quyết định của mình—từ việc nhìn thấu cơ hội đến quản trị rủi ro hiệu quả.                    
                    <br />
                    Miquant mang đến một hạ tầng dữ liệu và công cụ AI đáng tin cậy, phục vụ thế hệ nhà đầu tư hiện đại tại Việt Nam và Đông Nam Á. Được dẫn dắt bởi đội ngũ chuyên gia liên ngành, chúng tôi tự tin biến sự phức tạp của thị trường thành lợi thế cạnh tranh thực tế của bạn.
                </Typography>
            </Box>
        </Box>
    )
}