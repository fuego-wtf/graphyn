"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Brain, PlayCircle, BookOpen, LogOut, User } from "lucide-react"
import { SignOutButton, useUser } from "@clerk/nextjs"
import { UserProfile } from "./user-profile"

export function Sidebar() {
	const pathname = usePathname()
	const { user } = useUser()

	const routes = [
		{
			label: "Agents",
			icon: Brain,
			href: "/engine/agents",
		},
		{
			label: "Playground",
			icon: PlayCircle,
			href: "/engine/playground",
		},
		{
			label: "Knowledge",
			icon: BookOpen,
			href: "/engine/knowledge",
		},
	]

	return (
		<div className="flex h-screen flex-col border-r bg-background">
			<ScrollArea className="flex-1 p-4">
				<div className="space-y-4">
					<div className="py-2">
						<h2 className="mb-2 px-2 text-lg font-semibold">Engine</h2>
						<div className="space-y-1">
							{routes.map((route) => (
								<Button
									key={route.href}
									variant={pathname === route.href ? "secondary" : "ghost"}
									className="w-full justify-start"
									asChild
								>
									<Link href={route.href}>
										<route.icon className="mr-2 h-4 w-4" />
										{route.label}
									</Link>
								</Button>
							))}
						</div>
					</div>
				</div>
			</ScrollArea>
			<div className="border-t p-4">
				{user && <UserProfile />}
			</div>

		</div>
	)
}