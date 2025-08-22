import { Box, Grid, Link, Pagination, Typography } from "@mui/material"
import { fonts } from "./MuiProvider"
import NewsCard from "./PostCard"
import { useState } from "react";

export default function AllPosts({ researches , text}) {
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 6;

    const pageCount = Math.ceil(researches.length / ITEMS_PER_PAGE);
    const paginatedResearches = researches.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );
    return (
        <Box sx={{
            px: { xs: 2, sm: 6, md: 8, lg: 20 },
            paddingBottom: 10,
        }}>
            

            <Typography sx={{
                fontWeight: fonts.weights.semiBold,
                fontSize: fonts.sizes.body,
            }}>
                {text}
            </Typography>
            <Box sx={{
                my: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                background: '#F0F0F0',
            }}>
                <Grid container spacing={{ xs: 2, sm: 2, md: 3 }}>
                    {paginatedResearches.map((item, index) => (
                        <Grid
                            key={item.id ?? index}
                            size={{ xs: 12, sm: 6, md: 4 }}
                            sx={{ display: "flex" }} // stretch card height evenly
                        >
                            <NewsCard newsItem={item} size="sm" />

                        </Grid>
                    ))}
                </Grid>
                <Box mt={4} display="flex" justifyContent="center">
                    <Pagination
                        count={pageCount}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                        color="primary"
                    />
                </Box>
            </Box>
        </Box>
    )
}