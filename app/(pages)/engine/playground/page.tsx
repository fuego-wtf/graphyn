'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'

const AgentSimulator = dynamic(
	() => import('@/components/agent-simulator').then(mod => mod.AgentSimulator),
	{ 
		ssr: false,
		loading: () => (
			<div className="flex items-center justify-center p-8">
				<Loader2 className="h-8 w-8 animate-spin" />
			</div>
		)
	}
)

export default function PlaygroundPage() {
	return (
		<div className="space-y-8 p-8">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Playground</h1>
				<p className="text-muted-foreground mt-2">Test and experiment with AI agents in a sandbox environment</p>
			</div>
			<Suspense fallback={
				<div className="flex items-center justify-center p-8">
					<Loader2 className="h-8 w-8 animate-spin" />
				</div>
			}>
				<AgentSimulator />
			</Suspense>
		</div>
	)
}