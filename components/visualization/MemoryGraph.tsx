"use client"

import { useEffect, useRef } from 'react'
import type { Memory } from '@/types/memory'

interface MemoryGraphProps {
	memories: Memory[]
	onNodeClick?: (memoryId: string) => void
}

export function MemoryGraph({ memories, onNodeClick }: MemoryGraphProps) {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!containerRef.current || memories.length === 0) return

		// Basic visualization - can be enhanced later
		const container = containerRef.current
		container.innerHTML = `
			<div class="p-4 text-center">
				${memories.length} memories visualized
			</div>
		`
	}, [memories])

	return (
		<div 
			ref={containerRef} 
			className="w-full h-[500px] border rounded-lg bg-background"
		/>
	)
}