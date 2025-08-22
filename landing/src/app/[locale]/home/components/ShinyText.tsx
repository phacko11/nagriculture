"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import Typography from "@mui/material/Typography";

interface MUIShinyTextProps {
    children: React.ReactNode;
    disabled?: boolean;
    speed?: number;
    intensity?: number;
    direction?: "left-to-right" | "right-to-left" | "top-to-bottom" | "bottom-to-top";
    shineWidth?: number;
    delay?: number;
    repeat?: number | "infinite";
    gradientType?: "linear" | "radial";
}

const directionConfig = {
    "left-to-right": {
        backgroundPosition: ["100% 0%", "-100% 0%"],
        backgroundSize: "200% 100%",
    },
    "right-to-left": {
        backgroundPosition: ["-100% 0%", "100% 0%"],
        backgroundSize: "200% 100%",
    },
    "top-to-bottom": {
        backgroundPosition: ["0% 100%", "0% -100%"],
        backgroundSize: "100% 200%",
    },
    "bottom-to-top": {
        backgroundPosition: ["0% -100%", "0% 100%"],
        backgroundSize: "100% 200%",
    },
};

export default function MUIShinyText({
    children,
    disabled = false,
    speed = 3,
    intensity = 1,
    direction = "left-to-right",
    shineWidth = 20,
    delay = 0,
    repeat = "infinite",
    gradientType = "linear",
}: MUIShinyTextProps) {
    const config = directionConfig[direction];

    const gradientDirection =
        direction === "left-to-right" || direction === "right-to-left"
            ? "90deg"
            : direction === "top-to-bottom"
                ? "180deg"
                : "0deg";

    // Fixed font color, weight, and size
    const baseColor = "#353535ff";
    const shineColor = "#0077ffff";

    const createGradient = () => {
        const transparentStartPos = Math.max(0, 50 - shineWidth / 2);
        const transparentEndPos = Math.min(100, 50 + shineWidth / 2);

        const shineStart = `${shineColor} ${transparentStartPos}%`;
        const shineEnd = `${shineColor} ${transparentEndPos}%`;

        return gradientType === "linear"
            ? `linear-gradient(${gradientDirection}, ${baseColor}, transparent ${transparentStartPos - 5}%, ${shineStart}, ${shineEnd}, transparent ${transparentEndPos + 5}%, ${baseColor})`
            : `radial-gradient(ellipse at center, ${shineColor} ${intensity * 100}%, transparent)`;
    };

    const animationVariants: Variants = {
        initial: {
            backgroundPosition: config.backgroundPosition[0],
        },
        animate: disabled
            ? {
                backgroundPosition: config.backgroundPosition[0],
                transition: { duration: 0, delay: 0, repeat: 0, ease: "linear" },
            }
            : {
                backgroundPosition: config.backgroundPosition[1],
                transition: {
                    duration: speed,
                    delay,
                    repeat: typeof repeat === "number" ? repeat : Infinity,
                    ease: "linear",
                },
            },
    };

    if (disabled) {
        return (
            <Typography
                sx={{
                    fontSize: "1.5rem", // fixed font size
                    fontWeight: 700, // fixed weight
                    color: baseColor, // fixed color
                }}
            >
                {children}
            </Typography>
        );
    }

    return (
        <Typography
            component={motion.span}
            sx={{
                fontSize: "1.5rem", // fixed font size
                fontWeight: 700, // fixed weight
                backgroundImage: createGradient(),
                backgroundSize: config.backgroundSize,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                opacity: intensity,
                display: "inline-block",
            }}
            variants={animationVariants}
            initial="initial"
            animate="animate"
        >
            {children}
        </Typography>
    );
}
