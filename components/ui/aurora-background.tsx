"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

export function AuroraBackground({
	className,
	containerClassName,
}: {
	className?: string
	containerClassName?: string
}) {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext("2d")
		if (!ctx) return

		let animationFrameId: number
		let hue = 0

		const setCanvasSize = () => {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
		}

		const draw = () => {
			// Clear with a very subtle fade
			ctx.fillStyle = `rgba(0, 0, 0, 0.01)`
			ctx.fillRect(0, 0, canvas.width, canvas.height)

			// Create aurora effect
			const centerX = canvas.width / 2
			const centerY = canvas.height / 2
			const time = Date.now() / 2000

			for (let i = 0; i < 3; i++) {
				const radius = 150 + Math.sin(time + i) * 100
				const x = centerX + Math.cos(time * 0.5 + i * Math.PI / 1.5) * radius
				const y = centerY + Math.sin(time * 0.5 + i * Math.PI / 1.5) * radius * 0.5

				const gradient = ctx.createRadialGradient(x, y, 0, x, y, 300)

				// Use more ethereal colors
				const hueOffset = i * 30
				const baseHue = (hue + hueOffset) % 360
				gradient.addColorStop(0, `hsla(${baseHue}, 100%, 60%, 0.2)`)
				gradient.addColorStop(0.5, `hsla(${baseHue}, 100%, 50%, 0.1)`)
				gradient.addColorStop(1, 'transparent')

				ctx.fillStyle = gradient
				ctx.beginPath()
				ctx.arc(x, y, 300, 0, Math.PI * 2)
				ctx.fill()
			}

			hue = (hue + 0.05) % 360
			animationFrameId = requestAnimationFrame(draw)
		}

		setCanvasSize()
		window.addEventListener("resize", setCanvasSize)
		draw()

		return () => {
			window.removeEventListener("resize", setCanvasSize)
			cancelAnimationFrame(animationFrameId)
		}
	}, [])

	return (
		<div className={cn("fixed inset-0 -z-10", containerClassName)}>
			<canvas
				ref={canvasRef}
				className={cn("h-full w-full opacity-40", className)}
			/>
		</div>
	)
}