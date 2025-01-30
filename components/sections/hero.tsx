'use client'

import Link from "next/link"
import { useAuth } from "@clerk/nextjs"

export function Hero() {
  const { isSignedIn } = useAuth()

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            AI Agents with Memory That Works
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Create, manage, and deploy AI agents with persistent memory. Our platform helps you build smarter AI solutions that remember and learn from every interaction.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/engine/agents/new"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Create Your First Agent
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
