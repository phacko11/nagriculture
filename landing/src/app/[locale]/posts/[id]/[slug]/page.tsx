// app/posts/[id]/page.js
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import Link from 'next/link';

// MUI Imports
import {
    Container,
    Typography,
    Box,
    CircularProgress,
    Paper,
    Alert,
    Chip, // Added for topic badges
    Avatar, // Added for author
} from '@mui/material';
import { neumorphism } from '@/app/components/MuiProvider';
import CustomChip from '@/app/components/Chip';

// Define the types for your data
type Topic = {
    name: string;
    baseColor: string;
};

type Author = {
    name: string;
    // You might want to add an avatar URL in the future
    // avatarUrl?: string; 
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

// Your markdown component mapping remains the same
const markdownComponents: Components = {
    h1: ({ children }) => <Typography variant="h3" component="h1" gutterBottom>{children}</Typography>,
    h2: ({ children }) => <Typography variant="h4" component="h2" gutterBottom>{children}</Typography>,
    h3: ({ children }) => <Typography variant="h5" component="h3" gutterBottom>{children}</Typography>,
    h4: ({ children }) => <Typography variant="h6" component="h4" gutterBottom>{children}</Typography>,
    p: ({ children }) => <Typography paragraph>{children}</Typography>,
    a: ({ href, children }) => <Link href={href || '#'}>{children}</Link>,
    li: ({ children }) => (
        <Box component="li" sx={{ mt: 1 }}>
            <Typography component="span">{children}</Typography>
        </Box>
    ),
    // 2. THIS IS THE FIX: The 'code' component is updated
    code: ({ className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || '');
        // Check for 'match' to determine if it's a code block
        return match ? (
            <Paper elevation={2} sx={{ p: 2, my: 2, backgroundColor: neumorphism.card, overflowX: 'auto' }}>
                <Box
                    component="code"
                    className={className}
                    sx={{ fontFamily: 'monospace' }}
                    {...props}
                >
                    {children}
                </Box>
            </Paper>
        ) : (
            // If no language match, it's an inline code element
            <Box
                component="code"
                sx={{
                    backgroundColor: 'rgba(0,0,0,0.08)',
                    borderRadius: '4px',
                    px: '4px',
                    py: '2px',
                    fontFamily: 'monospace',
                }}
                {...props}
            >
                {children}
            </Box>
        );
    },
    blockquote: ({ children }) => (
        <Paper
            elevation={0}
            sx={{
                borderLeft: '4px solid',
                borderColor: 'primary.main',
                pl: 2,
                my: 2,
                fontStyle: 'italic',
                backgroundColor: 'action.hover'
            }}
        >
            {children}
        </Paper>
    ),
    img: ({ src, alt }) => (
        <Box
            component="img"
            src={src}
            alt={alt}
            sx={{ width: '100%', height: 'auto', maxWidth: '100%', borderRadius: 1, my: 2, display: 'block' }}
        />
    ),
    table: ({ children }) => (
        <Box sx={{ overflowX: 'auto', my: 2 }}>
            <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
                {children}
            </Box>
        </Box>
    ),
    th: ({ children }) => (
        <Box component="th" sx={{ border: '1px solid #ddd', p: 1, backgroundColor: 'action.hover', fontWeight: 'bold' }}>
            {children}
        </Box>
    ),
    td: ({ children }) => (
        <Box component="td" sx={{ border: '1px solid #ddd', p: 1 }}>
            {children}
        </Box>
    ),
};

export default function PostPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;   // real post id for DB query
    const slug = params.slug; // just for SEO / display

    // 1. Add state for the full post object and the markdown content
    const [postData, setPostData] = useState<ResearchPost | null>(null);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        // 2. Updated fetch logic
        const fetchPost = async (postId: string) => {
            setLoading(true);
            setError(null);
            try {
                console.log(`Fetching post with ID: ${postId}`);
                // --- Step 1: Fetch the post metadata from your API ---
                const postRes = await fetch(`http://localhost:3000/api/posts/${postId}`);
                console.log("this is res:", postRes);
                if (!postRes.ok) {
                    throw new Error(`Failed to fetch post data: ${postRes.statusText}`);
                }
                const { post } = await postRes.json();
                console.log("this is post:", post);

                setPostData(post);


                // --- Step 2: Fetch the markdown content using the URL from the metadata ---
                const contentRes = await fetch(post.postUrl);
                console.log(contentRes);
                if (!contentRes.ok) {
                    throw new Error(`Failed to fetch markdown content: ${contentRes.statusText}`);
                }
                const text = await contentRes.text();
                setContent(text);

            } catch (err) {
                console.error('Error fetching post:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchPost(Array.isArray(id) ? id[0] : id);
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Alert severity="error">
                    <strong>Error:</strong> Could not load the post.
                    <Typography variant="body2">{error}</Typography>
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: { xs: 12, md: 15 } }}>
            <Box sx={{ mb: 4 }}>
                <Typography
                    color="primary"
                    sx={{ '&:hover': { textDecoration: 'underline', cursor: 'pointer' } }}
                    onClick={() => router.back()}
                >
                    ← See more posts
                </Typography>
            </Box>

            {/* 3. Render the fetched metadata */}
            {postData && (
                <Box mb={4}>
                    {/* Topic Badges */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {postData.topics.map((topic) => (
                            <CustomChip
                                key={topic.name}
                                color={topic.baseColor}
                                label={topic.name}
                            />
                        ))}
                    </Box>

                    {/* Title */}
                    <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                        {postData.title}
                    </Typography>

                    {/* Author and Date */}
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', my: 2 }}>
                        <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: '0.8rem' }}>
                            {postData.author.name.charAt(0)}
                        </Avatar>
                        <Typography variant="body2" component="span">
                            {postData.author.name} · {new Date(postData.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'long', day: 'numeric'
                            })}
                        </Typography>
                    </Box>
                </Box>
            )}

            {/* Render the Markdown content */}
            <Box className="markdown-container">
                <ReactMarkdown
                    components={markdownComponents}
                    remarkPlugins={[remarkGfm]}
                >
                    {content}
                </ReactMarkdown>
            </Box>
        </Container>
    );
}
