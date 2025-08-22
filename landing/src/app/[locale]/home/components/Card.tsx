'use client'
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme, useMediaQuery } from '@mui/material';
import { colors, fonts, neumorphism } from '../../../components/MuiProvider';
import { ArrowOutward } from '@mui/icons-material';
import SeasonalHoverCards from '@/components/lightswind/seasonal-hover-cards';


// Demo data for cards
const demoCards = [
  {
    id: 1,
    title: 'Nhà đầu tư & Chuyên gia',
    summary: 'Phát hiện cơ hội và rủi ro',
    details: 'Nhanh chóng phát hiện cơ hội đầu tư và nhận diện rủi ro thông qua phân tích toàn diện thị trường, tin tức và tâm lý đám đông trên nền tảng dữ liệu đã được kiểm chứng.',
    img: '/assets/HungHa.jpg'
  },
  {
    id: 2,
    title: 'Quỹ đầu tư & Tổ chức',
    summary: 'Tự động hoá và nâng cao hiệu suất',
    details: 'Tự động hoá quy trình nghiên cứu, tăng cường hiệu suất cho đội ngũ và ra quyết định nhanh hơn, chính xác hơn với mô hình AI độc quyền.',
    img: '/assets/HungHa.jpg'
  },
  {
    id: 3,
    title: 'Lập trình viên & Kỹ sư',
    summary: 'Xây dựng và tích hợp dữ liệu',
    details: 'Xây dựng các ứng dụng tài chính tuỳ chỉnh, tích hợp dữ liệu sạch và đáng tin cậy vào hệ thống của bạn một cách liền mạch.',
    img: '/assets/HungHa.jpg'
  },
];


export default function CardGrid() {
  // Allow null to let cards be collapsible on mobile
  const [expanded, setExpanded] = useState<number | null>(0);
  const theme = useTheme();
  // Use 'md' as the breakpoint to switch between mobile and desktop views
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleToggle = (index: number) => {
    if (isMobile) {
      // On mobile, tapping an expanded card will collapse it
      setExpanded(expanded === index ? null : index);
    } else {
      // On desktop, hover always keeps one card expanded
      setExpanded(index);
    }
  };


  return (
    <Box
      sx={{
        display: 'flex',
        // Switch to vertical layout on mobile screens
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 2, md: 1 },
        width: '100%',
        // Use auto height on mobile to fit content
        height: { xs: 'auto', md: '360px' },
        // Adjust padding for different screen sizes
        px: { xs: 2, sm: 4, lg: 15 },
        py: { xs: 4, md: 0 },
        boxSizing: 'border-box',
        alignItems: 'stretch',
      }}
    >


      {demoCards.map((card, i) => {
        const isExpanded = expanded === i;
        return (
          <Box
            key={card.id}
            // Use onClick for mobile and onMouseEnter for desktop
            onClick={() => handleToggle(i)}
            onMouseEnter={isMobile ? undefined : () => handleToggle(i)}
            sx={{
              // Desktop-only styles for horizontal expansion
              flexGrow: { md: isExpanded ? 2 : 1 },
              flexBasis: { md: 0 },
              minWidth: { md: 0 },
              maxWidth: { md: isExpanded ? '66.66%' : '33.33%' },
              // Common styles
              height: '100%',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              boxShadow: isExpanded ? neumorphism.hover : neumorphism.outline,
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              borderRadius: 3,
              overflow: 'hidden',
              position: 'relative',
              background: neumorphism.card,
              p: 1,
            }}
          >
            {/* Text Content Area */}
            <Box
              sx={{
                flex: 1,
                p: { xs: 2, md: 1.5 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'left',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: isExpanded ? 1 : 2, transition: 'gap 0.6s' }}>
                <Box sx={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  background: isExpanded ? colors.neutral._1 : colors.neutral._9,
                  borderRadius: isExpanded ? '8px' : '16px',
                  width: isExpanded ? 32 : 64, height: isExpanded ? 32 : 64,
                  transition: 'all 0.6s',
                }}>
                  <ArrowOutward sx={{
                    fontSize: isExpanded ? 24 : 32, transition: 'all 0.6s',
                    color: isExpanded ? colors.primary._4 : colors.neutral._1
                  }} />
                </Box>
                <Typography sx={{
                  fontSize: isExpanded ? fonts.sizes.body : fonts.sizes.body,
                  fontWeight: 700, mb: isExpanded ? 1 : 0, transition: 'all 0.6s',
                  color: isExpanded ? colors.primary._4 : colors.neutral._9
                }}
                >
                  {card.title}
                </Typography>
              </Box>

              {/* Details shown on mobile accordion or desktop expanded view */}
              <Box sx={{
                maxHeight: isExpanded ? '300px' : 0,
                opacity: isExpanded ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.6s ease-in-out, opacity 0.6s ease-in-out',
              }}
              >
                <Typography sx={{ mt: 2, fontSize: '16px', color: isExpanded ? colors.primary._2 : colors.neutral._0, fontWeight: 400 }}>
                  {card.summary}
                </Typography>
                <Typography sx={{ mt: 1, fontSize: '14px', color: isExpanded ? colors.primary._1 : colors.neutral._0, fontWeight: 300 }}>
                  {card.details}
                </Typography>
              </Box>

              {/* Summary shown on mobile when collapsed */}
              {!isExpanded && isMobile && (
                <Typography sx={{ mt: 2, fontSize: '16px', color: colors.neutral._10 }}>
                  {card.summary}
                </Typography>
              )}
            </Box>

            {/* Image Area */}
            <Box
              sx={{
                // Only show image on desktop view when expanded
                display: { xs: isExpanded ? 'flex' : 'none', md: 'flex' },
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                maxWidth: { md: isExpanded ? '50%' : 0 },
                width: { md: isExpanded ? '100%' : 0 },
                opacity: { md: isExpanded ? 1 : 0 },
                overflow: 'hidden',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <Box
                component="img"
                src={card.img}
                alt={card.title}
                sx={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  // maxHeight: 250,
                  m: 1,
                  borderRadius: 2,
                  opacity: isExpanded ? 1 : 0,
                  transition: 'opacity 0.6s'
                }}
              />
            </Box>
          </Box>
        );
      })}


    </Box>
  );
}
