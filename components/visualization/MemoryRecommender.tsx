"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Memory } from "@/types/memory"
import { ScrollArea } from "@/components/ui/scroll-area"

interface MemoryRecommenderProps {
  currentMemory: Memory
  allMemories: Memory[]
  onMemoryClick?: (memoryId: string) => void
}

export function MemoryRecommender({ currentMemory, allMemories, onMemoryClick }: MemoryRecommenderProps) {
  const [recommendations, setRecommendations] = useState<Memory[]>([])

  useEffect(() => {
    // Simple recommendation based on type and content similarity
    const similar = allMemories
      .filter(m => m.id !== currentMemory.id)
      .map(memory => ({
        memory,
        score: calculateSimilarity(currentMemory, memory)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(item => item.memory)

    setRecommendations(similar)
  }, [currentMemory, allMemories])

  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium mb-4">related memories</h3>
      <ScrollArea className="h-[300px]">
        <div className="space-y-2">
          {recommendations.map(memory => (
            <div
              key={memory.id}
              className="p-2 hover:bg-accent rounded-md cursor-pointer"
              onClick={() => onMemoryClick?.(memory.id)}
            >
              <p className="text-sm text-muted-foreground">
                {new Date(memory.createdAt).toLocaleString()}
              </p>
              <p className="line-clamp-2 text-sm">{memory.content}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}

function calculateSimilarity(a: Memory, b: Memory): number {
  let score = 0
  
  // Type matching
  if (a.type === b.type) score += 0.3
  
  // Content similarity (naive approach)
  const aWords = new Set(a.content.toLowerCase().split(/\s+/))
  const bWords = new Set(b.content.toLowerCase().split(/\s+/))
  const intersection = new Set(Array.from(aWords).filter(x => bWords.has(x)))
  score += 0.7 * (intersection.size / Math.max(aWords.size, bWords.size))
  
  return score
} 