import { colors, neumorphism } from "@/app/components/MuiProvider";
import { Box, Button, Grid, Typography, Container } from "@mui/material";
import SectionTitle from "./SectionTitle";

const cardData = [
    {
        title: 'Nhà đầu tư & Chuyên gia',
        subtitle: 'Phát hiện cơ hội và rủi ro',
        description: "Nhanh chóng phát hiện cơ hội đầu tư và nhận diện rủi ro thông qua phân tích toàn diện thị trường, tin tức và tâm lý đám đông trên nền tảng dữ liệu đã được kiểm chứng.",
        imgSrc: '/assets/pexels-photo-5816299.jpeg'
    },
    {
        title: 'Quỹ đầu tư & Tổ chức',
        subtitle: 'Tự động hoá và nâng cao hiệu suất',
        description: "Tự động hoá quy trình nghiên cứu, tăng cường hiệu suất cho đội ngũ và ra quyết định nhanh hơn, chính xác hơn với mô hình AI độc quyền.",
        imgSrc: '/assets/pexels-photo-7459470.jpeg'
    },
    {
        title: 'Lập trình viên & Kỹ sư',
        subtitle: 'Xây dựng và tích hợp dữ liệu',
        description: "Xây dựng các ứng dụng tài chính tuỳ chỉnh, tích hợp dữ liệu sạch và đáng tin cậy vào hệ thống của bạn một cách liền mạch.",
        imgSrc: '/assets/pexels-divinetechygirl-1181271.jpg'
    }
];

export default function AimedCustomer() {
    return (
        <Container
            maxWidth={false}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 2,
                px: 2,
            }}
        >
            <SectionTitle text="Công cụ đa vai trò dành cho mọi nhà đầu tư" />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 2,
                    width: '100%',
                }}
            >
                {cardData.map((card, index) => (
                    <Box
                        className="neumorphic"
                        key={index}
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            p: 1,
                            height: { xs: '350px', lg: '450px' },
                            width: { xs: '100%', md: '33.33%' },
                            bgcolor: neumorphism.card,
                            borderRadius: '16px',
                            overflow: 'hidden',
                            transition: 'width 400ms ease-in-out, all 400ms ease-in-out',
                            // This is the equivalent of Tailwind's group-hover
                            '&:hover': {
                                width: { md: '66.67%' },
                            },
                            // Target child elements on hover
                            '&:hover .hover-content': {
                                opacity: 1,
                                transform: 'translateY(0)',
                            },
                        }}
                    >

                            {/* Title section at the TOP */}
                            <Box
                                sx={{
                                    p: 2, 
                                    position: 'relative', // Use relative to be part of the flex flow
                                    zIndex: 10,
                                }}
                            >
                                <Typography variant="h5" component="h2" fontWeight="bold" color={colors.neutral._9} align="center">
                                    {card.title}
                                </Typography>
                                <Typography variant="body2" color={colors.neutral._9} align="center">
                                    {card.subtitle}
                                </Typography>
                            </Box>
                        <Box
                            sx={{
                                position: 'relative',
                                flex: 1,
                                p: 3,
                                borderRadius: '12px', // inner radius smaller than outer
                                overflow: 'hidden',
                                bgcolor: 'black',
                                // --- MODIFICATIONS START ---
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between', // Pushes content to top and bottom
                                alignItems: 'center',          // Horizontally centers the content
                                // --- MODIFICATIONS END ---
                            }}
                        >
                            {/* Background Image */}
                            <Box
                                component="img"
                                src={card.imgSrc}
                                alt={card.title}
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                }}
                            />
                            {/* Overlay */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    bgcolor: 'rgba(0, 0, 0, 0.44)',
                                }}
                            />

                            {/* Description at the BOTTOM, appears on hover */}
                            <Box
                                className="hover-content"
                                sx={{
                                    position: 'relative', // Use relative to be part of the flex flow
                                    zIndex: 10,
                                    opacity: 0,
                                    transform: 'translateY(24px)', // 'translate-y-6'
                                    transition: 'opacity 200ms ease, transform 200ms ease',
                                }}
                            >
                                <Typography variant="body1" color="white" align="center">
                                    {card.description}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Container>

    );
}
