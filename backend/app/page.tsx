'use client';

import { useState, useEffect, FormEvent, useRef, ChangeEvent } from 'react';
import TopicsManager from './Topics';
import dayjs, { Dayjs } from 'dayjs';

// MUI Imports
import {
    Container, Box, Tabs, Tab, Typography, TextField, Button,
    Select, MenuItem, FormControl, InputLabel, Grid, Card, CardContent,
    CardActions, IconButton, Chip, CircularProgress, Alert, Paper, SelectChangeEvent,
    Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

// Date Picker Imports
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// --- Utility ---
const getChipStyle = (color: string) => ({
    backgroundColor: `${color}20`,
    color,
    fontWeight: 500,
});

// --- Interfaces ---
interface Topic {
    id: number;
    name: string;
    baseColor: string;
}
interface Admin {
    id: number;
    name: string;
    email: string;
}
interface Post {
    id: number;
    title: string;
    description: string | null;
    category: string;
    imageUrl: string | null;
    postUrl: string | null;
    author: { name: string };
    createdAt: string;
    topics: Topic[];
    authorId: string;
}

// --- API Helpers ---
const fetchJSON = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed request: ${url}`);
    return res.json();
};

// --- Post Creation Form ---
function PostForm({
    admins,
    topics,
    onSubmit,
    isLoading,
}: {
    admins: Admin[];
    topics: Topic[];
    onSubmit: (formData: FormData) => void;
    isLoading: boolean;
}) {
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        authorId: '1',
        category: 'NEWS',
        contentFormat: 'PDF',
        topicNames: '',
        createdAt: null as Dayjs | null,
    });
    const [postFile, setPostFile] = useState<File | null>(null);
    const [postImage, setPostImage] = useState<File | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setNewPost({ ...newPost, [e.target.name]: e.target.value });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!postFile || !newPost.title) return;

        const fd = new FormData();
        Object.entries(newPost).forEach(([k, v]) => {
            if (v) fd.append(k, v instanceof dayjs ? v.toISOString() : String(v));
        });
        fd.append('file', postFile);
        if (postImage) fd.append('image', postImage);
        onSubmit(fd);

        // reset
        setNewPost({ title: '', description: '', authorId: '1', category: 'NEWS', contentFormat: 'PDF', topicNames: '', createdAt: null });
        setPostFile(null);
        setPostImage(null);
    };

    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Create New Post</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Post Title" name="title" value={newPost.title} onChange={handleInputChange} required />
                <TextField label="Description" name="description" value={newPost.description} onChange={handleInputChange} multiline rows={3} />
                <FormControl fullWidth required>
                    <InputLabel>Author</InputLabel>
                    <Select name="authorId" value={newPost.authorId} onChange={(e) => setNewPost({ ...newPost, authorId: e.target.value })}>
                        {admins.map((a) => <MenuItem key={a.id} value={a.id}>{a.name} ({a.email})</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl fullWidth required>
                    <InputLabel>Category</InputLabel>
                    <Select name="category" value={newPost.category} onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}>
                        <MenuItem value="NEWS">News</MenuItem>
                        <MenuItem value="BLOG">Blog</MenuItem>
                        <MenuItem value="RESEARCH">Research</MenuItem>
                    </Select>
                </FormControl>
                <TextField label="Topics (comma-separated)" name="topicNames" value={newPost.topicNames} onChange={handleInputChange} />
                <DatePicker label="Publication Date (Optional)" value={newPost.createdAt} onChange={(d) => setNewPost({ ...newPost, createdAt: d })} slotProps={{ textField: { fullWidth: true } }} />

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="outlined" startIcon={<UploadFileIcon />} onClick={() => fileInputRef.current?.click()} fullWidth>
                        {postFile ? postFile.name : 'Upload PDF/MD'}
                    </Button>
                    <Button variant="outlined" startIcon={<UploadFileIcon />} onClick={() => imageInputRef.current?.click()} fullWidth>
                        {postImage ? postImage.name : 'Upload Image'}
                    </Button>
                </Box>
                <input ref={fileInputRef} type="file" hidden accept=".pdf,.md" onChange={(e) => setPostFile(e.target.files?.[0] || null)} />
                <input ref={imageInputRef} type="file" hidden accept="image/*" onChange={(e) => setPostImage(e.target.files?.[0] || null)} />

                <Button type="submit" variant="contained" startIcon={isLoading ? <CircularProgress size={20} /> : <AddCircleOutlineIcon />} disabled={isLoading}>
                    Create Post
                </Button>
            </Box>
        </Paper>
    );
}

// --- Edit Post Modal ---
    function EditPostDialog({
        open,
        post,
        admins,
        onClose,
        onSubmit,
        isLoading,
    }: {
        open: boolean;
        post: Post | null;
        admins: Admin[];
        onClose: () => void;
        onSubmit: (id: number, formData: FormData) => void;
        isLoading: boolean;
    }) {
        const [edited, setEdited] = useState({
            title: '',
            description: '',
            category: 'NEWS',
            topicNames: '',
            createdAt: null as Dayjs | null,
            authorId: '1',
        });
        const [file, setFile] = useState<File | null>(null);
        const [image, setImage] = useState<File | null>(null);
        const fileRef = useRef<HTMLInputElement>(null);
        const imgRef = useRef<HTMLInputElement>(null);

        // Sync when `post` changes
        useEffect(() => {
            if (post) {
                setEdited({
                    title: post.title,
                    description: post.description || '',
                    category: post.category,
                    topicNames: post.topics.map(t => t.name).join(', '),
                    createdAt: dayjs(post.createdAt),
                    authorId: post.authorId,
                });
                setFile(null);
                setImage(null);
            }
        }, [post]);

        const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setEdited({ ...edited, [e.target.name]: e.target.value });

        const handleSubmit = (e: FormEvent) => {
            e.preventDefault();
            if (!post) return;

            const fd = new FormData();
            Object.entries(edited).forEach(([k, v]) => {
                if (v) fd.append(k, v instanceof dayjs ? v.toISOString() : String(v));
            });
            if (file) fd.append('file', file);
            if (image) fd.append('image', image);

            onSubmit(post.id, fd);
        };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Post</DialogTitle>
            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                margin="dense"
                                name="title"
                                label="Post Title"
                                fullWidth
                                value={edited.title}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                margin="dense"
                                name="description"
                                label="Description"
                                fullWidth
                                multiline
                                rows={3}
                                value={edited.description}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <FormControl fullWidth margin="dense">
                                <InputLabel>Author</InputLabel>
                                <Select
                                    name="authorId"
                                    value={edited.authorId}
                                    onChange={(e) => setEdited({ ...edited, authorId: e.target.value })}
                                >
                                    {admins.map((a) => (
                                        <MenuItem key={a.id} value={a.id}>
                                            {a.name} ({a.email})
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <FormControl fullWidth margin="dense">
                                <InputLabel>Category</InputLabel>
                                <Select
                                    name="category"
                                    value={edited.category}
                                    onChange={(e) => setEdited({ ...edited, category: e.target.value })}
                                >
                                    <MenuItem value="NEWS">News</MenuItem>
                                    <MenuItem value="BLOG">Blog</MenuItem>
                                    <MenuItem value="RESEARCH">Research</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <DatePicker
                                label="Publication Date"
                                value={edited.createdAt}
                                onChange={(d) => setEdited({ ...edited, createdAt: d })}
                                slotProps={{ textField: { fullWidth: true, margin: 'dense' } }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                margin="dense"
                                name="topicNames"
                                label="Topics (comma-separated)"
                                fullWidth
                                value={edited.topicNames}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    variant="outlined"
                                    startIcon={<UploadFileIcon />}
                                    onClick={() => fileRef.current?.click()}
                                    fullWidth
                                >
                                    {file ? file.name : 'Change PDF'}
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={<UploadFileIcon />}
                                    onClick={() => imgRef.current?.click()}
                                    fullWidth
                                >
                                    {image ? image.name : 'Change Image'}
                                </Button>
                            </Box>
                            <input ref={fileRef} type="file" hidden accept=".pdf,.md" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                            <input ref={imgRef} type="file" hidden accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" disabled={isLoading}>
                        Update Post
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}


// --- Post List ---
function PostList({
    posts, topics, searchQuery, setSearchQuery, selectedTopic, setSelectedTopic,
    onEdit, onDelete, isLoading
}: any) {
    const filtered = posts.filter((p: Post) =>
        (p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.description || '').toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedTopic ? p.topics.some((t) => t.name === selectedTopic) : true)
    );

    return (
        <>
            <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 2 }}>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end' }}>
                    <SearchIcon sx={{ mr: 1 }} />
                    <TextField
                        label="Search..."
                        variant="standard"
                        fullWidth
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Box>
                <FormControl sx={{ minWidth: 200 }} size="small">
                    <InputLabel>Filter by Topic</InputLabel>
                    <Select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
                        <MenuItem value=""><em>All</em></MenuItem>
                        {topics.map((t: Topic) => <MenuItem key={t.id} value={t.name}>{t.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </Paper>

            <Grid container spacing={2}>
                {filtered.map((p: Post) => (
                    <Grid key={p.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6">{p.title}</Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>{p.description}</Typography>
                                <Typography variant="caption">By {p.author.name} • {new Date(p.createdAt).toLocaleDateString()}</Typography>
                                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: .5 }}>
                                    {p.topics.map((t) => <Chip key={t.id} label={t.name} size="small" sx={getChipStyle(t.baseColor)} />)}
                                </Box>
                            </CardContent>
                            <CardActions>
                                <IconButton onClick={() => onEdit(p)} disabled={isLoading}><EditIcon /></IconButton>
                                <IconButton color="error" onClick={() => onDelete(p.id)} disabled={isLoading}><DeleteIcon /></IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

// --- Main Page ---
export default function Home() {
    const [activeTab, setActiveTab] = useState<'posts' | 'topics'>('posts');
    const [posts, setPosts] = useState<Post[]>([]);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const allPosts = await Promise.all(['NEWS', 'BLOG', 'RESEARCH'].map(c => fetchJSON(`/api/posts?category=${c}`)));
                setPosts(allPosts.flat());
                setTopics(await fetchJSON('/api/posts/topics'));
                setAdmins(await fetchJSON('/api/admins'));
            } catch (e: any) {
                setError(e.message);
            }
        })();
    }, []);

    const createPost = async (fd: FormData) => {
        setIsLoading(true);
        try {
            await fetch('/api/posts', { method: 'POST', body: fd });
            const all = await Promise.all(['NEWS', 'BLOG', 'RESEARCH'].map(c => fetchJSON(`/api/posts?category=${c}`)));
            setPosts(all.flat());
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const deletePost = async (id: number) => {
        if (!confirm('Delete this post?')) return;
        setIsLoading(true);
        try {
            await fetch(`/api/posts/${id}`, { method: 'DELETE' });
            setPosts(posts.filter(p => p.id !== id));
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const updatePost = async (id: number, fd: FormData) => {
        setIsLoading(true);
        try {
            await fetch(`/api/posts/${id}`, { method: 'PUT', body: fd });
            const all = await Promise.all(['NEWS', 'BLOG', 'RESEARCH'].map(c => fetchJSON(`/api/posts?category=${c}`)));
            setPosts(all.flat());
            setEditOpen(false);
            setSelectedPost(null);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container maxWidth="lg" sx={{ my: 4 }}>
                <Typography variant="h4" align="center">Admin Management</Typography>
                {error && <Alert severity="error">{error}</Alert>}

                <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} centered>
                    <Tab label="Manage Posts" value="posts" />
                    <Tab label="Manage Topics" value="topics" />
                </Tabs>

                {activeTab === 'posts' && (
                    <Grid container spacing={4} sx={{ mt: 2 }}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <PostForm admins={admins} topics={topics} onSubmit={createPost} isLoading={isLoading} />
                        </Grid>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <PostList
                                posts={posts}
                                topics={topics}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                selectedTopic={selectedTopic}
                                setSelectedTopic={setSelectedTopic}
                                onEdit={(p: Post) => { setSelectedPost(p); setEditOpen(true); }}
                                onDelete={deletePost}
                                isLoading={isLoading}
                            />

                            <EditPostDialog
                                open={editOpen}
                                post={selectedPost}
                                admins={admins}
                                onClose={() => { setEditOpen(false); setSelectedPost(null); }}
                                onSubmit={updatePost}
                                isLoading={isLoading}
                            />
                        </Grid>
                    </Grid>
                )}

                {activeTab === 'topics' && <TopicsManager />}
            </Container>
        </LocalizationProvider>
    );
}
