"use client"

import { useEffect, useLayoutEffect, useRef, useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Memory } from "@/types/memory"
import ForceGraph2D, { ForceGraphMethods, NodeObject } from "react-force-graph-2d"
import { useTheme } from "next-themes"
import { MemoryGraph as MemoryGraphClass } from "@/lib/graph/memory-graph"
import { GraphAnalytics } from "@/lib/graph/analytics"

interface MemoryGraphProps {
  memories: Memory[]
  onNodeClick?: (memoryId: string) => void
  onNodeHover?: (memoryId: string | null) => void
  highlightedPath?: string[]
}

interface GraphNode extends NodeObject {
  id: string
  label: string
  type: string
  value: number
  centrality?: number
  highlighted?: boolean
}

interface GraphLink {
  source: string
  target: string
  value: number
  highlighted?: boolean
}

interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

export function MemoryGraph({ 
  memories, 
  onNodeClick, 
  onNodeHover,
  highlightedPath 
}: MemoryGraphProps) {
  const graphRef = useRef<ForceGraphMethods<GraphNode, GraphLink>>()
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 800, height: 468 })
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] })
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const graphWithHighlights = useMemo(() => {
    if (!graphData) return { nodes: [], links: [] }

    return {
      nodes: graphData.nodes.map(node => ({
        ...node,
        highlighted: highlightedPath?.includes(node.id) || node.id === hoveredNode
      })),
      links: graphData.links.map(link => ({
        ...link,
        highlighted: highlightedPath?.includes(link.source as string) && 
                    highlightedPath?.includes(link.target as string)
      }))
    }
  }, [graphData, highlightedPath, hoveredNode])

  useEffect(() => {
    const memoryGraph = new MemoryGraphClass()
    const analytics = new GraphAnalytics(memoryGraph)

    // Initialize graph with memories
    memories.forEach(async memory => {
      await memoryGraph.addMemory(memory, []) // Empty embeddings for now
    })

    // Calculate metrics
    const metrics = analytics.calculateMetrics()

    // Transform to visualization data
    const nodes: GraphNode[] = memoryGraph.getAllNodes().map(node => ({
      id: node.id,
      label: node.data.content.substring(0, 30) + "...",
      type: node.data.type,
      value: 1,
      centrality: metrics.centrality[node.id]
    }))

    const links: GraphLink[] = memoryGraph.getAllEdges().map(edge => ({
      source: edge.source,
      target: edge.target,
      value: edge.weight
    }))

    setGraphData({ nodes, links })
  }, [memories])

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const updateDimensions = () => {
        const container = containerRef.current
        if (container) {
          setDimensions({
            width: container.clientWidth,
            height: container.clientHeight
          })
        }
      }
      
      updateDimensions()
      window.addEventListener('resize', updateDimensions)
      return () => window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  useEffect(() => {
    setMounted(true)
    const fg = graphRef.current
    if (fg) {
      fg.d3Force("charge")?.strength(-150)
      fg.d3Force("link")?.distance(100)
      fg.d3Force("center")?.strength(0.3)
    }
  }, [])

  const handleNodeHover = (node: GraphNode | null) => {
    setHoveredNode(node?.id || null)
    onNodeHover?.(node?.id || null)
  }

  if (!mounted) {
    return (
      <Card className="p-4 h-[500px]">
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-pulse">Loading graph...</div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-4 h-[500px]">
      <div ref={containerRef} className="w-full h-full">
        <ForceGraph2D
          ref={graphRef}
          graphData={graphWithHighlights}
          nodeLabel="label"
          nodeColor={(node: GraphNode) => {
            if (node.highlighted) return "#f59e0b"
            return node.type === "observation" ? "#22c55e" :
                   node.type === "reflection" ? "#3b82f6" : 
                   "#94a3b8"
          }}
          linkColor={(link: GraphLink) => {
            if (link.highlighted) return "#f59e0b"
            return theme === "dark" ? "#4b5563" : "#d1d5db"
          }}
          linkWidth={link => (link as GraphLink).highlighted ? 2 : 1}
          backgroundColor="transparent"
          onNodeClick={(node: GraphNode) => onNodeClick?.(node.id)}
          onNodeHover={handleNodeHover}
          width={dimensions.width}
          height={dimensions.height}
          nodeRelSize={node => ((node as GraphNode).centrality || 1) * 5}
          linkDirectionalParticles={4}
          linkDirectionalParticleWidth={link => (link as GraphLink).highlighted ? 2 : 0}
        />
      </div>
    </Card>
  )
}