'use client'
import React, { useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { fonts, colors } from '../../../components/MuiProvider';
import { MailOutlineRounded } from '@mui/icons-material';
import { useTranslations } from 'next-intl';

export default function ResearchHero() {
    const t = useTranslations('ResearchPage');

    // 1. State management for the form and snackbar
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error" | "info" | "warning",
    });

    // 2. The form submission handler from your previous query
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !email.includes("@")) {
            setSnackbar({
                open: true,
                message: t('emailInvalid'),
                severity: "error",
            });
            return;
        }
        setIsSubmitting(true);
        try {
            // --- IMPORTANT: Paste your own Google Script URL here ---
            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbyOuRd6N_U6NIUASC5ib937aZcxOkAcOZbx5VSKqWlsKGzXPNdJXXIfySYfCso6NTmR/exec",
                {
                    method: "POST",
                    body: new URLSearchParams({ email: email }),
                }
            );
            const data = await response.text();
            if (data === "Success") {
                setSnackbar({
                    open: true,
                    message: t('Success'),
                    severity: "success",
                });
                setEmail("");
            } else {
                setSnackbar({
                    open: true,
                    message: t('EmailError'),
                    severity: "error",
                });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setSnackbar({
                open: true,
                message: t('NetworkError'),
                severity: "error",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            gap: { xs: 2, sm: 3 },
            py: { xs: 6, sm: 8, md: 10 },
            paddingBottom: { xs: 4, sm: 6, md: 8 },
            px: { xs: 2, sm: 6, md: 12, lg: 20 },
            alignItems: 'center',
        }}>
            <Box
                sx={{
                    width: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    alignItems: 'center',
                }}>
                <Typography
                    sx={{
                        fontWeight: fonts.weights.bold,
                        fontSize: {
                            xs: fonts.sizes.lg,
                            sm: fonts.sizes.body,
                            md: fonts.sizes.xl,
                            lg: fonts.sizes.h3,
                        },
                        textAlign: 'center',
                        color: colors.neutral._9,
                    }}
                >
                    {t('Title')}
                </Typography>
                <Typography
                    sx={{
                        fontWeight: fonts.weights.regular,
                        fontSize: {
                            xs: '0.95rem',
                            sm: fonts.sizes.md,
                            md: fonts.sizes.lg,
                        },
                        color: colors.neutral._8
                    }}>
                    {t('Subtitle')}
                </Typography>
            </Box>

            {/* 3. The new email subscription form */}
            <Box sx={{ width: "100%", maxWidth: "600px", mx: "auto", p: 2 }}>
                <Box
                    component="form" // This is your form element
                    onSubmit={handleSubmit} // This handler is triggered by Enter key or button click
                    sx={{
                        backgroundColor: colors.neutral._8,
                        borderRadius: "16px",
                        p: { xs: 1, sm: 1.5 },
                        pl: { xs: 2, sm: 3 },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "nowrap",
                        gap: 2,
                        boxShadow: '4px 4px 12px rgba(0, 0, 0, 0.25), -4px -4px 12px rgba(255, 255, 255, 1)',
                    }}
                >
                    <MailOutlineRounded sx={{ color: "white", fontSize: 24, flexShrink: 0 }} />
                    <TextField
                        fullWidth
                        variant="standard"
                        type="email"
                        placeholder={t('EmailInput')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        // The onKeyDown handler has been removed from here
                        disabled={isSubmitting}
                        InputProps={{
                            disableUnderline: true,
                            sx: {
                                color: colors.neutral._0,
                                fontSize: { xs: '0.9rem', sm: '1rem' },
                                backgroundColor: colors.neutral._8,
                                "&:hover": {
                                    backgroundColor: colors.neutral._8,
                                },
                                "&.Mui-focused": {
                                    backgroundColor: colors.neutral._8,
                                },
                            },
                        }}
                        sx={{
                            "& .MuiInputBase-input::placeholder": {
                                color: colors.neutral._3,
                                opacity: 1,
                            },
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{
                            backgroundColor: colors.neutral._0,
                            color: colors.neutral._10,
                            borderRadius: '12px',
                            px: { xs: 2, sm: 3 },
                            py: 1,
                            fontSize: { xs: '0.8rem', sm: '0.9rem' },
                            fontWeight: fonts.weights.regular,
                            textTransform: "none",
                            boxShadow: "none",
                            whiteSpace: 'nowrap',
                            "&:hover": {
                                backgroundColor: "#f5f5f5",
                                boxShadow: "none",
                            },
                            "&.Mui-disabled": {
                                backgroundColor: colors.neutral._3,
                            }
                        }}
                    >
                        {isSubmitting ? <CircularProgress size={24} sx={{ color: 'white' }} /> : t('Subscribe')}
                    </Button>
                </Box>
            </Box>

            {/* 4. Snackbar component for user feedback */}
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}
