"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAgentStore } from "@/store/agent"
import { useToast } from "@/components/ui/toast"
import { Trash2, Save } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import type { AgentSettings as AgentSettingsType } from "@/types/agent"

interface AgentSettingsProps {
  agentId: string
}

export function AgentSettings({ agentId }: AgentSettingsProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const agent = useAgentStore(state => state.agents.find(a => a.id === agentId))
  const updateAgent = useAgentStore(state => state.updateAgent)

  const [settings, setSettings] = useState({
    isActive: agent?.isActive ?? true,
    temperature: agent?.settings?.temperature ?? 0.7,
    maxTokens: agent?.settings?.maxTokens ?? 2000,
    topP: agent?.settings?.topP ?? 0.9,
    memoryLimit: agent?.settings?.memoryLimit ?? 100
  })

  async function handleSave() {
    if (!agent) return

    setLoading(true)
    try {
      const response = await fetch(`/api/agents/${agentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          isActive: settings.isActive,
          settings: {
            ...agent.settings,
            temperature: settings.temperature,
            maxTokens: settings.maxTokens,
            topP: settings.topP,
            memoryLimit: settings.memoryLimit
          }
        })
      })

      if (!response.ok) throw new Error("Failed to update settings")

      const updatedAgent = await response.json()
      updateAgent(updatedAgent)
      toast({
        title: "settings updated",
        description: "agent settings have been saved successfully"
      })
    } catch (error) {
      toast({
        title: "error",
        description: "failed to update settings",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!confirm("are you sure you want to delete this agent?")) return
    
    setLoading(true)
    try {
      const response = await fetch(`/api/agents/${agentId}`, {
        method: "DELETE"
      })

      if (!response.ok) throw new Error("Failed to delete agent")

      toast({
        title: "agent deleted",
        description: "the agent has been successfully deleted"
      })
      // TODO: Redirect to agents list
    } catch (error) {
      toast({
        title: "error",
        description: "failed to delete agent",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  if (!agent) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="active">active</Label>
            <Switch
              id="active"
              checked={settings.isActive}
              onCheckedChange={(checked: boolean) => setSettings(s => ({ ...s, isActive: checked }))}
            />
          </div>

          <div className="space-y-2">
            <Label>temperature</Label>
            <Slider
              value={[settings.temperature]}
              min={0}
              max={1}
              step={0.1}
              onValueChange={([value]: number[]) => setSettings(s => ({ ...s, temperature: value }))}
            />
            <p className="text-xs text-muted-foreground">controls randomness in responses</p>
          </div>

          <div className="space-y-2">
            <Label>max tokens</Label>
            <Input
              type="number"
              value={settings.maxTokens}
              onChange={(e) => setSettings(s => ({ ...s, maxTokens: parseInt(e.target.value) }))}
              min={100}
              max={4000}
            />
            <p className="text-xs text-muted-foreground">maximum length of generated responses</p>
          </div>

          <div className="space-y-2">
            <Label>top p</Label>
            <Slider
              value={[settings.topP]}
              min={0}
              max={1}
              step={0.1}
              onValueChange={([value]: number[]) => setSettings(s => ({ ...s, topP: value }))}
            />
            <p className="text-xs text-muted-foreground">controls diversity of responses</p>
          </div>

          <div className="space-y-2">
            <Label>memory limit</Label>
            <Input
              type="number"
              value={settings.memoryLimit}
              onChange={(e) => setSettings(s => ({ ...s, memoryLimit: parseInt(e.target.value) }))}
              min={10}
              max={1000}
            />
            <p className="text-xs text-muted-foreground">maximum number of memories to retain</p>
          </div>

          <Button 
            className="w-full"
            onClick={handleSave}
            disabled={loading}
          >
            <Save className="mr-2 h-4 w-4" />
            {loading ? "saving..." : "save settings"}
          </Button>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-sm font-medium">danger zone</h3>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={loading}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {loading ? "deleting..." : "delete agent"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 