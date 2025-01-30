"use client";

import { cn } from "@/lib/utils";
import { Brain, Home, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

interface SideNavProps {
  className?: string;
}

const items: NavItem[] = [
  { icon: Home, label: "Dashboard", href: "/engine" },
  { icon: Brain, label: "Agents", href: "/engine/agents" },
  { icon: Users, label: "Team", href: "/engine/team" },
  { icon: Settings, label: "Settings", href: "/engine/settings" }
];

export function SideNav({ className }: SideNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-col gap-2 p-4", className)}>
      {items.map((item) => {
        const isActive = pathname?.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive ? "bg-primary/10 text-primary" : "hover:bg-muted"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
} 