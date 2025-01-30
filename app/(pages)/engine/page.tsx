import { Button } from '@/components/ui/button'
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import Link from 'next/link'
import { routes } from '@/config/routes'

export default async function EnginePage() {
	const { userId } = auth()
	
	if (!userId) {
		redirect("/sign-in")
	}

	return (
		<div className="space-y-8 p-8">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Engine Overview</h1>
				<p className="text-muted-foreground mt-2">Monitor and manage your AI agents and memories</p>
			</div>

			<div className="grid gap-4 md:grid-cols-3">
				<div className="rounded-lg border bg-card p-6">
					<div className="flex items-center gap-2">
						<p className="text-sm font-medium text-muted-foreground">
							Active Agents
						</p>
					</div>
					<div className="mt-2">
						<p className="text-3xl font-bold">0</p>
						<p className="text-sm text-muted-foreground mt-1">
							Currently running AI agents
						</p>
					</div>
				</div>

				<div className="rounded-lg border bg-card p-6">
					<div className="flex items-center gap-2">
						<p className="text-sm font-medium text-muted-foreground">
							Total Memories
						</p>
					</div>
					<div className="mt-2">
						<p className="text-3xl font-bold">0</p>
						<p className="text-sm text-muted-foreground mt-1">
							Stored agent memories
						</p>
					</div>
				</div>

				<div className="rounded-lg border bg-card p-6">
					<div className="flex items-center gap-2">
						<p className="text-sm font-medium text-muted-foreground">
							Memory Usage
						</p>
					</div>
					<div className="mt-2">
						<p className="text-3xl font-bold">0%</p>
						<p className="text-sm text-muted-foreground mt-1">
							Of total memory capacity
						</p>
					</div>
				</div>
			</div>

			<div className="rounded-lg border bg-card p-8">
				<h2 className="font-semibold text-lg">Get Started</h2>
				<p className="text-muted-foreground mt-2">Create your first AI agent to begin exploring the possibilities</p>
				<Button className="mt-4">
					<Link href="/engine/agents/new">Create New Agent</Link>
				</Button>
			</div>
		</div>
	)
}