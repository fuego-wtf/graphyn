'use client'

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { motion } from "framer-motion"
import { ErrorBoundary } from '@/components/error-boundary'
import Link from 'next/link'

const tiers = [
  {
    name: 'Starter',
    description: 'Perfect for getting started with basic features',
    price: 'Free',
    features: [
      'Up to 1,000 operations/month',
      '5GB storage',
      'Community support',
      'Basic analytics'
    ],
    cta: 'Get Started'
  },
  {
    name: 'Growth',
    description: 'For growing teams with advanced needs',
    price: '$250',
    features: [
      'Up to 10,000 operations/month',
      '50GB storage',
      'Email support',
      'Advanced analytics',
      'Custom integrations',
      'Team collaboration'
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Scale',
    description: 'For large enterprises requiring full capabilities',
    price: '$500',
    features: [
      'Unlimited operations',
      '250GB storage',
      'Priority support',
      'Enterprise analytics',
      'Custom development',
      'Advanced security',
      'SLA guarantee'
    ],
    cta: 'Contact Sales'
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function Pricing() {
  return (
    <ErrorBoundary
      fallback={
        <div className="container py-24 text-center">
          <h2 className="text-2xl font-bold">Pricing information is temporarily unavailable</h2>
          <p className="mt-4 text-muted-foreground">Please try again later.</p>
        </div>
      }
    >
      <section className="container flex flex-col items-center gap-8 py-24">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-center text-3xl font-bold">Simple, transparent pricing</h2>
          <p className="text-center text-muted-foreground">Choose the plan that's right for you</p>
        </div>

        <div className="mx-auto w-full max-w-[1024px] grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div key={tier.name} className="relative flex flex-col rounded-lg border bg-background p-6">
              {tier.popular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
                  Most Popular
                </div>
              )}
              <div>
                <h3 className="text-lg font-medium">{tier.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{tier.description}</p>
              </div>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-3xl font-bold">{tier.price}</span>
                {tier.price !== 'Free' && (
                  <span className="text-sm text-muted-foreground">/month</span>
                )}
              </div>
              <ul className="mt-4 flex-1 space-y-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-6 w-full">{tier.cta}</Button>
            </div>
          ))}
        </div>

        <Link
          href="/engine/newAgent"
          className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Start Building Now
        </Link>
      </section>
    </ErrorBoundary>
  )
}

