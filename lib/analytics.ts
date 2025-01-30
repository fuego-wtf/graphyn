import { Memory } from "@/types/memory"

interface MemoryStats {
  totalProcessed: number
  averageProcessingTime: number
  successRate: number
  topTypes: Record<string, number>
}

export class AnalyticsEngine {
  private stats: MemoryStats = {
    totalProcessed: 0,
    averageProcessingTime: 0,
    successRate: 100,
    topTypes: {}
  }

  trackMemoryProcessing(memory: Memory, processingTime: number, success: boolean) {
    this.stats.totalProcessed++
    this.stats.averageProcessingTime = (
      (this.stats.averageProcessingTime * (this.stats.totalProcessed - 1) + processingTime) / 
      this.stats.totalProcessed
    )
    
    if (!success) {
      this.stats.successRate = (
        (this.stats.successRate * (this.stats.totalProcessed - 1) + 0) /
        this.stats.totalProcessed
      )
    }

    this.stats.topTypes[memory.type] = (this.stats.topTypes[memory.type] || 0) + 1
  }

  getStats(): MemoryStats {
    return { ...this.stats }
  }
}

export const analyticsEngine = new AnalyticsEngine() 