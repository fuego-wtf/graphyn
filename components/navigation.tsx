'use client'

import { useAuth } from "@clerk/nextjs"
import Link from "next/link"
import { Brand } from '@/components/brand'
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Profile } from "@/components/profile"

export function Navigation({ onPitchDeck }: { onPitchDeck: () => void }) {
  const { isSignedIn } = useAuth()

  return (
    <nav className="fixed top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
      <div className="container flex h-14 items-center justify-between">
        <Brand />
        <div className="flex items-center gap-4">
          {!isSignedIn && (
            <>
              <Button 
                variant="ghost" 
                className="transition-colors hover:bg-primary/10"
                onClick={onPitchDeck}
              >
                View Pitch Deck
              </Button>
              <Link href="/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
          <ModeToggle />
          {isSignedIn && <Profile />}
        </div>
      </div>
    </nav>
  )
}

