import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { fonts, neumorphism } from '../../../components/MuiProvider';
import { colors } from '../../../components/MuiProvider';


export default function AboutSection2() {
    const aboutSections = [
        {
            title: 'Đồng hành cùng nhà đầu tư trên hành trình hiểu rõ nội tại doanh nghiệp',
            text: 'Giữa biển dữ liệu nhiễu loạn và rời rạc, chúng tôi tin rằng nhiệm vụ của mình không phải là cung cấp thêm thông tin, mà là tìm ra tín hiệu. Bằng cách kết hợp tư duy tài chính định lượng và AI, chúng tôi biến sự phức tạp đó thành những luận điểm đầu tư rõ ràng, với một niềm tin rằng: khi tín hiệu được làm rõ, mọi nhà đầu tư đều có thể tự tin ra quyết định tốt hơn.',
            image: '/assets/pexels-photo-30572289.jpeg',
            reverse: false, // image right
        },
        {
            title: 'Nền tảng bắt đầu từ con người và dữ liệu',
            text: 'Chúng tôi là một đội ngũ trẻ có chung niềm đam mê dành cho toán học, dữ liệu và tài chính. Chính niềm đam mê này là động lực để chúng tôi kiên trì áp dụng công nghệ, biến những phân tích phức tạp thành các công cụ đầu tư trực quan và gần gũi. Mỗi tính năng đều được xây dựng với sự tỉ mỉ, nhằm mang lại giá trị thực tế và sát nhất với nhu cầu của nhà đầu tư Việt.',
            image: '/assets/pexels-photo-3184639.jpeg',
            reverse: true, // image left
        },
    ];
    return (
        <Box sx={{ boxSizing: 'border-box', p: 4 }}>
            <Box
                className='neumorphic'
                sx={{
                    background: neumorphism.card,
                    borderRadius: '32px',
                    p: 1
                }}
            >
                <Box sx={{
                    p: 2,
                    border: '2px solid',
                    borderRadius: '24px',
                    borderColor: colors.neutral._2
                }}>


                    {aboutSections.map((section, index) => (
                        <Box key={index}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: {
                                        xs: 'column' + (section.reverse ? '-reverse' : ''),
                                        md: section.reverse ? 'row-reverse' : 'row',
                                    },
                                    alignItems: 'center',
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    mb: index < aboutSections.length - 1 ? 3 : 0 // Add margin bottom for spacing
                                }}
                            >
                                <Box sx={{ width: { xs: '100%', md: '50%' }, order: { xs: section.reverse ? 2 : 1, md: 'unset' } }}>
                                    <img
                                        src={section.image}
                                        alt={section.title}
                                        style={{
                                            width: '100%',
                                            aspectRatio: '16/9',
                                            objectFit: 'cover',
                                            flex: 1,
                                            marginLeft: 0,
                                            borderRadius: '15px',
                                        }}
                                    />
                                </Box>


                                <Box
                                    sx={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1,
                                        px: { xs: 2, md: 4 },
                                        alignItems: {
                                            xs: 'center',
                                            md: section.reverse ? 'flex-end' : 'flex-start',
                                        },
                                        order: { xs: section.reverse ? 1 : 2, md: 'unset' }
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: fonts.weights.bold,
                                            fontSize: { xs: fonts.sizes.lg, md: fonts.sizes.lg },
                                            textAlign: {
                                                xs: 'center',
                                                md: section.reverse ? 'right' : 'left',
                                            },
                                            color: colors.neutral._8,
                                        }}
                                    >
                                        {section.title}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: fonts.weights.light,
                                            fontSize: { xs: fonts.sizes.sm, md: fonts.sizes.md },
                                            textAlign: {
                                                xs: 'center',
                                                md: section.reverse ? 'right' : 'left',
                                            },
                                            color: colors.neutral._9,
                                        }}
                                    >
                                        {section.text}
                                    </Typography>
                                </Box>
                            </Box>
                            {index < aboutSections.length - 1 && <Divider sx={{ my: 2, borderColor: colors.neutral._3 }} />}
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}