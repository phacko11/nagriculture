import * as React from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { colors, fonts, neumorphism } from '../../../components/MuiProvider';
import MUIShinyText from './ShinyText';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: { xs: 2, md: 4 } }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

// Tab data array
const tabsData = [
    {
        label: "Tài chính doanh nghiệp",
        description1: "Soi chiếu sức khỏe tài chính của doanh nghiệp",
        description2: "Nền tảng tự động bóc tách báo cáo tài chính, giúp bạn nhận diện các điểm sáng trong kinh doanh và phát hiện sớm các rủi ro tiềm ẩn về dòng tiền hay vay nợ, làm rõ bức tranh toàn cảnh ẩn sau các con số",
        img: '/assets/SK tai chinh.png'
    },
    {
        label: "Tâm lý thị trường",
        description1: "Lắng nghe nhịp đập thị trường",
        description2: "Nền tảng tổng hợp và phân tích dữ liệu từ các nguồn uy tín như tin tức, diễn đàn và cộng đồng chuyên gia. Thuật toán của Miquant sẽ xử lý và lượng hoá mức độ đồng thuận của thị trường, giúp bạn sớm nhận diện rủi ro tâm lý đám đông, nắm bắt dòng tiền, và ra quyết định với hiệu suất tốt hơn.",
        img: '/assets/Sentiment.png'
    },
    {
        label: "Sự kiện kinh tế",
        description1: "Tiên phong trước những biến đổi vĩ mô",
        description2: "Nền tảng giúp bạn kết nối với các quyết định về chính sách và chỉ số kinh tế (CPI, GDP, lãi suất) với danh mục đầu tư của chính bạn. Chủ động điều chỉnh chiến lược để đón đầu cơ hội hoặc phòng ngừa rủi ro, thay vì bị động trước những con sóng lớn của thị trường.",
        img: '/assets/SK tai chinh.png'
    }
];

export default function Insight() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => setValue(newValue);

    return (
        <Box sx={{ width: '100%', bgcolor: neumorphism.card, py: 6, boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.15), 0px -4px 6px rgba(255, 255, 255, 1)' }}>
            <Typography variant="h4" component="h2" align="center" fontWeight="bold" gutterBottom>
                Phân tích đa chiều
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="Phân tích đa chiều"
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        maxWidth: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        border: '1px solid #d0d0d0',
                        borderRadius: '50px',
                        p: { xs: 0.3, sm: 0.5 },
                        my: 2,
                        "& .MuiTabs-flexContainer": {
                            gap: { xs: 1, sm: 2, md: 3 },
                        },
                        "& .MuiTabs-indicator": {
                            display: 'none',
                        },
                        "& .MuiTabs-scroller": {
                            overflow: "visible !important",
                        },
                    }}
                >
                    {tabsData.map((tab, index) => (
                        <Tab
                            key={index}
                            label={tab.label}
                            {...a11yProps(index)}
                            disableRipple
                            sx={{
                                textTransform: 'none',
                                fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                                px: { xs: 1.5, sm: 2, md: 3 },
                                py: { xs: 0.5, sm: 0.7, md: 1 },
                                borderRadius: '50px',
                                transition: 'all 0.8s ease',
                                boxShadow: neumorphism.outline,
                                whiteSpace: 'nowrap',
                                "&:hover": {
                                    background: 'linear-gradient(145deg, #e7e7e7ff, #ffffff)',
                                    boxShadow: neumorphism.outline,
                                    color: colors.neutral._9,
                                    WebkitTextFillColor: colors.neutral._9,
                                },
                                "&.Mui-selected": {
                                    boxShadow: neumorphism.hover,
                                    background: `linear-gradient(45deg, ${colors.primary._3}, ${colors.primary._5})`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                },
                            }}
                        />
                    ))}
                </Tabs>
            </Box>

            {tabsData.map((tab, index) => (
                <CustomTabPanel key={index} value={value} index={index}>
                    <Grid container spacing={4} alignItems="center" justifyContent="center" width='100%' height={'auto'} paddingX={{ lg: 15, md: 10, xs: 2 }}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            {tab.label === "Sự kiện kinh tế" ?
                                (
                                    <Box
                                        className='neumorphic'
                                        sx={{
                                            background: neumorphism.card,
                                            p: 0.5,
                                            aspectRatio: '16 / 9',       // ✅ Force 16:9 aspect ratio
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
                                ) : (

                                    <Box
                                        sx={{
                                            position: 'relative',
                                            height: 'auto',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Box
                                            component="img" // or 'img'
                                            src={tab.img}
                                            className='neumorphic'
                                            sx={{
                                                background: neumorphism.card,
                                                p: 0.5,
                                                aspectRatio: '16 / 9',       // ✅ Force 1:1 aspect ratio
                                                width: '100%',
                                                borderRadius: '12px',
                                                position: 'relative',
                                                zIndex: 1,
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </Box>
                                )}
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }} sx={{
                            px: { xs: 2, sm: 4, md: 6, lg: 8 },
                            display: 'flex',
                            height: '100%',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}>
                            <Typography sx={{ color: colors.neutral._9, fontSize: fonts.sizes.md, lineHeight: 1.8, fontWeight: fonts.weights.medium }}>
                                {tab.description1}
                            </Typography>
                            <Typography sx={{ color: colors.neutral._8, fontSize: fonts.sizes.md, lineHeight: 1.8 }}>
                                {tab.description2}
                            </Typography>
                        </Grid>
                    </Grid>
                </CustomTabPanel>
            ))}
        </Box>
    );
}