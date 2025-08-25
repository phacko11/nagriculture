'use client'

import { useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import { neumorphism } from '@/app/components/MuiProvider'

// ---- Particle Network Logic (converted from your script) ----
class Particle {
    network: any
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    particleColor: string
    radius: number
    opacity: number
    x: number
    y: number
    velocity: { x: number; y: number }

    constructor(parent: any, x?: number, y?: number) {
        this.network = parent
        this.canvas = parent.canvas
        this.ctx = parent.ctx
        this.particleColor = parent.options.particleColors[
            Math.floor(Math.random() * parent.options.particleColors.length)
        ]
        this.radius = Math.random() * (2.5 - 1.5) + 1.5
        this.opacity = 0
        this.x = x ?? Math.random() * this.canvas.width
        this.y = y ?? Math.random() * this.canvas.height
        this.velocity = {
            x: (Math.random() - 0.5) * parent.options.velocity,
            y: (Math.random() - 0.5) * parent.options.velocity,
        }
    }

    update() {
        this.opacity = Math.min(this.opacity + 0.01, 1)
        if (this.x > this.canvas.width + 100 || this.x < -100) this.velocity.x *= -1
        if (this.y > this.canvas.height + 100 || this.y < -100) this.velocity.y *= -1
        this.x += this.velocity.x
        this.y += this.velocity.y
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = this.particleColor
        this.ctx.globalAlpha = this.opacity
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        this.ctx.fill()
    }
}

class ParticleNetwork {
    options: any
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    particles: Particle[] = []
    animationFrame: number = 0

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.options = {
            velocity: 1,
            density: 15000,
            netLineDistance: 200,
            netLineColor: '#929292',
            particleColors: ['#aaa'],
        }
        this.canvas = canvas
        this.ctx = ctx
        this.init()
    }

    init() {
        this.createParticles()
        this.animationFrame = requestAnimationFrame(this.update.bind(this))
    }

    createParticles() {
        this.particles = []
        const quantity = (this.canvas.width * this.canvas.height) / this.options.density
        for (let i = 0; i < quantity; i++) {
            this.particles.push(new Particle(this))
        }
    }

    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.globalAlpha = 1

        // Draw lines
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = this.particles.length - 1; j > i; j--) {
                const p1 = this.particles[i]
                const p2 = this.particles[j]
                const dx = p1.x - p2.x
                const dy = p1.y - p2.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist > this.options.netLineDistance) continue
                this.ctx.beginPath()
                this.ctx.strokeStyle = this.options.netLineColor
                this.ctx.globalAlpha =
                    ((this.options.netLineDistance - dist) / this.options.netLineDistance) *
                    p1.opacity *
                    p2.opacity
                this.ctx.lineWidth = 0.7
                this.ctx.moveTo(p1.x, p1.y)
                this.ctx.lineTo(p2.x, p2.y)
                this.ctx.stroke()
            }
        }

        // Draw particles
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update()
            this.particles[i].draw()
        }

        this.animationFrame = requestAnimationFrame(this.update.bind(this))
    }
}

// ---- React Component ----
export default function ParticleNetworkAnimation() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const network = new ParticleNetwork(canvas, ctx)

        return () => {
            cancelAnimationFrame(network.animationFrame)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <Box
            className="particle-network-animation"
            sx={{
                position: 'absolute',
                inset: 0,
                height: '100%',
                width: '250%',
                backgroundColor: neumorphism.background,
                zIndex: 0,
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.2,
                },
            }}
        >
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
        </Box>
    )
}
