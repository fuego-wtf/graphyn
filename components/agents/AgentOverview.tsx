'use client'

import { Button } from "@/components/ui/button"
import { useAgentStore } from "@/store/agent"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, MessageSquare, Settings } from "lucide-react"
import Link from "next/link"
import type { Agent } from "@/types/agent"

interface AgentOverviewProps {
  agents: Agent[]
}

export function AgentOverview({ agents }: AgentOverviewProps) {
  const agent = useAgentStore(state => 
    state.agents.find((a) => a.id === agents[0]?.id)
  )


  if (!agent) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{agent.name}</h2>
            <p className="text-muted-foreground">{agent.systemPrompt}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/engine/agents/${agent.id}/edit`}>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              <span className="capitalize">{agent.status}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
