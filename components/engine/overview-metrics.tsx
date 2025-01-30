'use client'

import { Card, CardContent } from '@/components/ui/card'

export function OverviewMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="p-6">
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
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
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
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
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
        </CardContent>
      </Card>
    </div>
  )
}
