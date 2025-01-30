"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  items: {
    title: string
    href: string
    icon?: React.ReactNode
  }[]
  children?: React.ReactNode
}

export function Sidebar({ className, items, children, ...props }: SidebarProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { user } = useUser()


  return (
    <div className="flex h-screen flex-col bg-background border-r" {...props}>
      <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 border-b">
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-lg">Graphyn</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-foreground transition-colors"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
      </div>

      <div className="flex-1 overflow-auto py-4">
      <nav className="space-y-1 px-3">
        {items.map((item) => (
        <Link 
          key={item.href} 
          href={item.href}
          className={cn(
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
          "hover:bg-accent/50 active:scale-[0.98]",
          pathname === item.href 
            ? "text-primary bg-accent/30 shadow-sm" 
            : "text-muted-foreground hover:text-primary"
          )}
        >
          {item.icon && <span className="h-[22px] w-[22px]">{item.icon}</span>}
          {item.title}
        </Link>
        ))}
      </nav>
      </div>

      <div className="mt-auto border-t p-4">

        {children}
      </div>
    </div>
  )
}