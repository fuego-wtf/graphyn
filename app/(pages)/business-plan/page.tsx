"use client"

import { BusinessPlanSlideshow } from "@/components/business-plan/slideshow"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from 'next/link'
import { routes } from "@/config/routes"

export default function BusinessPlanPage() {
	return (
		<div className="fixed inset-0 bg-background overflow-hidden flex flex-col">
			{/* Navigation */}
			<nav className="flex-none z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
				<div className="container flex h-14 items-center justify-between">
					<Link href="/" className="font-bold text-lg">
						Graphyn
					</Link>
					<div className="flex items-center gap-4">
						<Link href="/">
							<Button 
								variant="ghost" 
								className="gap-2 transition-colors hover:bg-primary/10"
							>
								<ArrowLeft className="h-4 w-4" /> Back to Home
							</Button>
						</Link>
					</div>
				</div>
			</nav>

			{/* Main content */}
			<div className="flex-1">
				<BusinessPlanSlideshow />
			</div>
		</div>
	)
}