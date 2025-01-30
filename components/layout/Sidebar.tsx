"use client"
  
import { SideNav } from "./side-nav"

export function Sidebar() {
  return (
    <aside className="flex flex-col h-screen w-64 bg-background border-r">
      <div className="p-4">
        <h2 className="text-lg font-semibold">graphyn</h2>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        <SideNav />
      </nav>


      <div className="mt-auto border-t border-zinc-800">
        <div className="flex items-center justify-between p-4">
        </div>
      </div>
    </aside>
  )
} 