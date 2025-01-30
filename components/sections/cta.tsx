'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTA() {
  return (
    <section className="bg-primary">
      <div className="mx-auto w-full max-w-[1024px] px-6 py-16 sm:py-24">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">
            Ready to Get Started?
          </h2>
          <p className="mt-4 max-w-[520px] text-primary-foreground/80">
            Join us today and experience the power of AI agents with advanced memory capabilities.
          </p>
          <Link href="/sign-up">
            <Button
              variant="outline"
              className="mt-8"
            >
              Create Your Account
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}