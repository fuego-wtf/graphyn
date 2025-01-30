"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/toast"
import { Memory, MemoryType } from "@/types/memory"
import { useAgentStore } from "@/store/agent"
import { memoryProcessor } from "@/lib/memory-processor"
import { MemoryGraph } from "@/components/visualization/MemoryGraph"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AgentMemoriesProps {
  agentId: string
}

export function AgentMemories({ agentId }: AgentMemoriesProps) {
  const [content, setContent] = useState("")
  const [type, setType] = useState<MemoryType>("observation")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { addMemory } = useAgentStore()
  const agent = useAgentStore(state => state.agents.find(a => a.id === agentId))

  const handleAddMemory = useCallback(async () => {
    if (!content.trim()) return

    setLoading(true)
    try {
      const response = await fetch("/api/memories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId,
          content,
          type,
          metadata: {
            source: "user",
            timestamp: new Date().toISOString()
          }
        })
      })

      if (!response.ok) throw new Error("Failed to add memory")
      
      const memory = await response.json()
      addMemory(agentId, memory)
      await memoryProcessor.addToQueue(memory)
      
      setContent("")
      toast({
        title: "Memory added",
        description: "The memory has been successfully collected"
      })
    } catch (error) {
      console.error("Failed to add memory:", error)
      toast({
        title: "Error",
        description: "Failed to add memory. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }, [agentId, content, type, addMemory, toast])

  return (
    <div className="space-y-6">
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">list view</TabsTrigger>
          <TabsTrigger value="graph">graph view</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add Memory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select value={type} onValueChange={(value) => setType(value as MemoryType)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select memory type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="observation">Observation</SelectItem>
                    <SelectItem value="reflection">Reflection</SelectItem>
                    <SelectItem value="plan">Plan</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter memory content..."
                  className="min-h-[100px]"
                />
                <Button 
                  onClick={handleAddMemory} 
                  disabled={loading || !content.trim()}
                  className="w-full"
                >
                  {loading ? "Adding..." : "Add Memory"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {agent?.memories.map((memory) => (
              <Card key={memory.id} className="relative">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary">
                      {memory.type}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(memory.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-2">{memory.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="graph">
          <MemoryGraph 
            memories={agent?.memories ?? []}
            onNodeClick={(memoryId) => {
              const memory = agent?.memories.find(m => m.id === memoryId)
              if (memory) {
                toast({
                  title: "Memory Details",
                  description: memory.content
                })
              }
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
} 