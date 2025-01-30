export type MemoryType = "observation" | "reflection" | "plan"

export interface Memory {
  createdAt: string
  id: string
  agentId: string
  content: string
  type: MemoryType
  timestamp: string
  metadata?: {
    source: string
    [key: string]: string | number | boolean
  }
  vectorId?: string // For vector store integration later
}

export interface CreateMemoryInput {
  agentId: string
  content: string
  type: MemoryType
  metadata?: Record<string, unknown>
} 