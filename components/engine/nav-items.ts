import { Home, Brain, Database, Settings } from "lucide-react"

export const navigation = [
  { name: "overview", href: "/engine", icon: Home },
  { name: "agents", href: "/engine/agents", icon: Brain },
  { name: "memories", href: "/engine/memories", icon: Database },
  { name: "settings", href: "/engine/settings", icon: Settings },
] as const 