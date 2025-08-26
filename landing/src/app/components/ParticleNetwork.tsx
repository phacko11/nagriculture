"use client";

import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { neumorphism } from "./MuiProvider";

const ParticleNetwork = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;

        const container = containerRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d")!;

        const options = {
            velocity: 1,
            density: 30000,
            netLineDistance: 150,
            netLineColor: "#98a9bbff",
            particleColors: ["#93a7c6ff"],
        };

        let particles: Particle[] = [];
        let animationFrame: number;

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
            opacity: number;
            color: string;

            constructor(x?: number, y?: number) {
                this.x = x ?? Math.random() * canvas.width;
                this.y = y ?? Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * options.velocity;
                this.vy = (Math.random() - 0.5) * options.velocity;
                this.radius = Math.random() * 1 + 1.5;
                this.opacity = 0;
                this.color =
                    options.particleColors[
                    Math.floor(Math.random() * options.particleColors.length)
                    ];
            }

            update() {
                this.opacity = Math.min(1, this.opacity + 0.01);
                if (this.x > canvas.width + 100 || this.x < -100) this.vx *= -1;
                if (this.y > canvas.height + 100 || this.y < -100) this.vy *= -1;
                this.x += this.vx;
                this.y += this.vy;
            }

            draw() {
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const qty = (canvas.width * canvas.height) / options.density;
            for (let i = 0; i < qty; i++) {
                particles.push(new Particle());
            }
        };

        const drawConnections = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < options.netLineDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = options.netLineColor;
                        ctx.globalAlpha =
                            ((options.netLineDistance - dist) / options.netLineDistance) *
                            p1.opacity *
                            p2.opacity;
                        ctx.lineWidth = 0.7;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.update();
                p.draw();
            });
            drawConnections();
            animationFrame = requestAnimationFrame(animate);
        };

        const resize = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
            initParticles();
        };

        resize();
        window.addEventListener("resize", resize);
        animate();

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <Box
            ref={containerRef}
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: "100vh",
                backgroundColor: neumorphism.background,
                overflow: "hidden",
                zIndex: -1,
            }}
        >
            {/* Glow layers */}
            <Box
                className="glow glow-1"
                sx={{
                    zIndex: -1,
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    width: "150vw",
                    height: "150vh",
                    marginTop: "-75vh",
                    marginLeft: "-75vw",
                    backgroundImage:
                        "radial-gradient(circle closest-side, rgba(255, 255, 255, 0.025), transparent)",
                    animation: "glow-1-move 25s linear infinite both",
                }}
            />
            <Box
                className="glow glow-2"
                sx={{
                    zIndex: -1,
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    width: "100vw",
                    height: "100vh",
                    marginTop: "-50vh",
                    marginLeft: "-50vw",
                    backgroundImage:
                        "radial-gradient(circle closest-side, rgba(255, 255, 255, 0.025), transparent)",
                    animation: "glow-2-move 25s linear 8.3s infinite both",
                }}
            />
            <Box
                className="glow glow-3"
                sx={{
                    zIndex: -1,
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    width: "120vw",
                    height: "120vh",
                    marginTop: "-60vh",
                    marginLeft: "-60vw",
                    backgroundImage:
                        "radial-gradient(circle closest-side, rgba(255, 255, 255, 0.025), transparent)",
                    animation: "glow-3-move 25s linear 16.6s infinite both",
                }}
            />

            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                }}
            />

            {/* Keyframes */}
            <style>{`
        @keyframes glow-1-move {
          from { transform: translate(-100%, 100%); }
          to { transform: translate(100%, -100%); }
        }
        @keyframes glow-2-move {
          from { transform: translate(-100%, 0%); }
          to { transform: translate(100%, 100%); }
        }
        @keyframes glow-3-move {
          from { transform: translate(100%, 100%); }
          to { transform: translate(0%, -100%); }
        }
      `}</style>
        </Box>
    );
};

export default ParticleNetwork;
