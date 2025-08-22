'use client'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { fonts, neumorphism } from '../../components/MuiProvider'
import { useState } from 'react';

// Make sure your CSS file with the new classes is imported
// import './your-styles.css'; 

export default function FAQsPage() {
    const theme = useTheme()
    const [expandedIndex, setExpandedIndex] = useState(0)
    const qnas = [
        {
            summary: 'Nền tảng Miquant là gì?',
            details: 'Nền tảng Miquant là giải pháp tiên tiến kết hợp phân tích định lượng và trí tuệ nhân tạo, cung cấp các công cụ chuyên sâu giúp nhà đầu tư nâng cao khả năng ra quyết định và hiểu rõ thị trường tài chính. Miquant hỗ trợ từ giám sát thị trường cơ bản đến xếp hạng cổ phiếu phức tạp với trợ lý AI thông minh.',
        },
        {
            summary: 'Miquant có thể giúp tối ưu quy trình đầu tư của bạn thế nào?',
            details: 'Nền tảng Miquant được xây dựng để tích hợp linh hoạt vào quy trình đầu tư của bạn. Với khả năng cung cấp thông tin chi tiết, tối ưu hóa chiến lược và đưa ra các khuyến nghị dựa trên AI, Miquant giúp cải thiện và nâng cao cả phương pháp đầu tư truyền thống và định lượng.',
        },
        {
            summary: 'Những tính năng giá trị nhất đối với nhà đầu tư là gì?',
            details: 'Miquant giúp nhà đầu tư theo dõi thị trường dễ dàng hơn nhờ các công cụ phân tích định lượng trực quan, tín hiệu rõ ràng và có cơ sở. Từ tâm lý thị trường, tin tức, sự kiện vĩ mô cho đến dữ liệu tài chính – mọi thứ đều được xử lý bằng AI để bạn không bỏ lỡ cơ hội và kiểm soát rủi ro tốt hơn.',
        },
        {
            summary: 'Thuật toán phân bổ danh mục nào đang được Miquant sử dụng?',
            details: 'Miquant cung cấp các công cụ tối ưu hóa hiệu quả cho việc xây dựng danh mục đầu tư và quản lý rủi ro, từ mô hình phương sai trung bình (MVP) cơ bản đến các thuật toán máy học tiên tiến như Phân bổ rủi ro phân cấp (HRP) và các phương pháp tối ưu hóa phức tạp dựa trên mạng lưới.',
        },
        {
            summary: 'Hệ thống AI của Miquant có gì nổi bật và đáng tin cậy?',
            details: 'Miquant ứng dụng agentic AI và multi-agent AI, với nhiều tác tử chuyên biệt phối hợp phân tích dữ liệu tài chính, tin tức và tâm lý thị trường. Hệ thống tạo ra tín hiệu đầu tư minh bạch, có thể giải thích được, giúp nhà đầu tư ra quyết định nhanh, chính xác và có cơ sở.',
        },
        {
            summary: 'Miquant huấn luyện AI dựa trên những kiến thức và thông tin nào?',
            details: 'AI Agent của Miquant được huấn luyện bằng dữ liệu tài chính chuyên sâu, tin tức thị trường, tâm lý nhà đầu tư và hành vi thực tế từ người dùng. Kết hợp với các thuật toán độc quyền và phân tích định lượng, hệ thống liên tục học hỏi và điều chỉnh để đưa ra gợi ý đầu tư chính xác, sát nhu cầu và dễ ứng dụng trong thực tế.',
        },
        {
            summary: 'Hệ thống AI Ranking hoạt động như thế nào?',
            details: 'Hệ thống AI Ranking của Miquant liên tục thích ứng và phát triển dựa trên dữ liệu đầu vào và khẩu vị của người dùng. Bằng cách học hỏi từ các yếu tố ưu tiên và yêu cầu cụ thể của nhà đầu tư (khẩu vị rủi ro, tái phân bổ danh mục, tối ưu hóa), nền tảng cung cấp các danh mục phù hợp với mục tiêu và chiến lược cá nhân.',
        },
        {
            summary: 'Miquant đảm bảo mức độ tin cậy của AI bằng cách nào?',
            details: 'Miquant đảm bảo độ tin cậy của AI bằng cách áp dụng kiểm tra chéo mô hình, thu thập đánh giá và chấm điểm từ người dùng thực tế, đồng thời áp dụng các lớp lọc dữ liệu nghiêm ngặt trước khi đưa vào huấn luyện. Nhờ đó, hệ thống AI luôn minh bạch, có thể giải thích được và bám sát nhu cầu đầu tư thực tế.',
        },
    ]

    // This function remains the same. It updates the CSS variables on the element.
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                py: { xs: 4, sm: 6, md: 20 },
                px: { xs: 2, sm: 4, md: 10, lg: 20, xl: 30 },
                gap: 2,
                background: '#F0F0F0',
            }}>
            {
                qnas.map((item, index) => (
                    <Accordion
                        key={index}
                        // These two props create the expand-on-hover effect
                        expanded={expandedIndex === index}
                        onMouseEnter={() => setExpandedIndex(index)}
                        sx={{
                            backgroundColor: neumorphism.card,
                            borderRadius: '8px !important',
                            py: 1,
                            boxShadow: neumorphism.outline,
                            width: '100%',

                            // Hide the default MUI divider line
                            '&:before': {
                                display: 'none',
                            },
                            '&.Mui-expanded': {
                                margin: '0',
                                borderRadius: '8px',
                                boxShadow: neumorphism.hover,
                            },
                        }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                        >
                            <Typography
                                sx={{
                                    fontWeight: fonts.weights.semiBold,
                                    fontSize: fonts.sizes.md,
                                    color: fonts.neutral._9
                                }}
                            >{item.summary}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{
                            color: fonts.neutral._6,
                        }}>
                            {item.details}
                        </AccordionDetails>
                    </Accordion>
                ))
            }
        </Box>

    )
}
