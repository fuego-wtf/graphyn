import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { routes } from "@/config/routes"
import { AgentList } from "@/components/agents/AgentList"

export default function AgentsPage() {
	return (
		<div className="space-y-8 p-8">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">AI Agents</h1>
					<p className="text-muted-foreground mt-2">Create and manage your AI agents</p>
				</div>
				<Link href={`${routes.engine.agents}/new`}>
					<Button>
						<Plus className="mr-2 h-4 w-4" />
						Create Agent
					</Button>
				</Link>
			</div>
			
			<AgentList />
		</div>
	)
}
