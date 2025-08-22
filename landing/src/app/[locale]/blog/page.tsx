'use client'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { fonts } from '../../components/MuiProvider'
import { useTheme } from '@mui/material/styles'
import NewsCard from '../../components/PostCard';
import MainResearches from '../../components/MainPostCards';
import AllResearches from '../../components/AllPostCards';
import { useEffect, useState } from "react";

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
export default function Blog() {
    const [researches, setResearches] = useState<ResearchPost[]>([]);

    useEffect(() => {
        const fetchResearches = async () => {
            try {
                const res = await fetch(
                    `http://localhost:3000/api/posts?category=BLOG`
                );
                console.log(res)
                if (!res.ok) {
                    throw new Error(`Failed to fetch: ${res.status}`);
                }
                const data: ResearchPost[] = await res.json();
                setResearches(data); 
            } catch (err) {
                console.error("Error fetching researches:", err);
            }
        };
        fetchResearches();
    }, []);

    const theme = useTheme()
    return (
        <Box sx={{
            background: '#F0F0F0',
            width: "100%",
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            paddingTop: 15,
        }}>
            <MainResearches researches={researches} text='Blog gần đây' />
            <AllResearches researches={researches} text='Tất cả blog'/>
        </Box>
    )
}