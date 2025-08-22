import { Box, Grid, Typography, Accordion, AccordionSummary } from "@mui/material";
import { useState, useMemo, useEffect, useRef } from "react";
import { ExpandMore, ArrowForwardIos, ChevronLeft } from "@mui/icons-material";
import NewsCard from "./PostCard";
import { fonts, neumorphism } from "./MuiProvider";
import { useTranslations } from "next-intl";

type ResearchGroup = {
    month: string;
    posts: any[]; // Replace `any` with your actual post type if you have it
};

export default function AllResearchesCard({ researches, text }) {
    const t = useTranslations('ResearchPage');
    const sectionRef = useRef<HTMLDivElement | null>(null);

    const groupedResearches = useMemo(() => {
        if (!researches || researches.length === 0) return [];

        const grouped = researches.reduce((acc, post) => {
            const date = new Date(post.createdAt);
            let monthYearKey = date.toLocaleString(t('Locale'), {
                month: "long",
                year: "numeric",
                timeZone: "UTC",
            });

            monthYearKey =
                monthYearKey.charAt(0).toUpperCase() + monthYearKey.slice(1);

            if (!acc[monthYearKey]) acc[monthYearKey] = [];
            acc[monthYearKey].push(post);
            return acc;
        }, {});

        return Object.keys(grouped)
            .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
            .map((key) => ({
                month: key,
                posts: grouped[key],
            }));
    }, [researches]);

    const [selectedGroup, setSelectedGroup] = useState<ResearchGroup | null>(null);


    useEffect(() => {
        if (groupedResearches.length > 0) {
            setSelectedGroup(groupedResearches[0]);
        }
    }, [groupedResearches]);

    const handleSelectGroup = (group) => {
        setSelectedGroup(group);
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" }); // scroll to top of section
    };

    return (
        <Box
            ref={sectionRef} // attach ref here
            sx={{
                px: { xs: 2, sm: 6, md: 12, lg: 20 },
                paddingBottom: 10,
                py: 2,
            }}
        >
            <Typography
                sx={{
                    fontWeight: fonts.weights.semiBold,
                    fontSize: fonts.sizes.body,
                    mb: 2,
                }}
            >
                {text}
            </Typography>

            <Grid container spacing={2}>
                {/* LEFT COLUMN */}
                <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {groupedResearches.map((group) => (
                            <Accordion
                                key={group.month}
                                expanded={selectedGroup?.month === group.month}
                                onChange={() => handleSelectGroup(group)}
                                disableGutters
                                sx={{
                                    backgroundColor: neumorphism.card,
                                    borderRadius: "8px !important",
                                    py: 1,
                                    boxShadow: neumorphism.outline,
                                    transition: "all 0.3s ease", // smooth open/close
                                    "&:before": { display: "none" },
                                    "&.Mui-expanded": {
                                        margin: "0",
                                        borderRadius: "8px",
                                        boxShadow: neumorphism.hover,
                                    },
                                }}
                            >
                                <AccordionSummary

                                    expandIcon={<ChevronLeft />}
                                >
                                    <Typography sx={{ fontWeight: fonts.weights.medium }}>
                                        {group.month}
                                    </Typography>
                                </AccordionSummary>
                            </Accordion>
                        ))}
                    </Box>
                </Grid>

                {/* RIGHT COLUMN */}
                <Grid size={{ xs: 12, md: 8, lg: 9 }}>
                    <Grid
                        container
                        spacing={{ xs: 1, sm: 2 }}
                        sx={{ transition: "opacity 0.3s ease" }}
                        key={selectedGroup?.month} // force re-render to animate
                    >
                        {selectedGroup?.posts?.map((item) => (
                            <Grid
                                key={item.id}
                                size={{ xs: 12, sm: 6, md: 4 }}
                                sx={{ display: "flex" }}
                            >
                                <NewsCard newsItem={item} size="sm" />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
