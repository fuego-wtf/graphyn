'use client'

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Moon, Sun, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"
import { businessPlanSlides, type Slide } from "./slides"

export function BusinessPlanSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right')
  const [hasScrollableContent, setHasScrollableContent] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Enhanced navigation functions
  const goToNextSlide = useCallback(() => {
    if (currentSlide < businessPlanSlides.length - 1) {
      setSlideDirection('right')
      setCurrentSlide(prev => prev + 1)
    }
  }, [currentSlide])

  const goToPreviousSlide = useCallback(() => {
    if (currentSlide > 0) {
      setSlideDirection('left')
      setCurrentSlide(prev => prev - 1)
    }
  }, [currentSlide])

  // Swipe navigation
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return
    
    const touchEnd = e.touches[0].clientX
    const diff = touchStart - touchEnd

    if (Math.abs(diff) > 50) { // Min swipe distance
      if (diff > 0) {
        goToNextSlide()
      } else {
        goToPreviousSlide()
      }
      setTouchStart(null)
    }
  }

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPreviousSlide();
      } else if (e.key === 'ArrowRight') {
        goToNextSlide();
      } else if (e.key === 'Home') {
        setCurrentSlide(0)
      } else if (e.key === 'End') {
        setCurrentSlide(businessPlanSlides.length - 1)
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault()
        toggleFullscreen()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNextSlide, goToPreviousSlide])

  // Fullscreen handling
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Check for scrollable content
  useEffect(() => {
    const checkScrollable = () => {
      if (scrollAreaRef.current) {
        const hasScroll = scrollAreaRef.current.scrollHeight > scrollAreaRef.current.clientHeight
        setHasScrollableContent(hasScroll)
      }
    }

    checkScrollable()
    window.addEventListener('resize', checkScrollable)
    return () => window.removeEventListener('resize', checkScrollable)
  }, [currentSlide])


  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const toggleHelp = () => {
    setShowHelp(!showHelp)
  }

  return (
    <TooltipProvider>
        <div 
        ref={containerRef}
        className={`relative min-h-screen flex flex-col justify-between ${isDarkMode ? 'dark' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {/* Progress Bar - Enhanced for better visibility */}
        <div className="fixed left-0 top-1/2 -translate-y-1/2 p-2 hidden lg:block z-50">
          <div className="flex flex-col gap-2 bg-background/80 backdrop-blur-sm rounded-lg p-2">
            {businessPlanSlides.map((slide: Slide, index: number) => (
              <Tooltip key={slide.id}>
                <TooltipTrigger asChild>
                  <motion.button
                    onClick={() => setCurrentSlide(index)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all
                      ${currentSlide === index 
                        ? 'bg-primary text-primary-foreground scale-110' 
                        : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:scale-105'
                      }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {index + 1}
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  <p>{slide.title}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Mobile Progress Indicator */}
        <div className="fixed top-4 left-1/2 -translate-x-1/2 lg:hidden">
          <div className="flex gap-1">
            {businessPlanSlides.map((_, index) => (
              <div 
                key={index}
                className={`h-1 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'w-4 bg-primary' 
                    : 'w-1 bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className={cn(
          "fixed top-4 right-4 flex items-center gap-2 p-2 rounded-lg",
          "bg-background/80 backdrop-blur-sm",
          "transition-all duration-200",
          isFullscreen ? "shadow-lg" : ""
        )}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleDarkMode}
                className="rounded-full"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle Dark Mode</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleFullscreen}
                className="rounded-full"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle Fullscreen</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleHelp}
                className="rounded-full"
              >
                <HelpCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Show Help</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Main Content - Enhanced animations */}
        <div className="flex-1 overflow-hidden px-4 flex items-center justify-center">
          <div className="w-full max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: slideDirection === 'right' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: slideDirection === 'right' ? -50 : 50 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 25,
              mass: 0.5
            }}
            className="w-full"
            >
            <Card className="overflow-hidden shadow-lg">
                <ScrollArea 
                ref={scrollAreaRef}
                className="max-h-[calc(100vh-16rem)]"
                type="hover"
                >
              <motion.div 
                className="p-6 md:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.h2 
                className="text-2xl md:text-3xl font-bold mb-4"
                layoutId="slide-title"
                transition={{ duration: 0.4 }}
                >
                {businessPlanSlides[currentSlide].title}
                </motion.h2>
                <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                {businessPlanSlides[currentSlide].content}
                </div>
              </motion.div>
              </ScrollArea>
            </Card>
            </motion.div>
          </AnimatePresence>
          </div>
        </div>




        {/* Navigation - Enhanced buttons */}
        <div className="sticky bottom-0 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 border-t">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <motion.div 
            whileHover={{ scale: 1.01 }} 
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.2 }}
          >
            <Button
            variant="outline"
            onClick={goToPreviousSlide}
            disabled={currentSlide === 0}
            className="transition-all duration-200"
            >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
            </Button>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium">
            {currentSlide + 1} / {businessPlanSlides.length}
            </div>
            {isFullscreen && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
              document.exitFullscreen()
              setIsFullscreen(false)
              }}
              className="hidden sm:flex items-center gap-2"
            >
              <Minimize2 className="h-4 w-4" />
              Exit Presentation
            </Button>
            )}
          </div>

          <motion.div 
            whileHover={{ scale: 1.01 }} 
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.2 }}
          >
            <Button
            variant="outline"
            onClick={goToNextSlide}
            disabled={currentSlide === businessPlanSlides.length - 1}
            className="transition-all duration-200"
            >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </motion.div>
          </div>
        </div>

        {/* Help Modal */}
        {showHelp && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-2xl mx-auto">
            <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Keyboard Shortcuts</h3>
              <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Next Slide</span>
                <div className="flex gap-2">
                <kbd className="px-2 py-1 bg-muted rounded">→</kbd>
                <kbd className="px-2 py-1 bg-muted rounded">Space</kbd>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Previous Slide</span>
                <kbd className="px-2 py-1 bg-muted rounded">←</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Toggle Fullscreen</span>
                <kbd className="px-2 py-1 bg-muted rounded">F</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Exit Fullscreen</span>
                <kbd className="px-2 py-1 bg-muted rounded">Esc</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>First Slide</span>
                <kbd className="px-2 py-1 bg-muted rounded">Home</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Last Slide</span>
                <kbd className="px-2 py-1 bg-muted rounded">End</kbd>
              </div>
              </div>
              <Button
              className="w-full mt-6"
              onClick={toggleHelp}
              >
              Close
              </Button>
            </div>
            </Card>
          </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
} 