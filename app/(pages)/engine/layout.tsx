'use client'

import { Sidebar } from "@/components/sidebar"
import { ConversationProvider } from "@/components/engine/conversation-context"

export default function EngineLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="min-h-screen flex">
			<Sidebar />
			<main className="flex-1">
				<ConversationProvider>
					{children}
				</ConversationProvider>
			</main>
		</div>
	)
}

