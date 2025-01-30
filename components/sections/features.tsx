'use client'

import { Network, Brain, Shield } from "lucide-react"
import { motion } from "framer-motion"

const featureIcons = {
  graphMapping: Network,
  llmDecisions: Brain,
  dataControl: Shield,
} as const

const features = [
  {
    id: 'graphMapping',
    title: 'Graph-Based Memory Mapping',
    description: 'Our advanced graph mapping technology creates meaningful connections between memories, enabling more contextual and intelligent responses.'
  },
  {
    id: 'llmDecisions',
    title: 'Intelligent Decision Making',
    description: 'Leverage state-of-the-art language models to make informed decisions based on accumulated knowledge and experience.'
  },
  {
    id: 'dataControl',
    title: 'Complete Data Control',
    description: 'Maintain full control over your data with our secure and transparent memory management system.'
  }
] as const

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

export function Features() {
  return (
    <section className="container py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
          Powerful Features for Your AI Agents
        </h2>
        <p className="mt-6 text-lg leading-8 text-muted-foreground/90">
          Build smarter AI solutions with our comprehensive suite of features designed for advanced memory management and intelligent decision making.
        </p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mx-auto mt-16 max-w-7xl px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = featureIcons[feature.id as keyof typeof featureIcons]
              return (
                <motion.div
                  key={feature.id}
                  variants={item}
                  className="group relative overflow-hidden rounded-xl border bg-card p-8 shadow-[0_0_0_1px_rgba(167,139,250,0.05)] transition-all duration-300 hover:shadow-[0_0_0_1px_rgba(167,139,250,0.1),0_4px_12px_-2px_rgba(167,139,250,0.08)] hover:scale-[1.02]"
                >
                  <div className="relative z-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:shadow-[0_0_20px_2px_rgba(167,139,250,0.3)]">
                      <Icon className="h-6 w-6 text-primary transition-colors duration-300 group-hover:text-primary-foreground" aria-hidden="true" />
                    </div>
                    <h3 className="mt-6 text-lg font-semibold tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground/90 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
