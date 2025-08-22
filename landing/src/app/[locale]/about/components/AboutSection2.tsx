import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { fonts, neumorphism } from '../../../components/MuiProvider';
import { colors } from '../../../components/MuiProvider';
import { useTranslations } from 'next-intl';


export default function AboutSection2() {
    const t = useTranslations('AboutPage');
    const aboutSections = [
        {
            title: t('Vision.Headline1'),
            text: t('Vision.Body1'),
            image: '/assets/pexels-pixabay-373543.jpg',
            reverse: true, // image right
        },
        {
            title: t('Vision.Headline2'),
            text: t('Vision.Body2'),
            image: '/assets/pexels-photo-30572289.jpeg',
            reverse: false, // image right
        },
        {
            title: t('Vision.Headline3'),
            text: t('Vision.Body3'),
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