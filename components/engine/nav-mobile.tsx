'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from '@/lib/utils'
import { routes } from '@/config/routes'
import { Brain, Code, History, Settings, Star, PlusCircle } from "lucide-react"

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
  },
  {
    title: 'Create Agent',
    href: routes.engine.agents + '/new',
    icon: PlusCircle
  }
]

export function NavMobile() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 text-xs transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
