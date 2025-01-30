'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, MessageSquare, Clock, Activity } from "lucide-react"
import type { Agent } from "@/types/agent"

interface AgentOverviewProps {
  agents: Agent[]
}

interface StatCardProps {
  title: string
  value: string | number
  description: string
  icon: React.ReactNode
}

function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

export function AgentOverview({ agents }: AgentOverviewProps) {
  // TODO: Replace with actual metrics from API
  const metrics = {
    totalAgents: agents.length,
    activeAgents: agents.filter(a => true).length, // TODO: Add active status
    totalMemories: 0,
    avgResponseTime: '250ms'
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="total agents"
        value={metrics.totalAgents}
        description="total number of configured agents"
        icon={<Brain className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="active agents"
        value={metrics.activeAgents}
        description="agents currently processing"
        icon={<Activity className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="total memories"
        value={metrics.totalMemories}
        description="memories collected across all agents"
        icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="avg response time"
        value={metrics.avgResponseTime}
        description="average agent response time"
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  )
} 