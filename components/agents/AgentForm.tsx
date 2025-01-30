'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import type { Agent } from "@/types/agent"
import { useToast } from "@/components/ui/toast"
import { useAgentStore } from "@/store/agent"
import { Controller } from "react-hook-form"

const agentFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  systemPrompt: z.string().min(10, "System prompt must be at least 10 characters"),
  context: z.string().optional(),
  settings: z.object({
    temperature: z.number().min(0).max(1),
    maxTokens: z.number().min(100).max(4000),
    topP: z.number().min(0).max(1)
  })
})

interface FormValues {
  name: string
  systemPrompt: string
  context?: string
  settings: {
    temperature: number
    maxTokens: number
    topP: number
  }
}

interface AgentFormProps {
  agent?: Agent
  onSuccess?: () => void
}

export function AgentForm({ agent, onSuccess }: AgentFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const { setActiveAgent } = useAgentStore()
  const [error, setError] = useState<string>()

  const form = useForm<FormValues>({
    resolver: zodResolver(agentFormSchema),
    defaultValues: {
      name: agent?.name ?? "",
      systemPrompt: agent?.systemPrompt ?? "",
      context: agent?.context ?? "",
      settings: {
        temperature: agent?.settings?.temperature ?? 0.7,
        maxTokens: agent?.settings?.maxTokens ?? 2000,
        topP: agent?.settings?.topP ?? 0.9
      }
    }
  })

  async function onSubmit(data: FormValues) {
    setLoading(true)
    setError(undefined)
    
    try {
      const url = agent 
        ? `/api/agents/${agent.id}`
        : "/api/agents"
        
      const response = await fetch(url, {
        method: agent ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error || "Failed to save agent")
      }

      const savedAgent = await response.json()
      setActiveAgent(savedAgent)
      
      toast({
        title: `Agent ${agent ? "updated" : "created"}`,
        description: `Successfully ${agent ? "updated" : "created"} ${data.name}`
      })
      
      onSuccess?.()
      router.push(`/engine/agents/${savedAgent.id}`)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save agent"
      setError(message)
      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form form={form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Card>
          <CardContent className="pt-6 space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="research assistant" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="systemPrompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>system prompt</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="you are a helpful research assistant..."
                      className="min-h-[120px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="context"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>context (optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field}
                      placeholder="additional context for the agent..."
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>settings</FormLabel>
              <div className="grid gap-4 sm:grid-cols-3">
                <Controller
                  control={form.control}
                  name="settings.temperature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>temperature</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          step="0.1"
                          min="0"
                          max="1"
                          value={field.value ?? ""}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          onBlur={field.onBlur}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Controller
                  control={form.control}
                  name="settings.maxTokens"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>max tokens</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          step="100"
                          min="100"
                          max="4000"
                          value={field.value ?? ""}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          onBlur={field.onBlur}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Controller
                  control={form.control}
                  name="settings.topP"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>top p</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          step="0.1"
                          min="0"
                          max="1"
                          value={field.value ?? ""}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          onBlur={field.onBlur}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Button type="submit" disabled={loading}>
          {loading ? "saving..." : agent ? "update agent" : "create agent"}
        </Button>
      </form>
    </Form>
  )
} 