import { Box, Grid, Typography, Select, MenuItem } from "@mui/material";
import { useState, useMemo, useEffect, useRef } from "react";
import NewsCard from "./PostCard";
import { fonts, neumorphism } from "./MuiProvider";
import { useTranslations } from "next-intl";

type ResearchGroup = {
    month: string;
    posts: any[]; // Replace `any` with your actual type
};

export default function AllResearchesCard({ researches, text }) {
    const t = useTranslations("ResearchPage");
    const sectionRef = useRef<HTMLDivElement | null>(null);

    const groupedResearches = useMemo(() => {
        if (!researches || researches.length === 0) return [];

        const grouped = researches.reduce((acc, post) => {
            const date = new Date(post.createdAt);
            let monthYearKey = date.toLocaleString(t("Locale"), {
                month: "long",
                year: "numeric",
                timeZone: "UTC",
            });

            monthYearKey =
                monthYearKey.charAt(0).toUpperCase() + monthYearKey.slice(1);

            if (!acc[monthYearKey]) acc[monthYearKey] = [];
            acc[monthYearKey].push(post);
            return acc;
        }, {} as Record<string, any[]>);

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

    const handleSelectGroup = (month: string) => {
        const group = groupedResearches.find((g) => g.month === month) || null;
        setSelectedGroup(group);
        sectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
        });
    };

    return (
        <Box
            ref={sectionRef}
            sx={{
                px: neumorphism.layoutX,
                paddingBottom: 10,
                py: 2,
            }}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                my: 2,
            }}>
                {/* Title */}
                <Typography
                    sx={{
                        fontWeight: fonts.weights.semiBold,
                        fontSize: fonts.sizes.body,
                        mb: 2,
                    }}
                >
                    {text}
                </Typography>

                {/* Dropdown Filter */}
                    <Select
                        value={selectedGroup?.month || ""}
                        onChange={(e) => handleSelectGroup(e.target.value)}
                        sx={{
                            minWidth: 200,
                            backgroundColor: neumorphism.card,
                            borderRadius: "8px",
                            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                            boxShadow: "6px 6px 8px rgb(225, 225, 225), -6px -6px 8px rgba(255, 255, 255, 1), inset 0 0 0 1px #eaeaea",
                        }}
                    >
                        {groupedResearches.map((group) => (
                            <MenuItem key={group.month} value={group.month}>
                                {group.month}
                            </MenuItem>
                        ))}
                    </Select>
            </Box>

            {/* Posts Grid */}
            <Grid
                container
                spacing={{ xs: 2, sm: 2, md: 3 }}
                key={selectedGroup?.month}
                sx={{ transition: "opacity 0.3s ease" }}
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
        </Box>
    );
}
