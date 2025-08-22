import { Box, Grid, Typography } from "@mui/material"
import { fonts } from "./MuiProvider"
import NewsCard from "./PostCard"

export default function MainPostCards({ researches , text}) {
    return (
        <Box sx={{
            px: { xs: 2, sm: 6, md: 12, lg: 20 },
            gap: 3,
            display: 'flex',
            flexDirection: 'column',
            height: 'auto'
        }}>

            <Typography sx={{
                fontWeight: fonts.weights.semiBold,
                fontSize: fonts.sizes.body,
            }}>
                {text}
            </Typography>
            <Box sx={{ flexGrow: 1 , height:'auto'}}>
                <Grid container spacing={4} alignItems="stretch" height="100%">
                    <Grid size={{ xs: 12, md: 6 }} sx={{ // Use `item` for Grid children and define responsive sizes
                        display: 'flex',
                    }}>
                        {researches[0] && <NewsCard newsItem={researches[0]}/>}
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }} sx={{ // Use `item` for Grid children and define responsive sizes
                        display: 'flex'
                    }}>
                        {researches[1] && <NewsCard newsItem={researches[1]}/>}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}