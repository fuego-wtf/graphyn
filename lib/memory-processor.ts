import { Memory } from "@/types/memory"
import { memoryRecommender } from "./recommender"
import { analyticsEngine } from "./analytics"

interface ProcessedMemory extends Memory {
  embeddings: number[]
  relevanceScore: number
  connections: string[] // related memory IDs
}

export class MemoryProcessor {
  private processingQueue: Memory[] = []
  private processing = false
  
  async addToQueue(memory: Memory) {
    this.processingQueue.push(memory)
    if (!this.processing) {
      await this.processQueue()
    }
  }

  private async processQueue() {
    if (this.processingQueue.length === 0) return
    this.processing = true

    try {
      while (this.processingQueue.length > 0) {
        const memory = this.processingQueue.shift()
        if (!memory) continue

        const startTime = performance.now()
        const processed = await this.processMemory(memory)
        const processingTime = performance.now() - startTime

        if (processed) {
          analyticsEngine.trackMemoryProcessing(memory, processingTime, true)
          await memoryRecommender.processMemoryBatch([memory])
        } else {
          analyticsEngine.trackMemoryProcessing(memory, processingTime, false)
        }
      }
    } finally {
      this.processing = false
    }
  }

  private async processMemory(memory: Memory): Promise<ProcessedMemory | null> {
    try {
      // TODO: Replace with actual coregraph integration
      const processed: ProcessedMemory = {
        ...memory,
        embeddings: await this.generateEmbeddings(memory.content),
        relevanceScore: Math.random(),
        connections: []
      }

      return processed
    } catch (error) {
      console.error("Memory processing failed:", error)
      return null
    }
  }

  private async generateEmbeddings(content: string): Promise<number[]> {
    // TODO: Replace with actual embedding generation
    return Array.from({ length: 384 }, () => Math.random())
  }
}

export const memoryProcessor = new MemoryProcessor() 