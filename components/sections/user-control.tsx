'use client'

import { Button } from "@/components/ui/button"
import { Download, History, Trash2 } from "lucide-react"
import { motion } from "framer-motion"

const controls = [
  {
    id: 'viewHistory',
    icon: History,
    title: 'View History',
    description: 'Access your complete interaction history with AI agents.',
    action: 'View History'
  },
  {
    id: 'exportData',
    icon: Download,
    title: 'Export Data',
    description: 'Download your data in a structured format for backup or analysis.',
    action: 'Export Now'
  },
  {
    id: 'deleteData',
    icon: Trash2,
    title: 'Delete Data',
    description: 'Permanently remove selected data from your account.',
    action: 'Manage Data'
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

export function UserControl() {
  return (
    <section className="container py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
          You're in Control
        </h2>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Manage your AI interactions and data with complete transparency and control.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mx-auto mt-16 max-w-7xl"
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {controls.map((control) => {
            const Icon = control.icon
            return (
              <motion.div
                key={control.id}
                variants={item}
                className="group relative overflow-hidden rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-lg"
              >
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-primary transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
                </div>
                <div className="relative z-10">
                  <h3 className="mt-6 text-lg font-semibold">
                    {control.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {control.description}
                  </p>
                  <Button variant="ghost" className="mt-4 transition-transform group-hover:translate-x-1">
                    {control.action}
                  </Button>
                </div>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
