import { Memory } from "@/types/memory"
import { memoryProcessor } from "./memory-processor"

interface Recommendation {
  memoryId: string
  score: number
  reason: string
}

export class MemoryRecommender {
  private cache: Map<string, number[]> = new Map()

  async getRecommendations(agentId: string, memory: Memory): Promise<Recommendation[]> {
    try {
      // Mock recommendations until coregraph integration
      const mockRecommendations: Recommendation[] = [
        {
          memoryId: "mem_" + Math.random().toString(36).substr(2, 9),
          score: Math.random(),
          reason: "Similar context detected"
        },
        {
          memoryId: "mem_" + Math.random().toString(36).substr(2, 9),
          score: Math.random(),
          reason: "Related by topic"
        }
      ]

      return mockRecommendations.sort((a, b) => b.score - a.score)
    } catch (error) {
      console.error("Recommendation generation failed:", error)
      return []
    }
  }

  async processMemoryBatch(memories: Memory[]) {
    const processed = await Promise.all(
      memories.map(async (memory) => {
        try {
          // Mock processing until coregraph integration
          const mockVector = Array.from(
            { length: 384 }, 
            () => Math.random()
          )
          this.cache.set(memory.id, mockVector)
          return true
        } catch (error) {
          console.error("Memory processing failed:", error)
          return false
        }
      })
    )
    return processed.every(Boolean)
  }
}

export const memoryRecommender = new MemoryRecommender()

export function calculateSimilarity(a: string, b: string): number {
  const aWords = new Set(a.toLowerCase().split(/\s+/))
  const bWords = new Set(b.toLowerCase().split(/\s+/))
  const intersection = Array.from(aWords).filter(x => bWords.has(x))
  return intersection.length / Math.max(aWords.size, bWords.size)
}

export function getRecommendations(currentMemory: Memory, allMemories: Memory[], limit = 5): Memory[] {
  return allMemories
    .filter(m => m.id !== currentMemory.id)
    .map(memory => ({
      memory,
      score: calculateSimilarity(currentMemory.content, memory.content)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.memory)
} 