import { AgentSimulator } from "@/components/agent-simulator"

export default function PlaygroundPage() {
	return (
		<div className="space-y-8 p-8">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Playground</h1>
				<p className="text-muted-foreground mt-2">Test and experiment with AI agents in a sandbox environment</p>
			</div>
			<AgentSimulator />
		</div>
	)
}