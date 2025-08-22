// components/NewsCard.jsx
import { Box, Typography, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { colors, fonts, neumorphism } from './MuiProvider';
import CustomChip from './Chip';
import { format } from 'date-fns';
const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    const trimmed = text.slice(0, maxLength);
    return trimmed.slice(0, trimmed.lastIndexOf(' ')) + '...';
};
const NewsCard = ({ newsItem, size = 'md' }) => {
    const theme = useTheme();

    const formatDate = (isoString) => {
        if (!isoString) return '';
        return format(new Date(isoString), 'dd MMM yyyy');
    };

    const handleClick = () => {
        if (newsItem.postUrl?.toLowerCase().endsWith(".pdf")) {
            window.open(newsItem.postUrl, "_blank");
        } else {
            const filename = newsItem.postUrl.replace(/^https?:\/\/[^/]+\/posts\//, "");
            window.open(`/posts/${newsItem.id}/${encodeURIComponent(filename.replace('.md', ''))}`, "_self");
        }
    };

    // Dynamic font size map
    const sizeMap = {
        sm: { title: fonts.sizes.md, description: fonts.sizes.sm },
        md: { title: fonts.sizes.lg, description: fonts.sizes.md },
        lg: { title: fonts.sizes.xl, description: fonts.sizes.lg },
    };

    const selectedSize = sizeMap[size] || sizeMap.md;

    const cardStyles = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        transition: 'box-shadow 0.2s ease-in-out, border 0.2s ease-in-out',
        border: 'none',
        background: neumorphism.card,
        '&:hover': {
        // background: neumorphism.background,
        },
        px: 2,
        py: 2,
        paddingBottom: 3,
        borderRadius: '16px',
        gap: { xs: 1, sm: 1.5, md: 2 },
        height: 'auto',
        cursor: 'pointer',
    };

    const imageStyles = {
        width: '100%',
        aspectRatio: '2',
    };

    return (
        <Paper variant='outlined' className='neumorphic' sx={cardStyles} onClick={handleClick}>
            <img src={newsItem.imageUrl} style={{ ...imageStyles, objectFit: 'cover' }} alt={newsItem.title} />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                px: 2,
            }}>

                <Typography sx={{
                    color: fonts.neutral._9,
                    fontSize: selectedSize.title,
                    fontWeight: fonts.weights.bold,
                }}>
                    {newsItem.title}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {newsItem.topics.map((topic, index) => (
                        <CustomChip key={index} label={topic.name} color={topic.baseColor} />
                    ))}
                </Box>

                <Typography sx={{
                    color: fonts.neutral._5,
                    fontSize: selectedSize.description,
                    fontWeight: fonts.weights.regular,
                }}>
                    {truncateText(newsItem.description, 120)}
                </Typography>
                <Typography sx={{
                    color: colors.primary._2,
                    fontSize: fonts.sizes.sm,
                    fontWeight: fonts.weights.semiBold,
                }}>
                    {formatDate(newsItem.createdAt)} - {newsItem.author.name}
                </Typography>
            </Box>
        </Paper>
    );
};

export default NewsCard;
