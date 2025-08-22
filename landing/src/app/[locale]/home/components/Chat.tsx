import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import { fonts, colors, neumorphism } from '../../../components/MuiProvider';
import { useTranslations } from 'next-intl';

// Mock API call function (replace with your backend implementation as needed)
async function callRobustAgentAPI(prompt: string) {
    console.log('Sending prompt to Robust Agent backend:', prompt);
    await new Promise(resolve => setTimeout(resolve, 1500)); // simulate network delay
    return { success: true, data: `This is a simulated response for: "${prompt}"` };
}

export default function Chat() {
    const handleNavigate = () => {
        // Navigate to the external URL
        window.location.href = 'https://app.miquant.vn/';
    };
    const t = useTranslations('HomePage.Chat');

    // Suggestions array as before
    const suggestions = [
        t('Phân tích dòng tiền và nợ vay của CTCP Hoà Phát (HPG) trong 5 năm gần nhất'),
        t('So sánh chỉ số P/E, P/B của nhóm ngành ngân hàng quý này'),
        t('Phân tích cho tôi dự án RIG PV DRILLING III của PVD'),
        t('Phân tích tác động của Tariff lên các doanh nghiệp xuất khẩu của Việt Nam')
    ];

    return (
        <Box
            sx={{
                background: neumorphism.card,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                px: { lg: 15, md: 10, xs: 2 },
                py: 20,
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.15), 0px -4px 6px rgba(255, 255, 255, 1)',

            }}>
            <Container maxWidth="md">
                <Box textAlign="center" mb={5}>
                    <Typography variant="h3" component="h1" fontWeight="700">
                        {t('Biến mọi câu hỏi thành cơ hội đầu tư')}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" mt={1}>
                        {t('Nắm trọn luận điểm sắc bén được chắt lọc từ dữ liệu chính xác')}
                    </Typography>
                </Box>
                <Stack spacing={1.5}>
                    {suggestions.map((text) => (
                        <Button
                            key={text}
                            className='neumorphic'
                            onClick={() => handleNavigate()}
                            sx={{
                                backgroundColor: neumorphism.card,
                                justifyContent: 'flex-start',
                                px: 2,
                                py: 2,
                                border: 'none',
                                borderRadius: '16px',
                                outline: 'none',
                                // boxShadow: neumorphism.outline,
                                textTransform: 'none', // optional: keeps the text casing as-is
                                    '&:hover': {
                                        backgroundColor: '#f0f0f0', // slightly dimmer
                                        // boxShadow: neumorphism.hover,
                                    },
                            }}
                        >
                            <Typography
                                sx={{
                                    textAlign: 'left',
                                    fontWeight: fonts.weights.regular,
                                    fontSize: fonts.sizes.sm,
                                    color: colors.neutral._6,

                                }}>
                                {text}
                            </Typography>
                        </Button>
                    ))}
                </Stack>

                <Box component="form" mt={3}
                    className='neumorphic'
                    sx={{
                        backgroundColor: neumorphism.card,
                        justifyContent: 'flex-start',
                        px: 2,
                        py: 2,
                        border: 'none',
                        borderRadius: '16px',
                        outline: 'none',
                        textTransform: 'none', // optional: keeps the text casing as-is

                        // boxShadow: neumorphism.outline,
                        // '&:focus-within': {
                        //     boxShadow: neumorphism.hover,
                        // },
                        transition: 'all 0.3s ease',
                    }}
                >
                    <TextField
                        fullWidth
                        placeholder="Đặt câu hỏi tại đây..."
                        multiline
                        onKeyDown={(event)=>{
                            if (event.key === 'Enter' && !event.shiftKey) {
                                window.location.href = 'https://app.miquant.vn/';
                            }
                        }}
                        minRows={4}
                        maxRows={4} // optional: prevent expanding beyond 4 lines
                        variant="outlined" // Make sure this is set (it's the default)
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                padding: 0,
                                '& fieldset': {
                                    border: 'none',
                                },
                                '&:hover fieldset': {
                                    border: 'none',
                                },
                                '&.Mui-focused fieldset': {
                                    border: 'none',
                                },
                                '& input': {
                                    padding: 0, // Removes internal input padding
                                },
                                // '&:hover': {
                                //     backgroundColor: '#f0f0f0', // slightly dimmer
                                // },
                            },
                        }}
                    />
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="center"
                        gap={2} // spacing between dropdown and button
                    >

                        <IconButton
                            type="submit"
                            onClick={() => handleNavigate()}
                            sx={{
                                color: colors.primary._5,
                                borderRadius: '100px',
                                padding: '10px',
                                transition: 'all 0.3s ease',
                                boxShadow: neumorphism.outline,
                                '&:hover': {
                                    boxShadow: '4px 4px 3px rgba(0, 0, 0, 0.15), -4px -4px 6px rgba(255, 255, 255, 1)',
                                    backgroundColor: neumorphism.card,
                                },
                            }}
                        >
                            <SendIcon />
                        </IconButton>
                    </Box>


                </Box>
            </Container>
        </Box>
    );
}
