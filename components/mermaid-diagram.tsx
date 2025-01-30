'use client'

import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

interface MermaidDiagramProps {
  chart: string
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      mermaid.initialize({ 
        startOnLoad: true,
        theme: 'neutral',
        fontFamily: 'Inter, sans-serif',
        fontSize: 12,
        flowchart: {
          curve: 'basis',
          nodeSpacing: 20,
          rankSpacing: 40,
        }
      })
      mermaid.run({
        nodes: [ref.current]
      })
    }
  }, [chart])

  return (
    <div className="w-full h-full overflow-auto">
      <div ref={ref} className="mermaid">{chart}</div>
    </div>
  )
}

