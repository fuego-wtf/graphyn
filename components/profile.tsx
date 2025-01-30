"use client"

import { useUser } from "@clerk/nextjs"
import { Brain, Clock, Database, Zap } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserButton } from "@clerk/nextjs"

export function Profile() {
  const { user } = useUser()

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Brain className="mr-2 h-4 w-4" />
          <span>AI Agents</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Database className="mr-2 h-4 w-4" />
          <span>Memory Store</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Clock className="mr-2 h-4 w-4" />
          <span>History</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Zap className="mr-2 h-4 w-4" />
          <span>Usage</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}