'use client'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { fonts } from '../../components/MuiProvider'
import { useTheme } from '@mui/material/styles'
import NewsCard from '../../components/PostCard';
import ResearchHero from './components/ResearchHero';
import MainResearches from '../../components/MainPostCards';
// The component is named AllPostCards, but you are importing it as AllResearches
// This is fine, just a note.
import AllPosts from '../../components/AllPostCards'; 
import AllResearchesCard from '../../components/AllResearchesCard'; 
import { useEffect, useState, useMemo } from "react"; // <-- Import useMemo

type Topic = {
    name: string;
    baseColor: string;
};

type Author = {
    name: string;
};

type ResearchPost = {
    id: number;
    category: string;
    title: string;
    description: string;
    imageUrl: string;
    contentFormat: string;
    createdAt: string;
    updatedAt: string;
    postUrl: string;
    authorId: number;
    author: Author;
    topics: Topic[];
};

export default function ResearchPage() {
    const [researches, setResearches] = useState<ResearchPost[]>([]);

    useEffect(() => {
        const fetchResearches = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/posts?category=RESEARCH`
                );
                if (!res.ok) {
                    throw new Error(`Failed to fetch: ${res.status}`);
                }
                const data: ResearchPost[] = await res.json();
                setResearches(data);
                console.log(data)
            } catch (err) {
                console.error("Error fetching researches:", err);
            }
        };
        fetchResearches();
    }, []);

    // START: ADDED LOGIC
    // Use useMemo to efficiently filter the researches into two groups.
    // This will only re-calculate when the `researches` array changes.

    const factorReportResearches = useMemo(() => 
        researches.filter(post => post.title.startsWith('Factor Report:'))
    , [researches]);

    const financialResearches = useMemo(() => 
        researches.filter(post => !post.title.startsWith('Factor Report:'))
    , [researches]);
    // END: ADDED LOGIC

    return (
        <Box sx={{
            background: '#F0F0F0',
            width: "100%",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            gap: {
                xs: 4,  
                sm: 6,  
                md: 10, 
            },
            paddingTop: 15,
        }}>
            <ResearchHero />
            
            {/* --- MODIFIED SECTION --- */}
            {/* Render the "Factor Report" section if there are any matching posts */}
            {factorReportResearches.length > 0 && (
                <AllResearchesCard 
                    researches={factorReportResearches} 
                    text='Factor Report'
                />
            )}

            {/* Render the "Nghiên cứu tài chính" section if there are any matching posts */}
            {financialResearches.length > 0 && (
                <AllPosts 
                    researches={financialResearches} 
                    text='Tài chính định lượng'
                />
            )}
            {/* --- END MODIFIED SECTION --- */}
            
        </Box>
    )
}
