'use client'

import { Sidebar } from "@/components/sidebar"
import dynamic from 'next/dynamic'
import { StoreProvider } from "@/components/providers/store-provider"
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'

const ConversationProvider = dynamic(
	() => import('@/components/engine/conversation-context').then(mod => mod.ConversationProvider),
	{ 
		ssr: false,
		loading: () => (
			<div className="flex items-center justify-center h-full">
				<Loader2 className="h-8 w-8 animate-spin" />
			</div>
		)
	}
)

export default function EngineLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="min-h-screen flex">
			<Sidebar />
			<main className="flex-1">
				<StoreProvider>
					<Suspense fallback={
						<div className="flex items-center justify-center h-full">
							<Loader2 className="h-8 w-8 animate-spin" />
						</div>
					}>
						<ConversationProvider>
							{children}
						</ConversationProvider>
					</Suspense>
				</StoreProvider>
			</main>
		</div>
	)
}

