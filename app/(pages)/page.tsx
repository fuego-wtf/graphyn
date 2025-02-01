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
			<Navigation onPitchDeck={() => setShowPitchDeck(true)} />
			<div className="pt-14">
				<Hero />
				{showPitchDeck && <Slideshow onClose={() => setShowPitchDeck(false)} />}
				<Features />
				<UserControl />
			</div>
		</div>
	)
}
