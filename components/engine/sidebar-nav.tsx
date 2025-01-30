'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { routes } from "../../config/routes"
import { cn } from "@/lib/utils"
import { Brain, Code, History, Settings, Star } from "lucide-react"

interface SidebarNavProps {
  className?: string
}

const navItems = [
  {
    title: 'Playground',
    href: routes.engine.playground,
    icon: Code
  },
  {
    title: 'History',
    href: routes.engine.history,
    icon: History
  },
  {
    title: 'Starred',
    href: routes.engine.starred,
    icon: Star
  },
  {
    title: 'Agents',
    href: routes.engine.agents,
    icon: Brain
  },
  {
    title: 'Settings',
    href: routes.engine.settings,
    icon: Settings
  }
]

export function SidebarNav({ className }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex flex-col gap-2", className)}>
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
              isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
