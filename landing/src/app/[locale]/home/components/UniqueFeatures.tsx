import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import SectionTitle from './SectionTitle';
import { colors, fonts, neumorphism } from '@/app/components/MuiProvider';
import MUIShinyText from './ShinyText';

// Data for the feature sections. You can easily modify or add more items here.
const featuresData = [
    {
        title: 'Chủ đề nổi bật',
        description: 'Công nghệ của chúng tôi tự động quét và phân cụm hàng ngàn tin tức mỗi ngày. Thay vì đọc hàng chục bài báo, bạn chỉ cần 5 phút để nắm bắt những chủ đề đầu tư quan trọng nhất, được cô đọng trong vài dòng phân tích sắc sảo.',
        // Replace with your actual video or image source
        mediaSrc: '/assets/Source - chu de.mp4',
    },
    {
        title: 'Định giá cổ phiếu tự động',
        description: 'Định giá nhanh trong 90 giây chỉ với 1 câu lệnh. Hệ thống sẽ thực hiện các phương pháp định giá phổ biến (P/E, P/B, EV/EBITDA), đồng thời cung cấp một bức tranh toàn cảnh về tiềm năng, triển vọng và cả rủi ro của hơn 400 cổ phiếu trên thị trường chứng khoán Việt Nam.',
        mediaSrc: '/assets/Source - DInh gia.mp4',
    },
    {
        title: 'Al Chatbot',
        description: 'Được xây dựng với một mục tiêu: trả lời mọi câu hỏi của nhà đầu tư, từ phân tích vĩ mô, ngành, cho đến từng cổ phiếu và dự án cụ thể.',
        mediaSrc: '/assets/Source - hard question.mp4',
    },
    // {
    //     title: 'AI Ranking',
    //     description: 'Từ ý tưởng đến một chiến lược có thể kiểm chứng chỉ trong vài giây. Thay vì sàng lọc thủ công, hãy để AI thực hiện công việc nặng nhọc: tìm kiếm, xếp hạng, và đề xuất danh mục tiềm năng dựa trên chính xác những tiêu chí bạn đưa ra.',
    //     mediaSrc: '/assets/Source - stock.mp4',
    // },
];

// This is the component for a single feature item.
// It handles the alternating layout and the gradient blob background.
const FeatureItem = ({ feature, index }) => {
    const isReversed = index % 2 !== 0;
    const textContent = (
        <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ p: { xs: 2, md: 4 , lg: 8}, textAlign: { xs: 'center', md:'left'} }}>
                <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                    {feature.title}
                </Typography>
                <Typography sx={{
                    color: colors.neutral._8,
                    fontSize: fonts.sizes.md,
                    lineHeight: 1.8
                }}>
                    {feature.description}
                </Typography>
            </Box>
        </Grid>
    );

    const mediaContent = (
        <Grid size={{ xs: 12, md: 6 }}>
            <Box
                sx={{
                    position: 'relative',
                    p: 4,
                    height: '100%',
                    minHeight: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    component="video" // or 'img'
                    src={feature.mediaSrc}
                    autoPlay={true}
                    loop={true}
                    muted
                    className='neumorphic'
                    sx={{
                        background: neumorphism.card,
                        p:0.5,
                        aspectRatio: '1 / 1',       // ✅ Force 1:1 aspect ratio
                        width: '100%',
                        borderRadius: '12px',
                        position: 'relative',
                        zIndex: 1,
                        objectFit: 'cover',
                    }}
                />
            </Box>
        </Grid>

    );

    return (
        <Box sx={{ overflow: 'visible' }}>
            <Grid container alignItems="center" direction={isReversed ? 'row-reverse' : 'row'}>
                {textContent}
                {mediaContent}
            </Grid>
        </Box>
    );
};


// This is the main component that you will export and use.
export default function UniqueFeatures() {
    return (
        <Box sx={{ py: { xs: 6, md: 10 } }}>
            <Container>
                <SectionTitle text="Tính năng nổi bật" />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 6, md: 10 } }}>
                    {featuresData.map((feature, index) => (
                        <FeatureItem key={index} feature={feature} index={index} />
                    ))}
                    <Grid container alignItems="center" direction={'row-reverse'}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box sx={{ p: { xs: 2, md: 4 }, textAlign: { xs: 'center', md: 'left' } }}>
                                <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                                    AI Ranking
                                </Typography>
                                <Typography sx={{
                                    color: colors.neutral._8,
                                    fontSize: fonts.sizes.md,
                                    lineHeight: 1.8
                                }}>
                                    Từ ý tưởng đến một chiến lược có thể kiểm chứng chỉ trong vài giây. Thay vì sàng lọc thủ công, hãy để AI thực hiện công việc nặng nhọc: tìm kiếm, xếp hạng, và đề xuất danh mục tiềm năng dựa trên chính xác những tiêu chí bạn đưa ra.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    p: 4,
                                    height: '100%',
                                    minHeight: '300px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Box
                                    className='neumorphic'
                                    sx={{
                                        aspectRatio: '1 / 1',       // ✅ Force 1:1 aspect ratio
                                        width: '100%',
                                        borderRadius: '12px',
                                        position: 'relative',
                                        zIndex: 1,
                                        objectFit: 'cover',
                                        display: 'flex',
                                        alignItems: 'center',      // ✅ vertical center
                                        justifyContent: 'center',
                                    }}
                                >
                                    <MUIShinyText>
                                        coming soon...
                                    </MUIShinyText>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}