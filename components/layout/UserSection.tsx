"use client"

import { UserButton, useUser } from "@clerk/nextjs"
import React from "react"

export function UserSection() {
  const { user } = useUser()

  if (!user) return null

  return (
    <button 
      onClick={() => {
        const userButtonElement = document.querySelector('[data-clerk-root]')
        if (userButtonElement instanceof HTMLElement) {
          userButtonElement.click()
        }
      }}
      className="flex items-center gap-2 w-full hover:bg-accent/50 p-2 rounded-md transition-colors"
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm truncate">{user.fullName || user.username}</p>
      </div>
      <UserButton />
    </button>
  )
}