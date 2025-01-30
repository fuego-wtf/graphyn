'use client'

import { useEffect, useRef, useState } from 'react'
import { useConversation } from "./conversation-context"

export function ContextMap() {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const { segments, memories } = useConversation()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		// Set canvas size
		canvas.width = canvas.offsetWidth
		canvas.height = canvas.offsetHeight

		// Clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		// Draw context map
		const centerX = canvas.width / 2
		const centerY = canvas.height / 2
		const radius = Math.min(canvas.width, canvas.height) / 4

		// Draw central node
		ctx.beginPath()
		ctx.arc(centerX, centerY, 20, 0, Math.PI * 2)
		ctx.fillStyle = '#7c3aed'
		ctx.fill()

		// Draw memory nodes
		memories.forEach((memory, i) => {
			const angle = (i / memories.length) * Math.PI * 2
			const x = centerX + Math.cos(angle) * radius
			const y = centerY + Math.sin(angle) * radius

			// Draw connection line
			ctx.beginPath()
			ctx.moveTo(centerX, centerY)
			ctx.lineTo(x, y)
			ctx.strokeStyle = '#e5e7eb'
			ctx.stroke()

			// Draw memory node
			ctx.beginPath()
			ctx.arc(x, y, 10, 0, Math.PI * 2)
			ctx.fillStyle = '#3b82f6'
			ctx.fill()

			// Draw memory text
			ctx.fillStyle = '#1f2937'
			ctx.font = '12px Arial'
			ctx.textAlign = 'center'
			ctx.fillText(memory.slice(0, 15) + (memory.length > 15 ? '...' : ''), x, y + 25)
		})

		setIsLoading(false)
	}, [segments, memories])

	return (
		<div className="h-full w-full bg-background rounded-lg p-4 relative">
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
					<div className="h-16 w-16 border-t-4 border-blue-500 rounded-full animate-spin" />
				</div>
			)}
			<canvas 
				ref={canvasRef} 
				className="w-full h-full"
				style={{ maxHeight: 'calc(100vh - 200px)' }}
			/>
		</div>
	)
}