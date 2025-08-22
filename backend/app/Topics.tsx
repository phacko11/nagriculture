import React, { useState, useEffect } from 'react';

// MUI Core Components
import {
    Container,
    Typography,
    Box,
    Paper,
    TextField,
    Button,
    List,
    ListItem,
    IconButton,
    Chip,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    CircularProgress,
} from '@mui/material';

// MUI Icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// --- Main Component ---
const TopicsManager = () => {
    // State management remains the same
    const [topics, setTopics] = useState([]);
    const [newTopic, setNewTopic] = useState({ name: '', baseColor: '#cccccc' });
    const [editingTopic, setEditingTopic] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch all topics when the component mounts
    useEffect(() => {
        fetchTopics();
    }, []);

    // --- API Handlers (No changes to logic) ---

    const fetchTopics = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/posts/topics');
            if (!response.ok) throw new Error('Failed to fetch topics');
            const data = await response.json();
            setTopics(data);
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateTopic = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('/api/posts/topics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTopic),
            });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Failed to create topic');
            }
            const createdTopic = await response.json();
            setTopics([...topics, createdTopic]);
            setNewTopic({ name: '', baseColor: '#cccccc' });
        } catch (error) {
            console.error('Create error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateTopic = async (e) => {
        e.preventDefault();
        if (!editingTopic) return;
        setIsLoading(true);
        try {
            const response = await fetch(`/api/posts/topics/${editingTopic.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: editingTopic.name,
                    baseColor: editingTopic.baseColor,
                }),
            });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Failed to update topic');
            }
            const updatedTopic = await response.json();
            setTopics(topics.map(t => (t.id === updatedTopic.id ? updatedTopic : t)));
            closeEditModal();
        } catch (error) {
            console.error('Update error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteTopic = async (topicId) => {
        if (!window.confirm('Are you sure you want to delete this topic?')) return;
        setIsLoading(true);
        try {
            const response = await fetch(`/api/posts/topics/${topicId}`, {
                method: 'DELETE',
            });
            if (response.status !== 204) {
                const err = await response.json();
                throw new Error(err.error || 'Failed to delete topic');
            }
            setTopics(topics.filter(t => t.id !== topicId));
        } catch (error) {
            console.error('Delete error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // --- UI Event Handlers ---

    const openEditModal = (topic) => {
        setEditingTopic({ ...topic });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        if (isLoading) return; // Prevent closing while saving
        setIsEditModalOpen(false);
        setEditingTopic(null);
    };

    // --- Style Helper for Chips ---
    const getChipStyle = (color) => ({
        backgroundColor: `${color}20`,
        color: color,
        fontWeight: 500
    });

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Topics Management
            </Typography>

            <Paper sx={{ p: 3, mb: 4 }} elevation={2}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Create New Topic
                </Typography>
                <Box component="form" onSubmit={handleCreateTopic}>
                    <TextField
                        label="Topic Name"
                        variant="outlined"
                        fullWidth
                        required
                        value={newTopic.name}
                        onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
                        disabled={isLoading}
                        sx={{ mb: 2 }}
                    />
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography>Color:</Typography>
                        {/* MUI does not have a native color picker, so we style the default one */}
                        <input
                            type="color"
                            value={newTopic.baseColor}
                            onChange={(e) => setNewTopic({ ...newTopic, baseColor: e.target.value })}
                            disabled={isLoading}
                            style={{ border: 'none', width: '40px', height: '40px', cursor: 'pointer', background: 'none' }}
                        />
                        <Chip
                            label={newTopic.name || 'Preview'}
                            sx={getChipStyle(newTopic.baseColor)}
                        />
                    </Stack>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        sx={{ mt: 2 }}
                        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        {isLoading ? 'Creating...' : 'Create Topic'}
                    </Button>
                </Box>
            </Paper>

            <Paper sx={{ p: 3 }} elevation={2}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Existing Topics
                </Typography>

                {/* 1. Replaced <List> with <Grid container> for a multi-column layout. */}
                {/* The `spacing` prop adds gutters between the items. */}
                <Grid container spacing={2}>
                    {topics.map((topic) => (
                        // 2. Each topic is now a <Grid item> with responsive column spans.
                        // It will be 4 columns on large screens, 3 on medium, 2 on small, and 1 on mobile.
                        <Grid key={topic.id} size={{ xs: 12, sm: 6, md: 4}}>
                            <Paper
                                variant="outlined"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    px: 2,
                                }}
                            >
                                {/* Group the icon and chip together for a better layout */}
                                <Box
                                    sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
                                    onClick={() => openEditModal(topic)}
                                >
                                    <EditIcon fontSize="small" color="action" />
                                    <Chip
                                        label={topic.name}
                                        sx={{ ...getChipStyle(topic.baseColor) }}
                                        size="small"
                                    />
                                </Box>

                                {/* 3. Styled the delete button with `color="error"` to make it red. */}
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => handleDeleteTopic(topic.id)}
                                    disabled={isLoading}
                                    color="error"
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: (theme) => theme.palette.error.main,
                                            color: (theme) => theme.palette.common.white
                                        }
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            {/* Edit Topic Dialog (Modal) */}
            <Dialog open={isEditModalOpen} onClose={closeEditModal} fullWidth maxWidth="sm">
                <Box component="form" onSubmit={handleUpdateTopic}>
                    <DialogTitle>Edit Topic</DialogTitle>
                    <DialogContent>
                        {editingTopic && (
                            <Stack spacing={3} sx={{ mt: 2 }}>
                                <TextField
                                    label="Topic Name"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={editingTopic.name}
                                    onChange={(e) => setEditingTopic({ ...editingTopic, name: e.target.value })}
                                />
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Typography>Color:</Typography>
                                    <input
                                        type="color"
                                        value={editingTopic.baseColor}
                                        onChange={(e) => setEditingTopic({ ...editingTopic, baseColor: e.target.value })}
                                        style={{ border: 'none', width: '40px', height: '40px', cursor: 'pointer', background: 'none' }}
                                    />
                                    <Chip
                                        label={editingTopic.name || 'Preview'}
                                        sx={getChipStyle(editingTopic.baseColor)}
                                    />
                                </Stack>
                            </Stack>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeEditModal} color="secondary" disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isLoading}
                            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                        >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Container>
    );
};

export default TopicsManager;