import * as React from 'react';
import Box from '@mui/material/Box';

// Keyframes remain the same
const rotate = {
    '@keyframes rotate': {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
    },
};

const counterRotate = {
    '@keyframes counter-rotate': {
        from: { transform: 'translateY(calc(var(--orbit-radius) / -2)) rotate(0deg)' },
        to: { transform: 'translateY(calc(var(--orbit-radius) / -2)) rotate(-360deg)' },
    },
};

// Updated data: The `trailLength` property is no longer needed.
const satellitesData = [
    { orbitRadius: '500px', duration: '4s' },
    // { orbitRadius: '300px', duration: '6s' },
    // { orbitRadius: '400px', duration: '9s' },
    { orbitRadius: '1000px', duration: '5s' },
    // { orbitRadius: '650px', duration: '8s' },
    { orbitRadius: '1500px', duration: '4.5s' },
    // { orbitRadius: '950px', duration: '7.5s' },
    { orbitRadius: '2000px', duration: '6s' },
    { orbitRadius: '2500px', duration: '8.5s' },
    // { orbitRadius: '1450px', duration: '6.5s' },
    // { orbitRadius: '2700px', duration: '4s' },
    // { orbitRadius: '2000px', duration: '5s' },
];

export default function AnimatedBackground() {
    return (
        <Box
            sx={{
                ...rotate,
                ...counterRotate,
                // --- Styles to make it a background ---
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 0, // Behind foreground content
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                // --- Animation styles ---
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // '& .big-circle': {
                //     width: '100px', height: '100px', backgroundColor: 'black', borderRadius: '50%',
                //     position: 'absolute', zIndex: 10, boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
                // },
                '& .orbit': {
                    position: 'absolute', display: 'grid', placeItems: 'center',
                    width: 'var(--orbit-radius)', height: 'var(--orbit-radius)',
                    animation: 'rotate var(--orbit-duration) linear infinite',
                    border: '4px solid #0081E370', borderRadius: '50%',
                    boxShadow: '0 0 40px #0081E370',
                },
                '& .satellite': {
                    gridArea: '1 / 1', width: 'var(--satellite-size, 20px)', height: 'var(--satellite-size, 20px)',
                    background: '#0081E3', 
                    borderRadius: '50%',
                    transform: 'translateY(calc(var(--orbit-radius) / -2))',
                    animation: 'counter-rotate var(--orbit-duration) linear infinite',
                },
            }}
        >
            <Box className="big-circle" />
            {satellitesData.map((sat, index) => (
                <Box
                    key={index}
                    className="orbit"
                    style={{ '--orbit-radius': sat.orbitRadius, '--orbit-duration': sat.duration } as React.CSSProperties}
                >
                    <Box className="satellite" />
                </Box>
            ))}
        </Box>
    );
}
