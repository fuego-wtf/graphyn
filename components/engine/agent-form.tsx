'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

interface FormData {
  name: string
  systemPrompt: string
  context: string
  settings: {
    temperature: number
    maxTokens: number
    model: string
    memoryLimit: number
  }
}

interface FormErrors {
  name?: string
  systemPrompt?: string
  context?: string
  general?: string
}

export function AgentForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState<FormData>({
    name: '',
    systemPrompt: '',
    context: '',
    settings: {
      temperature: 0.7,
      maxTokens: 1000,
      model: 'gpt-3.5-turbo',
      memoryLimit: 1000
    }
  })

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'agent name is required'
    }
    
    if (!formData.systemPrompt.trim()) {
      newErrors.systemPrompt = 'system prompt is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    
    setLoading(true)
    try {
      const response = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to create agent")
      }

      const agent = await response.json()
      router.push("/engine/agents")
      router.refresh()
    } catch (error) {
      setErrors({ general: 'failed to create agent. please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <Alert variant="destructive">
          <AlertDescription>{errors.general}</AlertDescription>
        </Alert>
      )}
      
      <div>
        <Label htmlFor="name">agent name</Label>
        <Input 
          id="name" 
          value={formData.name}
          onChange={e => {
            setFormData({...formData, name: e.target.value})
            if (errors.name) setErrors({...errors, name: undefined})
          }}
          placeholder="e.g. research assistant"
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-destructive">{errors.name}</p>
        )}
      </div>
      
      <div>
        <Label htmlFor="system-prompt">system prompt</Label>
        <Textarea 
          id="system-prompt"
          value={formData.systemPrompt}
          onChange={e => {
            setFormData({...formData, systemPrompt: e.target.value})
            if (errors.systemPrompt) setErrors({...errors, systemPrompt: undefined})
          }}
          placeholder="describe how your agent should behave..."
          rows={4}
          className={errors.systemPrompt ? "border-destructive" : ""}
        />
        {errors.systemPrompt && (
          <p className="mt-1 text-sm text-destructive">{errors.systemPrompt}</p>
        )}
      </div>

      <div>
        <Label htmlFor="context">initial context (optional)</Label>
        <Textarea
          id="context" 
          value={formData.context}
          onChange={e => setFormData({...formData, context: e.target.value})}
          placeholder="provide any background knowledge..."
          rows={4}
        />
      </div>

        <div className="space-y-4">
        <h3 className="text-lg font-medium">Model Settings</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
          <Label htmlFor="temperature">Temperature</Label>
          <Input 
            id="temperature"
            type="number"
            min={0}
            max={1}
            step={0.1}
            value={formData.settings.temperature}
            onChange={e => setFormData({
            ...formData,
            settings: {
              ...formData.settings,
              temperature: parseFloat(e.target.value)
            }
            })}
          />
          </div>
          
          <div>
          <Label htmlFor="max-tokens">Max Tokens</Label>
          <Input 
            id="max-tokens"
            type="number"
            min={1}
            max={4000}
            value={formData.settings.maxTokens}
            onChange={e => setFormData({
            ...formData,
            settings: {
              ...formData.settings,
              maxTokens: parseInt(e.target.value)
            }
            })}
          />
          </div>
        </div>

        <div>
          <Label htmlFor="model">Model</Label>
          <select
          id="model"
          value={formData.settings.model}
          onChange={e => setFormData({
            ...formData,
            settings: {
            ...formData.settings,
            model: e.target.value
            }
          })}
          className="w-full rounded-md border border-input bg-background px-3 py-2"
          >
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="gpt-4">GPT-4</option>
          </select>
        </div>

        <div>
          <Label htmlFor="memory-limit">Memory Limit</Label>
          <Input 
          id="memory-limit"
          type="number"
          min={100}
          max={10000}
          value={formData.settings.memoryLimit}
          onChange={e => setFormData({
            ...formData,
            settings: {
            ...formData.settings,
            memoryLimit: parseInt(e.target.value)
            }
          })}
          />
          <p className="mt-1 text-sm text-muted-foreground">Maximum number of memories to retain</p>
        </div>
        </div>

        <Button type="submit" disabled={loading}>
        {loading ? 'creating...' : 'create agent'}
        </Button>
    </form>
  )
} 