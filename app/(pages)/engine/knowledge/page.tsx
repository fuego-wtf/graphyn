'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'

const MemoryList = dynamic(
	() => import('@/components/memory-list').then(mod => mod.MemoryList),
	{ 
		ssr: false,
		loading: () => (
			<div className="flex items-center justify-center p-8">
				<Loader2 className="h-8 w-8 animate-spin" />
			</div>
		)
	}
)

export default function KnowledgePage() {
	return (
		<div className="space-y-8 p-8">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
				<p className="text-muted-foreground mt-2">Manage and explore agent memories and knowledge graphs</p>
			</div>
			<div className="rounded-lg border bg-card">
				<Suspense fallback={
					<div className="flex items-center justify-center p-8">
						<Loader2 className="h-8 w-8 animate-spin" />
					</div>
				}>
					<MemoryList />
				</Suspense>
			</div>
		</div>
	)
}