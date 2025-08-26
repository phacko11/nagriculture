import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { ReactNode } from 'react'
import '@fontsource/be-vietnam-pro/100.css'
import '@fontsource/be-vietnam-pro/200.css'
import '@fontsource/be-vietnam-pro/300.css'
import '@fontsource/be-vietnam-pro/400.css'
import '@fontsource/be-vietnam-pro/400-italic.css'
import '@fontsource/be-vietnam-pro/500.css'
import '@fontsource/be-vietnam-pro/600.css'
import '@fontsource/be-vietnam-pro/700.css'
import '@fontsource/be-vietnam-pro/800.css'
import '@fontsource/be-vietnam-pro/900.css'
import { X } from '@mui/icons-material'

export const beVietnamProFont = "'Be Vietnam Pro', sans-serif"

let theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    palette: {
        primary: {
            main: '#00008C',
            light: '#ffffff'

        },
        secondary: {
            main: '#00FFFF',
        },
    },
    typography: {
        fontFamily: beVietnamProFont,
    },

})
export const neumorphism = {
    layoutX: { xs: 2, sm: 6, md: 12, lg: 20 },
    card: '#fafafc',
    background: '#f5f5f7',
    hover: '4px 4px 6px rgba(0, 0, 0, 0.1), -4px -4px 6px rgba(255, 255, 255, 1), inset 0 0 0 1px #eaeaeaff',
    outline: '0 0 1px rgba(0, 0, 0, 0.25)',
    upperbackground: '0px 4px 6px rgba(255, 255, 255, 0.5), 0px -4px 6px rgba(255, 255, 255, 0.5)',
    // upperbackground: '',
}   
export const HoverBackground = {
    background: `${neumorphism.card}88`, // or just neumorphism.card50 if it's a variable
    backdropFilter: 'blur(2px)',
}
export const colors = {
    neutral: {
        _10: '#000000',
        _9: '#1A1A1A',
        _8: '#333333',
        _7: '#4D4D4D',
        _6: '#666666',
        _5: '#7F7F7F',
        _4: '#999999',
        _3: '#B3B3B3',
        _2: '#CCCCCC',
        _1: '#E6E6E6',
        _0: '#FFFFFF',
    },
    primary: {
        _10: '#00FFFF',
        _9: '#00E6F4',
        _8: '#00CCE8',
        _7: '#00B3DD',
        _6: '#009AD1',
        _5: '#007FC5',
        _4: '#0066BA',
        _3: '#004DAF',
        _2: '#0034A3',
        _1: '#001A98',
        _0: '#00008C',
    },
    secondary: {
        _10: '#8651FF',
        _5: '#4329C5',
        _2: '#3C31C5'
    }
}

export const fonts = {
    beVietnam: beVietnamProFont,
    weights: {
        light: 300,
        regular: 400,
        medium: 500,
        semiBold: 600,
        bold: 700,
        extraBold: 800,
        black: 900,
    },
    sizes: {
        xs: '10px',
        sm: '14px',
        md: '18px',
        lg: '24px',
        body: '32px',
        xl: '43px',
        h1: '101px',
        h2: '76px',
        h3: '57px',
    },
    neutral: {
        _10: '#000000',
        _9: '#1A1A1A',
        _8: '#333333',
        _7: '#4D4D4D',
        _6: '#666666',
        _5: '#7F7F7F',
        _4: '#999999',
        _3: '#B3B3B3',
        _2: '#CCCCCC',
        _1: '#E6E6E6',
        _0: '#FFFFFF',
    },
}
export default function MuiProvider({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
