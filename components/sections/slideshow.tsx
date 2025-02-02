'use client'

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight, Moon, Sun, X } from "lucide-react"
import Link from 'next/link'
import { routes } from '@/config/routes'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"


const slides = [
  {
    title: "Core Platform",
    subtitle: "Building the Future of AI Interaction",
    content: [
      "Graph-based memory architecture",
      "Real-time context understanding",
      "Secure and scalable infrastructure",
      "Advanced LLM integration"
    ],
    metrics: {
      label: "Processing Speed",
      value: "<50ms latency",
    },
  },
  {
    title: "Problem Space",
    subtitle: "Addressing Key Market Challenges",
    content: [
      "Complex user interactions",
      "Data privacy concerns",
      "Integration difficulties",
      "Scalability issues"
    ],
    metrics: {
      label: "Market Size",
      value: "$500B by 2025",
    },
  },
  {
    title: "Our Solution",
    subtitle: "Innovative AI Platform",
    content: [
      "Unified interaction mapping",
      "Privacy-first architecture",
      "Seamless integration",
      "Enterprise-grade security"
    ],
    metrics: {
      label: "Customer Satisfaction",
      value: "95% retention rate",
    },
  },
  {
    title: "MVP Features",
    subtitle: "Ready for Market",
    content: [
      "Graph visualization",
      "Memory management",
      "Agent configuration",
      "Real-time analytics"
    ],
    metrics: {
      label: "Development Progress",
      value: "80% complete",
    },
  },
  {
    title: "Next Steps",
    subtitle: "Roadmap to Success",
    content: [
      "Beta launch Q2 2024",
      "Enterprise partnerships",
      "Advanced features rollout",
      "Global expansion"
    ],
    metrics: {
      label: "Growth Target",
      value: "10x by 2025",
    },
  },
]

export function Slideshow({ onClose }: { onClose: () => void }) {

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1))
  }, [])

  const goToPreviousSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0))
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        goToNextSlide()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        goToPreviousSlide()
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNextSlide, goToPreviousSlide, onClose])

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000);
    return () => clearInterval(interval);
  }, [goToNextSlide]);

  return (
    <TooltipProvider>
      <div 
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <div 
          ref={containerRef}
          className={cn(
            "fixed inset-4 z-50 flex flex-col rounded-lg border bg-background shadow-lg",
            "md:inset-8",
            isDarkMode ? 'dark' : ''
          )}
          onClick={e => e.stopPropagation()}
        >
          {/* Controls */}
          <div className="absolute right-4 top-4 flex items-center gap-2 z-50">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="rounded-full"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onClose}
              className="rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden p-6">
            <div className="flex h-full flex-col items-center justify-center">
              {/* Progress bar */}
              <div className="w-full max-w-2xl">
                <div className="flex gap-2">
                  {slides.map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        "h-1 flex-1 rounded-full transition-all duration-500",
                        index === currentSlide ? "bg-primary" : "bg-muted"
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Slide content */}
              <div className="mt-16 text-center">
                <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
                  {slides[currentSlide].title}
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
                  {slides[currentSlide].subtitle}
                </p>
                <ul className="mx-auto mt-12 max-w-2xl space-y-4 text-lg sm:text-xl">
                  {slides[currentSlide].content.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-center gap-2 text-muted-foreground"
                    >
                      <span className="text-primary">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-12">
                  <p className="text-sm font-medium text-muted-foreground">
                    {slides[currentSlide].metrics.label}
                  </p>
                  <p className="mt-1 text-3xl font-bold text-primary">
                    {slides[currentSlide].metrics.value}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="border-t bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outline"
                onClick={goToPreviousSlide}
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <div className="text-sm font-medium">
                {currentSlide + 1} / {slides.length}
              </div>

              {currentSlide === slides.length - 1 ? (
                <Link href="/business-plan">

                  <Button variant="default">
                    View Full Plan
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="outline"
                  onClick={goToNextSlide}
                  disabled={currentSlide === slides.length - 1}
                >
                    Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>

  )
} 