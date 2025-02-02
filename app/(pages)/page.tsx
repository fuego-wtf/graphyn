"use client"

import { useState, useEffect } from 'react'
import { Hero } from '@/components/sections/hero'
import { Features } from '@/components/sections/features'
import { UserControl } from '@/components/sections/user-control'
import { Slideshow } from '@/components/sections/slideshow'
import { Navigation } from '@/components/navigation'
import { useAuth } from "@clerk/nextjs"
import { useRouter } from 'next/navigation'
import { routes } from '@/config/routes'
import { brand } from '@/components/brand'

export default function Home() {
	const [showPitchDeck, setShowPitchDeck] = useState(false)
	const { isSignedIn } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (isSignedIn) {
			router.push(routes.engine.overview)
		}
	}, [isSignedIn, router])

	return (
		<div className="relative min-h-screen bg-background">
			<Navigation 
				brand={{
					name: "Graphyn",
					description: "Contextual intelligence SDK for app developers"
				}}
				onPitchDeck={() => setShowPitchDeck(true)} 
			/>
			<div className="pt-14">
				<Hero 
					title="Empower your apps with contextual intelligence"
					description="Graphyn provides a powerful SDK for seamless integration of personalized, context-aware features in your applications"
					actions={{
						primary: "Get started",
						secondary: "How it works"
					}}
				/>
				{showPitchDeck && <Slideshow onClose={() => setShowPitchDeck(false)} />}
				<Features 
					title="Elevate user experiences with intelligent context"
					subtitle="Leverage graph technology and AI to deliver personalized, context-aware interactions at scale"
					items={{
						graphMapping: {
							title: "Graph-based context mapping",
							description: "Create dynamic, interconnected user context graphs. Visualize relationships and patterns in real-time."
						},
						llmDecisions: {
							title: "AI-enhanced personalization",
							description: "Automate content and feature personalization with AI, adhering to user preferences and privacy settings."
						},
						dataControl: {
							title: "Comprehensive data governance",
							description: "Empower users with full visibility and control over their data. Build trust while ensuring compliance."
						}
					}}
				/>
				<UserControl 
					title="Put users in control"
					subtitle="Foster trust by providing complete transparency and control. Navigate user data while respecting privacy regulations."
					controls={{
						viewHistory: {
							title: "Contextual insights",
							description: "Offer users a comprehensive view of their app interactions and preferences.",
							action: "View insights"
						},
						exportData: {
							title: "Data portability",
							description: "Allow users to export their data in developer-friendly formats.",
							action: "Export now"
						},
						deleteData: {
							title: "Data management",
							description: "Enable users to selectively manage or completely remove their data.",
							action: "Manage data"
						}
					}}
				/>
			</div>
		</div>
	)
}
