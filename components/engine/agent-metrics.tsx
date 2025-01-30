'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Brain, MessageSquare, Clock } from "lucide-react"

interface AgentMetricsProps {
	agentId: string
	metrics: {
		totalInteractions: number
		averageResponseTime: string
		lastActive: string
	}
}

export function AgentMetrics({ agentId, metrics }: AgentMetricsProps) {
	const metricItems = [
		{
			title: 'Total Interactions',
			value: metrics.totalInteractions,
			description: 'Number of conversations',
			icon: MessageSquare
		},
		{
			title: 'Average Response Time',
			value: metrics.averageResponseTime,
			description: 'Time to generate responses',
			icon: Clock
		},
		{
			title: 'Last Active',
			value: metrics.lastActive,
			description: 'Most recent interaction',
			icon: Brain
		}
	]

	return (
		<div className="grid gap-4 md:grid-cols-3">
			{metricItems.map((item, index) => (
				<Card key={index}>
					<CardContent className="p-6">
						<div className="flex items-center gap-4">
							<div className="rounded-lg bg-primary/10 p-2">
								<item.icon className="h-6 w-6 text-primary" />
							</div>
							<div>
								<p className="text-sm font-medium text-muted-foreground">
									{item.title}
								</p>
								<p className="text-2xl font-bold">{item.value}</p>
								<p className="text-sm text-muted-foreground">
									{item.description}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	)
}
