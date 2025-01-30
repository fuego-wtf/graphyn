"use client"

import { Sidebar } from "@/components/ui/sidebar"
import { Brain, Code, History, Settings, Star } from "lucide-react"
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs"
import { routes } from '@/config/routes'
import { useRouter } from 'next/navigation'

export default function EngineLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const router = useRouter()
	
	const sidebarItems = [
		{
			title: 'Playground',
			href: routes.engine.playground,
			icon: <Code className="h-5 w-5" />
		},
		{
			title: 'History',
			href: routes.engine.history,
			icon: <History className="h-5 w-5" />
		},
		{
			title: 'Starred',
			href: routes.engine.starred,
			icon: <Star className="h-5 w-5" />
		},
		{
			title: 'Agents',
			href: routes.engine.agents,
			icon: <Brain className="h-5 w-5" />
		},
		{
			title: 'Settings',
			href: routes.engine.settings,
			icon: <Settings className="h-5 w-5" />
		}
	]

	return (
		<>
			<SignedIn>
				<div className="flex h-[calc(100vh-4rem)]">
					<Sidebar items={sidebarItems} className="w-72 shrink-0">
						<></>
					</Sidebar>
					<main className="flex-1 overflow-auto">
						<div className="container max-w-screen-2xl h-full py-8">
							{children}
						</div>
					</main>
				</div>
			</SignedIn>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
		</>
	)
}