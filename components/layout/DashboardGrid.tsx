'use client'

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface DashboardGridProps {
  sidebar?: ReactNode
  content: ReactNode
  className?: string
}

export function DashboardGrid({ sidebar, content, className }: DashboardGridProps) {
  return (
    <div className={cn(
      "grid min-h-screen w-full",
      sidebar ? "lg:grid-cols-[280px_1fr]" : "grid-cols-1",
      className
    )}>
      {sidebar && (
        <aside className="hidden border-r bg-background lg:block">
          {sidebar}
        </aside>
      )}
      <main className="flex-1 overflow-y-auto">
        <div className="container p-6 md:p-8">
          {content}
        </div>
      </main>
    </div>
  )
} 