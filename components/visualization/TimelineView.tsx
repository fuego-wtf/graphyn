"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Memory } from "@/types/memory"
import { useDrag } from "@use-gesture/react"
import { animated, useSpring } from "@react-spring/web"
import { useVirtualizer } from '@tanstack/react-virtual'
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { getRecommendations } from "@/lib/recommender"

interface TimelineProps {
  memories: Memory[]
  onMemoryClick?: (memoryId: string) => void
}

export function TimelineView({ memories, onMemoryClick }: TimelineProps) {
  const [mounted, setMounted] = useState(false)
  const [search, setSearch] = useState("")
  const [{ y }, api] = useSpring(() => ({ y: 0 }))
  const parentRef = useRef<HTMLDivElement>(null)

  const filteredMemories = useMemo(() => {
    if (!search) return memories
    const searchLower = search.toLowerCase()
    return memories.filter(memory => 
      memory.content.toLowerCase().includes(searchLower) ||
      memory.type.toLowerCase().includes(searchLower)
    )
  }, [memories, search])

  const virtualizer = useVirtualizer({
    count: filteredMemories.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5
  })

  const bind = useDrag(({ down, movement: [_, my], velocity = 0 }) => {
    api.start({
      y: down ? my : 0,
      immediate: down,
      config: { velocity: Number(velocity) * 0.1 }
    })
  })

  const recommendations = useMemo(() => {
    if (!filteredMemories.length) return []
    return getRecommendations(filteredMemories[0], memories)
  }, [filteredMemories, memories])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <Card className="p-4"><div className="animate-pulse">Loading timeline...</div></Card>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-2">
        <Card className="p-4 touch-pan-y">
          <div className="mb-4 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search memories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          <div ref={parentRef} className="h-[500px] overflow-auto">
            <animated.div
              {...bind()}
              style={{ 
                y,
                height: `${virtualizer.getTotalSize()}px`,
                position: 'relative'
              }}
              className="w-full"
            >
              {virtualizer.getVirtualItems().map((virtualItem) => {
                const memory = filteredMemories[virtualItem.index]
                return (
                  <div
                    key={memory.id}
                    className="absolute top-0 left-0 w-full"
                    style={{
                      height: `${virtualItem.size}px`,
                      transform: `translateY(${virtualItem.start}px)`
                    }}
                  >
                    <div 
                      className="flex items-center space-x-4 hover:bg-accent p-2 rounded-md m-1"
                      onClick={() => onMemoryClick?.(memory.id)}
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">
                          {new Date(memory.createdAt).toLocaleString()}
                        </p>
                        <p className="line-clamp-2">{memory.content}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </animated.div>
          </div>
        </Card>
      </div>
      <div>
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-4">related memories</h3>
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
        </Card>
      </div>
    </div>
  )
} 