'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-4">
      <h1 className="text-4xl font-bold">page not found</h1>
      <p className="text-muted-foreground">sorry, this page doesn&apos;t exist!</p>
      <Link
        href="/"
        className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-black/90"
      >
        return home
      </Link>
    </div>
  )
} 