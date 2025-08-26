'use client';
import { AppBar, Toolbar, Typography, Box, Button, Menu, MenuItem, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { colors, fonts } from './MuiProvider'; // Assuming this path is correct
import { motion } from "framer-motion";


// 1. Import the correct hooks from next-intl's client library
import { usePathname, useRouter } from '../../i18n/navigation';
import { useLocale } from 'next-intl';


import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { LanguageRounded } from '@mui/icons-material';
import { useTranslations } from 'next-intl';


export default function HeaderBar() {
    const t = useTranslations('navigate');
    // 2. Get the current locale ('en', 'vi', etc.) and router instance
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();


    // State for the language menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    // --- START: State and handlers for the mobile navigation menu ---
    const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
    const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);


    const handleMobileMenuOpen = (event) => {
        setMobileMenuAnchorEl(event.currentTarget);
    };


    const handleMobileMenuClose = () => {
        setMobileMenuAnchorEl(null);
    };
    // --- END: State and handlers for the mobile navigation menu ---


    // State for the scroll-triggered animation
    const [isScrolled, setIsScrolled] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    // --- Handlers for the language menu ---
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    // 3. This function changes the locale while preserving the current path
    const handleLanguageChange = (newLocale) => {
        router.replace(pathname, { locale: newLocale });
        handleMenuClose();
    };

    const navItems = ['Home', 'About', 'Research', 'Blog', 'News', 'FAQs', 'Pricing'];


    return (
        <AppBar
            position="fixed"
            elevation={isScrolled ? 6 : 0}
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
                color: '#000',
                px: isScrolled ? { xs: 1, sm: 2, md: 3 } : { xs: 2, sm: 6, md: 10 },
                borderRadius: isScrolled ? 5 : 0,
                top: isScrolled ? { xs: 8, md: 20 } : 0,
                left: isScrolled ? { md: '50%' } : 0,
                // transform: isScrolled ? { md: 'translateX(-50%) scale(0.97)' } : 'none',
                transform: isScrolled ? { md: 'translateX(-50%)' } : 'none',
                boxShadow: isScrolled ? '0 8px 32px rgba(0,0,0,0.10)' : 'none',

                width: {
                    xs: '100%',
                    sm: isScrolled ? 'calc(100% - 16px)' : '100%',
                    md: isScrolled ? 'calc(100% - 200px)' : '100%',
                    lg: isScrolled ? 'calc(100% - 320px)' : '100%',
                    xl: isScrolled ? 'calc(100% - 320px)' : '100%',
                },
                // maxWidth: isScrolled ? 1000 : '100%',
                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
            }}
        >
            <Toolbar disableGutters sx={{ width: '100%', minHeight: { xs: 48, sm: 56 }, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" className="flex items-center">
                    <img src="/assets/logo-light.svg" alt="Logo" style={{ width: 'auto', maxHeight: 22, minHeight: 14, maxWidth: 120, objectFit: 'contain' }} />
                </Link>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                    {/* Desktop Navigation Links */}
                    <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex' }, gap: { sm: 1, md: 2 }, mx: 2, }}>
                        {navItems.map((text) => {
                            const path = text === 'Home' ? '/' : `/${text.toLowerCase()}`;
                            const isActive = pathname === path;
                            return (
                                <Link key={text} href={path} style={{ textDecoration: "none" }}>
                                    <Box
                                        sx={{
                                            position: "relative",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: 2,
                                            cursor: "pointer",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {/* Glassmorphism active background */}
                                        {isActive && (
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    inset: 0,
                                                    borderRadius: 2,
                                                    background: "rgba(255, 255, 255, 0.2)",
                                                    backdropFilter: "blur(12px)",
                                                    WebkitBackdropFilter: "blur(12px)", // Safari
                                                    border: "1px solid rgba(255,255,255,0.3)",
                                                    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                                                    zIndex: 0,
                                                }}
                                            />
                                        )}

                                        {/* Label */}
                                        <Typography
                                            sx={{
                                                position: "relative",
                                                zIndex: 1,
                                                fontSize: fonts.sizes.sm,
                                                fontWeight: 500,
                                                textTransform: "none",
                                                color: isActive ? colors.primary._5 : colors.primary._0,
                                            }}
                                        >
                                            {t(text)}
                                        </Typography>
                                    </Box>
                                </Link>

                            );
                        })}
                    </Box>


                    {/* 4. The Language Switcher Button and Menu */}
                    <Box>
                        <Button
                            id="language-button"
                            onClick={handleMenuOpen}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                px: 1.5,
                                py: 0.5,
                                borderRadius: '999px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                fontSize: { xs: '12px', sm: '13px' },
                                letterSpacing: '0.5px',
                                color: colors.primary._0,
                                background: 'rgba(0,255,255,0.05)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(0,0,0,0.1)',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    background: 'rgba(0,255,255,0.1)',
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                },
                            }}
                        >
                            <LanguageRounded sx={{ fontSize: 18 }} />
                            {locale}
                        </Button>


                        <Menu
                            id="language-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleMenuClose}
                            disableScrollLock
                            PaperProps={{
                                sx: {
                                    borderRadius: 2,
                                    mt: 1,
                                    minWidth: 140,
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                                },
                            }}
                        >
                            <MenuItem onClick={() => handleLanguageChange('en')} selected={locale === 'en'} sx={{ fontWeight: locale === 'en' ? 600 : 400 }}>
                                English
                            </MenuItem>
                            <MenuItem onClick={() => handleLanguageChange('vi')} selected={locale === 'vi'} sx={{ fontWeight: locale === 'vi' ? 600 : 400 }}>
                                Tiếng Việt
                            </MenuItem>
                        </Menu>
                    </Box>


                    {/* --- START: Hamburger Menu for Mobile View --- */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="open navigation menu"
                            aria-controls="mobile-menu"
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="mobile-menu"
                            anchorEl={mobileMenuAnchorEl}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={isMobileMenuOpen}
                            onClose={handleMobileMenuClose}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                '& .MuiPaper-root': {
                                    width: '100%',
                                    maxWidth: 250,
                                    mt: 6,
                                    mr: 1,
                                    borderRadius: 2
                                },
                            }}
                        >
                            {navItems.map((text) => (
                                <MenuItem key={text} onClick={handleMobileMenuClose}>
                                    <Link href={`/${text.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                        <Typography textAlign="left">{t(text)}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/* --- END: Hamburger Menu for Mobile View --- */}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
