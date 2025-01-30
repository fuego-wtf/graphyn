'use client'

import { motion } from 'framer-motion'
import * as React from 'react'

export function Brand() {
  return (
    <motion.div
      className="flex items-center gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2">
        <div className="relative h-8 w-8">
          <div className="absolute inset-0 rounded-lg bg-primary/10" />
          <div className="absolute inset-0.5 rounded-lg bg-gradient-to-br from-primary to-primary-foreground opacity-50" />
          <div className="absolute inset-1 rounded-md bg-background" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 rounded-sm bg-primary" />
          </div>
        </div>
        <span className="font-bold">Graphyn</span>
      </div>
    </motion.div>
  )
}
